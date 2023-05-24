const Post = require('../model/postModel');
const globalController = require('../controller/globalController');
const catchAsyncError = require('../utils/catchAsyncError');

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

// Top 3 trending post from each domain
exports.getTrendingPosts = catchAsyncError(async (req, res, next) => {

    const posts = await Post.aggregate([
        {
            $unwind: "$domain"
        },
        {
            $sort: { upvotes: -1}
        },
        {
            $match: { private: { $ne: true} }
        },
        {
            $group: {
                _id: '$domain',
                totalposts: { $sum: 1},
                title: { $push: '$title'},
            },
            
        },
        {
            $project: {
                topTrending: { 
                    $slice: ['$title', 3]
                }
            }
        }
    ]);

    res.status(200).json({
        stauts: 'Success',
        data: {
            posts
        }
    });

});