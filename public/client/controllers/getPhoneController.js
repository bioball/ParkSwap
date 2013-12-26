angular.module('appModule')
.controller('getPhoneController', function($scope, $http, $cookieStore){

  $scope.sendPhoneNumToServer = function() {
  	console.log('testing...');
  	$http({
  		method: "POST",
  		url: "/signin",
  		data: {
        uid: $cookieStore.get('uid'),
  			phone: $scope.userPhoneNum
  		}
  	}).success(function() {
      $cookieStore.remove('uid');
  		$location.path('/');
  	}).error(function(err) {
  	  console.log('failed to post to server');
  	  $scope.err = { 
  	  	reason: err
  	  }
    })
  }
});