const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
  },
  pts: {
    type: Number
  },
  items: [{ 
    type: String
  }]
});

const User = mongoose.model("chats", UserSchema);
module.exports = User;