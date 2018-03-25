'use strict';

describe('quoteApp.name module', function() {
  beforeEach(module('quoteApp.name'));

  describe('app-name directive', function() {
    it('should print current name', function() {
      module(function($provide) {
        $provide.value('name', 'TEST_NAME');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-name></span>')($rootScope);
        expect(element.text()).toEqual('TEST_NAME');
      });
    });
  });
});
