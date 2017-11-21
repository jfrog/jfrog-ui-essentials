'use strict';
fdescribe('unit test: jf_tree directive & JFTreeApi service', function () {

    var $scope;
    var $rootScope;
    var testAppScope;
    var $q;
    var $timeout;
    var JFTreeApi;
    var treeApi;

    var mainTreeElement;
    var missingDataGetters;
    var emptyTreePlaceholder;
    var items;
    var nodeTexts;

    let simpleTestData = [
        {
            text: 'Item 1',
            id: 'item1',
        },
        {
            text: 'Sub Item 1',
            id: 'sub1',
            parentId: 'item1'
        },
        {
            text: 'Sub Item 2',
            id: 'sub2',
            parentId: 'item1'
        }
    ]

    function setup(_$timeout_, _JFTreeApi_, _$q_, _$rootScope_) {
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        JFTreeApi = _JFTreeApi_;
    }

    function getElements() {
        mainTreeElement = $('.jf-tree');
        missingDataGetters= $('.missing-data-setters');
        emptyTreePlaceholder= $('.empty-tree-placeholder');
        items = $('.jf-tree-item');
        nodeTexts = $('.node-text');
    }

    function flushAndApply() {
        try {
            $timeout.flush();
        }
        catch (e) {
        }

        $scope.$apply();
        getElements();
    }

    function compileDirective(attr) {
        let attributes = '';
        for (let key in attr) {
            let kebab = _.kebabCase(key);
            if (key.startsWith('@')) {
                attributes += ` ${kebab}="{{ data['${key}'] }}"`;
            }
            else {
                attributes += ` ${kebab}="data.${key}"`;
            }
        }
        $scope = compileHtml(`<jf-tree ${attributes}></jf-tree>`, {data: attr});
        $scope.$digest();

        getElements();
    }

    function setDataGetters() {
        treeApi.setDataGetters({
            children: node => {
                return node ? _.filter(simpleTestData, {parentId: node.id}) : _.filter(simpleTestData, item => !item.parentId)
            }
        });
    }

    beforeEach(function () {
        jasmine.addMatchers({
            toDeepEqual: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        var result = {};
                        result.pass = _.isEqual(actual, expected);
                        return result;
                    }
                }
            }
        });
    });

    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        testAppScope = $rootScope.$new();
        treeApi = new JFTreeApi(testAppScope);

        treeApi.setNodeTemplate('<div class="node-text">{{node.data.text}}</div>');

        treeApi.createViewPane('default')
               .setItemsPerPage(10);


        compileDirective({
            api: treeApi
        });
    })

    it('should show an error if no data getters was set', () => {
        expect(mainTreeElement.length).toEqual(1);
        expect(missingDataGetters.length).toEqual(1);
        expect(emptyTreePlaceholder.length).toEqual(0);
        expect(items.length).toEqual(0);
    })

    it('should show empty tree placeholder text', () => {
        treeApi.setDataGetters({});
        flushAndApply();

        expect(mainTreeElement.length).toEqual(1);
        expect(missingDataGetters.length).toEqual(0);
        expect(emptyTreePlaceholder.length).toEqual(1);
        expect(items.length).toEqual(0);
    })

    it('should show root level items', () => {
        setDataGetters();
        flushAndApply();

        expect(mainTreeElement.length).toEqual(1);
        expect(missingDataGetters.length).toEqual(0);
        expect(emptyTreePlaceholder.length).toEqual(0);

        expect(items.length).toEqual(1);
        expect(nodeTexts.length).toEqual(1);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');

    })

    it("should show children after pressing parent's expansion icon", () => {
        setDataGetters();
        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();

        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);

        expect(items.length).toEqual(3);
        expect(nodeTexts.length).toEqual(3);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

    })
});