((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[37],{

/***/ "4c81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPasswordStrengthComponent/index.vue?vue&type=template&id=14a06e0c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"password-strength-container"},[_c('div',{staticClass:"password-strength-meter",class:this.strength.class},[_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 0}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 1}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 2}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 3}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 4}})]),_c('label',{staticClass:"password-strength-label"},[_vm._v(_vm._s(this.strength.label))])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPasswordStrengthComponent/index.vue?vue&type=template&id=14a06e0c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./src/directives/jf_password_strength/trivial_passwords.js

var TRIVIAL_PASSWORDS = '123456,password,12345678,qwerty,123456789,12345,1234,111111,1234567,123123,abc123,696969,666666,qwertyuiop,123321,1234567890,654321,1qaz2wsx,7777777,123qwe,000000,zxcvbnm,112233,zxcvbn,11111111,131313,159753,6969,secret,hello,1234qwer,gfhjkm,q1w2e3r4t5,qwer1234,ncc1701,q1w2e3r4,123654,1q2w3e4r,asdfasdf,thx1138,12344321,8675309,qwerty123,passw0rd,abcd1234,123abc,123456a,159357,789456,asdf,qwertyui,q1w2e3,1q2w3e4r5t,123456q,12345a,1qazxsw2,2112,asdasd,01012011,102030,11223344,315475,qwerty1,asdf1234,007007,lol123,147258369,qwertyu,asd123,qweasdzxc,hello1,12345q,111222,147258,zaq12wsx,010203,a123456,123456789a,1232323q,qwerty12,qwe123,12345qwert,asdfg,test123,password123,hello123'.split(',');
// CONCATENATED MODULE: ./src/directives/jf_password_strength/passrank.js





function checkRule(pass, rule) {
  var regex = new RegExp(rule, 'g');
  var matches = pass.match(regex);
  if (matches) return {
    pass: true,
    n: matches.length
  };else return {
    pass: false,
    n: 0
  };
}

function getUniqueCount(str) {
  if (!str || !str.length) return 0;
  var found = [];
  var count = 0;

  for (var i = 0; i < str.length; i++) {
    if (found.indexOf(str[i]) === -1) {
      count++;
      found.push(str[i]);
    }
  }

  return count;
}

function matchTrivials(pass) {
  var count = 0;
  var len = 0;
  TRIVIAL_PASSWORDS.forEach(function (word) {
    var matches = pass.match(new RegExp(word, 'g'));

    if (matches) {
      count += matches.length;
      len += word.length * matches.length;
    }
  });
  return {
    count: count,
    len: len
  };
}

function passrank(pass) {
  if (!pass || !pass.length) return 0;
  var rules = {
    CONTAINS_LOWER_CASE: '[a-z]',
    CONTAINS_UPPER_CASE: '[A-Z]',
    CONTAINS_NUMBERS: '[0-9]',
    CONTAINS_SYMBOLS: '[^A-Za-z0-9]',
    MIXES_CASING: '((?=[a-z][A-Z]+|[A-Z][a-z]+))',
    MIXES_LETTERS_NUMBERS: '((?=[a-zA-Z][0-9]+|[0-9][a-zA-Z]+))',
    MIXES_SIGNS: '((?=[a-zA-Z0-9][^A-Za-z0-9]+|[^A-Za-z0-9][a-zA-Z0-9]+))'
  };
  var checks = {};

  for (var rule in rules) {
    checks[rule] = checkRule(pass, rules[rule]);
  }

  var rank = 0;
  var uniques = getUniqueCount(pass); ////////////////////////////

  var mixBonus = checks.MIXES_CASING.n + checks.MIXES_LETTERS_NUMBERS.n + checks.MIXES_SIGNS.n;
  var debugStr = '';

  if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {
    debugStr += 'N+S+L+U';
    rank += Math.pow(uniques, 4) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 2);
  } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && (checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass)) {
    debugStr += 'N+S+(L|U)';
    rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 2.5);
  } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_SYMBOLS.pass) {
    debugStr += 'S+L+U';
    rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 3);
  } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_NUMBERS.pass) {
    debugStr += 'N+L+U';
    rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 3);
  } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass) {
    debugStr += 'N+S';
    rank += Math.pow(uniques, 2) * Math.pow(Math.max(1, mixBonus), 2) * Math.pow(pass.length, 2);
  } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_SYMBOLS.pass) {
    debugStr += 'S+(L|U)';
    rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.5);
  } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_NUMBERS.pass) {
    debugStr += 'N+(L|U)';
    rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.2);
  } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {
    debugStr += 'L+U';
    rank += Math.pow(uniques, 1.25) * Math.pow(Math.max(1, mixBonus), 1.25) * Math.pow(pass.length, 1.1);
  } else {
    debugStr += '0000';
    rank += Math.pow(uniques, 1.1) * Math.pow(Math.max(1, mixBonus), 1.1) * Math.pow(pass.length, 0.5);
  }

  debugStr += ' * ' + "u: ".concat(uniques, " mb: ").concat(mixBonus, " l: ").concat(pass.length, " *"); ////////////////////////////
  //Length and Uniqueness bonus

  if (mixBonus >= 1) rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.5)));else rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.2))); //log

  rank = Math.round(Math.log(rank));
  debugStr += " r: ".concat(rank); //Normalize

  if (rank >= 38) rank = 100;else rank = Math.round(rank / 38 * 100);
  debugStr += " rN: ".concat(rank); //    console.log(debugStr);

  return Math.round(rank);
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPasswordStrengthComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var STRENGTH = {
  BLANK: {
    label: '',
    class: 'blank',
    sections: 0
  },
  SHORT: {
    label: 'Too short',
    class: 'short',
    sections: 1
  },
  WEAK: {
    label: 'Weak',
    class: 'week',
    sections: 2
  },
  MEDIUM: {
    label: 'Medium',
    class: 'medium',
    sections: 3
  },
  GOOD: {
    label: 'Good',
    class: 'good',
    sections: 4
  },
  STRONG: {
    label: 'Strong',
    class: 'strong',
    sections: 5
  }
};
/* harmony default export */ var JfPasswordStrengthComponentvue_type_script_lang_js_ = ({
  name: 'jf-password-strength',
  props: {
    password: {
      type: String
    }
  },
  computed: {
    rank: function rank() {
      return passrank(this.password);
    },
    strength: function strength() {
      if (!this.password) {
        return STRENGTH.BLANK;
      }

      if (this.rank === 0) {
        return STRENGTH.BLANK;
      } else if (this.rank < 20) {
        return STRENGTH.SHORT;
      } else if (this.rank < 40) {
        return STRENGTH.WEAK;
      } else if (this.rank < 60) {
        return STRENGTH.MEDIUM;
      } else if (this.rank < 80) {
        return STRENGTH.MEDIUM;
      } else {
        return STRENGTH.STRONG;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfPasswordStrengthComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfPasswordStrengthComponentvue_type_script_lang_js_ = (JfPasswordStrengthComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfPasswordStrengthComponent/index.vue?vue&type=style&index=0&id=14a06e0c&scoped=true&lang=less&
var JfPasswordStrengthComponentvue_type_style_index_0_id_14a06e0c_scoped_true_lang_less_ = __webpack_require__("6d03");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfPasswordStrengthComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfPasswordStrengthComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "14a06e0c",
  null
  
)

/* harmony default export */ var JfPasswordStrengthComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6d03":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f47e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f47e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfPasswordStrength.js.map