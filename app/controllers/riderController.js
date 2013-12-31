var Rider = require("../models/rider.js");

module.exports.new = function(req, res) {
  var rider = req.user;
  Rider.add({
    uid: rider.get('uid'),
    carLoc: req.body.carLocation, 
    riderLoc: req.body.riderLocation
  });
  res.send(201);
};

module.exports.cancel = function(req, res) {
  Rider.destroy(req.user.get('uid'));
  res.send(201);
};