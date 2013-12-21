angular.module('appModule')
.controller('getPhoneController', function($cookieStore){
  console.log($cookieStore.get('uid'));
})