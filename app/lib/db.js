var User = require("../models/User");

class DB {
  constructor (db) {
    this.db=db;
    this.users=db.get('users');
    // this.db=db;
  }

//   register(body) {
//     var matches = this.users.filter({'name':body.name}).value();
//     if (matches.length>0)  {
//       return false;
//     }
//     return true;
//   }
  
  new_user(id, username){
    var new_user = new User(id, username);
    var result_user = this.users
      .push(new_user)
      .write();
    return (new_user);
  }
  
  find_user(filter) {
    var matches = this.users
      .filter(filter)
      .value();
    if (matches.length == 0) {
      return null;
    }
    return matches[0];
  }
  
}
module.exports = DB;