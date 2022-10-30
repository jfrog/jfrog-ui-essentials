((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[65],{

/***/ "08cf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ec79");
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "13d5":
/***/ (function(module, exports) {

// flow

module.exports = {
  watch: {
    typeAheadPointer() {
      this.maybeAdjustScroll()
    }
  },

  methods: {
    /**
     * Adjust the scroll position of the dropdown list
     * if the current pointer is outside of the
     * overflow bounds.
     * @returns {*}
     */
    maybeAdjustScroll() {
      let pixelsToPointerTop = this.pixelsToPointerTop()
      let pixelsToPointerBottom = this.pixelsToPointerBottom()

      if ( pixelsToPointerTop <= this.viewport().top) {
        return this.scrollTo( pixelsToPointerTop )
      } else if (pixelsToPointerBottom >= this.viewport().bottom) {
        return this.scrollTo( this.viewport().top + this.pointerHeight() )
      }
    },

    /**
     * The distance in pixels from the top of the dropdown
     * list to the top of the current pointer element.
     * @returns {number}
     */
    pixelsToPointerTop() {
      let pixelsToPointerTop = 0
      if( this.$refs.dropdownMenu ) {
        for (let i = 0; i < this.typeAheadPointer; i++) {
          pixelsToPointerTop += this.$refs.dropdownMenu.children[i].offsetHeight
        }
      }
      return pixelsToPointerTop
    },

    /**
     * The distance in pixels from the top of the dropdown
     * list to the bottom of the current pointer element.
     * @returns {*}
     */
    pixelsToPointerBottom() {
      return this.pixelsToPointerTop() + this.pointerHeight()
    },

    /**
     * The offsetHeight of the current pointer element.
     * @returns {number}
     */
    pointerHeight() {
      let element = this.$refs.dropdownMenu ? this.$refs.dropdownMenu.children[this.typeAheadPointer] : false
      return element ? element.offsetHeight : 0
    },

    /**
     * The currently viewable portion of the dropdownMenu.
     * @returns {{top: (string|*|number), bottom: *}}
     */
    viewport() {
      return {
        top: this.$refs.dropdownMenu ? this.$refs.dropdownMenu.scrollTop: 0,
        bottom: this.$refs.dropdownMenu ? this.$refs.dropdownMenu.offsetHeight + this.$refs.dropdownMenu.scrollTop : 0
      }
    },

    /**
     * Scroll the dropdownMenu to a given position.
     * @param position
     * @returns {*}
     */
    scrollTo(position) {
      return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.scrollTop = position : null
    },
  }
}


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ada1":
/***/ (function(module, exports) {

module.exports = {
	props: {
		/**
		 * Toggles the adding of a 'loading' class to the main
		 * .v-select wrapper. Useful to control UI state when
		 * results are being processed through AJAX.
		 */
		loading: {
			type: Boolean,
			default: false
		},

		/**
		 * Accept a callback function that will be
		 * run when the search text changes.
		 *
		 * loading() accepts a boolean value, and can
		 * be used to toggle a loading class from
		 * the onSearch callback.
		 *
		 * @param {search}  String          Current search text
		 * @param {loading} Function(bool)  Toggle loading class
		 */
		onSearch: {
			type: Function,
			default: function(search, loading){}
		}
	},

	data() {
		return {
      mutableLoading: false
    }
	},

	watch: {
		/**
		 * If a callback & search text has been provided,
		 * invoke the onSearch callback.
		 */
		search() {
			if (this.search.length > 0) {
				this.onSearch(this.search, this.toggleLoading)
        this.$emit('search', this.search, this.toggleLoading)
      }
		},
    /**
		 * Sync the loading prop with the internal
		 * mutable loading value.
     * @param val
     */
		loading(val) {
			this.mutableLoading = val
		}
	},

	methods: {
		/**
		 * Toggle this.loading. Optionally pass a boolean
		 * value. If no value is provided, this.loading
		 * will be set to the opposite of it's current value.
		 * @param toggle Boolean
		 * @returns {*}
		 */
		toggleLoading(toggle = null) {
			if (toggle == null) {
				return this.mutableLoading = !this.mutableLoading
			}
			return this.mutableLoading = toggle
		}
	}
}


/***/ }),

/***/ "b206":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-select/src/components/Select.vue?vue&type=template&id=13f67020&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown v-select",class:_vm.dropdownClasses,attrs:{"dir":_vm.dir}},[_c('div',{ref:"toggle",staticClass:"dropdown-toggle",on:{"mousedown":function($event){$event.preventDefault();return _vm.toggleDropdown($event)}}},[_c('div',{ref:"selectedOptions",staticClass:"vs__selected-options"},[_vm._l((_vm.valueAsArray),function(option){
var _obj, _obj$1;
return _vm._t("selected-option-container",[_c('span',{key:option.index,staticClass:"selected-tag"},[_vm._t("selected-option",[_vm._v("\n            "+_vm._s(_vm.getOptionLabel(option))+"\n          ")],null,(typeof option === 'object')?option:( _obj = {}, _obj[_vm.label] = option, _obj )),(_vm.multiple)?_c('button',{staticClass:"close",attrs:{"disabled":_vm.disabled,"type":"button","aria-label":"Remove option"},on:{"click":function($event){return _vm.deselect(option)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e()],2)],{"option":(typeof option === 'object')?option:( _obj$1 = {}, _obj$1[_vm.label] = option, _obj$1 ),"deselect":_vm.deselect,"multiple":_vm.multiple,"disabled":_vm.disabled})}),_c('input',{ref:"search",staticClass:"form-control",attrs:{"type":"search","autocomplete":_vm.autocomplete,"disabled":_vm.disabled,"placeholder":_vm.searchPlaceholder,"tabindex":_vm.tabindex,"readonly":!_vm.searchable,"id":_vm.inputId,"role":"combobox","aria-expanded":_vm.dropdownOpen,"aria-label":"Search for option"},domProps:{"value":_vm.search},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.maybeDeleteValue($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.typeAheadUp($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.typeAheadDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.typeAheadSelect($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onTab($event)}],"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.onEscape($event)},"blur":_vm.onSearchBlur,"focus":_vm.onSearchFocus,"input":function($event){_vm.search = $event.target.value}}})],2),_c('div',{staticClass:"vs__actions"},[_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showClearButton),expression:"showClearButton"}],staticClass:"clear",attrs:{"disabled":_vm.disabled,"type":"button","title":"Clear selection"},on:{"click":_vm.clearSelection}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),(!_vm.noDrop)?_c('i',{ref:"openIndicator",staticClass:"open-indicator",attrs:{"role":"presentation"}}):_vm._e(),_vm._t("spinner",[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.mutableLoading),expression:"mutableLoading"}],staticClass:"spinner"},[_vm._v("Loading...")])])],2)]),_c('transition',{attrs:{"name":_vm.transition}},[(_vm.dropdownOpen)?_c('ul',{ref:"dropdownMenu",staticClass:"dropdown-menu",style:({ 'max-height': _vm.maxHeight }),attrs:{"role":"listbox"},on:{"mousedown":_vm.onMousedown,"mouseup":_vm.onMouseup}},[_vm._l((_vm.filteredOptions),function(option,index){
var _obj;
return _c('li',{key:index,class:{ active: _vm.isOptionSelected(option), highlight: index === _vm.typeAheadPointer },attrs:{"role":"option"},on:{"mouseover":function($event){_vm.typeAheadPointer = index}}},[_c('a',{on:{"mousedown":function($event){$event.preventDefault();$event.stopPropagation();return _vm.select(option)}}},[_vm._t("option",[_vm._v("\n          "+_vm._s(_vm.getOptionLabel(option))+"\n        ")],null,(typeof option === 'object')?option:( _obj = {}, _obj[_vm.label] = option, _obj ))],2)])}),(!_vm.filteredOptions.length)?_c('li',{staticClass:"no-options",on:{"mousedown":function($event){$event.stopPropagation();}}},[_vm._t("no-options",[_vm._v("Sorry, no matching options.")])],2):_vm._e()],2):_vm._e()])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue-select/src/components/Select.vue?vue&type=template&id=13f67020&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.search.js
var es6_regexp_search = __webpack_require__("386d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("7618");

// EXTERNAL MODULE: ./node_modules/vue-select/src/mixins/pointerScroll.js
var pointerScroll = __webpack_require__("13d5");
var pointerScroll_default = /*#__PURE__*/__webpack_require__.n(pointerScroll);

// EXTERNAL MODULE: ./node_modules/vue-select/src/mixins/typeAheadPointer.js
var typeAheadPointer = __webpack_require__("e08f");
var typeAheadPointer_default = /*#__PURE__*/__webpack_require__.n(typeAheadPointer);

// EXTERNAL MODULE: ./node_modules/vue-select/src/mixins/ajax.js
var ajax = __webpack_require__("ada1");
var ajax_default = /*#__PURE__*/__webpack_require__.n(ajax);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-select/src/components/Select.vue?vue&type=script&lang=js&









//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Selectvue_type_script_lang_js_ = ({
  mixins: [pointerScroll_default.a, typeAheadPointer_default.a, ajax_default.a],
  props: {
    /**
     * Contains the currently selected value. Very similar to a
     * `value` attribute on an <input>. You can listen for changes
     * using 'change' event using v-on
     * @type {Object||String||null}
     */
    value: {
      default: null
    },

    /**
     * An array of strings or objects to be used as dropdown choices.
     * If you are using an array of objects, vue-select will look for
     * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]). A
     * custom label key can be set with the `label` prop.
     * @type {Array}
     */
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /**
     * Disable the entire component.
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Can the user clear the selected property.
     * @type {Boolean}
     */
    clearable: {
      type: Boolean,
      default: true
    },

    /**
     * Sets the max-height property on the dropdown list.
     * @deprecated
     * @type {String}
     */
    maxHeight: {
      type: String,
      default: '400px'
    },

    /**
     * Enable/disable filtering the options.
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: true
    },

    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: false
    },

    /**
     * Equivalent to the `placeholder` attribute on an `<input>`.
     * @type {String}
     */
    placeholder: {
      type: String,
      default: ''
    },

    /**
     * Sets a Vue transition property on the `.dropdown-menu`. vue-select
     * does not include CSS for transitions, you'll need to add them yourself.
     * @type {String}
     */
    transition: {
      type: String,
      default: 'fade'
    },

    /**
     * Enables/disables clearing the search text when an option is selected.
     * @type {Boolean}
     */
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },

    /**
     * Close a dropdown when an option is chosen. Set to false to keep the dropdown
     * open (useful when combined with multi-select, for example)
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: true
    },

    /**
     * Tells vue-select what key to use when generating option
     * labels when each `option` is an object.
     * @type {String}
     */
    label: {
      type: String,
      default: 'label'
    },

    /**
     * Value of the 'autocomplete' field of the input
     * element.
     * @type {String}
     */
    autocomplete: {
      type: String,
      default: 'off'
    },

    /**
     * Tells vue-select what key to use when generating option
     * values when each `option` is an object.
     * @type {String}
     */
    index: {
      type: String,
      default: null
    },

    /**
     * Callback to generate the label text. If {option}
     * is an object, returns option[this.label] by default.
     *
     * Label text is used for filtering comparison and
     * displaying. If you only need to adjust the
     * display, you should use the `option` and
     * `selected-option` slots.
     *
     * @type {Function}
     * @param  {Object || String} option
     * @return {String}
     */
    getOptionLabel: {
      type: Function,
      default: function _default(option) {
        if (this.index) {
          option = this.findOptionByIndexValue(option);
        }

        if (Object(esm_typeof["a" /* default */])(option) === 'object') {
          if (!option.hasOwnProperty(this.label)) {
            return console.warn("[vue-select warn]: Label key \"option.".concat(this.label, "\" does not") + " exist in options object ".concat(JSON.stringify(option), ".\n") + 'http://sagalbot.github.io/vue-select/#ex-labels');
          }

          return option[this.label];
        }

        return option;
      }
    },

    /**
     * An optional callback function that is called each time the selected
     * value(s) change. When integrating with Vuex, use this callback to trigger
     * an action, rather than using :value.sync to retreive the selected value.
     * @type {Function}
     * @param {Object || String} val
     */
    onChange: {
      type: Function,
      default: function _default(val) {
        this.$emit('change', val);
      }
    },
    onInput: {
      type: Function,
      default: function _default(val) {
        this.$emit('input', val);
      }
    },

    /**
     * Select the current value if selectOnTab is enabled
     */
    onTab: {
      type: Function,
      default: function _default() {
        if (this.selectOnTab) {
          this.typeAheadSelect();
        }
      }
    },

    /**
     * Enable/disable creating options from searchInput.
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: false
    },

    /**
     * Set the tabindex for the input field.
     * @type {Number}
     */
    tabindex: {
      type: Number,
      default: null
    },

    /**
     * When true, newly created tags will be added to
     * the options list.
     * @type {Boolean}
     */
    pushTags: {
      type: Boolean,
      default: false
    },

    /**
     * When true, existing options will be filtered
     * by the search text. Should not be used in conjunction
     * with taggable.
     * @type {Boolean}
     */
    filterable: {
      type: Boolean,
      default: true
    },

    /**
     * Callback to determine if the provided option should
     * match the current search text. Used to determine
     * if the option should be displayed.
     * @type   {Function}
     * @param  {Object || String} option
     * @param  {String} label
     * @param  {String} search
     * @return {Boolean}
     */
    filterBy: {
      type: Function,
      default: function _default(option, label, search) {
        return (label || '').toLowerCase().indexOf(search.toLowerCase()) > -1;
      }
    },

    /**
     * Callback to filter results when search text
     * is provided. Default implementation loops
     * each option, and returns the result of
     * this.filterBy.
     * @type   {Function}
     * @param  {Array} list of options
     * @param  {String} search text
     * @param  {Object} vSelect instance
     * @return {Boolean}
     */
    filter: {
      "type": Function,
      default: function _default(options, search) {
        var _this = this;

        return options.filter(function (option) {
          var label = _this.getOptionLabel(option);

          if (typeof label === 'number') {
            label = label.toString();
          }

          return _this.filterBy(option, label, search);
        });
      }
    },

    /**
     * User defined function for adding Options
     * @type {Function}
     */
    createOption: {
      type: Function,
      default: function _default(newOption) {
        if (Object(esm_typeof["a" /* default */])(this.mutableOptions[0]) === 'object') {
          newOption = Object(defineProperty["a" /* default */])({}, this.label, newOption);
        }

        this.$emit('option:created', newOption);
        return newOption;
      }
    },

    /**
     * When false, updating the options will not reset the select value
     * @type {Boolean}
     */
    resetOnOptionsChange: {
      type: Boolean,
      default: false
    },

    /**
     * Disable the dropdown entirely.
     * @type {Boolean}
     */
    noDrop: {
      type: Boolean,
      default: false
    },

    /**
     * Sets the id of the input element.
     * @type {String}
     * @default {null}
     */
    inputId: {
      type: String
    },

    /**
     * Sets RTL support. Accepts 'ltr', 'rtl', 'auto'.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
     * @type {String}
     * @default 'auto'
     */
    dir: {
      type: String,
      default: 'auto'
    },

    /**
     * When true, hitting the 'tab' key will select the current select value
     * @type {Boolean}
     */
    selectOnTab: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      search: '',
      open: false,
      mutableValue: null,
      mutableOptions: []
    };
  },
  watch: {
    /**
     * When the value prop changes, update
     * the internal mutableValue.
     * @param  {mixed} val
     * @return {void}
     */
    value: function value(val) {
      this.mutableValue = val;
    },

    /**
     * Maybe run the onChange callback.
     * @param  {string|object} val
     * @param  {string|object} old
     * @return {void}
     */
    mutableValue: function mutableValue(val, old) {
      if (this.multiple) {
        this.onChange ? this.onChange(val) : null;
      } else {
        this.onChange && val !== old ? this.onChange(val) : null;
      }
    },

    /**
     * When options change, update
     * the internal mutableOptions.
     * @param  {array} val
     * @return {void}
     */
    options: function options(val) {
      this.mutableOptions = val;
    },

    /**
     * Maybe reset the mutableValue
     * when mutableOptions change.
     * @return {[type]} [description]
     */
    mutableOptions: function mutableOptions() {
      if (!this.taggable && this.resetOnOptionsChange) {
        this.mutableValue = this.multiple ? [] : null;
      }
    },

    /**
     * Always reset the mutableValue when
     * the multiple prop changes.
     * @param  {Boolean} val
     * @return {void}
     */
    multiple: function multiple(val) {
      this.mutableValue = val ? [] : null;
    }
  },

  /**
   * Clone props into mutable values,
   * attach any event listeners.
   */
  created: function created() {
    this.mutableValue = this.value;
    this.mutableOptions = this.options.slice(0);
    this.mutableLoading = this.loading;
    this.$on('option:created', this.maybePushTag);
  },
  methods: {
    /**
     * Select a given option.
     * @param  {Object|String} option
     * @return {void}
     */
    select: function select(option) {
      if (!this.isOptionSelected(option)) {
        if (this.taggable && !this.optionExists(option)) {
          option = this.createOption(option);
        }

        if (this.index) {
          if (!option.hasOwnProperty(this.index)) {
            return console.warn("[vue-select warn]: Index key \"option.".concat(this.index, "\" does not") + " exist in options object ".concat(JSON.stringify(option), "."));
          }

          option = option[this.index];
        }

        if (this.multiple && !this.mutableValue) {
          this.mutableValue = [option];
        } else if (this.multiple) {
          this.mutableValue = [].concat(Object(toConsumableArray["a" /* default */])(this.mutableValue), [option]);
        } else {
          this.mutableValue = option;
        }

        this.onInput(this.mutableValue);
      }

      this.onAfterSelect(option);
    },

    /**
     * De-select a given option.
     * @param  {Object|String} option
     * @return {void}
     */
    deselect: function deselect(option) {
      var _this2 = this;

      if (this.multiple) {
        var ref = -1;
        this.mutableValue.forEach(function (val) {
          if (val === option || _this2.index && val === option[_this2.index] || Object(esm_typeof["a" /* default */])(val) === 'object' && val[_this2.label] === option[_this2.label]) {
            ref = val;
          }
        });
        this.mutableValue = this.mutableValue.filter(function (entry) {
          return entry !== ref;
        });
      } else {
        this.mutableValue = null;
      }

      this.onInput(this.mutableValue);
    },

    /**
     * Clears the currently selected value(s)
     * @return {void}
     */
    clearSelection: function clearSelection() {
      this.mutableValue = this.multiple ? [] : null;
      this.onInput(this.mutableValue);
    },

    /**
     * Called from this.select after each selection.
     * @param  {Object|String} option
     * @return {void}
     */
    onAfterSelect: function onAfterSelect(option) {
      if (this.closeOnSelect) {
        this.open = !this.open;
        this.$refs.search.blur();
      }

      if (this.clearSearchOnSelect) {
        this.search = '';
      }
    },

    /**
     * Toggle the visibility of the dropdown menu.
     * @param  {Event} e
     * @return {void}
     */
    toggleDropdown: function toggleDropdown(e) {
      if (e.target === this.$refs.openIndicator || e.target === this.$refs.search || e.target === this.$refs.toggle || e.target.classList.contains('selected-tag') || e.target === this.$el) {
        if (this.open) {
          this.$refs.search.blur(); // dropdown will close on blur
        } else {
          if (!this.disabled) {
            this.open = true;
            this.$refs.search.focus();
          }
        }
      }
    },

    /**
     * Check if the given option is currently selected.
     * @param  {Object|String}  option
     * @return {Boolean}        True when selected | False otherwise
     */
    isOptionSelected: function isOptionSelected(option) {
      var _this3 = this;

      return this.valueAsArray.some(function (value) {
        if (Object(esm_typeof["a" /* default */])(value) === 'object') {
          return _this3.optionObjectComparator(value, option);
        }

        return value === option || value === option[_this3.index];
      });
    },

    /**
     * Determine if two option objects are matching.
     *
     * @param value {Object}
     * @param option {Object}
     * @returns {boolean}
     */
    optionObjectComparator: function optionObjectComparator(value, option) {
      if (this.index && value === option[this.index]) {
        return true;
      } else if (value[this.label] === option[this.label] || value[this.label] === option) {
        return true;
      } else if (this.index && value[this.index] === option[this.index]) {
        return true;
      }

      return false;
    },

    /**
     * Finds an option from this.options
     * where option[this.index] matches
     * the passed in value.
     *
     * @param value {Object}
     * @returns {*}
     */
    findOptionByIndexValue: function findOptionByIndexValue(value) {
      var _this4 = this;

      this.options.forEach(function (_option) {
        if (JSON.stringify(_option[_this4.index]) === JSON.stringify(value)) {
          value = _option;
        }
      });
      return value;
    },

    /**
     * If there is any text in the search input, remove it.
     * Otherwise, blur the search input to close the dropdown.
     * @return {void}
     */
    onEscape: function onEscape() {
      if (!this.search.length) {
        this.$refs.search.blur();
      } else {
        this.search = '';
      }
    },

    /**
     * Close the dropdown on blur.
     * @emits  {search:blur}
     * @return {void}
     */
    onSearchBlur: function onSearchBlur() {
      if (this.mousedown && !this.searching) {
        this.mousedown = false;
      } else {
        if (this.clearSearchOnBlur) {
          this.search = '';
        }

        this.closeSearchOptions();
        return;
      } // Fixed bug where no-options message could not be closed


      if (this.search.length === 0 && this.options.length === 0) {
        this.closeSearchOptions();
        return;
      }
    },

    /**
     * 'Private' function to close the search options
     * @emits  {search:blur}
     * @returns {void}
     */
    closeSearchOptions: function closeSearchOptions() {
      this.open = false;
      this.$emit('search:blur');
    },

    /**
     * Open the dropdown on focus.
     * @emits  {search:focus}
     * @return {void}
     */
    onSearchFocus: function onSearchFocus() {
      this.open = true;
      this.$emit('search:focus');
    },

    /**
     * Delete the value on Delete keypress when there is no
     * text in the search input, & there's tags to delete
     * @return {this.value}
     */
    maybeDeleteValue: function maybeDeleteValue() {
      if (!this.$refs.search.value.length && this.mutableValue && this.clearable) {
        this.mutableValue = this.multiple ? this.mutableValue.slice(0, -1) : null;
      }
    },

    /**
     * Determine if an option exists
     * within this.mutableOptions array.
     *
     * @param  {Object || String} option
     * @return {boolean}
     */
    optionExists: function optionExists(option) {
      var _this5 = this;

      var exists = false;
      this.mutableOptions.forEach(function (opt) {
        if (Object(esm_typeof["a" /* default */])(opt) === 'object' && opt[_this5.label] === option) {
          exists = true;
        } else if (opt === option) {
          exists = true;
        }
      });
      return exists;
    },

    /**
     * If push-tags is true, push the
     * given option to mutableOptions.
     *
     * @param  {Object || String} option
     * @return {void}
     */
    maybePushTag: function maybePushTag(option) {
      if (this.pushTags) {
        this.mutableOptions.push(option);
      }
    },

    /**
     * Event-Handler to help workaround IE11 (probably fixes 10 as well)
     * firing a `blur` event when clicking
     * the dropdown's scrollbar, causing it
     * to collapse abruptly.
     * @return {void}
     */
    onMousedown: function onMousedown() {
      this.mousedown = true;
    },
    onMouseup: function onMouseup() {
      this.mousedown = false;
    }
  },
  computed: {
    /**
     * Classes to be output on .dropdown
     * @return {Object}
     */
    dropdownClasses: function dropdownClasses() {
      return {
        open: this.dropdownOpen,
        single: !this.multiple,
        searching: this.searching,
        searchable: this.searchable,
        unsearchable: !this.searchable,
        loading: this.mutableLoading,
        rtl: this.dir === 'rtl',
        // This can be removed - styling is handled by `dir="rtl"` attribute
        disabled: this.disabled
      };
    },

    /**
     * If search text should clear on blur
     * @return {Boolean} True when single and clearSearchOnSelect
     */
    clearSearchOnBlur: function clearSearchOnBlur() {
      return this.clearSearchOnSelect && !this.multiple;
    },

    /**
     * Return the current state of the
     * search input
     * @return {Boolean} True if non empty value
     */
    searching: function searching() {
      return !!this.search;
    },

    /**
     * Return the current state of the
     * dropdown menu.
     * @return {Boolean} True if open
     */
    dropdownOpen: function dropdownOpen() {
      return this.noDrop ? false : this.open && !this.mutableLoading;
    },

    /**
     * Return the placeholder string if it's set
     * & there is no value selected.
     * @return {String} Placeholder text
     */
    searchPlaceholder: function searchPlaceholder() {
      if (this.isValueEmpty && this.placeholder) {
        return this.placeholder;
      }
    },

    /**
     * The currently displayed options, filtered
     * by the search elements value. If tagging
     * true, the search text will be prepended
     * if it doesn't already exist.
     *
     * @return {array}
     */
    filteredOptions: function filteredOptions() {
      if (!this.filterable && !this.taggable) {
        return this.mutableOptions.slice();
      }

      var options = this.search.length ? this.filter(this.mutableOptions, this.search, this) : this.mutableOptions;

      if (this.taggable && this.search.length && !this.optionExists(this.search)) {
        options.unshift(this.search);
      }

      return options;
    },

    /**
     * Check if there aren't any options selected.
     * @return {Boolean}
     */
    isValueEmpty: function isValueEmpty() {
      if (this.mutableValue) {
        if (Object(esm_typeof["a" /* default */])(this.mutableValue) === 'object') {
          return !Object.keys(this.mutableValue).length;
        }

        return !this.valueAsArray.length;
      }

      return true;
    },

    /**
     * Return the current value in array format.
     * @return {Array}
     */
    valueAsArray: function valueAsArray() {
      if (this.multiple && this.mutableValue) {
        return this.mutableValue;
      } else if (this.mutableValue) {
        return [].concat(this.mutableValue);
      }

      return [];
    },

    /**
     * Determines if the clear button should be displayed.
     * @return {Boolean}
     */
    showClearButton: function showClearButton() {
      return !this.multiple && this.clearable && !this.open && this.mutableValue != null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-select/src/components/Select.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Selectvue_type_script_lang_js_ = (Selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-select/src/components/Select.vue?vue&type=style&index=0&lang=css&
var Selectvue_type_style_index_0_lang_css_ = __webpack_require__("08cf");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./node_modules/vue-select/src/components/Select.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Select = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "e08f":
/***/ (function(module, exports) {

module.exports = {
  data() {
    return {
      typeAheadPointer: -1
    }
  },

  watch: {
    filteredOptions() {
      this.typeAheadPointer = 0
    }
  },

  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * subtracting the current index by one.
     * @return {void}
     */
    typeAheadUp() {
      if (this.typeAheadPointer > 0) {
        this.typeAheadPointer--
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Move the typeAheadPointer visually down the list by
     * adding the current index by one.
     * @return {void}
     */
    typeAheadDown() {
      if (this.typeAheadPointer < this.filteredOptions.length - 1) {
        this.typeAheadPointer++
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     * @return {void}
     */
    typeAheadSelect() {
      if( this.filteredOptions[ this.typeAheadPointer ] ) {
        this.select( this.filteredOptions[ this.typeAheadPointer ] );
      } else if (this.taggable && this.search.length){
        this.select(this.search)
      }

      if( this.clearSearchOnSelect ) {
        this.search = "";
      }
    },
  }
}

/***/ }),

/***/ "ec79":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors~vSelect.js.map