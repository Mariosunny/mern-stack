var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');

var indexRouter = require('./routes/index');

var app = express();
var MongoClient = mongo.MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

MongoClient.connect("mongodb://localhost:27017", function(error, client) {

  if(!error) {

    console.log("Database connected successfully.");
  }

  app.locals.db = client.db('students');
});

module.exports = app;
