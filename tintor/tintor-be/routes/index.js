const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const uploadRoutes = require('./upload');
const matchingRoutes = require('./matching');

const router = express.Router();

router.use('/auth', authRoutes); 
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);
router.use('/matching', matchingRoutes)

module.exports = router;