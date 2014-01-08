var app = require('express')();

var port = process.env.PORT || 3000;

if(process.env.NODE_ENV == 'production'){
  global.root = 'http://park-swap.herokuapp.com/'
} else {
  global.root = 'http://10.1.1.103:' + port + '/';
}

require('./config/environments')(app);
require('./config/config')(app);
require('./config/routes')(app);


app.listen(app.get('port'));
console.log('Server is listening on port ' + app.get('port'));
