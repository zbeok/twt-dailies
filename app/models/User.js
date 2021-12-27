const roles_ref = require('../ref/roles');

class User {
  constructor (id, username) {
    this.id = id;
    this.username = username;
    this.startDate = Date.now();
    this.pts = 0;
    this.items = {};
    this.role = "friend";
    this.stats = {
      "shares":0,
      "likes":0,
      "follows":0,
      "comments":0,
      "posts":0,
      "content_posts":0,
    };
    this.ledger = roles_ref["friend"];
    this.rates = {
      //add rates
    };
  }
  role_change (role) {
    this.role = role;
    if (role in roles_ref) {
      this.ledger = roles_ref[role];
      return true;
    } else {
      return false;
    }
  }
}

module.exports = User;