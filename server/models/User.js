const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  emailAddress: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  decks: {
    type: [],
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model("Users", UserSchema);
