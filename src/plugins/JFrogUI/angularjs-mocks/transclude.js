import _ from 'lodash';
import $ from 'jquery';
const Vue = window.Vue;
export class AngularTranscludeServiceMock {
    constructor() {
    }

    $get() {
        let transcludeFn = function AngularTranscludeServiceMock(component, ...args) {
            let cb, scope;
            if (_.isFunction(args[0])) {
                cb = args[0];
            }
            else if (_.isFunction(args[1])) {
                scope = args[0];
                cb = args[1]
            }

            if (cb) {
                let el = document.createElement('div');

                if (scope && scope.$comp !== component.$parent) {
                    console.error('Passing a scope to $transclude is not currently supported!')
                }

                let v = new Vue({
                    el,
                    render(h, context) {
                        return component.$slots.default[0];
                    }
                })
                cb($(v.$el));
            }
        };

        transcludeFn.isSlotFilled = (slotName) => {
            return !!transcludeFn.$comp.$slots[_.kebabCase(slotName)];
        }

        return transcludeFn;
    }
}

