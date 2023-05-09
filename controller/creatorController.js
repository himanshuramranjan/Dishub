const Creator = require('../model/creatorModel');
const globalController = require('./globalController');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

// filters out the filed which cant be updated
const filterObj = (obj, ...allowedFields) => {

    const newObj = {};
    // loop thru each key and if its permissible add it to newObj
    Object.keys(obj).forEach(elm => {
        if(allowedFields.includes(elm)) newObj[elm] = obj[elm];
    });
    return newObj;
}

// Get All Creator
exports.getAllCreators = globalController.getAll(Creator);

// Get a Creator
exports.getCreator = globalController.getOne(Creator);


// Create a Creator
exports.createCreator = catchAsyncError(async (req, res, next) => {

    res.status(500).json({
        status: 'Error',
        message: 'Route not defined ! Please use /signup'
    });
})

// Update the Creator 
exports.updateCreator = catchAsyncError(async (req, res, next) => {

    res.status(500).json({
        status: 'Error',
        message: 'Route not defined ! Only Creator can modify its data'
    });
})

// Delete the Creator
exports.deleteCreator = globalController.deleteOne(Creator);


// Set the id params of the creator
exports.getMe = (req, res, next) => {

    // populate params.id w/ creator id 
    req.params.id = req.creator.id;
    next();
}

// Update the creator's account by theirself
exports.updateMe = catchAsyncError(async (req, res, next) => {
    
    // if creator want to updates its password from this route
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError(`This route is not for updating password`, 400));
    }

    // filters out the field which cant be updated
    const filterReq = filterObj(req.body, 'name', 'email');

    // update the user 
    const updatedCreator = await Creator.findByIdAndUpdate(req.creator.id, filterReq, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'Success',
        data: {
            creator: updatedCreator
        }
    });
});

// Delete the creator's account by theirself
exports.deleteMe = catchAsyncError(async (req, res, next) => {

    // delete the creator account
    await Creator.findByIdAndDelete(req.creator.id);

    res.status(204).json({
        status: 'Success',
        message: 'Your account is deleted successfully',
        data: null
    });
});