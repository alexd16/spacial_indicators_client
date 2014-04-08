var app = angular.module('app');

app.directive('sliceControl', function($rootScope, $timeout){
  return {
    require: '^map',
    restrict: 'EA',
    template: '<span></span>',
    link: function(scope, element, attrs, mapCtrl){
      var map, drawnItems, sliceControl, sliceLayer, slice;
      $timeout(function(){
        map = mapCtrl.getMap();
        slice = mapCtrl.getSlice();
        drawnItems = new L.FeatureGroup();

        sliceControl = new L.Control.Draw({
          edit: {
            featureGroup: drawnItems,
            edit: false
          },
          draw:{
            polyline: false,
            polygon: false,
            circle: false,
            marker: false,
            rectangle: {
              shapeOptions: {
                clickable: true,
                fill: false,
                color: 'black'
              }
            }
          }
        });
        map.addControl(sliceControl);
        map.addLayer(drawnItems);

        map.on('draw:created', function(e){
          if(sliceLayer){
            map.removeLayer(sliceLayer);
          }
          sliceLayer = e.layer;
          drawnItems.addLayer(sliceLayer);
          var sliceBounds = mapCtrl.getBoundsObject(sliceLayer.getBounds());
          scope.$apply(function(){
            slice.bottomLeft = sliceBounds.bottomLeft;
            slice.topRight = sliceBounds.topRight;
          });
        });

        map.on('draw:deletestart', function(e){
          drawnItems.removeLayer(sliceLayer);
          scope.$apply(function(){
            delete slice.bottomLeft;
            delete slice.topRight;          
          })
        });        
      },50);
    }
  }
});
