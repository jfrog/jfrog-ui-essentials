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
    it('renders a + button to add new elements to the list', () => {
        const wrapper = shallowMount(JfListMakerComponent, {
            propsData: {},
            stubs:["jf-field"]
        });
        expect(wrapper.contains('i.icon.icon-new')).toBe(true);
    })
    it('The + button is disabled by default', () => {
        const wrapper = shallowMount(JfListMakerComponent, {
            propsData: {},
            stubs:["jf-field"]
        });
        expect(
            wrapper.find('.icon.icon-new').attributes('disabled')
        ).toBe('disabled')
    })
    it('The + button should be enabled when any text is typed in', () => {
        const wrapper = shallowMount(JfListMakerComponent, {
            propsData: {},
            stubs:["jf-field"]
        });
        wrapper.setData({ newValue: 'a' })
        expect(
            wrapper.find('.icon.icon-new').attributes('disabled')
        ).not.toBe('disabled')
    })
    it('If ng-disabled prop is passed, the + button is disabled even if content is typed in', () => {
        const wrapper = shallowMount(JfListMakerComponent, {
            propsData: {
                "ng-disabled": true,
            },
            stubs: ['jf-field'],
        })
        wrapper.setData({ newValue: 'a' })
        expect(wrapper.find('.icon.icon-new').attributes("disabled")).toBe("disabled")
    })
})
