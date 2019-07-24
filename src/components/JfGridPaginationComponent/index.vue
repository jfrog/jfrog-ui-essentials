<template>

    <div>
        <div class="grid-pagination text-right" v-if="gridApi.pagination.getTotalPages()">
            <p>
                <input type="text" class="grid-page-box" :style="{'width': (CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + getTotalPages().toString().length * CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}" v-jf-tooltip="'Jump to Page'" @blur="onBlur()" v-model="pageViewModel" @input="pageChanged()">
                out of {{ getTotalPages() }}
                <a href="" @click.prevent="prevPage()" :class="{disabled: currentPage === 1}">‹</a>
                <a href="" @click.prevent="nextPage()" :class="{disabled: currentPage === gridApi.pagination.getTotalPages()}">›</a>
            </p>
        </div>
    </div>

</template>

<script>

    import { GENERAL_CONSTANTS } from '@/constants/general.constants.js';
    export default {
        name: 'jf-grid-pagination',
        props: ['gridApi'],
        'jf@inject': [
            '$scope',
            '$timeout',
            'JFrogEventBus'
        ],
        data() {
            return {
                CONSTANTS: { PAGINATION_DIGIT_WIDTH_PX: null },
                pageViewModel: 1,
                currentPage: 1
            };
        },
        created() {
            this.CONSTANTS = GENERAL_CONSTANTS;

            this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, () => this.resetPagination());

        },
        mounted() {
            this.gridApi = this.$scope.gridApi;
            this.$timeout(() => {
                if (this.gridApi.pagination) {
                    this.gridApi.pagination.on.paginationChanged(this.$scope, pageNum => {
                        this.currentPage = pageNum;
                        this.pageViewModel = this.currentPage;
                    });
                }
            });
        },
        ng1_legacy: { 'controllerAs': 'jfGridPagination' },
        methods: {
            onBlur() {
                this.pageViewModel = parseInt(this.pageViewModel);
                if (!this.pageViewModel)
                    this.pageViewModel = this.currentPage;
            },
            pageChanged() {
                this.pageViewModel = parseInt(this.pageViewModel);
                if (this.pageViewModel !== 0 && !this.pageViewModel)
                    return;

                this.currentPage = this.pageViewModel;
                if (this.currentPage < 1)
                    this.currentPage = 1;
                if (this.currentPage > this.gridApi.pagination.getTotalPages())
                    this.currentPage = this.gridApi.pagination.getTotalPages();
                this.pageViewModel = this.currentPage;
                this.gridApi.pagination.seek(this.currentPage);
            },
            nextPage() {
                if (this.currentPage === this.gridApi.pagination.getTotalPages())
                    return;
                this.gridApi.pagination.nextPage();
                this.currentPage = this.gridApi.pagination.getPage();
            },
            prevPage() {
                this.gridApi.pagination.previousPage();
                this.currentPage = this.gridApi.pagination.getPage();
            },
            getTotalPages() {
                this.gridApi.pagination.seek(this.currentPage);
                return this.gridApi.pagination.getTotalPages();
            },
            resetPagination() {
                this.gridApi.pagination.seek(1);
                this.currentPage = 1;
            }
        }
    };

</script>

<style scoped lang="less">

§    .grid-pagination {
        p {margin: 0;}
    }


</style>
