function fuck(req, res, next) {
    console.log(req.body);
    next()
}

module.exports = fuck