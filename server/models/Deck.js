const Mongoose = require("mongoose");

const DeckScheme = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  deck: {
    type: {},
    required: true
  }
});

module.exports = Mongoose.model("Decks", DeckScheme);
