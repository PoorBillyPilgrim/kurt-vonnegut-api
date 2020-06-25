module.exports.notFound = (res, val) => {
    res.status(404).json({
        message: `Sorry, could not find ${val}.`
    });
}