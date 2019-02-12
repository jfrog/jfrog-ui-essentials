import {shallowMount} from '@vue/test-utils';
import JfGraphsComponent from './index.vue';
import { bb } from 'billboard.js';

// Props data for chart
const options = {
    data: {
        columns: [
            ["data1", 30, 200, 100, 170, 150, 250],
            ["data2", 130, 100, 140, 35, 110, 50]
        ]
    }
}


describe('JfGraphsComponent', () => {

    it('should match the snapshot', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfGraphsComponent, {
            propsData: {
                options
            }
        });
        // mocking the method to generate graph
        const _generate = function () {
            bb.generate(Object.assign({ bindto: wrapper.find({ ref: 'chart' }) }, wrapper.vm.options))
        }
        wrapper.setMethods({ _generate })
        wrapper.vm._generate();

        // to replace auto-generated ids by billboard
        const idValue = new RegExp(`${wrapper.vm.$el.innerHTML.substr(93, 13)}`, "g");       
        expect.addSnapshotSerializer({
            test: (val) => val.innerHTML.replace(idValue, 'test'),
            print: (val) => `${val.innerHTML.replace(idValue, 'test')}`
          })

        expect(wrapper.vm.$el).toMatchSnapshot();
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
