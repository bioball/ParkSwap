
module.exports.DB = require('bookshelf').initialize({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }  
});



