var sessionsController = require('../controllers/sessionsController.js');
var express = require('express');
var path = require('path');

module.exports = function(app){
  app.get('/login', sessionsController.login);
  app.get('/loginsuccess', sessionsController.loginsuccess);
  app.get('/loginfailure', sessionsController.loginfailure);
  app.get('/getphonenumber', sessionsController.getPhoneNumber);
  app.post('/signup', sessionsController.signUp)
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
}