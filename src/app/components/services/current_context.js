
var app = angular.module('app');

app.factory('Context', function(mapDefault){
  function Context(){
    this.name = '';
    this.tags = [];
    this.boundingBox = {};
    this.sliceBounds = {};
    this.context_indicators = [];
    this.zoomLevel = mapDefault.zoom;
    this.pointsDrawn = 0;
  }

  return Context;
});
  