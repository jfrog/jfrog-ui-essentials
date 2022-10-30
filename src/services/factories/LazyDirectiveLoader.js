const DIRECTIVE_HOOKS = ['bind', 'inserted', 'update', 'componentUpdated', 'unbind'];

export const lazyDirective = (directivePromiseFactory) => {
    let promise;

    return DIRECTIVE_HOOKS.reduce((acc, hook) => {
        acc[hook] = async (...args) => {
            if (!promise) promise = directivePromiseFactory()

            let directive = await promise;

            if (directive.default) directive = directive.default;
            if (!directive[hook]) return;

            return directive[hook].apply(null, args);
        };

        return acc;
    }, {});
};
