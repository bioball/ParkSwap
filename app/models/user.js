var DB = require("../db/init.js");

User = DB.Model.extend({
  tableName: 'users',
});

var noPhoneUsers = {};

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
};

module.exports.add = function(uid, phone) {
  saveToDB(uid, phone);
};

module.exports.getNoPhoneUser = function(uid){
  return { attributes: noPhoneUsers[uid] };
}

module.exports.find = function(uid) {
  return new User({'uid': uid}).fetch();
};