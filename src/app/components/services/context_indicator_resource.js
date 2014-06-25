var app = angular.module('app');

app.factory('ContextIndicatorResource', function(Restangular){
  return Restangular.all('context_indicators');
});