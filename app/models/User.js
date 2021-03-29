const uuid = require('uuid');

class User {
  constructor (name,pass) {
    this.uuid = uuid.v4();
    this.name = name;
    this.pass = pass;
    this.pts = 0;
    this.items = {};
    this.role = "friend";
    this.stats = {
      //add action count
    };
    this.ledger = {
      //add ledger
    };
    this.rates = {
      //add ledger
    };
  }

  validate (role) {
    this.role = role;
  }
}

module.exports = User;