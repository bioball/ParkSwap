// Add new rider to JSON object

var riderList = {};

modules.exports.add = function(rider) {
  riderList[rider.uid] = 
              {
                carLoc: rider.carLoc, 
                riderLoc: rider.riderLoc;
              };
};

modules.exports.find  = function(parkerLoc, searchRadius) {
// Use google distance API

//return a list of riders, an array
};

modules.exports.destroy = function(uid) {
  delete riderList[uid];
};





