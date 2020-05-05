const express = require('express');
const users = express.Router();
const userController = require('../controllers/user.controllers');

users.get('/:user_id', userController.getUser);
users.put('/:user_id', userController.updateUser);

module.exports = users;
