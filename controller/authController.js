const jwt = require('jsonwebtoken');
const catchAsyncError = require('../utils/catchAsyncError');
const Creator = require('../model/creatorModel');
const AppError = require('../utils/AppError');


// creates signIn token using jwt
const signInToken = id => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// signs up a new creator
exports.signup = catchAsyncError(async (req, res, next) => {
    
    const creator = await Creator.create(req.body);
    const token = signInToken(creator._id);

    res.status(201).json({
        status: 'Success',
        token,
        data: {
            creator
        }
    });

});

// logs in a existing user
exports.login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError(`Please provide email and password`, 400));
    }

    const creator = await Creator.findOne({email}).select('+password');

    if(!creator || !(await creator.isCorrectPassword(password, creator.password))) {
        return next(new AppError('Incorrect name or password', 401));
    }

    const token = signInToken(creator._id);

    res.status(200).json({
        status: 'Success',
        token,
        data: {
            creator
        }
    });
});