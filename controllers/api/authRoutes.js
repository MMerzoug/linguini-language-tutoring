const express = require('express');
const router = express.Router();
const userController = require('./userController');

// POST /api/auth/signup
router.post('/signup', userController.signup);

// POST /api/auth/login
router.post('/login', userController.login);

module.exports = router;
