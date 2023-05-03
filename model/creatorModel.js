const mongoose = require('mongoose');
const validator = require('validator');


const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Creator name is required']
    },
    email: {
        type: String,
        required: [true, 'Email Id is required'],
        unique: [true, 'An account exist w/ same Email Id'],
        lowercase: true,
        validate:  [validator.isEmail, 'Provide a valid email']
    },
    role: {
        type: String,
        enum: ['creator', 'admin'],
        default: 'creator'
    },
    password: {
        type: String,
        minLength: [8, 'Password should be 8 chars long'],
        required: [true, 'Password is required'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password Confirm is required'],
        validate: {
            validator: function(pswdConfirm) {
                return this.password == pswdConfirm;
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date, 
});

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;