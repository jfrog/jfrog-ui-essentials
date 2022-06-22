<template>

    <div>
        <div class="jf-marquee-container">
            <span v-init="checkOverflow()">
    		<slot v-if="!$transclude.isSlotFilled('innerHtml')"></slot>
    		<slot v-html="$sanitize(innerHtml)" v-if="$transclude.isSlotFilled('innerHtml')"></slot>
    	</span>
        </div>
    </div>

</template>

<script>
    import SanitizeMixin from '../../mixins/Sanitize/index.js';

    export default {
        name: 'jf-marquee',
        props: ['disabled'],
        'jf@inject': [
            '$element',
            '$timeout',
            '$interval',
            '$scope',
            '$transclude'
        ],
        mixins:[SanitizeMixin],
        data() {
            return {};
        },
        created() {

        },
        mounted() {

            this.container = $(this.$element).find('.jf-marquee-container');
            this.content = $(this.$element).find('.jf-marquee-container span');
            this.container.on('mouseenter', () => this.onMouseEnter());
            this.container.on('mouseleave', () => this.onMouseLeave());
        },
        ng1_legacy: { 'controllerAs': 'jfMarquee' },
        methods: {
            onMouseEnter() {
                if (this.disabled)
                    return;
                this.checkOverflow();
                if (this.overflowing) {
                    this.animPeriod = this.content.innerWidth() * 0.01;
                    this.startAnimation(1000);
                }
            },
            onMouseLeave() {
                if (this.disabled)
                    return;
                if (this.overflowing) {
                    this.content.css('transition', 'none');
                    this.content.css('left', '0');
                    this.container.removeClass('animating');
                    if (this.startAnimTimeout)
                        this.$timeout.cancel(this.startAnimTimeout);
                    if (this.loopAnimTimeout)
                        this.$timeout.cancel(this.loopAnimTimeout);
                }
            },
            startAnimation(delay = 0) {
                this.container.addClass('animating');
                this.content.css('transition', `left ${ this.animPeriod }s linear`);
                this.content.css('left', '0');
                this.startAnimTimeout = this.$timeout(() => {
                    this.content.css('left', -this.content.innerWidth() + 'px');
                    this.loopAnimTimeout = this.$timeout(() => {
                        this.content.css('transition', 'none');
                        this.content.css('left', this.container.innerWidth() + 'px');
                        this.animPeriod = (this.container.innerWidth() + this.content.innerWidth()) * 0.01;

                        this.$timeout(() => this.startAnimation(), 10);
                    }, this.animPeriod * 1000);
                }, delay);
            },
            checkOverflow() {
                if (!this.container) return;
                if (Math.round(this.container.innerWidth()) < Math.round(this.container[0].scrollWidth)) {
                    this.container.addClass('overflowing');
                    this.overflowing = true;
                } else {
                    this.container.removeClass('overflowing');
                    this.overflowing = false;
                }
            }
        }
    }

</script>

<style scoped lang="less">



</style>
