//import bowerJSON     from '../../bower.json';
import VALIDATION_MESSAGES from '../constants/validation.constants.js';

export class JFrogUILibConfig {
    constructor() {

        let buildNumber = '/* @echo BUILD_NUMBER */';
        let buildVersion = '/* @echo BUILD_VERSION */';
        let buildDev = '/* @echo BUILD_DEV */';

        buildNumber = buildNumber === 'undefined' ? undefined : buildNumber;
        buildVersion = buildVersion === 'undefined' ? undefined : buildVersion;
        buildDev = buildDev === 'undefined' ? undefined : buildDev;

//        this.version = buildNumber ? (buildDev ? (buildVersion+'-dev.'+buildNumber) : buildVersion) : 'UNKNOWN.VERSION';
        this.version = buildVersion ? buildVersion : 'UNKNOWN.VERSION';
        this.buildNumber = buildNumber || 'N/A';
        this.config = {DEFAULT_VALIDATION_MESSAGES_FUNC: VALIDATION_MESSAGES};

        if (this.version === 'UNKNOWN.VERSION') console.log("%cRunning with unknown version of jfrog-ui-essentials!","color: #ff0000;");
    }

    $get() {
        return this;
    }

    inject(injectable) {
        return angular.element(document.body).injector().get(injectable);
    }

    setConfig(config) {
        _.extend(this.config,config);
        angular.element(document).ready(() => {
            let eventBus = this.inject('JFrogEventBus');
            eventBus.updateCustomEvents();
        })
    }
    getConfig() {
        return this.config;
    }

}