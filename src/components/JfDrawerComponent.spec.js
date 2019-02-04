import {shallowMount} from '@vue/test-utils';
import JfDrawerComponent from './JfDrawerComponent.vue';

const createDrawerWrapper = options => {
    return shallowMount(JfDrawerComponent, {
        ...options,
        stubs: ['b-collapse', 'b-card']
    });
};

describe('JfDrawerComponent', () => {

    it('should set open variable to be true', () => {
        const wrapper = createDrawerWrapper({
            propsData: {
                openFirst: '0'
            }
        });
        expect(wrapper.vm.opened).toBe(true);
    });

    it('should fireResizeEvent when opened', () => {
        const wrapper = createDrawerWrapper();
        let vm = wrapper.vm;
        vm.utils = {};
        vm.utils.fireResizeEvent = jest.fn();
        const drawerHeaderElement = wrapper.find('.drawer-header');
        drawerHeaderElement.trigger('click');
        expect(vm.utils.fireResizeEvent).toHaveBeenCalled();
    });
});
