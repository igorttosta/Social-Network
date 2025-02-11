const { Schema, model } = require('mongoose')
/**
 * @typedef Post
 * @property {string} _id
 * @property {string} title.required - Title
 * @property {string} description.required - Description
 * @property {Profile} profile.required - Profile
 * @property {Array.<Comment>} comments - Comments
 */

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Input title is required'],
        minLength: 2
    },
    description: {
        type: String,
        required: [true, 'Input description is required'],
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    image: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Post', postSchema)