// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// configuration ===========================================
	
// Mongoose stuff
// var db = require('./config/db');
//mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// Setup lowdb 
const adapter = new FileSync('.data/db.json')
const db = low(adapter)


// Set some defaults (required if your JSON file is empty)
// db.defaults({ users: [], items: [] })
//   .write()


// var tmp =   db.get('users')
//     .push({ name:'Sophie', lastName: 'Sophie'})
//     .write();

// default user list
db.defaults({ users: [
      // {"firstName":"John", "lastName":"Hancock"},
      // {"firstName":"Liz",  "lastName":"Smith"},
      // {"firstName":"Ahmed","lastName":"Khan"}
    ]
  }).write();


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app,db); // pass our application into our routes

// start app ===============================================
var port = process.env.PORT || 8080; // set our port
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app