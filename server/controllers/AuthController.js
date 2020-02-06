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
    email: req.body.email
  });
  if (emailExists) {
    return res
      .status(400)
      .send("Email address already exists within database.");
  }
  // Check to see if username is available.
  const usernameExists = await UserModel.findOne({
    username: req.body.username
  });
  if (usernameExists) {
    return res.status(400).send("Username already taken.");
  }

  // Hash the password.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user object.
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const result = await user.save();
    //res.send(result);

    // Create the token.
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.TOKEN_SECRET
    );
    // Send the response.
    res.header("x-access-token", token);
    res.send({ auth: true, token: token, user: { username: user.username } });
  } catch (err) {
    res.status(500).send(err);
  }
};

// LOGIN
exports.login = async (req, res) => {
  // Handle the validation
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send("Failed validation: " + error.details[0].message);

  // Check to see if the username is in the database.
  const user = await UserModel.findOne({
    username: req.body.username
    //emailAddress: req.body.emailAddress
  });
  if (!user) return res.status(400).send("Incorrect username.");

  // Check to see if the password matches the password in the database.
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  // Create and sign token.
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h"
    }
  );
  //res.header("auth-token", token).send(token);
  //res.header("x-access-token", token).send(token);
  res.header("x-access-token", token);
  /*
  res.body({
    user: {
      username: user.username
    }
  });
  */
  res.send({
    auth: true,
    token: token,
    user: {
      username: user.username
    }
  });
};

// VERIFY TOKEN
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET),
    (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Failed to verify token."
        });
      }

      req.username = decoded.username;
      next();
    };
};

// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  const user = UserModel.findOne({ username: req.body.username });
  if (!user)
    return res
      .status(400)
      .send({ auth: false, message: "Could not find user" });

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return res.send({ auth: true, token: token, user: { username: username } });
};
