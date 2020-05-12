'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define User schema
const staffSchema = new Schema(
    {
        name: {
            first: { type: String, trim: true, lowercase: true },
            last: { type: String, trim: true, lowercase: true }
        },
        checkouts: [
            {
                ref: 'Checkout',
                type: Schema.Types.ObjectId
            }
        ],
        pin: {
            type: Number,
            validate: {
                validator: function (v) {
                    return /d{4}/.test(v);
                },
                message: '{VALUE} is not a valid 4 digit number!'
            }
        },
        salt: {
            required: true,
            type: String
        },
        session: {
            default: null,
            type: String
        }
    },
    { timestamps: true }
);

// Create User model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
