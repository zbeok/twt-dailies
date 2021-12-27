var OAuth = require("oauth");
const needle = require("needle");

var User = require("./models/User");
var Deeby = require("./lib/db.js");
var Activity = require("./lib/twitter.js");

module.exports = function(app, db) {
  // init all data structure interfaces
  var deeby = new Deeby(db);
  var activity = new Activity(db);

  var oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.API_KEY,
    process.env.API_KEY_SECRET,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  // frontend routes =========================================================
  app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });

  app.get("/oauth", function(req, res) {
    var user = deeby.find_user({ id: req.session.user_id });
    
    if (user != null) {
      // already logged tf in
      res.redirect("/");
      return;
    }
    oauth.getOAuthRequestToken(function(
      error,
      oauth_token,
      oauth_token_secret,
      results
    ) {
      if (error || !results.oauth_callback_confirmed) {
        throw "Error occured while getting oauth request token";
        return;
      }
      req.session.oauth_token = oauth_token;
      req.session.oauth_token_secret = oauth_token_secret;
      res.send({token:oauth_token});
    });
  });

  app.get("/callback", function(req, res) {
    if (!req.session.oauth_token) {
      throw "Error occured while getting oauth request token";
      return;
    }
    /** Obtaining access_token */
    oauth.getOAuthAccessToken(
      req.query.oauth_token,
      req.session.oauth_token_secret,
      req.query.oauth_verifier,
      function(error, oAuthAccessToken, oAuthAccessTokenSecret, results) {
        if (error) {
          throw error;
        }

        oauth.get(
          "https://api.twitter.com/1.1/account/verify_credentials.json",
          oAuthAccessToken,
          oAuthAccessTokenSecret,
          function(error, twitterResponseData, result) {
            if (error) {
              throw error;
            }
            try {
              var user_data = JSON.parse(twitterResponseData);
              // console.log(JSON.parse(twitterResponseData));
            } catch (parseError) {
              console.log(parseError);
              throw parseError;
            }
            var user = deeby.find_user({ id: user_data["id"] });
            if (user == null) {
              // new user! login using oauth but maybe i should display a new user screen
              user = deeby.new_user(user_data["id"], user_data["screen_name"]);
            }
            req.session.user_id = user_data["id"];
            res.redirect("/");
          }
        );
      }
    );
  });

  // aux server routes ===========================================================
  // this file was getting rly long

  require("./routes/user")(app, activity, deeby);
  require("./routes/test")(app, deeby); // remove in prod

  // route to handle all angular requests
  app.get("*", function(req, res) {
    res.sendFile("./public/index.html", { root: "." });
  });
  require("./routes/error")(app);
};
