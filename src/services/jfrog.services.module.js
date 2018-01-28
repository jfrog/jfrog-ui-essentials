import {JFrogEventBus}                          from './jfrog_eventBus';
import {JFrogNotifications}                     from './jfrog_notifications';
import {JFrogUILibConfig}                       from './jfrog_ui_lib_config';
import {JFrogDownload}                          from './jfrog_download';
import {JFrogIFrameDownload}                    from './jfrog_iframe_download';
import {JFrogUIUtils}                           from './jfrog_ui_utils';
import {WebWorkersPool}                           from './WebWorkersPool';
import {JFrogUIWebWorker}                           from './jfrog_ui_webworker';
import {recursiveDirective} from "./recursive_directive";
import {AdvancedStringMatch} from "./advanced_string_match";
import {ContextMenuService} from "./context_menu_service";
import JfFullTextService from './full.text.service';

angular.module('jfrog.ui.essentials.services', ['ui.router', 'jfrog.ui_components', 'toaster'])
    .provider('JFrogUILibConfig', JFrogUILibConfig)
    .service('JFrogEventBus', JFrogEventBus)
    .factory('JFrogDownload', JFrogDownload)
    .factory('JFrogIFrameDownload', JFrogIFrameDownload)
    .factory('WebWorkersPool', WebWorkersPool)
    .factory('recursiveDirective', recursiveDirective)
    .service('JFrogNotifications', JFrogNotifications)
    .service('JFrogUIUtils', JFrogUIUtils)
    .factory('JFrogUIWebWorker', JFrogUIWebWorker)
    .service('AdvancedStringMatch', AdvancedStringMatch)
    .service('ContextMenuService', ContextMenuService)
    .service('JfFullTextService', JfFullTextService)

