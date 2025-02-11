const { Schema, model } = require('mongoose')
/**
 * @typedef Profile
 * @property {string} _id
 * @property {string} name.required
 * @property {User} user.required - User
 * @property {Array.<Profile>} - Following profiles
 */
const profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please, insert at least 2 characters!'],
        minLength: 2
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'You are not logged in'],
        ref: 'User'
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

profileSchema.index({ name: 'text' });
module.exports = model('Profile', profileSchema)