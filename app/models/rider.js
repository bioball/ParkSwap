var fs        = require('fs');
var User      = require('./user');
var jsonPath  = require('path').join(__dirname, '..', '/db/riderList.json');
var riderList = {};

var saveToJSONFile = function() {
  fs.writeFileSync(jsonPath, JSON.stringify(riderList));
};

var readFromJSONFile = function() {
  if(JSON.stringify(riderList) === '{}'){
    riderList = JSON.parse(fs.readFileSync(jsonPath));
  }
};

var toRad = function(x) {
  return x * Math.PI / 180;
};

var findDistance = function(coord1, coord2) {
  var a =
    Math.pow(Math.sin(toRad(coord2.lat - coord1.lat)/2), 2) +
    Math.pow(Math.sin(toRad(coord2.lng - coord1.lng)/2), 2) *
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat));

  return 7926.3352 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
};

module.exports.exists = function(uid){
  readFromJSONFile();
  return !!riderList[uid];
};

module.exports.find = function(parkerLoc, searchRadius) {
  readFromJSONFile();

  var closeRiders = [];
  var riderDistance, carDistance;

  for(var uid in riderList) {
    riderDistance = findDistance(parkerLoc, riderList[uid].riderLoc);
    if(riderDistance < searchRadius){
      closeRiders.push({
        uid: uid,
        riderDistance: riderDistance.toFixed(1),
        riderLoc: riderList[uid].riderLoc,
        carDistance: findDistance(parkerLoc, riderList[uid].carLoc).toFixed(1),
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
  saveToJSONFile();
};

module.exports.destroy = function(uid) {
  if(riderList[uid]){
    delete riderList[uid];
    saveToJSONFile();
  }
};