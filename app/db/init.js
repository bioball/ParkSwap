process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('DATABASE_URL', process.env.DATABASE_URL);

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
      host: 'ec2-107-20-224-35.compute-1.amazonaws.com',
      user: 'qsddvxtrreopjl',
      password: 'mGV_-AWD1zJ8p-uKZ-TK0entmP',
      port: '5432',
      database: 'd93ur6m14kckv1'
    }
  });
}