'use strict';

angular.module('quoteApp').controller('AddQuoteCtrl', ['$rootScope', '$scope', '$state', '$http', '$window', 'LoginService', function ($rootScope, $scope, $state, $http, $window, LoginService) {
    $scope.title = "Add New Quote";


    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
        else {
            $rootScope.tmpQuote = {};
        }
    };

    $scope.cancel = function () {
        console.log('cancel');
        history.back();//eish
    };

    $scope.clear = function () {
        $rootScope.tmpQuote = {};
    };

    $scope.formSubmit = function () {
        console.log('tmpQuote : ' + $rootScope.tmpQuote);

        $http.post($rootScope.config.api_url + '/quote', $rootScope.tmpQuote, $rootScope.config.httpOptions)
            .then(function (response) {

                $scope.error = response.data.error;
                console.log(response.data);
                if (response.data.code === 200) {
                    console.log('ok');
                    $scope.message = "success";
                    $rootScope.tmpQuote = {};
                    $state.transitionTo('quotes');
                } else {
                    $scope.message = "error saving quote";
                }
            })
            .catch(function (error) {
                console.log('err:' + error);
                $scope.error = error;
            });


    };


    $scope.init();
}]);