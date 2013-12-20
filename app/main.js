var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

require('./config/config.js')(app);
require('./routes/routes.js')(app);
app.use(express.static(path.join(__dirname, '..', 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

console.log(app.routes);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
