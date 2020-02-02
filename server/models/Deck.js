const Mongoose = require("mongoose");

const DeckScheme = Mongoose.Schema({
  deck: {
    type: {},
    required: true
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model("Decks", DeckScheme);
