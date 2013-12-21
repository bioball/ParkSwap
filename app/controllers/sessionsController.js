var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../models/usersModel');

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(id, done) {
  done(null, {
    uid: 9385193,
    name: 'Bobby Bob Bob'
  });
});


passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: 'http://localhost:3000/loginsuccess'
  },
  function(accessToken, refreshToken, profile, done){
      // User.addNoPhoneUser(profile);
      var user = {
        uid: profile.id,
        profile: profile._json
      }

    done(null, user);
  }
));

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = passport.authenticate('facebook', {
  successRedirect: '/getphonenumber',
  failureRedirect: '/login'
});

exports.getPhoneNumber = function(req, res){
  res.cookie('uid', req.user.uid)
  res.writeHead(302, {location: 'http://localhost:3000/#/getphonenumber'});
  res.end();
};


exports.loginfailure = function(req, res) {
  res.send("Login Failure");
};

                //    { successRedirect: '/loginsuccess',
                //      failureRedirect: '/loginfailure'});

