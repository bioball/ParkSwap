process.env.NODE_ENV = 'test';

var request   = require('request');
var expect    = require('chai').expect;

describe("Main app", function(){
  it("should be online", function(done){
    request('http://localhost:3000/', function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});