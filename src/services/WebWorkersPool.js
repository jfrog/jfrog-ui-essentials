export function WebWorkersPool($q) {
    'ngInject';
    return class WebWorkersPool {

        constructor(webworkerPath, poolSize = 10) {
            this.webworkerPath = webworkerPath;
            this.poolSize = poolSize;
//           this.debug();
        }

        debug() {
            this.debugEnabled = true;
            setInterval(() => {
                if (!this.pool) return;
                let size = this.pool.length;
                let free = _.filter(this.pool, {busy: false}).length;
                console.log(`Pool size: ${size}   |   Free workers: ${free}`);
            }, 200)
        }

        open(poolSize) {
            poolSize = poolSize || this.poolSize;
            this.pool = [];
            for (let i = 0; i < poolSize; i++) {
                this.addWorker();
            }
        }

        isOpened() {
            return !!this.pool;
        }

        close() {
            if (!this.pool) return;
            this.pool.forEach(spot => {
                spot.worker.terminate();
            })
            this.pool = null;
        }

        kill(msgMatch = {}) {
            let busySpots = _.filter(this.pool, {busy: true});
            let matchedSpots = _.filter(busySpots, _.isEmpty(msgMatch) ? {} : {msg: msgMatch});
            matchedSpots.forEach(spot => {
                if (this.debugEnabled) console.log('Terminating worker: #' + this.pool.indexOf(spot));
                spot.worker.terminate();
                spot.worker = new Worker(this.webworkerPath);
                spot.busy = false;
                spot.msg = null;
            })
            this.normalizePool();
        }

        normalizePool() {
            while (this.pool.length > this.poolSize) {
                let freeSpot = _.find(this.pool, {busy: false});
                if (freeSpot) this.pool.splice(this.pool.indexOf(freeSpot), 1);
                else break;
            }
        }

        addWorker() {
            let worker = new Worker(this.webworkerPath);
            let poolSpot = {
                worker,
                msg: null,
                busy: false
            }
            this.pool.push(poolSpot);
            return poolSpot;
        }

        send(msg) {
            if (!this.pool) {
                console.error('WebWorkersPool: Must call open() before sending.')
                return;
            }

            let defer = $q.defer();

            let freeSpot = _.find(this.pool, {busy: false});

            if (!freeSpot) {
                freeSpot = this.addWorker();
            }

            freeSpot.worker.onmessage = (e) => {
                defer.resolve(e.data);
                freeSpot.busy = false;
                this.normalizePool();
            }
            freeSpot.worker.onerror = (e) => {
                defer.reject(e);
                freeSpot.busy = false;
                this.normalizePool();
            }

            freeSpot.busy = true;
            freeSpot.msg = msg;
            freeSpot.worker.postMessage(msg);

            return defer.promise;
        }

    }

}