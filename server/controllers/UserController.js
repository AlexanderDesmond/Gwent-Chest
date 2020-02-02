const UserModel = require("../models/User");

// Get all users.
exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a specific user.
exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).exec();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new user.
exports.createUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Edit user.
exports.editUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).exec();
    user.set(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete user.
exports.deleteUser = async (req, res) => {
  try {
    const result = await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
