'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('quoteApp', [
    'ui.router'
    , 'ngRoute'
    , 'angular-md5'
    , 'angularMoment'
    , 'ngMaterial'
    , 'ngMessages'
    //'quoteApp.login',
    // 'quoteApp.register',
    // 'quoteApp.quotes',
    // 'quoteApp.users',
    // 'quoteApp.info',
    , 'quoteApp.version'
    , 'quoteApp.name'
]);


app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdDateLocaleProvider', 'moment', function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $mdDateLocaleProvider, moment) {
    $locationProvider.hashPrefix('!');


    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'controllers/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('password', {
            url: '/password',
            templateUrl: 'controllers/password/password.html',
            controller: 'PasswordCtrl'
    })
        .state('register', {
            url: '/register',
            templateUrl: 'controllers/register/register.html',
            controller: 'RegisterCtrl'
        })
        .state('quotes', {
            url: '/quotes',
            templateUrl: 'controllers/quotes/quotes.html',
            controller: 'QuotesCtrl'
        })
        .state('info', {
            url: '/info',
            templateUrl: 'controllers/info/info.html',
            controller: 'InfoCtrl'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'controllers/users/users.html',
            controller: 'UsersCtrl'
        });

    $urlRouterProvider.otherwise('/login');
}]);


app.run(function ($rootScope, $http, $location, $state, LoginService) {


    $rootScope.config = {
        "api_url": "http://localhost:5000/api"
    };

    $rootScope.config.httpOptions = {withCredentials: true};

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            console.log('Changed state to: ' + JSON.stringify(toState));
        });


});


app.factory('LoginService', function ($state, $http, $rootScope, md5) {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    var salt = '';
    var token = '';


    return {
        login: function (username, password, scope) {

            $rootScope.config.username = username;
            $rootScope.config.password = password;

            var postData = {
                "username": $rootScope.config.username,
                "password": $rootScope.config.password
            };
            // $rootScope.getSaltAndToken(username, password);


            var h = md5.createHash(password + "sillySalt");
            console.log('md5.createHash');
            console.log(h);

            $http.post($rootScope.config.api_url + '/login', postData, $rootScope.config.httpOptions)
                .then(function (response) {
                    console.log('response');
                    console.log(response);

                    //  $rootScope.config.salt = response.results[0].salt;
                    console.log('message : ' + response.data.message);
                    scope.error = response.data.message;

                    if (response.data.fix != null) {
                        console.log('response.data.fix:' + response.data.fix);
                        if (response.data.fix == 'provide_password') {
                            console.log('state.transitionTo');

                            $state.transitionTo('password');

                            scope.error = response.data.message;
                        }
                    }else{
                        isAuthenticated = true;
                        $state.transitionTo('quotes');
                    }

                    //$rootScope.getToken(username, md5.createHash(password + $rootScope.config.salt));

                })
                .catch(function (error) {
                    console.log(error);
                    scope.error = error;

                });


        },
        setPassword: function (password, scope) {

            $rootScope.config.password = password;

            var postData = {
                "username": $rootScope.config.username,
                "password": $rootScope.config.password
            };


            var h = md5.createHash(password + "sillySalt");
            console.log('md5.createHash');
            console.log(h);

            $http.post($rootScope.config.api_url + '/setPassword/' ,postData, $rootScope.config.httpOptions)
                .then(function (response) {
                    console.log('response');
                    console.log(response);

                    //  $rootScope.config.salt = response.results[0].salt;
                    console.log('message : ' + response.data.message);
                    scope.error = response.data.message;

                    isAuthenticated = true;
                    $state.transitionTo('quotes');

                })
                .catch(function (error) {
                    console.log(error);
                    scope.error = error;

                });

        },

        isAuthenticated: function () {
            //  console.log("isAuthenticated : " + isAuthenticated)
            return isAuthenticated;
        },
        setToken: function (token) {
            if (token === $rootScope.config.token) {
                isAuthenticated = true;
            } else {
                isAuthenticated = false;
            }

            if (isAuthenticated) {
                $state.transitionTo('quotes');
            }
        },
        logout: function () {
            isAuthenticated = false;
            return isAuthenticated;
        }
    };

});


app.controller("QuotesAppCtrl",
    ['$scope'
        , '$rootScope'
        , '$state'
        , '$http'
        , '$window'
        , 'LoginService'
        , 'md5'
        , function ($scope, $rootScope, $state, $http, $window, LoginService, md5) {

        var control = this;
        $scope.title = "ITE QuoteApp";


        $scope.isAuthenticated = function () {
            //console.log("isAuthenticated!!");
            return LoginService.isAuthenticated();

        };

        $scope.logout = function () {
            console.log("Logout!!");
            if (!LoginService.logout()) {
                $scope.error = "Successfully Logged out !";

                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('login');
            }

        };


        /*   $rootScope.getSaltAndToken = function (username, password) {


         $http.get($rootScope.config.api_url + '/getSalt/'+username  , $rootScope.config.httpOptions)
         .success(
         function (response) {
         console.log('response');
         console.log(response);

         $rootScope.config.salt = response.results[0].salt;
         console.log('salt : ' + $rootScope.config.salt);

         $rootScope.getToken(username, md5.createHash(password + $rootScope.config.salt));

         })
         .error(function (error) {
         console.log(error);
         });


         };

         $rootScope.getToken = function (username, saltedPassword) {
         $http.get($rootScope.config.api_url + '/getSecureToken/'+username + '/' + saltedPassword, $rootScope.config.httpOptions)
         .success(
         function (response) {
         console.log('response');
         console.log(response);

         $rootScope.config.token = response.results[0].token_id;
         console.log($rootScope.config.token);

         LoginService.setToken($rootScope.config.token);

         })
         .error(function (error) {
         console.log(error);
         });
         };*/


    }
    ]);
