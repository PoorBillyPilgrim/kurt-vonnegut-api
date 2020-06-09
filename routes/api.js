const express = require('express');
const router = express.Router();
const fs = require('fs');

let jsonData = {};
fs.readFile('bibliography.json', 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data);
});


router.get('/', (req, res) => {
    return res.send(jsonData);
});

module.exports = router;