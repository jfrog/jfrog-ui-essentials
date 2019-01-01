<template>

    <div>
        <div class="jf-text-box-container">
            <div class="jf-text-box-content-current">{{content}}
                <div v-if="ready && isOverflowing" class="jf-text-box-show-all" :style="{'white-space': wrapSeeAll ? 'inherit' : 'nowrap'}" @click="seeAll()" v-html="seeAllText"></div>
            </div>
            <div class="jf-text-box-content-full"></div>
            <div class="jf-text-box-content-stage"></div>
        </div>
    
    </div>

</template>

<script>

    export default {
        name: 'jf-text-box',
        props: [
            'text',
            'numOfLines',
            'modalTitle',
            'seeAllText',
            'maxLines',
            'noAction'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            '$interval',
            '$compile',
            '$q',
            'JfFullTextService'
        ],
        data() {
            return {
                content: null,
                ready: null,
                isOverflowing: null,
                wrapSeeAll: null
            };
        },
        ng1_legacy: { 'controllerAs': 'jfTextBox' }
    }

</script>

<style scoped lang="less">

    

</style>
