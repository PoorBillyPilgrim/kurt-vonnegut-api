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

    * This is for splitting a multi-field query into an array (and trimming any possible whitespace)
    * eg.) ?title=Timequake,The Sirens of Titan ==> ['Timequake','The Sirens of Titan']
    const title = req.query.title;
    const arr = title.split(',');
    const newArr = arr.map(x => x.trim());
    console.log(newArr);
 */


module.exports.getQuery = async (req, res, field, query) => {
    const collection = await req.app.locals.collection;
    const arr = query.split(',').map(x => x.trim());

    if (field == 'year') {
        // Change year into integer
        let yearArr = [];
        arr.forEach(x => {
            yearArr.push(parseInt(x));
        })
        if (yearArr.length > 1) {
            return await collection.find({ [field]: { $in: yearArr } }).toArray((err, items) => {
                res.send(items);
            })
        } else {
            const year = yearArr[0];
            return await collection.find({ [field]: { $eq: year } }).toArray((err, items) => {
                res.send(items);
            })
        }
    } else if (field == 'title') {
        // Multiple titles
        if (arr.length > 1) {
            return await collection.find({ [field]: { $in: arr } }).toArray((err, items) => {
                res.send(items);
            })
        } else {
            // Single title
            return await collection.find({ [field]: { $eq: query } }).toArray((err, items) => {
                res.send(items);
            })
        }
    }
}


module.exports.getTitle = async (req, res, title) => {
    const collection = await req.app.locals.collection;
    if (Array.isArray(title)) {
        // Multiple title
        return await collection.find({ 'title': { $in: title } }).toArray((err, items) => {
            res.send(items);
        })
    } else {
        // Single title
        return await collection.find({ 'title': { $eq: title } }).toArray((err, items) => {
            res.send(items);
        })
    }
}