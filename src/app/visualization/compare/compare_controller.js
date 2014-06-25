
var app = angular.module('app');

app.controller('CompareController', function($scope, mapDefault, contexts, indicatorIndexes){
  var layerOptions = {
    type: 'dot-layer', 
    config: {
      dotSize: 0
    }
  }

  $scope.indicatorIndexes = indicatorIndexes;
  $scope.contexts = contexts;
  $scope.maps = [angular.copy(mapDefault), angular.copy(mapDefault), angular.copy(mapDefault)];
  $scope.layers = [angular.copy(layerOptions), angular.copy(layerOptions), angular.copy(layerOptions)];

  _.each(contexts, function(context){
    context.getData().then(function(data){
      context.data = data;
    });
  }); 
});