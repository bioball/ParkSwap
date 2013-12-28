var express = require('express');
var http = require('http');
var app = express();

require('./config/config.js')(app);
require('./config/routes.js')(app);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
