/*
'use strict';

angular.module('quoteApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', [function() {

}]);*/


app.controller('RegisterCtrl', ['$scope', '$state', '$http', '$window', function ($scope, $state, $http, $window) {
    $scope.title = "Register";
}]);