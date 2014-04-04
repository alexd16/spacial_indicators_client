var app = angular.module('app');

app.controller('ContextListController', function($scope, ContextResource){

  ContextResource.getList().then(function(_contexts){
    $scope.contexts = _contexts;
  })
})