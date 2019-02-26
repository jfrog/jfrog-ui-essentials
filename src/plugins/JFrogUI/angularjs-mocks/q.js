import Q from 'q'
export class AngularQServiceMock {
    constructor() {
    }

    $get() {
        return {
            defer() {
                return Q.defer();
            },
            when(...args) {
                return Q.when(...args)
            }
        };
    }

    errorOnUnhandledRejections() {

    }
}

