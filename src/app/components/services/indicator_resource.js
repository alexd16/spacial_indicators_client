var app = angular.module('app');

app.factory('IndicatorResource', function(Restangular){
  return Restangular.all('indicators');
});