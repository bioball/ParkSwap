angular.module('appModule')
.controller('goodbyeController', function($scope, $location){
  $scope.home = function(){
    $location.path('/');
  }
});