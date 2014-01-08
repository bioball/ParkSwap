angular.module('appModule')
.controller('riderComingController', function($scope, $http, $location, $routeParams, riderServices){
  riderServices.getParker($routeParams.uid).then(function(parker){
    riderServices.setParker(parker)
    $scope.parker = parker;
    $http({
      method: 'GET',
      url: 'http://graph.facebook.com/' + parker.uid + '/picture?width=480&redirect=0&type=normal&height=300'
    }).success(function(data){
      $scope.profileUrl = data.data.url;
    });
  });

  $scope.callParker = function(){
    riderServices.callParker();
  };

  $scope.home = function(){
    $location.path('/');
  };

});