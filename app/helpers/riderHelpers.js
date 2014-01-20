var jsonPath = require('path').join(__dirname, '..', '/db/riderList.json');
var fs       = require('fs');

var toRad = function(x) {
  return x * Math.PI / 180;
};

module.exports.saveToJSON = function(riderList) {
  fs.writeFileSync(jsonPath, JSON.stringify(riderList));
};

module.exports.readFromJSON = function(riderList) {
  if(JSON.stringify(riderList) === '{}'){
    return JSON.parse(fs.readFileSync(jsonPath));
  }

  return riderList;
};

module.exports.findDistance = function(coord1, coord2) {
  var a =
    Math.pow(Math.sin(toRad(coord2.lat - coord1.lat)/2), 2) +
    Math.pow(Math.sin(toRad(coord2.lng - coord1.lng)/2), 2) *
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat));

  return 7926.3352 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
};