'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');
const uuidv1 = require('uuid/v1');

// Require User model
const User = require('../staff/staffModel');



// Routes
// Matches with /login
router
    .route('/')
    // POST route to log in a user
    .post(function (req, res) {
        User.findOne({ pin: req.body.pin })
            .then(function (user) {
                if (user === null) {
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: 'No such user'
                        }
                    });
                } else {

                    const uuid = uuidv1();

                    User.findOneAndUpdate(
                        { pin: user.pin },
                        { session: uuid },
                        { new: true }
                    )
                        .populate({
                            path: 'chits',
                            options: { sort: { _id: -1 } }
                        })
                        .then(function (dbUser) {
                            res.status(200)
                                .header('x-session-token', dbUser.session)
                                .json(dbUser);
                        })
                        .catch(function (err) {
                            res.status(500).json(err);
                        });
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route to log out a user
    .delete(function (req, res) {
        User.findOneAndUpdate(
            { session: req.headers['x-session-token'] },
            { session: null },
            { new: true }
        )
            .then(function (user) {
                res.status(200).json({
                    message: `${user.displayName} logged out successfully`
                });
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
