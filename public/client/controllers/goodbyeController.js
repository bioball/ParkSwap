angular.module('appModule')
.controller('goodbyeController', function($scope, $cookies, $location){
  $scope.home = function(){
    $cookies.status = 'OK';
    $location.path('/');
  };
});