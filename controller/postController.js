const Post = require('../model/postModel');
const globalController = require('../controller/globalController');

// Get All Posts
exports.getAllPosts = globalController.getAll(Post);

// Create a new Post
exports.createPost = globalController.createOne(Post);

// Get a single post
exports.getPost = globalController.getOne(Post, { 
    path: 'comments', 
    select: 'comment -post -creator -_id' 
});

// Update the post
exports.updatePost = globalController.updateOne(Post);

// Delete a Post
exports.deletePost = globalController.deleteOne(Post);