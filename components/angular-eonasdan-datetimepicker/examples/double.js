(function () {
    'use strict';

    angular.module('plunker', ['ae-datetimepicker'])
        .controller('controller', ['$timeout', function ($timeout) {
            var vm = this;

            vm.dateFrom = moment('2015-11-18T00:00Z');
            vm.dateTo = moment('2015-11-20T00:00Z');

            vm.optionsFrom = {format: 'DD.MM.YYYY'};
            vm.optionsTo = {format: 'DD.MM.YYYY'};

            $timeout(function () {
                vm.optionsTo.minDate = vm.dateFrom;
                vm.optionsFrom.maxDate = vm.dateTo;
            });

            vm.print = function () {
                console.log('vm.dateTo: ' + vm.dateTo.format('YYYY/MM/DD'));
                console.log('vm.optionsTo: ' + angular.toJson(vm.optionsTo));
                console.log('vm.dateFrom: ' + vm.dateFrom.format('YYYY/MM/DD'));
                console.log('vm.optionsFrom: ' + angular.toJson(vm.optionsFrom));
            };

        }]);
})();
