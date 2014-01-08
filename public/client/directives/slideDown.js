angular.module('appModule')
.directive("slideDown", function() {
  return {
    restrict: "A",
    scope: true,
    link: function($scope, element, attributes){
      var expression = attributes.slideDown;
      if (!$scope.$eval(expression)) {
        $(element).hide();
      }
      element.bind('click', function(){
        delete $scope.err;
        $(element).slideUp('fast');
      });
      $scope.$watch(expression, function(newValue, oldValue){
        if(newValue){
          $(element).slideDown('fast');
        }
      });
    }
  };
})
