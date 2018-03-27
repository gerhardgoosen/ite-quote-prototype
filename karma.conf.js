//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            ,'bower_components/angular/angular.js'
            ,'bower_components/angular-route/angular-route.js'
            ,'bower_components/angular-mocks/angular-mocks.js'
            ,'bower_components/angular-route/angular-route.js'
            ,'bower_components/angular-ui-router/release/angular-ui-router.min.js'
            ,'bower_components/angular-md5/angular-md5.js'
            ,'bower_components/moment/moment.js'
            ,'bower_components/angular-moment/angular-moment.js'
            ,'bower_components/angular-animate/angular-animate.js'
            ,'bower_components/angular-aria/angular-aria.js'
            ,'bower_components/angular-messages/angular-messages.js'
            ,'bower_components/angular-material/angular-material.js'
            ,'app.js'
            ,'controllers/**/**/*.js'
            ,'components/**/**/*.js'

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
