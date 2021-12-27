module.exports = function(app, activity, deeby) {
  // GETS
  app.get("/me", async function(req, res) {
    var match = deeby.find_user({ id: req.session.user_id });
    if (match == null) {
      res.status(404).send("No user with this username");
      return;
    }
    var twtdata = await activity.get_user(req.session.user_id);

    if (twtdata == null || !"data" in twtdata) {
      res.status(404).send("No user with this username");
      return;
    }
    match.twtdata = twtdata["data"];
    res.send(match);
    // });
  });
  app.get("/users", async function(req, res) {
    if (!req.query.username) {
      res.status(400).send("No username requested?");
      return;
    }
    var match = deeby.find_user(req.query);
    if (match == null) {
      res.status(404).send("No user with this username");
      return;
    }
    res.send(match);
    // });
  });

  app.get("/twts", async function(req, res) {
    var result = await activity.get_twts(req.query.user_id);
    res.send(result);
  });
  app.get("/likes", async function(req, res) {
    var result = await activity.get_likes(req.query.username);
    res.send(result);
  });

  app.get("/activity", async function(req, res) {
    activity.activity(req.query.username).then(result => {
      res.send(result);
    });
  });

  // SETS
  app.post("/update", function(req, res) {
    deeby.users
      .find({ uuid: req.body.uuid })
      .assign(req.body)
      .write();
  });
};
