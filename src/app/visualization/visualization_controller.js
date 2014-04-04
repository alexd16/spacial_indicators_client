var app = angular.module('app');

app.controller('VisualizationController',function($scope, dataset){

  $scope.dataset = dataset;

  $scope.visualization = {};
  
  dataset.getData().then(function(data){
    console.log(data);
    $scope.visualization.points = data;
    $scope.visualization.dotSize = 0; 
    $scope.dataset.numberOfObjects = data.length 
  })
});