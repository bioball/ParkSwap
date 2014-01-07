angular.module('appModule')
.directive("slideDown", function() {
  return {
    restrict: "A",
    link: function($scope, element, attributes){
      var expression = attributes.slideDown;
      if (!$scope.$eval(expression)) {
        $(element).hide();
      }
      $scope.$watch(expression, function(newValue, oldValue){
        if(newValue){
          $(element).slideDown('fast');
        }
      });
    }
  };
})
