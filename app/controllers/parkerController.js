var Rider  = require('../models/rider');
var User   = require('../models/user');
var twilio = require('../helpers/twilioHelpers');

module.exports.findRiders = function(req, res) {
  var searchRadiusInMiles = 1;
  var parkerLocation = req.query;
  var riders = Rider.find(parkerLocation, searchRadiusInMiles);
  res.send(200, riders);
};

module.exports.pickUpRider = function(req, res) {
  var riderUid = req.body.rider.uid;
  User.find(riderUid).then(function(rider) {
    var url = global.root + "#/rider/coming/" + req.user.get('uid');
    var message = req.user.get('name') + ' is coming now to give you a ride in exchange for your parking spot! '
    twilio.sendMessage(rider.get('phone'), message + url).then(function(){
      Rider.destroy(riderUid);
      res.send(200);
    }, function(err){
      res.send(401, "We can't send a message to this user for some reason!");
    });
  });
};