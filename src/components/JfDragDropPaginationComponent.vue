<template>

    <div>
        <div class="grid-pagination text-right" v-if="paginationApi.getTotalPages()">
            <p>
                <input type="text" class="grid-page-box" :style="{'width': (CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + paginationApi.getTotalPages().toString().length * CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}" v-jf-tooltip="'Jump to Page'" @blur="onBlur()" v-model="pageViewModel" @input="pageChanged()">
                out of {{ paginationApi.getTotalPages() }}
                <a href="" @click.prevent="prevPage()" :class="{disabled: currentPage === 1}">‹</a>
                <a href="" @click.prevent="nextPage()" :class="{disabled: currentPage === paginationApi.getTotalPages()}">›</a>
            </p>
        </div>
    </div>

</template>

<script>

    import { GENERAL_CONSTANTS } from '@/constants/general.constants.js';
    export default {
        name: 'jf-drag-drop-pagination',
        props: ['paginationApi'],
        data() {
            return {
                CONSTANTS: { PAGINATION_DIGIT_WIDTH_PX: null },
                pageViewModel: 1,
                currentPage: null
            };
        },
        created() {
            this.CONSTANTS = GENERAL_CONSTANTS;
        },
        mounted() {
            this.currentPage = 0;

            if (this.paginationApi) {
                this.currentPage = this.paginationApi.getCurrentPage();
                this.pageViewModel = this.currentPage;

                this.paginationApi.registerChangeListener(pageNum => {
                    this.currentPage = pageNum;
                    this.pageViewModel = this.currentPage;
                });
            }
        },
        ng1_legacy: { 'controllerAs': 'jfDragDropPagination' },
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
                if (this.currentPage > this.paginationApi.getTotalPages())
                    this.currentPage = this.paginationApi.getTotalPages();
                this.pageViewModel = this.currentPage;
                this.paginationApi.setPage(this.currentPage);
            },
            nextPage() {
                this.paginationApi.nextPage();
                this.currentPage = this.paginationApi.getCurrentPage();
            },
            prevPage() {
                this.paginationApi.prevPage();
                this.currentPage = this.paginationApi.getCurrentPage();
            }
        }
    };

</script>

<style scoped lang="less">



</style>
