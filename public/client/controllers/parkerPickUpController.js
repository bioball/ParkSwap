angular.module('appModule')
.controller('parkerPickUpController', function($scope, parkerServices){
  parkerServices.getRider().then(function(rider){
    $scope.rider = rider
  });

  $scope.callRider = function() {
  };

  $scope.navigate = function() {
  };
});