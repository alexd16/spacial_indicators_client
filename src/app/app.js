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
      .state('compare', {
        url: '/compare?ids&selectedIndicators',
        templateUrl: 'app/visualization/compare/compare.html',
        controller: 'CompareController',
        resolve: {
          contexts: function($stateParams, ContextResource, $q){
            var contexts = [];
            var ids = arrayFormat('ids', JSON.parse($stateParams.ids));
            return ContextResource.getList({q:  {context_ids: JSON.parse($stateParams.ids)} });

            function arrayFormat(key, array){
              var str = '';
              return key+'[]='+array.join('&'+key+'[]=');
            }
          },
          indicatorIndexes: function($stateParams, ContextIndicatorResource){
            var indexes = JSON.parse($stateParams.selectedIndicators);
            return $q.all(_.map(indexes, function(id){ return ContextIndicatorResource.get(id)}))
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
  .value('mapDefault', {
    center: {
      latitude: 39.7232,
      longitude: -8.23231
    },
    zoom: 7
  })
  .value('selectedDataset', {
    name: '',
    id: 0
  })
  ;

app.controller('AppController', function($scope){
});