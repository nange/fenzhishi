/**
 * 认证过程
 * 获取accessToken
 *
 */
var thunk    = require('thunkify');
var GenericNote = require('generic-note');
var config = require('../../config');

module.exports = function(app) {

  app.get('/oauth', function* () {
    try {
      var OAClient = GenericNote.OAuthClient(config.consumerKey,
        config.consumerSecret, 'evernote');

      var getRequestToken = thunk(OAClient.getRequestToken);

      var result = yield getRequestToken.call(OAClient, config.callbackUrl);

      this.session.oauthToken = result.oauthToken;
      this.session.oauthTokenSecret = result.oauthTokenSecret;

      // redirect the user to authorize the token
      this.redirect(OAClient.getAuthorizeUrl(result.oauthToken));

    } catch (error) {
      this.body = error;
    }

  });

  app.get('/oauth_callback', function* () {
    try {
      var OAClient = GenericNote.OAuthClient(config.consumerKey,
        config.consumerSecret, 'evernote');

      var getAccessToken = thunk(OAClient.getAccessToken);

      var result = yield getAccessToken.call(OAClient, this.session.oauthToken,
        this.session.oauthTokenSecret, this.query.oauth_verifier);

      this.session.oauthAccessToken = result.oauthAccessToken;

      this.body = 'oauthAccessToken:' + result.oauthAccessToken;

    } catch (error) {
      this.body = error;
    }

  });


};
