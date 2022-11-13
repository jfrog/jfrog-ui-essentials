import pick from 'lodash/pick';
import extend from 'lodash/extend';
export function AngularCompileCompServiceMock(template, data = {}, parentComp = null) {
    let props = {};
    let copiedFromParent = {};

    if (parentComp) {
        Object.keys(parentComp.$options.props || {}).forEach(prop => {
            props[prop] = parentComp[prop];
        })
        copiedFromParent = pick(parentComp.$options, 'methods', 'components')
    }
    let options = extend({}, copiedFromParent, {
        template,
        router: $jfrog.router,
        data() {
            return extend({}, props, data);
        }
    });

    let parent = (parentComp || {}).$parent;
    while (parent) {
        extend(options.components, parent.$options.components);
        parent = parent.$parent;
    }

    return options;
}
