<template>
    <div class="jf-list-selection">
        <input type="text" v-model="filterList" placeholder="Filter..." @input="onFilterChange()" class="input-text dnd-filter">
        <div class="group-list-wrapper">
            <ul class="group-list">
                <li class="group-list-item" style="display: none">*</li>
                <li class="group-list-item cursor-pointer" v-for="(item, index) in getPageItems()" :key="index" :class="{'not-clickable': !item.clickable, 'highlighted': item.highlighted && highlightSelected}" @dblclick="onItemClick(item)" @click="allowSingleClick ? onItemSelection(item) : null" v-bind="addToolTip(item)">
                    <i v-if="item.icon_class" :class="item.icon_class" v-bind="addToolTip(item)" class="icon pull-left"></i>
                    {{item.name}}
                    <i class="icon icon-arrow pull-right cursor-pointer" @click="onItemSelection(item)"></i>
                </li>
            </ul>
        </div>
        <div>
            <jf-drag-drop-pagination :pagination-api="paginationApi"></jf-drag-drop-pagination>
        </div>
    </div>
</template>

<script>
    class PaginationApi {
        constructor(ctrl) {
            this.ctrl = ctrl;
        }

        getTotalPages() {
            if (!this.ctrl.usePagination) {
                return 0;
            }
            return Math.ceil(this.ctrl.filter(this.ctrl.items, this.ctrl.filterList).length / this.ctrl.itemsPerPage);
        }

        getCurrentPage() {
            if (this.ctrl.currentPage > this.getTotalPages()) {
                this.ctrl.currentPage = this.getTotalPages();
            }
            if (this.ctrl.currentPage < 1) {
                this.ctrl.currentPage = 1;
            }
            return this.ctrl.currentPage;
        }

        nextPage() {
            if (this.ctrl.currentPage < this.getTotalPages()) {
                this.ctrl.currentPage++;
            }
        }

        prevPage() {
            if (this.ctrl.currentPage > 1) {
                this.ctrl.currentPage--;
            }
        }

        setPage(pageNum) {
            if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
                this.ctrl.currentPage = pageNum;
            }
        }

        update() {
            this.ctrl.$timeout(() => {
                if (this.getCurrentPage() > this.getTotalPages()) {
                    this.setPage(this.getTotalPages());
                }
                if (this.listener) {
                    this.listener(this.getCurrentPage());
                }
            });
        }

        registerChangeListener(listener) {
            this.listener = listener;
        }
    }

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
        ],
        data() {
            return {
                filterList: null,
                paginationApi: null,
                itemsPerPage: this.items && this.items.length || 0,
                currentPage: 1
            };
        },
        created() {
            this.paginationApi = new PaginationApi(this);
        },
         mounted() {
            this.$nextTick(()=>{
                if( !this.$element ) {
                    return;
                }
                let containerHeight = this.$element.find('.group-list-wrapper').innerHeight();
                let itemHeight = this.$element.find('.group-list-item').outerHeight();
                this.itemsPerPage = Math.floor(containerHeight / itemHeight);
            });
        },
        methods: {
            filter(originalList, filterCriteria) {
                if( filterCriteria ) {
                    return originalList.filter( item => item.name.toLowerCase().indexOf(filterCriteria) != -1 )
                }
                return originalList;
            },
            addToolTip(item){
                let prop = {};
                if( item.icon_tooltip ) {
                    prop = {
                        "jf-tooltip":item.icon_tooltip
                    }
                }
                return prop;
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
                this.$emit('select', item);
                this.paginationApi.update();
            }
        }
    }

</script>

<style scoped lang="less">
    @import '../../assets/stylesheets/main';
    .jf-list-selection {
        .cursor-pointer{
            cursor: pointer;
        }
        .grid-pagination {
            margin: 0 !important;
        }
        .not-clickable {
            cursor: default;
        }

        i:first-child.icon {
            padding: 1px 10px 0 5px;
            font-size: 17px;
            line-height: 20px;
        }
        .group-list-wrapper {
            border: 1px solid #e9e9e9;

            .group-list {
                user-select: none;
                padding: 0;
                margin-top: 10px;
                margin-bottom: 10px;

                .group-list-item {

                    display: block;
                    padding: 10px 15px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &:nth-child(odd) {
                        background-color: @grayGridRow;
                    }
                    &:nth-child(even) {
                        background-color: @white;
                    }

                    &.highlighted {
                        //This !important is only necessary temporarily. It is being overridden by another occurrence of .group-list-item.highlighted selector - which should get removed once we clean up
                        background-color:@grayBGDark !important;
                    }
                }
            }
        }
    }
</style>
