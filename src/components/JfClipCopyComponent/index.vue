<template>
    <span class="clip-copy-button">
        <a class="copy-to-clip icon icon-jfui-copy"
           @click="copyToClipboard"
           v-jf-tooltip.bind="tooltipText">
        </a>
    </span>
</template>

<script>

    const TOOLTIP_DEFAULT_TEXT = 'Copy to clipboard';
    const DEFAULT_FEEDBACK_DELAY = 4000;
    import * as ClipboardJS from 'clipboard';

    export default {
        name: 'jf-clip-copy',
        props: ['textToCopy',
            'objectName',
            'keepTooltipLetterCase'],
        data() {
            return {
                origTooltip: '',
                tooltipText: TOOLTIP_DEFAULT_TEXT,
                showTooltip: false,
                FEEDBACK_DELAY: DEFAULT_FEEDBACK_DELAY,
            };
        },
        computed: {
            copyIconId() {
                return `copy-icon-${this._uid}`;
            }
        },
        mounted() {
            if (this.objectName) {
                this.origTooltip = this.tooltipText = `Copy ${(this.keepTooltipLetterCase ? this.objectName : this.objectName.toLowerCase())} to clipboard`;
            } else {
                this.origTooltip = this.tooltipText = 'Copy to clipboard';
            }

        },
        methods: {
            copyToClipboard() {
                const configObj = {
                    text: () => this.textToCopy,
                };
                if(document.getElementById('jfModal')){
                    Object.assign(configObj,{container: document.getElementById('jfModal')})
                }

                const clipboard = new ClipboardJS('.copy-to-clip', configObj );
                clipboard.on('success', (e) => {
                    e.clearSelection();
                    clipboard.destroy();
                    return window.store.dispatch('CREATE_NOTIFICATION', {info: 'Text copied'});
                });
                clipboard.on('error', (e) => {
                    console.log(e);
                    e.clearSelection();
                    clipboard.destroy();
                });
            },
        }
    };

</script>

<style scoped lang="less">
    .copy-to-clip {
        font-size: 18px;
    }
</style>
