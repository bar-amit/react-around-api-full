const user = require('../models/user');

function getUsers(req, res) {
  user.find({})
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
}

function getUserById(req, res) {
  const { id } = req.params;
  if (!/^[a-zA-Z0-9]{24}$/.test(id)) res.status(400).send({ message: 'Invalid ID' });
  else {
    user.findById(id)
      .then((data) => {
        if (data) res.send(data);
        else {
          const UserNotFoundError = new Error('User ID not found');
          UserNotFoundError.statusCode = 404;
          throw UserNotFoundError;
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') res.status(400).send({ message: err.message });
        else if (err.statusCode === 404) res.status(404).send({ message: err.message });
        else res.status(500).send({ message: err.message });
      });
  }
}

async function postUsers(req, res) {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await user.create({ name, about, avatar });
    if (newUser) res.send({ user: newUser });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).send({ message: err.message });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

async function updateUser(req, res) {
  const { _id: id } = req.user;
  const { name, about } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(id, { name, about }, { returnDocument: 'after', runValidators: true });
    if (updatedUser) res.send({ user: updatedUser });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).send({ message: err.message });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

async function updateAvatar(req, res) {
  const { _id: id } = req.user;
  const { avatar } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(id, { avatar }, { returnDocument: 'after', runValidators: true });
    if (updatedUser) res.send({ user: updatedUser });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).send({ message: err.message });
    else res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

module.exports = {
  getUsers, getUserById, postUsers, updateUser, updateAvatar,
};
