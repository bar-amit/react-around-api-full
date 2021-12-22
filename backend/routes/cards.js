const cardsRouter = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
} = require("../controllers/cards");

/*
  Authorization:
*/
cardsRouter.use(auth);

/*
    card routes:
*/
cardsRouter.get("/cards", getCards);
cardsRouter.post("/cards", postCard);
cardsRouter.delete("/cards/:id", deleteCard);
cardsRouter.delete("/cards/likes/:id", likeCard);
cardsRouter.put("/cards/likes/:id", likeCard);

module.exports = { cardsRouter };
