angular.module('appModule')
.controller('riderWaitController', function($scope, $location, riderServices){
  $scope.cancel = function(){
    riderServices.cancel();
    $location.path('/');
  }
});