angular.module('appModule')

.config(function($httpProvider){
  $httpProvider.interceptors.push(function($location){
    return {
      response: function(response){
        $location.path('login');
        switch(response.status){
          case 401:
            $location.path('/login');
            break;
          case 412:
            $location.path('/getphonenumber');
            break;
          default:
            //do nothing
        }
      }
    }
  })
});