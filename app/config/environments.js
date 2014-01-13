var express = require('express');

module.exports = function(app){
  app.configure('development', function(){
    app.use(express.errorHandler());
    global.dbFile = './db/development.sqlite';
    global.root = 'http://localhost:3000/';
  });

  app.configure('production', function(){
    global.root = 'http://park-swap.herokuapp.com/'
  });

  app.configure('test', function(){
    global.dbFile = './db/test.sqlite';
    global.root = 'http://localhost:3000/';
  });
};