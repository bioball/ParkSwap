angular.module('appModule')
.controller('riderWhereController', function($scope, $http, geocodeServices, $location){
  var riderLocation;
  navigator.geolocation.getCurrentPosition(function(position){
    riderLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  });
  $scope.submitRider = function(){
    geocodeServices.getCoords($scope.carLocation)
    .then(function(carLocation){
      console.log(carLocation);
      $http({
        method: "POST",
        url: "/riders/new",
        data: {
          uid: "uid",
          riderLocation: riderLocation,
          carLocation: carLocation
        }
      }).success(function(){
        $location.path('/wait');
      }).error(function(err){
        $scope.err = {
          reason: err
        }
      })
    },
    function(){
      $scope.err = {
        reason: "bad location"
      }
    });
  }
});