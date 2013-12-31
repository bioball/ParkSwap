// Add new rider to JSON object
var fs        = require('fs');
var path      = require('path');
var User      = require('./user');
var riderList = {};
var jsonPath  = path.join(__dirname, '..', '/db/riderList.json');

var saveToJSONFile = function() {
  fs.writeFileSync(jsonPath, JSON.stringify(riderList));
};

var readFromJSONFile = function() {
  riderList = JSON.parse(fs.readFileSync(jsonPath));
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

module.exports.find = function(parkerLoc, searchRadius) {
  // If  the riderList is empty, restore it from the  json file saved
  // on the disk
  if (JSON.stringify(riderList) === '{}') {
    readFromJSONFile();
  }

  var closeRiders = [];
  var riderDistance, carDistance;

  for(var uid in riderList) {
    riderDistance = findDistance(parkerLoc, riderList[uid].riderLoc);
    if(riderDistance < searchRadius){
      closeRiders.push({
        riderDistance: riderDistance.toFixed(1),
        carDistance: findDistance(parkerLoc, riderList[uid].carLoc).toFixed(1),
        uid: uid,
        riderLoc: riderList[uid].riderLoc,
        carLoc: riderList[uid].carLoc
      });
    }
  }
  return closeRiders.sort(function(a, b){
    return a.distance - b.distance;
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
  delete riderList[uid];
  saveToJSONFile();
};