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
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'Creator',
        required: true
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
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

// populate the creator 
commentSchema.pre(/^find/, function(next) {

    this.populate({
        path: 'creator',
        select: 'name'
    });

    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;