var sessionsController = require('../controllers/sessionsController.js');
var parkerController   = require('../controllers/parkerController.js');
var riderController    = require('../controllers/riderController.js');

module.exports = function(app){
  app.get('/login',          sessionsController.login);
  app.get('/loginsuccess',   sessionsController.loginsuccess);
  app.get('/loginfailure',   sessionsController.loginfailure);
  app.get('/getphonenumber', sessionsController.getPhoneNumber);
  app.post('/signup',        sessionsController.signUp);
  app.get('/parker/find',    parkerController.findRiders);
  app.post('/rider/new',     riderController.new);
};