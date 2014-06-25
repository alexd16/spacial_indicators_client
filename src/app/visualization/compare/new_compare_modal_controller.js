
var app =angular.module('app');

app.controller('NewCompareModalController', function($scope, $state, $modalInstance, contexts, IndicatorResource){
  var compareOptions = {
    ids: _.map(contexts, function(context){ return context._id.$oid}),
    selectedIndicators: _.map(contexts, function(context){ return 0;})
  };

  $scope.compareOptions = compareOptions;

  $scope.contexts = contexts;

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
    $state.go('compare', {ids: JSON.stringify(compareOptions.ids), selectedIndicators: JSON.stringify(compareOptions.selectedIndicators)});
  }



});