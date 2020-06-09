const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const books = require('./routes/api');

// Create express app
const app = express();

const port = process.env.PORT || 3000;

// For API security
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Passes the /books route to the app
app.use('/books', books);

app.listen(port, () => {
    console.log(`Listening on port ${port}. So it goes.`);
});