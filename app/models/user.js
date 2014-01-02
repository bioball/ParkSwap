var DB        = require("../db/init.js");
var fs        = require('fs');
var jsonPath  = require('path').join(__dirname, '..', '/db/noPhoneUsers.json');

User = DB.Model.extend({
  tableName: 'users',
});

var noPhoneUsers = {};


var saveToJSONFile = function() {
  fs.writeFileSync(jsonPath, JSON.stringify(noPhoneUsers));
};


var readFromJSONFile = function() {
  noPhoneUsers = JSON.parse(jsonPath);   
};

saveToDB = function(uid, phone) {
  var user = noPhoneUsers[uid];
  user.phone = phone;
  new User(user)
  .save()
  .then(function() {
    delete noPhoneUsers[uid]  
  });
};

module.exports.addNoPhoneUser = function(profile) {
  noPhoneUsers[profile.id] = {
    uid: profile.id,
    first_name: profile._json.first_name,
    last_name: profile._json.last_name,
    name: profile.displayName
  }

  saveToJSONFile();
};

module.exports.add = function(uid, phone) {
  saveToDB(uid, phone);
  delete noPhoneUsers[uid];
  saveToJSONFile();
};

module.exports.getNoPhoneUser = function(uid){
  if (noPhoneUsers.length === 0) {
    readFromJSONFile();
  }
  return { attributes: noPhoneUsers[uid] };
}

module.exports.find = function(uid) {
  return new User({'uid': uid}).fetch();
};
