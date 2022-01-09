const db = require("../db")

function set_csp(req, res, next) {

    next();
}

function loginRequired(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = {set_csp, loginRequired}