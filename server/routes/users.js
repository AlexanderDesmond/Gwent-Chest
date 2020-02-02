const Express = require("Express");
const Router = Express.Router();

const UserModel = require("../models/User");

Router.post("/", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.get("/", async (req, res) => {
  try {
    const result = await UserModel.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).exec();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.put("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).exec();
    user.set(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const result = await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = Router;
