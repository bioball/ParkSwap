angular.module('appModule')
.controller('riderComingController', function($scope, riderServices){
  riderServices.setParker();
  $scope.callParker = function(){
    riderServices.callParker();
  }
});