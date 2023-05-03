const Post = require('../model/postModel');
const catchAsyncError = require('../utils/catchAsyncError');

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