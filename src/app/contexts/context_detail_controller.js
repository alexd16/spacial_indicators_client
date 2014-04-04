var app = angular.module('app');

app.controller('ContextDetailController', function($scope, context, DatasetResource){



  $scope.selectedContext = context;
  $scope.map = {}


  DatasetResource.get(context.dataset_id.$oid)
    .then(function(dataset){
      $scope.dataset = dataset;
      return dataset.getData();
    })
    .then(function(data){
      $scope.dataset.size = data.length;
      $scope.map.points = data;
      $scope.map.dotSize = 0;
      console.log(data);
    });

});