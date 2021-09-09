<template>
  <div>
    <div class="grid-filter">
      <form
        name="gridFilterForm"
        novalidate=""
      >
        <jf-field
          validations="gridFilter"
          :autofocus="autoFocus"
        >
          <input
            v-model="gridFilter"
            type="text"
            name="gridFilter"
            class="input-text"
            jf-validator-max-text-length="1024"
            ng-model-options="{debounce: shouldFilterOnChange() ? 200 : 0}"
            :style="{color:noMatches ? 'red' : 'black'}"
            :placeholder="getPlaceHolder()"
            @input="onChange()"
          >
        </jf-field>
        <!--
            <div ng-if="noMatches" class="alert-warning" style="margin-bottom: 10px">No Matches Found</div>
    -->
        <div
          v-if="!shouldFilterOnChange()"
          class="btn-group"
        >
          <button
            class="btn btn-primary"
            :disabled="disableButton"
            @click="doFilter()"
          >
            <span class="icon icon-refresh" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfGridFilter',
        props: [
            'disableButton',
            'filterField',
            'filterField2',
            'grid',
            'filterOnChange',
            'autoFocus'
        ],
        'jf@inject': [
            '$scope',
            '$timeout'
        ],
        data() {
            return {
                gridFilterForm: null,
                gridFilter: null,
                noMatches: null
            };
        },
        ng1_legacy: { 'controllerAs': 'jfGridFilter' }
    }

</script>

<style scoped lang="less">

    

</style>
