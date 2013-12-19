angular.module('AppModule')
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
        d.resolve(data.results[0].geometry.location);
      }).error(function(err){
        d.reject(err);
      })
      return d.promise;
    },
    getAddress: function(lat, lng){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          latlng: lat+','+lng,
          sensor: true
        }
      }).success(function(data){
        d.resolve(data.results[0].formatted_address);
      }).error(function(err){
        d.reject(err);
      })
    }
  }
});