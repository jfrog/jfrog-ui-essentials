import $ from 'jquery';
import { entries, values, camelCase, kebabCase, get, isFunction, trim } from 'lodash';
import {VueFactory} from "../../services/VueFactory";

export class Ng1AttributeDirectiveAdapter {
    static patchLinkFunction(linkFn, scopeDef) {
        const { Vue } = VueFactory.getInstance();

        return function(el, binding, vnode) {
            let scope;
            if (scopeDef) {
                scope = {};
                entries(scopeDef).forEach(entry => {
                    if (entry[0] === camelCase(binding.name)) {
                        if (entry[1] === '=' || binding.modifiers.bind) {
                            Object.defineProperty(scope, entry[0], {
                                get() {
                                    return get(vnode.context, binding.expression);
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
                                    return get(vnode.context, el.attributes.getNamedItem(kebabCase(entry[0])).value);
                                }
                                else {
                                    let ni = el.attributes.getNamedItem(kebabCase(entry[0]));
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
                Object.defineProperty(attrs, camelCase(binding.name), {
                    get() {
                        if (!isFunction(binding.value)) {
                            return get(vnode.context, trim(binding.expression, '\''));
                        }
                        else {
                            return binding.value();
                        }
                    }
                })
            }
            else {
                attrs[camelCase(binding.name)] = trim(binding.expression, '\'');
            }

            values(el.attributes).forEach(attr => {
                Object.defineProperty(attrs, camelCase(attr.name), {
                    get() {
                        return attr.value;
                    }
                })
            });

            attrs.$observe = (path, cb) => {
                if (path === camelCase(binding.name)) {
                    vnode.context.$watch(!isFunction(binding.value) ? binding.expression : binding.value, () => {
                        if (get(vnode.context, trim(binding.expression, '\''))) {
                            cb(get(vnode.context, trim(binding.expression, '\'')));
                        }
                        else if (isFunction(binding.value)) {
                            cb(binding.value())
                        }
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
