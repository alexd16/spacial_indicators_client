var app = angular.module('app');

app.directive('indicator', function(){
  var uniqueId = 1;
  return {
    restrict: 'EA',
    templateUrl: 'app/components/directives/indicator/indicator.html', 
    scope: {
      name: '=',
      type: '=',
      result: '=',
      height: '@'
    },
    link: function(scope, element, attrs){
      if(scope.height === undefined){
        scope.height = 400;
      }
      
      scope.yFunction = function(){
       return function(d){
        return d.y;
        };
      }

      scope.id = 'indicator'+uniqueId++;
      if(scope.type == 'single_value'){
        //scope.data = [{key: scope.name, values: scope.result.result}]
      }else if(scope.type == 'value_collection'){
        scope.data = [{key: scope.name, values: scope.result.result}]
      }else if(scope.type == 'pair_collection'){
        scope.data = [{key: scope.name, values: scope.result.result}]
      }


    }
  }
});