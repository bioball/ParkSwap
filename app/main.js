var express = require('express');
var app     = express();
var path    = require('path');

require('./config/config.js')(app);
require('./config/routes.js')(app);
app.use(express.static(path.join(__dirname, '..', 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.listen(app.get('port'));
console.log('Server is listening on port ' + app.get('port'));