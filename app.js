const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const errorHandler = require('errorhandler');
const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler());


app.use('/api/v1', indexRouter);

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', (error));
});

module.exports = app;

