angular.module('appModule')
.controller('parkerPickUpController', function($scope, $location, $http, parkerServices, detectDeviceServices){;
  parkerServices.getRider().then(function(rider){
    $scope.rider = rider;
    $http({
      method: 'GET',
      url: 'http://graph.facebook.com/' + rider.uid + '/picture?width=480&redirect=0&type=normal&height=300'
    }).success(function(data){
      $scope.profileUrl = data.data.url;
    });
  });

  $scope.callRider = function() {
    var hrefLocation = 'tel:' + $scope.rider.phone;
    location.href = hrefLocation;
  };

  $scope.home = function(){
    $location.path('/');
  };

  $scope.navigate = function() {
    var navLocation;
    if (detectDeviceServices.Android()) {
      navLocation = 'http://maps.google.com/maps?q=@' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
    } else {
      navLocation = 'maps:saddr=Current+Location&daddr=' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
    }
    location.href = navLocation;
  };
});