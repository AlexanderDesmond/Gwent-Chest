const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  decks: {
    type: [],
    required: false
  }
});

module.exports = Mongoose.model("Users", UserSchema);
