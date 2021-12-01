import {VueFactory} from "../services/VueFactory";
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';
export const install = () => {
    const { Vue } = VueFactory.getInstance();

    const ng1LinkFunction = ($scope, ele, attrs) => {
        const injections = $jfrog.get(['$compile']);
        $scope.$watch(attrs.jfDynamicTemplate, function (html) {
            ele.html(html);
            injections.$compile(ele.contents())($scope);
        });
    }

    Vue.directive('jf-dynamic-template', {
        bind: function (el, binding, vnode) {
            let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
            patchedLinkFn(el, binding, vnode);
        }
    })
}




