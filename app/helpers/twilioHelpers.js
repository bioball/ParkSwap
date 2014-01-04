var client = require('twilio')('AC05846b9de660b7956faf5f85bee90640', 'c3eec460bfafae371c1262a6472433fd');
var Q      = require('q');

module.exports.sendMessage = function(number, message){
  var deferred = Q.defer();
  client.sendMessage({
    to: number, // replace with number of rider
    from: '+14157670797', // our twilio number (trial number)
    body: message // message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (err) {
      deferred.reject(err);
    } else {
      console.log(responseData.from, responseData.body);
      deferred.resolve(responseData);
    }
  });
  return deferred.promise;
};