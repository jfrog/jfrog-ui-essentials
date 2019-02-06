import {shallowMount} from '@vue/test-utils';
import JfBillboardComponent from './JfBillboardComponent.vue';

describe('JfBillboardComponent', () => {

    it('Contains an element to render graph', () => {
        const wrapper = shallowMount(JfBillboardComponent, {
            propsData: {}
        });
        expect(wrapper.find({ ref: 'chart' }).exists()).toBe(true);
    });
    
    it('contains a prop options', () => {
        const wrapper = shallowMount(JfBillboardComponent, {
            propsData: {
                options: 'chart-data'
            }
        });
        expect(wrapper.props().options).toBe('chart-data');
    });

});
