var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

app.use(cors({origin: process.env.CORS_ORIGIN || 'http://localhost'}));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({'error':'Something broke'});
  });

module.exports = app;
