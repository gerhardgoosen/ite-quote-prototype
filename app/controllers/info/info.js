//

/*angular.module('quoteApp.info', ['ngRoute'])

 .config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/info', {
 templateUrl: 'info/info.html',
 controller: 'InfoCtrl'
 });
 }])*/

app.controller('InfoCtrl', ['$scope', '$state', '$http', '$window', function ($scope, $state, $http, $window) {
    $scope.title = "Info";
}]);