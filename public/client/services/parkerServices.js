angular.module('appModule')
.factory('parkerServices', function($q, $http, userServices){
  return {
    pickRider: function(rider){
      this.rider = rider;
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'parker/pickuprider',
        data: {
          rider: rider
        }
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    getRider: function() {
      var _rider = this.rider;
      var deferred = $q.defer();
      userServices.get(_rider.uid).then(function(rider){
        deferred.resolve(angular.extend(_rider, rider));
      }, function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    },
    getRiderList: function(location) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'parker/find',
        params: {
          lat: location.lat,
          lng: location.lng
        }
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  };
});