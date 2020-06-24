const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { AppError, handleErrors } = require('./handlers/errors');
const api = require('./routes/api');
const app = express();

const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017';

// API security
app.use(helmet());
app.use(cors());

// DO I NEED THIS???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes api through /api param
app.use('/api', api);

// Error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Hmm, can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    handleErrors(err, res);
});


// Database connection
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    // In mongo v.3.0.0+, you use client.db('dbName') to connect to your database
    const db = client.db('vonnegut');
    const collection = db.collection('bibliography');
    // app.locals.collection allows collection to persist throughout entire app
    app.locals.collection = collection;
    app.listen(port, () => console.info(`Listening on port ${port}. So it goes.`));
}).catch(err => console.error(err));

