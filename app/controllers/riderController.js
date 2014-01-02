var Rider = require("../models/rider.js");

var setExpiration = function(uid){
  setTimeout(function(){
    Rider.destroy(uid);
    // this should also send a SMS to the rider to let him know that no parkers were found.
  }, 600000)
}

module.exports.new = function(req, res) {
  Rider.add({
    uid: req.user.get('uid'),
    carLoc: req.body.carLocation, 
    riderLoc: req.body.riderLocation
  });
  setExpiration(req.user.get('uid'));
  res.send(201);
};

module.exports.cancel = function(req, res) {
  Rider.destroy(req.user.get('uid'));
  res.send(201);
};