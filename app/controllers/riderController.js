// New Rider
var Rider = require("../models/rider.js");


module.exports.createNewRider = function(req, res) {
  var body = "";
  var rider = {};

  req.on('data', function(data){
    body += data;
  });

  req.on('end', function(data) {
    rider = JSON.parse(body)
  });

  Rider.add({uid: rider.uid, 
            carLoc:rider.carLoc, 
            riderLoc:rider.carLoc
          });
}

module.exports.cancel = function(uid) {
  Rider.destroy(uid);
};



