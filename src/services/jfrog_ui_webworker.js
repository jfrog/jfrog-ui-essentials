export class JFrogUIWebWorker {

    constructor($q, JFrogUILibConfig, WebWorkersPool) {
        this.$q = $q;
        this.JFrogUILibConfig = JFrogUILibConfig;
        this.wwPool  = new WebWorkersPool(this.getPathToWebWorker(), 1);
    }

    getPathToWebWorker() {
        return (this.JFrogUILibConfig.config.webworkersPath || '') + '/jfrog-ui-essentials.webworker.js';
    }

    check() {
        let defer = this.$q.defer();

        this.wwPool.open();

        this.wwPool.send({cmd: 'testWorker'})
            .then(response => {
                if (response === 'OK') defer.resolve();
                else defer.reject();
                this.wwPool.close();
            })
            .catch(e => {
                defer.reject();
                this.wwPool.close();
            }
        );

        return defer.promise;
    }

    open(poolSize) {
        this.wwPool.open(poolSize);
    }

    close() {
        this.wwPool.close();
    }

    markdownPreview(type, markdown) {

        if (!this.wwPool.isOpened()) this.open();

        let defer = this.$q.defer();

        this.wwPool.kill({cmd: 'convertMarkdown'});
        this.wwPool.send({cmd: 'convertMarkdown', type, markdown})
            .then(response => {
                if (response.html) {
                    defer.resolve(response.html);
                }
                else defer.reject();
            })
            .catch(e => {
                defer.reject();
            }
        );

        return defer.promise;
    }

    runFunction(func, ...params) {
        if (!this.wwPool.isOpened()) this.open();

        let defer = this.$q.defer();

        this.wwPool.send({cmd: 'runFunction', function: func.toString(), params})
            .then(response => {
                defer.resolve(response.response);
            })
            .catch(e => {
                defer.reject();
            }
        );

        return defer.promise;

    }
}