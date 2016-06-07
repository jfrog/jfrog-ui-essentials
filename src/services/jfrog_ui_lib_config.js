//import bowerJSON     from '../../bower.json';

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
        this.config = {};

        if (this.version === 'UNKNOWN.VERSION') console.log("%cRunning with unknown version of jfrog-ui-essentials!","color: #ff0000;");
    }

    $get() {
        return this;
    }

    setConfig(config) {
        _.extend(this.config,config);
    }
    getConfig() {
        return this.config;
    }

}