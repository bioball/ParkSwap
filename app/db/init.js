module.exports = require('bookshelf').initialize({
  client: 'sqlite3',
  connection: {
    filename: global.dbFile
  }
});