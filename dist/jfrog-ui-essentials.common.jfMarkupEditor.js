((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[32],{

/***/ "7678":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c024":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarkupEditorComponent/index.vue?vue&type=template&id=339da561&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.webworkerOk || _vm.previewersCount === 2)?_c('div',{staticClass:"jf-markup-editor",class:{'has-editor-label':_vm.editorLabel}},[_c('div',{staticClass:"controls"},[(_vm.editorLabel)?_c('div',{staticClass:"editor-label",class:{'editor-label-position':_vm.isInEditMode()}},[_vm._v("\n                "+_vm._s(_vm.editorLabel)+"\n            ")]):_vm._e(),(_vm.showControls && _vm.isEditable)?_c('div',{staticClass:"lang-select-wrapper"},[_c('jf-ui-select',{staticClass:"form-group-cell",attrs:{"jf-select-disabled":!_vm.isInEditMode(),"jf-select-options":['Markdown','Asciidoc','Plain Text']},on:{"jf-select-change":_vm.onLanguageChange},model:{value:(_vm.currentLanguage),callback:function ($$v) {_vm.currentLanguage=$$v},expression:"currentLanguage"}})],1):_vm._e(),(_vm.showControls)?_c('div',{staticClass:"switch-wrapper"},[_c('jf-switch',{ref:"switchController",staticClass:"no-margin-top",attrs:{"options":_vm.modeOptions},on:{"input":function($event){return _vm.onChangeModeInternal()}},model:{value:(_vm.currentMode),callback:function ($$v) {_vm.currentMode=$$v},expression:"currentMode"}})],1):_vm._e(),(!_vm.showControls && _vm.isEditable)?_c('button',{staticClass:"btn btn-default edit-button",attrs:{"type":"button"},on:{"click":function($event){return _vm.activateEditor()}}},[(_vm.value && _vm.value.length > 0)?_c('span',[_c('i',{staticClass:"icon icon-edit-pen"}),_c('span',[_vm._v("Edit")])]):_vm._e(),(!_vm.value || _vm.value.length === 0)?_c('span',[_c('i',{staticClass:"icon icon-new"}),_c('span',[_vm._v("Add")])]):_vm._e()]):_vm._e()]),(_vm.isInEditMode())?_c('div',{staticClass:"code-mirror-wrapper codemirror-wrapper"},[(_vm.currentLanguage === 'Markdown')?_c('jf-code-mirror',{key:_vm.currentLanguage,attrs:{"mime-type":"text/x-markdown","mode":"gfm","allow-edit":true,"height":"100%","autofocus":!_vm.preventAutoFocus,"enable-copy-to-clipboard":"value && value.length","clipboard-copy-entity-name":"text","value":_vm.value},on:{"input":function($event){return _vm.$emit('input', arguments[0])}}}):_vm._e(),(_vm.currentLanguage === 'Asciidoc')?_c('jf-code-mirror',{key:_vm.currentLanguage,attrs:{"mime-type":"text/x-markdown","mode":"asciidoc","allow-edit":true,"height":"100%","autofocus":!_vm.preventAutoFocus,"enable-copy-to-clipboard":"value && value.length","clipboard-copy-entity-name":"text","value":_vm.value},on:{"input":function($event){return _vm.$emit('input', arguments[0])}}}):_vm._e(),(_vm.currentLanguage === 'Plain Text')?_c('jf-code-mirror',{key:_vm.currentLanguage,attrs:{"allow-edit":true,"height":"100%","autofocus":!_vm.preventAutoFocus,"enable-copy-to-clipboard":"value && value.length","clipboard-copy-entity-name":"text","value":_vm.value},on:{"input":function($event){return _vm.$emit('input', arguments[0])}}}):_vm._e(),(_vm.onSave)?_c('button',{staticClass:"btn btn-primary save-button pull-right",on:{"click":function($event){return _vm.onSaveClick()}}},[_vm._v("\n                Save\n            ")]):_vm._e(),(!_vm.hideCancelButton)?_c('button',{staticClass:"btn btn-secondary clancel-button pull-right",on:{"click":function($event){return _vm.onCancel()}}},[_vm._v("\n                Cancel\n            ")]):_vm._e()],1):_vm._e(),(!_vm.isInEditMode())?_c('div',{staticClass:"preview-wrapper"},[_c('div',{staticClass:"preview",class:{'empty-preview': !_vm.preview || _vm.preview.length === 0},domProps:{"innerHTML":_vm._s(_vm.preview)}}),(!_vm.preview)?_c('div',{staticClass:"no-markup"},[_c('span',[_vm._v("No markup available.")]),_vm._v(" \n                "),(!_vm.showControls && _vm.isEditable)?_c('a',{staticClass:"jf-link",on:{"click":function($event){$event.preventDefault();return _vm.activateEditor()}}},[_vm._v("\n                    Add markup.\n                ")]):_vm._e()]):_vm._e()]):_vm._e()]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfMarkupEditorComponent/index.vue?vue&type=template&id=339da561&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarkupEditorComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var PREVIEW_MODE = 'Preview';
var EDIT_MODE = 'Edit';
/* harmony default export */ var JfMarkupEditorComponentvue_type_script_lang_js_ = ({
  name: 'jf-markup-editor',
  props: ['value', 'previewRenderers', 'language', 'mode', 'editable', 'showControls', 'hideCancelButton', 'editorLabel', 'preventAutoFocus'],
  'jf@inject': ['$timeout', '$scope', 'JFrogUIWebWorker'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {
      webworkerOk: null,
      previewersCount: null,
      modeOptions: null,
      onSave: null,
      preview: '',
      currentLanguage: this.language || 'Markdown',
      currentMode: this.mode || EDIT_MODE,
      isEditable: this.editable,
      renderers: this.previewRenderers
    };
  },
  created: function created() {
    this.EDIT_MODE = EDIT_MODE;
    this.PREVIEW_MODE = PREVIEW_MODE;
    this.instanceId = Math.floor(Math.random() * 10000000000);
    this.JFrogUIWebWorker = new this.JFrogUIWebWorker();
  },
  mounted: function mounted() {
    var _this = this;

    this.checkPreviewers();

    if (this.previewersCount === 2) {
      this.init();
    } else {
      this.JFrogUIWebWorker.check().then(function () {
        _this.JFrogUIWebWorker.open();

        _this.webworkerOk = true;

        _this.init();
      }).catch(function () {
        console.error("jf-code-mirror: Error: No preview render callback defined and WebWorker is not available.");
      });
    }

    this.$scope.$on('$destroy', function () {
      if (_this.webworkerOk) _this.JFrogUIWebWorker.close();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfMarkup'
  },
  methods: {
    init: function init() {
      var _this2 = this;

      if (!this.value) this.$emit('input', '');
      this.markupBackup = this.value;
      this.languageBackup = this.currentLanguage;
      if (this.isEditable === undefined) this.isEditable = true;
      this.modeOptions = [EDIT_MODE, PREVIEW_MODE];
      this.updatePreviewButton();
      this.$scope.$watch('jfMarkup.value', function () {
        if (_this2.canRenderPreview()) {
          _this2.renderPreview();
        }
      });
    },
    setPreview: function setPreview(preview) {
      this.preview = this.$sanitize(preview);
    },
    currentLanguageHasPreviewRenderer: function currentLanguageHasPreviewRenderer() {
      return this.renderers && this.renderers[this.currentLanguage.toLowerCase()];
    },
    canRenderPreview: function canRenderPreview() {
      return this.webworkerOk && !this.currentLanguageHasPreviewRenderer();
    },
    renderPreview: function renderPreview() {
      var _this3 = this;

      if (this.currentLanguage.toLowerCase() === 'plain text') {
        this.setPreview(this.value.replace(/\n/g, '<br>'));
      } else if (this.currentLanguageHasPreviewRenderer()) {
        this.renderers[this.currentLanguage.toLowerCase()](this.value, function (preview) {
          return _this3.setPreview(preview);
        });
      } else if (this.webworkerOk, this.currentLanguage, this.currentLanguage.toLowerCase(), this.instanceId) {
        this.JFrogUIWebWorker.markupPreview(this.currentLanguage.toLowerCase(), this.value, this.instanceId).then(function (html) {
          return _this3.setPreview(html);
        });
      }
    },
    updatePreviewButton: function updatePreviewButton() {
      this.modeOptions = [EDIT_MODE, PREVIEW_MODE];
    },
    onLanguageChange: function onLanguageChange() {
      var _this4 = this;

      this.updatePreviewButton();
      this.preview = '';

      if (this.canRenderPreview()) {
        this.renderPreview();
      }

      this.$timeout(function () {
        return _this4.$refs.switchController.updateOptionObjects();
      });
    },
    onChangeModeInternal: function onChangeModeInternal() {
      if (this.currentMode === PREVIEW_MODE) this.renderPreview();
      this.$emit('on-mode-change', {
        mode: this.currentMode
      });
    },
    checkPreviewers: function checkPreviewers() {
      if (!this.renderers) {
        this.renderers = {};
        this.previewersCount = 0;
      } else {
        if (this.renderers.markdown && this.renderers.asciidoc) {
          this.previewersCount = 2;
        } else if (this.renderers.markdown || this.renderers.asciidoc) {
          this.previewersCount = 1;
        }
      }
    },
    onCancel: function onCancel() {
      var _this5 = this;

      this.$timeout(function () {
        _this5.currentLanguage = _this5.languageBackup;

        _this5.$emit('input', _this5.markupBackup);

        _this5.preview = '';

        _this5.renderPreview();

        _this5.currentMode = PREVIEW_MODE;
        _this5.showControls = false;
      });
    },
    onSaveClick: function onSaveClick() {
      var _this6 = this;

      this.$timeout(function () {
        /* Todo: check the following condition. It may contain some undefined references: this.onSave */
        if (typeof _this6.onSave === 'function') {
          _this6.languageBackup = _this6.currentLanguage;
          _this6.markupBackup = _this6.value;

          _this6.$emit('on-save');

          _this6.showControls = false;
        }
      });
    },
    activateEditor: function activateEditor() {
      this.currentMode = EDIT_MODE;
      this.showControls = true;
    },
    isInEditMode: function isInEditMode() {
      return this.showControls && this.currentMode === this.EDIT_MODE;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfMarkupEditorComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfMarkupEditorComponentvue_type_script_lang_js_ = (JfMarkupEditorComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfMarkupEditorComponent/index.vue?vue&type=style&index=0&id=339da561&scoped=true&lang=less&
var JfMarkupEditorComponentvue_type_style_index_0_id_339da561_scoped_true_lang_less_ = __webpack_require__("fabd");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfMarkupEditorComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfMarkupEditorComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "339da561",
  null
  
)

/* harmony default export */ var JfMarkupEditorComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "fabd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_339da561_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7678");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_339da561_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_339da561_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfMarkupEditor.js.map