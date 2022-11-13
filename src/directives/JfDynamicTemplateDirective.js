import { Ng1AttributeDirectiveAdapter } from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

const ng1LinkFunction = ($scope, ele, attrs) => {
    const injections = $jfrog.get(['$compile']);
    $scope.$watch(attrs.jfDynamicTemplate, function (html) {
        ele.html(html);
        injections.$compile(ele.contents())($scope);
    });
};

export default {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(
            ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    },
};




