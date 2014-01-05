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