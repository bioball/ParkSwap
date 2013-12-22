var DB = require("./init.js");

DB.knex.schema.createTable('users', 
  function(table){
    table.string('uid');
    table.string('first_name');
    table.string('last_name');
    table.string('photo');
    table.string('phone');
    table.string('name')
  }).then(function(){
  console.log("User schema created successfully...");
});