var app = angular.module('app');

app.directive('map', function($rootScope, $timeout){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    template: '<div><div ng-transclude></div><div id="map" class="map l-full-height"></div></div>',
    controller: function($scope){
      var map = L.map('map', {center: [51.505, -0.09],zoom: 13});
      this.map = map;

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      $scope.$emit('map:create');

      map.on('zoomend', function(e){
        $timeout(function(){
          $rootScope.$broadcast('map:zoomChanged', map.getZoom());
        },0);
      })
    }
  }
});