var app = angular.module('app');

app.directive('dotLayer', function($rootScope){
  return {
    require: '^map',
    restrict: 'EA',
    template: '<span></span>',
    scope: {
      points: '=',
      dotSize: '='
    },
    link: function(scope, element, attrs, mapCtrl){
      var map, points, currentBounds, sliceBounds, currentLayer, pointsDrawn;

      map = mapCtrl.map;
      currentBounds = null;
      currentLayer = null;
      sliceBounds = null;
      pointsDrawn = 0;

      scope.$watch('points', function(){
        if( scope.points === undefined || scope.dotSize === undefined) return;
        drawLayer(scope.points, scope.dotSize);
        map.fitBounds(currentBounds);
      });

      scope.$on('slice_control:drawn', function(ev, _sliceBounds){
        sliceBounds = _sliceBounds;
        drawLayer(scope.points, scope.dotSize);
      });

      scope.$on('slice_control:removed', function(ev){
        sliceBounds = null;
        drawLayer(scope.points, scope.dotSize);
      });

      function drawLayer(points, dotSize){
        currentBounds = L.latLngBounds([]);
        if(currentLayer !== null){
          map.removeLayer(currentLayer);
        }
        currentLayer = new L.TileLayer.Canvas();
        currentLayer.drawTile = function(canvas, tile, zoom) {
          var context, tileSize;
          tileSize = currentLayer.options.tileSize;
          context = canvas.getContext('2d');
          image = context.createImageData(1, 1);
          pointsDrawn = 0;
          _.each(points, function(point){
            var gpsCoords, start, x, y;
            start = tile.multiplyBy(tileSize);
            gpsCoords = new L.LatLng(point.latitude, point.longitude);
            point = map.project(gpsCoords);
            x = point.x - start.x;
            y = point.y - start.y;
            if(sliceBounds === null || sliceBounds.contains(gpsCoords)){
              drawPoint(context, {x: x, y: y}, dotSize, false);  
              currentBounds.extend(gpsCoords);
              pointsDrawn++;
            }else{
              drawPoint(context, {x: x, y: y}, dotSize, true);  
            }
          });
        }
        map.addLayer(currentLayer);
        finishDraw();
      }

      function finishDraw(){
        map.invalidateSize(); 
        $rootScope.$broadcast('layer:drawn', currentBounds, pointsDrawn);
      }

      function drawPoint(context, point, dotSize, withTransparancy){
        if(dotSize === 0){
          drawDot(context, point, withTransparancy);
        }
        else{
          drawCircle(context, point, dotSize, withTransparancy);
        }
      }

      var image;
      function drawDot(context, point, withTransparancy) {
        var d = image.data;
        d[0] = 255;
        d[1] = 0;
        d[2] = 0;
        if(withTransparancy){
          d[3] = 40;
        }else{
          d[3] = 255;  
        }
        
        context.putImageData(image, point.x, point.y);
      };

      function drawCircle(context, point, dotSize, withTransparancy) {
        context.beginPath();
        context.arc(point.x, point.y, dotSize, 0, Math.PI * 2, false);
        context.fillStyle = "#D63039";
        context.closePath();
        context.fill();
      };
    }
  }
});