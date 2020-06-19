const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const collection = req.app.locals.collection;

    await collection.find({}).toArray((err, bibliography) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(bibliography);
    });
});


router.get('/novels', async (req, res) => {
    // req.app holds a reference to an instance of the Express application that is using the middleware
    // So app.locals.collection can be accessed in api.js using req.
    //const query = new URLSearchParams(req.query);
    const collection = req.app.locals.collection;

    await collection.find({ form: "novel" }).toArray((err, novels) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(novels);
    });
    const { title, year } = req.query;
    console.log(title);
    console.log(parseInt(year));


});

// Returns document by title
router.get('/novels/:title', async (req, res) => {
    const collection = req.app.locals.collection;
    await collection.find({ "title": req.params.title }).toArray((err, novel) => {
        if (err) {
            res.status(500).send(err);
        }
        if (!novel.length) {
            res.status(404).json({ "error": "Sorry! Can't find that resource!" });
        } else {
            res.send(novel);
        }
    })
});

module.exports = router;