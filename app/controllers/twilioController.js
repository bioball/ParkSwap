var client = require('twilio')('AC05846b9de660b7956faf5f85bee90640', 'c3eec460bfafae371c1262a6472433fd');

module.exports.sendMessage = function(riderNum, name, parkerImg, parkerPhone){
    client.sendMessage({

      to: riderNum, // replace with number of rider
      from: '+14157670797', // our twilio number (trial number)
      body: name + ' is coming now to give you a ride in exchange for your parking spot!' // message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (err) { 
        console.log(err);
        throw err 
      }

      else {
        console.log(responseData.from);
        console.log(responseData.body);
      }
  });
};
