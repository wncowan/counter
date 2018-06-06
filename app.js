
var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(session({secret: '...'}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (!req.session.visits) {
        req.session.visits = 1
    } else {
        req.session.visits++;
    }
    console.log(req.session.visits);
    context = { visits: req.session.visits }
    res.render("index", context);
});

app.get('/two', function(req, res) {
    req.session.visits++;
    res.redirect('/');
});

app.get('/reset', function(req, res) {
    req.session.visits = 0;
    res.redirect('/');
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});