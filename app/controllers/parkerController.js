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
  var riderSearchQuery = User.find(rideruid);

  riderSearchQuery.then(function(model) {
    console.log("Number: ", model.attributes.phone);
    console.log("Name: ", req.user.get('name'));
    Twilio.sendMessage(model.attributes.phone, req.user.get('name'));
    Rider.destroy(rideruid);
  });

  res.end();
};