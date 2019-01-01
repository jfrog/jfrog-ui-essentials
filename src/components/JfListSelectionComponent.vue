<template>

    <div>
        <div class="jf-list-selection">
            <input type="text" v-model="filterList" placeholder="Filter..." @input="onFilterChange()" class="input-text dnd-filter">
            <div class="group-list-wrapper">
                <ul class="group-list">
                    <li class="group-list-item" style="display: none">*</li>
                    <li class="group-list-item cursor-pointer" v-for="(item, $index) in getPageItems()" :class="{'not-clickable': !item.clickable, 'highlighted': item.highlighted && highlightSelected}" @dblclick="onItemClick(item)" @click="allowSingleClick ? onItemSelection(item) : null" v-jf-tooltip.bind="item.icon_tooltip ? item.icon_tooltip : ''">
                        <i v-if="item.icon_class" :class="item.icon_class" v-jf-tooltip.bind="item.icon_tooltip ? item.icon_tooltip : ''" class="icon pull-left"></i>
                        {{item.name}}
                        <i class="icon icon-arrow pull-right cursor-pointer" @click="onItemSelection(item)"></i>
                    </li>
                </ul>
            </div>
            <div>
                <jf-drag-drop-pagination :pagination-api="paginationApi"></jf-drag-drop-pagination>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-list-selection',
        props: [
            'items',
            'usePagination',
            'highlightSelected',
            'allowSingleClick'
        ],
        'jf@inject': [
            '$timeout',
            '$filter',
            '$element'
        ],
        data() {
            return {
                filterList: null,
                paginationApi: null
            };
        },
        created() {
            this.paginationApi = new PaginationApi(this);
            this.currentPage = 1;

            this.filter = this.$filter('filter');
        },
        mounted() {

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.setItemsPerPage();
        },
        ng1_legacy: { 'controllerAs': 'jfListSelection' },
        methods: {
            setItemsPerPage() {
                this.$timeout(() => {
                    let containerHeight = this.$element.find('.group-list-wrapper').innerHeight();
                    let itemHeight = this.$element.find('.group-list-item').outerHeight();
                    this.itemsPerPage = Math.floor(containerHeight / itemHeight);
                });
            },
            getPageItems() {
                if (!this.usePagination) {
                    return this.filter(this.items, this.filterList);
                }

                let start = (this.currentPage - 1) * this.itemsPerPage;
                let slice = this.filter(this.items, this.filterList).slice(start, start + this.itemsPerPage);
                return slice;
            },
            onFilterChange() {
                this.paginationApi.setPage(1);
                this.paginationApi.update();
            },
            onItemSelection(item) {
                if (this.highlightSelected && !item.highlighted) {
                    let lastHiglighted = _.find(this.items, i => i.highlighted);
                    if (lastHiglighted) {
                        lastHiglighted.highlighted = false;
                    }
                    item.highlighted = true;
                }
                this.onItemClick(item);
            },
            onItemClick(item) {

                /* Todo: check the following condition. It may contain some undefined references: this.onSelect */
                if (typeof this.onSelect === 'function') {
                    this.$emit('on-select', { item: item });
                    this.paginationApi.update();
                }
            }
        }
    }

</script>

<style scoped lang="less">



</style>
