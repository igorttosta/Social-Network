const { Schema, model } = require('mongoose');
/**
 * @typedef User
 * @property {string} _id
 * @property {string} user.required
 * @property {string} password.required
 * @property {Profile} profile - User's Profile
 */

const userSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: [true, 'Please, insert at least 2 characters!'],
        minLength: 2
    },
    password: {
        type: String,
        required: [true, 'Please, insert at least 4 characters!'],
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
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

module.exports = model('User', userSchema)