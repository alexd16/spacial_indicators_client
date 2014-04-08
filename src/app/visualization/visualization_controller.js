var app = angular.module('app');

app.controller('VisualizationController',function($scope, dataset, Context, selectedDataset, mapDefault){

  currentContext = new Context();

  selectedDataset.name = dataset.name
  selectedDataset.id = dataset._id.$oid;

  currentContext.dataset_id = selectedDataset.id;

  $scope.dataset = selectedDataset;
  $scope.context = currentContext;

  $scope.visualization = {};

  $scope.mapOptions = mapDefault;
  $scope.layerOptions = {
    type: 'dot-layer', 
    config: {
      dotSize: 0
    }
  }
  
  dataset.getData().then(function(data){
    $scope.data = data;
    $scope.context.numberOfObjects = data.length 
  })
});