var app = angular.module('app');

app.factory('ContextResource', function(Restangular){
  return Restangular.all('contexts');
});