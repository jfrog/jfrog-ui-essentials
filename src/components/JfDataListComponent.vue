<template>

    <div>
        <table class="data-list">
            <tbody>
                <tr class="data-list-item" v-for="(item,index) in formattedItems" :key="index" v-if="!item.isHidden">
                    <td class="data-list-item-label">{{item.label}}:</td>
                    <td class="data-list-item-value">
                        <div class="value">
                            <a v-if="item.isUrl" :href="item.value" v-html="item.value" target="_blank" class="jf-link" v-jf-tooltip-on-overflow>
                            </a>
                            <div v-if="!item.isUrl && !isArray(item.value)" v-html="item.value" v-jf-tooltip-on-overflow>
                            </div>
                            <div v-if="isArray(item.value)"  :id="'data-list-row-' + index">
                                <div class="tag" v-for="(tag, index2) in item.value" :key="index2">
                                    <a class="gridcell-content-text jf-link" v-if="tag.url" :href="tag.url" target="_blank" v-html="tag.label">
                                    </a>
                                    <span class="gridcell-content-text" v-if="!tag.url" v-html="tag.label"></span>
                                </div>
                                <a class="jf-link gridcell-showall" v-if="item.value.length >= 1 && htmlIsOverflowing('#data-list-row-' + index)" href="" @click.prevent="showAll(item.value,item.label,item.objectName)"> (See {{item.value.length &gt; 1 ? 'All' : 'List'}})</a>
                            </div>
                            <div class="copy" v-if="item.copy && !isArray(item.value)">
                                <jf-clip-copy :text-to-copy="item.value"></jf-clip-copy>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import {JF_Data_LIST_MODAL} from "@/directives/jf_data_list/jf_data_list.show_all_modal.js";
    export default {
        name: 'jf-data-list',
        props: ['items'],
        'jf@inject': [
            '$scope',
            '$rootScope',
            '$element',
            'JFrogModal',
            'JFrogUIUtils'
        ],
        data() {
            return { formattedItems: null,isMounted: false };
        },
        created() {
            console.log("****** ITEMS ARE",this.items)

            this.$scope.$watch('jfDataList.items', items => {
                if (items) {
                    console.log("FORMATED")
                    this.formattedItems = _.filter(items, item => {
                        return item.label != '';
                    });
                }
            });

        },
        mounted() {
            this.$forceUpdate();
            console.log("*** MOUNTED")
            this.isMounted = true;
        },
        ng1_legacy: { 'controllerAs': 'jfDataList' },
        methods: {
            htmlIsOverflowing(rowId) {
                if (!this.$el) return false;

                console.log("rowId IS ",rowId)
                let elem = this.$element.find(rowId)
                console.log("ELEMENT IS ",elem)
                let children = elem.children('.tag');
                let maxWidth = elem.closest('.data-list-item-value').outerWidth() - 60;
                let totalChildrenWidth = 0;
                children.each((i, child) => {
                    let childElem = $(child);
                    totalChildrenWidth += childElem.outerWidth() + parseInt(childElem.css('margin-left')) + parseInt(childElem.css('margin-right'));

                    if (totalChildrenWidth < maxWidth) {
                        childElem.removeClass('overflowing-child');
                    }
                    if (totalChildrenWidth > maxWidth && !childElem.is('.overflowing-child')) {
                        childElem.addClass('overflowing-child');
                    }

                });
                return elem.children('.tag.overflowing-child').length > 0;
            },
            showAll(model, rowName, objectName) {
                //objectName = _.startCase(objectName.indexOf('/') >= 0 ? objectName.split('/')[0] : this.objectName);

                let modalScope = {
                    items: model,
                    rowName: rowName,
                    colName: "",
                    objectName: objectName,
                    filter: {},
                };

                this.JFrogModal.launchModal(JF_Data_LIST_MODAL, modalScope, 'sm', true, {dontRejectOnClose:true});
            },
            isArray(o) {
                return Array.isArray(o);
            }
        }
    }

</script>

<style scoped lang="less">



</style>
