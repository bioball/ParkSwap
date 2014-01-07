angular.module('appModule')
.controller('parkerPickUpController', function($scope, parkerServices){
  parkerServices.getRider().then(function(rider){
    $scope.rider = rider
  });

  $scope.callRider = function() {
    var hrefLocation = 'tel:' + $scope.rider.phone;
    location.href = hrefLocation;
  };

  $scope.navigate = function() {
    var navLocation = 'https://maps.google.com/maps?saddr=Current+Location&addr=' + $scope.rider.riderLocation.lat + ',' + $scope.rider.riderLocation.lng;
    location.href = navLocation;
  };
});