/*
'use strict';

angular.module('quoteApp.quotes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quotes', {
    templateUrl: 'quotes/quotes.html',
    controller: 'QuotesCtrl'
  });
}])

.controller('QuotesCtrl', [function() {

}]);*/

app.controller('QuotesCtrl', ['$scope', '$state', '$http', '$window', function ($scope, $state, $http, $window) {
    $scope.title = "Quotes";
}]);