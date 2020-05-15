'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');

// Require User model
const Staff = require('./staffModel');



// Routes
// Matches with /api/staff
router
    .route('/')
    // GET route for listing all users sorted by id, with the most recent appearing first
    .get(function (req, res) {
        console.log(req.params)

        const query = req.query;

        Staff.find(query).select('-session -pin -password -salt') //Omit all 'secure' data
            .sort({ lastName: 1 })
            .then(function (staff) {
                res.status(200).json(staff);
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err);
            });
    })
    // POST route for creating a user
    // Add authentification later
    .post(function (req, res) {
        console.log(req.body)
        const password = hashPass(req.body.password);
        const request = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: req.body.displayName,
            pin: req.body.pin,
            password: password.hash,
            salt: password.salt
        };

        Staff.create(request)
            .then(function (staff) {
                res.status(200).json(staff);
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err);
            });
    });


module.exports = router;
