import bowerJSON     from '../../../package.json';
export class JFrogUILibConfig {
    constructor() {
        let buildVersion = bowerJSON.version;
        this.version = buildVersion ? buildVersion : 'UNKNOWN.VERSION';
        this.config = {};
        if (this.version === 'UNKNOWN.VERSION') console.log("%cRunning with unknown version of jfrog-ui-essentials!","color: #ff0000;");
    }
    $get() {
        return this;
    }
    setConfig(config) {
        _.extend(this.config,config);
        console.log(this.config);
    }
    getConfig() {
        return this.config;
    }
}
