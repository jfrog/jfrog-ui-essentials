export class JFrogUIWebWorker {

    constructor($q, JFrogUILibConfig) {
        this.$q = $q;
        this.JFrogUILibConfig = JFrogUILibConfig;
        this.worker = null;
    }

    getPathToWebWorker() {
        return this.JFrogUILibConfig.config.webworkerPath || 'jfrog-ui-essentials.webworker.js';
    }

    check() {
        let defer = this.$q.defer();
        let w = new Worker(this.getPathToWebWorker());
        w.onmessage = (e) => {
            if (e.data === 'OK') defer.resolve();
            else defer.reject();
            w.terminate();
        };
        w.onerror = (e) => {
            defer.reject();
        }

        w.postMessage({cmd: 'testWorker'})

        return defer.promise;
    }

    open() {
        this.worker = new Worker(this.getPathToWebWorker());
    }

    close() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }

    markdownPreview(type, markdown) {

        if (!this.worker) this.open();

        let defer = this.$q.defer();

        this.worker.onmessage = (e) => {
            if (e.data.html) {
                defer.resolve(e.data.html);
            }
            else defer.reject();
        };

        this.worker.onerror = (e) => {
            defer.reject();
        }

        this.worker.postMessage({cmd: 'convertMarkdown', type, markdown});

        return defer.promise;
    }
}