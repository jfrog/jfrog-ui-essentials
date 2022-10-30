export class AngularHttpProviderMock {
    constructor() {
        this.interceptors = [];
    }

    $get() {
        return this;
    }


}
