var Rider = require("../models/rider.js");

module.exports.new = function(req, res) {
  var rider = req.user;

  debugger;

  Rider.add({
    uid: rider.get('uid'),
    carLoc: req.body.carLocation, 
    riderLoc: req.body.riderLocation
  });
}

module.exports.cancel = function(uid) {
  Rider.destroy(uid);
};