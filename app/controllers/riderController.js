var Rider  = require('../models/rider');
var User   = require('../models/user');
var twilio = require('../helpers/twilioHelpers');

var setExpiration = function(uid){
  setTimeout(function(){
    if(Rider.destroy(uid)){
      User.find(uid).then(function(user){
        var message = "Unfortuantely we couldn't find anybody who's looking for a spot. Click below to try again: " + global.root + "#/rider/wait";
        twilio.sendMessage(user.get('phone'), message)
        .then(function(){}, function(err){
          console.log(err)
        });
      });
    }
  }, 600000);
};

module.exports.new = function(req, res) {
  Rider.add({
    uid: req.user.get('uid'),
    carLoc: req.body.carLocation, 
    riderLoc: req.body.riderLocation
  });
  // setExpiration(req.user.get('uid'));
  res.send(201);
};

module.exports.cancel = function(req, res) {
  Rider.destroy(req.user.get('uid'));
  res.send(201);
};