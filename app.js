var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var profileRouter = require('./routes/profileImage');
var physicalRouter = require('./routes/physicalExam');
var additionalRouter = require('./routes/additionalDoc')
var restoreRouter = require('./routes/restore')

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + 'public'));


app.use('/', profileRouter);
app.use('/physicalExam', physicalRouter);
app.use('/additionalDoc', additionalRouter);
app.use('/restore', restoreRouter);

module.exports = app;
