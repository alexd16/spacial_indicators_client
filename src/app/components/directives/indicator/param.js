var app = angular.module('app');

app.directive('param', function(){
  var uniqueId = 1;
  return {
    restrict: 'EA',
    scope: {
      param: '=',
      model: '='
    },
    templateUrl: 'app/components/directives/indicator/param.html',
    link: function(scope, element, attrs){
      scope.id = 'param'+uniqueId++;
    }
  }
});