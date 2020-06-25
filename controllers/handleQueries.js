/** Notes for later
 * You can us $or for multiple field queries to mongo
 * eg) await collection.find({
        $or: [
            { 'title': 'The Sirens of Titan' },
            { 'year': 1952 }
        ]
    }).toArray((err, bibliography) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(bibliography);
    });

 */


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
            res.send(items);
        })
    } else {
        // Single value
        let val = query;
        if (!isNaN(val)) {
            val = parseInt(val);
        }
        return await collection.find({ [field]: val }).toArray((err, items) => {
            res.send(items);
        })
    }
}




// This is for multiple field queries

const handleMultiQuery = async (req, res, query) => {
    const collection = await req.app.locals.collection;
    const { title, form } = query;
    const year = parseInt(query.year);
    await collection.find({
        $or: [
            { 'title': title },
            { 'form': form },
            { 'year': year }
        ]
    }).toArray((err, bibliography) => {
        res.send(bibliography);
    })
}

module.exports = {
    handleQuery,
    handleMultiQuery
}