var app = angular.module('app');

app.directive('sliceControl', function($rootScope){
  return {
    require: '^map',
    restrict: 'EA',
    template: '<span></span>',
    link: function(scope, element, attrs, mapCtrl){
      var map, drawnItems, sliceControl, sliceLayer;

      map = mapCtrl.map;
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
        sliceCreated();
      });

      map.on('draw:deletestart', function(e){
        drawnItems.removeLayer(sliceLayer);
        sliceDestroyed();
      });

      function sliceDestroyed(){
        $rootScope.$broadcast('slice_control:removed');
      }

      function sliceCreated(){
        $rootScope.$broadcast('slice_control:drawn', sliceLayer.getBounds());
      }
    }
  }
});
