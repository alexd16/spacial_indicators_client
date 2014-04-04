var app = angular.module('app');

app.factory('DatasetResource', function(Restangular){
  Restangular.extendModel('datasets', function(dataset){
    if(dataset.addRestangularMethod !== undefined){
      dataset.addRestangularMethod('getData', 'get', 'data');
    }
    return dataset;
  });

  return Restangular.all('datasets');
});