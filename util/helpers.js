module.exports.notFound = (res, val) => {
    res.status(404).json({
        message: `Sorry, couldn't find ${val} in the database.`
    });
}