<template>

    <div>
        <table class="data-list">
            <tbody>
                <tr class="data-list-item" v-for="(item,index) in formattedItems" :key="index" >
                    <td class="data-list-item-label">{{item.label}}:</td>
                    <td class="data-list-item-value">
                        <jf-datalist-item-component :item="item" :index="index"></jf-datalist-item-component>                       
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import JfDatalistItemComponent from './JfDatalistItemComponent.vue'
    export default {
        name: 'jf-data-list',
        props: ['items'],
        components: { JfDatalistItemComponent },
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
            this.$scope.$watch('jfDataList.items', items => {
                if (items) {
                    this.formattedItems = _.filter(items, item => {
                        return item.label != '';
                    });
                }
            });
        },
        mounted() {
            this.$forceUpdate();
            this.isMounted = true;
            this.formattedItems = this.filterItems(this.formattedItems);      
        },
        ng1_legacy: { 'controllerAs': 'jfDataList' },
        methods: {            
            filterItems(items) {
                return items.filter(i => !i.isHidden);
            }
        }
    }

</script>

<style scoped lang="less">
@import "../../src/assets/stylesheets/main.less";
.data-list {
  width: 100%;
  table-layout: fixed;
  &-item {
    &-label {
      line-height: 1.3em;
      padding-right: 20px;
      width: 25%;
      font-weight: 600;
    }
    &-value {
      line-height: 2.5em;
      .value {
        display: flex;
        width: 100%;
        & > :first-child {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .copy {
          margin-left: 8px;
        }
        .tag {
          &:first-child {
            margin-left: 0;
          }
          display: inline-block;
          background: transparent;
          border-radius: 3px;
          padding: 0 8px;
          margin: 6px 0 0 8px;
          height: 26px;
          line-height: 24px;
          color: @jfColorAlmostBlack;
          border: 1px solid @jfColorAlmostBlack;
          &.overflowing-child{
            display: none;
          }
        }
        .gridcell-showall{
          display: inline-block;
          position: relative;
          right: 0;
          padding: 0 10px;
          outline: none;
          white-space: nowrap;
        }
      }
    }
  }
}


</style>
