var Rider = require('../../../app/models/rider');

describe('the Rider model', function(){
  it("should have have 'add', 'find', 'destroy' and 'exists' functions", function(){
    expect(Rider.add).toEqual(jasmine.any(Function));
    expect(Rider.find).toEqual(jasmine.any(Function));
    expect(Rider.find).toEqual(jasmine.any(Function));
    expect(Rider.exists).toEqual(jasmine.any(Function));
  });
});
