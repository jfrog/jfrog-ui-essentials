import _ from 'lodash';
export function AngularCompileCompServiceMock(template, data = {}, parentComp = null) {
    let props = {};
    let copiedFromParent = {};

    if (parentComp) {
        Object.keys(parentComp.$options.props || {}).forEach(prop => {
            props[prop] = parentComp[prop];
        })
        copiedFromParent = _.pick(parentComp.$options, 'methods', 'components')
    }
    let options = _.extend({}, copiedFromParent, {
        template,
        router: $jfrog.router,
        data() {
            return _.extend({}, props, data);
        }
    });

    let parent = (parentComp || {}).$parent;
    while (parent) {
        _.extend(options.components, parent.$options.components);
        parent = parent.$parent;
    }

    return options;
}
