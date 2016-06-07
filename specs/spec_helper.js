window.m = angular.mock.module;
window.compileHtml = function(htmlStr, data) {
    data = data || {};
    var $scope;
    inject(function($compile, $rootScope) {
      angular.element(document.body).html(htmlStr);
      $scope = $rootScope.$new();
      angular.extend($scope, data);
      $compile(document.body)($scope);
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