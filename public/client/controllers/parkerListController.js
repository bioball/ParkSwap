angular.module('appModule')
.controller('parkerListController', function($scope, $location, $interval, parkerServices){

  var interval, count = 0;

  // $scope.riders = [{name: "john"}]

  var repeatFn = function() {
    $scope.noRiders = false;
    $scope.pending = true;
    count++;
    if (count === 10) { stop(); }
    parkerServices.getRiderList().then(function(data){
      if (!data.length || count === 300) {
        stop();
        parkerServices.setRiderList(data);
      }
    })
  };
  
  var stop = function() {
    $interval.cancel(interval);
    $scope.pending = false;

    if (!$scope.riders.length) {
      $scope.noRiders = true;
    }
  };

	$scope.riders = parkerServices.getRiderList();

	$scope.selectRider = function(rider) {
		parkerServices.setRider(rider);
		$location.path('/parker/pickUpRider');
	};

  $scope.pingServer = function() {
    count = 0;
    repeatFn();
    interval = $interval(repeatFn, 2000);
  };

	$scope.pingServer();

});