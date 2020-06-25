const { handleQuery, handleMultiQuery } = require('./handleQueries');

const getAll = async (req, res) => {
    // req.app references an instance of the Express application that is using the middleware
    // So app.locals.collection can be accessed in api.js using req.
    const collection = await req.app.locals.collection;

    const { form, title, year } = req.query;

    if (Object.keys(req.query).length > 1) {
        return handleMultiQuery(req, res, req.query);
    }

    if (form) {
        return handleQuery(req, res, 'form', form);
    }
    if (title) {
        return handleQuery(req, res, 'title', title);
    }
    if (year) {
        return handleQuery(req, res, 'year', year);
    }

    await collection.find({}).toArray((err, bibliography) => {
        res.send(bibliography);
    });
}

const getForm = async (req, res, form) => {
    const { title, year, setting, firstName, lastName } = req.query;
    const collection = await req.app.locals.collection;

    if (title) {
        return handleQuery(req, res, 'title', title);
    }

    if (year) {
        return handleQuery(req, res, 'year', year);
    }

    /*
    if (setting) {
        return await collection.find({
            'setting.city': { $eq: setting }
        }).toArray((err, item) => {
            res.send(item);
        });
    }
    */

    await collection.find({ 'form': form }).toArray((err, bibliography) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(bibliography);
    });

}

const getNovels = (req, res) => getForm(req, res, "novel");
const getCollections = (req, res) => getForm(req, res, "collection");
const getPlays = (req, res) => getForm(req, res, "play");


module.exports = {
    getAll,
    getNovels,
    getCollections,
    getPlays
};