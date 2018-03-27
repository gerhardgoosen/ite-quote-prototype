'use strict';

angular.module('quoteApp').controller('LoginCtrl', ['$scope', '$state', 'LoginService',
    function ($scope, $state, LoginService) {
        $scope.title = "Login";

        $scope.formSubmit = function () {
            if (LoginService.login($scope.username, $scope.password, $scope)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';

                $state.transitionTo('quotes');
            }
        };

    }]);