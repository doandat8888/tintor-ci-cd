const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

route.post('/login', authController.login);
route.post('/register', authController.register);
route.post('/refresh-token', authController.refreshToken);

module.exports = route;

