angular.module('appModule')
.controller('parkerListController', function($scope, $rootScope, $location, $interval, geocodeServices, parkerServices){

  var interval, position, parkerLocation, count = 0;
  $scope.riders = [];
  $rootScope.searchingForRiders = true;

  navigator.geolocation.getCurrentPosition(function(position){
    parkerLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $rootScope.searchingForRiders && $scope.pingServer();
  });

  var repeatFn = function() {
    $scope.noRiders = false;
    count++;
    parkerServices.getRiderList(parkerLocation).then(function(data){
      data.forEach(function(rider, index){
        geocodeServices.getAddress(rider.carLoc).then(function(carAddress){
          geocodeServices.getAddress(rider.riderLoc).then(function(riderAddress){
            rider.carAddress = carAddress;
            rider.riderAddress = riderAddress;
            $scope.riders[index] = rider;
          });
        });
      });
      if (count === 300) { stop(); }
    });
  }

  var stop = function() {
    $rootScope.searchingForRiders = false;
    if(!$scope.riders.length){
      $scope.noRiders = true;
    }
    return $interval.cancel(interval);
  };

  $scope.pingServer = function() {
    $rootScope.searchingForRiders = true;
    $scope.noRiders = false;
    count = 0;
    $scope.riders = [];
    interval = $interval(repeatFn, 2000);
  };

  $scope.selectRider = function(rider) {
    stop();
    parkerServices.pickRider(rider).then(function(){
      $location.path('/parker/pickUpRider');
    });
  };

  $scope.cancel = function(){
    stop();
    $location.path('/goodbye');
  };
});