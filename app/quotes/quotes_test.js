'use strict';

describe('quoteApp.quotes module', function() {

  beforeEach(module('quoteApp.quotes'));

  describe('quotes controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var quotesCtrl = $controller('QuotesCtrl');
      expect(quotesCtrl).toBeDefined();
    }));

  });
});