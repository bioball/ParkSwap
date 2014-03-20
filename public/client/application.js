angular.module('appModule', ['ngRoute', 'ngCookies', 'ui.mask', 'ui.map'])
angular.module('appModule')

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'mainController',
    templateUrl: 'client/views/main.html'
  })
  .when('/login', {
    templateUrl: 'client/views/login.html'
  })
  .when('/parker/list', {
    controller: 'parkerListController',
    templateUrl: 'client/views/parker/list.html'
  })
  .when('/parker/pickuprider', {
    controller: 'parkerPickUpController',
    templateUrl: 'client/views/parker/pickUp.html'
  })
  .when('/rider/where', {
    controller: 'riderWhereController',
    templateUrl: 'client/views/rider/where.html'
  })
  .when('/rider/wait', {
    controller: 'riderWaitController',
    templateUrl: 'client/views/rider/wait.html'
  })
  .when('/rider/coming/:uid', {
    controller: 'riderComingController',
    templateUrl: 'client/views/rider/coming.html'
  })
  .when('/getphonenumber', {
    controller: 'getPhoneController',
    templateUrl: 'client/views/getphone.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
angular.module('appModule')
.run(function($rootScope, $cookies, $location, $interval, detectDeviceServices){
  
  $rootScope.isDesktop = !detectDeviceServices.any() && !localStorage.hasDisplayedDesktopFlash;
  if(!detectDeviceServices.any()){
    localStorage.hasDisplayedDesktopFlash = true;
  }

  $rootScope.$on('$routeChangeStart', function(evt, nextUrl, currentUrl){
    if(nextUrl.$$route && nextUrl.$$route.originalPath !== '/login'){
      switch($cookies.status){
        case "401":
          $location.path('/login');
          break;
        case "412":
          $location.path('/getphonenumber');
          break;
        case "409":
          $location.path('/rider/wait');
          break;
      }
    }

    if($rootScope.searchingForRiders && nextUrl.$$route && nextUrl.$$route.originalPath !== '/parker/list'){
      $interval.cancel($rootScope.parkerPing)
    }
  });

  // detectDeviceServices.iOS() && FastClick.attach(document.body);
});
angular.module('appModule')
.controller('getPhoneController', function($scope, $http, $location, $cookieStore){

  $scope.focused = false;

  $scope.toggleFocus = function(){
    $scope.focused = !$scope.focused;
  };

  $scope.sendPhoneNumToServer = function() {
    $http({
      method: "POST",
      url: "/updatephone",
      data: {
        uid: $cookieStore.get('uid'),
        phone: $scope.userPhoneNum
      }
    }).success(function() {
      $cookieStore.remove('uid');
      $cookieStore.remove('status');
      $location.path('/');
    }).error(function(err) {
      console.log('failed to post to server');
      $scope.err = { 
        reason: err
      }
    })
  }
});
angular.module('appModule')
.controller('mainController', function($scope, $location){
  $scope.toggleSpot = function(){
    $scope.clicked = $scope.clicked == 'spot' ? null : 'spot';
  };
  $scope.toggleRide = function(){
    $scope.clicked = $scope.clicked == 'ride' ? null : 'ride';
  };
  $scope.selected = function(){
    return !!$scope.clicked;
  };
  $scope.go = function(){
    $scope.clicked === 'spot' ? $location.path('/parker/list') : $location.path('/rider/where');
  };
});
angular.module('appModule')
.controller('parkerListController', function($scope, $rootScope, $location, $interval, $cookies, geocodeServices, parkerServices){

  var position, parkerLocation, count = 0;
  $scope.riders = {};
  $rootScope.searchingForRiders = true;
  $scope.noRiders = false;

  navigator.geolocation.getCurrentPosition(function(position){
    parkerLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $rootScope.searchingForRiders && $scope.pingServer();
  });

  var repeatFn = function() {
    count++;
    parkerServices.getRiderList(parkerLocation).then(function(data){
      var uids = {};
      data.forEach(function(rider){
        uids[rider.uid] = true;
        if(!$scope.riders[rider.uid]){
          geocodeServices.getAddress(rider.carLoc).then(function(carAddress){
            geocodeServices.getAddress(rider.riderLoc).then(function(riderAddress){
              rider.carAddress = carAddress.split(',')[0];
              rider.riderAddress = riderAddress.split(',')[0];
              $scope.riders[rider.uid] = rider;
            });
          });
        }
      });

      // clean up the riders that no longer exist
      for(var uid in $scope.riders){
        if(!uids[uid]){
          delete $scope.riders[uid]
        }
      }
      if (count === 300) {
        $scope.noRiders = true;
        stop(); 
      }
    });
  };

  var stop = function() {
    $rootScope.searchingForRiders = false;
    return $interval.cancel($rootScope.parkerPing);
  };

  $scope.pingServer = function() {
    $rootScope.searchingForRiders = true;
    $scope.noRiders = false;
    count = 0;
    $scope.riders = {};
    $rootScope.parkerPing = $interval(repeatFn, 2000);
  };

  $scope.selectRider = function(rider) {
    $scope.pending = true;
    parkerServices.pickRider(rider).then(function(){
      stop();
      $location.path('/parker/pickuprider');
    }, function(){
      $scope.pending = false;
      $scope.err = {
        reason: "Something broke! Try another person."
      };
    });
  };

  $scope.cancel = function(){
    stop();
    $location.path('/');
  };

  $scope.empty = function(){
    return JSON.stringify($scope.riders) == '{}';
  };

});
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
angular.module('appModule')
.controller('riderComingController', function($scope, $http, $location, $routeParams, riderServices){
  riderServices.getParker($routeParams.uid).then(function(parker){
    riderServices.setParker(parker)
    $scope.parker = parker;
    $http({
      method: 'GET',
      url: 'http://graph.facebook.com/' + parker.uid + '/picture?width=480&redirect=0&type=normal&height=300'
    }).success(function(data){
      $scope.profileUrl = data.data.url;
    });
  });

  $scope.callParker = function(){
    riderServices.callParker();
  };

  $scope.home = function(){
    $location.path('/');
  };

});
angular.module('appModule')
.controller('riderWaitController', function($scope, $location, $http, $cookies, $interval, riderServices){
  $scope.cancel = function(){
    riderServices.cancel().then(function(){
      $cookies.status = 'OK';
      $location.path('/');
    }, function(){
      $scope.err = {
        reason: "The server fubar'd, please try again"
      }
    });
  };
});
angular.module('appModule')
.controller('riderWhereController', function($scope, $http, $location, detectDeviceServices, riderServices, geocodeServices){
  navigator.geolocation.getCurrentPosition(function(position){
    $scope.riderLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $scope.myMap.setCenter(new google.maps.LatLng($scope.riderLocation.lat, $scope.riderLocation.lng));
    google.maps.event.addListener($scope.myMap, 'idle', function() {
      geocodeServices.getAddress({ 
        lat: $scope.myMap.getCenter().lat(),
        lng: $scope.myMap.getCenter().lng()
      }).then(function(address){
        $scope.carLocation = address;
      }, function(err){
        $scope.err = {
          reason: err
        };
      });
    });
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

angular.module('appModule')
.directive("ngTap", function() {
  return function($scope, $element, $attributes) {
    var tapped;
    tapped = false;
    $element.bind("click", function() {
      if (!tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
    $element.bind("touchstart", function(event) {
      return tapped = true;
    });
    $element.bind("touchmove", function(event) {
      tapped = false;
      return event.stopImmediatePropagation();
    });
    return $element.bind("touchend", function() {
      if (tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
  };
});
angular.module('appModule')
.directive("slideDown", function() {
  return {
    restrict: "A",
    scope: true,
    link: function($scope, element, attributes){
      var expression = attributes.slideDown;
      if (!$scope.$eval(expression)) {
        $(element).hide();
      }
      element.bind('click', function(){
        delete $scope.err;
        $(element).slideUp('fast');
      });
      $scope.$watch(expression, function(newValue, oldValue){
        if(newValue){
          $(element).slideDown('fast');
        }
      });
    }
  };
})

angular.module('appModule')
.factory('detectDeviceServices', function(){
  return {
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
      return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    }
  };
});
angular.module('appModule')
.factory('geocodeServices', function($q, $http){
  return {
    getCoords: function(address){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          address: address,
          sensor: true
        }
      }).success(function(data){
        if(data.results.length){
          deferred.resolve(data.results[0].geometry.location);
        } else {
          if(data.error_message){
            deferred.reject(data.error_message);
          } else {
            deferred.reject("We don't recognize that location!");
          }
        }
      }).error(function(err){
        deferred.reject("google maps API is messing up :(");
      })
      return deferred.promise;
    },
    getAddress: function(coord){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          latlng: coord.lat+','+coord.lng,
          sensor: true
        }
      }).success(function(data){
        if(data.results.length){
          deferred.resolve(data.results[0].formatted_address);
        } else {
          deferred.reject("bad location");
        }
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
});
angular.module('appModule')
.factory('parkerServices', function($q, $http, userServices){
  return {
    pickRider: function(rider){
      this.rider = rider;
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'parker/pickuprider',
        data: {
          rider: rider
        }
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    getRider: function() {
      var _rider = this.rider;
      var deferred = $q.defer();
      userServices.get(_rider.uid).then(function(rider){
        deferred.resolve(angular.extend(_rider, rider));
      }, function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    },
    getRiderList: function(location) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'parker/find',
        params: {
          lat: location.lat,
          lng: location.lng
        }
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  };
});
angular.module('appModule')
.factory('riderServices', function($q, $http, $cookies, userServices){
  return {
    create: function(riderLocation, carLocation){
      var deferred = $q.defer();
      $http({
        method: "POST",
        url: "/rider",
        data: {
          riderLocation: riderLocation,
          carLocation: carLocation
        }
      }).success(function(){
        deferred.resolve();
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    cancel: function(){
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: '/rider',
      }).success(function(data){
        $cookies.status = 'OK';
        deferred.resolve(data);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    setParker: function(parker){
      this.parker = parker;
    },
    getParker: function(uid){
      return userServices.get(uid);
    },
    callParker: function(){
      var hrefLocation = 'tel:' + this.parker.phone;
      location.href = hrefLocation;
    }
  }
})
angular.module('appModule')
.factory('userServices', function($http, $q){
  return {
    get: function(uid){
      var deferred = $q.defer(uid);
      $http({
        method: 'GET',
        url: 'users/' + uid
      }).success(function(user){
        deferred.resolve(user);
      }).error(function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    }
  }
})