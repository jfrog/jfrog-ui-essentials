<template>
  <div class="value" ref="templateValue">
    <a
      v-if="item.isUrl && ( item.url == undefined || item.url.length )"
      :href="item.url ? item.url : item.value"
      v-html="item.value"
      target="_blank"
      class="jf-link"
      v-jf-tooltip-on-overflow
    ></a>
    <div
      v-if="(item.isUrl && item.url != undefined && !item.url.length) || (!item.value)"
      v-html="getItemValue(item.value)"
      v-jf-tooltip-on-overflow
    ></div>
    <div v-if="!item.isUrl && !isArray(item.value) && !item.template" v-html="item.value" v-jf-tooltip-on-overflow></div>
    <div v-if="isArray(item.value) && !item.template" :id="'data-list-row-' + index">
      <div class="tag" v-for="(tag, index2) in item.value" :key="index2">
        <a
          class="gridcell-content-text jf-link"
          v-if="tag.url"
          :href="tag.url"
          target="_blank"
          v-html="tag.label"
        ></a>
        <span class="gridcell-content-text" v-if="!tag.url" v-html="tag.label"></span>
      </div>
      <a
        class="jf-link gridcell-showall"
        v-if="item.value.length >= 1 && htmlIsOverflowing('#data-list-row-' + index)"
        href
        @click.prevent="showAll(item.value,item.label,item.objectName)"
      >(See {{item.value.length &gt; 1 ? 'All' : 'List'}})</a>
    </div>
    <div class="copy" v-if="item.copy && !isArray(item.value)">
      <jf-clip-copy :text-to-copy="item.value"></jf-clip-copy>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'datalist-dynamic-component',
    props: ['item'],
    mounted() {
        this.createTemplate();
    },
    updated() {
        this.createTemplate();
    },
    methods: {
        htmlIsOverflowing(rowId) {
            if (!this.$el) return false

            console.log('rowId IS ', rowId)
            let elem = this.$element.find(rowId)
            console.log('ELEMENT IS ', elem)
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
            //objectName = _.startCase(objectName.indexOf('/') >= 0 ? objectName.split('/')[0] : this.objectName);

            let modalScope = {
                items: model,
                rowName: rowName,
                colName: '',
                objectName: objectName,
                filter: {},
            }

            this.JFrogModal.launchModal(
                JF_Data_LIST_MODAL,
                modalScope,
                'sm',
                true,
                { dontRejectOnClose: true }
            )
        },
        isArray(o) {
            return Array.isArray(o)
        },
        getItemValue(value) {
            return value || '&nbsp'
        },
        createTemplate() {
            let item = this.item
            if (!item.template) {
                return
            }
            let mixin =
                typeof item.template === 'object'
                    ? item.template
                    : {
                        template: item.template,
                    }
            let template = `<div>${mixin.template}</div>`
            let ComponentClass = Vue.extend({
                name: 'template-component',
                template: template,
                mixins: [mixin],
                props: ['item',...Object.keys(item.scope|| {})],
            })
            let component = new ComponentClass({
                propsData: _.extend({
                    item: _.omit(item, ['scope']),                    
                }, item.scope),

            })
            component.$mount()
            this.$refs.templateValue.append(component.$el)
        }
    },
}
</script>
<style lang="less">
</style>
