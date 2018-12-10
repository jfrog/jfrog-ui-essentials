require('angular');
require('angular-mocks/ngMock');
window.jest = require('babel-jest');
require('babel-plugin-dynamic-import-node');
require('babel-plugin-transform-es2015-modules-commonjs');

window.CodeMirror = require('codemirror');
require('angular-messages');
require('angular-animate');
require('angular-cookies');
require('jf-angular-ui-utils');
require('jf-angular-ui-codemirror');
require('ui-select');
require('angular-ui-router');
require('angularjs-toaster');
require('angular-sanitize');
window.ZeroClipboard = require('zeroclipboard/dist/ZeroClipboard');
require('ng-clip');
require('angular-ui-bootstrap');
require('jf-angular-ui-grid');
require('ui-grid-draggable-rows');
require('angular-mousewheel');
require('angular-eonasdan-datetimepicker');
require('angular-file-upload/angular-file-upload');
window._ = require('lodash');
window.jQuery = require('jquery/dist/jquery');
require('jquery-contextmenu/dist/jquery.contextMenu');
require('jf-tooltipster/js/jquery.tooltipster');
require('components-jqueryui/jquery-ui');



require('./dist/tmp/templates');
require('./src/directives/jfrog.directives.module');
require('./src/services/jfrog.services.module');
require('./src/filters/jfrog.filters.module');
require('./src/ui_components/ui_components.module');


const jQuery = require("jquery");
Object.defineProperty(window, "jQuery", { value: jQuery });
Object.defineProperty(window, "$", { value: jQuery });

const angular = require("angular");
Object.defineProperty(window, "angular", { value: angular });

require("./src/main");
require('./specs/spec_helper');
