var app = angular.module('app');

app.controller('NewContextModalController',function($scope, context, $modalInstance, IndicatorResource, ContextResource){
  var newContext = angular.copy(context);
  newContext.dataset_id = newContext.datasetId;
  delete newContext.datasetId;
  var datasetName = newContext.datasetName
  delete newContext.datasetName


  var now = new Date();
  newContext.name = datasetName+' '+ now.toLocaleDateString('en-US')+' '+now.toLocaleTimeString("en-US")
  newContext.tags = [];

  IndicatorResource.getList().then(function(indicators){
    $scope.indicators = indicators;
    $scope.contextIndicators = _.map(indicators, initIndicator);

    newContext.context_indicators = $scope.contextIndicators;
  })

  $scope.newContextFormSubmitHandler = function(_context){
    console.log(_context);
    ContextResource.post({context: _context}).then(function(){
      $modalInstance.close();
    });
  }

  function initIndicator(indicator){
    var contextIndicator = {name: indicator.name, compute: true}
    contextIndicator.config = {};
    _.each(indicator.params, function(param){
      contextIndicator.config[param.name] = param.default;
    });
    return contextIndicator;
  }


  $scope.newContext = newContext;
});