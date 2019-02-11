import {shallowMount} from '@vue/test-utils';
import JfGraphsComponent from './index.vue';

describe('JfGraphsComponent', () => {

    it('should match the snapshot', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfGraphsComponent, {
            propsData: {
                options: {
                    data: {
                        type: "bar",
                        columns: [
                            ["data1", 30, 200, 100, 170, 150, 250],
                            ["data2", 130, 100, 140, 35, 110, 50]
                        ]
                    }
                }
            },
            mocks: {
            }
        });
        // jest.runAllTimers();
        expect(wrapper.vm.$el).toMatchSnapshot()
    });

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
