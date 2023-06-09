// send the error details to dev env
const sendErrorDev = (err, res) => {

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message
    })
}

// handles the async errors
module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // If JWT token expires
    if(err.name === "TokenExpiredError") {
        err.message = "You have been logged out ! Plz Login Again";
    }
    sendErrorDev(err, res);
}