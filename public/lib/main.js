var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done){
    console.log('accessToken is ' + accessToken);
    console.log('refreshToken is ' + refreshToken);
    console.log('profile is ' + profile);
    done()
  }
));

app.get('auth/facebook', passport.authenticate('facebook'));

app.listen(3000);
console.log('listening on port 3000');