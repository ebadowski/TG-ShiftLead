'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define User schema
const staffSchema = new Schema(
    {

        firstName: {
            type: String,
            trim: true,
            lowercase: true
        },
        lastName: {
            type: String,
            trim: true,
            lowercase: true
        },
        displayName: {
            type: String,
            trim: true,
        },
        checkouts: [
            {
                ref: 'Checkout',
                type: Schema.Types.ObjectId
            }
        ],
        pin: {
            unique: true,
            type: Number,
            validate: {
                validator: function (v) {
                    return /^[0-9]{4}$/.test(v);
                },
                message: '{VALUE} is not a valid 4 digit number!'
            }
        },
        password: {
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
        },
        role: { 
            enum: ['admin', 'user', 'shiftlead'],
            default: 'user',
            lowercase: true,
            required: true,
            trim: true,
            type: String
        }
    },
    { timestamps: true }
);

// Create User model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
