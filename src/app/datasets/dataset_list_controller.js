var app = angular.module('app');

app.controller('DatasetListController', function($scope, $modal, DatasetResource){
    
    DatasetResource.getList().then(function(datasets){
      $scope.datasets = datasets;
    });

    $scope.createDatasetButtonHandler = function(){
      var modal = $modal.open({
        templateUrl: 'app/datasets/dataset_create_modal.html',
        controller: 'DatasetCreateModalController'
      });
    }
})