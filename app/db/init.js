global.dbFile = global.dbFile || './db/mydb.sqlite';

module.exports = require('bookshelf').initialize({
  client: 'sqlite3',
  connection: {
    filename: global.dbFile
  }
});