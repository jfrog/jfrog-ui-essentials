((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[16],{

/***/ "35ac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=template&id=42db6ef9&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"drag-and-drop-txt-wrapper",class:{'ready-for-upload':_vm.shouldDisplayUploadIcon()}},[(_vm.dndHeadingHtml)?_c('label',{domProps:{"innerHTML":_vm._s(_vm.sanitizedHeaderHtml)}}):_vm._e(),_c('jf-field',{attrs:{"autofocus":_vm.autofocus}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.dndContent),expression:"dndContent"}],staticClass:"input-text monospaced",style:(_vm.dndStyle),attrs:{"name":"dndtext","required":_vm.dndRequired,"spellcheck":"false"},domProps:{"value":(_vm.dndContent)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.dndContent=$event.target.value},function($event){return _vm.dndChange()}]}}),_c('label',{staticClass:"call-to-action-label",class:{'icon-upload':_vm.shouldDisplayUploadIcon()},domProps:{"innerHTML":_vm._s(_vm.sanitizedCallToAction)}})])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=template&id=42db6ef9&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfDragAndDropTxtComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-and-drop-txt',
  props: ['dndContent', 'dndHeadingHtml', 'dndStyle', 'dndRequired', 'dndCallToAction', 'dndAutoFocus'],
  'jf@inject': ['$scope', '$element', '$attrs', 'JFrogNotifications'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {};
  },
  created: function created() {
    this.draggedFileSizeLimit = 400; // limit file size (in KB)

    this.entered = false;
  },
  mounted: function mounted() {
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    // Binding dragenter,dragleave,drop to <jf_drang_and_drop_text> element
    // since these events are not natively supported by Angular
    this.$element.bind('dragover', this.handleDragEnter.bind(this));
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$element.bind('dragleave', this.handleDragLeave.bind(this));
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$element.bind('drop', this.handleDropEvent.bind(this));
  },
  ng1_legacy: {
    'controllerAs': 'jfDragAndDropTxt'
  },
  methods: {
    shouldDisplayUploadIcon: function shouldDisplayUploadIcon() {
      return $(this.$element).find('textarea').val() === '' && !$(this.$element).is('.over');
    },
    onFileLoadSuccess: function onFileLoadSuccess(event) {
      this.dndContent = event.target.result;
      $(this.$element).find('textarea').focus();
      /* Todo: check the following condition. It may contain some undefined references: this.dndChange */

      if (this.dndChange !== null) this.$emit('dnd-change');
    },
    onFileLoadFailure: function onFileLoadFailure(event) {
      var errorMessage = 'Unable to access license file.';

      if (event.target.error.name === 'SecurityError') {
        errorMessage += '<br> The file is either unsafe or being used by another application.';
      }

      if (this.dndOnError !== null) {
        this.$emit('dnd-on-error', {
          msg: errorMessage
        });
      } else {
        this.JFrogNotifications.create({
          error: errorMessage
        });
      }
    },
    handleDropEvent: function handleDropEvent(event) {
      var _this = this;

      this.entered = false;
      this.toggleDragEffect();
      event.preventDefault();
      event.stopPropagation(); // Initialize a file reader and get file path

      var reader = new FileReader();
      var file = event.originalEvent.dataTransfer.files[0]; // Bind to reader events

      reader.onload = function (event) {
        _this.onFileLoadSuccess(event);
      };

      reader.onerror = function (event) {
        _this.onFileLoadFailure(event);
      }; // Limit the read file size


      var fileSize = Math.round(file.size / 1000);

      if (fileSize > this.draggedFileSizeLimit) {
        var errorMessage = 'File exceeds the maximum size of ' + this.draggedFileSizeLimit + ' KB';

        if (this.dndOnError !== null) {
          this.$emit('dnd-on-error', {
            msg: errorMessage
          });
        } else {
          this.JFrogNotifications.create({
            error: errorMessage
          });
        }

        return false;
      } // Read the file if not exceeds size limit


      reader.readAsText(file);
    },
    callingCodeShouldEnd: function callingCodeShouldEnd(event) {
      // This is an ugly fix for the issue of FireFox browser
      // firing the dragover/dragenter and dragleve events again and again
      // when dragging a file over the textarea
      var theCallingCodeShouldEnd = false;

      try {
        if (event.relatedTarget.nodeType == 3) {
          theCallingCodeShouldEnd = true;
        }
      } catch (err) {}

      if (event.target === event.relatedTarget) {
        theCallingCodeShouldEnd = true;
      }

      return theCallingCodeShouldEnd;
    },
    handleDragEnter: function handleDragEnter(event) {
      event.preventDefault();
      event.stopPropagation(); // cancel the event on FF

      if (this.callingCodeShouldEnd(event)) {
        return;
      }

      if (!this.entered) {
        this.entered = true;
        this.toggleDragEffect();
        event.originalEvent.dataTransfer.effectAllowed = 'copy';
        return false;
      }
    },
    handleDragLeave: function handleDragLeave(event) {
      event.preventDefault();
      event.stopPropagation(); // cancel the event on FF

      if (this.callingCodeShouldEnd(event)) {
        return;
      }

      if (this.entered) {
        this.entered = false;
        this.toggleDragEffect();
        return false;
      }
    },
    toggleDragEffect: function toggleDragEffect() {
      var dndWrapper = $(this.$element).find('.drag-and-drop-txt-wrapper'); // dndWrapper.removeClass('icon-upload');

      dndWrapper.toggleClass('over');
    }
  },
  computed: {
    autofocus: function autofocus() {
      return this.dndAutoFocus === undefined ? true : this.dndAutoFocus;
    },
    sanitizedHeaderHtml: function sanitizedHeaderHtml() {
      return this.text ? this.$sanitize(this.dndHeadingHtml) : '';
    },
    sanitizedCallToAction: function sanitizedCallToAction() {
      return this.text ? this.$sanitize(this.dndCallToAction) : "Copy your text or\n<b>drop a file</b>";
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragAndDropTxtComponentvue_type_script_lang_js_ = (JfDragAndDropTxtComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfDragAndDropTxtComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "42db6ef9",
  null
  
)

/* harmony default export */ var JfDragAndDropTxtComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfDragAndDropTxt.js.map