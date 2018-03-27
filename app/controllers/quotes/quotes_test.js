'use strict';

describe('quoteApp module', function () {

    beforeEach(module('quoteApp'));

    var scope = {}, state = {}, loginService = {};
    describe('quotes controller', function () {

        it('should ....', inject(function ($controller) {
            //spec body
            var quotesCtrl = $controller('QuotesCtrl', {$scope: scope,$state: state,LoginService: loginService});
            expect(quotesCtrl).toBeDefined();
        }));

    });
});