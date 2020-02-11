const DeckModel = require("../models/Deck");

const deckValidation = require("../helpers/validation");

// Get all decks.
exports.getDecks = async (req, res) => {
  try {
    const decks = await DeckModel.find().exec();
    res.send(decks);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a specific deck.
exports.getDeck = async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id).exec();
    res.send(deck);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new deck.
exports.createDeck = async (req, res) => {
  // Handle validation
  const { error } = deckValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create the deck.
  try {
    const deck = new DeckModel(req.body);
    const result = await deck.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Edit deck.
exports.editDeck = async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id).exec();
    deck.set(req.body);
    const result = await deck.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete deck.
exports.deleteDeck = async (req, res) => {
  try {
    const result = await DeckModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
