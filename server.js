const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


// const books = require('./routes/api');


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


/*
// Passes the /books route to the app
app.use('/books', books);
*/
var db;
app.get('/books', (req, res) => {
    db.collection('books').find({}).toArray((err, books) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(books);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}. So it goes.`);

    MongoClient.connect(url, function (err, client) {
        // In mongo v.3.0.0+, you use client.db('dbName') to connect to your database
        db = client.db('vonnegut');

    });

});