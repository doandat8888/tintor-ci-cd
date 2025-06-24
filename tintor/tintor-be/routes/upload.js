const express = require('express');
const route = express.Router();
const multer = require("multer");
const uploadController = require('../controllers/upload');
const upload = require('../helpers/multer');

route.post('/', upload.single("image"), uploadController.uploadImage);

module.exports = route;

