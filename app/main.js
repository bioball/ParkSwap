var app = require('express')();

global.root = 'http://localhost:3000/';

require('./config/environments')(app);
require('./config/config')(app);
require('./config/routes')(app);


app.listen(app.get('port'));
console.log('Server is listening on port ' + app.get('port'));
