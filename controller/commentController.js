const Comment = require('../model/commentModel');
const catchAsyncError = require('../utils/catchAsyncError');
const globalController = require('./globalController');

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