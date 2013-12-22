// New Rider
var Rider = require("../models/rider.js");


module.exports.createNewRider = function(req, res) {
  var rider = req.body;

  Rider.add({
    uid: rider.uid, 
    carLoc: rider.carLoc, 
    riderLoc: rider.carLoc
  });
}

module.exports.cancel = function(uid) {
  Rider.destroy(uid);
};