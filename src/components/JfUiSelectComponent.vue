<script>
    const TEMPLATE = `
    <div>
         <!-- <ui-select  v-model="jfSelectModel" on-select="onSelect($item,$model)" :disabled="jfSelectDisabled" remove-selected="false">
            <ui-select-match id="select-header" :placeholder=" jfSelectPlaceholder " @click="onOpenList()">
                <jf-marquee disabled="jfSelectDisableMarquee">
                    <inner-html v-html="displayLabel($item || $select.selected)"></inner-html>
                </jf-marquee>
            </ui-select-match>
            <ui-select-choices  refresh-delay="100" ui-disable-choice="item.disabled" refresh="refresh($select.search)" repeat="item in jfUiSelect[jfSelectOptionsView ? 'jfSelectOptionsView' : 'jfSelectOptions'] | filter: (!jfSelectFilterAttr ? $select.search : { [jfSelectFilterAttr || 'dummyfield']: $select.search}) track by $index">
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
        </ui-select> -->
V Select goes here:
           <v-select :get-option-label="jfSelectDisplayFunc" :multiple="jfSelectMultiple" :placeholder="jfSelectPlaceholder" :disabled="jfSelectDisabled" @input="onInputChange" :value="value"  id="mySelect" :options="jfSelectOptions" :label="displayAttr">
        <template slot="option" slot-scope="option">
        <i v-if="option.icon" class="icon" :class="option.icon"></i>
        <span v-if="!jfSelectDisplayFunc">{{ option[displayAttr]}}</span>
        <span v-else="!jfSelectDisplayFunc">{{ jfSelectDisplayFunc(option)}}</span>

        </template>
        </v-select>
    </div>
    `;
    export default {
        template: TEMPLATE,
        name: 'jf-ui-select',
        props: [
            'jfSelectOptions',
            'jfSelectDisplayFunc',
            'jfSelectDisabled',
            'jfSelectDisableMarquee',
            'jfSelectMultiple',
            'jfSelectDisplayAttr',
            'jfSelectFilterAttr',
            'jfSelectPlaceholder',
            'jfSelectLoadChunks',
            'jfSelectLoadMoreLabel',
            'value'
        ],
        data() {
            return {
                jfSelectOptionsView: null,
                jfSelectHelpTooltips: null
            };
        },
        beforeMount() {
            this.displayAttr = this.jfSelectDisplayAttr || 'title'
        },
        mounted() {
            this.displayLabel = item => {
                if (item === null || item === undefined)
                    return null;
                if (this.isMorePlaceholder(item))
                    return this.jfSelectLoadMoreLabel || 'More Options...';
                if (item[this.jfSelectDisabled])
                    return null;
                return this.$emit('jf-select-display-func', {$item: item});
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
        ng1_legacy: {'controllerAs': 'jfUiSelect'},
        methods: {
            onInputChange(val){
              this.$emit('input',val)
            },
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

    .dropdown li {
        border-bottom: 1px solid rgba(112, 128, 144, 0.1)
    }

    .dropdown li:last-child {
        border-bottom: none;
    }

    .dropdown li a {
        padding: 10px 20px;
        display: flex;
        width: 100%;
        align-items: center;
        font-size: 1.25em;
    }

    /deep/ .dropdown-menu li.selected {
        background: green
    }
  /deep/ .dropdown-menu li a {
      height: 40px;
      line-height: 40px;
    }

    /deep/ #mySelect.v-select .dropdown-menu .active > a {
        color: #000;
        background: #f7f7f7 !important;
        font-size: 14px;
    }

    /deep/ #mySelect.v-select .dropdown-menu > .highlight > a {
        background: #f7f7f7 !important;
        color: #000;
    }

   /deep/  button.clear {
        display: none;
    }
    /deep/ .dropdown-toggle:after{
        display: none;
    }

   /deep/ .v-select .open-indicator:before {
        border-width: 1px 1px 0 0;
        height: 7px;
        width: 7px;
    }

</style>
