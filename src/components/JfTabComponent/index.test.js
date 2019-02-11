import {shallowMount} from '@vue/test-utils';
import JfTabComponent from './index.vue';

// Tab name and value variables
const tabValue = 'tab1';
const tabData = "Esse pariatur aliqua ad laboris eiusmod minim."

describe('JfTabComponent', () => {
    it('tab is rendered when values are same', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTabComponent, {
            propsData: {
                name: tabValue
            },
            computed: {
                currentTabName() {
                    return tabValue;
                }
            },
            slots: {
                default: `<div class="slot-test">${tabData}</div>`
            }
        })
        expect(wrapper.find('.slot-test').text()).toBe(tabData);
    })
})
