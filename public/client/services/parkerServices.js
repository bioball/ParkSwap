angular.module('appModule')
.factory('parkerServices', function($q, $http){
  return {
    setRider: function(rider){
      this.rider = rider;
    },
    getRider: function() {
      return this.rider;
    },
    getRiderList: function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'SOMETHING',
        params: {
          location: this.location
        }
      }).success(function(data) {
        if(data.results.length) {
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