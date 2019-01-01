<script>

    const TEMPLATE = `
    <div>
        <ui-select v-jf-disable-ng-animate="''" v-model="jfSelectModel" on-select="onSelect($item,$model)" :disabled="jfSelectDisabled" remove-selected="false">
            <ui-select-match id="select-header" :placeholder=" jfSelectPlaceholder " @click="onOpenList()">
                <jf-marquee disabled="jfSelectDisableMarquee">
                    <inner-html v-html="displayLabel($item || $select.selected)"></inner-html>
                </jf-marquee>
            </ui-select-match>
            <ui-select-choices v-jf-disable-ng-animate="''" refresh-delay="100" ui-disable-choice="item.disabled" refresh="refresh($select.search)" repeat="item in jfUiSelect[jfSelectOptionsView ? 'jfSelectOptionsView' : 'jfSelectOptions'] | filter: (!jfSelectFilterAttr ? $select.search : { [jfSelectFilterAttr || 'dummyfield']: $select.search}) track by $index">
                <div v-if="!jfSelectHelpTooltips" class="jf-ui-select-item" name="select-item" :class="{'more-ph': isMorePlaceholder(item)}" @click="onClick(item,$event)">
                    <jf-marquee disabled="jfSelectDisableMarquee" :class="[item.customClass]">
                        <inner-html v-html="displayLabel(item) | highlight: $select.search"></inner-html>
                    </jf-marquee>
                </div>
                <div v-if="jfSelectHelpTooltips">
                    <span class="jf-ui-select-item" name="select-item" :class="{'more-ph': isMorePlaceholder(item)}" @click="onClick(item,$event)" v-html="displayLabel(item) | highlight: $select.search"></span>
                    <span v-if="jfSelectHelpTooltips({$item: item})">
                    <jf-help-tooltip :text="jfSelectHelpTooltips({$item: item})"></jf-help-tooltip>
                </span>
                </div>
            </ui-select-choices>
        </ui-select>
    </div>
    `;
    export default {
        template: TEMPLATE,
        name: 'jf-ui-select',
        props: [
            'jfSelectModel',
            'jfSelectOptions',
            'jfSelectDisabled',
            'jfSelectDisableMarquee',
            'jfSelectMultiple',
            'jfSelectDisplayAttr',
            'jfSelectFilterAttr',
            'jfSelectPlaceholder',
            'jfSelectLoadChunks',
            'jfSelectLoadMoreLabel'
        ],
        data() {
            return {
                jfSelectOptionsView: null,
                jfSelectHelpTooltips: null
            };
        },
        mounted() {
            this.displayLabel = item => {
                if (item === null || item === undefined)
                    return null;
                if (this.isMorePlaceholder(item))
                    return this.jfSelectLoadMoreLabel || 'More Options...';
                if (item[this.jfSelectDisabled])
                    return null;
                return this.$emit('jf-select-display-func', { $item: item });
            };
    
            if (this.jfSelectLoadChunks === undefined) {
            } else if (this.jfSelectLoadChunks === '') {
                this.chunkSize = 10;
                this.jfSelectOptionsView = [];
            } else {
                this.chunkSize = parseInt(this.jfSelectLoadChunks) < 4 ? 4 : parseInt(this.jfSelectLoadChunks);
                this.jfSelectOptionsView = [];
            }
        },
        ng1_legacy: { 'controllerAs': 'jfUiSelect' },
        methods: {
            onSelect($item, $model) {
                this.$emit('jf-select-change');
                if (this.jfSelectOptionsView)
                    this.jfSelectOptionsView = [];
            },
            onClick(item, $event) {
                if (this.jfSelectOptionsView && this.isMorePlaceholder(item)) {
                    let newLoads = this[this.filtered ? 'filtered' : 'jfSelectOptions'].slice(this.loaded, this.loaded + this.chunkSize);
                    this.jfSelectOptionsView = this.jfSelectOptionsView.slice(0, this.loaded).concat(newLoads);
                    if (this[this.filtered ? 'filtered' : 'jfSelectOptions'].length > this.jfSelectOptionsView.length) {
                        this.jfSelectOptionsView.push(this.createMorePlaceholder());
                    }
                    this.loaded += this.chunkSize;
                    $event.preventDefault();
                    $event.stopPropagation();
                }
            },
            onOpenList() {
                if (this.jfSelectOptionsView) {
                    this.filter = '';
                    this.filtered = null;
                    this.loaded = this.chunkSize;
                    this.jfSelectOptionsView = this.jfSelectOptions.slice(0, this.loaded);
                    if (this.jfSelectOptions.length > this.jfSelectOptionsView.length) {
                        this.jfSelectOptionsView.push(this.createMorePlaceholder());
                    }
                }
            },
            refresh(search) {
                if (!this.jfSelectOptionsView)
                    return;
    
                if (!search.trim()) {
                    this.onOpenList();
                    return;
                }
    
                this.filter = search;
    
                this.filtered = _.filter(this.jfSelectOptions, option => {
                    if (!this.jfSelectFilterAttr) {
                        return this.displayLabel(option).toLowerCase().indexOf(search.toLowerCase()) !== -1;
                    } else {
                        return option[this.jfSelectFilterAttr].toLowerCase().indexOf(search.toLowerCase()) !== -1;
                    }
                });
    
                this.loaded = this.chunkSize;
                this.jfSelectOptionsView = this.filtered.slice(0, this.loaded);
                if (this.filtered.length > this.jfSelectOptionsView.length) {
                    this.jfSelectOptionsView.push(this.createMorePlaceholder());
                }
            },
            createMorePlaceholder() {
                let ph = {
                    $specialItem: 'more',
                    toString: s => this.filter
                };
                if (this.jfSelectFilterAttr)
                    ph[this.jfSelectFilterAttr] = this.filter;
                return ph;
            },
            isMorePlaceholder(item) {
                return _.isObject(item) && item.$specialItem === 'more';
            }
        }
    };

</script>

<style scoped lang="less">

    

</style>
