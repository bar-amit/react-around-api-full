const card = require('../models/card');
const {
  forbiddenError,
  badRequestError,
  notFoundError,
  serverError,
} = require('../utils/errors');

function getCards(req, res, next) {
  card
    .find({})
    .sort({ createdAt: 'desc' })
    .then((data) => res.send(data))
    .catch(() => next(new serverError('An error has occurred on the server')));
}

function postCard(req, res, next) {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  card
    .create({ name, link, owner: userId })
    .then((newCard) => res.send(newCard))
    .catch((err) => next(new badRequestError(err.message)));
}

async function deleteCard(req, res, next) {
  const { _id: userId } = req.user;
  const { id } = req.params;
  try {
    if (!/^[a-zA-Z0-9]{24}$/.test(id)) next(new badRequestError('Invalid ID'));
    const cardToDelete = await card.findById(id);
    if (!cardToDelete) next(new notFoundError('Card ID not found'));
    if (`${cardToDelete.owner}` === userId) {
      await card
        .findByIdAndDelete(id)
        .then((deletedCard) => res.send({ card: deletedCard }));
    }
    next(new forbiddenError("Current user doesn't own this card"));
  } catch (err) {
    next(new serverError(err.message));
  }
}

async function likeCard(req, res, next) {
  const { _id: userId } = req.user;
  const { id: cardId } = req.params;
  try {
    if (!/^[a-zA-Z0-9]{24}$/.test(cardId)) next(new badRequestError('Invalid ID'));
    const updatedCard = req.method === 'PUT'
      ? await card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
      )
      : await card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true },
      );
    if (!updatedCard) next(new notFoundError('Card ID not found'));
    res.send(updatedCard);
  } catch (err) {
    next(new serverError(err.message));
  }
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
};
