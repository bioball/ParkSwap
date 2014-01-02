angular.module('appModule')
.controller('riderComingController', function($scope, $routeParams, riderServices){
  riderServices.getParker($routeParams.uid).then(function(parker){
    riderServices.setParker(parker)
    $scope.parker = parker;
  });

  $scope.callParker = function(){
    riderServices.callParker();
  };
});