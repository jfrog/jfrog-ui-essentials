(function () {
    'use strict';

    angular.module('plunker', ['ae-datetimepicker'])
        .controller('controller', [function () {
            var vm = this;

            vm.options = {
                format: 'MM/DD/YYYY HH:mm',
                useCurrent: false
            };
        }]);


    angular
        .module('plunker')
        .directive('validateBefore', validateBefore);

    angular
        .module('plunker')
        .directive('validateAfter', validateAfter);


    function validateBefore() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, $element, $attrs, ngModel) {
                ngModel.$validators.validateBefore = function (modelValue) {
                    var compareTo = $scope.$eval($attrs.validateBefore).$viewValue;
                    if (!!modelValue) {
                        return modelValue.isBefore(compareTo);
                    } else {
                        return true;
                    }
                };
            }
        };
    }

    function validateAfter() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, $element, $attrs, ngModel) {
                ngModel.$validators.validateAfter = function (modelValue) {
                    var compareTo = $scope.$eval($attrs.validateAfter).$viewValue;
                    if (!!modelValue) {
                        return modelValue.isAfter(compareTo);
                    } else {
                        return true;
                    }
                };
            }
        };
    }
})();