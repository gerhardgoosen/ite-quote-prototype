'use strict';

angular.module('quoteApp').controller('InfoCtrl', ['$scope', '$state', 'LoginService', function ($scope, $state, LoginService) {
    $scope.title = "Information";

    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
    }

    $scope.init();

}]);
