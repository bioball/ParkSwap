angular.module('appModule')
.run(function($rootScope, $cookies, $location, $interval){
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
});