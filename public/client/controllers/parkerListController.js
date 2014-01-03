angular.module('appModule')
.controller('parkerListController', function($scope, $rootScope, $location, $interval, geocodeServices, parkerServices){

  var interval, position, count = 0;
  $rootScope.searchingForRiders = true;

  navigator.geolocation.getCurrentPosition(function(position){
    parkerLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $scope.pingServer();
  });

  var repeatFn = function() {
    $scope.noRiders = false;
    $scope.riders = $scope.riders || [];
    count++;
    parkerServices.getRiderList(parkerLocation).then(function(data){
      if(!data.length){ $scope.riders = [] }
      data.forEach(function(rider, index){
        geocodeServices.getAddress(rider.carLoc).then(function(carAddress){
          geocodeServices.getAddress(rider.riderLoc).then(function(riderAddress){
            rider.carAddress = carAddress;
            rider.riderAddress = riderAddress;
            $scope.riders[index] = rider
          })
        })
      })
      if (count === 300) { stop(); }
    })
  }

  var stop = function() {
    $interval.cancel(interval);
    $rootScope.searchingForRiders = false;

    if (!$scope.riders) {
      $scope.noRiders = true;
    }
  };

  $scope.pingServer = function() {
    count = 0;
    interval = $interval(repeatFn, 2000);
  };


  $scope.selectRider = function(rider) {
    stop();
    parkerServices.pickRider(rider);
    $location.path('/parker/pickUpRider');
  };

  $scope.cancel = function(){
    stop();
    $location.path('/goodbye');
  }
});