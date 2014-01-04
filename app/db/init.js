var dbFile;

switch(process.env.NODE_ENV){
  case 'development':
    dbFile = './db/development.sqlite';
    break;
  case 'test':
    dbFile = './db/test.sqlite';
    break;
  default:
    dbFile = './db/development.sqlite';
    break;
}

module.exports = require('bookshelf').initialize({
  client: 'sqlite3',
  connection: {
    filename: dbFile
  }
});