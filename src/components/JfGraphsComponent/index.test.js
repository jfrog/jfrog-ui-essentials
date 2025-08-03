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
    // Mock getBBox for SVG elements in Jest
    beforeAll(() => {
        Object.defineProperty(SVGElement.prototype, 'getBBox', {
            value: jest.fn().mockReturnValue({
                width: 100,
                height: 100,
                x: 0,
                y: 0
            }),
            writable: true
        });
    });
    // Mock getBoundingClientRect with toJSON method
    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
        value: jest.fn().mockReturnValue({
            width: 100,
            height: 100,
            top: 0,
            left: 0,
            bottom: 100,
            right: 100,
            x: 0,
            y: 0,
            toJSON: jest.fn().mockReturnValue({
                width: 100,
                height: 100,
                top: 0,
                left: 0,
                bottom: 100,
                right: 100,
                x: 0,
                y: 0
            })
        }),
        writable: true
    });
    it('should match the snapshot', () => {
        const wrapper = shallowMount(JfGraphsComponent, {
            propsData: {
                options
            }
        });

        /* replacing auto-generated ids by billboard */

        // get the id value generated and replacing it with empty string
        const idValue = new RegExp(`${wrapper.vm.$el.innerHTML.substr(93, 13)}`, "g");
        expect.addSnapshotSerializer({
            test: (val) => val.innerHTML.replace(idValue, ''),
            print: (val) => `${val.innerHTML.replace(idValue, '')}`
          })

        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});
