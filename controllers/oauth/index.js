/**
 * 认证过程
 * 获取accessToken
 *
 */

var GenericNote = require('generic-note');
var config = require('../../config');

module.exports = function(app) {

  app.get('/oauth', function* () {
    var _this = this;
    var OAClient = GenericNote.OAuthClient(config.consumerKey, config.consumerSecret, 'evernote');

    OAClient.getRequestToken(
      config.callbackUrl,
      function(error, oauthToken, oauthTokenSecret) {

        if (error) {
          _this.session.error = JSON.stringify(error);
          _this.body = this.session.error;

        } else {
          // store the tokens in the session
          _this.session.oauthToken = oauthToken;
          _this.session.oauthTokenSecret = oauthTokenSecret;

          // redirect the user to authorize the token
          _this.redirect(OAClient.getAuthorizeUrl(oauthToken));
        }

      }
    );

  });


};
