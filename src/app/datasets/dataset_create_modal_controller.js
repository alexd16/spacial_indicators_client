var app = angular.module('app');

app.controller('DatasetCreateModalController', function($scope, $upload, $modalInstance){

  var file = null;
  $scope.newDataset = {};

  $scope.createDatasetFormSubmitHandler = function(dataset){
    if(file === null){ return ;}

    var upload = $upload.upload({
      url: 'api/datasets',
      data: dataset, 
      file: file
    });
    upload.success(function(){
      console.log('Dataset Created');
      $modalInstance.close();
    })
  }

  $scope.onDatasetFileSelectHandler = function(files){
    if(files.length > 0) {
      file = files[0];
    }
  }

});