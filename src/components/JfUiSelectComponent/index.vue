<script>
    const TEMPLATE = `
    <div>

        <multi-select @open="opened" :options-limit="loadChunks" :internal-search="false" @search-change="onSearch" :allow-empty="false" :disabled="jfSelectDisabled" :close-on-select="!jfSelectMultiple" :multiple="jfSelectMultiple" @input="onInputChange" :value="value" :options="manipulatedList" :searchable="true" :show-labels="false" :placeholder="jfSelectPlaceholder" :track-by="displayAttr" :label="displayAttr">

       <template slot="singleLabel" slot-scope="props">

     <jf-marquee>
      <div class="option__desc"><span class="option__title">  <i  v-if="props.option.icon" class="icon option__icon" :class="props.option.icon"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option) }}</span></div>

    </jf-marquee>
    </template>

      <template slot="option" slot-scope="props">
      <div class="option__desc"><span class="option__title"><i  v-if="props.option.icon" class="icon option__icon" :class="props.option.icon"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option)  }} <jf-help-tooltip :html="jfSelectHelpTooltips(props.option)" v-if="jfSelectHelpTooltips"></jf-help-tooltip></span></div>
    </template>

     <template v-if="jfSelectLoadChunks && jfSelectLoadChunks < manipulatedList.length" slot="afterList" slot-scope="props">
 <div class="option__desc"><span @click="increaseLimit" :class="{'disabled':exccededLimit}" class="option__title load-more">  {{jfSelectLoadMoreLabel || 'Load More'}} <div class="multiselect__spinner" style="display:none;"></div> </span> </div>
    </template>

     </multi-select>

    </div>`;
    export default {
        name: 'JfUiSelect',
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
            'jfSelectHelpTooltips',
            'value'
        ],
        data() {
            return {
                manipulatedList: _.cloneDeep(this.jfSelectOptions),
                jfSelectOptionsView: null,
                exccededLimit: null,
                loadChunks: this.jfSelectLoadChunks

            };
        },
        computed: {

        },
        watch: {
            jfSelectOptions(){
                this.manipulatedList = _.cloneDeep(this.jfSelectOptions);
            }
        },
        beforeMount() {
            parseInt(this.jfSelectLoadChunks)
            this.displayAttr = this.jfSelectDisplayAttr || null

        },
        mounted() {
            if (this.jfSelectLoadChunks) {
                this.originalLoadChunks = this.jfSelectLoadChunks
            }

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
        methods: {
            opened() {
                console.log("checking if excceded limit")
                if (this.jfSelectLoadChunks && this.loadChunks < this.jfSelectOptions.length) {
                    this.exccededLimit = false
                }
            },
            increaseLimit() {
                if (!this.exccededLimit) {
                    this.loadChunks += this.originalLoadChunks;
                    if (this.loadChunks >= this.jfSelectOptions.length) {
                        this.exccededLimit = true
                    }
                }
            },
            onSearch(searchQ, id) {

                this.manipulatedList.splice(0, this.manipulatedList.length)
                this.manipulatedList.push(..._.filter(this.jfSelectOptions, (o) => {


                    if (_.isObject(o)) {
                        return o[this.displayAttr].toLowerCase().indexOf(searchQ.toLowerCase()) > -1
                    } else {
                        return o.toLowerCase().indexOf(searchQ.toLowerCase()) > -1
                    }
                }))


            },
            setSelectText(text) {
                if (this.jfSelectDisplayFunc) {
                    return this.jfSelectDisplayFunc(text)
                } else {
                    return text;
                }

            },
            onInputChange(val) {
                this.$emit('jf-select-change');
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
            }
        },
        template: TEMPLATE,
        ng1_legacy: {'controllerAs': 'jfUiSelect'}
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

    /deep/ .multiselect__option--highlight {
        background: #f7f7f7;
        color: #707070;
    }

    /deep/ .multiselect__option--selected.multiselect__option--highlight {
        background: #f7f7f7;
        color: #707070;
    }

    /deep/ .multiselect__option--selected {
        color: #707070;
        background: #f7f7f7;
        font-weight: 400;
    }

    .option__icon {
        margin-right: 10px;
    }

    span.option__title.load-more {
        height: 25px;
        background: #61a63a;
        width: 100%;
        display: inline-block;
        line-height: 27px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        &.disabled {
            cursor: default;
            background: #dadada;
        }
    }
    .multiselect__tags {
        min-height: 40px;
        display: block;
        padding: 8px 40px 0 8px;
        border-radius: 0;
        border: 1px solid #e8e8e8;
        background: #fff;
        font-size: 14px;
    }
    .jf-help-tooltip {
        display: inline;
    }
</style>
