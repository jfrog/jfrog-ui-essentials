(function () {
    'use strict';

    angular.module('plunker', ['ae-datetimepicker'])
        .controller('controller', [function () {
            var vm = this;

            vm.date = undefined;
            vm.options = {format: 'YYYY/MM/DD HH:mm', showClear: true};

            vm.getTime = function () {
                if (!!vm.date) {
                    alert('Selected time is:' + vm.date.format('YYYY/MM/DD HH:mm'));
                } else {
                    alert('Set the date first!');
                }
            };

            vm.clearTime = function () {
                vm.date = undefined;
            };
        }]);
})();