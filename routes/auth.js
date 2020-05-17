const express = require('express');
const auth = express.Router();
const userController = require('../controllers/user.controllers');

auth.post('/signin', userController.signin);
auth.post('/login', userController.login);

module.exports = auth;
