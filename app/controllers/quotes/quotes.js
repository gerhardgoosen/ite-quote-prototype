'use strict';

angular.module('quoteApp').controller('QuotesCtrl',
    ['$rootScope', '$scope', '$state', '$http', '$window', '$mdDialog', 'LoginService', function ($rootScope, $scope, $state, $http, $window, $mdDialog, LoginService) {
        $scope.title = "Quotes";
        $scope.quotes = [];

        $scope.cancel = function (quote) {
            console.log('cancel');
            quote.edit = null;
        };

        $scope.init = function () {
            if (!LoginService.isAuthenticated()) {
                $state.transitionTo('login');
            }
            else {
                $scope.fetchQuotes();
            }
        };

        $scope.fetchQuotes = function () {
            console.log('fetchQuotes : ');
            $http.get($rootScope.config.api_url + '/quotes', $rootScope.config.httpOptions)
                .then(function (response) {

                    $scope.quotes = response.data;
                    console.log('response.data : ' + JSON.stringify($scope.quotes));

                })
                .catch(function (error) {
                    console.log(error);
                    scope.error = error;
                });
        };


        $scope.addQoute = function () {
            console.log('addQuote : ');
            $state.transitionTo('addQuote');
        };

        $scope.editQuote = function (quote) {
            console.log('editQuote : ');
            quote.edit = true;
        };


        $scope.update = function (quote, ev) {
            console.log("update!!");
            console.log("id,!!" + quote.id);
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .textContent('Update this record?')
                .ariaLabel('Update this record?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(
                function () {
                    $http.put($rootScope.config.api_url + '/quote/'+quote.id, quote, $rootScope.config.httpOptions)
                        .then(function (response) {

                            console.log('response.data : ' + JSON.stringify(response.data));

                            $scope.fetchQuotes();

                        })
                        .catch(function (error) {
                            console.log(error);
                            $scope.error = error;
                        });


                }
                , function () {
                    //cancel
                });
        };


        $scope.showConfirm = function (quote, ev) {
            console.log("showConfirm!!");
            console.log("id,!!" + quote.id);
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .textContent('Delete this record?')
                .ariaLabel('Delete this record?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(
                function () {

                    $http.delete($rootScope.config.api_url + '/quote/' + quote.id, $rootScope.config.httpOptions)
                        .then(function (response) {

                            console.log('response.data : ' + JSON.stringify(response.data));

                            $scope.fetchQuotes();

                        })
                        .catch(function (error) {
                            console.log(error);
                            $scope.error = error;
                        });


                }
                , function () {
                    //cancel
                });
        };


        $scope.init();
    }]);

