<script>
    const TEMPLATE = `
    <div>
        <multi-select :allow-empty="false" :disabled="jfSelectDisabled" :close-on-select="!jfSelectMultiple" :multiple="jfSelectMultiple" @input="onInputChange" :value="value" :options="jfSelectOptions" :searchable="true" :show-labels="false" :placeholder="jfSelectPlaceholder" :track-by="displayAttr" :label="displayAttr">

       <template slot="singleLabel" slot-scope="props"><i  v-if="props.option.icon" class="icon option__icon" :class="props.option.icon"></i>
      <div class="option__desc"><span class="option__title">{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option) }}</span></div>
    </template>

      <template slot="option" slot-scope="props"><i  v-if="props.option.icon" class="icon option__icon" :class="props.option.icon"></i>
      <div class="option__desc"><span class="option__title">{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option)  }}</span></div>
    </template>

     </multi-select>

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
                jfSelectHelpTooltips: null,

            };
        },
        beforeMount() {
            this.displayAttr = this.jfSelectDisplayAttr || null

            if (!this.value) {
                this.value = [];
            }
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
            setSelectText(text){
                if(this.jfSelectDisplayFunc){
                    return this.jfSelectDisplayFunc(text)
                }else{
                    return text;
                }

            },
            onInputChange(val) {
                this.$emit('input', val)
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

    /deep/ button.clear {
        display: none;
    }

    /deep/ .dropdown-toggle:after {
        display: none;
    }

    /deep/ .v-select .open-indicator:before {
        border-width: 1px 1px 0 0;
        height: 7px;
        width: 7px;
    }

      /deep/ .multiselect__option--highlight{
          background: #f7f7f7;
          color: #707070;
        }

    /deep/ .multiselect__option--selected.multiselect__option--highlight{
        background: #f7f7f7;
        color: #707070;
    }
    /deep/.multiselect__option--selected{
        color: #707070;
        background: #f7f7f7;
        font-weight: 400;
    }

    .option__icon{
        float: left;
        margin-right: 10px;
    }

</style>
