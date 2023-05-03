const Post = require('../model/postModel');
const catchAsyncError = require('../utils/catchAsyncError');
const globalController = require('../controller/globalController');

const AppError = require('../utils/appError');


// Get All Posts
exports.getAllPosts = globalController.getAll(Post);

// Create a new Post
exports.createPost = globalController.createOne(Post);

// Get a single post
exports.getPost = globalController.getOne(Post);

// Update the post
exports.updatePost = globalController.updateOne(Post);

// Delete a Post
exports.deletePost = globalController.deleteOne(Post);