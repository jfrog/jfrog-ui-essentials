class jfBillboardController {
    constructor($element, $timeout, $window, $scope) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.$window = $window;
        this.$scope = $scope;

    }

    $onInit() {
    }


    _generate() {
        if (this.chart) {
            this.chart.destroy();
        }

        this.$timeout(() => {
            // timeout ensures element is sized in DOM before initializing bb
            /* Polyfill for IE 11 which doesnt support Object.assign */
            if (typeof Object.assign != 'function') {
                // Must be writable: true, enumerable: false, configurable: true
                Object.defineProperty(Object, "assign", {
                    value: function assign(target, varArgs) { // .length of function is 2
                        'use strict';
                        if (target == null) { // TypeError if undefined or null
                            throw new TypeError('Cannot convert undefined or null to object');
                        }

                        let to = Object(target);

                        for (let index = 1; index < arguments.length; index++) {
                            let nextSource = arguments[index];

                            if (nextSource != null) { // Skip over if undefined or null
                                for (let nextKey in nextSource) {
                                    // Avoid bugs when hasOwnProperty is shadowed
                                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                        to[nextKey] = nextSource[nextKey];
                                    }
                                }
                            }
                        }
                        return to;
                    },
                    writable: true,
                    configurable: true
                });
            }

            /* End Polyfill for IE 11 which doesnt support Object.assign */

            this.chart = bb.generate(Object.assign(
                {bindto: this.$element[0]},
                this.options
            ));
        })

        this.$window.addEventListener("onorientationchange", () => {
            this.chart.resize();
        });
    }

    $onChanges(changes) {
        if (changes.options && this.chart) {
            this._generate();
        }
    }

    $postLink() {
        this._generate();
    }

    $onDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}

export function jfBillboard() {
    return {
        scope: {
            hideSearch: '@',
            options: '<'
        },
        controller: jfBillboardController,
        controllerAs: 'jfBillboard',
        bindToController: true
    };
}