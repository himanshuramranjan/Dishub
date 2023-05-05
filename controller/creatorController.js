const Creator = require('../model/creatorModel');
const globalController = require('./globalController');
const catchAsyncError = require('../utils/catchAsyncError');

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