var User             = require('../models/user.js');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport, app){
  passport.serializeUser(function(user, done) {
    done(null, user.attributes.uid);
  });

  passport.deserializeUser(function(id, done) {
    User.find(id).then(function(user){
      if(user){
        done(null, user);
      } else {
        user = User.getNoPhoneUser(id);
        if(user){
          done(null, user);
        } else {
          done(null, false);
        }
      }
    })
  });

  passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: global.host + 'loginsuccess'
  }, function(accessToken, refreshToken, profile, done){
    User.find(profile.id).then(function(user){
      if(user){
        done(null, user);
      } else {
        User.addNoPhoneUser(profile);
        user = {
          attributes: {
            uid: profile.id,
            profile: profile
          }
        };
        done(null, user);
      }
    })
  }));
};
