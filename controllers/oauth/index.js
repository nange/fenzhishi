/**
 * 认证过程
 * 获取accessToken
 *
 */
var debug = require('debug')('controllers:oauth:index');
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
    debug('jin ru hui diao')
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
      var userResult = yield User.findOne({
        mark: {
          noteType: this.session.type,
          id: user.id + ''
        }
      });
      debug('user result: ' + userResult);

      var jwtId;
      if (!userResult) {
        var finalUser = new User({
          nickname: user.name,
          mainType: this.session.type,
          mark: {
            noteType: this.session.type,
            id: user.id + ''
          },
          token: [{
            noteType: this.session.type,
            value: this.session.oauthAccessToken
          }]
        });
        
        var userPromise = new Promise(function(resolve, reject) {
          finalUser.save(function(err, user) {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          });
        });

        var newUser = yield userPromise;
        debug('new user: ' + newUser);

        jwtId = newUser.id;

      } else {
        jwtId = userResult.id;
      }
      debug('jwtId:' + jwtId);

      var token = jwt.sign(
        {
          id: jwtId,
          time: new Date().getTime()
        },
        'fenzhishi'
      );

      this.cookies.set(
        'authorization',
        'Bearer ' + token
      );
      debug('getTime:' + new Date().getTime());
      this.redirect('/');

    } catch (e) {
      debug('some error:' + e);
      this.body = e;
    }
  });

};
