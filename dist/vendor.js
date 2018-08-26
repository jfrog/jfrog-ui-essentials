/**
 * those files will be loaded and concat by gulp
 * @type {{JS: string[], CSS: string[]}}
 */

const essentialVendors = {
	js: {
		core: [
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
			'node_modules/components-jqueryui/jquery-ui.js',
			'node_modules/lodash/index.js',
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
				click: 'node_modules/codemirror/mode/clike/clike.js',
				dialog: 'node_modules/codemirror/addon/dialog/dialog.js',
				search: 'node_modules/codemirror/addon/search/searchcursor.js',
				edit: 'node_modules/codemirror/addon/edit/matchbrackets.js',
				overlay: 'node_modules/codemirror/addon/mode/overlay.js',
			},
			xml2js: 'node_modules/x2js/lib/xml2js',
			later: 	'node_modules/later/later.js',
			jsBeautify: 'node_modules/js-beautify/js/lib/beautify.js',
			jsTree: 'node_modules/jf-jstree/dist/jstree.js',
			momentDateFormatParser: 'node_modules/moment-jdateformatparser/moment-jdateformatparser.min.js',
			jasmineMatchers: 'node_modules/jasmine-expect/dist/jasmine-matchers.js'
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
		],
		optional: {
			codemirror:{
				dialog:'node_modules/codemirror/addon/dialog/dialog.css',
			},
			jsTree: 'node_modules/jf-jstree/dist/themes/default/style.css',
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

    JS: [
        'vendor/jquery.highlight.js',
        'vendor/draggable-rows.js'
    ],
    JS_FOR_KARMA: [
	    ...essentialVendors.js.core,
	    essentialVendors.js.optional.codemirror.xml,
	    essentialVendors.js.optional.codemirror.js,
	    essentialVendors.js.optional.codemirror.click,
	    essentialVendors.js.optional.codemirror.dialog,
	    essentialVendors.js.optional.codemirror.search,
	    essentialVendors.js.optional.codemirror.edit,
	    essentialVendors.js.optional.codemirror.overlay,
	    essentialVendors.js.optional.xml2js,
	    essentialVendors.js.optional.later,
	    essentialVendors.js.optional.jsBeautify,
	    essentialVendors.js.optional.jsTree,
	    essentialVendors.js.optional.momentDateFormatParser,
	    essentialVendors.js.optional.jasmineMatchers,
    ],

    CSS: [
	    ...essentialVendors.css.core,
	    essentialVendors.css.optional.codemirror.dialog,
	    essentialVendors.css.optional.jsTree,
    ],

    FONTS: [
	    ...essentialVendors.fonts.core,
	    essentialVendors.fonts.optional.jsTree
    ],

    ASSETS: [
	    ...essentialVendors.assets.core
    ]
};

