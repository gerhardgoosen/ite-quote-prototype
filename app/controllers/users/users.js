'use strict';

angular.module('quoteApp').controller('UsersCtrl', ['$rootScope', '$scope', '$state', '$http', '$window', 'LoginService', function ($rootScope, $scope, $state, $http, $window, LoginService) {
    $scope.title = "Users";
    $scope.users = [];
    $scope.screenMode = 'list';


    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
        else {

            if ($rootScope.currentUser && angular.equals($rootScope.currentUser.app_role, "admin")) {

                $http.get($rootScope.config.api_url + '/users', $rootScope.config.httpOptions)
                    .then(function (response) {
                        console.log('response.data : ' + JSON.stringify(response.data));
                        $scope.users = response.data;
                        console.log('response.data : ' + JSON.stringify($scope.users));
                    })
                    .catch(function (error) {
                        console.log(error);
                        $scope.error = error;

                    });
            } else {
                $scope.error = "Insufficient Access";
            }


        }
    };

    $scope.addUser = function () {
        console.log('addUser : ');
        $state.transitionTo('register');
    }



    // $scope.setScreenMode = function (mode) {
    //     console.log('setScreenMode : ' + mode);
    //
    //     if (mode === 'add') {
    //         $scope.tmpUser = {
    //             "first_name": ""
    //             , "last_name": ""
    //             , "username": ""
    //             , "role": ""
    //         };
    //         console.log('tmpUser : ' + $scope.tmpUser);
    //     }
    //
    //     $scope.screenMode = mode;
    //
    //
    // };
    //
    // $scope.checkScreenMode = function (mode) {
    //     console.log('checkScreenMode : ' + mode + " - " + angular.equals( $scope.screenMode , mode) );
    //
    //    return  angular.equals( $scope.screenMode , mode);
    //
    // };
    //
    //
    //
    //
    // $scope.formSubmit = function (action,user) {
    //
    //
    //     switch (action) {
    //         case 'add': {
    //             console.log('tmpUser : ' +user);
    //             break;
    //         }
    //         case 'update': {
    //             console.log('update : ' + user);
    //             break;
    //         }
    //         case 'delete': {
    //             console.log('delete : ' + user);
    //             break;
    //         }
    //         default: {
    //             $scope.error = "Unknown fuction";
    //         }
    //     }
    // };


    $scope.init();

}])
;