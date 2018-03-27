'use strict';

angular.module('quoteApp').controller('QuotesCtrl', ['$rootScope','$scope', '$state', '$http', '$window', 'LoginService', function ($rootScope,$scope, $state, $http, $window, LoginService) {
    $scope.title = "Quotes";
    $scope.quotes = [];

    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
        else {
            $http.get($rootScope.config.api_url + '/quotes', $rootScope.config.httpOptions)
                .then(function (response) {

                    $scope.quotes = response.data;
                    console.log('response.data : ' + JSON.stringify($scope.quotes));


                })
                .catch(function (error) {
                    console.log(error);
                    scope.error = error;

                });
        }
    }

    $scope.init();
}]);