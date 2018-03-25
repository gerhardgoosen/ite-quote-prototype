'use strict';

angular.module('quoteApp.name.name-directive', [])

.directive('appName', ['name', function(name) {
  return function(scope, elm, attrs) {
    elm.text(name);
  };
}]);
