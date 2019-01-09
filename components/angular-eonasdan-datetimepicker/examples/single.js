(function () {
    'use strict';

    angular.module('plunker', ['ae-datetimepicker'])
        .controller('controller', ['$timeout', function ($timeout) {
            var vm = this;

            $timeout(function() { // simulating a REST API Call that takes 500 ms
                vm.date = moment('2015-11-20T22:10Z');
            }, 500);

            vm.options = {format: 'YYYY/MM/DD HH:mm', showClear: true};

            vm.getTime = function () {
                alert('Selected time is:' + vm.date.format('YYYY/MM/DD HH:mm'));
            };

            vm.addTime = function (val, selector) {
                vm.date = moment(vm.date.add(val, selector));
            };

            vm.clearTime = function () {
                vm.date = undefined;
            };
        }]);
})();