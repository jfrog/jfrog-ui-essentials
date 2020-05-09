/**
 * those files will be loaded and concat by gulp
 * @type {{JS: string[], CSS: string[]}}
 */

const vendorsPathes = {
	js: {
		core: [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-animate/angular-animate.min.js',
			'node_modules/angular-hotkeys/build/hotkeys.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-cookies/angular-cookies.js',
			'node_modules/angular-sanitize/angular-sanitize.js',
			'node_modules/angular-messages/angular-messages.js',
			'node_modules/angular-ui-router/release/angular-ui-router.js',
			'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
			'node_modules/jf-angular-ui-grid/ui-grid.js',
			'node_modules/jf-angular-ui-layout/ui-layout.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angularjs-toaster/toaster.js',
			'node_modules/angular-file-upload/angular-file-upload.js',
			'node_modules/jquery-contextmenu/dist/jquery.contextMenu.js',
			'node_modules/components-jqueryui/jquery-ui.js',
			'node_modules/lodash/lodash.js',
			'node_modules/codemirror/lib/codemirror.js',
			'node_modules/jf-angular-ui-codemirror/ui-codemirror.js',
			'node_modules/ui-select/dist/select.js',
			'node_modules/zeroclipboard/dist/ZeroClipboard.js',
			'node_modules/ng-clip/dest/ng-clip.min.js',
			'node_modules/jf-angular-ui-utils/ui-utils.js',
			'vendor/jquery.highlight.js',
			'node_modules/jf-tooltipster/js/jquery.tooltipster.min.js',
			'node_modules/angular-capitalize-filter/capitalize.js',
			'vendor/draggable-rows.js',
			'node_modules/hamsterjs/hamster.js',
			'node_modules/angular-mousewheel/mousewheel.js',
			'node_modules/moment/min/moment.min.js',
			'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
			'node_modules/angular-eonasdan-datetimepicker/dist/angular-eonasdan-datetimepicker.js',
			'node_modules/clipboard/dist/clipboard.min.js',
		],
		optional: {
			codemirror: {
				xml: 'node_modules/codemirror/mode/xml/xml.js',
				js: 'node_modules/codemirror/mode/javascript/javascript.js',
				clike: 'node_modules/codemirror/mode/clike/clike.js',
				dialog: 'node_modules/codemirror/addon/dialog/dialog.js',
				searchCursor: 'node_modules/codemirror/addon/search/searchcursor.js',
				matchBrackets: 'node_modules/codemirror/addon/edit/matchbrackets.js',
				overlay: 'node_modules/codemirror/addon/mode/overlay.js',
			},
			xml2js: 'node_modules/x2js/lib/xml2js',
			later: 	'node_modules/later/later.js',
			jsBeautify: 'node_modules/js-beautify/js/lib/beautify.js',
			jsTree: 'node_modules/jf-jstree/dist/jstree.js',
			momentDateFormatParser: 'node_modules/moment-jdateformatparser/moment-jdateformatparser.min.js',
			jasmineMatchers: 'node_modules/jasmine-expect/dist/jasmine-matchers.js',
			selectize: 'node_modules/selectize/dist/js/standalone/selectize.js'
		}
	},
	css: {
		core: [
			'node_modules/components-jqueryui/themes/smoothness/jquery-ui.css',
			'node_modules/jquery-contextmenu/dist/jquery.contextMenu.css',
			'node_modules/bootstrap/dist/css/bootstrap.css',
			'node_modules/jf-angular-ui-grid/ui-grid.min.css',
			'node_modules/jf-animate-css/animate.css',
			'node_modules/codemirror/lib/codemirror.css',
			'node_modules/ui-select/dist/select.css',
			'node_modules/jf-tooltipster/css/tooltipster.css',
			'node_modules/codemirror/addon/dialog/dialog.css',
			'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
			'node_modules/jf-angular-ui-layout/ui-layout.css',
			'node_modules/angular-hotkeys/build/hotkeys.css',
			'node_modules/jf-lessfonts-open-sans/dist/css/open-sans.css',
		],
		optional: {
			codemirror:{
				dialog:'node_modules/codemirror/addon/dialog/dialog.css',
			},
			jsTree: 'node_modules/jf-jstree/dist/themes/default/style.css',
			selectize: 'node_modules/selectize/dist/css/selectize.bootstrap3.css'
		}
	},
	fonts: {
		core: [
			'node_modules/jf-angular-ui-grid/*.{svg,woff,ttf,eot}',
		],
		optional: {
			jsTree: 'node_modules/jf-jstree/dist/themes/default/*.{png,gif}',
		}
	},
	assets: {
		core: [
			'node_modules/zeroclipboard/dist/ZeroClipboard.swf'
		]
	}
};

module.exports = {
	ESSENTIALS_VENDORS: vendorsPathes,
    JS: [
        'vendor/jquery.highlight.js',
        'vendor/draggable-rows.js'
    ],
    JS_FOR_KARMA: [
	    ...vendorsPathes.js.core,
	    vendorsPathes.js.optional.codemirror.xml,
	    vendorsPathes.js.optional.codemirror.js,
	    vendorsPathes.js.optional.codemirror.clike,
	    vendorsPathes.js.optional.codemirror.dialog,
	    vendorsPathes.js.optional.codemirror.searchCursor,
	    vendorsPathes.js.optional.codemirror.matchBrackets,
	    vendorsPathes.js.optional.codemirror.overlay,
	    vendorsPathes.js.optional.xml2js,
	    vendorsPathes.js.optional.later,
	    vendorsPathes.js.optional.jsBeautify,
	    vendorsPathes.js.optional.jsTree,
	    vendorsPathes.js.optional.momentDateFormatParser,
	    vendorsPathes.js.optional.jasmineMatchers,
    ],

    CSS: [
	    ...vendorsPathes.css.core,
	    vendorsPathes.css.optional.codemirror.dialog,
	    vendorsPathes.css.optional.jsTree,
    ],

    FONTS: [
	    ...vendorsPathes.fonts.core,
	    vendorsPathes.fonts.optional.jsTree
    ],

    ASSETS: [
	    ...vendorsPathes.assets.core
    ]
};

