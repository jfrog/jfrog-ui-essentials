window.m = angular.mock.module;
window.compileHtml = function(htmlStr, data, parentElement = null) {
    data = data || {};
    var $scope;
    inject(function($compile, $rootScope) {
        parentElement = parentElement || document.body;
        angular.element(parentElement).html(htmlStr);
        $scope = $rootScope.$new();
        angular.extend($scope, data);
        $compile(parentElement)($scope);
        $scope.$digest();
    });
    return $scope;
}

function angularEquality(first, second) {
  return angular.equals(first, second);
}

window.useAngularEquality = function() {
    beforeEach(function() {
      jasmine.addCustomEqualityTester(angularEquality);
    });
}

window.waitForPromise = function() {
    setInterval(()=>{
        inject(function($rootScope) {
            $rootScope.$apply();
        });
    },0)
}