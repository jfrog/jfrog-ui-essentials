import {shallowMount, createLocalVue} from '@vue/test-utils';
import JfTextBoxComponent from './JfTextBoxComponent.vue';

describe('JfTextBoxComponent', () => {

    const showAllElement = '.jf-text-box-show-all';

    it('contains the element text box container', () => {
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {}
        });
        expect(wrapper.contains('.jf-text-box-container')).toBe(true);
    });

    it('When text overflows show-all element renders', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: 'example text',
                seeAllText: 'showMore'
            },
            computed: {
                isOverflowing() {
                    return true
                }
            }
        });
        jest.runAllTimers();
        expect(wrapper.find(showAllElement).exists()).toBe(true);
        expect(wrapper.find(showAllElement).text()).toBe('showMore');
    });

    it('When text overflows onclicking show-all element opens modal', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: 'example text',
                seeAllText: 'showMore'
            },
            computed: {
                isOverflowing() {
                    return true
                }
            },
            mocks: {
                JfFullTextService: {
                    showFullTextModal: function () {
                        let result = new Promise((resolve, reject) => {
                            resolve()
                        })
                        return { result };
                    }
                }
            }
        });
        wrapper.vm.seeAll = jest.fn();
        jest.runAllTimers();
        wrapper.find(showAllElement).trigger('click');
        expect(wrapper.vm.seeAll).toHaveBeenCalled();
        
    });

    it('text props is displayed while rendering', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: 'example text'
            },
            computed: {
                isOverflowing() {
                    return false
                }
            },
        });
        jest.runAllTimers();
        expect(wrapper.find('.jf-text-box-content-current').text()).toBe('example text');
    });


});
