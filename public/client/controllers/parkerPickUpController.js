angular.module('appModule')
.controller('parkerPickUpController', function($scope, $http, parkerServices){
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

  $scope.navigate = function() {
  //   var isMobile = {
  //     Android: function() {
  //         return navigator.userAgent.match(/Android/i);
  //     },
  //     BlackBerry: function() {
  //         return navigator.userAgent.match(/BlackBerry/i);
  //     },
  //     iOS: function() {
  //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //     },
  //     Opera: function() {
  //         return navigator.userAgent.match(/Opera Mini/i);
  //     },
  //     Windows: function() {
  //         return navigator.userAgent.match(/IEMobile/i);
  //     },
  //     any: function() {
  //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  //     }
  // };

  // if (isMobile.Android()) {
  //   alert("this device is android");
  //   var navLocation = 'geo:' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  //   location.href = navLocation;
  // } else if (isMobile.iOS()) {
  //   alert("this device is ios");
  //   var navLocation = 'maps://saddr=Current+Location&daddr=' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  // }

  // var navLocation = 'geo:' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  var navLocation = 'https://maps.google.com/maps?saddr=Current+Location&daddr=' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  location.href = navLocation;
  };
});