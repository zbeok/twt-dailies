const needle = require("needle");

var twitter_api_1 = "https://api.twitter.com/1.1/";
var twitter_api_2 = "https://api.twitter.com/2/";

const token = process.env.BEARER_TOKEN;
var options = {
  headers: {
    "User-Agent": "market-dailies",
    Authorization: "Bearer " + token
  }
};

class Activity {
  constructor(db) {
    this.db = db;
  }
  //GETS
  // GET https://api.twitter.com/2/tweets/search/recent?query=from:TwitterDev
  async get_twts(user_id) {
    var url = twitter_api_2 + "users/" + user_id + "/tweets";
    return new Promise(resolve => {
      this._api_call(url, options).then(result => {
        resolve(result);
      });
    });
  }
  // GET https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=twitterdev
  async get_likes(username) {
    var url = twitter_api_1 + "favorites/list.json?screen_name=" + username;
    return new Promise(resolve => {
      this._api_call(url, options).then(result => {
        resolve(result);
      });
    });
  }

  // GET /2/users/by/username/:username
  async get_id(username) {
    var url = twitter_api_2 + "users/by/username/" + username;
    return new Promise(resolve => {
      this._api_call(url, options).then(result => {
        resolve(result.data.id);
      });
    });
  }

  tweets_parse(body) {
    var result = {
      shares: 0,
      comments: 0,
      posts: 0,
      content_posts: 0
    };
    for (var i in body.data) {
      var tweet = body.data[i];
      if (tweet.text.startsWith("RT")) {
        //shares
        result["shares"] += 1;
      } else if (tweet.text.startsWith("@")) {
        // comment
        result["comments"] += 1;
      } else {
        // posts
        result["posts"] += 1;
      }
      // content_posts TODO
    }
    return result;
  }

  likes_parse(body) {
    return body.length;
  }

  async activity(username) {
    
    return new Promise(resolve => {
    console.log("activity");
    this.get_id(username)
      .then(id => {
        console.log("getting twts");
        return Promise.all([this.get_likes(username), this.get_twts(id)]);
      })
      .then(result => {
        console.log("parsing twts");
        var dict = this.tweets_parse(result[1]);
        dict["likes"] = this.likes_parse(result[0]);
        return dict;
      });
    console.log("wow")
    });
  }

  _api_call(url, options = {}) {
    return new Promise(resolve => {
      needle.get(url, options, function(error, response) {
        if (!error && response.statusCode == 200) {
          resolve(response.body);
        } else {
          console.log(error);
        }
      });
    });
  }
}
module.exports = Activity;
