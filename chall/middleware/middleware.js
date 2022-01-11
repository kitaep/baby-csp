const db = require("../db");
const uuid = require("uuid");

function set_csp(req, res, next) {
    let nonce = "";
    if(req.isAuthenticated()) {
        if (req.user.username == "admin") {
            
        } else {
            nonce = uuid.v4();
        }
        res.set('Hello', 'World!');
        res.locals.nonce = nonce;
        next();
    } else {
        next();
    }
}

function loginRequired(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = {set_csp, loginRequired}