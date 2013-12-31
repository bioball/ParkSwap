angular.module('appModule')
.controller('parkerListController', function($scope, $location, $interval, geocodeServices, parkerServices){

  var interval, position, count = 0;
  $scope.pending = true;

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
        geocodeServices.getAddress(rider.carLoc).then(function(carLoc){
          rider.carLoc = carLoc;
          $scope.riders[index] = rider
        })
      })
      if (count === 300) { stop(); }
    })
  }

  var stop = function() {
    $interval.cancel(interval);
    $scope.pending = false;

    if (!$scope.riders) {
      $scope.noRiders = true;
    }
  };

  $scope.pingServer = function() {
    count = 0;
    repeatFn();
    interval = $interval(repeatFn, 2000);
  };


  $scope.selectRider = function(rider) {
    parkerServices.pickRider(rider);
    $location.path('/parker/pickUpRider');
  };

  $scope.cancel = function(){
    stop();
    $location.path('/goodbye');
  }
});