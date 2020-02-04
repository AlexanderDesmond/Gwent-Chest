const Express = require("Express");
const Router = Express.Router();

const UserController = require("../controllers/UserController");
const DeckController = require("../controllers/DeckController");
const AuthController = require("../controllers/AuthController");

// Users
Router.route("/users")
  .get(UserController.getUsers)
  .post(UserController.createUser);

// User
Router.route("/users/:id")
  .get(UserController.getUser)
  .put(UserController.editUser)
  .delete(UserController.deleteUser);

// Decks
Router.route("/decks")
  .get(DeckController.getDecks)
  .post(DeckController.createDeck);

// Deck
Router.route("/decks/:id")
  .get(DeckController.getDeck)
  .put(DeckController.editDeck)
  .delete(DeckController.deleteDeck);

// Register new user
Router.route("/users/register").post(AuthController.register);

// Login user
Router.route("/users/login").post(AuthController.login);

// Test jwt
const verify = require("../helpers/verifyToken");
Router.route("/")
  .all(verify)
  .get(async (req, res) => {
    //res.json({ posts: { title: "title", description: "description" } });
    res.send(req.user);
  });

module.exports = Router;
