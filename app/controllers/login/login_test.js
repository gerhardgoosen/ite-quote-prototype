'use strict';

describe('quoteApp module', function() {

  beforeEach(module('quoteApp'));
    var scope={}, state={}, loginService={};

  describe('login controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var loginCtrl = $controller('LoginCtrl', {$scope: scope,$state: state,LoginService: loginService});
      expect(loginCtrl).toBeDefined();
    }));

  });
});