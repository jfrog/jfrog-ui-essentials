((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[107],{

/***/ "5c02":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _html = __webpack_require__("be11");

var _formCheckbox = _interopRequireDefault(__webpack_require__("bdb1"));

var _formRadio = _interopRequireDefault(__webpack_require__("2c38"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default = {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    validated: {
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: 'secondary'
    }
  },
  computed: {
    inline: function inline() {
      return !this.stacked;
    },
    groupName: function groupName() {
      // Checks/Radios tied to the same model must have the same name,
      // especially for ARIA accessibility.
      return this.name || this.safeId();
    },
    groupClasses: function groupClasses() {
      if (this.buttons) {
        return ['btn-group-toggle', this.inline ? 'btn-group' : 'btn-group-vertical', this.size ? "btn-group-".concat(this.size) : '', this.validated ? "was-validated" : ''];
      }

      return [this.validated ? "was-validated" : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      var ariaInvalid = this.ariaInvalid;

      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true';
      }

      return this.computedState === false ? 'true' : null;
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.localChecked = newVal;
    },
    localChecked: function localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;
    var inputs = this.formOptions.map(function (option, idx) {
      var uid = "_BV_option_".concat(idx, "_");
      return h(_this.is_RadioGroup ? _formRadio.default : _formCheckbox.default, {
        key: uid,
        props: {
          id: _this.safeId(uid),
          value: option.value,
          // Individual radios or checks can be disabled in a group
          disabled: option.disabled || false // We don't need to include these, since the input's will know they are inside here
          // name: this.groupName,
          // form: this.form || null,
          // required: Boolean(this.name && this.required)

        }
      }, [h('span', {
        domProps: (0, _html.htmlOrText)(option.html, option.text)
      })]);
    });
    return h('div', {
      class: this.groupClasses,
      attrs: {
        id: this.safeId(),
        role: this.is_RadioGroup ? 'radiogroup' : 'group',
        // Tabindex to allow group to be focused if needed
        tabindex: '-1',
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    }, [$slots.first, inputs, $slots.default]);
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~425b561a.js.map