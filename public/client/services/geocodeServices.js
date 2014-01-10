angular.module('appModule')
.factory('geocodeServices', function($q, $http){
  return {
    getCoords: function(address){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          address: address,
          sensor: true
        }
      }).success(function(data){
        if(data.results.length){
          deferred.resolve(data.results[0].geometry.location);
        } else {
          if(data.error_message){
            deferred.reject(data.error_message);
          } else {
            deferred.reject("We don't recognize that location!");
          }
        }
      }).error(function(err){
        deferred.reject("google maps API is messing up :(");
      })
      return deferred.promise;
    },
    getAddress: function(coord){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          latlng: coord.lat+','+coord.lng,
          sensor: true
        }
      }).success(function(data){
        if(data.results.length){
          deferred.resolve(data.results[0].formatted_address);
        } else {
          deferred.reject("bad location");
        }
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
});