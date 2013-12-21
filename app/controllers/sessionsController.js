var passport = require('passport');
var user     = require('../models/user');

// set up session serialization, deserialization, and facebook oauth
require('../helpers/sessionsHelpers.js')(passport);

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = passport.authenticate('facebook', {
  successRedirect: '/getphonenumber',
  failureRedirect: '/login'
});

exports.getPhoneNumber = function(req, res){
  if(!req.user.phone){
    debugger;
    res.cookie('uid', req.user.uid)
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
  var body = "";
  req.on('data', function(data){
    body += data;
  });
  req.on('end', function(){
    var newUser = JSON.parse(body);
    user.add(newUser.uid, newUser.phone);
  });
  res.writeHead(200);
  res.end();
}