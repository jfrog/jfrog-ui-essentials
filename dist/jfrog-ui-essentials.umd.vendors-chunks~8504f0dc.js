((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[212],{

/***/ "3a5b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _modalManager = _interopRequireDefault(__webpack_require__("9539"));

var _bvModalEvent = _interopRequireDefault(__webpack_require__("cfd0"));

var _button = _interopRequireDefault(__webpack_require__("b664"));

var _buttonClose = _interopRequireDefault(__webpack_require__("600b"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _listenOnRoot = _interopRequireDefault(__webpack_require__("edbc"));

var _normalizeSlot = _interopRequireDefault(__webpack_require__("532a"));

var _observeDom = _interopRequireDefault(__webpack_require__("bf9c"));

var _keyCodes = _interopRequireDefault(__webpack_require__("06e4"));

var _env = __webpack_require__("4565");

var _inspect = __webpack_require__("0d5a");

var _config = __webpack_require__("eb60");

var _html = __webpack_require__("be11");

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// --- Constants ---
var NAME = 'BModal'; // ObserveDom config to detect changes in modal content
// so that we can adjust the modal padding if needed

var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class'] // Options for DOM event listeners

};
var EVT_OPTIONS = {
  passive: true,
  capture: false
};
var props = {
  title: {
    type: String,
    default: ''
  },
  titleHtml: {
    type: String
  },
  titleTag: {
    type: String,
    default: 'h5'
  },
  size: {
    type: String,
    default: 'md'
  },
  centered: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  buttonSize: {
    type: String,
    default: ''
  },
  noStacking: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  noCloseOnBackdrop: {
    type: Boolean,
    default: false
  },
  noCloseOnEsc: {
    type: Boolean,
    default: false
  },
  noEnforceFocus: {
    type: Boolean,
    default: false
  },
  headerBgVariant: {
    type: String,
    default: null
  },
  headerBorderVariant: {
    type: String,
    default: null
  },
  headerTextVariant: {
    type: String,
    default: null
  },
  headerCloseVariant: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Array],
    default: null
  },
  bodyBgVariant: {
    type: String,
    default: null
  },
  bodyTextVariant: {
    type: String,
    default: null
  },
  modalClass: {
    type: [String, Array],
    default: null
  },
  dialogClass: {
    type: [String, Array],
    default: null
  },
  contentClass: {
    type: [String, Array],
    default: null
  },
  bodyClass: {
    type: [String, Array],
    default: null
  },
  footerBgVariant: {
    type: String,
    default: null
  },
  footerBorderVariant: {
    type: String,
    default: null
  },
  footerTextVariant: {
    type: String,
    default: null
  },
  footerClass: {
    type: [String, Array],
    default: null
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  hideHeaderClose: {
    type: Boolean,
    default: false
  },
  hideBackdrop: {
    type: Boolean,
    default: false
  },
  okOnly: {
    type: Boolean,
    default: false
  },
  okDisabled: {
    type: Boolean,
    default: false
  },
  cancelDisabled: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  returnFocus: {
    // type: Object,
    default: null
  },
  headerCloseLabel: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'headerCloseLabel') || '');
    }
  },
  cancelTitle: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'cancelTitle') || '');
    }
  },
  cancelTitleHtml: {
    type: String
  },
  okTitle: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'okTitle') || '');
    }
  },
  okTitleHtml: {
    type: String
  },
  cancelVariant: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'cancelVariant') || '');
    }
  },
  okVariant: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'okVariant') || '');
    }
  },
  lazy: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var _default2 = _vue.default.extend({
  name: NAME,
  mixins: [_id.default, _listenOnRoot.default, _normalizeSlot.default],
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: props,
  data: function data() {
    return {
      is_hidden: this.lazy || false,
      // For lazy modals
      is_visible: false,
      // Controls modal visible state
      is_transitioning: false,
      // Used for style control
      is_show: false,
      // Used for style control
      is_block: false,
      // Used for style control
      is_opening: false,
      // To signal that the modal is in the process of opening
      is_closing: false,
      // To signal that the modal is in the process of closing
      ignoreBackdropClick: false,
      // Used to signify if click out listener should ignore the click
      isModalOverflowing: false,
      return_focus: this.returnFocus || null,
      // The following items are controlled by the modalManager instance
      scrollbarWidth: 0,
      zIndex: _modalManager.default.getBaseZIndex(),
      isTop: true,
      isBodyOverflowing: false
    };
  },
  computed: {
    modalClasses: function modalClasses() {
      return [{
        fade: !this.noFade,
        show: this.is_show,
        'd-block': this.is_block
      }, this.modalClass];
    },
    modalStyles: function modalStyles() {
      var sbWidth = "".concat(this.scrollbarWidth, "px");
      return {
        paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
        paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : ''
      };
    },
    dialogClasses: function dialogClasses() {
      var _ref;

      return [(_ref = {}, _defineProperty(_ref, "modal-".concat(this.size), Boolean(this.size)), _defineProperty(_ref, 'modal-dialog-centered', this.centered), _defineProperty(_ref, 'modal-dialog-scrollable', this.scrollable), _ref), this.dialogClass];
    },
    backdropClasses: function backdropClasses() {
      return {
        fade: !this.noFade,
        show: this.is_show || this.noFade
      };
    },
    headerClasses: function headerClasses() {
      var _ref2;

      return [(_ref2 = {}, _defineProperty(_ref2, "bg-".concat(this.headerBgVariant), Boolean(this.headerBgVariant)), _defineProperty(_ref2, "text-".concat(this.headerTextVariant), Boolean(this.headerTextVariant)), _defineProperty(_ref2, "border-".concat(this.headerBorderVariant), Boolean(this.headerBorderVariant)), _ref2), this.headerClass];
    },
    bodyClasses: function bodyClasses() {
      var _ref3;

      return [(_ref3 = {}, _defineProperty(_ref3, "bg-".concat(this.bodyBgVariant), Boolean(this.bodyBgVariant)), _defineProperty(_ref3, "text-".concat(this.bodyTextVariant), Boolean(this.bodyTextVariant)), _ref3), this.bodyClass];
    },
    footerClasses: function footerClasses() {
      var _ref4;

      return [(_ref4 = {}, _defineProperty(_ref4, "bg-".concat(this.footerBgVariant), Boolean(this.footerBgVariant)), _defineProperty(_ref4, "text-".concat(this.footerTextVariant), Boolean(this.footerTextVariant)), _defineProperty(_ref4, "border-".concat(this.footerBorderVariant), Boolean(this.footerBorderVariant)), _ref4), this.footerClass];
    },
    modalOuterStyle: function modalOuterStyle() {
      // Styles needed for proper stacking of modals
      return {
        position: 'absolute',
        zIndex: this.zIndex
      };
    },
    slotScope: function slotScope() {
      return {
        ok: this.onOk,
        cancel: this.onCancel,
        close: this.onClose,
        hide: this.hide,
        visible: this.is_visible
      };
    }
  },
  watch: {
    visible: function visible(newVal, oldVal) {
      if (newVal !== oldVal) {
        this[newVal ? 'show' : 'hide']();
      }
    }
  },
  created: function created() {
    // Define non-reactive properties
    this._observer = null;
  },
  mounted: function mounted() {
    // Set initial z-index as queried from the DOM
    this.zIndex = _modalManager.default.getBaseZIndex(); // Listen for events from others to either open or close ourselves
    // and listen to all modals to enable/disable enforce focus

    this.listenOnRoot('bv::show::modal', this.showHandler);
    this.listenOnRoot('bv::hide::modal', this.hideHandler);
    this.listenOnRoot('bv::toggle::modal', this.toggleHandler); // Listen for `bv:modal::show events`, and close ourselves if the
    // opening modal not us

    this.listenOnRoot('bv::modal::show', this.modalListener); // Initially show modal?

    if (this.visible === true) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect();

      this._observer = null;
    }

    this.setEnforceFocus(false);
    this.setResizeEvent(false);

    if (this.is_visible) {
      this.is_visible = false;
      this.is_show = false;
      this.is_transitioning = false;
    }
  },
  methods: {
    updateModel: function updateModel(val) {
      if (val !== this.visible) {
        this.$emit('change', val);
      }
    },
    // Public Methods
    show: function show() {
      if (this.is_visible || this.is_opening) {
        // If already open, on in the process of opening, do nothing

        /* istanbul ignore next */
        return;
      }

      if (this.is_closing) {
        // If we are in the process of closing, wait until hidden before re-opening

        /* istanbul ignore next: very difficult to test */
        this.$once('hidden', this.show);
        /* istanbul ignore next */

        return;
      }

      this.is_opening = true;

      if (_env.isBrowser && document.activeElement.focus) {
        // Preset the fallback return focus value if it is not set
        // `document.activeElement` should be the trigger element that was clicked or
        // in the case of using the v-model, which ever element has current focus
        // Will be overridden by some commands such as toggle, etc.
        this.return_focus = this.return_focus || document.activeElement;
      }

      var showEvt = new _bvModalEvent.default('show', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null,
        modalId: this.safeId()
      });
      this.emitEvent(showEvt); // Don't show if canceled

      if (showEvt.defaultPrevented || this.is_visible) {
        this.is_opening = false; // Ensure the v-model reflects the current state

        this.updateModel(false);
        return;
      } // Show the modal


      this.doShow();
    },
    hide: function hide(trigger) {
      if (!this.is_visible || this.is_closing) {
        /* istanbul ignore next */
        return;
      }

      this.is_closing = true;
      var hideEvt = new _bvModalEvent.default('hide', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null,
        modalId: this.safeId(),
        trigger: trigger || null
      }); // We emit specific event for one of the three built-in buttons

      if (trigger === 'ok') {
        this.$emit('ok', hideEvt);
      } else if (trigger === 'cancel') {
        this.$emit('cancel', hideEvt);
      } else if (trigger === 'headerclose') {
        this.$emit('close', hideEvt);
      }

      this.emitEvent(hideEvt); // Hide if not canceled

      if (hideEvt.defaultPrevented || !this.is_visible) {
        this.is_closing = false; // Ensure v-model reflects current state

        this.updateModel(true);
        return;
      } // Stop observing for content changes


      if (this._observer) {
        this._observer.disconnect();

        this._observer = null;
      }

      this.is_visible = false; // Update the v-model

      this.updateModel(false);
    },
    // Public method to toggle modal visibility
    toggle: function toggle(triggerEl) {
      if (triggerEl) {
        this.return_focus = triggerEl;
      }

      if (this.is_visible) {
        this.hide('toggle');
      } else {
        this.show();
      }
    },
    // Private method to finish showing modal
    doShow: function doShow() {
      var _this = this;

      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (_modalManager.default.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce('bv::modal::hidden', this.doShow);
        return;
      } // Place modal in DOM if lazy


      this.is_hidden = false;
      this.$nextTick(function () {
        // We do this in `$nextTick()` to ensure the modal is in DOM first
        // before we show it
        _this.is_visible = true;
        _this.is_opening = false; // Update the v-model

        _this.updateModel(true); // Observe changes in modal content and adjust if necessary


        _this._observer = (0, _observeDom.default)(_this.$refs.content, _this.checkModalOverflow.bind(_this), OBSERVER_CONFIG);
      });
    },
    // Transition handlers
    onBeforeEnter: function onBeforeEnter() {
      this.is_transitioning = true;

      _modalManager.default.registerModal(this);

      this.checkModalOverflow();
      this.setResizeEvent(true);
    },
    onEnter: function onEnter() {
      this.is_block = true;
    },
    onAfterEnter: function onAfterEnter() {
      var _this2 = this;

      this.is_show = true;
      this.is_transitioning = false;
      this.$nextTick(function () {
        var shownEvt = new _bvModalEvent.default('shown', {
          cancelable: false,
          vueTarget: _this2,
          target: _this2.$refs.modal,
          relatedTarget: null,
          modalId: _this2.safeId()
        });

        _this2.emitEvent(shownEvt);

        _this2.focusFirst();

        _this2.setEnforceFocus(true);
      });
    },
    onBeforeLeave: function onBeforeLeave() {
      this.is_transitioning = true;
      this.setResizeEvent(false);
    },
    onLeave: function onLeave() {
      // Remove the 'show' class
      this.is_show = false;
    },
    onAfterLeave: function onAfterLeave() {
      var _this3 = this;

      this.is_block = false;
      this.is_transitioning = false;
      this.setEnforceFocus(false);
      this.isModalOverflowing = false;
      this.$nextTick(function () {
        _this3.returnFocusTo();

        _this3.is_closing = false;
        _this3.return_focus = null; // TODO: Need to find a way to pass the `trigger` property
        //       to the `hidden` event, not just only the `hide` event

        var hiddenEvt = new _bvModalEvent.default('hidden', {
          cancelable: false,
          vueTarget: _this3,
          target: _this3.lazy ? null : _this3.$refs.modal,
          relatedTarget: null,
          modalId: _this3.safeId()
        });

        _this3.emitEvent(hiddenEvt);

        _modalManager.default.unregisterModal(_this3);
      });
    },
    // Event emitter
    emitEvent: function emitEvent(bvModalEvt) {
      var type = bvModalEvt.type; // We emit on root first incase a global listener wants to cancel
      // the event first before the instance emits it's event

      this.emitOnRoot("bv::modal::".concat(type), bvModalEvt, bvModalEvt.modalId);
      this.$emit(type, bvModalEvt);
    },
    // UI event handlers
    onDialogMousedown: function onDialogMousedown() {
      var _this4 = this;

      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickOut handler
      var modal = this.$refs.modal;

      var onceModalMouseup = function onceModalMouseup(evt) {
        (0, _dom.eventOff)(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);

        if (evt.target === modal) {
          _this4.ignoreBackdropClick = true;
        }
      };

      (0, _dom.eventOn)(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);
    },
    onClickOut: function onClickOut(evt) {
      // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document body
      if (!this.is_visible || this.noCloseOnBackdrop || !(0, _dom.contains)(document.body, evt.target)) {
        return;
      }

      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false;
        return;
      } // If backdrop clicked, hide modal


      if (!(0, _dom.contains)(this.$refs.content, evt.target)) {
        this.hide('backdrop');
      }
    },
    onOk: function onOk() {
      this.hide('ok');
    },
    onCancel: function onCancel() {
      this.hide('cancel');
    },
    onClose: function onClose() {
      this.hide('headerclose');
    },
    onEsc: function onEsc(evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === _keyCodes.default.ESC && this.is_visible && !this.noCloseOnEsc) {
        this.hide('esc');
      }
    },
    // Document focusin listener
    focusHandler: function focusHandler(evt) {
      // If focus leaves modal, bring it back
      var modal = this.$refs.modal;

      if (!this.noEnforceFocus && this.isTop && this.is_visible && modal && document !== evt.target && !(0, _dom.contains)(modal, evt.target)) {
        modal.focus({
          preventScroll: true
        });
      }
    },
    // Turn on/off focusin listener
    setEnforceFocus: function setEnforceFocus(on) {
      var method = on ? _dom.eventOn : _dom.eventOff;
      method(document, 'focusin', this.focusHandler, EVT_OPTIONS);
    },
    // Resize listener
    setResizeEvent: function setResizeEvent(on) {
      var method = on ? _dom.eventOn : _dom.eventOff; // These events should probably also check if
      // body is overflowing

      method(window, 'resize', this.checkModalOverflow, EVT_OPTIONS);
      method(window, 'orientationchange', this.checkModalOverflow, EVT_OPTIONS);
    },
    // Root listener handlers
    showHandler: function showHandler(id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || document.activeElement || null;
        this.show();
      }
    },
    hideHandler: function hideHandler(id) {
      if (id === this.id) {
        this.hide('event');
      }
    },
    toggleHandler: function toggleHandler(id, triggerEl) {
      if (id === this.id) {
        this.toggle(triggerEl);
      }
    },
    modalListener: function modalListener(bvEvt) {
      // If another modal opens, close this one if stacking not permitted
      if (this.noStacking && bvEvt.vueTarget !== this) {
        this.hide();
      }
    },
    // Focus control handlers
    focusFirst: function focusFirst() {
      // TODO: Add support for finding input element with 'autofocus'
      //       attribute set and focus that element
      // Don't try and focus if we are SSR
      if (_env.isBrowser) {
        var modal = this.$refs.modal;
        var activeElement = document.activeElement; // If the modal contains the activeElement, we don't do anything

        if (modal && !(activeElement && (0, _dom.contains)(modal, activeElement))) {
          // Make sure top of modal is showing (if longer than the viewport)
          // and focus the modal content wrapper
          this.$nextTick(function () {
            modal.scrollTop = 0;
            modal.focus();
          });
        }
      }
    },
    returnFocusTo: function returnFocusTo() {
      // Prefer `returnFocus` prop over event specified
      // `return_focus` value
      var el = this.returnFocus || this.return_focus || document.activeElement || null; // Is el a string CSS selector?

      el = (0, _inspect.isString)(el) ? (0, _dom.select)(el) : el;

      if (el) {
        // Possibly could be a component reference
        el = el.$el || el;

        if ((0, _dom.isVisible)(el) && el.focus) {
          el.focus();
        }
      }
    },
    checkModalOverflow: function checkModalOverflow() {
      if (this.is_visible) {
        var modal = this.$refs.modal;
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;
      }
    }
  },
  render: function render(h) {
    var _this5 = this;

    var $slots = this.$slots; // Modal header

    var header = h(false);

    if (!this.hideHeader) {
      var modalHeader = this.normalizeSlot('modal-header', this.slotScope);

      if (!modalHeader) {
        var closeButton = h(false);

        if (!this.hideHeaderClose) {
          closeButton = h(_buttonClose.default, {
            props: {
              disabled: this.is_transitioning,
              ariaLabel: this.headerCloseLabel,
              textVariant: this.headerCloseVariant || this.headerTextVariant
            },
            on: {
              click: function click(evt) {
                _this5.onClose();
              }
            }
          }, [$slots['modal-header-close']]);
        }

        modalHeader = [h(this.titleTag, {
          class: ['modal-title']
        }, [this.normalizeSlot('modal-title', this.slotScope) || this.titleHtml || (0, _html.stripTags)(this.title)]), closeButton];
      }

      header = h('header', {
        ref: 'header',
        staticClass: 'modal-header',
        class: this.headerClasses,
        attrs: {
          id: this.safeId('__BV_modal_header_')
        }
      }, [modalHeader]);
    } // Modal body


    var body = h('div', {
      ref: 'body',
      staticClass: 'modal-body',
      class: this.bodyClasses,
      attrs: {
        id: this.safeId('__BV_modal_body_')
      }
    }, this.normalizeSlot('default', this.slotScope)); // Modal footer

    var footer = h(false);

    if (!this.hideFooter) {
      var modalFooter = this.normalizeSlot('modal-footer', this.slotScope);

      if (!modalFooter) {
        var cancelButton = h(false);

        if (!this.okOnly) {
          cancelButton = h(_button.default, {
            props: {
              variant: this.cancelVariant,
              size: this.buttonSize,
              disabled: this.cancelDisabled || this.busy || this.is_transitioning
            },
            on: {
              click: function click(evt) {
                _this5.onCancel();
              }
            }
          }, [$slots['modal-cancel'] || this.cancelTitleHtml || (0, _html.stripTags)(this.cancelTitle)]);
        }

        var okButton = h(_button.default, {
          props: {
            variant: this.okVariant,
            size: this.buttonSize,
            disabled: this.okDisabled || this.busy || this.is_transitioning
          },
          on: {
            click: function click(evt) {
              _this5.onOk();
            }
          }
        }, [$slots['modal-ok'] || this.okTitleHtml || (0, _html.stripTags)(this.okTitle)]);
        modalFooter = [cancelButton, okButton];
      }

      footer = h('footer', {
        ref: 'footer',
        staticClass: 'modal-footer',
        class: this.footerClasses,
        attrs: {
          id: this.safeId('__BV_modal_footer_')
        }
      }, [modalFooter]);
    } // Assemble modal content


    var modalContent = h('div', {
      ref: 'content',
      staticClass: 'modal-content',
      class: this.contentClass,
      attrs: {
        role: 'document',
        id: this.safeId('__BV_modal_content_'),
        'aria-labelledby': this.hideHeader ? null : this.safeId('__BV_modal_header_'),
        'aria-describedby': this.safeId('__BV_modal_body_')
      }
    }, [header, body, footer]); // Modal dialog wrapper

    var modalDialog = h('div', {
      staticClass: 'modal-dialog',
      class: this.dialogClasses,
      on: {
        mousedown: this.onDialogMousedown
      }
    }, [modalContent]); // Modal

    var modal = h('div', {
      ref: 'modal',
      staticClass: 'modal',
      class: this.modalClasses,
      style: this.modalStyles,
      directives: [{
        name: 'show',
        rawName: 'v-show',
        value: this.is_visible,
        expression: 'is_visible'
      }],
      attrs: {
        id: this.safeId(),
        role: 'dialog',
        tabindex: '-1',
        'aria-hidden': this.is_visible ? null : 'true',
        'aria-modal': this.is_visible ? 'true' : null
      },
      on: {
        keydown: this.onEsc,
        click: this.onClickOut
      }
    }, [modalDialog]); // Wrap modal in transition

    modal = h('transition', {
      props: {
        enterClass: '',
        enterToClass: '',
        enterActiveClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      },
      on: {
        'before-enter': this.onBeforeEnter,
        enter: this.onEnter,
        'after-enter': this.onAfterEnter,
        'before-leave': this.onBeforeLeave,
        leave: this.onLeave,
        'after-leave': this.onAfterLeave
      }
    }, [modal]); // Modal backdrop

    var backdrop = h(false);

    if (!this.hideBackdrop && (this.is_visible || this.is_transitioning || this.is_block)) {
      backdrop = h('div', {
        staticClass: 'modal-backdrop',
        class: this.backdropClasses,
        attrs: {
          id: this.safeId('__BV_modal_backdrop_')
        }
      }, [$slots['modal-backdrop']]);
    } // Tab trap to prevent page from scrolling to next element in
    // tab index during enforce focus tab cycle


    var tabTrap = h(false);

    if (this.is_visible && this.isTop && !this.noEnforceFocus) {
      tabTrap = h('div', {
        attrs: {
          tabindex: '0'
        }
      });
    } // Assemble modal and backdrop in an outer <div>
    // Needed for lazy modals


    var outer = h(false);

    if (!this.is_hidden) {
      outer = h('div', {
        key: 'modal-outer',
        style: this.modalOuterStyle,
        attrs: {
          id: this.safeId('__BV_modal_outer_')
        }
      }, [modal, tabTrap, backdrop]);
    } // Wrap in <div> to maintain `this.$el` reference for
    // hide/show method access


    return h('div', {}, [outer]);
  }
});

exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~8504f0dc.js.map