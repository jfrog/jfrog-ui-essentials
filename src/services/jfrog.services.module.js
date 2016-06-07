import {JFrogEventBus}                          from './jfrog_eventBus';
import {JFrogNotifications}                     from './jfrog_notifications';
import {JFrogUILibConfig}                       from './jfrog_ui_lib_config';
import {JFrogDownload}                          from './jfrog_download';
import {JFrogIFrameDownload}                    from './jfrog_iframe_download';

angular.module('jfrog.ui.essentials.services', ['ui.router', 'jfrog.ui_components', 'toaster'])
    .provider('JFrogUILibConfig', JFrogUILibConfig)
    .service('JFrogEventBus', JFrogEventBus)
    .factory('JFrogDownload', JFrogDownload)
    .factory('JFrogIFrameDownload', JFrogIFrameDownload)
    .service('JFrogNotifications', JFrogNotifications);
