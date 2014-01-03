angular.module('appModule')
.controller('goodbyeController', function($scope, $cookies, $location){
  $scope.cancel = function(){
    $cookies.status = 'OK';
    $location.path('/');
  };
});