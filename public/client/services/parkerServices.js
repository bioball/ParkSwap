angular.module('appModule')
.factory('parkerServices', function($q, $http){
  return {
    pickRider: function(rider){
      this.rider = rider;

      // Notify server
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'parker/pickUpRider',
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
      return this.rider;
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
  }
});