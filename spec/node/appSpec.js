process.env.NODE_ENV = 'test';

var appServer = require('../../app/main.js');
var request   = require('request');
var expect    = require('chai').expect;

after(function(){
  appServer.close();
})

describe("Main app", function(){
  it("should respond to GET requests to the root path", function(done){
    request('http://localhost:3000/', function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});