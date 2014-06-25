var app = angular.module('app');

app.controller('NewContextModalController',function($scope, context, selectedDataset, $modalInstance, IndicatorResource, ContextResource){
  var newContext = angular.copy(context);

  var now = new Date();
  newContext.name = selectedDataset.name+' '+ now.toLocaleDateString('en-US')+' '+now.toLocaleTimeString("en-US")
  newContext.tags = [];

  IndicatorResource.getList().then(function(indicators){
    $scope.indicators = indicators;
    $scope.contextIndicators = _.map(indicators, initIndicator);

    newContext.context_indicators_attributes = $scope.contextIndicators;
  })

  $scope.newContextFormSubmitHandler = function(_context){
    console.log(_context);
    ContextResource.post({context: _context}).then(function(){
      $modalInstance.close();
    });
  }

  $scope.addContextIndicator = function(indicator){
    var contextIndicator = initIndicator(indicator);
    newContext.context_indicators.push(contextIndicator);
  }

  function initIndicator(indicator){
    var contextIndicator = {name: indicator.name, indicator_id: indicator._id.$oid, compute: true}
    contextIndicator.config = {};
    _.each(indicator.params, function(param){
      contextIndicator.config[param.name] = angular.copy(param.default);
    });
    return contextIndicator;
  }


  $scope.newContext = newContext;
});