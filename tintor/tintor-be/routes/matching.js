const express = require('express');
const route = express.Router();
const matchingController = require('../controllers/matching');

route.post('/', matchingController.getMatchingResults);

console.log('Matching route loaded');

module.exports = route;

