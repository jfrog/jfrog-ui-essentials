import {shallowMount} from '@vue/test-utils';
import JfTabComponent from './JfTabComponent.vue';

describe('JfTabComponent', () => {
    it('', () => {
        const wrapper = shallowMount(JfTabComponent, {
            propsData: {
                name: 'tab1'
            },
            computed: {
                currentTabName() {
                    return 'tab1'
                }
            }
        })
        expect(wrapper.vm.$el).toMatchSnapshot();
    })
})
