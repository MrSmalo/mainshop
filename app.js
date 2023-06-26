var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const navbar = require('./routes/navBar');

const { adminProtect } = require('./middleware/adminMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminPages = require('./routes/admin_pages');


const mongoose = require("mongoose");



var app = express();




mongoose.connect('mongodb+srv://group:mainProject@cluster0.lpzfup3.mongodb.net/data',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to mongodb");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//var pages = require('./routes/pages.js');








app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminProtect, adminPages)
//app.use('/admin', adminPages);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { navbar });
});


module.exports = app;
