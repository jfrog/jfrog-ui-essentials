var vendorPaths = require('./src/vendor');

module.exports = {

    SOURCES: {
        APPLICATION_JS: 'src/**/*.js',
        BOWER_JSON: 'bower.json',
        TEMPLATES: 'src/**/**/*.html',
        VENDOR_SCRIPTS : vendorPaths.JS,
        VENDOR_SCRIPTS_FOR_KARMA : vendorPaths.JS_FOR_KARMA,
        VENDOR_CSS : vendorPaths.CSS,
        VENDOR_ASSETS: vendorPaths.ASSETS,
        VENDOR_FONTS: vendorPaths.FONTS,
        LESS: 'src/assets/stylesheets/**/*.less',
        DIRECTIVES_LESS: 'src/directives/**/*.less',
        LESS_MAIN_FILE: 'src/assets/stylesheets/main.less',
        FONTS : 'src/assets/fonts/**',
        VENDOR_JS : 'src/vendor.js',
        IMAGES : 'src/assets/images/**',
        JQUERY_UI_IMAGES : 'src/assets/images/jqueryui/**',
        MEDIUM_SVG_ICONS: 'src/assets/svgicons/*.svg'
    },

    DESTINATIONS: {
        TARGET: 'dist',
        TARGET_TEMP: 'dist/tmp',
        KARMA_TEMP: 'dist/tmp/karma',
        TARGET_REV: [
            'dist/**'
        ]
    }
};