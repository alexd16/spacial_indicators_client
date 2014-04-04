//alert('App');

var app = angular.module('app',  [
  'ui.router', 
  'restangular', 
  'ui.bootstrap', 
  'nvd3ChartDirectives',
  'angularFileUpload',
  'chieffancypants.loadingBar',
  'ngTagsInput',
  'checklist-model'
]);


app
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      })
      .state('visualization', {
        url: '/visualization/:id',
        templateUrl: 'app/visualization/visualization.html',
        controller: 'VisualizationController',
        resolve: {
          dataset: function($stateParams, DatasetResource){
            datasetID = $stateParams.id;
            return DatasetResource.get(datasetID)
          }
        }
      })
      .state('contexts', {
        url: '/contexts',
        templateUrl: 'app/contexts/context_list.html',
        controller: 'ContextListController'
      })
      .state('contexts.context', {
        url: '/:id',
        templateUrl: 'app/contexts/context_detail.html',
        controller: 'ContextDetailController',
        resolve: {
          context: function($stateParams, ContextResource){
            context_id = $stateParams.id
            return ContextResource.get(context_id);
          }
        }
      })
  })
  .config(function(RestangularProvider){
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: "_id.$oid"
    });
  })

app.controller('AppController', function($scope){
  
});