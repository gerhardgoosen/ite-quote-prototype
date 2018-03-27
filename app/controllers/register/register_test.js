'use strict';

describe('quoteApp module', function () {

    beforeEach(module('quoteApp'));

    var scope = {}, state = {}, loginService = {};
    describe('register controller', function () {

        it('should ....', inject(function ($controller) {
            //spec body
            var registerCtrl = $controller('RegisterCtrl', {$scope: scope,$state: state,LoginService: loginService});
            expect(registerCtrl).toBeDefined();
        }));

    });
});