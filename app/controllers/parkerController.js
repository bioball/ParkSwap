var Rider = require('../models/rider');
var Twilio = require('./twilioController');
var User = require('../models/user');

module.exports.findRiders = function(req, res) {
  debugger;
  var searchRadiusInMiles = 1;
  var parkerLocation = req.query;
  var riders = Rider.find(parkerLocation, searchRadiusInMiles);
  res.send(200, JSON.stringify(riders));
}

module.exports.pickUpRider = function(req, res) {
  var rider  = req.body.name;
  var parker = req.user.get('name');
  var phone  = req.user.get('phone');
  Twilio.sendMessage(phone, req.user.get('name'));
  Rider.destroy(rider.uid);
  res.end();
};