angular.module('appModule')
.factory('userServices', function($http, $q){
  return {
    get: function(uid){
      var deferred = $q.defer(uid);
      $http({
        method: 'GET',
        url: 'users/' + uid
      }).success(function(user){
        deferred.resolve(user);
      }).error(function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    }
  }
})