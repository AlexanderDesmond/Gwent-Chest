const Mongoose = require("mongoose");

const DeckScheme = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  deck: {
    type: {},
    required: true
  },
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Mongoose.model("Decks", DeckScheme);
