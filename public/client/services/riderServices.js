angular.module('appModule')
.factory('riderServices', function($q, $http){
  return {
    cancel: function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'rider/cancel',
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
    },
    callParker: function(){
      console.log("calling this parker");
    }
  }
})