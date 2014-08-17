/**
 * 认证过程
 * 获取accessToken
 *
 */
var debug = require('debug')('fenzhishi.com:controllers:oauth:index');
var thunk = require('thunkify');
var GenericNote = require('generic-note');
var config = require('../../config');
var jwt = require('koa-jwt-comm');
var User = require('../../models/User');

module.exports = function(app) {

  app.get('/oauth', function* () {
    var type = this.query.type;
    try {
      var OAClient = GenericNote.OAuthClient(
        config.consumerKey,
        config.consumerSecret,
        type
      );

      OAClient.getRequestToken = thunk(OAClient.getRequestToken);
      var result = yield OAClient.getRequestToken(config.callbackUrl);

      this.session.oauthToken = result.oauthToken;
      this.session.oauthTokenSecret = result.oauthTokenSecret;
      this.session.type = type;

      // redirect the user to authorize the token
      this.redirect(OAClient.getAuthorizeUrl(result.oauthToken));

    } catch (e) {
      debug('get /oauth error: %s', e);
      this.body = e;
    }
  });

  app.get('/oauth_callback', function* () {
    try {
      var OAClient = GenericNote.OAuthClient(
        config.consumerKey,
        config.consumerSecret,
        this.session.type
      );

      OAClient.getAccessToken = thunk(OAClient.getAccessToken);
      var result = yield OAClient.getAccessToken(
        this.session.oauthToken,
        this.session.oauthTokenSecret,
        this.query.oauth_verifier
      );

      this.session.oauthAccessToken = result.oauthAccessToken;

      var genNote = GenericNote(this.session.oauthAccessToken, this.session.type);
      genNote.getUser = thunk(genNote.getUser);

      var user = yield genNote.getUser();

      User.findOne = thunk(User.findOne);
      var userResult = yield User.findOne(
        {
          sign: {
            type: this.session.type,
            id: user.id
          }
        },
        'id'
      );
      console.log('userResult' + userResult);
      var jwtId;
      if (!userResult) {
        var finalUser = new User({
          nickname: user.name,
          sign: {
            type: this.session.type,
            id: user.id
          },
          mainType: this.session.type,
          token: [{
            type: this.session.type,
            value: this.session.oauthAccessToken
          }]
        });

        finalUser.save = thunk(finalUser.save);
        var newUser = yield finalUser.save();

        jwtId = newUser.id;
      } else {
        jwtId = userResult.id;
      }

      var token = jwt.sign(
        {
          id: jwtId,
          time: new Date().getTime()
        },
        'fenzhishi'
      );
      this.cookies.set(
        'authorization',
        'Bearer ' + token,
        {expires: new Date().getTime() + 24*60*60*1000*365}
      );

      this.redirect('/');

    } catch (e) {
      debug('get /oauth_callback error: %s', e);
      this.body = e;
    }
  });

};
