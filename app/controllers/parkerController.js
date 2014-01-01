var Rider  = require('../models/rider');
var Twilio = require('./twilioController');
var User   = require('../models/user');

module.exports.findRiders = function(req, res) {
  var searchRadiusInMiles = 1;
  var parkerLocation = req.query;
  var riders = Rider.find(parkerLocation, searchRadiusInMiles);
  res.send(200, JSON.stringify(riders));
}

module.exports.pickUpRider = function(req, res) {
  var rideruid     = req.body.rider.uid;

  parkerPhone = req.user.get('phone');
  parkerImg   = req.user.get('photo');
  User.find(rideruid).then(function(model) {
    Twilio.sendMessage(model.get('phone'), 
      req.user.get('name'), 
      req.user.get('phone'), 
      req.user.get('photo'));
    Rider.destroy(rideruid);
  });

  res.end();
};