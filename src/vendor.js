/**
 * those files will be loaded and concat by gulp
 * @type {{JS: string[], CSS: string[]}}
 */
module.exports = {

    JS: [
        'vendor/jquery.highlight.js',
        'vendor/draggable-rows.js'
    ],
    JS_FOR_KARMA: [
	    'node_modules/jquery/dist/jquery.js',
	    'node_modules/angular/angular.js',
	    'node_modules/angular-animate/angular-animate.min.js',
	    'node_modules/angular-mocks/angular-mocks.js',
	    'node_modules/angular-cookies/angular-cookies.js',
	    'node_modules/angular-sanitize/angular-sanitize.js',
	    'node_modules/angular-messages/angular-messages.js',
	    'node_modules/angular-ui-router/release/angular-ui-router.js',
	    'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
	    'node_modules/jf-angular-ui-grid/ui-grid.js',
	    'node_modules/angular-resource/angular-resource.js',
	    'node_modules/angularjs-toaster/toaster.js',
	    'node_modules/angular-file-upload/angular-file-upload.js',
	    'node_modules/jquery-contextmenu/dist/jquery.contextMenu.js',
	    'node_modules/jquery-ui/jquery-ui.js',
	    'node_modules/lodash/lodash.js',
	    'node_modules/codemirror/lib/codemirror.js',
	    'node_modules/codemirror/addon/mode/overlay.js',
	    'node_modules/codemirror/mode/xml/xml.js',
	    'node_modules/codemirror/mode/javascript/javascript.js',
	    'node_modules/codemirror/mode/clike/clike.js',
	    'node_modules/codemirror/addon/dialog/dialog.js',
	    'node_modules/codemirror/addon/search/searchcursor.js',
	    'node_modules/codemirror/addon/edit/matchbrackets.js',
	    'node_modules/jf-angular-ui-codemirror/ui-codemirror.js',
	    'node_modules/x2js/xml2json.js',
	    'node_modules/ui-select/dist/select.js',
	    'node_modules/zeroclipboard/dist/ZeroClipboard.js',
	    'node_modules/ng-clip/dest/ng-clip.min.js',
	    'node_modules/jf-angular-ui-utils/ui-utils.js',
	    'node_modules/later/later.js',
	    'vendor/jquery.highlight.js',
	    'node_modules/jf-tooltipster/js/jquery.tooltipster.min.js',
	    'node_modules/angular-capitalize-filter/capitalize.js',
	    'vendor/draggable-rows.js',
	    'node_modules/clipboard/dist/clipboard.min.js',
	    'node_modules/js-beautify/js/lib/beautify.js',
	    'node_modules/hamsterjs/hamster.js',
	    'node_modules/angular-mousewheel/mousewheel.js',
	    'node_modules/jstree/dist/jstree.js',
	    'node_modules/moment/min/moment.min.js',
	    'node_modules/moment-jdateformatparser/moment-jdateformatparser.min.js',
	    'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
	    'node_modules/angular-eonasdan-datetimepicker/dist/angular-eonasdan-datetimepicker.js',
	    'node_modules/jasmine-expect/dist/jasmine-matchers.js'
    ],

    CSS: [
        'node_modules/jquery-ui/themes/smoothness/jquery-ui.css',
        'node_modules/jquery-contextmenu/dist/jquery.contextMenu.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/jf-angular-ui-grid/ui-grid.min.css',
        'node_modules/jf-animate-css/animate.css',
        'node_modules/codemirror/lib/codemirror.css',
        'node_modules/ui-select/dist/select.css',
        'node_modules/jf-tooltipster/css/tooltipster.css',
        'node_modules/codemirror/addon/dialog/dialog.css',
        'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
        'node_modules/jstree/dist/themes/default/style.css',
    ],

    FONTS: [
//        'node_modules/jf-lessfonts-open-sans/dist/fonts/**/*.{svg,woff,ttf,eot}',
        'node_modules/jf-angular-ui-grid/*.{svg,woff,ttf,eot}',
//        'node_modules/font-awesome/fonts/*.{svg,woff,ttf,eot}'
        'node_modules/jstree/dist/themes/default/*.{png,gif}',
    ],

    ASSETS: [
        'node_modules/zeroclipboard/dist/ZeroClipboard.swf'
    ]
};