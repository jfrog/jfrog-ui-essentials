import SanitizeMixin from '../../mixins/Sanitize/index.js';

export const JfDataListModal = {
    template: `
            <template slot="modal-header">
                <button type="button" class="close" data-dismiss="close" aria-label="Close" @click="close()"><span aria-hidden="_true"><i class="icon-close" style="color: #909399;font-size: 16px;"></i></span></button>
                <h4 class="modal-title" id="popup-header">{{items.length}} {{colName}} For {{objectName}} '{{rowName}}'</h4>
            </template>
            <template slot="modal-footer">
                <button class="btn btn-default" @click="close()" id="popup-cancel">Close</button>
            </template>

            <!-- modal-body content -->

            <input type="text" name="filter" class="input-text" v-model="filter.text" placeholder="Filter">
            <div class="group-list-wrapper" v-if="!noResults()">
                <ul class="group-list">
                    <li class="group-list-item" v-jf-tooltip-on-overflow v-for="(item, $index) in items" v-if="filterItem(item)">
                        <div v-if="!item.url" v-html="$sanitize(item.label || item)"></div>
                        <a v-if="item.url" class="jf-link" :href="item.url" v-html="$sanitize(item.label)" target="_blank" rel="noopener noreferrer"></a>
                    </li>
                </ul>
            </div>

            <div class="empty-filter-placeholder filter-no-results" v-if="noResults()">
                Current filter has no results. <a href="" class="jf-link" @click.prevent="filter.text = ''">Clear filter</a>
            </div>

            <!-- modal-body content -->
    `,
    'jf@inject': ['JFrogUIUtils'],
    mixins:[SanitizeMixin],
    methods: {
        filterItem(item) {
            if (this.filter.text) {
                let escaped = this.JFrogUIUtils.escapeForRegex(
                    this.filter.text
                )
                let regex = new RegExp(
                    '.*' + escaped.split('\\*').join('.*') + '.*',
                    'i'
                )
                return (regex.test(item.label) || regex.test(item));
            } else {
                return true
            }
        },
        noResults() {
            let filteredResults = _.filter(this.items, item => {
                return this.filterItem(item)
            })
            return filteredResults.length === 0
        }
    },
}
