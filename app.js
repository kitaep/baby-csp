const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");
const passport = require("passport");
const logger = require("morgan");

app = express();
port = 3000;

require('./init/db')();
require('./init/auth')();

app.use(logger("dev"));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: false,
    express: app
});

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "fuck", resave: false, saveUninitialized: false }));
app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
    res.locals.messages = req.session.messages || [];
    req.session.messages = [];
    next();
})

const route = require('./routes/index');
app.use('/', route);

app.listen(port, () => {
    console.log("server listening on http://localhost:3000/")
})