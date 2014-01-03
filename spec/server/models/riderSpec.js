var Rider = require('../../../app/models/rider');
require('chai').should();

describe('the Rider model', function(){
  it("should have have 'add', 'find', 'destroy' and 'exists' functions", function(){
    Rider.add.should.be.a('function');
    Rider.find.should.be.a('function');
    Rider.destroy.should.be.a('function');
    Rider.exists.should.be.a('function');
  });
});