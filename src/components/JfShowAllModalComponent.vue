<template>
    <b-modal
        ref="jfModal"
        v-bind="modalProps"
        @hide="_handleHide">
        <template slot="modal-title">
            <h4 class="modal-title" id="popup-header">{{items.length}} {{colName}} For {{objectName}} '{{rowName}}'</h4>
        </template>
        <div>
            <input type="text" name="filter" class="input-text" v-model="filter.text" placeholder="Filter">


            <div class="group-list-wrapper" v-if="!noResults()">
                <ul class="group-list">
                    <li class="group-list-item" v-jf-tooltip-on-overflow v-for="(item, $index) in items" v-if="filterItem(item)">
                        {{item}}
                    </li>
                </ul>
            </div>

            <div class="empty-filter-placeholder filter-no-results" v-if="noResults()">
                Current filter has no results. <a href="" class="jf-link" @click.prevent="filter.text = ''">Clear filter</a>
            </div>
        </div>
        <template slot="modal-footer">
                <button class="btn btn-primary" @click="$close(true)" id="popup-confirm">Close</button>
        </template>
    </b-modal>
</template >
<script>
    import ModalMixins from "./ModalMixins.js";
    export default {
        name: 'jf-modal',
        props: [
            'items',
            'colName',
            'rowName',
            'objectName',
            'filter'
        ],
        'jf@inject': ['JFrogUIUtils'],
        data() {
            return {

            }
        },
        methods:{
            filterItem(item) {
                if (this.filter.text) {
                    let escaped = this.JFrogUIUtils.escapeForRegex(this.filter.text);
                    let regex = new RegExp('.*' + escaped.split('\\*').join('.*') + '.*', 'i');
                    return regex.test(item);
                } else {
                    return true;
                }
            },
            noResults() {
                let filteredResults = _.filter(this.items, item => {
                    return this.filterItem(item);
                });
                return filteredResults.length === 0;
            }

        },
        mixins:[ModalMixins],
};

</script>

<!-- NOTE: have removed scoped from this component's style temporarily -->
<style lang="less">
    .modal.fade {
        opacity:inherit;
    }
</style>
