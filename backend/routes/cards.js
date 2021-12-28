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
cardsRouter.delete('/cards/:id/likes', idValidator, likeCard);
cardsRouter.put('/cards/:id/likes', idValidator, likeCard);
cardsRouter.delete('/cards/:id', idValidator, deleteCard);

module.exports = { cardsRouter };
