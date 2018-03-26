//'use strict';

//app.login = angular.module('quoteApp.login', ['ngRoute']);

// .config(['$routeProvider', function ($routeProvider) {
//     $routeProvider.when('/login', {
//         templateUrl: 'login/login.html',
//         controller: 'LoginCtrl'
//     });
// }])

app.controller('PasswordCtrl', ['$scope', '$state', '$http', '$window', 'LoginService',
    function ($scope, $state, $http, $window, LoginService) {
        $scope.title = "Set Password";

        $scope.formSubmit = function () {


            if ($scope.password != $scope.confirmPassword) {
                $scope.error = "Passwords don't match!";
                return;
            }


            if (LoginService.setPassword(  $scope.password, $scope)) {
                $scope.error = '';
                $scope.password = '';
                $scope.username = '';
                $state.transitionTo('quotes');
            } else {
                $scope.error = "Set Password Error!";
            }
        };

    }]);