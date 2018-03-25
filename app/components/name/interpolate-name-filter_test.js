'use strict';

describe('quoteApp.name module', function() {
  beforeEach(module('quoteApp.name'));

  describe('interpolate name filter', function() {
    beforeEach(module(function($provide) {
      $provide.value('name', 'TEST_NAME');
    }));

    it('should replace NAME', inject(function(interpolateNameFilter) {
      expect(interpolateNameFilter('before %NAME% after')).toEqual('before TEST_NAME after');
    }));
  });
});
