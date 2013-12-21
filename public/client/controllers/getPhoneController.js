angular.module('appModule')
.controller('getPhoneController', function($scope, $http, $cookieStore){
  console.log($cookieStore.get('uid'));

  $scope.sendPhoneNumToServer = function() {
  	console.log('testing...');
  	$http({
  		method: "POST",
  		url: "/something",
  		data: {
  			phone: $scope.userPhoneNum
  		}
  	}).success(function() {
  		console.log("successfully sent registrant's phone num to server");
  	}).error(function(err) {
  		  console.log('failed to post to server');
  		  $scope.err = { 
  		  	reason: err
  	    }
    })
  }
});