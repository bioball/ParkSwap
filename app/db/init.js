process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  module.exports = require('bookshelf').initialize({
    client: 'sqlite3',
    connection: {
      filename: './' + process.env.NODE_ENV + '.sqlite'
    }
  });
}

if(process.env.NODE_ENV == 'production'){
  module.exports = require('bookshelf').initialize({
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL
    }
  });
}