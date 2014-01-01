var sessionsController = require('../controllers/sessionsController.js');
var parkerController   = require('../controllers/parkerController.js');
var riderController    = require('../controllers/riderController.js');
var userController     = require('../controllers/userController.js');

module.exports = function(app){
  app.get('/login',               sessionsController.login);
  app.get('/loginsuccess',        sessionsController.loginsuccess);
  app.get('/loginfailure',        sessionsController.loginfailure);
  app.get('/getphonenumber',      sessionsController.getPhoneNumber);
  app.post('/signup',             sessionsController.signUp);

  app.get('/parker/find',         parkerController.findRiders);
  app.post('/parker/pickuprider', parkerController.pickUpRider);

  app.post('/rider/new',          riderController.new);
  app.post('/rider/cancel',       riderController.cancel);

  app.get('/users/:uid',          userController.get);
};