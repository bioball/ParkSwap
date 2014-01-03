var passport = require('passport');
var User     = require('../models/user');
var Rider    = require('../models/rider');

// set up session serialization, deserialization, and facebook oauth
require('../config/sessions.js')(passport);

module.exports.checkStatus = function(req, res, next){
  var user = req.user;
  if(!user){
    res.cookie('status', 401);
  } else if (!user.get('phone')){
    res.cookie('status', 412);
  } else if (Rider.exists(user.get('uid'))){
    res.cookie('status', 409);
  } else {
    res.cookie('status', 'OK');
  }
  next();
};

module.exports.login = passport.authenticate('facebook'); 

module.exports.loginSuccess = passport.authenticate('facebook', {
  successRedirect: global.host,
  failureRedirect: global.host + 'login'
});

module.exports.loginFailure = function(req, res) {
  res.send(401, "Login Failure");
};

module.exports.updatePhone = function(req, res){
  User.update(req.user.get('uid'), {
    phone: req.body.phone
  }).then(function(){
    res.cookie('status', 'OK');
    res.send(201);
  });
};