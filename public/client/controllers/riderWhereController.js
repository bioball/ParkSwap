angular.module('appModule')
.controller('riderWhereController', function($scope, $http, $location, detectDeviceServices, riderServices, geocodeServices){
  navigator.geolocation.getCurrentPosition(function(position){
    $scope.riderLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    google.maps.event.addListener($scope.myMap, 'idle', function() {
      geocodeServices.getAddress({ 
        lat: $scope.myMap.getCenter().d,
        lng: $scope.myMap.getCenter().e
      }).then(function(address){
        $scope.carLocation = address;
      });
    });
    $scope.myMap.setCenter(new google.maps.LatLng($scope.riderLocation.lat, $scope.riderLocation.lng));
  });

  $scope.submitRider = function(){
    geocodeServices.getCoords($scope.carLocation)
    .then(function(carLocation){
      riderServices.create($scope.riderLocation, carLocation)
      .then(function(){
        $location.path('/rider/wait');
      }, function(err){
        $scope.err = {
          reason: err
        };
      })
    },
    function(err){
      $scope.err = {
        reason: err
      };
    });
  }
  $scope.focused = false;

  $scope.toggleFocus = function(){
    $scope.focused = !$scope.focused;
  };

  $scope.mapOptions = {
    center: new google.maps.LatLng(37.783648, -122.409173799999),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  if(detectDeviceServices.any()){
    $scope.mapOptions.zoomControl = false;
  }

  $scope.findMarkerAddress = function(evt) {
     var coord = {};
     coord.lat = evt.latLng.lat().toFixed(3);
     coord.lng = evt.latLng.lng().toFixed(3);

     geocodeServices.getAddress(coord)
     .then(function(address) {
      $scope.carLocation = address;
    })
  };

  $scope.showCarLocation = function () {
    geocodeServices.getCoords($scope.carLocation)
    .then(function(coords) {
      $scope.myMap.panTo(new google.maps.LatLng(coords.lat, coords.lng))
    })
  };

  $scope.home = function(){
    $location.path('/');
  };

});
