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

describe('JfTabsComponent', () => {
    it('All the tabs being rendered', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTabsComponent, {
            propsData,
            localVue,
            mocks: {
                $route,
                $router,
                JFrogEventBus
            },
            methods: {
                _calculateTabsSize: function () {
                    wrapper.vm.tabsVisible = _.take(tabArray, tabArray.length)
                }
            }
        })
        jest.runAllTimers();
        expect(wrapper.findAll('li').length).toBe(tabArray.length + 1)
    });

    it('active tab is pulled from route params', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTabsComponent, {
            propsData,
            localVue,
            mocks: {
                $route,
                $router,
                JFrogEventBus
            },
            methods: {
                _calculateTabsSize: function () {
                    wrapper.vm.tabsVisible = _.take(tabArray, tabArray.length)
                }
            }
        });
        jest.runAllTimers();
        expect(wrapper.vm.currentTab.name).toBe($route.query.activeTab);
    });

    it('when route doesnt have params active tab is set from propsData', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTabsComponent, {
            propsData,
            localVue,
            mocks: {
                $route: {
                    query: {
                        activeTab: null
                    }
                },
                $router,
                JFrogEventBus
            },
            methods: {
                _calculateTabsSize: function () {
                    wrapper.vm.tabsVisible = _.take(tabArray, tabArray.length)
                }
            }
        });
        jest.runAllTimers();
        expect(wrapper.vm.currentTab.name).toBe(wrapper.vm.activeTab);
    });

    it('Renders jf-tab from slot', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTabsComponent, {
            propsData,
            slots: {
                default: '<jf-tab></jf-tab>'
            },
            localVue,
            mocks: {
                $route,
                $router,
                JFrogEventBus
            },
            stubs: {
                JfTab: '<div class="tab-data">Data for the tab</div>'
            }
        });
        jest.runAllTimers();
        expect(wrapper.find('.tab-data').exists()).toBe(true);
    });
})
