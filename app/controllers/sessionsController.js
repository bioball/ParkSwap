var passport = require('passport');
var User     = require('../models/user');

// set up session serialization, deserialization, and facebook oauth
require('../config/sessions.js')(passport);

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = passport.authenticate('facebook', {
  successRedirect: '/getphonenumber',
  failureRedirect: '/login'
});

exports.getPhoneNumber = function(req, res){
  if(!req.user.attributes.phone){
    res.cookie('uid', req.user.attributes.uid)
    res.writeHead(302, {location: 'http://localhost:3000/#/getphonenumber'});
    res.end();
  } else {
    res.writeHead(302, {location: '/'});
    res.end();
  }
};

exports.loginfailure = function(req, res) {
  res.send("Login Failure");
};

exports.signUp = function(req, res){
  User.add(req.body.uid, req.body.phone);
  res.writeHead(200);
  res.end();
}