'use strict';

describe('quoteApp module', function() {

  beforeEach(module('quoteApp'));
  var scope={}, state={}, loginService=module('quoteApp').factory('LoginService');

  describe('info controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var infoCtrl = $controller('InfoCtrl', {$scope: scope,$state: state,LoginService: loginService});
      expect(infoCtrl).toBeDefined();
    }));

  });
});