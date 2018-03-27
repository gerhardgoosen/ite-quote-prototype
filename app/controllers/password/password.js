'use strict';

angular.module('quoteApp').controller('PasswordCtrl', ['$scope', '$state', 'LoginService',
    function ($scope, $state, LoginService) {
        $scope.title = "Set Password";

        $scope.formSubmit = function () {


            if ($scope.password != $scope.confirmPassword) {
                $scope.error = "Passwords don't match!";
                return;
            }


            if (LoginService.setPassword($scope.password, $scope)) {
                $scope.error = '';
                $scope.password = '';
                $scope.username = '';

                $state.transitionTo('quotes');
            }
        };

    }]);