const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        minLength: [1, 'comment should be atleast 1 char long'],
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;