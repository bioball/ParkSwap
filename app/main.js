var express = require('express');
var app     = express();

global.host = 'http://localhost:3000/';

require('./config/config.js')(app);
require('./config/routes.js')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.listen(app.get('port'));
console.log('Server is listening on port ' + app.get('port'));