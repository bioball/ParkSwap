angular.module('appModule')
.factory('riderServices', function($q, $http){
  return {
    cancel: function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'riders/cancel',
        data: {
          rider: "this rider"
        }
      }).success(function(data){
        deferred.resolve(data)
      }).error(function(err){
        deferred.reject(err)
      });
      return deferred.promise;
    },
    setParker: function(parker){
      this.parker = parker;
    },
    getParker: function(){
      return this.parker;
    }
  }
})