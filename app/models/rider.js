// Add new rider to JSON object

var riderList = {};

module.exports.add = function(rider) {
  riderList[rider.uid] = {
    carLoc: rider.carLoc, 
    riderLoc: rider.riderLoc
  };
};

module.exports.find  = function(parkerLoc, searchRadius) {
// Use google distance API

//return a list of riders, an array
};

module.exports.destroy = function(uid) {
  delete riderList[uid];
};