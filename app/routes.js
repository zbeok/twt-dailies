var fs = require("fs");
var User = require("./models/User");
var Validator = require("./validator.js");
var Activity = require("./activity.js");
    
module.exports = function(app,db) {
  var validator = new Validator(db);
  var activity = new Activity(db);

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  
  //GETS
  app.get("/twts", async function(req, res) {
    var result = await activity.get_twts(req.query.user_id);
    res.send(result)
  });
  app.get("/likes", async function(req, res) {
    var result = await activity.get_likes(req.query.username);
    res.send(result);
  });
  
  app.get('/activity', async function(req, res) {
    var result = await activity.activity(req.query.username);
    res.send(result)
  });
  
  app.get("/user", function(req, res) {
    var matches = db.get('users').filter({'name':req.query.name}).value();
    if (matches.length==0)  {
      res.status(404).send("No user with this username");
      return;
    }
    res.send(matches[0]);
  });
  
  //SETS
  
  app.put("/login", function(req, res) {
    var user = db.get('users')
                 .find({ name: req.body.name,pass:req.body.pass })
                 .value();
      console.log(user)
    
    if (user==null) {
      res.status(404).send("no dice :^)");
      return;
    }
    res.send(user);
    
  });
  
  app.post("/register", function(req, res) {
    if (validator.register(req.body)==false) {
      res.status(400).send("Invalid user or pass. Maybe your username... isn't unique....");
      return;
    }
    
    var new_user = new User(req.body.name,req.body.pass)
    var result_user = db.get('users')
      .push(new_user)
      .write();
    res.send(new_user);
  });
  app.post("/update", function(req, res) {
    db.get('users')
    .find({uuid:req.body.uuid})
    .assign(req.body)
    .write()

  });
  
  app.delete("/clear/users", function(req, res) {
    // removes all entries from the collection
    console.log("User data cleared")
    db.get('users')
    .remove()
    .write()
    res.send("User data cleared");
  });
  
  app.delete("/clear/items", function(req, res) {
    // removes all entries from the collection
    db.get('items')
    .remove()
    .write()
    res.send("Item data cleared");
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get("*", function(req, res) {
    res.sendFile("./public/index.html", { root: "." });
  });

};
