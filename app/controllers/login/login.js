//'use strict';

//app.login = angular.module('quoteApp.login', ['ngRoute']);

// .config(['$routeProvider', function ($routeProvider) {
//     $routeProvider.when('/login', {
//         templateUrl: 'login/login.html',
//         controller: 'LoginCtrl'
//     });
// }])

app.controller('LoginCtrl', ['$scope', '$state', '$http', '$window', 'LoginService',
    function ($scope, $state, $http, $window, LoginService) {
        $scope.title = "Login";

        $scope.formSubmit = function () {
            if (LoginService.login($scope.username, $scope.password, $scope)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('quotes');
            } else {
                $scope.error = "Login Error!";
            }
        };

    }]);