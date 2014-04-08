
var app =angular.module('app');

app.controller('NewCompareModalController', function($scope, $state, $modalInstance, contextIds, IndicatorResource){
  var compareOptions = {
    ids: contextIds
  };

  $scope.compareOptions = compareOptions;

  $scope.indicators = [];
  IndicatorResource.getList().then(function(_indicators){
    $scope.indicators = _indicators;
    var index = 0;
    _.each($scope.indicators, function(_indicator){
      _indicator.index = index++;
    })
    $scope.compareOptions.selectedIndicator = 0;
  });



  $scope.submitCompareFormHandler = function(compareOptions){
    $modalInstance.close();
    //$modalInstance.close(compareOptions);
    $state.go('compare', {ids: JSON.stringify(compareOptions.ids), selectedIndicator: compareOptions.selectedIndicator});
  }



});