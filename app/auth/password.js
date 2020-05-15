'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');

// Require User model
const User = require('../staff/staffModel');


//PASSWORD VALIDATION
// Routes
// Matches with /validate
router
    .route('/')
    // POST route to log in a user
    .post(function (req, res) {
        console.log(req.body)
        User.findOne({ pin: req.body.pin })
            .then(function (user) {
                console.log(user)
                if (user === null) {
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: 'No such user'
                        }
                    });
                } else {
                    const attempt = hashPass(req.body.password, user.salt);
                    if (attempt.hash === user.password) {
                        res.status(200).json(user);
                    } else {
                        res.status(401).json({
                            error: {
                                code: 401,
                                message: 'Bad credentials'
                            }
                        });
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;