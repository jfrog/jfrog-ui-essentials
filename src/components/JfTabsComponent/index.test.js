import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import JfTabsComponent from './index.vue';

/* Stubs custom directive */
const localVue = createLocalVue();
localVue.directive('click-outside', {
    bind: function () {}
});
localVue.directive('jf-tooltip-on-overflow', {
    bind: jest.fn()
})

// Props data 
const tabArray = [
    { name: 'tab1' },
    { name: 'tab2' },
    { name: 'tab3' }
];
const activeTab = 'tab2';
const dict = {
    tab1: 'Tab 1',
    tab2: 'Tab 2',
    tab3: 'Tab 3'
}

const propsData = {
    tabs: tabArray,
    activeTab: activeTab,
    dictionary: dict,
    containerMargin: '5'
}

//Mocks for DI
const JFrogEventBus =  {
    getEventsDefinition: jest.fn(function () {
        const TABS_REFRESH = 'test'
        return {
            TABS_REFRESH
        }
    }),
    registerOnScope: jest.fn()
}             

// Mocking route
const $route = {
    query: {
        activeTab: 'tab1'
    }
}
const $router = {
    replace: jest.fn()
}

// mount component
const mountComponent = function ( props ){
    let options = {
        localVue,
        propsData,
        mocks: {
            $route,
            $router,
            JFrogEventBus
        },
        methods: {
            _calculateTabsSize: function () {
                this.tabsVisible = _.take(tabArray, tabArray.length)
            }
        }
    }
    // additional value to be mounted
    if (props) {
        if(props.slotValue) Object.assign(options, props.slotValue)
        if (props.stubValue) Object.assign(options, props.stubValue)   
        if (props.routeValue == 'tobenull') {
            options.mocks.$route.query.activeTab = null
        }
    }
    return shallowMount(JfTabsComponent, options);
}

describe('JfTabsComponent', () => {

    let wrapper;    
    it('All the tabs being rendered', () => {
        jest.useFakeTimers();
        wrapper = mountComponent();
        jest.runAllTimers();
        expect(wrapper.findAll('li').length).toBe(tabArray.length + 1)
    });
    
    it('active tab is pulled from route params', () => {
        jest.useFakeTimers();
        wrapper = mountComponent();
        jest.runAllTimers();
        expect(wrapper.vm.currentTab.name).toBe($route.query.activeTab);
    });
    
    it('when route doesnt have params active tab is set from propsData', () => {
        jest.useFakeTimers();
        wrapper = mountComponent({
            routeValue: 'tobenull'
        })
        jest.runAllTimers();
        expect(wrapper.vm.currentTab.name).toBe(wrapper.vm.activeTab);
    });
    
    it('Renders jf-tab from slot', () => {
        jest.useFakeTimers();
        wrapper = mountComponent({
            slotValue: {
                slots: {
                    default: '<jf-tab></jf-tab>'
                }
            },
            stubValue: {
                stubs: {
                    JfTab: '<div class="tab-data">Data for the tab</div>'
                }
            }
        })
        jest.runAllTimers();
        expect(wrapper.find('.tab-data').exists()).toBe(true);
    });
})
