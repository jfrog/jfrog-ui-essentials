import {items} from './jf_data_list.mock';

describe('unit test: jf_table_view directive & JFTableViewOptions service', () => {

    var $scope;
    var $rootScope;
    var $q;
    var $timeout;
    let $elem;

    const setup = (_$timeout_, _$q_, _$rootScope_) => {
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }

    const compileDirective = (attr) => {
        ({$scope, $elem} = window.compileDirectiveAndGetElement('jf-data-list', attr));
    }

    beforeEach(angular.mock.module('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        compileDirective({
            items,
        });
    });

    it('should $elem be compiled', function () {
        expect($elem.html().length).toBeGreaterThan(0);
    });

});