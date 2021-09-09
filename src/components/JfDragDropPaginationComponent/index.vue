<template>
  <div>
    <div
      v-if="paginationApi.getTotalPages()"
      class="grid-pagination text-right grid-pagination-wrap"
      style="border:none"
    >
      <p>
        <input
          v-model="pageViewModel"
          type="text"
          class="grid-page-box"
          :style="{'width': (CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + paginationApi.getTotalPages().toString().length * CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}"
          jf-tooltip="Jump to Page"
          @blur="onBlur()"
          @input="pageChanged"
        >
        out of {{ paginationApi.getTotalPages() }}
        <a
          href=""
          :class="{disabled: currentPage === 1}"
          @click.prevent="prevPage()"
        >‹</a>
        <a
          href=""
          :class="{disabled: currentPage === paginationApi.getTotalPages()}"
          @click.prevent="nextPage()"
        >›</a>
      </p>
    </div>
  </div>
</template>

<script>
    import { GENERAL_CONSTANTS } from '@/constants/general.constants.js';
    export default {
        name: 'JfDragDropPagination',
        props: ['paginationApi'],
        data() {
            return {
                pageViewModel: 1,
                currentPage: this.paginationApi && this.paginationApi.currentPage ? this.paginationApi.currentPage : 0,
            };
        },
        created() {
            this.CONSTANTS = _.extend({ PAGINATION_DIGIT_WIDTH_PX: null}, GENERAL_CONSTANTS );
        },
        mounted() {
            if (this.paginationApi) {
                this.currentPage = this.paginationApi.getCurrentPage();
                this.pageViewModel = this.currentPage;

                this.paginationApi.registerChangeListener(pageNum => {
                    this.currentPage = pageNum;
                    this.pageViewModel = this.currentPage;
                });
            }
        },
        methods: {
            onBlur() {
                this.pageViewModel = parseInt(this.pageViewModel);
                if (!this.pageViewModel || isNaN(this.pageViewModel)) {
                    this.pageViewModel = this.currentPage;
                }
            },
            pageChanged() {
                const parsedPageNumber = parseInt(this.pageViewModel);
                if (isNaN(parsedPageNumber)) {
                    return;
                }
                this.pageViewModel = parsedPageNumber;
                if ((this.pageViewModel !== 0 && !this.pageViewModel)) {
                    return;
                }
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
                this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
            },
            prevPage() {
                this.paginationApi.prevPage();
                this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
            }
        }
    };

</script>
