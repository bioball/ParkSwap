var express            = require('express');
var passport           = require('passport');
var sessionsController = require('../controllers/sessionsController');
var path               = require('path');

module.exports = function(app){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboardcat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(sessionsController.checkStatus);
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
};