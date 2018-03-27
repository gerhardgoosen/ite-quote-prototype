'use strict';

describe('quoteApp module', function () {

    beforeEach(module('quoteApp'));

    var scope = {}, state = {}, loginService = {};
    describe('users controller', function () {

        it('should ....', inject(function ($controller) {
            //spec body
            var usersCtrl = $controller('UsersCtrl', {$scope: scope,$state: state,LoginService: loginService});
            expect(usersCtrl).toBeDefined();
        }));

    });
});