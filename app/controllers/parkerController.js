var Rider = require('../models/rider');
var Twilio = require('./twilioController');
var User = require('../models/user');

module.exports.findRiders = function(req, res) {

  var searchRadiusInMiles = 1;

  var parkerLoc = request.body;
  var riders = Rider.find(parkerLoc, searchRadiusInMiles);

  res.write(JSON.stringify(riders));
  res.end();
}

module.exports.pickUpRider = function(req, res) {

    var rider = request.body

    User.find(rider.uid).then(function(profile) {
      var phone = profile.phone;

      Twilio.sendMessage(phone, req.user.name);

      Rider.destroy(rider.uid);
      res.end();
  });
}