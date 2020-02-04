const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const {
  registerValidation,
  loginValidation
} = require("../helpers/validation");

// REGISTER
exports.register = async (req, res) => {
  // Handle validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check to see if user already has an account.
  const emailExists = await UserModel.findOne({
    emailAddress: req.body.emailAddress
  });
  if (emailExists)
    return res
      .status(400)
      .send("Email address already exists within database.");

  // Hash the password.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user object.
  const user = new UserModel({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    password: hashedPassword
  });

  try {
    const result = await user.save();
    //res.send(result);
    res.send({ user: user._id });
  } catch (err) {
    res.status(500).send(err);
  }
};

// LOGIN
exports.login = async (req, res) => {
  // Handle the validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check to see if the email address is in the database.
  const user = await UserModel.findOne({
    emailAddress: req.body.emailAddress
  });
  if (!user) return res.status(400).send("Incorrect email address.");

  // Check to see if the password matches the password in the database.
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  // Create and sign token.
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};
