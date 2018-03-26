/*
'use strict';

angular.module('quoteApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', [function() {

}]);*/



app.controller('UsersCtrl', ['$scope', '$state', '$http', '$window', function ($scope, $state, $http, $window) {
    $scope.title = "Users";
}]);