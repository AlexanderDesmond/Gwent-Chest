require("dotenv").config();
const port = process.env.PORT || 3000;

const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const BodyParser = require("body-parser");

const app = Express();
app.use(Cors());
app.use(BodyParser.json({ limit: "50mb" }));
app.use(
  BodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

// Routes
const routes = require("./routes/routes");
app.use("/", routes);

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
