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
    twilio.sendMessage(rider.get('phone'), req.user.get('name'))
    Rider.destroy(riderUid);
    res.end(200);
  });
};