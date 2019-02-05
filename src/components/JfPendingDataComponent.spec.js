import {shallowMount} from '@vue/test-utils';
import JfPendingDataComponent from './JfPendingDataComponent.vue';

describe('JfPendingDataComponent', () => {

    it('contains the element spinner', () => {
        const wrapper = shallowMount(JfPendingDataComponent, {
            propsData: {}
        });
        expect(wrapper.contains('.spinner-msg-local')).toBe(true);
    });

    it('check slots working fine', () => {
        const wrapper = shallowMount(JfPendingDataComponent, {
            propsData: {
                waitFor: true
            },
            slots: {
                default: '<div class="slot-test"></div>'
            }
        });
        expect(wrapper.findAll('.slot-test').length).toBe(1);
    });

    it('props data waitFor', () => {
        const wrapper = shallowMount(JfPendingDataComponent, {
            propsData: {
                waitFor: true
            }
        });
        expect(wrapper.props().waitFor).toBe(true);
    });

    it('check showSpinner value change on time out', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfPendingDataComponent, {
            propsData: {
                delaySpinner: '100'
            }
        })
        expect(wrapper.find('.icon-hourglass-local').exists()).toBe(false);
        jest.runAllTimers();
        expect(wrapper.find('.icon-hourglass-local').exists()).toBe(true);
    });
});
