const express = require('express');
const router = express.Router();
const { getAll, getNovels, getCollections, getPlays, getQuotes } = require('../controllers/handleRoutes');
const { catchAsyncErrors } = require('../handlers/errors');

router.get('/', catchAsyncErrors(getAll));

router.get('/novels', catchAsyncErrors(getNovels));
router.get('/collections', catchAsyncErrors(getCollections));
router.get('/plays', catchAsyncErrors(getPlays));

router.get('/quotes', catchAsyncErrors(getQuotes));

/** 
    const { title, setting, year } = req.query;
    /* For finding a specific city in the setting array
    await collection.find({
        'setting.city': { $eq: 'Midland City }
    }).toArray((err, novels) => {
        res.send(novels)
    });
    
    */


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
    console.log(req.query.setting)
});

module.exports = router;