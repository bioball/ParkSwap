angular.module('appModule')
.controller('riderWaitController', function($scope, $location, riderServices){
  $scope.cancel = function(){
    riderServices.cancel().then(function(){
      $location.path('/goodbye');
    }, function(){
      $location.path('/goodbye');
    });
  }
});