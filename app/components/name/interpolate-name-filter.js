'use strict';

angular.module('quoteApp.name.interpolate-name-filter', [])

.filter('interpolateName', ['name', function(name) {
  return function(text) {
    return String(text).replace(/\%NAME\%/mg, name);
  };
}]);
