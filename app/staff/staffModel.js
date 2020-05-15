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
            required: true,
            type: String
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
