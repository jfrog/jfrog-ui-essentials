<template>
    <span class="clip-copy-button">
        <a class="copy-to-clip icon icon-copy-to-clipboard-2" :id="copyIconId" @click="doCopy"></a>
        <b-tooltip :show.sync="showTooltip" :target="copyIconId" placement="bottom" ref="tooltip">
              {{tooltipText}}
        </b-tooltip>
    </span>
</template>

<script>

    const TOOLTIP_DEFAULT_TEXT = 'Copy to clipboard';
    const DEFAULT_FEEDBACK_DELAY = 4000;

    export default {
        name: 'jf-clip-copy',
        'jf@inject': [
            '$timeout'
        ],
        props: {
            textToCopy: String,
            objectName: String,
            keepTooltipLetterCase: Boolean

        },
        data() {
            return {
                origTooltip: '',
                tooltipText: TOOLTIP_DEFAULT_TEXT,
                showTooltip: false,
                FEEDBACK_DELAY: DEFAULT_FEEDBACK_DELAY,
                timeoutPromise: null
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
            }
            else {
                this.origTooltip = this.tooltipText = 'Copy to clipboard';
            }
        },
        methods: {
            doCopy() {
                this.$copyText(this.textToCopy)
                    .then(this.onSuccessfulCopy())
                    .catch((e) => {
                        console.log(e);
                    });
            },
            onSuccessfulCopy() {
                if (!this.textToCopy) {
                    return;
                }

                if (this.timeoutPromise) {
                    this.$timeout.cancel(this.timeoutPromise);
                    this.timeoutPromise = null;
                }

                this.tooltipText = this.objectName ? this.objectName.charAt(0).toUpperCase() + this.objectName.substr(
                    1) + ' copied to clipboard' : 'Value copied to clipboard';
                this.timeoutPromise = this.$timeout(() => {
                    this.tooltipText = this.origTooltip;
                }, this.FEEDBACK_DELAY);

            }
        }
    };

</script>

<style scoped lang="less">
    .clip-copy-button {

    }
    .copy-to-clip {
        font-size: 14px;
    }
</style>
