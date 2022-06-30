import {shallowMount} from '@vue/test-utils';
import JfTextBoxComponent from './index.vue';

describe('JfTextBoxComponent', () => {

    // Selectors
    const showAllLink = '.jf-text-box-show-all';
    const showAllLinkText = 'showMore';

    // Inputs
    const sampleText = 'This is a testing sample data for text box';
    const displayText = '.jf-text-box-content-current';

    it('contains the element text box container', async () => {
        const wrapper = await shallowMount(JfTextBoxComponent, {
            propsData: {}
        });
        expect(wrapper.contains('.jf-text-box-container')).toBe(true);
    });

    it('When text overflows show-all element renders', async () => {
        jest.useFakeTimers();
        const wrapper = await shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText,
                seeAllText: showAllLinkText
            },
            computed: {
                isOverflowing() {
                    return true
                }
            }
        });
        jest.runAllTimers();
        await wrapper.vm.$nextTick();
        expect(await wrapper.find(showAllLink).exists()).toBe(true);
        expect(await wrapper.find(showAllLink).text()).toBe(showAllLinkText);
    });

    it('When text overflows onclicking show-all element opens modal', async () => {
        jest.useFakeTimers();
        const wrapper = await shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText,
                seeAllText: showAllLinkText
            },
            computed: {
                isOverflowing() {
                    return true
                }
            },
            mocks: {
                JfFullTextService: {
                    showFullTextModal: jest.fn(function () {
                        let result = new Promise((resolve, reject) => {
                            resolve()
                        })
                        return { result };
                    })
                }
            }
        });
        jest.runAllTimers();
        await wrapper.vm.$nextTick();
        await wrapper.find(showAllLink).trigger('click');
        expect(wrapper.vm.JfFullTextService.showFullTextModal).toHaveBeenCalled();

    });

    it('text props is displayed while rendering', async () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText
            },
            computed: {
                isOverflowing() {
                    return false
                }
            },
        });
        jest.runAllTimers();
        await wrapper.vm.$nextTick();
        expect(await wrapper.find(displayText).text()).toBe(sampleText);
    });


});
