// Add new rider to JSON object

var riderList = {};

var saveToJSONFile = function() {
  fs.writeFileSync("./riderList.json", riderList);
};


var readFromJSONFile = function() {
  riderList = JSON.parse(fs.readFileSync("./riderList.json"));   
};

var distanceBetweenLocs = function(lat1, lon1, lat2, lon2) {

  var toRad = function(x) {
    return (x * (22/7))/180;
  };

  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;

  return d;
};

var find  = function(parkerLoc, searchRadius, riderList /* third arg used only in testing */) {

  var parkerLat = parkerLoc.lat;
  var parkerLng = parkerLoc.lng;

  var riderArray = [];

  var riderLat, riderLng;
  var riderLoc;
  var carLoc;

  // If  the riderList is empty, restore it from the  json file saved
  // on the disk

  if (riderList.length === 0) {
      readFromJSONFile();
  }

  for(rider in riderList) {
    riderLoc = riderList[rider].riderLoc;
    carLoc   = riderList[rider].carLoc;
    riderLat = riderLoc.lat;
    riderLng = riderLoc.lng;
    d = distanceBetweenLocs(parkerLat,  parkerLng, riderLat, riderLng);

    if (d <= searchRadius) {
      riderArray.push({distance: d, uid: rider, riderLoc: riderLoc, carLoc: carLoc});
    }
  }

  return riderArray.sort(function(a, b){
    return a.distance - b.distance;
  });

};


module.exports.find = find;

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



