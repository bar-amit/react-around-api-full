const usersRouter = require('express').Router();
const {
  getUsers, getUserById, postUsers, updateUser, updateAvatar,
} = require('../controllers/users');

/*
    user routes:
*/
usersRouter.get('/users/:id', getUserById);
usersRouter.get('/users', getUsers);
usersRouter.post('/users', postUsers);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = { usersRouter };
