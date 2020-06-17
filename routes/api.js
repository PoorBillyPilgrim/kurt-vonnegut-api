const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errors.js');

// Passes the /books route to the app
router.get('/novels', async (req, res) => {
    // req.app holds a reference to an instance of the Express application that is using the middleware
    // So app.locals.collection can be accessed in api.js using req.
    const collection = req.app.locals.collection;

    if (req.query.title) {
        /*await collection.find({ "title": req.query.title }).toArray((err, novel) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(novel);
        });*/
        console.log(req.query.titlec)
    } else {
        await collection.find({}).toArray((err, novels) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(novels);
        });
    }
});

// Returns document by title
router.get('/novels/:title', catchErrors(async (req, res, next) => {
    const collection = req.app.locals.collection;
    collection.find({ "title": req.params.title }).toArray((err, novel) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(novel);
    })
}));

module.exports = router;