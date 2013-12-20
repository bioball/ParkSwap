
/*
 * GET home page.
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: 'http://localhost:3000/login'
  },
  function(accessToken, refreshToken, profile, done){
  	debugger
    console.log('accessToken is ' + accessToken);
    console.log('refreshToken is ' + refreshToken);
    console.log('profile is ' + profile);
    done()
  }
));

exports.index = function (req, res) {
  //res.render('index', { title: 'Express' });
  res.send("Hello World");

};

exports.loginsuccess = function (req, res) {
	console.log(req);
	console.log(res);
	res.send("Login success");
};

exports.loginfailure = function(req, res) {
	res.send("Login Failure");
};

exports.login = passport.authenticate('facebook'); 
								//		{ successRedirect: '/loginsuccess',
								//			failureRedirect: '/loginfailure'});

