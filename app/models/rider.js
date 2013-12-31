// Add new rider to JSON object
var fs = require('fs');
var riderList = {};

var saveToJSONFile = function() {
  fs.writeFileSync("../db/riderList.json", JSON.stringify(riderList));
};

var readFromJSONFile = function() {
  riderList = JSON.parse(fs.readFileSync("../db/riderList.json"));  
};

var toRad = function(x) {
  return x * Math.PI / 180;
};

var findDistance = function(coord1, coord2) {
  var a =
    Math.pow(Math.sin(toRad(coord2.lat - coord1.lat)/2), 2) +
    Math.pow(Math.sin(toRad(coord2.lng - coord1.lng)/2), 2) *
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat));

  return 3963.1676 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
};

module.exports.find = function(parkerLoc, searchRadius) {
  // If  the riderList is empty, restore it from the  json file saved
  // on the disk
  if (JSON.stringify(riderList) === '{}') {
    readFromJSONFile();
  }

  var closeRiders = [];
  var riderDistance, carDistance;

  for(var rider in riderList) {
    riderDistance = findDistance(parkerLoc, riderList[rider].riderLoc);
    if(riderDistance < searchRadius){
      closeRiders.push({
        riderDistance: riderDistance,
        carDistance: findDistance(parkerLoc, riderList[rider].carLoc),
        rider: rider
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