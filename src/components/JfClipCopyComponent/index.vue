<template>
    <span class="clip-copy-button">
        <a class="copy-to-clip icon icon-copy-to-clipboard-2"
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
                    container: document.getElementById('jfModal')
                };
                const clipboard = new ClipboardJS('.copy-to-clip', configObj );
                clipboard.on('success', function (e) {
                    console.log('ss', e);
                });
                clipboard.on('error', function (e) {
                    console.log("spetznaz");
                    console.log(e);
                });
            },
        }
    };

</script>

<style scoped lang="less">
    .copy-to-clip {
        font-size: 14px;
    }
</style>
