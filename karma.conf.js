var browserStack = require('./browser_stack.config');
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        files: [
            'dist/tmp/karma/karmaVendorScripts.js',
            'dist/jfrog-ui-essentials.js',
            'specs/spec_helper.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'mocks/**/**.js',
            'specs/**/**.js',
            {pattern: 'src/webworkers/**/*', included: false},
        ],
        exclude: [
/*
            "open/web/war/src/main/webapp/webapp/css/!**",
            "open/web/war/src/main/webapp/webapp/fonts/!**"
*/
        ],
        preprocessors: {
            '{specs,mocks}/**/**.js': [],
            '{specs,mocks}/**/**.browserify.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        junitReporter: {
            outputDir: 'test_results'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,

        browserStack: {
            project: 'JFrog UI Library Karma',
            build: process.env.BUILD_NUMBER
        },

        browserDisconnectTimeout: 20000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 60000,        

        // define browsers
        customLaunchers: browserStack.browsers,

        browsers: ['Chrome', 'Firefox'],

        singleRun: false
    });
};
