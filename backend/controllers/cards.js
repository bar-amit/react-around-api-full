const card = require("../models/card");

function getCards(req, res) {
  card
    .find({})
    .then((data) => res.send(data))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
}

function postCard(req, res) {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  card
    .create({ name, link, owner: userId })
    .then((newCard) => res.send({ card: newCard }))
    .catch((err) => res.status(400).send({ message: err.message }));
}

async function deleteCard(req, res) {
  const { _id: userId } = req.user;
  const { id } = req.params;
  try {
    if (!/^[a-zA-Z0-9]{24}$/.test(id)) {
      const invalidIdError = new Error("Invalid Id");
      invalidIdError.statusCode = 400;
      throw invalidIdError;
    }
    const cardToDelete = await card.findById(id);
    if (!cardToDelete) {
      const CardNotFoundError = new Error("Card ID not found");
      CardNotFoundError.statusCode = 404;
      throw CardNotFoundError;
    }
    if (`${cardToDelete.owner}` === userId) {
      await card
        .findByIdAndDelete(id)
        .then((deletedCard) => res.send({ card: deletedCard }));
    }
    const userDontOwnCard = new Error("Current user doesn't own this card");
    userDontOwnCard.statusCode = 403;
    throw userDontOwnCard;
  } catch (err) {
    if (
      err.statusCode === 404 ||
      err.statusCode === 403 ||
      err.statusCode === 400
    ) {
      res.status(err.statusCode).send({ message: err.message });
    } else res.status(500).send({ message: err.message });
  }
}

async function likeCard(req, res) {
  const { _id: userId } = req.user;
  const { id: cardId } = req.params;
  try {
    if (!/^[a-zA-Z0-9]{24}$/.test(cardId)) {
      const invalidIdError = new Error("Invalid ID");
      invalidIdError.statusCode = 400;
      throw invalidIdError;
    }
    const updatedCard =
      req.method === "PUT"
        ? await card.findByIdAndUpdate(
            cardId,
            { $addToSet: { likes: userId } },
            { new: true }
          )
        : await card.findByIdAndUpdate(
            cardId,
            { $pull: { likes: userId } },
            { new: true }
          );
    if (!updatedCard) {
      const CardNotFoundError = new Error("Card ID not found");
      CardNotFoundError.statusCode = 404;
      throw CardNotFoundError;
    } else res.send(updatedCard);
  } catch (err) {
    if (
      err.statusCode === 404 ||
      err.statusCode === 403 ||
      err.statusCode === 400
    ) {
      res.status(err.statusCode).send({ message: err.message });
    } else res.status(500).send({ message: err.message });
  }
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
};
