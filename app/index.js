'use strict';

// Dependencies
const path = require('path');
const router = require('express').Router(); // Create a Router instance

// Require all API routes
const staff = require('./staff');


// Require authentication routes
const auth = require('./auth');

// API routes
router.use('/api/staff', staff.controller);

// Authentication routes
router.use('/login', auth.login);
router.use('/password', auth.password);
router.use('/session', auth.session);

// If no API routes are hit, send React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
