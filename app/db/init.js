var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  module.exports = require('bookshelf').initialize({
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, process.env.NODE_ENV + '.sqlite')
    }
  });
}

if(process.env.NODE_ENV == 'production'){
  module.exports = require('bookshelf').initialize({
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port:     process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      charset: 'utf8'
    }
  });
}