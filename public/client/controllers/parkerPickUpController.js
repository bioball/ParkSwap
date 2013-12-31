angular.module('appModule')
.controller('parkerPickUpController', function($scope, parkerServices){
  $scope.rider = parkerServices.getRider();
  console.log("Inside scope", $scope.rider);

  //Post to the server
  

  $scope.callRider = function() {

  };

  $scope.navigate = function() {

  };
});