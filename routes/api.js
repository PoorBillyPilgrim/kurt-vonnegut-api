const express = require('express');
const router = express.Router();
const fs = require('fs');

/* reading from json file in project
let jsonData = {};
fs.readFile('bibliography.json', 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data);
});
*/

var db;

router.get('/', (req, res) => {
    db.collection('books').find({}).toArray((err, books) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(books);
    });
});

module.exports = router;