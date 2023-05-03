const Post = require('../model/postModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');


// Get All Posts
exports.getAllPosts = catchAsyncError(async (req, res, next) => {

    const posts = await Post.find();

    res.status(200).json({
        status: 'Success',
        result: posts.length,
        data: {
            posts
        }
    });
});

// Create a new Post
exports.createPost = catchAsyncError(async (req, res, next) => {

    const post = await Post.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: {
            post
        }
    });
});

// Get a single post
exports.getPost = catchAsyncError(async (req, res, next) => {
    
    const post = await Post.findById(req.params.id);

    if(!post) {
        return next(new AppError(`No Post w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            post
        }
    });
});

// Update the post
exports.updatePost = catchAsyncError(async (req, res, next) => {

    const post = Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!post) {
        return next(new AppError(`No Post w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            post
        }
    });
});

// Delete a Post
exports.deletePost = catchAsyncError(async (req, res, next) => {
    
    const post = await Post.findByIdAndDelete(req.params.id);

    if(!post) {
        return next(new AppError(`No Post w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(204).json({
        status: 'Success',
        message: 'Post Deleted Successfully'
    });
});