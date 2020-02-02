const Express = require("Express");
const Router = Express.Router();

const DeckModel = require("../models/Deck");

Router.post("/", async (req, res) => {
  try {
    const deck = new DeckModel(req.body);
    const result = await deck.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.get("/", async (req, res) => {
  try {
    const result = await DeckModel.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id).exec();
    res.send(deck);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.put("/:id", async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id).exec();
    deck.set(req.body);
    const result = await deck.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const result = await DeckModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = Router;
