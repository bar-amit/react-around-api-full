const card = require('../models/card');
const {
  ForbiddenError,
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('../utils/errors');

function getCards(req, res, next) {
  card
    .find({})
    .sort({ createdAt: 1 })
    .then((data) => res.send(data))
    .catch(() => next(new ServerError('An error has occurred on the server')));
}

function postCard(req, res, next) {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  card
    .create({ name, link, owner: userId })
    .then((newCard) => res.send(newCard))
    .catch((err) => next(new BadRequestError(err.message)));
}

async function deleteCard(req, res, next) {
  const { _id: userId } = req.user;
  const { id } = req.params;
  try {
    const cardToDelete = await card.findById(id);
    if (!cardToDelete) next(new NotFoundError('Card ID not found'));
    if (`${cardToDelete.owner}` === userId) {
      await card
        .findByIdAndDelete(id)
        .then((deletedCard) => res.send({ card: deletedCard }));
    }
    next(new ForbiddenError("Current user doesn't own this card"));
  } catch (err) {
    next(new ServerError(err.message));
  }
}

async function likeCard(req, res, next) {
  const { _id: userId } = req.user;
  const { id: cardId } = req.params;
  try {
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
    if (!updatedCard) next(new NotFoundError('Card ID not found'));
    res.send(updatedCard);
  } catch (err) {
    next(new ServerError(err.message));
  }
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
};
