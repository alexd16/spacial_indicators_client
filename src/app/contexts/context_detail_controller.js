var app = angular.module('app');

app.controller('ContextDetailController', function($scope, context, mapDefault, DatasetResource){

  $scope.mapOptions = mapDefault;
  $scope.layerOptions = {
    type: 'dot-layer', 
    config: {
      dotSize: 0
    }
  }

  if(context.sliceBounds === undefined){
    context.sliceBounds = {};
  }

  $scope.context = context;
  $scope.currentNotes = context.notes;

  DatasetResource.get(context.dataset_id.$oid)
    .then(function(dataset){
      $scope.dataset = dataset;
      return dataset.getData();
    })
    .then(function(data){
      $scope.data = data;
      $scope.context.numberOfObjects = data.length
      console.log(data);
    });

  $scope.saveNotesButtonHandler = function(context, notes){
    context.saveNotes({notes: notes});
    alert('Context notes saved');
  }


});