angular.module('appModule')
.controller('parkerListController', function($scope, $location, $interval, parkerServices){
	$scope.riders = parkerServices.getRiderList();

	$scope.selectRider = function(rider) {
		parkerServices.setRider(rider);
		$location.path('/parker/pickUpRider');
	};

	var interval;

	$scope.pingServer = function() {
		var count = 0;
		interval = $interval(function() {
			$scope.noRiders = false;
			$scope.pending = true;
			count++;

			if (count === 10) {
				stop();
			}
			
			parkerServices.getRiderList().then(function(data){
				if (!data.length || count === 300) {
					stop();
					parkerServices.setRiderList(data);
				}
			})
		}, 2000);
	};

	var stop = function() {
		$interval.cancel(interval);
		$scope.pending = false;

		if (!$scope.riders.length) {
			$scope.noRiders = true;
		}
	};

	$scope.pingServer();

});