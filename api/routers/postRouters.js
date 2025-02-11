const createError = require('http-errors')
const express = require('express');
const router = express.Router();
const upload = require('../lib/upload')

const { Post, Connection } = require('../model')

router
    .route('/')
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => (err))
    )
    /** 
     * This function gets all Posts
     * @group Post - api
     * @route GET /posts
     * @returns {Array<Post>} 200 - An array of Posts
     * @returns {Error} default - Unexpected error
     * @security JWT
    */
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.find({ user: req.user.profile._id }).populate('comments').populate('profile'))
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )
    /**
     * This function posts a Post
     * @group Post - api
     * @route POST /posts
     * @param {Post.model} post.body.required - Post Model
     * @security JWT
     */
    .post(upload.concat([(req, res, next) => Promise.resolve()
        .then(() => new Post({ ...req.body, profile: req.user.profile._id }).save())
        .then(args => req.publish('post', req.user.profile.followers, args))
        .then((data) => res.status(201).json(data))
        .catch(err => next(err))])
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:id')
    /** 
     * This function gets a Post by ID
     * @group Post - api
     * @route GET /posts/{id}
     * @param {string} id.path.required - Post ID
     * @returns {<Post>} 200 - post
     * @security JWT
     */
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.findById(req.params.id).populate('profile').populate({ path: 'comments', populate:{path: 'profile'}}))
        .then((data) => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )
    /** 
     * This function updates a Post by Id
     * @group Post - api
     * @route PUT /posts/{id}
     * @param {Post.model} post.body.required - Post Model
     * @param {string} id.path.required - Post ID
     * @security JWT
     */
    .put((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndUpdate(req.params.id, { ...req.body, updateAt: Date.now() }, { runValidators: true }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
    /** 
     * This function deletes a post by id
     * @group Post - api
     * @route DELETE /posts/{id}
     * @param {string} id.path.required - Post ID
     * @security JWT
     */
    .delete((req, res, next) => Promise.resolve()
        .then(() => Post.deleteOne({ _id: req.params.id }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:id/like')
    /** 
    * This function likes a POST by ID
    * @group Post - api
    * @route POST /posts/{id}/like
    * @param {string} id.path.required - Post ID
    * @security JWT
    */
    .post((req, res, next) => Promise.resolve()
        .then(() => Post.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { likes: req.user.profile._id } }))
        .then(args => req.publish('post-like', [args.profile], args))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )

router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:id/unlike')
    /** 
    * This function likes a POST by ID
    * @group Post - api
    * @route POST /posts/{id}/unlike
    * @param {string} id.path.required - Post ID
    * @security JWT
    */
    .post((req, res, next) => Promise.resolve() 
    .then(() => Post.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user.profile._id } }))
    .then(args => req.publish('post-unlike', [args.profile], args))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err))
    )
module.exports = router;