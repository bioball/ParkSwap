var express = require('express');

module.exports = function(app){
  app.configure('development', function(){
    app.use(express.errorHandler());
    global.dbFile = './db/development.sqlite'
  });

  app.configure('test', function(){
    global.dbFile = './db/test.sqlite';
  });
};