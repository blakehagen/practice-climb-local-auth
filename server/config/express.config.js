'use strict';

// MODULES //
const express    = require('express');
const session    = require('express-session');
const bodyParser = require('body-parser');
const cors       = require('cors');
const logger     = require('morgan');

module.exports = function () {

  var app = express();

  app.use(logger('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: 'aksldjfaksjfklas242342dfklajsdklfjaf',
    saveUninitialized: false,
    resave: false
  }));

  app.use(express.static('public'));

  return app;

};