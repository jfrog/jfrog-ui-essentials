import {shallowMount} from '@vue/test-utils';
import JfDrawerComponent from './JfDrawerComponent.vue';

describe('JfDrawerComponent', () => {
    it('should set open variable to be true', () => {
        const wrapper = shallowMount(JfDrawerComponent, {
            propsData: {
                openFirst: '0'
            },
            stubs: ['b-collapse', 'b-card']
        });
        expect(wrapper.vm.opened).toBe(true);
    });
});


describe('JfDrawerComponent', () => {
    it('should fireResizeEvent when opened', () => {
        const wrapper = shallowMount(JfDrawerComponent, {
            stubs: ['b-collapse', 'b-card']
        });
        let vm = wrapper.vm;
        vm.utils = {};
        vm.utils.fireResizeEvent = jest.fn();
        vm.onClickHeader();
        expect(vm.utils.fireResizeEvent).toHaveBeenCalled();
    });
});
