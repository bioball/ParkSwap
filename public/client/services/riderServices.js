angular.module('appModule')
.factory('riderServices', function($q, $http, $cookies, userServices){
  return {
    cancel: function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'rider/cancel',
      }).success(function(data){
        $cookies.status = 'OK';
        deferred.resolve(data);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    setParker: function(parker){
      this.parker = parker;
    },
    getParker: function(uid){
      return userServices.get(uid);
    },
    callParker: function(){
      var hrefLocation = 'tel:' + this.parker.phone;
      location.href = hrefLocation;
    }
  }
})