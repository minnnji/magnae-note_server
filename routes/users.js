const express = require('express');
const users = express.Router();
const checkAuth = require('../middlewares/authenticate');
const userController = require('../controllers/user.controllers');

users.get('/:user_id', checkAuth, userController.getUser);
users.put('/:user_id', checkAuth, userController.updateUser);

module.exports = users;
