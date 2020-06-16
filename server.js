const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const api = require('./routes/api');


// Create express app
const app = express();

const port = process.env.PORT || 3000;

// For API security
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Database connection
const url = 'mongodb://localhost:27017';


// Routes api through /api param
app.use('/api', api);

// Error handling
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Database connection
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    // In mongo v.3.0.0+, you use client.db('dbName') to connect to your database
    const db = client.db('vonnegut');
    const collection = db.collection('bibliography');
    // app.locals.collection allows collection to persist throughout the entire app
    app.locals.collection = collection;
    app.listen(port, () => console.info(`Listening on port ${port}. So it goes.`));
}).catch(err => console.error(err));

