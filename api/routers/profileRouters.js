const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const { Profile, Connection } = require('../model')

router
    .route('/')
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => (err))
    )
    /**
     * This function list all the Profiles
     * @group Profile - api
     * @route GET /profiles
     * @returns {Profile} 200 - Array of Profile's info
     * @returns {Error} Default - Unexpected error
     * @security JWT
     */
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find({}))
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/search')
    /**
     * This function search a profile by ID
     * @group Profile - api
     * @route GET /profiles/search?q={q}
     * @param {string} q.query.required - Search Profile Name
     * @returns {<Profile>} 200 - Array of Profiles
     * @security JWT
     */
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find({ $text: { $search: `${req.query.q}` } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }))
        .then((data) => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err)))
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:id')
    /**
     * This function gets the profile by ID
     * @group Profile - api
     * @route GET /profiles/{id}
     * @param {string} id.path.required - Profile ID
     * @returns {<Profile>} 200 - Array of Profile's info
     * @security JWT
     */
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.params.id).populate(['following', 'followers']))
        .then((data) => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:id/follow')
    /**
     * This function follows profiles by ID
     * @group Profile - api
     * @route POST /profiles/{id}/follow
     * @param {string} id.path.required - Profile's ID
     * @security JWT
     */
    .post((req, res, next) => Promise.resolve()
        .then(() => Profile.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.user.profile._id } }))
        .then(() => Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { following: req.params.id } }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
    /**
     * This function unfollows profiles by ID
     * @group Profile - api
     * @route POST /profiles/{id}/unfollow
     * @param {string} id.path.required - Profile's ID
     * @security JWT
     */
    .post((req, res, next) => Promise.resolve()
        .then(() => Profile.findOneAndUpdate({ _id: req.params.id }, { $pop: { followers: req.user.profile._id } }))
        .then(() => Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $pop: { following: req.params.id } }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )

module.exports = router