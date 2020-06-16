const express = require('express');
const router = express.Router();
// const fs = require('fs');
const { catchErrors } = require('../handlers/errors.js');

/* reading from json file in project
let jsonData = {};
fs.readFile('bibliography.json', 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data);
});
*/

// Passes the /books route to the app
router.get('/books', (req, res) => {
    // req.app holds a reference to an instance of the Express application that is using the middleware
    // So app.locals.collection can be accessed in api.js using req.
    const collection = req.app.locals.collection;
    /**
     * I get an error when I have both res.send() for title and for all.
     *     if (req.query.title) {
        collection.find({ "title": req.query.title }).toArray((err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(book);
        });
    }
     * 
     */

    collection.find({}).toArray((err, books) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(books);

    });
});

// Returns document by title
router.get('/books/:title', catchErrors(async (req, res, next) => {
    const collection = req.app.locals.collection;
    collection.find({ "title": req.params.title }).toArray((book) => {
        res.send(book);
    })
}));

module.exports = router;