const cardsRouter = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
} = require('../controllers/cards');
const { idValidator, cardDataValidator } = require('../validators/cards');

/*
  Authorization:
*/
cardsRouter.use(auth);

/*
    card routes:
*/
cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardDataValidator, postCard);
cardsRouter.delete('/cards/:id', idValidator, deleteCard);
cardsRouter.delete('/cards/likes/:id', idValidator, likeCard);
cardsRouter.put('/cards/likes/:id', idValidator, likeCard);

module.exports = { cardsRouter };
