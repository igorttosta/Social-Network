const express = require('express');
const router = express.Router();
const { Post, Profile, Connection } = require('../model')

router
    .route('/')
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => (err))
    )
    /**
     * This function get Posts for feed
     * @group Feed- api
     * @route GET /feed
     * @returns {Array.<Post>} 200 - An array of Posts
     * @returns {Error} Default - Unexpected error
     * @security JWT
     */
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.user.profile.id))
        .then((profile) => Post
            .find({ profile: { $in: [...profile.following, req.user.profile.id] } })
            .populate('profile')
            .limit(10)
            .skip((req.query.page || 0) * 10)
            .sort({ createdAt: 'desc' })
        )
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )

module.exports = router