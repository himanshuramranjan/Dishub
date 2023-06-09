const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const Creator = require('../model/creatorModel');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');

// creates signIn token using jwt
const signInToken = id => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// creates signOut token using jwt
const signOutToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "10s"
    });
}

// send jwt token after its creation
const sendJWTToken = (statusCode, creator, res) => {

    const token = signInToken(creator._id);

    // set cookie options
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    // sets cookie to send jwt 
    res.cookie('jwt', token, cookieOptions);

    // hides the password field on signup
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

    // check for existing creator
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

// protect routes from un-authorized req
exports.restrictRoute = (...roles) => {
    return (req, res, next) => {

        // checks if req has roles for the action
        if(!roles.includes(req.creator.role)) {
            return next(new AppError('You are not authorized for this action', 403));
        }
        next();
    }
}

// signs up a new creator
exports.signup = catchAsyncError(async (req, res, next) => {
    
    const creator = await Creator.create(req.body);

    sendJWTToken(201, creator, res);
});

// logs in a existing creator
exports.login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    // Checked the email and password
    if(!email || !password) {
        return next(new AppError(`Please provide email and password`, 400));
    }

    // find the creator based on provided credentials
    const creator = await Creator.findOne({email}).select('+password');

    // returns error if no creator exist
    if(!creator || !(await creator.isCorrectPassword(password, creator.password))) {
        return next(new AppError('Incorrect name or password', 401));
    }

    // send jwt token if creator exist
    sendJWTToken(200, creator, res);
});


// update password for logged In Creator
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    // get the creator
    const creator = await Creator.findById(req.creator.id).select('+password');

    // check if provided password is incorrect
    if(!(await creator.isCorrectPassword(req.body.currentPassword, creator.password))) {
        return next(new AppError('Your current password is wrong', 401));
    }

    // update the creator password
    creator.password = req.body.password;
    creator.passwordConfirm = req.body.passwordConfirm;
    await creator.save();

    sendJWTToken(200, creator, res);
});

// checks if the Creator is same as logged In Creator
exports.checkCreator = Model => catchAsyncError(async (req, res, next) => {
    
    const doc = await Model.findById(req.params.id);

    // check if current creator is the owner of the post
    if(!doc.creator._id.equals(req.creator.id)) {
        
        return next(new AppError(`You are not authorized to modify this post`, 403));
    }
    next();
});

// logs out a existing creator
exports.logout = catchAsyncError(async (req, res, next) => {

    const token = signOutToken(req.creator._id);

    // set cookie to expire in 10sec (Creator logs out)
    const cookieOptions = {
        expires: new Date(
            Date.now() +  10 * 1000
        ),
        httpOnly: true
    }

    // set cookie to set jwt as blank (and expires in 10s)
    res.cookie('jwt', "", cookieOptions);

    res.status(200).json({
        status: 'Success',
        token,
    });
});