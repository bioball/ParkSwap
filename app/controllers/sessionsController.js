var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../models/usersModel');


passport.use(new FacebookStrategy({
    clientID: 550858538345751,
    clientSecret: '07b50d80033a1112837e85c4ff144ff3',
    callbackURL: 'http://localhost:3000/loginsuccess'
  },
  function(accessToken, refreshToken, profile, done){
    debugger;
    done(null, profile);
  }
));

exports.login = passport.authenticate('facebook'); 

exports.loginsuccess = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
})


// function (req, res) {
//   //does User exist? if not, redirect user to Angular page to get phone number
//   // res.writeHead({location: '#/getphonenumber'})

//   // debugger;
//   var body = "";
//   req.client.ondata(function(data){
//     body += data
//   })
//   req.client.onend(function(){
//     debugger;
//   })
//   // if(User.exist(id)){
//   //   createSession(id);
//   //   res.writeHead({location: '/'});
//   //   res.end();
//   // } else {
//   //   res.writeHead({location: '#/getphonenumber'});
//   //   res.end();
//   // }

//   // else, create Session for this user and redirect to home page
//     // res.writeHead({location: '#/'})
//   console.log(req);
//   console.log(res);
//   res.send("Login success");
// };

exports.loginfailure = function(req, res) {
  res.send("Login Failure");
};

                //    { successRedirect: '/loginsuccess',
                //      failureRedirect: '/loginfailure'});

