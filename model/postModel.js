const mongoose = require('mongoose');
const Creator = require('../model/creatorModel');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post must have a title'],
        minLength: [5, 'Min 5 chars are reuired for title'],
        maxLength: [40, 'Max 40 chars is allowed for title'],
        uppercase: true,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content body is required for post'],
        minLength: [10, 'Content should be atleast 10 chars long']
    },
    upvotes: {
        type: Number,
        default: 0
    },
    private: {
        type: Boolean,
        default: false
    },
    domain: {
        type: [String],
        required: [true, 'A post must have a domain'],
        validate: {
            validator: function(val) {
                return val.length > 0;
            },
            message: 'Post should contain alteast 1 domain'
        },
        enum: {
            values: ['Tech', 'Sports', 'Art', 'Abstract'],
            message: 'Choose domain from Tech, Sports, Art and Abstract'
        }
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'Creator',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, 
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

// Populate creator of the Post
postSchema.pre(/^find/, function(next) {

    this.populate({
        path: 'creator',
        select: 'name _id'
    });

    next();
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;