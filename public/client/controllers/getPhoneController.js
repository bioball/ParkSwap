angular.module('appModule')
.controller('getPhoneController', function($scope, $http, $location, $cookieStore){

  $scope.sendPhoneNumToServer = function() {
    $http({
      method: "POST",
      url: "/signup",
      data: {
        uid: $cookieStore.get('uid'),
        phone: $scope.userPhoneNum
      }
    }).success(function() {
      $cookieStore.remove('uid');
      $location.path('/');
    }).error(function(err) {
      console.log('failed to post to server');
      $scope.err = { 
        reason: err
      }
    })
  }
});