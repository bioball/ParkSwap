angular.module('appModule')
.controller('parkerPickUpController', function($scope, parkerServices){
  $scope.rider = parkerServices.getRider();

  $scope.callRider = function() {

  };

  $scope.navigate = function() {

  };
});