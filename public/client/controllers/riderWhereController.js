angular.module('appModule')
.controller('riderWhereController', function($scope, $http, geocodeServices, $location){
  var riderLocation;
  navigator.geolocation.getCurrentPosition(function(position){
    riderLocation = [position.coords.latitude, position.coords.longitude];
  });
  $scope.submitRider = function(){
    carLocation = geocodeServices.getCoords($scope.carLocation)
    .then(function(){
      $http({
        method: "POST",
        url: "/riders/new",
        data: {
          uid: $rootScope.currentUser.UID,
          riderLocation: riderLocation,
          carLocation: carLocation
        }
      }).success(function(){
        $location.path('/rider/wait');
      }).failure(function(){
        $scope.serverError = true
      })
    },
    function(){
      $scope.badLocation = true;
    });
  }
});