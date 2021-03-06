'use strict';

angular.module('quoteApp').controller('RegisterCtrl', ['$rootScope', '$scope', '$state', '$http', '$window','LoginService', function ($rootScope, $scope, $state, $http, $window, LoginService) {
    $scope.title = "Register New User";

    $scope.status = false;


    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
        else {
            $rootScope.tmpUser = {};
        }
    };

    $scope.cancel = function () {
        console.log('cancel');
        history.back();//eish
    };


    $scope.clear = function () {
        $rootScope.tmpUser = {};
    };


    $scope.formSubmit = function () {
        console.log('tmpUser : ' + $rootScope.tmpUser);

        $http.post($rootScope.config.api_url + '/register', $rootScope.tmpUser, $rootScope.config.httpOptions)
            .then(function (response) {

                $scope.error = response.data.error;
                console.log(response.data);
                if (response.data.code === 200) {
                    console.log('ok');
                    $scope.message = "success";
                    $rootScope.tmpUser = {};
                    $state.transitionTo('users');
                } else {
                    $scope.message = "error : Username taken";
                }
            })
            .catch(function (error) {
                console.log('err:' + error);
                $scope.error = error;
            });


    };


    $scope.init();
}]);