var User             = require('../models/user.js');
var FacebookStrategy = require('passport-facebook').Strategy;

var facebook = new FacebookStrategy({
  clientID: 550858538345751,
  clientSecret: '07b50d80033a1112837e85c4ff144ff3',
  callbackURL: global.root + 'loginsuccess'
}, function(accessToken, refreshToken, profile, done){
  User.findOrCreate(profile).then(function(user){
    done(null, user);
  })
});

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.get('uid'));
  });

  passport.deserializeUser(function(id, done) {
    User.find(id).then(function(user){
      user ? done(null, user) : done(null, false);
    });
  });

  passport.use(facebook);
};