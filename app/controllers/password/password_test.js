'use strict';

describe('quoteApp module', function () {

    beforeEach(module('quoteApp'));

    var scope = {}, state = {}, loginService = {};
    describe('password controller', function () {

        it('should ....', inject(function ($controller) {
            //spec body
            var passwordCtrl = $controller('PasswordCtrl', {$scope: scope,$state: state,LoginService: loginService});
            expect(passwordCtrl).toBeDefined();
        }));

    });
});