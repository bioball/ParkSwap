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
    var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

  if (isMobile.iOS()) {
    var navLocation = 'maps:saddr=Current+Location&daddr=' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  } else if (isMobile.Android()) {
    var navLocation = 'http://maps.google.com/maps?q=@' + $scope.rider.riderLoc.lat + ',' + $scope.rider.riderLoc.lng;
  }

  location.href = navLocation;

  };
});