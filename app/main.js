var app = require('express')();

require('./config/environments')(app);
require('./config/config')(app);
require('./config/routes')(app);

app.listen(app.get('port'));
console.log('Server is listening on port ' + app.get('port'));