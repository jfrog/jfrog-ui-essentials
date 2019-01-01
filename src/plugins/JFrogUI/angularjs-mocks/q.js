import Q from 'q'
export class AngularQServiceMock {
    constructor() {
    }

    $get() {
        return {
            defer() {
                return Q.defer();
            }
        };
    }

    errorOnUnhandledRejections() {

    }
}

