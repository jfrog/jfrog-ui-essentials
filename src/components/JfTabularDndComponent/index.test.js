import {mount, createLocalVue} from '@vue/test-utils';
import JfTabularDnsComponent from './index.vue';
import {testsBootstrap} from '@/testsBootstrap';

const localVue = createLocalVue();
testsBootstrap(localVue);

function getElements(wrapper) {
    let elems = {};

    elems.container = wrapper.findAll('.jf-tabular-dnd');
    elems.availableRowElements = wrapper.findAll('.available-table .jf-table-row:not(.headers)');
    elems.selectedRowElements = wrapper.findAll('.selected-table .jf-table-row:not(.headers)');

    elems.excludeAllButton = wrapper.findAll('.dnd-actions span.dnd-exclude-all');
    elems.includeAllButton = wrapper.findAll('.dnd-actions span.dnd-include-all');
    elems.excludeSelectedButton = wrapper.findAll('.dnd-actions span.dnd-exclude-selected');
    elems.includeSelectedButton = wrapper.findAll('.dnd-actions span.dnd-include-selected');

    elems.availableSelectionButtons = wrapper.findAll('.available-table .selection-button');
    elems.selectedSelectionButtons = wrapper.findAll('.selected-table .selection-button');

    elems.availableFilterInput = wrapper.findAll('.available-table .jf-table-filter input');
    elems.selectedFilterInput = wrapper.findAll('.selected-table .jf-table-filter input');

    return elems;
}


function setup(propsData = {}, operations = () => {}) {

    operations();

    const wrapper = mount(JfTreeComponent, {
        localVue,
        propsData: {
            ...propsData
        }
    });


    let elems = getElements(wrapper);

    return {wrapper, elems};
}

function wait(dur = 0) {
    return new Promise(res => {
        setTimeout(() => res(), dur);
    })
}

let availableItems;
let selectedItems;
let columns;

function setData() {
    availableItems = [];
    selectedItems = [];
    for (var i = 0; i < 4; i++) {
        availableItems.push({
            name: 'Item ' + (i+1),
            numeric: Math.round(100*Math.random()),
            active: Math.random() < .4
        })
    }
    columns = [
        {
            header: "Name",
            field: "name",
            width: "50%",
        },
        {
            header: "Number",
            field: "numeric",
            width: "50%",
        }
    ]
}

describe('JfTabularDndComponent', () => {

    beforeEach(() => setData());

    test('', () => {})


});
