const { notFound } = require('../util/helpers');

module.exports.handleDbQuery = (res, err, arr, urlQuery = "the query strings provided") => {
    if (err) {
        res.status(500).send(err);
    }
    console.log(`The array length is ${arr.length}`);
    if (arr.length === 0) {
        return notFound(res, urlQuery);
    } else {
        res.send(arr);
    }
}