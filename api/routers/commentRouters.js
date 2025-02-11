const createError = require('http-errors')
const express = require('express')
const router = express.Router()

const { Comment, Connection, Post } = require('../model')

router
    .param('postId', (req, res, next, id) => Promise.resolve()
        .then(() => {
            res.locals.post = { id };
            // console.log(`Request post id: ${id}`)
            next();
        })
        .catch(err => next(err))
    )
    .route('/:postId/comments')
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => (err))
    )
    /** 
     * This function get Comments of a Post
    * @group Comment - api
    * @route GET /posts/{postId}/comments
    * @param {string} postId.path.required - Post ID
    * @returns {Array<Comment>} 200 - An array of comments
    * @returns {Error} default - Unexpected error
    * @security JWT
    */
    .get((req, res, next) => Promise.resolve()
        .then(() => Comment.find({ post: res.locals.post.id }).populate('post'))
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )
    /** 
     * This function post a Comment into a Post
    * @group Comment - api
    * @route POST /posts/{postId}/comments
    * @param {string} postId.path.required - Post ID
    * @param {Comment.model} comment.body.required - Comment Model
    * @security JWT
    */
    .post((req, res, next) => Promise.resolve()
        .then(() => new Comment(Object.assign(req.body, { post: res.locals.post.id, profile: req.user.profile })).save())
        .then((comment) => Post.findById(comment.post)
            .then(post => Object.assign(post, { comments: [...post.comments, comment._id] }))
            .then(post => Post.findByIdAndUpdate(comment.post, post))
            .then(args => req.publish('comment', [args.profile], args))
            .then(() => comment)
        )
        .then((data) => res.status(201).json(data))
        .catch(err => next(err)))
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:postId/comments/:id')
    /** 
    * This function gets a Comment by id
    * @group Comment - api
    * @route GET /posts/{postId}/comments/{id}
    * @param {string} postId.path.required - Post ID
    * @param {string} id.path.required - Comment ID
    * @returns {<Comment>} 200 - post
    * @security JWT
    */
    .get((req, res, next) => Promise.resolve()
        .then(() => Comment.findById(req.params.id).populate('post'))
        .then((data) => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )
    /** 
     * This function updates a Comment by ID
     * @group Comment - api
     * @route PUT /posts/{postId}/comments/{id}
     * @param {Comment.model} comment.body.required - Comment Model
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
    .put((req, res, next) => Promise.resolve()
        .then(() => Comment.findByIdAndUpdate(req.params.id, {...req.body, updateAt: Date.now() }, { runValidator: true }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
    /** 
     * This function deletes a Comment by id
     * @group Comment - api
     * @route DELETE /posts/{postId}/comments/{id}
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
    .delete((req, res, next) => Promise.resolve()
        .then(() => Comment.deleteOne({ _id: req.params.id }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:postId/comments/:id/like')
    /** 
     * This function likes a comment by ID
     * @group Comment - api
     * @route POST /posts/{postId}/comments/{id}/like
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
    .post((req, res, next) => Promise.resolve()
        .then(() => Comment.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { likes: req.user.profile._id } }))
        .then(args => req.publish('comment-like', [args.profile], args))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/:postId/comments/:id/unlike')
    /** 
   * This function unlikes a comment by ID
   * @group Comment - api
   * @route POST /posts/{postId}/comments/{id}/unlike
   * @param {string} postId.path.required - Post ID
   * @param {string} id.path.required - Comment ID
   * @security JWT
   */
    .post((req, res, next) => Promise.resolve()
        .then(() => Comment.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user.profile._id } }))
        .then(args => req.publish('comment-unlike', [args.profile], args))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )

module.exports = router;