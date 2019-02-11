import {shallowMount} from '@vue/test-utils';
import JfGraphsComponent from './JfGraphsComponent.vue';

describe('JfGraphsComponent', () => {

    it('Contains an element to render graph', () => {
        const wrapper = shallowMount(JfGraphsComponent, {
            propsData: {}
        });
        expect(wrapper.find({ ref: 'chart' }).exists()).toBe(true);
    });

    it('contains a prop options', () => {
        const wrapper = shallowMount(JfGraphsComponent, {
            propsData: {
                options: 'chart-data'
            }
        });
        expect(wrapper.props().options).toBe('chart-data');
    });

});
