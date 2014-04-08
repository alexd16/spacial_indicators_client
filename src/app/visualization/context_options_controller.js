var app = angular.module('app');

app.controller('ContextOptionsController', function($scope, $modal){

  $scope.isPanelOpen = false;

  $scope.openPanelButtonHandler = function(){
    $scope.isPanelOpen = !$scope.isPanelOpen;
  }

  $scope.saveContextButtonHandler = function(){
    var modalInstance = $modal.open({
      templateUrl: 'app/visualization/new_context_modal.html',
      controller: 'NewContextModalController',
      windowClass: 'wide-modal',
      resolve: {
        context: function(){
          return $scope.context;
        }
      }
    })
  }

});