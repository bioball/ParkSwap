angular.module('appModule')
.controller('parkerListController', function($scope, $rootScope, $location, $interval, geocodeServices, parkerServices){

  var interval, position, parkerLocation, count = 0;
  $scope.riders = {};
  $rootScope.searchingForRiders = true;
  $scope.noRiders = false;

  navigator.geolocation.getCurrentPosition(function(position){
    parkerLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $rootScope.searchingForRiders && $scope.pingServer();
  });

  var repeatFn = function() {
    count++;
    parkerServices.getRiderList(parkerLocation).then(function(data){
      var uids = {};
      data.forEach(function(rider){
        uid[rider.uid] = true;
        if(!$scope.riders[rider.uid]){
          geocodeServices.getAddress(rider.carLoc).then(function(carAddress){
            geocodeServices.getAddress(rider.riderLoc).then(function(riderAddress){
              rider.carAddress = carAddress.split(',')[0];
              rider.riderAddress = riderAddress.split(',')[0];
              $scope.riders[rider.uid] = rider;
            });
          });
        }
      });

      // clean up the riders that no longer exist
      $scope.riders.forEach(function(rider, uid){
        if(!uids[uid]){
          delete riders[uid]
        }
      });
      if (count === 300) {
        $scope.noRiders = true;
        stop(); 
      }
    });
  };

  var stop = function() {
    $rootScope.searchingForRiders = false;
    return $interval.cancel(interval);
  };

  $scope.pingServer = function() {
    $rootScope.searchingForRiders = true;
    $scope.noRiders = false;
    count = 0;
    $scope.riders = {};
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