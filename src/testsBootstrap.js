jest.mock('./set-public-path.js', () => ({
    setPublicPath: jest.fn()
}));

export function testsBootstrap(localVue) {
    window.Vue = localVue;
    const JFrogUI = require('@/plugins/JFrogUI').default;
    const JFrogUIEssentials = require('./index').default;
    JFrogUI.mockAngularJS();
    localVue.use(JFrogUIEssentials);
    localVue.use(JFrogUI, {});

}
