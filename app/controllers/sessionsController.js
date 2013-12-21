var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../models/usersModel');


passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: 'http://localhost:3000/loginsuccess'
  },
  function(accessToken, refreshToken, profile, done){
    console.log(profile);
    //done(null, profile);
  }
));

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = function() {
    console.log("Success");
};

exports.loginfailure = function(req, res) {
  res.send("Login Failure");
};
