var app = angular.module('app');

app.controller('ContextListController', function($scope, $modal, $state, ContextResource, selectedDataset, $q){
  selectedDataset.name = '';
  selectedDataset.id = 0;
  $scope.compareList = [];

  ContextResource.getList().then(function(_contexts){
    $scope.contexts = _contexts;
  })

  $scope.changeCompareCheckHandler = function(contextIds){
    if(contextIds.length < 2 || contextIds.length > 3){
      alert('Select more than 2 or 3 contexts to compare');
      return;
    }
    $state.go('compare', {ids: contextIds});
  }

  $scope.compareButtonHandler = function(contextIds){
    if(contextIds.length < 2 || contextIds.length > 3){
      alert('Select 2 or 3 contexts to compare');
      return;
    }
    var modalInstance = $modal.open({
      templateUrl: 'app/visualization/compare/new_compare_modal.html',
      controller: 'NewCompareModalController',
      windowClass: 'wide-modal',
      resolve: {
        contexts: function(){
          //return contextIds;
          return $q.all(_.map(contextIds, function(context){
            return ContextResource.get(context._id.$oid)
          }));
        }
      }
    });
  }
})