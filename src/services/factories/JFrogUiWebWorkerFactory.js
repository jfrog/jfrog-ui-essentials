export function JFrogUIWebWorker() {
    this.$inject('$q', 'JFrogUILibConfig', 'WebWorkersPool');
    'ngInject';
    return class JFrogUIWebWorker {
        constructor() {
            this.$q = this.$q;
            this.JFrogUILibConfig = this.JFrogUILibConfig;
            this.wwPool = new this.WebWorkersPool(this.getPathToWebWorker(), 1);
        }
        getPathToWebWorker() {
            return (this.JFrogUILibConfig.config.webworkersPath || '') + '/jfrog-ui-essentials.webworker.js';
        }

        check() {
            let defer = this.$q.defer();

            if (this.checking) {
                if (!this.pendingCheckDefers)
                    this.pendingCheckDefers = [];
                this.pendingCheckDefers.push(defer);
            } else {
                this.wwPool.open();

                this.checking = true;
                this.wwPool.send({ cmd: 'testWorker' }).then(response => {
                    this.checking = false;
                    if (response === 'OK') {
                        defer.resolve();
                        if (this.pendingCheckDefers) {
                            this.pendingCheckDefers.forEach(d => d.resolve());
                            delete this.pendingCheckDefers;
                        }
                    } else {
                        defer.reject();
                        if (this.pendingCheckDefers) {
                            this.pendingCheckDefers.forEach(d => d.reject());
                            delete this.pendingCheckDefers;
                        }
                    }
                    this.wwPool.close();
                }).catch(e => {
                    this.checking = false;
                    defer.reject();
                    if (this.pendingCheckDefers) {
                        this.pendingCheckDefers.forEach(d => d.reject());
                        delete this.pendingCheckDefers;
                    }
                    this.wwPool.close();
                });
            }

            return defer.promise;
        }

        open(poolSize) {
            this.wwPool.open(poolSize);
        }

        close() {
            this.wwPool.close();
        }

        markupPreview(type, markup, instanceId = 0) {

            if (!this.wwPool.isOpened())
                this.open();

            let defer = this.$q.defer();

            this.wwPool.kill({
                cmd: 'convertMarkup',
                instanceId
            });
            this.wwPool.send({
                cmd: 'convertMarkup',
                instanceId,
                type,
                markup
            }).then(response => {
                if (response.html !== undefined) {
                    defer.resolve(response.html);
                } else
                    defer.reject();
            }).catch(e => {
                defer.reject();
            });

            return defer.promise;
        }

        runFunction(func, ...params) {
            if (!this.wwPool.isOpened())
                this.open();

            let defer = this.$q.defer();

            this.wwPool.send({
                cmd: 'runFunction',
                function: func.toString(),
                params
            }).then(response => {
                defer.resolve(response.response);
            }).catch(e => {
                defer.reject();
            });

            return defer.promise;   

        }
    }   
;
}
