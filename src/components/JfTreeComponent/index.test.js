import {mount, createLocalVue} from '@vue/test-utils';
import JfTreeComponent from './index.vue';
import {testsBootstrap} from '@/testsBootstrap';

const localVue = createLocalVue();
testsBootstrap(localVue);

function getElements(wrapper) {
    let elems = {};

    elems.mainTreeElement = wrapper.findAll('.jf-tree');
    elems.missingDataGetters= wrapper.findAll('.missing-data-setters');
    elems.emptyTreePlaceholder= wrapper.findAll('.empty-tree-placeholder');
    elems.items = wrapper.findAll('.jf-tree-item');
    elems.nodeTexts = wrapper.findAll('.node-text');
    elems.pane2Items = wrapper.find('.pane2-container').element ? wrapper.find('.pane2-container').findAll('.jf-tree-item') : [];
    elems.pane2NodeTexts = wrapper.find('.pane2-container').element ? wrapper.find('.pane2-container').findAll('.node-text') : [];
    elems.qfHighlights = wrapper.findAll('.highlight');

    return elems;
}

let JFTreeApi = $jfrog.get('JFTreeApi');
let rootScope = $jfrog.get('$rootScope');
let $q = $jfrog.get('$q');

let testAppScope;
let treeApi;


let simpleTestData;
function initData() {
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
}

function setup(propsData = {}, operations = () => {}) {

    HTMLCanvasElement.prototype.getContext = () => {};

    testAppScope = rootScope.$new();
    treeApi = new JFTreeApi(testAppScope);

    treeApi.setNodeTemplate('<div class="node-text">{{node.text}}</div>');

    treeApi.createViewPane('default')
           .setItemsPerPage(10);

    operations();

    const wrapper = mount(JfTreeComponent, {
        localVue,
        propsData: {
            ...propsData,
            api: treeApi
        }
    });


    let elems = getElements(wrapper);

    return {wrapper, elems};
}

let pane2Node = null;

