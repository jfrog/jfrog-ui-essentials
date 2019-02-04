import { shallowMount } from '@vue/test-utils'
import JfListMakerComponent from './JfListMakerComponent.vue'

describe('JfListMakerComponent', () => {
    it('renders a form', () => {
        const wrapper = shallowMount(JfListMakerComponent, {
            propsData: {},
            stubs:["jf-field"]
        })
        expect(wrapper.contains('form')).toBe(true);
    })
})
