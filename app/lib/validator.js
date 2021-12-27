class Validator {
  constructor (db) {
    this.db=db;
  }

  register(body) {
    var matches = this.db.get('users').filter({'name':body.name}).value();
    if (matches.length>0)  {
      return false;
    }
    return true;
  }
  
  tmp(body) {
    var matches = this.db.get('users').filter({'name':body.name}).value();
    if (matches.length>0)  {
      return false;
    }
    return true;
  }
}
module.exports = Validator;