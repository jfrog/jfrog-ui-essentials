module = angular.mock.module;

const handleVirtualScroll = ()=>{
    function mockedGetPage(){
        return this.origArray();
    }

    const jfVscroll = $('jf-vscroll');
    for (let jfVscrollElem of jfVscroll){
        const ctrl = angular.element(jfVscrollElem).controller('jf-vscroll');
        ctrl.getPage = mockedGetPage;
    }

    // flushAndApply();
};

window.compileHtml = function (htmlStr, data, parentElement = null) {
    data = data || {};
    var $scope;
    inject(function ($compile, $rootScope) {
        parentElement = parentElement || document.body;
        angular.element(parentElement).html(htmlStr);
        $scope = $rootScope.$new();
        angular.extend($scope, data);
        $compile(parentElement)($scope);
        $scope.$digest();
    });
    return $scope;
}

window.compileHtmlAndGetElement = function (htmlStr, data, parentElement = null) {
    data = data || {};
    let $scope, $elem;
    inject(function ($compile, $rootScope) {
        // parentElement = parentElement || document.body;
        $elem = angular.element(htmlStr);
        $scope = $rootScope.$new();
        $scope= angular.extend($scope, data);
        $elem = $compile($elem)($scope);
        $scope.$digest();
    });
    return {$scope, $elem};
}

window.compileDirective = function (directive, attr, parentElement = null) {
    let attributes = '';
    for (let key in attr) {
        let kebab = _.kebabCase(key);
        if (key.startsWith('@')) {
            attributes += ` ${kebab}="{{ data['${key}'] }}"`;
        }
        else if (key.startsWith('&')) {
            attributes += ` ${kebab}="data['${key}']()"`;
        }
        else {
            attributes += ` ${kebab}="data.${key}"`;
        }
    }
    let scope = compileHtml(`<${directive} ${attributes}></${directive}>`, {data: attr}, parentElement);
    scope.$digest();

    handleVirtualScroll();
    return scope;
}

window.compileDirectiveAndGetElement = function (directive, attr, parentElement = null) {
    let attributes = '';
    for (let key in attr) {
        let kebab = _.kebabCase(key);
        if (key.startsWith('@')) {
            attributes += ` ${kebab}="{{ data['${key}'] }}"`;
        }
        else if (key.startsWith('&')) {
            attributes += ` ${kebab}="data['${key}']()"`;
        }
        else {
            attributes += ` ${kebab}="data.${key}"`;
        }
    }
    let {$scope, $elem} = compileHtmlAndGetElement(`<${directive} ${attributes}></${directive}>`, {data: attr}, parentElement);
    $scope.$digest();

    handleVirtualScroll();
    return {$scope, $elem};
}


function angularEquality(first, second) {
    return angular.equals(first, second);
}

window.useAngularEquality = function () {
    beforeEach(function () {
        jasmine.addCustomEqualityTester(angularEquality);
    });
}

window.waitForPromise = function () {
    setInterval(() => {
        inject(function ($rootScope) {
            $rootScope.$apply();
        });
    }, 0)
}

if(expect && expect.extend) {
    expect.extend({
        toBeWithinRange(received, floor, ceiling) {
            const pass = received >= floor && received <= ceiling;
            if (pass) {
                return {
                    message: () =>
                        `expected ${received} not to be within range ${floor} - ${ceiling}`,
                    pass: true,
                };
            } else {
                return {
                    message: () =>
                        `expected ${received} to be within range ${floor} - ${ceiling}`,
                    pass: false,
                };
            }
        },
    });
}