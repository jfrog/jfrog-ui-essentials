import {items} from './jf_data_list.mock';

describe('unit test: jf_table_view directive & JFTableViewOptions service', () => {

    var $scope;
    var $rootScope;
    var testAppScope;
    var $q;
    var $timeout;
    var JFrogTableViewOptions;
    let $elem;

    const setup = (_$timeout_, _$q_, _$rootScope_) => {
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }

    const compileDirective = (attr) => {
        ({$scope, $elem} = window.compileDirectiveAndGetElement('jf-data-list', attr));
        // = compileResult.$scope;
        // $elem = $(compileResult.elem);
        $scope.$apply();
    }

    beforeEach(angular.mock.module('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        compileDirective({
            items,
        });
    });

    it('should compile', function (done) {
        expect($elem[0].outerHTML).toMatchSnapshot();
        done();
    });


});