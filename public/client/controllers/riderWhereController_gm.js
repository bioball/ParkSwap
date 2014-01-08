  var riderLocation;

angular.module('appModule')
.controller('riderWhereController', function($scope, $http, $location, geocodeServices){
  navigator.geolocation.getCurrentPosition(function(position){
    riderLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $scope.$broadcast('gmMarkersUpdates', 'users');

    // riderLocation.lat = 37.767589;
    // riderLocation.lng = -122.428938;
    // $scope.updateCenter(42.88645, -78.87837); 
    //$scope.updateCenter(riderLocation.lat, riderLocation.lng);
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

  

  $scope.options = {
    map: {
      center: new google.maps.LatLng(37.77493,-122.419416),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },      
  };

  var getOptions = function(object) {
    return angular.extend(
     { title: "Test"}, $scope.options.selected
    );
  };

  
$scope.users = [
    {
      id:0,
      lat: 37.77493,
      lng: -122.419416
    } 
  ];
  

  $scope.updateCenter = function(lat, lng) {
    console.log(lat, lng);
    $scope.center = new google.maps.LatLng(lat, lng);

    var arr = [];
    var temp = {};
    temp.id = 0;
    temp.lat = lat;
    temp.lng = lng;
    arr.push(temp);

    $scope.users = arr;
    $scope.$broadcast('gmMarkersUpdate');
    $scope.$broadcast('gmMarkersRedraw');
  };

  $scope.$on('gmMapIdle', function(event, mapId) {   
    if (mapId === 'appModule') {
    $scope.updateCenter(42.88645, -78.87837); 
    }
});

});



 