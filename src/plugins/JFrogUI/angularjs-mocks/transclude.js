import isFunction from 'lodash/isFunction';
import kebabCase from 'lodash/kebabCase';
import $ from 'jquery';
import {VueFactory} from "../../../services/VueFactory";

export class AngularTranscludeServiceMock {
    constructor() {
    }

    $get() {
        let transcludeFn = function AngularTranscludeServiceMock(component, ...args) {
            let cb, scope;
            if (isFunction(args[0])) {
                cb = args[0];
            } else if (isFunction(args[1])) {
                scope = args[0];
                cb = args[1]
            }

            if (cb) {
                let el = document.createElement('div');

                if (scope && scope.$comp !== component.$parent) {
                    console.error('Passing a scope to $transclude is not currently supported!')
                }
                const { Vue } = VueFactory.getInstance();
                let v = new Vue({
                    el,
                    render(h, context) {
                        return component.$slots.default[0];
                    }
                })
                cb($(v.$el), v);
            }
        };

        transcludeFn.isSlotFilled = (slotName) => {
            return !!transcludeFn.$comp.$slots[kebabCase(slotName)];
        }

        return transcludeFn;
    }
}

