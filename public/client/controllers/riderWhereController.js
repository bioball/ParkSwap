angular.module('appModule')
.controller('riderWhereController', function($scope, $http, $location, geocodeServices){
  navigator.geolocation.getCurrentPosition(function(position){
    riderLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    var markerArr = [];

    $scope.myMap.setCenter(new google.maps.LatLng(riderLocation.lat, riderLocation.lng));
    var firstMarker = $scope.addMarkerToMap($scope.myMap.getCenter());
    markerArr.push(firstMarker);

    google.maps.event.addListener($scope.myMap, 'drag', function() {
      for (var i = 0; i < markerArr.length; i++) {
        markerArr[i].setMap(null);
      }
      var marker = $scope.createMarker($scope.myMap.getCenter().b, $scope.myMap.getCenter().d);
      markerArr.push(marker);
    });

    google.maps.event.addListener($scope.myMap, 'dragend', function() {
      geocodeServices.getAddress({ lat: $scope.myMap.getCenter().b, lng: $scope.myMap.getCenter().d }).then(function(address){
        $scope.carLocation = address;
      });
    });
  });

  $scope.submitRider = function(){
    geocodeServices.getCoords($scope.carLocation)
    .then(function(carLocation){
      $http({
        method: "POST",
        url: "/rider/new",
        data: {
          riderLocation: riderLocation,
          carLocation: carLocation
        }
      }).success(function(){
        $location.path('/rider/wait');
      }).error(function(err){
        $scope.err = {
          reason: err
        }
      })
    },
    function(){
      $scope.err = {
        reason: "We don't recognize that location!"
      }
    });
  }
  $scope.focused = false;
  $scope.toggleFocus = function(){
    $scope.focused = !$scope.focused;
  }

  $scope.mapOptions = {
    center: new google.maps.LatLng(37.783648, -122.409173799999),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  $scope.findMarkerAddress = function(evt) {
     var coord = {};
     coord.lat = evt.latLng.lat().toFixed(3);
     coord.lng = evt.latLng.lng().toFixed(3);

     geocodeServices.getAddress(coord)
     .then(function(address) {
      $scope.carLocation = address;
    })
  };

  $scope.addMarkerToMap = function(latLng) {
    
    $scope.markerOnMap = new google.maps.Marker({
      map: $scope.myMap,
      position: latLng,
      draggable: false,
      // animation: google.maps.Animation.DROP,
    });

    // google.maps.event.addListener($scope.markerOnMap, 'dragend', $scope.findMarkerAddress);
    // google.maps.event.addListener($scope.markerOnMap, 'drag', $scope.findMarkerAddress);

    // $scope.myMap.setZoom(15);
    $scope.myMap.panTo($scope.markerOnMap.position);
    return $scope.markerOnMap;
  };
  
  $scope.createMarker = function(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    return $scope.addMarkerToMap(latLng);
  };

  // $scope.addMarker = function($event, $params) {
  //   $scope.addMarkerToMap($params[0].latLng);
  //   var coord = {};
  //   coord.lat = $params[0].latLng.lat();
  //   coord.lng = $params[0].latLng.lng();
  //   geocodeServices.getAddress(coord)
  //   .then(function(address) {
  //     $scope.carLocation = address;
  //   })
  // };    

  $scope.showCarLocation = function () {
    geocodeServices.getCoords($scope.carLocation)
    .then(function(carLocation) {
      $scope.createMarker(carLocation.lat, carLocation.lng);
    })
  };

  $scope.home = function(){
    $location.path('/');
  };

});
