var BookShelf = require('bookshelf');

var DB = BookShelf.initialize({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
  // connection: {
  //   host     : '127.0.0.1',
  //   user     : 'ParkSwap',
  //   password : 'Hack@Reactor',
  //   database : 'myapp_test',
  //   charset  : 'utf8'
  // }
});


DB.knex.schema.createTable('users', function(table){
	table.string('username');
	table.string('First_Name');
	table.string('Last_Name');
	table.string('Email');
	table.string('Photo')
	table.string('Phone_No');

}).then(function(){
	console.log("What's up");
});

var User = DB.Model.extend({
	tableName: 'users',

	initialize: function(username) {

		console.log(username);
	}

});


var UserList = DB.Collection.extend({
	model: User
});





new User({username:'Julius'})
.save()
.then(function(model) {
	console.log(model)
});

new User({username: 'Brutus'})
.save()

// newUserList.invokeThen('save', null).then(function() {
//   console.log("Data has been saved");
// });

// var qb = newUserList.query();
//     qb.where({name:'Julius'}).select().then(function(resp) {
//     	console.log(resp);
//     });


	


