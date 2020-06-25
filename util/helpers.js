module.exports.notFound = (res, val) => {
    res.status(404).json({
        message: `Sorry, couldn't find anything using ${val} to query the database.`
    });
}