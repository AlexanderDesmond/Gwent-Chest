require("dotenv").config();
const port = process.env.PORT || 3000;

const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const BodyParser = require("body-parser");

const app = Express();
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Import routes.
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
const deckRoutes = require("./routes/decks");
app.use("/decks", deckRoutes);

// Connect to database.
Mongoose.connect(
  process.env.TEST_MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database...");
  }
);

app.listen(port, () => {
  console.log("Listening to: Port 3000");
});
