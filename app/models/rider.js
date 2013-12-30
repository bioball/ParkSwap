// Add new rider to JSON object

var riderList = {};

module.exports.add = function(rider) {
  riderList[rider.uid] = {
    carLoc: rider.carLoc, 
    riderLoc: rider.riderLoc
  };
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

module.exports.find  = function(parkerLoc, searchRadius) {


  var pLat = parkerLoc.lat;
  var pLng = parkerLoc.lng;

  var riderArray = [];

  //{distance: d, riderUid: .uid, riderLoc: loc, carLoc: cLoc}
  var rLat, rLng;
  var riderLoc;
  var carLoc;

  for(rider in riderList) {
    riderLoc = riderList[rider].riderLoc;
    carLoc = riderList[rider].carLoc;
    rLat = rLoc.lat;
    rLng = rLoc.lng;
    d = distanceBetweenLocs(pLat, pLng, rLat, rLng);

    if (d <= searchRadius) {
      riderArray.push({distance: d, uid: rider, riderLoc: riderLoc, carLoc: carLoc});
    }
  }

  return riderArray.sort(function(a, b){
    return a.distance - b.distance;
  });

};

module.exports.destroy = function(uid) {
  delete riderList[uid];
};