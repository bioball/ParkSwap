angular.module('AppModule')
.factory('parkerServices', function(){
  return {
    setRider: function(rider){
      this.rider = rider;
    },
    getRider: function() {
      return this.rider;
    }
    // callRider: function() {
    //   fn() { call this.rider.number };
    // }
  }
});