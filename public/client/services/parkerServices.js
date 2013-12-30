angular.module('appModule')
.factory('parkerServices', function($q, $http){
  return {
    pickRider: function(rider){
      this.rider = rider;
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
        if(data.results && data.results.length) {
          deferred.resolve(data);
        } else {
          deferred.reject('No one is looking for a ride right now!');
        }
      }).error(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
});