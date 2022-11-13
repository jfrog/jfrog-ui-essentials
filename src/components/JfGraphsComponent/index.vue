<template>

    <div ref="chart"></div>

</template>

<script>
    import { bb } from 'billboard.js';
    require('billboard.js/dist/billboard.min.css');

    export default {
        name: 'jf-graphs',
        props: [
            'hideSearch',
            'options'
        ],
        data() {
            return {};
        },
        mounted() {
            this._generate();
        },
        methods: {
            _generate() {
                if (this.chart) {
                    this.chart.destroy();
                }

                /* Polyfill for IE 11 which doesnt support Object.assign */
                if (typeof Object.assign != 'function') {
                    // Must be writable: true, enumerable: false, configurable: true
                    Object.defineProperty(Object, 'assign', {
                        value: function assign(target, varArgs) {
                            // .length of function is 2
                            'use strict';
                            if (target == null) {
                                // TypeError if undefined or null
                                throw new TypeError('Cannot convert undefined or null to object');
                            }

                            let to = Object(target);

                            for (let index = 1; index < arguments.length; index++) {
                                let nextSource = arguments[index];

                                if (nextSource != null) {
                                    // Skip over if undefined or null
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

                this.chart = bb.generate(Object.assign({ bindto: this.$refs.chart }, this.options));

                window.addEventListener('onorientationchange', () => {
                    this.chart.resize();
                });
            },
        },
        updated() {
            if (this.chart) {
                this._generate();
            }
        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.destroy();
            }
        }
    }

</script>

<style scoped lang="less">


</style>
