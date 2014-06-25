
(function(window){

  var app = angular.module('app');


  app.directive('layer', function($timeout){
    return {
      restrict: 'EA',
      require: '^map',
      scope: {
        type: '=',
        data: '=',
        config: '=',
        bounds: '=', 
        pointsDrawn: '='
      },
      link: function(scope, element, attrs, mapCtrl){
        $timeout(function(){
          var layer;
          var map = mapCtrl.getMap();

          scope.$watch('data', function(){
            if(scope.data !== undefined){
              layer = new layers[scope.type](scope, mapCtrl);
              layer.fitBounds();
            }
          });
        },100);
      }
    }
  });



  var layers = {
    'dot-layer': DotLayer
  }

  function DotLayer(scope, mapCtrl){
    var self = this;
    this.scope = scope;
    this.map = mapCtrl.getMap();
    this.mapCtrl = mapCtrl;
    this.bounds = scope.bounds;
    this.slice = mapCtrl.getSlice();
    var init = true;

    this.currentLayer = null;
    this.draw(scope.data, scope.config);
    

    mapCtrl.watchSlice(function(){
      console.log('slice');
      if(init){
        init = false;
        return;
      }
      if(self.currentLayer !== null){
        if(self.map.hasLayer(self.currentLayer)){
          self.map.removeLayer(self.currentLayer);
          self.draw(scope.data, scope.config);
        }
      }
    });
  }

  DotLayer.prototype = {
    draw: function(points, config){
      var slice;
      var self = this;
      var map = this.map;
      var dotSize = config.dotSize;
      var bounds = new L.latLngBounds([]);
      var pointsDrawn = 0;
      if(this.slice !== null && Object.keys(this.slice).length !== 0 ){
        slice = this.mapCtrl.getLatlngBounds(this.slice);
      }else{
        slice = null;
      }
      this.currentLayer = new L.TileLayer.Canvas();
      var currentLayer = this.currentLayer;
      currentLayer.drawTile = function(canvas, tile, zoom){
        var context = canvas.getContext('2d');
        var tileSize = currentLayer.options.tileSize;
        pointsDrawn = 0;
        _.each(points, function(point){
          var gpsCoords, start, x, y;
          start = tile.multiplyBy(tileSize);
          gpsCoords = new L.LatLng(point.latitude, point.longitude);
          if(slice !== null && !slice.contains(gpsCoords)) { return true; }
          bounds.extend(gpsCoords);
          point = map.project(gpsCoords);
          x = point.x - start.x;
          y = point.y - start.y;
          //if(x > 256 || y > 256 || x < 0 || y < 0) { return true;}
          if(dotSize == 0){
            drawDot(x,y,context);
          }else{
            drawCircle(x,y,dotSize,context);
          }
          bounds.extend(gpsCoords);
          pointsDrawn++;
        });
      }
      map.addLayer(this.currentLayer);
      this.bounds = bounds;
      this.updateBounds(bounds);
      self.scope.pointsDrawn = pointsDrawn;  
    },
    updateBounds: function(latlngBounds){
      var bounds = this.mapCtrl.getBoundsObject(latlngBounds);
      this.scope.bounds.bottomLeft = bounds.bottomLeft;
      this.scope.bounds.topRight = bounds.topRight;
    },
    fitBounds: function(){
      this.map.fitBounds(this.bounds);
    }
  }

  function drawDot(x, y, context){
    var image = context.createImageData(1, 1);
    var d = image.data;
    d[0] = 255;
    d[1] = 0;
    d[2] = 0;
    d[3] = 255;  
    context.putImageData(image, x, y);
  }

  function drawCircle(x, y, size, context){
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2, false);
    context.fillStyle = "#D63039";
    context.closePath();
    context.fill();
  }

})(this)