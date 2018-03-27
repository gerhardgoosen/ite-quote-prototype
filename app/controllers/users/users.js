'use strict';

angular.module('quoteApp').controller('UsersCtrl', ['$rootScope', '$scope', '$state', '$http', '$window', 'LoginService', function ($rootScope, $scope, $state, $http, $window, LoginService) {
    $scope.title = "Users";
    $scope.users = [];

    $scope.init = function () {
        if (!LoginService.isAuthenticated() ) {
            $state.transitionTo('login');
        }
        else {

            if($rootScope.currentUser && angular.equals($rootScope.currentUser.app_role, "admin")){

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
            }else{
                $scope.error = "Insufficient Access";
            }



        }
    }

    $scope.init();

}]);