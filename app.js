const express = require('express');

const errorHandler = require('./controller/errorController');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const creatorRouter = require('./routes/creatorRoutes');
const AppError = require('./utils/AppError');

const app = express();

// Middleware
app.use(express.json({ limit: '10kb'}));

// Routes
app.use('/api/v1/dishub/posts', postRouter);
app.use('/api/v1/dishub/comments', commentRouter);
app.use('/api/v1/dishub/creators', creatorRouter);

// Any other undefined routes
app.use('*', (req, res, next) => {
    return next(new AppError(`Cant find ${req.originalUrl}`, 404));
})

// Global Error Handler
app.use(errorHandler);

module.exports = app;