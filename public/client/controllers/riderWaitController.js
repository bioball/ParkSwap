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