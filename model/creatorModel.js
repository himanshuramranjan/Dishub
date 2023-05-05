const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

// update passwordChangedAt, if password is changed
creatorSchema.pre('save', function(next) {

    // if pswd not modified in any update or when new user sign up
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// encrpt the user password
creatorSchema.pre('save', async function(next) {

    // if during update password field is not changed
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    return (next);
});

// compares the actual password w/ user provided password
creatorSchema.methods.isCorrectPassword = async function(candidatePswd, creatorPswd) {
    return await bcrypt.compare(candidatePswd, creatorPswd);
}

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;