var User      = require('./user');
var helpers   = require('../helpers/riderHelpers');
var riderList = {};

module.exports.exists = function(uid){
  riderList = helpers.readFromJSON(riderList);
  return !!riderList[uid];
};

module.exports.find = function(parkerLoc, searchRadius) {
  riderList = helpers.readFromJSON(riderList);

  var closeRiders = [];
  var riderDistance, carDistance;

  for(var uid in riderList) {
    riderDistance = helpers.findDistance(parkerLoc, riderList[uid].riderLoc);
    if(riderDistance < searchRadius){
      closeRiders.push({
        uid: uid,
        riderDistance: riderDistance.toFixed(1),
        riderLoc: riderList[uid].riderLoc,
        carDistance: helpers.findDistance(parkerLoc, riderList[uid].carLoc).toFixed(1),
        carLoc: riderList[uid].carLoc
      });
    }
  }
  return closeRiders.sort(function(a, b){
    return a.riderDistance - b.riderDistance;
  });
};

module.exports.add = function(rider) {
  riderList[rider.uid] = {
    carLoc: rider.carLoc, 
    riderLoc: rider.riderLoc
  };
  helpers.saveToJSON(riderList);
};

module.exports.destroy = function(uid) {
  riderList = helpers.readFromJSON(riderList);
  if(riderList[uid]){
    delete riderList[uid];
    helpers.saveToJSON(riderList);
    return true;
  }
  return false;
};