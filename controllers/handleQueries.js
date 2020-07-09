const { handleDbQuery } = require('./handleDbQueries');

const handleQuery = async (req, res, field, query) => {
    const collection = await req.app.locals.collection;
    var arr = query.split(',').map(x => x.trim());

    // Change year into integer
    if (field == 'year') {
        arr = arr.map(x => parseInt(x));
    }

    // Only one fieldname, eg. title or year, not both
    if (arr.length > 1) {
        // $in matches multiple values in an array
        return await collection.find({ [field]: { $in: arr } }).toArray((err, items) => {
            return handleDbQuery(res, err, items, arr);
        })
    } else {
        // Single value
        let val = query;
        if (!isNaN(val)) {
            val = parseInt(val);
        }
        return await collection.find({ [field]: val }).toArray((err, items) => {
            return handleDbQuery(res, err, items, val);
        })
    }
}

// For multiple field queries
const handleMultiQuery = async (req, res, query) => {
    const collection = await req.app.locals.collection;
    const { title, form, genre } = query;
    const year = parseInt(query.year);

    await collection.find({
        $or: [
            { 'title': title },
            { 'form': form },
            { 'genre': genre },
            { 'year': year }
        ]
    }).toArray((err, items) => {
        return handleDbQuery(res, err, items);
    })
}

module.exports = {
    handleQuery,
    handleMultiQuery
}