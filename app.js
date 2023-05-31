const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const creatorRouter = require('./routes/creatorRoutes');

const errorHandler = require('./controller/errorController');
const AppError = require('./utils/AppError');
const { mongo } = require('mongoose');

const app = express();

// define max api req (to max 100 req / hour from a given IP)
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in 1 hour' 
});

// Middleware

// set security http headers
app.use(helmet());

// limits the api request
app.use('/api', limiter);

// parse the data from body into req.body (with 10kb data limit)
app.use(express.json({ limit: '10kb'}));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against xss
app.use(xssClean());

// prevent http parameter pollution
app.use(hpp({
    whitelist: [
        'domain',
        'creator'
    ]
}));

// Routes
app.use('/api/v1/dishub/posts', postRouter);
app.use('/api/v1/dishub/comments', commentRouter);
app.use('/api/v1/dishub/creators', creatorRouter);

// Any other undefined routes
app.all('*', (req, res, next) => {
    return next(new AppError(`Cant find ${req.originalUrl}`, 404));
})

// Global Error Handler
app.use(errorHandler);

module.exports = app;