const express = require('express');
const router = express.Router();

const auth = require('./middleware/auth');
const rateLimit = require('./middleware/rateLimit');
const feedController = require('./feed.controller');
const usersController = require('./users.controller');

// Apply auth and rateLimit to all routes
router.use(auth);
router.use(rateLimit);

// Feed routes
router.get('/feed', feedController.getFeed);

// User recommendation routes
router.get('/users/recommended', usersController.getRecommendedUsers);

module.exports = router;