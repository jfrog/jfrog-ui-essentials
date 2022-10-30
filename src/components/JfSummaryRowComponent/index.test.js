import {shallowMount} from '@vue/test-utils';
import {mount} from '@vue/test-utils';
import {createLocalVue} from '@vue/test-utils';
import {testsBootstrap} from '@/testsBootstrap';
import JfSummaryRowComponent from './index.vue';
import JfSummaryRowItemComponent from './JfSummaryRowItemComponent/index.vue';

// Jf summary row unit tests suit
describe('JfSummaryRowComponent', () => {

    const localVue = createLocalVue();
    testsBootstrap(localVue);
    // Components still needs to be registered on localVue when using lazy loading
    localVue.component('jf-summary-row-item', JfSummaryRowItemComponent);
    localVue.component('jf-summary-row', JfSummaryRowComponent);

    // Selectors
    const contentSection = '.summary-row.jf-content-section';
    const labeledItem = '.summery-labeled-item';
    const summaryColumn = '.jf-summary-row-item';
    const summaryColumnLabel = '.summary-item-label';

    // Tests
    it('Should render the summary row', () => {
        const wrapper = shallowMount(JfSummaryRowComponent, {
            localVue,
            propsData: {}
        });
        expect(wrapper.find(contentSection).exists()).toBe(true);
    });

    it('Should render item slot', () => {
        const summaryRowItemCmp = mount(JfSummaryRowItemComponent, {
            localVue,
            propsData: {
                summaryItemLabel: "Hello World",
                summaryItemUnwrap: true,
                summaryItemIsActive: true,
            },
            slots: {
                default: '<div class="bob">Vue Rulzzzz</div>',
            }
        });
        expect(summaryRowItemCmp.find(summaryColumnLabel).exists()).toBe(true);
        expect(summaryRowItemCmp.find('.bob').exists()).toBe(true);
        expect(summaryRowItemCmp.isVueInstance()).toBe(true);
    });


    it('Should render component with one item', async () => {
        let columnClassName = 'description';
        let summaryRowCmp = await mount(JfSummaryRowComponent, {
            localVue,
            propsData: {},
            slots: {
                default: `<jf-summary-row-item :class="'${columnClassName}'"
                                 :summary-item-is-active="true"
                                 :summary-item-unwrap="true"
                                 :summary-item-label="'Description'">
                                 <span>Vue Rulzzz</span>
                         </jf-summary-row-item>`,
            }
        });
        expect(summaryRowCmp.isVueInstance()).toBe(true);
        expect(summaryRowCmp.find(summaryColumn).exists()).toBe(true);
        expect(summaryRowCmp.find(summaryColumnLabel).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).exists()).toBe(true);
        expect(summaryRowCmp.find(`.${columnClassName}`).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).is(`.${columnClassName}`)).toBe(true);
        expect(summaryRowCmp.find(`.${columnClassName}`).find('span').text()).toBe('Vue Rulzzz');
    });

    it('Should compile date format', () => {
        let columnClassName = 'creation-date';
        const formatted = '28 January 2019, 12:03:55'
        let summaryRowCmp = mount(JfSummaryRowComponent, {
            localVue,
            propsData: {},
            slots: {
                default: `<jf-summary-row-item :class="'${columnClassName}'"
                                                :summary-item-is-active="true"
                                                :summary-item-label="'Creation Date'">
                                            ${formatted}
                         </jf-summary-row-item>`,
            }
        });
        expect(summaryRowCmp.isVueInstance()).toBe(true);
        expect(summaryRowCmp.find(summaryColumn).exists()).toBe(true);
        expect(summaryRowCmp.find(summaryColumnLabel).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).exists()).toBe(true);
        expect(summaryRowCmp.find(`.${columnClassName}`).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).is(`.${columnClassName}`)).toBe(true);
        expect(summaryRowCmp.find(`.${columnClassName}`).find('span').text()).toBe('28 January 2019, 12:03:55');
    });

    it('Should compile image', () => {
        let columnClassName = 'logo';
        let summaryRowCmp = mount(JfSummaryRowComponent, {
            localVue,
            propsData: {},
            slots: {
                default: `<jf-summary-row-item :class="'${columnClassName}'"
                                 :width="'80px'"
                                 :summary-item-is-active="true"
                                 :summary-item-unwrap="true"
                                 style="padding: 14px 8px;">
                              <img src="images/40px.png" height="50px" />
                        </jf-summary-row-item>`,
            }
        });
        expect(summaryRowCmp.isVueInstance()).toBe(true);
        expect(summaryRowCmp.find(summaryColumn).exists()).toBe(true);
        expect(summaryRowCmp.find(summaryColumnLabel).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).exists()).toBe(true);
        expect(summaryRowCmp.find(`.${columnClassName}`).exists()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).is(`.${columnClassName}`)).toBe(true);
        expect(summaryRowCmp.find('img').exists()).toBe(true);
        expect(summaryRowCmp.find(contentSection).exists()).toBe(true);
        // TODO: fix this
        //expect(summaryRowCmp.find(contentSection).attributes('style')).toBe('grid-template-columns: 80px ;');
    });

    it('Should have 2 columns to show', () => {
        let summaryRowCmp = mount(JfSummaryRowComponent, {
            localVue,
            propsData: {},
            slots: {
                default: `<jf-summary-row-item :class="'name'"
                                 :summary-item-is-active="true"
                                 :summary-item-label="'Name'">
                                 Lorem Ipsum
                        </jf-summary-row-item>
                        <jf-summary-row-item :class="'description'"
                                 :summary-item-is-active="true"
                                 :summary-item-label="'Description'">
                                 Fizz Bazz
                         </jf-summary-row-item>`,
            }
        });
        expect(summaryRowCmp.isVueInstance()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).exists()).toBe(true);
        expect(summaryRowCmp.findAll(labeledItem).length).toBe(2);
        expect(summaryRowCmp.findAll(labeledItem).at(0).find('.name').exists()).toBe(true);
        expect(summaryRowCmp.findAll(labeledItem).at(1).find('.description').exists()).toBe(true);
    });

    it('Should set layout with inline styling', () => {
        let summaryRowCmp = mount(JfSummaryRowComponent, {
            localVue,
            propsData: {},
            slots: {
                default: `<jf-summary-row-item :class="'stub1'"
                                 :summary-item-is-active="true"
                                 :summary-item-unwrap="true"
                                 :summary-item-label="'Stub1'">
                                 <span>Fizz Bazz</span>
                         </jf-summary-row-item>
                         <jf-summary-row-item :class="'stub2'"
                                 :summary-item-label="'Stub2'"
                                 :width="'80px'"
                                 :summary-item-is-active="true">
                                 Foo Bar
                        </jf-summary-row-item>
                         <jf-summary-row-item :class="'stub3'"
                                 :summary-item-label="'Stub3'"
                                 :summary-item-is-active="true">
                                 Lorem Ipsum
                        </jf-summary-row-item>`,
            }
        });
        expect(summaryRowCmp.isVueInstance()).toBe(true);
        expect(summaryRowCmp.find(labeledItem).exists()).toBe(true);
        expect(summaryRowCmp.findAll(labeledItem).length).toBe(3);
        expect(summaryRowCmp.findAll(labeledItem).at(0).find('.stub1').exists()).toBe(true);
        expect(summaryRowCmp.findAll(labeledItem).at(1).find('.stub2').exists()).toBe(true);
        expect(summaryRowCmp.findAll(labeledItem).at(2).find('.stub3').exists()).toBe(true);
        expect(summaryRowCmp.find(contentSection).exists()).toBe(true);
        // TODO: fix this
        //expect(summaryRowCmp.find(contentSection).attributes('style')).toBe('grid-template-columns: 1fr 80px 1fr ;');
    });
});
