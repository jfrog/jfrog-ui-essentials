<template>

    <div>
        <div class="grid-filter">
            <form name="gridFilterForm" novalidate="">
                <jf-field validations="gridFilter" :autofocus="autoFocus">
                    <input type="text" name="gridFilter" class="input-text" jf-validator-max-text-length="1024" v-model="gridFilter" ng-model-options="{debounce: shouldFilterOnChange() ? 200 : 0}" @input="onChange()" :style="{color:noMatches ? 'red' : 'black'}" :placeholder="getPlaceHolder()">
                </jf-field>
                <!--
            <div ng-if="noMatches" class="alert-warning" style="margin-bottom: 10px">No Matches Found</div>
    -->
                <div class="btn-group" v-if="!shouldFilterOnChange()">
                    <button class="btn btn-primary" @click="doFilter()" :disabled="disableButton">
                        <span class="icon icon-refresh"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-grid-filter',
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
