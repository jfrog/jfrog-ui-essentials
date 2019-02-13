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
