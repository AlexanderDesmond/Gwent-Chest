const Express = require("Express");
const Router = Express.Router();

const UserController = require("../controllers/UserController");
const DeckController = require("../controllers/DeckController");

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

module.exports = Router;
