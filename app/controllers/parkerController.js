var Rider  = require('../models/rider');
var User   = require('../models/user');
var twilio = require('../helpers/twilio');

module.exports.findRiders = function(req, res) {
  var searchRadiusInMiles = 1;
  var parkerLocation = req.query;
  var riders = Rider.find(parkerLocation, searchRadiusInMiles);
  res.send(200, JSON.stringify(riders));
}

module.exports.pickUpRider = function(req, res) {
  var riderUid = req.body.rider.uid;

  parkerPhone = req.user.get('phone');
  parkerImg   = req.user.get('photo');
  User.find(riderUid).then(function(model) {
    twilio.sendMessage(model.get('phone'), 
      req.user.get('name'), 
      req.user.get('phone'), 
      req.user.get('photo'));
    Rider.destroy(riderUid);
  });

  res.end();
};