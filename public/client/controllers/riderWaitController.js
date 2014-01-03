angular.module('appModule')
.controller('riderWaitController', function($scope, $location, $cookies, riderServices){
  $scope.cancel = function(){
    riderServices.cancel().then(function(){
      $cookies.status = 'OK';
      $location.path('/goodbye');
    }, function(){
    });
  }
});