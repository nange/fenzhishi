/**
 * 认证过程
 * 获取accessToken
 *
 */
var thunk    = require('thunkify');
var GenericNote = require('generic-note');
var config = require('../../config');
var jwt = require('koa-jwt-comm');

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
      console.log(e);
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
      
      var token = jwt.sign(
        {userid: 'nange', time: new Date()},
        'fenzhishi'
      );
      this.cookies.set('authorization', 'Bearer ' + token);
      
      this.redirect('/');

    } catch (e) {
      console.log(e);
      this.body = e;
    }
  });

};
