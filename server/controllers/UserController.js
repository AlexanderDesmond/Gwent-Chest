const Mongoose = require("mongoose");

const User = require("../models/User");
const UserModel = Mongoose.model("user", User);
