var passport = require('passport');
var User     = require('../models/user');

// set up session serialization, deserialization, and facebook oauth
require('../config/sessions.js')(passport);

exports.checkAuth = function(req, res, next){
  if(!req.user){
    res.cookie('status', 401);
  } else if (!req.user.attributes.phone){
    res.cookie('status', 412);
  }
  next();
};

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = passport.authenticate('facebook', {
  successRedirect: global.host + 'getphonenumber',
  failureRedirect: global.host + 'login'
});

exports.getPhoneNumber = function(req, res){
  if(!req.user.attributes.phone){
    res.cookie('uid', req.user.attributes.uid);
    res.cookie('status', 412);
  } else {
    res.cookie('status', 'OK');
  }
  res.writeHead(302, {location: '/'});
  res.end();
};

exports.loginfailure = function(req, res) {
  res.send("Login Failure");
};

exports.signUp = function(req, res){
  User.add(req.body.uid, req.body.phone);
  res.cookie('status', 'OK');
  res.send(201);
};