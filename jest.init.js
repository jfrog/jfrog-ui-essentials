// import angular from 'angular';
require('angular');
require('angular-mocks/ngMock');
// module = window.angular.mock.module;
// import * as CodeMirror from 'codemirror';

// require('jquery');
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
// require('ng-clip');
require('angular-ui-bootstrap');
require('jf-angular-ui-grid');
require('ui-grid-draggable-rows');
require('angular-mousewheel');
require('angular-eonasdan-datetimepicker');
require('angular-file-upload/angular-file-upload');
window._ = require('lodash');
require('jquery-contextmenu/dist/jquery.contextMenu');

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

// require('../dist/vendorScripts');
// require('../dist/tmp/karma/karmaVendorScripts');
// require('../dist/jfrog-ui-essentials');


// Object.defineProperty(window, 'jQuery', {value: jQuery});
// Object.defineProperty(window, '$', {value: jQuery});
// Object.defineProperty(window, 'angular', {value: angular});
// import * as jQuery from 'jquery';

