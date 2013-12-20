angular.module('appModule')
.factory('riderServices', function($q, $http){
  return {
    cancel: function(){
      var 
      $http({
        method: 'POST',
        url: 'riders/cancel',
        data: {
          rider: "this rider";
        }
      })
    },
    setParker: function(parker){
      this.parker = parker;
    },
    getParker: function(){
      return this.parker;
    }
  }
})