var riderHelpers = require('../../../app/helpers/riderHelpers');
require('chai').should();

describe('Rider helpers', function(){
  it("should properly calculate the distance of two coordinates", function(){
    var coord1 = {
      lat: 37.7525347,
      lng: -122.41414320000001
    };
    var coord2 = {
      lat: 37.7231908,
      lng: -122.4467238
    };
    riderHelpers.findDistance(coord1, coord2).should.equal(2.7011152818599338);
  });
});