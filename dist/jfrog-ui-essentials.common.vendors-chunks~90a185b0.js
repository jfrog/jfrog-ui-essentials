((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[237],{

/***/ "4eb5":
/***/ (function(module, exports, __webpack_require__) {

var Clipboard = __webpack_require__("6981") // FIXME: workaround for browserify

var VueClipboardConfig = {
  autoSetContainer: false
};

var VueClipboard = {
  install: function (Vue) {
    Vue.prototype.$clipboardConfig = VueClipboardConfig;
    Vue.prototype.$copyText = function (text, container) {
      return new Promise(function (resolve, reject) {
        var fake_el = document.createElement('button');
        var clipboard = new Clipboard(fake_el, {
          text: function () { return text },
          action: function () { return 'copy' },
          container: typeof container === 'object' ? container : document.body
        });
        clipboard.on('success', function (e) {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on('error', function (e) {
          clipboard.destroy();
          reject(e);
        });
        fake_el.click();
      });
    };

    Vue.directive('clipboard', {
      bind: function (el, binding, vnode) {
        if(binding.arg === 'success') {
          el._v_clipboard_success = binding.value
        } else if(binding.arg === 'error') {
          el._v_clipboard_error = binding.value
        } else {
          var clipboard = new Clipboard(el, {
            text: function () { return binding.value },
            action: function () { return binding.arg === 'cut' ? 'cut' : 'copy' },
            container: VueClipboardConfig.autoSetContainer ? el : undefined
          })
          clipboard.on('success', function (e) {
            var callback = el._v_clipboard_success
            callback && callback(e)
          })
          clipboard.on('error', function (e) {
            var callback = el._v_clipboard_error
            callback && callback(e)
          })
          el._v_clipboard = clipboard
        }
      },
      update: function (el, binding) {
        if(binding.arg === 'success') {
          el._v_clipboard_success = binding.value
        } else if(binding.arg === 'error') {
          el._v_clipboard_error = binding.value
        } else {
          el._v_clipboard.text = function () { return binding.value }
          el._v_clipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
        }
      },
      unbind: function (el, binding) {
        if(binding.arg === 'success') {
          delete el._v_clipboard_success
        } else if(binding.arg === 'error') {
          delete el._v_clipboard_error
        } else {
          el._v_clipboard.destroy()
          delete el._v_clipboard
        }
      }
    })
  },
  config: VueClipboardConfig
}

if (true) {
  module.exports = VueClipboard
} else {}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~90a185b0.js.map