const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const createError = require('http-errors')
const helmet = require('helmet')
const cors = require('cors')
const esg = require('express-swagger-generator')
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'accesstoken'

const defaultOptions = require('./swagger.json')
const { Post, Comment, User, Security, Profile, Feed } = require('./routers')
const { User: UserModel } = require('./model')
const pubsub = require('./lib/pubsub')
const options = Object.assign(defaultOptions, { basedir: __dirname })

const app = express();

const expressSwagger = esg(app);
expressSwagger(options);

app.use(cors());
// app.use(helmet()); // comment for html simple test

const urlencodedMiddleware = bodyParser.urlencoded({
    extended: true
})

app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req, res, next))
app.use(bodyParser.json({
    defer: true
}))
app.use(logger('tiny'))

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(createError(401))
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(createError(403))
        UserModel.findOne(user).populate('profile')
            .then(u => {
                req.user = u
                next()
            })
    })
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(pubsub.pub)

Post.use('/', authenticateToken, Comment)
app.use('/v1/posts', authenticateToken, Post)
app.use('/v1/users', authenticateToken, User)
app.use('/v1/profiles', authenticateToken, Profile)
app.use('/v1/feed', authenticateToken, Feed)
app.use('/v1/security', Security)

app.get('/v1/seed', (req, res, next) => {
    try {
        require('./seed')
        res.status(200).end()
    } catch (error) {
        console.error('entrei no erro')
        next(error)
    }
})

app.use('/favicon.ico', (req, res) => {
    res.end()
})

app.use(function (req, res, next) {
    next(createError(404))
})

app.use(function (error, req, res, next) {
    console.log(error);
    if (error.name && error.name === 'ValidationError') {
        res.status(406).json(error);
    } else if ((error.status && error.status === 404) || (error.name && error.name === 'CastError')) {
        res.status(404).json({
            url: req.originalUrl,
            error: {
                message: 'Not Found!'
            }
        })
    } else if (error.code === 11000) {
        res.status(500).json({
            url: req.originalUrl,
            error: {
                message: 'Duplicated key not Allowed!'
            }
        })
    } else {
        // error page
        res.status(error.status || 500).json({
            url: req.originalUrl,
            error
        })
    }
})
module.exports = app