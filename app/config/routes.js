var sessionsController = require('../controllers/sessionsController.js');
var parkerController   = require('../controllers/parkerController.js');
var riderController    = require('../controllers/riderController.js');
var userController     = require('../controllers/userController.js');

module.exports = function(app){
  app.get('/login',               sessionsController.login);
  app.get('/loginsuccess',        sessionsController.loginSuccess);
  app.get('/loginfailure',        sessionsController.loginFailure);
  app.post('/updatephone',        sessionsController.updatePhone);

  app.get('/parker/find',         parkerController.findRiders);
  app.post('/parker/pickuprider', parkerController.pickUpRider);

  app.post('/rider/new',          riderController.new);
  app.post('/rider/cancel',       riderController.cancel);

  app.get('/users/:uid',          userController.get);
};