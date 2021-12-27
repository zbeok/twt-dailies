
module.exports = function(app, db) {
 app.get("/test/users", function(req, res) {
    
    res.send(db.users.value());
  });  

  app.delete("/clear/users", function(req, res) {
    // removes all entries from the collection
    console.log("User data cleared");
    db.users
      .remove()
      .write();
    res.send("User data cleared");
  });

  app.delete("/clear/items", function(req, res) {
    // removes all entries from the collection
    db.items
      .remove()
      .write();
    res.send("Item data cleared");
  });
};
