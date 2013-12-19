angular.module('appModule')
.controller('parkerListController', function($scope, riderFactory){
	$scope.riders = [
		{ name: "John Smith", profilePhoto: "something.jpg", carLocation: 23294 },
		{ name: "Bill Smith", profilePhoto: "anotherThing.jpg", carLocation: 23544 },
		{ name: "Tim Smith", profilePhoto: "yetAnother.jpg", carLocation: 635294 },
		{ name: "Ron Smith", profilePhoto: "anotherYetAnother.jpg", carLocation: 53381 }
	];

	$scope.selectRider = function(rider) {
		riderFactory.rider = rider;
	};

});