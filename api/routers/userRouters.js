const createError = require('http-errors')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const { User, Connection } = require('../model')

router
    .route('/')
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => (err))
    )
router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next())
        .catch(err => next(err))
    )
    .route('/me')
    /**
    * This function gets my User
    * @group User - api
    * @route GET /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
    .get((req, res, next) => Promise.resolve()
        .then(() => User.findById(req.user._id).populate({ path: 'profile' }))
        .then((data) => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err))
    )
    /**
    * This function updates my User
    * @group User - api
    * @route PUT /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
    .put((req, res, next) => Promise.resolve()
        .then(() => bcrypt.hash(req.body.password, 10))
        .then((passHashed) => {
            delete req.body.user
            req.body.password = passHashed
            req.body.updateAt = Date.now()
        })
        .then(() => User.findByIdAndUpdate(req.user.id, req.body, { runValidator: true }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    ) // Works fine but needs fields to commit changes
    /**
    * This function deletes my Users
    * @group User - api
    * @route DELETE /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
    .delete((req, res, next) => Promise.resolve()
        .then(() => User.deleteOne({ _id: req.user.id }))
        .then((data) => res.status(203).json(data))
        .catch(err => next(err))
    )

module.exports = router