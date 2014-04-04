var app = angular.module('app');

app.controller('ContextOptionsController', function($scope, $modal){
  var presentationContext = {};
  var newContext = {};

  $scope.isPanelOpen = false;
  $scope.context = newContext;

  assignDataSet();

  $scope.openPanelButtonHandler = function(){
    $scope.isPanelOpen = !$scope.isPanelOpen;
  }

  $scope.saveContextButtonHandler = function(){
    var modalInstance = $modal.open({
      templateUrl: 'app/visualization/new_context_modal.html',
      controller: 'NewContextModalController',
      resolve: {
        context: function(){
          return newContext;
        }
      }
    })
  }

  $scope.$on('dataset', assignDataSet);

  $scope.pointsDrawn = 0;
  $scope.$on('layer:drawn', function(ev, boundingBox, pointsDrawn){
    newContext.boundingBox = getBoundsObject(boundingBox);
    newContext.pointsDrawn = pointsDrawn;
  });

  $scope.$on('slice_control:drawn', function(ev, sliceBounds){
    newContext.sliceBounds = getBoundsObject(sliceBounds);
    $scope.$apply();
  });

  $scope.$on('slice_control:removed', function(){
    delete newContext.sliceBounds;
    $scope.$apply();
  });

  $scope.$on('map:zoomChanged', function(ev, zoomLevel){
    newContext.zoomLevel = zoomLevel;
  })


  window.context = newContext;

  function assignDataSet(){
    newContext.datasetId = $scope.dataset._id.$oid;
    newContext.datasetName = $scope.dataset.name;
  }

  function getBoundsObject(latlnBounds){
    var bl_latlng = latlnBounds.getSouthWest();
    var tr_latlng = latlnBounds.getNorthEast();
    return  {
      bottomLeft: {
        latitude: bl_latlng.lat,
        longitude: bl_latlng.lng
      },
      topRight: {
        latitude: tr_latlng.lat,
        longitude: tr_latlng.lng
      }
    }
  }


});