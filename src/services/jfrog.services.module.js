import {JFrogEventBus}                          from './jfrog_eventBus';
import {JFrogNotifications}                     from './jfrog_notifications';
import {JFrogUILibConfig}                       from './jfrog_ui_lib_config';
import {JFrogDownload}                          from './jfrog_download';
import {JFrogIFrameDownload}                    from './jfrog_iframe_download';
import {JFrogUIUtils}                           from './jfrog_ui_utils';
import {recursiveDirective} from "./recursive_directive";

angular.module('jfrog.ui.essentials.services', ['ui.router', 'jfrog.ui_components', 'toaster'])
    .provider('JFrogUILibConfig', JFrogUILibConfig)
    .service('JFrogEventBus', JFrogEventBus)
    .factory('JFrogDownload', JFrogDownload)
    .factory('JFrogIFrameDownload', JFrogIFrameDownload)
    .factory('recursiveDirective', recursiveDirective)
    .service('JFrogNotifications', JFrogNotifications)
    .service('JFrogUIUtils', JFrogUIUtils);
