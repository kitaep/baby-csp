const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");

app = express();
port = 3000;

nunjucks.configure('views', {
    autoescape: false,
    express: app
});

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const route = require('./routes/index');
app.use('/', route);

app.listen(port, () => {
    console.log("server listening on http://localhost:3000/")
})