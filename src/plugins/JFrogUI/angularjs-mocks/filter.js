const Vue = window.Vue;
export function AngularFilterServiceMock(filterName) {
    return Vue.filter(filterName);
}
