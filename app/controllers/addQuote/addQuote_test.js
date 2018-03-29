'use strict';

describe('quoteApp module', function () {

    beforeEach(module('quoteApp'));

    var scope = {}, state = {}, loginService = {};
    describe('addQoute controller', function () {

        it('should ....', inject(function ($controller) {
            //spec body
            var addQouteCtrl = $controller('AddQouteCtrl', {$scope: scope,$state: state,LoginService: loginService});
            expect(addQouteCtrl).toBeDefined();
        }));

    });
});