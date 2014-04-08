var app = angular.module('app');

app.directive('map', function($rootScope, $timeout){
  var uniqueId = 1;
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      center: '=',
      zoom: '=', 
      slice: '='
    },
    template: '<div><div ng-transclude></div><div id="map{{id}}" class="map l-full-height l-scroll-hidden"></div></div>',
    link: function(scope, element, attrs) {
      scope.id = uniqueId++;
      $timeout(function(){
        var map = L.map('map'+scope.id, {
          center: [scope.center.latitude, scope.center.longitude],
          zoom: scope.zoom
        });

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('zoomend', function(e){
          $timeout(function(){
            scope.zoom = map.getZoom();
          },0)
        });

        scope.map = map;        
      })

    },
    controller: function($scope){

      this.getMap = function(){
        return $scope.map;
      }

      this.getSlice = function(){
        return $scope.slice;
      }

      this.watchSlice = function(cb){
        $scope.$watch('slice', cb, true);
      }

      this.getBoundsObject = function(latlnBounds){
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

      this.getLatlngBounds = function(bounds){
        var southWest, northEast;
        var bl = bounds.bottomLeft;
        var tr = bounds.topRight;
        southWest = L.latLng(bl.latitude, bl.longitude);
        northEast = L.latLng(tr.latitude, tr.longitude);
        return L.latLngBounds(southWest, northEast);
      }
    }
  }
});