const Comment = require('../model/commentModel');
const catchAsyncError = require('../utils/catchAsyncError');
const globalController = require('./globalController');

// Add Creator ID to the params
exports.addParam = catchAsyncError(async (req, res, next) => {

    req.body.creator = req.creator.id;
    next();
})

// Get All Comments
exports.getAllComments = globalController.getAll(Comment);

// Get a Comment
exports.getComment = globalController.getOne(Comment);

// Create a Comment
exports.createComment = globalController.createOne(Comment);

// Update the Comment
exports.updateComment = globalController.updateOne(Comment);

// Delete the Comment
exports.deleteComment = globalController.deleteOne(Comment);