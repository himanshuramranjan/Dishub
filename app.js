const express = require('express');
const errorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();

// Middleware
app.use(express.json({ limit: '10kb'}));

// Routes
// app.use('/api/v1/dishub');

// Any other undefined routes
app.use('*', (req, res, next) => {
    return next(new AppError(`Cant find ${req.originalUrl}`, 404));
})

// Global Error Handler
app.use(errorHandler);

module.exports = app;