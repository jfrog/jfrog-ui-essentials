<template>
  <div class="value" ref="templateValue">
    <a
      v-if="itemIsLink"
      :href="viewItem.url ? viewItem.url : viewItem.value"
      v-html="viewItem.value"
      target="_blank"
      rel="noopener noreferrer"
      class="jf-link"
      v-jf-tooltip-on-overflow
    ></a>
    <div
      v-if="itemIsLinkWithUrl || itemIsPlainText"
      v-html="viewItem.value"
      v-jf-tooltip-on-overflow
    ></div>
    <div v-if="itemIsTagsArray" :id="'data-list-row-' + index">
      <div class="tag" v-for="(tag, index2) in viewItem.value" :key="index2">
        <a
          class="gridcell-content-text jf-link"
          v-if="tag.url"
          :href="tag.url"
          target="_blank"
          rel="noopener noreferrer"
          v-html="tag.label"
        ></a>
        <span class="gridcell-content-text" v-if="!tag.url" v-html="tag.label"></span>
        <i v-if="viewItem.delete" @click="deleteTag(tag)" class="icon icon-close delete-tag"></i>
      </div>
      <a
        class="jf-link gridcell-showall"
        v-if="showAllValue"
        href
        @click.prevent="showAll(viewItem.value,viewItem.label,viewItem.objectName)"
      >(See {{viewItem.value.length &gt; 1 ? 'All' : 'List'}})</a>
    </div>
    <div class="copy" v-if="viewItem.copy && !isArray(viewItem.value)">
      <jf-clip-copy :text-to-copy="viewItem.value"></jf-clip-copy>
    </div>
  </div>
</template>

<script>
import omit from 'lodash/omit';
import extend from 'lodash/extend';
import filter from 'lodash/filter';
import { JfDataListModal } from "@/components/JfDataListModal/index.js";
import {VueFactory} from '../../../services/VueFactory';
import SanitizeMixin from '../../../mixins/Sanitize/index.js';

export default {
    name: 'jf-datalist-item-component',
    props: ['item', 'index'],
    'jf@inject': [
        'JFrogModal',
        'JFrogUIUtils',
        'JFrogUILibConfig'
    ],
    mixins:[SanitizeMixin],
    data() {
        return {
            showAllValue: false
        }
    },
    mounted() {
        this.showAllValue = (this.viewItem.value.length >= 1) ? this.htmlIsOverflowing('#data-list-row-' + this.index) : false;
        if(this.showAllValue) { this.$forceUpdate }
        this.createTemplate()
    },
    updated() {
        this.createTemplate()
    },
    methods: {
        deleteTag(tag){
            /*
                Invoked when user deletes a value in a data list item
                Updates the value object by removing the entry for the item
                Emits event with the updated data list item object and the index in the data list
            */
            this.item.value = filter(this.item.value, valueItem => valueItem.label !== tag.label)
            this.$emit('item-updated', {
                index: this.index,
                item: this.item,
            })
        },
        htmlIsOverflowing(rowId) {
            if (!this.$el) return false
            let elem = $(rowId);
            let children = elem.children('.tag')
            let maxWidth =
                elem.closest('.data-list-item-value').outerWidth() - 60
            let totalChildrenWidth = 0
            children.each((i, child) => {
                let childElem = $(child)
                totalChildrenWidth +=
                    childElem.outerWidth() +
                    parseInt(childElem.css('margin-left')) +
                    parseInt(childElem.css('margin-right'))

                if (totalChildrenWidth < maxWidth) {
                    childElem.removeClass('overflowing-child')
                }
                if (
                    totalChildrenWidth > maxWidth &&
                    !childElem.is('.overflowing-child')
                ) {
                    childElem.addClass('overflowing-child')
                }
            })
            return elem.children('.tag.overflowing-child').length > 0
        },
        showAll(model, rowName, objectName) {
            let modalScope = {
                items: model,
                rowName: rowName,
                colName: '',
                objectName: objectName,
                filter: {},
            }

            this.JFrogModal.launchModal(
                JfDataListModal,
                modalScope,
                'sm',
                true,
                { dontRejectOnClose: true,
                class: "show-all-modal" }
            )
        },
        isArray(o) {
            return Array.isArray(o)
        },
        getItemValue(value) {
            return value || '&nbsp'
        },
        createTemplate() {
            const item = this.viewItem;
            if (!item.template) {
                return
            }
            let mixin =
                typeof item.template === 'object'
                    ? item.template
                    : !this.isHtml(item.template) ? this.JFrogUILibConfig.getConfig().customModalTemplates[item.template]
                    : {
                          template: item.template,
                      };
            let template = `${mixin.template}`;

            const { Vue } = VueFactory.getInstance();
            let ComponentClass = Vue.extend({
                name: 'template-component',
                template: template,
                mixins: [mixin],
                props: ['item', ...Object.keys(item.scope || {})],
            })
            let component = new ComponentClass({
                propsData: extend(
                    {
                        item: omit(item, ['scope']),
                    },
                    item.scope
                ),
            })
            component.$mount()
            this.$refs.templateValue.append(component.$el)
        },
        isHtml(value) {
            return /<[a-z/][\s\S]*>/i.test(value);
        }
    },
    computed: {
        itemIsPlainText() {
            const { value, isUrl, template } = this.item;
            return (!isUrl && !this.isArray(value) && !template);
        },
        itemIsLink() {
            const { value, isUrl, template } = this.item;
            return (value && !this.isArray(value) && isUrl && !template);
        },
        itemIsLinkWithUrl() {
            const { value, isUrl, url } = this.item;
            return (isUrl && url != undefined && !url.length) || (!value);
        },
        itemIsTagsArray() {
            const { value, template } = this.item;
            return (this.isArray(value) && !template);
        },
        viewItem() {
            const res = { ...this.item };
            const { value } = this.item;
            if(this.itemIsLink) {
                res.value = this.$sanitize(value);
            }
            if (this.itemIsLinkWithUrl || this.itemIsPlainText) {
                res.value = this.$sanitize(value) || '&nbsp';
            }
            if(this.itemIsTagsArray) {
                res.value = value.map(tag => {
                    return {
                        ...tag,
                        label: this.$sanitize(tag.label)
                    }
                });
            }

            return res;
        }
    }
}
</script>

<style lang="less">

    @import "../../../assets/stylesheets/variables.less";
    @import "../../../assets/stylesheets/mixins.less";
.delete-tag{
    font-size: 0.8em;
    margin-left: 7px;
    cursor: pointer;
}
.show-all-modal {
    .modal-header {
        display: block !important;
        .close {
            padding: 0 !important;
        }
    }
    .modal-body {
        margin-bottom: 10px;
        .empty-filter-placeholder {
            .empty-placeholder();
        }
        .group-list {
            max-height: 320px;
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
            }
        }
    }
}
</style>
