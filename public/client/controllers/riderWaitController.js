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

  // var repeatFn = function() {
    $http({
      method: 'GET',
      url: 'rider/checkparker'
    }).success(function(data){
    	console.log(data);
      // if (data.parker[uid]) {
      //   $location.path('rider/coming');
      // }
    });
  // }

  $scope.pingServer = function() {
    $interval(repeatFn, 2000);
  };
});