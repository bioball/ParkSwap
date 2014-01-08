angular.module('appModule')
.controller('parkerListController', function($scope, $rootScope, $location, $interval, $cookies, geocodeServices, parkerServices){

  var position, parkerLocation, count = 0;
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
        uids[rider.uid] = true;
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
      for(var uid in $scope.riders){
        if(!uids[uid]){
          delete $scope.riders[uid]
        }
      }
      if (count === 300) {
        $scope.noRiders = true;
        stop(); 
      }
    });
  };

  var stop = function() {
    $rootScope.searchingForRiders = false;
    return $interval.cancel($rootScope.parkerPing);
  };

  $scope.pingServer = function() {
    $rootScope.searchingForRiders = true;
    $scope.noRiders = false;
    count = 0;
    $scope.riders = {};
    $rootScope.parkerPing = $interval(repeatFn, 2000);
  };

  $scope.selectRider = function(rider) {
    parkerServices.pickRider(rider).then(function(){
      stop();
      $location.path('/parker/pickuprider');
    }, function(){
      $scope.err = {
        reason: "Something broke! Try another person."
      };
    });
  };

  $scope.cancel = function(){
    stop();
    $location.path('/');
  };

  $scope.empty = function(){
    return JSON.stringify($scope.riders) == '{}';
  };

});