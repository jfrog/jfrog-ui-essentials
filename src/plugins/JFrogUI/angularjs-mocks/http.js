import _ from 'lodash';
import axios from 'axios';
export class AngularHttpProviderMock {
    constructor() {
        this.interceptors = [];
    }

    $get() {
        return this;
    }


}
