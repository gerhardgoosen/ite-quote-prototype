'use strict';

angular.module('quoteApp.version', [
  'quoteApp.version.interpolate-filter',
  'quoteApp.version.version-directive'
])

.value('version', '0.1');
