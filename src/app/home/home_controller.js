var app = angular.module('app');

app.controller('HomeController',function($scope, currentContext, mapDefault, $timeout){
  $scope.message = 'Hello World';

  $scope.map = mapDefault;
  $scope.context = currentContext;

  $scope.layer= {
    type: 'dot-layer',
    pointsDrawn: 0,
    config: {
      dotSize: 3
    },
    boundingBox: {},
    sliceBounds: {}
  } 

  $timeout(function(){
    $scope.layer.data = [
      {latitude: 40.123, longitude: -9.23231},
      {latitude: 39.123, longitude: -8.83231},
      {latitude: 39.823, longitude: -8.53231},
      {latitude: 40.823, longitude: -10.53231},
    ] 
  },2000);

  console.log('here');
});