const { promisify } = require('util');
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

// send jwt token after its creation
const sendJWTToken = (statusCode, creator, res) => {

    const token = signInToken(creator._id);

    // hides the password field on signup/login
    creator.password = 'undefined';

    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            creator
        }
    });
}


// protect routes from un-authenticated req
exports.protectRoute = catchAsyncError(async (req, res, next) => {

    // checks for jwt token (provided after successful login)
    let token = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // if token is not present 
    if(!token) {
        return next(new AppError('You are not logged in', 401));
    }

    // decode the jwt token to get the creatorId
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check for existing user
    const existingCreator = await Creator.findById(decodedToken.id);

    // if no creator exist w/ given id
    if(!existingCreator) {
        return next(new AppError('The Creator no longer exist', 401));
    }

    // check if creator has changed its password
    if(existingCreator.isPasswordChanged(decodedToken.iat)) {
        return next(new AppError('You changed your password! Plz login again', 401));
    }

    // pass the existing creator to the req 
    req.creator = existingCreator;
    next();
});

// signs up a new creator
exports.signup = catchAsyncError(async (req, res, next) => {
    
    const creator = await Creator.create(req.body);

    sendJWTToken(201, creator, res);
});

// logs in a existing user
exports.login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    // Checked the email and password
    if(!email || !password) {
        return next(new AppError(`Please provide email and password`, 400));
    }

    // find the user based on provided credentials
    const creator = await Creator.findOne({email}).select('+password');

    // returns error if no user exist
    if(!creator || !(await creator.isCorrectPassword(password, creator.password))) {
        return next(new AppError('Incorrect name or password', 401));
    }

    // send jwt token if user exist
    sendJWTToken(200, creator, res);
});