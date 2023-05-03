const mongoose = require('mongoose');

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
        required: [true, 'Content body is required for post']
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
        enum: {
            values: ['Tech', 'Sports', 'Art', 'Abstract'],
            message: 'Choose domain from Tech, Sports, Art and Abstract'
        }
    },
    creator: {
        // type: mongoose.Schema.ObjectId,
        // ref: 'Creator'
        type: String
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;