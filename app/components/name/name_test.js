'use strict';

describe('quoteApp.name module', function() {
  beforeEach(module('quoteApp.name'));

  describe('name service', function() {
    it('should return current name', inject(function(name) {
      expect(name).toEqual('QuoteApp');
    }));
  });
});
