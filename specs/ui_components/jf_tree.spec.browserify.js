'use strict';
describe('unit test: jf_tree directive & JFTreeApi service', function () {

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
    var pane2Items;
    var pane2NodeTexts;
    var qfHighlights;

    var pane2Node = null;

    var simpleTestData;

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
        pane2Items = $('.pane2-container .jf-tree-item');
        pane2NodeTexts = $('.pane2-container .node-text');
        qfHighlights = $('.jf-tree-item .highlight');
    }

    function flushAndApply() {
        try {
            $timeout.flush();
        }
        catch (e) {
        }
        try {
            $scope.$apply();
        }
        catch (e) {
        }

        getElements();
    }

    function compileDirectives(attr, parentElement = null) {
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
        $scope = compileHtml(`<jf-tree ${attributes}></jf-tree>`, {data: attr}, parentElement);
        $scope.$digest();

        getElements();
    }

    function setDataGetters() {
        treeApi.setDataGetters({
            children: node => {
                return node ? _.filter(simpleTestData, {parentId: node.id}) : _.filter(simpleTestData, item => !item.parentId)
            },
            text: node => node.text,
            parent: node => _.find(simpleTestData, {id: node.parentId}),
            uniqueId: node => node.id,
            nodeById: id => $q.when(_.find(simpleTestData, {id})),
            pane: node => !pane2Node || node !== pane2Node ? 'default' : 'pane2'
        });
    }

    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        simpleTestData = [
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
            },
            {
                text: 'Level 3 Item',
                id: 'sub3',
                parentId: 'sub2'
            }
        ]

        testAppScope = $rootScope.$new();
        treeApi = new JFTreeApi(testAppScope);

        treeApi.setNodeTemplate('<div class="node-text">{{node.text}}</div>');

        treeApi.createViewPane('default')
               .setItemsPerPage(10);


        compileDirectives({
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

        expander = $(items[2]).find('.node-expander .action-icon');
        expander.click();

        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(items.length).toEqual(4);
        expect(nodeTexts.length).toEqual(4);
        expect(nodeTexts[3].textContent.trim()).toEqual('Level 3 Item');

    })

    it("should open deep node", (done) => {
        treeApi.on('ready', () => {
            treeApi.openDeepNode(simpleTestData[3]).then(() => {
                getElements();

                expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
                expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

                expect(items.length).toEqual(4);
                expect(nodeTexts.length).toEqual(4);
                expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
                expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
                expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');
                expect(nodeTexts[3].textContent.trim()).toEqual('Level 3 Item');
                done();
            })

        });

        setDataGetters();
        flushAndApply();


    })

    it("should collapse the node, after a second click", () => {
        setDataGetters();
        flushAndApply();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();
        expander.click();
        flushAndApply();

        expect(items.length).toEqual(1);
        expect(nodeTexts.length).toEqual(1);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');

    });

    it("should fire event when clicking an item", (done) => {
        setDataGetters();
        flushAndApply();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        let expectedItems = [simpleTestData[2], simpleTestData[0]];
        let index = 0;
        treeApi.on('item.clicked', item => {
            expect(item).toEqual(expectedItems[index]);
            index++;
            if (index === expectedItems.length) {
                done();
            }
        })
        $(items[2]).click();
        $(items[0]).click();
    });

    it("should work in drill down mode", () => {

        setDataGetters();
        treeApi.setDrillDownMode();
        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();

        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);

        expect(items.length).toEqual(4);
        expect(nodeTexts.length).toEqual(3);
        expect(items[0].textContent.trim()).toEqual('..');
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        expander = $(items[3]).find('.node-expander .action-icon');
        expander.click();

        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(items.length).toEqual(3);
        expect(nodeTexts.length).toEqual(2);
        expect(items[0].textContent.trim()).toEqual('..');
        expect(nodeTexts[0].textContent.trim()).toEqual('Sub Item 2');
        expect(nodeTexts[1].textContent.trim()).toEqual('Level 3 Item');


        //click on '..' - should go one level up
        $(items[0]).click();
        flushAndApply();

        expect(items.length).toEqual(4);
        expect(nodeTexts.length).toEqual(3);
        expect(items[0].textContent.trim()).toEqual('..');
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

    });

    it("should support fuzzy quick find", () => {
        setDataGetters();
        flushAndApply();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        treeApi.quickFind('sub');

        flushAndApply();

        let matches = _.map(treeApi.getQuickFindMatches(),'text');
        expect(matches).toEqual(['Sub Item 1', 'Sub Item 2'])
        expect(qfHighlights.length).toEqual(2);
        expect(qfHighlights[0].textContent.trim()).toEqual('Sub');
        expect(qfHighlights[1].textContent.trim()).toEqual('Sub');

        treeApi.quickFind('i1');

        flushAndApply();

        matches = _.map(treeApi.getQuickFindMatches(),'text');
        expect(matches).toEqual(['Item 1', 'Sub Item 1'])
        expect(qfHighlights.length).toEqual(4);
        expect(qfHighlights[0].textContent.trim()).toEqual('I');
        expect(qfHighlights[1].textContent.trim()).toEqual('1');
        expect(qfHighlights[2].textContent.trim()).toEqual('I');
        expect(qfHighlights[3].textContent.trim()).toEqual('1');

    });

    it("should support filtering", () => {
        setDataGetters();
        flushAndApply();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        treeApi.setFilterCallback(node => {
            return node !== simpleTestData[1];
        })

        treeApi.refreshFilter();

        flushAndApply();

        expect(items.length).toEqual(2);
        expect(nodeTexts.length).toEqual(2);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 2');


        //Now, we'll filter the root node, so it's children should also disappear
        treeApi.setFilterCallback(node => {
            return node !== simpleTestData[0];
        })

        treeApi.refreshFilter();

        flushAndApply();

        expect(items.length).toEqual(0);
        expect(nodeTexts.length).toEqual(0);

    });

    it("should support multi view panes", () => {
        treeApi.createViewPane('pane2');
        setDataGetters();

        flushAndApply();
        let pane2Container = $('<div class="pane2-container"></div>');
        $(document.body).append(pane2Container)
        compileDirectives({api: treeApi, '@viewPaneName': 'pane2'}, pane2Container);


        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        expect(items.length).toEqual(3);
        expect(nodeTexts.length).toEqual(3);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        expect(pane2Items.length).toEqual(0);
        expect(pane2NodeTexts.length).toEqual(0);

        pane2Node = simpleTestData[0];
        treeApi.refreshPaneSelection();

        flushAndApply();

        expect(items.length).toEqual(3);
        expect(nodeTexts.length).toEqual(3);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        expect(pane2Items.length).toEqual(3);
        expect(pane2NodeTexts.length).toEqual(3);
        expect(pane2NodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(pane2NodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(pane2NodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        pane2Node = null; //Must reset single view pane configuration, for following tests
    });

    it("should support custom sorting", () => {
        let revSort = false;
        treeApi.setSortingFunction((a,b) => {
            return a.text > b.text ? (revSort ? -1 : 1) : b.text > a.text ? (revSort ? 1 : -1) : 0;
        })
        setDataGetters();
        flushAndApply();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        revSort = true;
        treeApi.refreshNode(simpleTestData[0]);

        flushAndApply();

        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 2');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 1');

    });

    it("should freeze and unFreeze", (done) => {
        setDataGetters();
        flushAndApply();

        expect(mainTreeElement.length).toEqual(1);
        expect(missingDataGetters.length).toEqual(0);
        expect(emptyTreePlaceholder.length).toEqual(0);
        expect(items.length).toEqual(1);
        expect(nodeTexts.length).toEqual(1);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        treeApi.freeze();
        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();

        flushAndApply();

        expect(items.length).toEqual(1);
        expect(nodeTexts.length).toEqual(1);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        treeApi.unFreeze();
        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(items.length).toEqual(3);
        expect(nodeTexts.length).toEqual(3);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');

        treeApi.freeze();
        treeApi.refreshTree(false, false).then(() => {
            treeApi.unFreeze();
            expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
            expect(items.length).toEqual(3);
            expect(nodeTexts.length).toEqual(3);
            expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
            expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
            expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');
            done();
        })
        flushAndApply();
    });

    it("should switch from drill down mode to regular mode and back", (done) => {

        setDataGetters();
        flushAndApply();

        let expander = $(items[0]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        expander = $(items[2]).find('.node-expander .action-icon');
        expander.click();
        flushAndApply();

        treeApi.selectNode(simpleTestData[3]);
        flushAndApply();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(items.length).toEqual(4);
        expect(nodeTexts.length).toEqual(4);
        expect(nodeTexts[0].textContent.trim()).toEqual('Item 1');
        expect(nodeTexts[1].textContent.trim()).toEqual('Sub Item 1');
        expect(nodeTexts[2].textContent.trim()).toEqual('Sub Item 2');
        expect(nodeTexts[3].textContent.trim()).toEqual('Level 3 Item');

        treeApi.setDrillDownMode().then(() => {
            getElements();

            expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
            expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

            expect(items.length).toEqual(3);
            expect(nodeTexts.length).toEqual(2);
            expect(items[0].textContent.trim()).toEqual('..');
            expect(nodeTexts[0].textContent.trim()).toEqual('Sub Item 2');
            expect(nodeTexts[1].textContent.trim()).toEqual('Level 3 Item');

            done();
        });
        flushAndApply();

    });
});