function setDataDriver() {
    treeApi.setDataDriver({
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

function wait(dur = 0) {
    return new Promise(res => {
        setTimeout(() => res(), dur);
    })
}


describe('JfTreeComponent', () => {

    beforeEach(() => initData());

    test('should show an error if no data getters was set', () => {

        let {elems} = setup()

        expect(elems.mainTreeElement.length).toEqual(1);
        expect(elems.missingDataGetters.length).toEqual(1);
        expect(elems.emptyTreePlaceholder.length).toEqual(0);
        expect(elems.items.length).toEqual(0);
    })

    test('should show empty tree placeholder text', async () => {
        let {elems, wrapper} = setup({}, () => {
            treeApi.setDataDriver({});
        })

        await wait();

        elems = getElements(wrapper);

        expect(elems.mainTreeElement.length).toEqual(1);
        expect(elems.missingDataGetters.length).toEqual(0);
        expect(elems.emptyTreePlaceholder.length).toEqual(1);
        expect(elems.items.length).toEqual(0);
    })

    test('should show root level items', async () => {
        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();

        elems = getElements(wrapper);

        expect(elems.mainTreeElement.length).toEqual(1);
        expect(elems.missingDataGetters.length).toEqual(0);
        expect(elems.emptyTreePlaceholder.length).toEqual(0);

        expect(elems.items.length).toEqual(1);
        expect(elems.nodeTexts.length).toEqual(1);
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');

    })

    test("should show children after pressing parent's expansion icon", async () => {
        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();

        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);

        await wait();

        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).element.textContent.trim()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).element.textContent.trim()).toEqual('Sub Item 2');

        expander = $(elems.items.at(2).element).find('.node-expander .action-icon');
        expander.click();

        await wait();

        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(elems.items.length).toEqual(4);
        expect(elems.nodeTexts.length).toEqual(4);
        expect(elems.nodeTexts.at(3).element.textContent.trim()).toEqual('Level 3 Item');

    })


    test("should open deep node", (done) => {

        let {elems, wrapper} = setup({}, () => {
            treeApi.on('ready', () => {
                treeApi.openDeepNode(simpleTestData[3]).then(() => {
                    elems = getElements(wrapper);

                    expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
                    expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

                    expect(elems.items.length).toEqual(4);
                    expect(elems.nodeTexts.length).toEqual(4);
                    expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');
                    expect(elems.nodeTexts.at(1).element.textContent.trim()).toEqual('Sub Item 1');
                    expect(elems.nodeTexts.at(2).element.textContent.trim()).toEqual('Sub Item 2');
                    expect(elems.nodeTexts.at(3).element.textContent.trim()).toEqual('Level 3 Item');
                    done();
                })

            });

            setDataDriver();
        })

    })

    test("should collapse the node, after a second click", async () => {
        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();

        elems = getElements(wrapper);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();
        await wait();
        expander.click();
        await wait();

        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(1);
        expect(elems.nodeTexts.length).toEqual(1);
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');

    });

    test("should fire event when clicking an item", (done) => {

        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })


        wait().then(() => {
            elems = getElements(wrapper);

            let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
            expander.click();

            wait().then(() => {
                elems = getElements(wrapper);

                let expectedItems = [simpleTestData[2], simpleTestData[0]];
                let index = 0;
                treeApi.on('item.clicked', item => {
                    expect(item).toEqual(expectedItems[index]);
                    index++;
                    if (index === expectedItems.length) {
                        done();
                    }
                })
                $(elems.items.at(2).element).click();
                $(elems.items.at(0).element).click();
            })
        })
    });

    test("should work in drill down mode", async () => {

        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
            treeApi.setDrillDownMode();
        })

        await wait();
        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);

        expect(elems.items.length).toEqual(4);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.items.at(0).element.textContent.trim()).toEqual('..');
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).element.textContent.trim()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).element.textContent.trim()).toEqual('Sub Item 2');

        expander = $(elems.items.at(3).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(2);
        expect(elems.items.at(0).element.textContent.trim()).toEqual('..');
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Sub Item 2');
        expect(elems.nodeTexts.at(1).element.textContent.trim()).toEqual('Level 3 Item');


        //click on '..' - should go one level up
        $(elems.items.at(0).element).click();

        await wait();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(4);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.items.at(0).element.textContent.trim()).toEqual('..');
        expect(elems.nodeTexts.at(0).element.textContent.trim()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).element.textContent.trim()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).element.textContent.trim()).toEqual('Sub Item 2');

    });

    test("should support fuzzy quick find", async () => {

        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();

        treeApi.quickFind('sub');
        await wait();
        elems = getElements(wrapper);

        let matches = _.map(treeApi.getQuickFindMatches(),'text');
        await wait();
        elems = getElements(wrapper);

        expect(matches).toEqual(['Sub Item 1', 'Sub Item 2'])
        expect(elems.qfHighlights.length).toEqual(2);
        expect(elems.qfHighlights.at(0).text()).toEqual('Sub');
        expect(elems.qfHighlights.at(1).text()).toEqual('Sub');

        treeApi.quickFind('i1');

        await wait();
        elems = getElements(wrapper);

        matches = _.map(treeApi.getQuickFindMatches(),'text');
        await wait();
        elems = getElements(wrapper);

        expect(matches).toEqual(['Item 1', 'Sub Item 1'])
        expect(elems.qfHighlights.length).toEqual(4);
        expect(elems.qfHighlights.at(0).text()).toEqual('I');
        expect(elems.qfHighlights.at(1).text()).toEqual('1');
        expect(elems.qfHighlights.at(2).text()).toEqual('I');
        expect(elems.qfHighlights.at(3).text()).toEqual('1');

    });

    test("should support filtering", async () => {
        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        treeApi.setFilterCallback(node => {
            return node !== simpleTestData[1];
        })

        treeApi.refreshFilter();

        await wait();
        wrapper.vm.$forceUpdate();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(2);
        expect(elems.nodeTexts.length).toEqual(2);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 2');


        //Now, we'll filter the root node, so it's children should also disappear
        treeApi.setFilterCallback(node => {
            return node !== simpleTestData[0];
        })

        treeApi.refreshFilter();
        wrapper.vm.$forceUpdate();

        await wait();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(0);
        expect(elems.nodeTexts.length).toEqual(0);

    });

    test("should support multi view panes", async () => {
        let {elems, wrapper} = setup({}, () => {
            treeApi.createViewPane('pane2');
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        let pane2Container = $('<div class="pane2-container"></div>');
        let wrapper2 = mount(JfTreeComponent, {
            localVue,
            propsData: {
                viewPaneName: 'pane2',
                api: treeApi
            }
        });
        pane2Container.append(wrapper2.element);
        $(wrapper.element).append(pane2Container);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');

        expect(elems.pane2Items.length).toEqual(0);
        expect(elems.pane2NodeTexts.length).toEqual(0);

        pane2Node = simpleTestData[0];
        treeApi.refreshPaneSelection();

        await wait();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');

        expect(elems.pane2Items.length).toEqual(3);
        expect(elems.pane2NodeTexts.length).toEqual(3);
        expect(elems.pane2NodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.pane2NodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.pane2NodeTexts.at(2).text()).toEqual('Sub Item 2');

        pane2Node = null; //Must reset single view pane configuration, for following tests
    });

    test("should support custom sorting", async () => {

        let revSort = false;

        let {elems, wrapper} = setup({}, () => {
            treeApi.setSortingFunction((a,b) => {
                return a.text > b.text ? (revSort ? -1 : 1) : b.text > a.text ? (revSort ? 1 : -1) : 0;
            })
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');

        revSort = true;
        treeApi.refreshNode(simpleTestData[0]);


        await wait();
        wrapper.vm.$forceUpdate();
        elems = getElements(wrapper);

        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 2');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 1');

    });

    test("should freeze and unFreeze", async () => {
        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        expect(elems.mainTreeElement.length).toEqual(1);
        expect(elems.missingDataGetters.length).toEqual(0);
        expect(elems.emptyTreePlaceholder.length).toEqual(0);
        expect(elems.items.length).toEqual(1);
        expect(elems.nodeTexts.length).toEqual(1);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        treeApi.freeze();
        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expect(elems.items.length).toEqual(1);
        expect(elems.nodeTexts.length).toEqual(1);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(false);

        treeApi.unFreeze();

        await wait();
        wrapper.vm.$forceUpdate();
        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');

        treeApi.freeze();

        await treeApi.refreshTree(false, false);

        treeApi.unFreeze();
        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(3);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');
    });

    test("should switch from drill down mode to regular mode and back", async () => {

        let {elems, wrapper} = setup({}, () => {
            setDataDriver();
        })

        await wait();
        elems = getElements(wrapper);

        let expander = $(elems.items.at(0).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        expander = $(elems.items.at(2).element).find('.node-expander .action-icon');
        expander.click();

        await wait();
        elems = getElements(wrapper);

        treeApi.selectNode(simpleTestData[3]);

        await wait();
        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(elems.items.length).toEqual(4);
        expect(elems.nodeTexts.length).toEqual(4);
        expect(elems.nodeTexts.at(0).text()).toEqual('Item 1');
        expect(elems.nodeTexts.at(1).text()).toEqual('Sub Item 1');
        expect(elems.nodeTexts.at(2).text()).toEqual('Sub Item 2');
        expect(elems.nodeTexts.at(3).text()).toEqual('Level 3 Item');


        await treeApi.setDrillDownMode();

        wrapper.vm.$forceUpdate();

        elems = getElements(wrapper);

        expect(treeApi.isNodeOpen(simpleTestData[0])).toEqual(true);
        expect(treeApi.isNodeOpen(simpleTestData[2])).toEqual(true);

        expect(elems.items.length).toEqual(3);
        expect(elems.nodeTexts.length).toEqual(2);
        expect(elems.items.at(0).text()).toEqual('..');
        expect(elems.nodeTexts.at(0).text()).toEqual('Sub Item 2');
        expect(elems.nodeTexts.at(1).text()).toEqual('Level 3 Item');

    });

});
