// req.app references an instance of the Express application that is using the middleware
// So app.locals.collection can be accessed in api.js using req.

const getAll = async (req, res) => {

    try {
        const collection = await req.app.locals.collection;
        await collection.find({}).toArray((err, bibliography) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(bibliography);
        });
    } catch (err) {
        console.error(err);
    }
}

const getForm = async (req, res, form) => {
    try {
        const collection = await req.app.locals.collection;
        await collection.find({ 'form': form }).toArray((err, bibliography) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(bibliography);
        });
    } catch (err) {
        console.error(err);
    }
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