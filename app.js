require('dotenv').config();
require('./config/mongoose');

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const RateLimit = require('express-rate-limit');

app.enable('trust proxy');

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const meetingRouter = require('./routes/meetings');
const ibmRouter = require('./routes/speech-to-text');

app.use('/', indexRouter);
app.use('/api/', limiter);
app.use('/api/auth', authRouter);
app.use('/api/meetings', meetingRouter);
app.use('/api/speech-to-text', ibmRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
