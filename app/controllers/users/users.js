'use strict';


angular.module('quoteApp').controller('UsersCtrl', ['$rootScope', '$scope', '$state', '$http', '$window', '$mdDialog', 'LoginService', function ($rootScope, $scope, $state, $http, $window, $mdDialog, LoginService) {
    $scope.title = "Users";
    $scope.users = [];
    $scope.screenMode = 'list';


    $scope.cancel = function (user) {
        console.log('cancel');
        user.edit = null;
    };


    $scope.init = function () {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
        else {

            if ($rootScope.currentUser && angular.equals($rootScope.currentUser.app_role, "admin")) {

                $scope.fetchUsers();

            } else {
                $scope.error = "Insufficient Access";
            }


        }
    };

    $scope.fetchUsers = function () {
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
    };


    $scope.addUser = function () {
        console.log('addUser : ');
        $state.transitionTo('register');
    }

    $scope.editUser  = function (user) {
        console.log('editUser : ');
        user.edit = true;
    };



    $scope.update = function (user, ev) {
        console.log("update!!");
        console.log("id,!!" + user.id);
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
                $http.put($rootScope.config.api_url + '/user/'+user.id, user, $rootScope.config.httpOptions)
                    .then(function (response) {

                        console.log('response.data : ' + JSON.stringify(response.data));

                        $scope.fetchUsers();

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



    $scope.showConfirm = function (user, ev) {
        console.log("showConfirm!!");
        console.log("id,!!" + user.id);

        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Delete this record?')
            .ariaLabel('Delete this record?')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(
            function () {

                $http.delete($rootScope.config.api_url + '/user/' + user.id, $rootScope.config.httpOptions)
                    .then(function (response) {

                        console.log('response.data : ' + JSON.stringify(response.data));

                        $scope.fetchUsers();

                    })
                    .catch(function (error) {
                        console.log(error);
                        scope.error = error;
                    });


            }
            , function () {
                //cancel
            });
    };


    $scope.init();

}])
;