const { handleQuery, handleMultiQuery } = require('./handleQueries');
const { handleDbQuery } = require('./handleDbQueries');

const getAll = async (req, res) => {
    // req.app references an instance of the Express application that is using the middleware
    // So app.locals.collection can be accessed in api.js using req.
    const collection = await req.app.locals.collection;

    const { form, title, year } = req.query;

    // Multiple URL queries
    if (Object.keys(req.query).length > 1) {
        return handleMultiQuery(req, res, req.query);
    }

    // Single URL queries
    if (form) {
        return handleQuery(req, res, 'form', form);
    }
    if (title) {
        return handleQuery(req, res, 'title', title);
    }
    if (year) {
        return handleQuery(req, res, 'year', year);
    }

    // Get entire bibliography
    await collection.find({}).toArray((err, bibliography) => {
        return handleDbQuery(res, err, bibliography);
    });
}

const getForm = async (req, res, form) => {
    const { title, setting, firstName, lastName } = req.query;
    const year = parseInt(req.query.year);
    const collection = await req.app.locals.collection;

    // NOTE: both single and multi queries on form search ENTIRE db
    // I need them to search only {'form':form}
    // Multiple URL queries
    if (Object.keys(req.query).length > 1) {
        return handleMultiQuery(req, res, req.query);
    }

    // Single URL queries
    if (title) {
        // return handleQuery(req, res, 'title', title);
        return await collection.find({
            'form': form,
            'title': title
        }).toArray((err, items) => {
            return handleDbQuery(res, err, items, title);
        });
    }
    if (year) {
        // return handleQuery(req, res, 'year', year);
        return await collection.find({
            'form': form,
            'year': year
        }).toArray((err, items) => {
            return handleDbQuery(res, err, items, year);
        });
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
    // Get all of one specific form
    await collection.find({ 'form': form }).toArray((err, bibliography) => {
        return handleDbQuery(res, err, bibliography);
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