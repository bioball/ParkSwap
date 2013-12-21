var client = require('twilio')('ACea60b0c4dbb6aa6c066e81b615f74406', 'd2106d41fe31596ebedb3e45e66f8747');

module.exports.sendMessage = function(number, uid){
    client.sendMessage({

      to: riderNum, // replace with number of rider
	    from: '+14156609491', // our twilio number (trial number)
	    body: '____ is coming to give you a ride in exchange for your parking spot.' // message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio

	    if (err) { throw err };

	    else {
	      console.log(responseData.from);
	      console.log(responseData.body);
	    }
	});
}