const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const signup = new Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: 1,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    address: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: [true, 'phone no is required'],
        unique: 1,
        minlength: 10
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = signup