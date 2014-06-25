var app = angular.module('app');

app.factory('ContextResource', function(Restangular){
  Restangular.extendModel('contexts', function(context){
    if(context.addRestangularMethod !== undefined){
      context.addRestangularMethod('getData', 'get', 'data');
      context.addRestangularMethod('saveNotes', 'put', 'notes');
    }
    return context;
  });
  return Restangular.all('contexts');
});