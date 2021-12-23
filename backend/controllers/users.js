const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "not-a-secret-just-a-string" } = process.env;
const {
  forbiddenError,
  badRequestError,
  notFoundError,
  serverError,
  unauthorizedErorr,
} = require("../utils/errors");

function getUsers(req, res) {
  user
    .find({})
    .then((data) => res.send(data))
    .catch((err) => next(new serverError(err.message)));
}

function getUserInfo(req, res) {
  user
    .findById(req.user._id)
    .then((userData) => res.send(userData))
    .catch((err) => next(new serverError(err.message)));
}

function getUserById(req, res) {
  const { id } = req.params;
  if (!/^[a-zA-Z0-9]{24}$/.test(id)) next(new badRequestError("Invalid ID"));
  user
    .findById(id)
    .then((data) => {
      if (data) res.send(data);
      next(new notFoundError("User ID not found"));
    })
    .catch((err) => {
      next(new serverError(err.message));
    });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const userData = await user.findOne({ email }).select("+password");
    if (!userData) next(new unauthorizedErorr("Incorrect password or email"));
    const isAuthenticated = await bcrypt.compare(password, userData.password);
    if (!isAuthenticated)
      next(new unauthorizedErorr("Incorrect password or email"));
    const token = jwt.sign({ _id: userData._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (err) {
    next(new serverError(err.message));
  }
}

async function registerUser(req, res) {
  const {
    name = "Jacques Cousteau",
    about = "Explorer",
    avatar = "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
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
    else next(new serverError("An error has occurred on the server!"));
  } catch (err) {
    next(new serverError(err.message));
  }
}

async function updateUser(req, res) {
  const { _id: id } = req.user;
  const { name, about } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, about },
      { returnDocument: "after", runValidators: true }
    );
    if (updatedUser) res.send(updatedUser);
    else next(new serverError("An error has occurred on the server!"));
  } catch (err) {
    next(new serverError(err.message));
  }
}

async function updateAvatar(req, res) {
  const { _id: id } = req.user;
  const { avatar } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { avatar },
      { returnDocument: "after", runValidators: true }
    );
    if (updatedUser) res.send(updatedUser);
    else next(new serverError("An error has occurred on the server!"));
  } catch (err) {
    next(new serverError(err.message));
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
