angular.module('appModule')
.controller('parkerListController', function($scope, $location, parkerServices){
	$scope.riders = [
		{ name: "John Smith", profilePhoto: "something.jpg", riderLocation: 239402340, carLocation: 23294 },
		{ name: "Bill Smith", profilePhoto: "anotherThing.jpg", riderLocation: 2342342, carLocation: 23544 },
		{ name: "Tim Smith", profilePhoto: "yetAnother.jpg", riderLocation: 2425232, carLocation: 635294 },
		{ name: "Ron Smith", profilePhoto: "anotherYetAnother.jpg", riderLocation: 3436235, carLocation: 53381 }
	];

	$scope.selectRider = function(rider) {
		console.log(rider);
		parkerServices.setRider(rider);
		$location.path('/parker/pickUpRider');
	};

});