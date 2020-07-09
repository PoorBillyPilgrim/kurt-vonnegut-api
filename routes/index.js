const express = require('express');
const router = express.Router();

// Routes to index.ejs in /views
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;