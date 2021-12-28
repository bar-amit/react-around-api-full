const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const { JWT_SECRET = 'not-a-secret-just-a-string' } = process.env;
const {
  NotFoundError,
  ServerError,
  UnauthorizedErorr,
  DuplicateError,
} = require('../utils/errors');

function getUsers(req, res, next) {
  user
    .find({})
    .then((data) => res.send(data))
    .catch((err) => next(new ServerError(err.message)));
}

function getUserInfo(req, res, next) {
  user
    .findById(req.user._id)
    .then((userData) => res.send(userData))
    .catch((err) => next(new ServerError(err.message)));
}

function getUserById(req, res, next) {
  const { id } = req.params;
  user
    .findById(id)
    .then((data) => {
      if (data) res.send(data);
      next(new NotFoundError('User ID not found'));
    })
    .catch((err) => {
      next(new ServerError(err.message));
    });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const userData = await user.findOne({ email }).select('+password');
    if (!userData) next(new UnauthorizedErorr('Incorrect password or email'));
    const isAuthenticated = await bcrypt.compare(password, userData.password);
    if (!isAuthenticated) next(new UnauthorizedErorr('Incorrect password or email'));
    const token = jwt.sign({ _id: userData._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.send({ token });
  } catch (err) {
    next(new ServerError(err.message));
  }
}

async function registerUser(req, res, next) {
  const {
    name = 'Jacques Cousteau',
    about = 'Explorer',
    avatar = 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    if (newUser) res.send({ user: newUser });
    else next(new ServerError('An error has occurred on the server!'));
  } catch (err) {
    if (err.code === 11000) next(new DuplicateError('Email allready exists on the server.'));
    next(new ServerError(err));
  }
}

async function updateUser(req, res, next) {
  const { _id: id } = req.user;
  const { name, about } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, about },
      { returnDocument: 'after', runValidators: true },
    );
    if (updatedUser) res.send(updatedUser);
    else next(new ServerError('An error has occurred on the server!'));
  } catch (err) {
    next(new ServerError(err.message));
  }
}

async function updateAvatar(req, res, next) {
  const { _id: id } = req.user;
  const { avatar } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { avatar },
      { returnDocument: 'after', runValidators: true },
    );
    if (updatedUser) res.send(updatedUser);
    else next(new ServerError('An error has occurred on the server!'));
  } catch (err) {
    next(new ServerError(err.message));
  }
}

module.exports = {
  getUserInfo,
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  updateAvatar,
  loginUser,
};
