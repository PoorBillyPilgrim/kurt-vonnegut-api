// Create custom errors
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const handleErrors = (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

// Catch errors from async functions and pass them along to handleErrors middleware
const catchAsyncErrors = fn => (req, res, next) => fn(req, res, next).catch(next);


module.exports = {
    AppError,
    handleErrors,
    catchAsyncErrors
};