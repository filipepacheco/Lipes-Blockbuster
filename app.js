var express = require('express');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

let indexRouter = require('./routes/index');
let app = express();


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRouter);

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

module.exports = app;

