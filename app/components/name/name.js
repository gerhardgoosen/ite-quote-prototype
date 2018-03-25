'use strict';

angular.module('quoteApp.name', [
  'quoteApp.name.interpolate-name-filter',
  'quoteApp.name.name-directive'
])

.value('name', 'QuoteApp');
