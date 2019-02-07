import $ from 'jquery';
import _ from 'lodash';
const Vue = window.Vue;

export class Ng1AttributeDirectiveAdapter {
    static patchLinkFunction(linkFn, scopeDef) {

        return function(el, binding, vnode) {
            let scope;
            if (scopeDef) {
                scope = {};
                _.entries(scopeDef).forEach(entry => {
                    if (entry[0] === _.camelCase(binding.name)) {
                        if (entry[1] === '=' || binding.modifiers.bind) {
                            Object.defineProperty(scope, entry[0], {
                                get() {
                                    return _.get(vnode.context, binding.expression);
                                }
                            })
                        }
                        else {
                            scope[entry[0]] = binding.expression;
                        }
                    }
                    else {
                        Object.defineProperty(scope, entry[0], {
                            get() {
                                if (entry[1] === '=') {
                                    return _.get(vnode.context, el.attributes.getNamedItem(_.kebabCase(entry[0])).value);
                                }
                                else {
                                    let ni = el.attributes.getNamedItem(_.kebabCase(entry[0]));
                                    return ni ? ni.value : null;
                                }
                            }
                        })
                    }
                })
            }
            else {
                scope = vnode.context.$data;
            }

            let thisObj = {
                $inject: (...injections) => {
                    Vue.prototype.$jfrog.injectOn(thisObj, ...injections);
                }
            }
            let bindedFn = linkFn.bind(thisObj);

            let attrs = {};
            if (binding.modifiers.bind) {
                Object.defineProperty(attrs, _.camelCase(binding.name), {
                    get() {
                        if (!_.isFunction(binding.value)) {
                            return _.get(vnode.context, _.trim(binding.expression, '\''));
                        }
                        else {
                            return binding.value();
                        }
                    }
                })
            }
            else {
                attrs[_.camelCase(binding.name)] = _.trim(binding.expression, '\'');
            }

            _.values(el.attributes).forEach(attr => {
                Object.defineProperty(attrs, _.camelCase(attr.name), {
                    get() {
                        return attr.value;
                    }
                })
            });

            attrs.$observe = (path, cb) => {
                if (path === _.camelCase(binding.name)) {
                    vnode.context.$watch(!_.isFunction(binding.value) ? binding.expression : binding.value, () => {
                        cb(_.get(vnode.context, _.trim(binding.expression, '\'')))
                    })
                }
                else {
                    console.error('!!!!!!!!')
                }
            }

            bindedFn(scope, $(el), attrs);

        }

    }
}
