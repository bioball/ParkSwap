var sessionsController = require('../controllers/sessionsController.js');
// var usersController = require('../controllers/usersController.js');

module.exports = function(app){
  app.get('/login', sessionsController.login);
  app.get('/loginsuccess', sessionsController.loginsuccess);
  app.get('/loginfailure', sessionsController.loginfailure);
  // app.get('/users', usersController.list);
}