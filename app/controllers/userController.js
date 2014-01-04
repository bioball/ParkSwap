var User = require('../models/user');

module.exports.get = function(req, res){
  User.find(req.params.uid).then(function(user){
    res.send(200, user);
  }, function(){
    res.send(403, 'User does not exist');
  })
};