const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "not-a-secret-just-a-string" } = process.env;

function getUsers(req, res) {
  user
    .find({})
    .then((data) => res.send(data))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
}

function getUserInfo(req, res) {
  user.findById(req.user._id).then((userData) => res.send(userData));
}

function getUserById(req, res) {
  const { id } = req.params;
  if (!/^[a-zA-Z0-9]{24}$/.test(id))
    res.status(400).send({ message: "Invalid ID" });
  else {
    user
      .findById(id)
      .then((data) => {
        if (data) res.send(data);
        else {
          const UserNotFoundError = new Error("User ID not found");
          UserNotFoundError.statusCode = 404;
          throw UserNotFoundError;
        }
      })
      .catch((err) => {
        if (err.name === "CastError")
          res.status(400).send({ message: err.message });
        else if (err.statusCode === 404)
          res.status(404).send({ message: err.message });
        else res.status(500).send({ message: err.message });
      });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const userData = user.findOne({ email }).select("+password");
    if (!userData) Promise.reject(new Error("Incorrect password or email"));
    const isAuthenticated = bcrypt.compare(userData.password, password);
    if (!isAuthenticated)
      Promise.reject(new Error("Incorrect password or email"));
    const token = jwt.sign({ _id: userData._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "An error has occurred on the server" });
  }
}

async function postUsers(req, res) {
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
    else
      res.status(500).send({ message: "An error has occurred on the server" });
  } catch (err) {
    if (err.name === "ValidationError")
      res.status(400).send({ message: err.message });
    else
      res.status(500).send({ message: "An error has occurred on the server" });
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
    if (updatedUser) res.send({ user: updatedUser });
    else
      res.status(500).send({ message: "An error has occurred on the server" });
  } catch (err) {
    if (err.name === "ValidationError")
      res.status(400).send({ message: err.message });
    else
      res.status(500).send({ message: "An error has occurred on the server" });
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
    if (updatedUser) res.send({ user: updatedUser });
    else
      res.status(500).send({ message: "An error has occurred on the server" });
  } catch (err) {
    if (err.name === "ValidationError")
      res.status(400).send({ message: err.message });
    else
      res.status(500).send({ message: "An error has occurred on the server" });
  }
}

module.exports = {
  getUserInfo,
  getUsers,
  getUserById,
  postUsers,
  updateUser,
  updateAvatar,
  loginUser,
};
