const { Schema, model } = require('mongoose')
/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} description.required - Comment description
 * @property {Profile} profile.required - Profile
 * @property {Post} post.required - Post
 */

const commentSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Input description is required'],
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    post: {
        type: Schema.Types.ObjectId,
        required: [true, 'A post is required'],
        ref: 'Post'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Comment', commentSchema);