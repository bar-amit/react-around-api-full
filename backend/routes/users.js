const usersRouter = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getUserInfo,
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  updateAvatar,
  loginUser,
} = require("../controllers/users");
const {
  idValidator,
  userLoginValidator,
  userDataValidator,
  avatarValidator,
} = require("../validators/users");

/*
    unprotected user routes:
*/
usersRouter.post("/signup", userLoginValidator, registerUser);
usersRouter.post("/signin", userLoginValidator, loginUser);

/*
  Authorization:
*/
usersRouter.use(auth);

/*
    protected user routes:
*/
usersRouter.get("/users/me", getUserInfo);
usersRouter.patch("/users/me", userDataValidator, updateUser);
usersRouter.patch("/users/me/avatar", avatarValidator, updateAvatar);
usersRouter.get("/users/:id", idValidator, getUserById);
usersRouter.get("/users", getUsers);

module.exports = { usersRouter };
