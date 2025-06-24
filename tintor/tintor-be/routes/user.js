const express = require('express');
const route = express.Router();
const { verifyAccessTokenMiddleWare } = require('../helpers/jwt_service');
const userController = require('../controllers/user');

route.get('/', verifyAccessTokenMiddleWare, userController.getListUser);
route.get('/current', userController.getCurrentUser);
route.get('/:id', verifyAccessTokenMiddleWare, userController.getUserById);
route.patch('/:id', userController.updateUser);

module.exports = route;

