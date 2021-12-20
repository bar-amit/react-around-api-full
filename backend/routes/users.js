const usersRouter = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getUserInfo,
  getUsers,
  getUserById,
  postUsers,
  updateUser,
  updateAvatar,
  loginUser,
} = require("../controllers/users");

/*
    unprotected user routes:
*/
usersRouter.post("/signup", postUsers);
usersRouter.post("/signin", loginUser);

/*
  Authorization:
*/
usersRouter.use(auth);

/*
    protected user routes:
*/
usersRouter.get("/users/:id", getUserById);
usersRouter.get("/users", getUsers);
usersRouter.get("/users/me", getUserInfo);
usersRouter.patch("/users/me", updateUser);
usersRouter.patch("/users/me/avatar", updateAvatar);

module.exports = { usersRouter };
