(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jfrog-ui-essentials"] = factory(require("vue"));
	else
		root["jfrog-ui-essentials"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([null,20,147,268,248,259,360,239,393,283,171,394,346,412,68,166,306,79,162,143,23,284,52,45,291,403,301,401,255,270,313,123,238,375,295,165,11,209,41,396,350,307,315,289,36,391,409,287,61,93,246,410,359,390,282,183,126,62,212,250,279,234,285,181,29,110,113,46,303,229,271,272,357,249,185,389,276,354,132,406,312,160,133,382,39,207,102,340,78,290,322,21,137,186,180,300,337,341,219,107,159,202,328,9,112,225,242,10,343,206,57,220,208,411,245,258,233,125,292,218,80,169,392,384,241,55,200,37,387,235,115,323,342,262,415,86,35,352,320,73,333,182,196,230,134,405,363,142,168,371,324,358,179,106,114,63,6,30,152,332,84,94,309,83,158,356,149,308,253,376,65,24,226,318,252,98,338,89,330,265,244,15,216,75,122,210,365,413,64,66,194,4,366,278,85,331,108,326,1,222,99,351,103,67,345,260,178,40,97,18,223,130,310,167,199,377,12,348,369,327,397,101,286,404,72,150,87,261,42,293,58,170,372,116,211,22,400,213,191,145,274,414,370,2,247,317,155,319,398,267,192,298,74,54,96,294,217,264,7,129,304,275,205,3,90,151,407,50,280,305,388,34,188,100,13,329,374,105,232,386,117,173,111,140,28,273,157,88,302,296,91,190,156,380,227,33,95,367,361,364,174,231,172,204,48,236,399,16,60,325,203,288,69,215,177,281,299,221,127,243,164,385,257,334,139,138,316,344,408,131,214,31,76,104,59,189,153,339,51,362,119,32,378,201,335,402,154,14,184,266,195,135,118,17,121,321,38,25,161,128,314,336,349,56,26,297,77,311,141,187,124,44,277,82,224,47,109,228,43,240,355,71,53,254,5,347,379,251,136,256,81,92,193,383,175,176,395,353,198,237,8,197,146,163,49,19,381,148,269,27,120,263,144,368,373,70]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "04c9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3b2b");
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7514");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4917");
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_3__);





/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */
jQuery.extend({
  highlight: function highlight(node, re, nodeName, className) {
    if (node.nodeType === 3) {
      var match = node.data.match(re);

      if (match) {
        var highlight = document.createElement(nodeName || 'span');
        highlight.className = className || 'highlight';
        var wordNode = node.splitText(match.index);
        wordNode.splitText(match[0].length);
        var wordClone = wordNode.cloneNode(true);
        highlight.appendChild(wordClone);
        wordNode.parentNode.replaceChild(highlight, wordNode);
        return 1; //skip added node in parent
      }
    } else if (node.nodeType === 1 && node.childNodes && // only element nodes that have children
    !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
    !(node.tagName === nodeName.toUpperCase() && node.className === className)) {
      // skip if already highlighted
      for (var i = 0; i < node.childNodes.length; i++) {
        i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
      }
    }

    return 0;
  }
});

jQuery.fn.unhighlight = function (options) {
  var settings = {
    className: 'highlight',
    element: 'span'
  };
  jQuery.extend(settings, options);
  return this.find(settings.element + "." + settings.className).each(function () {
    var parent = this.parentNode;
    parent.replaceChild(this.firstChild, this);
    parent.normalize();
  }).end();
};

jQuery.fn.highlight = function (words, options) {
  var settings = {
    className: 'highlight',
    element: 'span',
    caseSensitive: false,
    wordsOnly: false
  };
  jQuery.extend(settings, options);

  if (words.constructor === String) {
    words = [words];
  }

  words = jQuery.grep(words, function (word, i) {
    return word != '';
  });
  words = jQuery.map(words, function (word, i) {
    return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  });

  if (words.length == 0) {
    return this;
  }

  ;
  var flag = settings.caseSensitive ? "" : "i";
  var pattern = "(" + words.join("|") + ")";

  if (settings.wordsOnly) {
    pattern = "\\b" + pattern + "\\b";
  }

  var re = new RegExp(pattern, flag);
  return this.each(function () {
    jQuery.highlight(this, re, settings.element, settings.className);
  });
};

/***/ }),

/***/ "099d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5511");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0ea8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "102d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "120e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "160c":
/***/ (function(module, exports) {

var Vue = window.Vue;
Vue.directive('jf-clear-errors', {
  bind: function bind(el) {
    $(el).on("mousedown", function () {
      var JFrogEventBus = Vue.prototype.$jfrog.get('JFrogEventBus');
      JFrogEventBus.dispatch(JFrogEventBus.getEventsDefinition().FORM_CLEAR_FIELD_VALIDATION, true);
    });
  }
});

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2160":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2215":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "23cd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("84da");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "24d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3badff9f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("baab");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3badff9f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3badff9f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3badff9f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "26a0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2bfe");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "271b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("65c1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2bfe":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2ccd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5564e7bc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("528d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5564e7bc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5564e7bc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5564e7bc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "36a9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0319e8f4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bb03");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0319e8f4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0319e8f4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0319e8f4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "37db":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "39b0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "42a0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d31c20e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a005");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d31c20e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d31c20e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d31c20e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4678":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "2bfb",
	"./af.js": "2bfb",
	"./ar": "8e73",
	"./ar-dz": "a356",
	"./ar-dz.js": "a356",
	"./ar-kw": "423e",
	"./ar-kw.js": "423e",
	"./ar-ly": "1cfd",
	"./ar-ly.js": "1cfd",
	"./ar-ma": "0a84",
	"./ar-ma.js": "0a84",
	"./ar-sa": "8230",
	"./ar-sa.js": "8230",
	"./ar-tn": "6d83",
	"./ar-tn.js": "6d83",
	"./ar.js": "8e73",
	"./az": "485c",
	"./az.js": "485c",
	"./be": "1fc1",
	"./be.js": "1fc1",
	"./bg": "84aa",
	"./bg.js": "84aa",
	"./bm": "a7fa",
	"./bm.js": "a7fa",
	"./bn": "9043",
	"./bn.js": "9043",
	"./bo": "d26a",
	"./bo.js": "d26a",
	"./br": "6887",
	"./br.js": "6887",
	"./bs": "2554",
	"./bs.js": "2554",
	"./ca": "d716",
	"./ca.js": "d716",
	"./cs": "3c0d",
	"./cs.js": "3c0d",
	"./cv": "03ec",
	"./cv.js": "03ec",
	"./cy": "9797",
	"./cy.js": "9797",
	"./da": "0f14",
	"./da.js": "0f14",
	"./de": "b469",
	"./de-at": "b3eb",
	"./de-at.js": "b3eb",
	"./de-ch": "bb71",
	"./de-ch.js": "bb71",
	"./de.js": "b469",
	"./dv": "598a",
	"./dv.js": "598a",
	"./el": "8d47",
	"./el.js": "8d47",
	"./en-SG": "cdab",
	"./en-SG.js": "cdab",
	"./en-au": "0e6b",
	"./en-au.js": "0e6b",
	"./en-ca": "3886",
	"./en-ca.js": "3886",
	"./en-gb": "39a6",
	"./en-gb.js": "39a6",
	"./en-ie": "e1d3",
	"./en-ie.js": "e1d3",
	"./en-il": "7333",
	"./en-il.js": "7333",
	"./en-nz": "6f50",
	"./en-nz.js": "6f50",
	"./eo": "65db",
	"./eo.js": "65db",
	"./es": "898b",
	"./es-do": "0a3c",
	"./es-do.js": "0a3c",
	"./es-us": "55c9",
	"./es-us.js": "55c9",
	"./es.js": "898b",
	"./et": "ec18",
	"./et.js": "ec18",
	"./eu": "0ff2",
	"./eu.js": "0ff2",
	"./fa": "8df4",
	"./fa.js": "8df4",
	"./fi": "81e9",
	"./fi.js": "81e9",
	"./fo": "0721",
	"./fo.js": "0721",
	"./fr": "9f26",
	"./fr-ca": "d9f8",
	"./fr-ca.js": "d9f8",
	"./fr-ch": "0e49",
	"./fr-ch.js": "0e49",
	"./fr.js": "9f26",
	"./fy": "7118",
	"./fy.js": "7118",
	"./ga": "5120",
	"./ga.js": "5120",
	"./gd": "f6b4",
	"./gd.js": "f6b4",
	"./gl": "8840",
	"./gl.js": "8840",
	"./gom-latn": "0caa",
	"./gom-latn.js": "0caa",
	"./gu": "e0c5",
	"./gu.js": "e0c5",
	"./he": "c7aa",
	"./he.js": "c7aa",
	"./hi": "dc4d",
	"./hi.js": "dc4d",
	"./hr": "4ba9",
	"./hr.js": "4ba9",
	"./hu": "5b14",
	"./hu.js": "5b14",
	"./hy-am": "d6b6",
	"./hy-am.js": "d6b6",
	"./id": "5038",
	"./id.js": "5038",
	"./is": "0558",
	"./is.js": "0558",
	"./it": "6e98",
	"./it-ch": "6f12",
	"./it-ch.js": "6f12",
	"./it.js": "6e98",
	"./ja": "079e",
	"./ja.js": "079e",
	"./jv": "b540",
	"./jv.js": "b540",
	"./ka": "201b",
	"./ka.js": "201b",
	"./kk": "6d79",
	"./kk.js": "6d79",
	"./km": "e81d",
	"./km.js": "e81d",
	"./kn": "3e92",
	"./kn.js": "3e92",
	"./ko": "22f8",
	"./ko.js": "22f8",
	"./ku": "2421",
	"./ku.js": "2421",
	"./ky": "9609",
	"./ky.js": "9609",
	"./lb": "440c",
	"./lb.js": "440c",
	"./lo": "b29d",
	"./lo.js": "b29d",
	"./lt": "26f9",
	"./lt.js": "26f9",
	"./lv": "b97c",
	"./lv.js": "b97c",
	"./me": "293c",
	"./me.js": "293c",
	"./mi": "688b",
	"./mi.js": "688b",
	"./mk": "6909",
	"./mk.js": "6909",
	"./ml": "02fb",
	"./ml.js": "02fb",
	"./mn": "958b",
	"./mn.js": "958b",
	"./mr": "39bd",
	"./mr.js": "39bd",
	"./ms": "ebe4",
	"./ms-my": "6403",
	"./ms-my.js": "6403",
	"./ms.js": "ebe4",
	"./mt": "1b45",
	"./mt.js": "1b45",
	"./my": "8689",
	"./my.js": "8689",
	"./nb": "6ce3",
	"./nb.js": "6ce3",
	"./ne": "3a39",
	"./ne.js": "3a39",
	"./nl": "facd",
	"./nl-be": "db29",
	"./nl-be.js": "db29",
	"./nl.js": "facd",
	"./nn": "b84c",
	"./nn.js": "b84c",
	"./pa-in": "f3ff",
	"./pa-in.js": "f3ff",
	"./pl": "8d57",
	"./pl.js": "8d57",
	"./pt": "f260",
	"./pt-br": "d2d4",
	"./pt-br.js": "d2d4",
	"./pt.js": "f260",
	"./ro": "972c",
	"./ro.js": "972c",
	"./ru": "957c",
	"./ru.js": "957c",
	"./sd": "6784",
	"./sd.js": "6784",
	"./se": "ffff",
	"./se.js": "ffff",
	"./si": "eda5",
	"./si.js": "eda5",
	"./sk": "7be6",
	"./sk.js": "7be6",
	"./sl": "8155",
	"./sl.js": "8155",
	"./sq": "c8f3",
	"./sq.js": "c8f3",
	"./sr": "cf1e",
	"./sr-cyrl": "13e9",
	"./sr-cyrl.js": "13e9",
	"./sr.js": "cf1e",
	"./ss": "52bd",
	"./ss.js": "52bd",
	"./sv": "5fbd",
	"./sv.js": "5fbd",
	"./sw": "74dc",
	"./sw.js": "74dc",
	"./ta": "3de5",
	"./ta.js": "3de5",
	"./te": "5cbb",
	"./te.js": "5cbb",
	"./tet": "576c",
	"./tet.js": "576c",
	"./tg": "3b1b",
	"./tg.js": "3b1b",
	"./th": "10e8",
	"./th.js": "10e8",
	"./tl-ph": "0f38",
	"./tl-ph.js": "0f38",
	"./tlh": "cf75",
	"./tlh.js": "cf75",
	"./tr": "0e81",
	"./tr.js": "0e81",
	"./tzl": "cf51",
	"./tzl.js": "cf51",
	"./tzm": "c109",
	"./tzm-latn": "b53d",
	"./tzm-latn.js": "b53d",
	"./tzm.js": "c109",
	"./ug-cn": "6117",
	"./ug-cn.js": "6117",
	"./uk": "ada2",
	"./uk.js": "ada2",
	"./ur": "5294",
	"./ur.js": "5294",
	"./uz": "2e8c",
	"./uz-latn": "010e",
	"./uz-latn.js": "010e",
	"./uz.js": "2e8c",
	"./vi": "2921",
	"./vi.js": "2921",
	"./x-pseudo": "fd7e",
	"./x-pseudo.js": "fd7e",
	"./yo": "7f33",
	"./yo.js": "7f33",
	"./zh-cn": "5c3a",
	"./zh-cn.js": "5c3a",
	"./zh-hk": "49ab",
	"./zh-hk.js": "49ab",
	"./zh-tw": "90ea",
	"./zh-tw.js": "90ea"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "4678";

/***/ }),

/***/ "48a9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99fb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "49cc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ea18396c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0ea8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ea18396c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ea18396c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ea18396c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4e6a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "51d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_25692ef9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e90d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_25692ef9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_25692ef9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_25692ef9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "520b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_00732f82_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2160");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_00732f82_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_00732f82_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_00732f82_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "528d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "54d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_eef9187a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("edf8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_eef9187a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_eef9187a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_eef9187a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5511":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "582c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_48e113b2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("81a4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_48e113b2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_48e113b2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_48e113b2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "59ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_34c64372_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("971c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_34c64372_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_34c64372_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_34c64372_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5b0d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7032d9d2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ceb4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7032d9d2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7032d9d2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7032d9d2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "602e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "65c1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6993":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d0383ba_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("120e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d0383ba_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d0383ba_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6d0383ba_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6d03":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f47e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_14a06e0c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7194":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "72ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7835":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7e86":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "81a4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "84da":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "877b":
/***/ (function(module, exports) {

var Vue = window.Vue;
Vue.directive('jf-fake-readonly', {
  bind: function bind(el) {
    $(el).attr('readonly', true);

    var removeAttr = function removeAttr() {
      $(el).attr('readonly', false);
      $(el).off('focus', removeAttr);
    };

    $(el).on('focus', removeAttr);
  }
});

/***/ }),

/***/ "88eb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b106956a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("39b0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b106956a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b106956a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b106956a_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8def":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_334f9b6b_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7194");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_334f9b6b_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_334f9b6b_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_334f9b6b_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9224":
/***/ (function(module) {

module.exports = {"name":"jfrog-ui-essentials","version":"3.0.0-vue-dev","description":"JFrog UI Essentials","scripts":{"build":"vue-cli-service build --target lib --name jfrog-ui-essentials src/index.js","lint":"vue-cli-service lint","dev":"nodemon --ignore 'src/**/*.spec.js' --ignore 'src/**/*.test.js' -w src/ -e js,html,css,less,vue -x vue-cli-service  -- build --target lib --name jfrog-ui-essentials --formats commonjs src/index.js dev","test:unit:coverage":"vue-cli-service test:unit --coverage","test:unit":"vue-cli-service test:unit --watch","watch":"vue-cli-service build --mode development --target lib --name jfrog-ui-essentials src/index.js","//postshringwrap":"hack for an issue in npm. see https://npm.community/t/some-packages-have-dist-tarball-as-http-and-not-https/285/16","postshrinkwrap":"if [ \"`uname`\" = \"Darwin\" ]; then sed -i '' -e 's/http:\\/\\//https:\\/\\//g' package-lock.json; else sed -i -e 's/http:\\/\\//https:\\/\\//g' package-lock.json; fi"},"dependencies":{"axios":"^0.18.0","billboard.js":"^1.8.0","bootstrap":"4.3.1","bootstrap-vue":"^2.0.0-rc.11","codemirror":"5.42.2","components-jqueryui":"^1.12.1","deep-diff":"^1.0.2","jf-tooltipster":"3.3.0","jquery":"^3.3.1","jquery-contextmenu":"1.8.1","js-beautify":"^1.8.9","lodash":"^4.17.11","sanitize-html":"^1.20.0","tooltipster":"^4.2.6","v-click-outside":"^2.0.2","vee-validate":"2.1.5","vue":"^2.6.10","vue-bootstrap-datetimepicker":"^5.0.1","vue-clipboard2":"^0.2.1","vue-codemirror":"^4.0.6","vue-moment":"^4.0.0","vue-multiselect":"^2.1.3","vue-select":"^2.5.1","vue-toasted":"^1.1.26","vue-virtual-scroller":"^1.0.0-beta.4"},"devDependencies":{"@fortawesome/fontawesome-free":"^5.7.0","@fortawesome/fontawesome-svg-core":"^1.2.13","@fortawesome/free-regular-svg-icons":"^5.7.0","@fortawesome/free-solid-svg-icons":"^5.7.0","@vue/cli-plugin-babel":"^3.2.0","@vue/cli-plugin-eslint":"^3.2.0","@vue/cli-plugin-unit-jest":"^3.4.0","@vue/cli-service":"^3.2.0","@vue/eslint-config-standard":"^4.0.0","@vue/test-utils":"^1.0.0-beta.20","babel-core":"7.0.0-bridge.0","babel-eslint":"^10.0.1","babel-jest":"^23.6.0","eslint":"^5.8.0","eslint-plugin-vue":"^5.0.0-0","html-loader":"^0.5.5","html-loader-jest":"^0.2.1","less":"^3.8.1","less-loader":"^4.1.0","nodemon":"^1.18.9","prettier":"1.16.0","vue-template-compiler":"^2.5.17"},"files":["dist/*","src/*","public/*","*.json","*.js"],"main":"./dist/jfrog-ui-essentials.common.js","repository":{"type":"git","url":"https://github.com/jfrog/jfrog-ui-essentials.git"},"resolutions":{"terser":"3.14.1"}};

/***/ }),

/***/ "971c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9806":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fb11f60c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7835");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fb11f60c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fb11f60c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fb11f60c_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "99fb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9f5a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3c625da4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fa0f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3c625da4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3c625da4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3c625da4_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a005":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a2b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f750ffcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4e6a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f750ffcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f750ffcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f750ffcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a441":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "adeb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50ee5aa3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("72ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50ee5aa3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50ee5aa3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50ee5aa3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b038":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5cb32a52_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c343");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5cb32a52_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5cb32a52_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5cb32a52_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b24e":
/***/ (function(module, exports) {

var Vue = window.Vue;
Vue.directive('jf-include-replace', {
  inserted: function inserted(el, binding) {
    console.log("inserted: ".concat(binding && binding.value));
    var element = $(el);
    element.replaceWith(element.children());
  }
});

/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/codemirror/lib/codemirror.css
var codemirror = __webpack_require__("a7be");

// EXTERNAL MODULE: ./node_modules/codemirror/mode/javascript/javascript.js
var javascript = __webpack_require__("f9d4");

// EXTERNAL MODULE: ./node_modules/codemirror/mode/xml/xml.js
var xml = __webpack_require__("d5e0");

// EXTERNAL MODULE: ./node_modules/codemirror/mode/markdown/markdown.js
var markdown = __webpack_require__("959b");

// EXTERNAL MODULE: ./node_modules/codemirror/mode/gfm/gfm.js
var gfm = __webpack_require__("44a0");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/mode/overlay.js
var overlay = __webpack_require__("9eb9");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/edit/matchbrackets.js
var matchbrackets = __webpack_require__("8c33");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/selection/mark-selection.js
var mark_selection = __webpack_require__("9948");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/search/searchcursor.js
var searchcursor = __webpack_require__("b933");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/dialog/dialog.js
var dialog = __webpack_require__("2aed");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/dialog/dialog.css
var dialog_dialog = __webpack_require__("d72f");

// EXTERNAL MODULE: ./node_modules/codemirror/addon/search/search.js
var search_search = __webpack_require__("0b6c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d225");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js
var createClass = __webpack_require__("b0b4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-float.js
var parse_float = __webpack_require__("59ad");
var parse_float_default = /*#__PURE__*/__webpack_require__.n(parse_float);

// CONCATENATED MODULE: ./src/ui_components/jf_tree/tree_view_pane.js








var tree_view_pane_TreeViewPane =
/*#__PURE__*/
function () {
  function TreeViewPane(viewPaneName, treeApi) {
    Object(classCallCheck["a" /* default */])(this, TreeViewPane);

    this.viewPaneName = viewPaneName;
    this.treeApi = treeApi;
    this.$flatItems = [];
    this.itemHeight = '50px';
    this.itemsPerPage = 25;

    this._renderLinesBackgrounds();
  }

  Object(createClass["a" /* default */])(TreeViewPane, [{
    key: "setItemsPerPage",
    value: function setItemsPerPage(ipp) {
      this.itemsPerPage = ipp;

      this._renderLinesBackgrounds();

      return this;
    }
  }, {
    key: "setItemHeight",
    value: function setItemHeight(height) {
      this.itemHeight = height;
      return this;
    }
  }, {
    key: "update",
    value: function update() {
      var notifyTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.refreshFilter();

      if (this.dirCtrl) {
        this.dirCtrl.refresh();
      }

      if (this.autoHeight) this._setAutoItemsPerPage();
      if (notifyTree) this.treeApi.onViewUpdate(this);
    }
  }, {
    key: "_getCurrentScrollPos",
    value: function _getCurrentScrollPos() {
      return this.dirCtrl.virtualScrollIndex + this.dirCtrl.virtScrollDisplacement;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(scrollPos) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      var dist = scrollPos - this._getCurrentScrollPos();

      this.scroll(dist, duration);
    }
  }, {
    key: "_scrollTo",
    value: function _scrollTo(scrollPos) {
      var dist = scrollPos - this._getCurrentScrollPos();

      this._scroll(dist);
    }
  }, {
    key: "scroll",
    value: function scroll(numOfRows) {
      var _this = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      if (duration === 0) {
        this._scroll(numOfRows);

        return;
      }

      var $timeout = this.treeApi.$timeout;

      if (this.scrollTimeout) {
        $timeout.cancel(this.scrollTimeout);
        delete this.scrollTimeout;
      }

      var quadraticEase = function quadraticEase(k) {
        return k * (2 - k);
      };

      var interval = 40;

      var currentScrollPos = this._getCurrentScrollPos();

      var steps = Math.ceil(duration / interval);
      var currentStep = 1;

      var cycle = function cycle() {
        var progress = currentStep / steps;

        _this._scrollTo(currentScrollPos + quadraticEase(progress) * numOfRows);

        currentStep++;

        if (currentStep <= steps) {
          _this.scrollTimeout = $timeout(function () {
            return cycle();
          }, interval);
        } else delete _this.scrollTimeout;
      };

      cycle();
    }
  }, {
    key: "_scroll",
    value: function _scroll(numOfRows) {
      if (!numOfRows) return;
      var abs = Math.abs(numOfRows);
      var sign = numOfRows / abs;
      var full = Math.floor(abs);
      this.dirCtrl.virtualScrollIndex += sign * full;
      this.dirCtrl.virtScrollDisplacement += sign * (abs - full);

      if (this.dirCtrl.virtScrollDisplacement >= 1) {
        this.dirCtrl.virtualScrollIndex += 1;
        this.dirCtrl.virtScrollDisplacement -= 1;
      }

      if (this.dirCtrl.virtScrollDisplacement < 0) {
        this.dirCtrl.virtualScrollIndex -= 1;
        this.dirCtrl.virtScrollDisplacement = 1 - Math.abs(this.dirCtrl.virtScrollDisplacement);
      }

      if (this.dirCtrl.virtualScrollIndex < 0) {
        this.dirCtrl.virtualScrollIndex = 0;
        this.dirCtrl.virtScrollDisplacement = 0;
      }

      if (this.dirCtrl.virtualScrollIndex + this.itemsPerPage >= this._getPrePagedData().length) {
        this.dirCtrl.virtualScrollIndex = this._getPrePagedData().length - this.itemsPerPage;
        this.dirCtrl.virtScrollDisplacement = 0;
      }

      if (this.dirCtrl.virtualScrollIndex < 0) this.dirCtrl.virtualScrollIndex = 0;
      this.dirCtrl.syncFakeScroller(false);
      this.dirCtrl.refreshHack.count++;
    }
  }, {
    key: "_setDirectiveController",
    value: function _setDirectiveController(directiveController) {
      this.dirCtrl = directiveController;
      this.dirCtrl.viewPane = this;

      if (this.itemsPerPage === 'auto') {
        this.autoHeight = true;

        this._setAutoItemsPerPage();
      }
    }
  }, {
    key: "_setAutoItemsPerPage",
    value: function _setAutoItemsPerPage() {
      var containerHeight = $(this.dirCtrl.$element).parent().height();
      this.containerHeight = containerHeight;
      this.setItemsPerPage(Math.floor(containerHeight / parse_float_default()(this.itemHeight)));
    }
  }, {
    key: "_hasHorizontalScrollbar",
    value: function _hasHorizontalScrollbar() {
      var hScrollWrapper = $(this.dirCtrl.$element).find('.h-scroll-wrapper');
      return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
    }
  }, {
    key: "_getHorizontalScrollbarHeight",
    value: function _getHorizontalScrollbarHeight() {
      var hScrollWrapper = $(this.dirCtrl.$element).find('.h-scroll-wrapper');
      return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
    }
  }, {
    key: "_getPageData",
    value: function _getPageData() {
      var prePage = this._getPrePagedData();

      var vScrollIndex = this.dirCtrl.$freezedVScrollIndex !== undefined ? this.dirCtrl.$freezedVScrollIndex : this.dirCtrl.virtualScrollIndex;
      var additionals = vScrollIndex + this.itemsPerPage + 2 <= prePage.length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= prePage.length ? 1 : 0;
      return prePage.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
    }
  }, {
    key: "_getPrePagedData",
    value: function _getPrePagedData() {
      var ignoreFreeze = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._getSortedData(this._getFilteredData(this._getRawData(ignoreFreeze), ignoreFreeze));
    }
  }, {
    key: "_getSortedData",
    value: function _getSortedData(sourceData) {
      return sourceData;
    }
  }, {
    key: "_getFilteredData",
    value: function _getFilteredData(sourceData) {
      var _this2 = this;

      var ignoreCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      sourceData = sourceData || this._getRawData(ignoreCache);

      if (this.treeApi.filterCallback && sourceData.length) {
        var filterCache;

        if (!this.filterCache || ignoreCache) {
          filterCache = _.filter(sourceData, function (item) {
            var parentIsFilteredOut = false;
            var curr = item;

            while (curr.parent) {
              curr = curr.parent;
            }

            if (curr.data !== _this2.treeApi.GO_UP_NODE && !_this2.treeApi.filterCallback(curr.data)) {
              parentIsFilteredOut = true;
            }

            return item.data === _this2.treeApi.GO_UP_NODE || !parentIsFilteredOut && _this2.treeApi.filterCallback(item.data);
          });
        }

        if (ignoreCache) {
          return filterCache || [];
        } else if (filterCache) {
          this.filterCache = filterCache;
          return this.filterCache;
        } else {
          return this.filterCache;
        }
      } else {
        return sourceData;
      }
    }
  }, {
    key: "refreshFilter",
    value: function refreshFilter() {
      var full = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (full) this.$flatItems.forEach(function (fi) {
        if (fi.data && fi.data.$$$filterResultCache !== undefined) {
          delete fi.data.$$$filterResultCache;
        }
      });
      delete this.filterCache;
    }
  }, {
    key: "_getRawData",
    value: function _getRawData() {
      var ignoreFreeze = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return (!ignoreFreeze ? this.$freezedItems : null) || this.$flatItems || [];
    }
  }, {
    key: "_freeze",
    value: function _freeze() {
      if (this.treeApi.$masterFreeze) return;
      this.$freezedItems = [].concat(this.$flatItems);
      this.$freezedOpened = [].concat(this.treeApi.$openedNodes);

      this.treeApi._freezeSelected();

      if (this.dirCtrl) this.dirCtrl._freezeVScroll();
      this.$freezed = true;
    }
  }, {
    key: "_unFreeze",
    value: function _unFreeze() {
      if (this.treeApi.$masterFreeze) return;
      delete this.$freezedItems;
      delete this.$freezedOpened;

      this.treeApi._unFreezeSelected();

      if (this.dirCtrl) this.dirCtrl._unFreezeVScroll();
      this.$freezed = false;
      this.refreshFilter();
      if (this.dirCtrl) this.dirCtrl.syncFakeScroller();
    }
  }, {
    key: "_addChildren",
    value: function _addChildren(children) {
      var _this3 = this;

      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var parentIndex = this.$flatItems.indexOf(parent);
      var added = [];
      children.forEach(function (node) {
        var flatItem = _this3._createFlatItem(node, level, parent);

        added.push(flatItem);

        if (_this3.treeApi.isNodeOpen(node, true)) {
          _this3.treeApi.getChildren(node).then(function (_children) {
            if (_children && _children.length) {
              _this3._addChildren(_children, level + 1, flatItem);
            }
          });
        }
      });
      var before = this.$flatItems.slice(0, parentIndex + 1);
      var after = this.$flatItems.slice(parentIndex + 1);
      this.$flatItems = before.concat(added).concat(after);
      this.update();
      return added;
    }
  }, {
    key: "_removeChildren",
    value: function _removeChildren(parent) {
      this.$flatItems = _.filter(this.$flatItems, function (flat) {
        var remove = false;
        var _parent = flat.parent;

        while (_parent) {
          if (_parent === parent) {
            remove = true;
            break;
          }

          _parent = _parent.parent;
        }

        return !remove;
      });
      this.update();
    }
  }, {
    key: "_normalizeScroll",
    value: function _normalizeScroll() {
      var _this4 = this;

      this.treeApi.$timeout(function () {
        if (!_this4.dirCtrl) return;

        if (_this4.dirCtrl.virtualScrollIndex + _this4.itemsPerPage > _this4.$flatItems.length) {
          _this4._scrollTo(_this4.$flatItems.length - _this4.itemsPerPage + 1.999);
        }

        if (_this4.$flatItems.length < _this4.itemsPerPage) {
          _this4.dirCtrl.resetScroll();
        }
      });
    }
  }, {
    key: "_deleteItem",
    value: function _deleteItem(item) {
      var index = this.$flatItems.indexOf(item);

      if (index > 0) {
        delete this.$flatItems[index - 1].$isLastChild;
        delete this.$flatItems[index - 1].data.$indentation;
      }

      _.remove(this.$flatItems, function (fi) {
        return fi === item;
      });

      _.remove(item.parent.data.$childrenCache, function (node) {
        return node === item.data;
      });

      this._removeChildren(item);
    }
  }, {
    key: "_buildFlatItems",
    value: function _buildFlatItems() {
      var _this5 = this;

      this.$flatItems = [];

      var paneRoot = _.filter(this.treeApi.$root, function (node) {
        return _this5.treeApi.paneSelector(node) === _this5.viewPaneName;
      });

      this._addChildren(paneRoot);
    }
  }, {
    key: "_createFlatItem",
    value: function _createFlatItem(node) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var flat = {
        pane: this,
        data: node,
        level: level,
        parent: parent,
        hasChildren: undefined
      };

      this._refreshFlatChildrenCheck(flat);

      return flat;
    }
  }, {
    key: "_refreshFlatChildrenCheck",
    value: function _refreshFlatChildrenCheck(flat) {
      if (this.treeApi.childrenChecker) {
        var check = this.treeApi.childrenChecker(flat.data);

        if (check && check.then) {
          check.then(function (_check) {
            flat.hasChildren = _check;
          });
        } else flat.hasChildren = check;
      } else {
        this.treeApi.getChildren(flat.data).then(function (children) {
          flat.hasChildren = !!(children && children.length);
        });
      }
    }
  }, {
    key: "_recursiveOpenRestore",
    value: function _recursiveOpenRestore(node) {
      var _this6 = this;

      var restoreIfClosed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var defer = this.treeApi.$q.defer();

      var openRestoreNode = function openRestoreNode(node) {
        _this6.treeApi.openNode(node, false, false, false).then(function () {
          var children = node.$childrenCache;
          if (!children || !children.length) defer.resolve();else {
            node.children = true;
            var pendingPromises = children.length;
            children.forEach(function (child) {
              _this6._recursiveOpenRestore(child, false).then(function () {
                pendingPromises--;

                if (pendingPromises === 0) {
                  defer.resolve();
                }
              });
            });
          }
        });
      };

      var id = this.treeApi.uniqueIdGetter(node);

      var opened = _.find(this.treeApi.$openedNodes, function (n) {
        return _this6.treeApi.uniqueIdGetter(n) === id;
      });

      if (opened) {
        _.remove(this.treeApi.$openedNodes, function (n) {
          return n === opened;
        });

        openRestoreNode(node);
      } else {
        if (restoreIfClosed) {
          var closedRoot = _.find(this.$flatItems, function (fi) {
            return fi.data && fi.data !== _this6.treeApi.GO_UP_NODE && !_.includes(_this6.treeApi.$openedNodes, fi.data) && _this6.treeApi.uniqueIdGetter(fi.data) === id;
          });

          if (closedRoot) {
            defer.promise.then(function () {
              _this6.treeApi.closeNode(closedRoot.data);
            });
            openRestoreNode(closedRoot.data);
          } else {
            defer.resolve();
          }
        } else {
          defer.resolve();
        }
      }

      return defer.promise;
    }
  }, {
    key: "refreshNode",
    value: function refreshNode(node) {
      var _this7 = this;

      var defer = this.treeApi.$q.defer();

      var flat = this._flatFromNode(node);

      if (flat) {
        this._freeze();

        this._removeChildren(flat);

        delete flat.data.$childrenCache;
        delete flat.data.$noChildren;
        delete flat.hasChildren;

        var doRefresh = function doRefresh() {
          _this7.refreshNodeContextMenu(flat.data);

          _this7._recursiveOpenRestore(flat.data).then(function () {
            _this7._refreshFlatChildrenCheck(flat);

            _this7._unFreeze();

            defer.resolve();
          });
        };

        if (_.find(this.treeApi.$root, function (node) {
          return node === flat.data;
        })) {
          delete this.treeApi.$rootCache;
          this.treeApi.getChildren().then(function () {
            return doRefresh();
          });
        } else doRefresh();
      }

      return defer.promise;
    }
  }, {
    key: "refreshNodeContextMenu",
    value: function refreshNodeContextMenu(node) {
      delete node.$cachedCMItems;
    }
  }, {
    key: "refreshView",
    value: function refreshView() {
      var _this8 = this;

      var mainDefer = this.treeApi.$q.defer();

      this._freeze();

      this.treeApi._getRoot().then(function () {
        if (_this8.treeApi.uniqueIdGetter) {
          var resolveCount = 0;
          var itemsCount = _this8.$flatItems.length;

          if (!_this8.$flatItems.length) {
            _this8._unFreeze();

            mainDefer.resolve();
          }

          _this8.$flatItems.forEach(function (fi, ind) {
            _this8._recursiveOpenRestore(fi.data, false).then(function () {
              resolveCount++;

              if (resolveCount === itemsCount) {
                var selectedId = _this8.treeApi.$selectedNode && _this8.treeApi.$selectedNode !== _this8.treeApi.GO_UP_NODE ? _this8.treeApi.uniqueIdGetter(_this8.treeApi.$selectedNode) : null;
                var newSelected = selectedId !== null ? _.find(_this8.$flatItems, function (fi) {
                  return fi.data !== _this8.treeApi.GO_UP_NODE && _this8.treeApi.uniqueIdGetter(fi.data) === selectedId;
                }) : null;
                if (_this8.treeApi.$selectedNode === _this8.treeApi.GO_UP_NODE) newSelected = _.find(_this8.$flatItems, function (fi) {
                  return fi.data === _this8.treeApi.GO_UP_NODE;
                });

                if (newSelected) {
                  _this8.treeApi._setSelected(newSelected);

                  _this8._unFreeze();

                  mainDefer.resolve();
                } else if (selectedId) {
                  _this8.treeApi.nodeByIdGetter(selectedId).then(function (node) {
                    _this8._unFreeze();

                    _this8.treeApi.openDeepNode(node).then(function () {
                      mainDefer.resolve();
                    });
                  }).catch(function () {
                    _this8.selectFirst();

                    _this8._unFreeze();

                    mainDefer.resolve();
                  });
                } else {
                  _this8._unFreeze();

                  mainDefer.resolve();
                }
              }
            });
          });
        } else {
          _this8._unFreeze();

          mainDefer.resolve();
        }
      });

      return mainDefer.promise;
    }
  }, {
    key: "selectFirst",
    value: function selectFirst() {
      if (this._getPrePagedData().length) this.treeApi._setSelected(this._getPrePagedData()[0]);
    }
  }, {
    key: "getQuickFindMatches",
    value: function getQuickFindMatches() {
      var _this9 = this;

      if (!this.treeApi.quickFindTerm) return [];else {
        var matches = _.filter(this.$flatItems, function (fi, ind) {
          var text = _this9.treeApi.textGetter(fi.data);

          var matchObj = _this9.treeApi.AdvancedStringMatch.match(text, _this9.treeApi.quickFindTerm);

          var matched = matchObj ? matchObj.matched : null;
          if (matched) fi.$$index = ind;
          return matched;
        });

        if (this.treeApi.$selectedNode) {
          var selectedIndex = _.findIndex(this.$flatItems, function (fi) {
            return fi.data === _this9.treeApi.$selectedNode;
          });

          var matchesAfterSelection = _.filter(matches, function (match) {
            return match.$$index >= selectedIndex;
          });

          var matchesBeforeSelection = _.difference(matches, matchesAfterSelection);

          matches = matchesAfterSelection.concat(matchesBeforeSelection);
        }

        return matches;
      }
    }
  }, {
    key: "centerOnNode",
    value: function centerOnNode(node) {
      var flat = this._flatFromNode(node);

      if (flat) this.centerOnItem(flat);
    }
  }, {
    key: "_flatFromNode",
    value: function _flatFromNode(node) {
      var _this10 = this;

      if (node === this.treeApi.GO_UP_NODE) return _.find(this.$flatItems, {
        $specialNode: 'GO_UP'
      });

      var refMatch = _.find(this.$flatItems, function (flat) {
        return flat.data === node;
      });

      if (!refMatch) {
        var nodeId = this.treeApi.uniqueIdGetter(node);

        var idMatch = _.find(this.$flatItems, function (flat) {
          if (flat.data === _this10.treeApi.GO_UP_NODE) return false;else {
            var flatId = _this10.treeApi.uniqueIdGetter(flat.data);

            return flatId === nodeId;
          }
        });

        return idMatch;
      }

      return refMatch;
    }
  }, {
    key: "bringItemToView",
    value: function bringItemToView(item) {
      var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var prePaged = this._getPrePagedData(true);

      var index = prePaged.indexOf(item);

      if (index - 1 < this.dirCtrl.virtualScrollIndex) {
        this.scrollTo(index, jump ? 0 : undefined);
      } else if (index + 1 > this.dirCtrl.virtualScrollIndex + this.itemsPerPage) {
        var fullItems = this.containerHeight ? Math.floor(this.containerHeight / parse_float_default()(this.itemHeight)) : this.itemsPerPage;
        var scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
        var displace = this.containerHeight ? 1 - (this.containerHeight / parse_float_default()(this.itemHeight) - fullItems) : 1;
        var hScrollFactor = 0;

        if (this._hasHorizontalScrollbar()) {
          var pixelFactor = this._getHorizontalScrollbarHeight();

          hScrollFactor = pixelFactor / parse_float_default()(this.itemHeight);
        }

        this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
      }

      this.dirCtrl.syncFakeScroller(false);
    }
  }, {
    key: "centerOnItem",
    value: function centerOnItem(item) {
      var prePaged = this._getPrePagedData(true);

      var index = prePaged.indexOf(item);
      var halfPage = Math.floor(this.itemsPerPage / 2);

      if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
        this.dirCtrl.virtualScrollIndex = 0;
      } else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
        this.dirCtrl.virtualScrollIndex = prePaged.length - this.itemsPerPage;
      } else {
        this.dirCtrl.virtualScrollIndex = index - halfPage;
      }

      this.dirCtrl.syncFakeScroller(false);

      this.treeApi._setSelected(item);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.dirCtrl) $(this.dirCtrl.$element).find('.jf-tree').focus();
    }
  }, {
    key: "findNode",
    value: function findNode(findFunction) {
      var _this11 = this;

      var item = _.find(this.$flatItems, function (fi) {
        return fi.data !== _this11.treeApi.GO_UP_NODE && findFunction(fi.data);
      });

      if (item) return item.data;
    }
  }, {
    key: "findNodeByUniqueId",
    value: function findNodeByUniqueId(uniqueId) {
      var _this12 = this;

      var item = _.find(this.$flatItems, function (fi) {
        return fi.data !== _this12.treeApi.GO_UP_NODE && _this12.treeApi.uniqueIdGetter(fi.data) === uniqueId;
      });

      if (item) return item.data;
    }
  }, {
    key: "isNodeOpen",
    value: function isNodeOpen(node) {
      var ignoreFreeze = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return !ignoreFreeze && this.$freezedOpened && _.includes(this.$freezedOpened, node) || !this.$freezedOpened && _.includes(this.treeApi.$openedNodes, node);
    }
  }, {
    key: "getNodesCount",
    value: function getNodesCount() {
      return this._getRawData(true).length;
    }
  }, {
    key: "getFilteredNodesCount",
    value: function getFilteredNodesCount() {
      var _this13 = this;

      return _.filter(this._getFilteredData(null, true), function (fi) {
        return fi.data !== _this13.treeApi.GO_UP_NODE;
      }).length;
    }
  }, {
    key: "_refreshIndentations",
    value: function _refreshIndentations() {
      this.$flatItems.forEach(function (fi) {
        if (fi.data.$indentation) delete fi.data.$indentation;

        if (fi.data.$childrenCache) {
          fi.data.$childrenCache.forEach(function (node) {
            if (node.$indentation) delete node.$indentation;
          });
        }
      });
    }
  }, {
    key: "_renderLinesBackgrounds",
    value: function _renderLinesBackgrounds() {
      var height = parse_float_default()(this.itemHeight);

      var canvas = $("<canvas width=\"26\" height=\"".concat(height, "\"></canvas>"))[0];
      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.strokeStyle = '#aaaaaa';
        ctx.beginPath();
        ctx.moveTo(13, 0);
        ctx.lineTo(13, height);
        ctx.stroke();
        var verticalLine = canvas.toDataURL('image/png', 1);
        ctx.clearRect(0, 0, 26, height);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(26, height / 2);
        ctx.stroke();
        var horizontalLine = canvas.toDataURL('image/png', 1);
        ctx.clearRect(0, 0, 26, height);
        ctx.beginPath();
        ctx.moveTo(13, 0);
        ctx.lineTo(13, height);
        ctx.moveTo(13, height / 2);
        ctx.lineTo(26, height / 2);
        ctx.stroke();
        var connectionPoint = canvas.toDataURL('image/png', 1);
        ctx.clearRect(0, 0, 26, height);
        ctx.beginPath();
        ctx.moveTo(13, 0);
        ctx.lineTo(13, height / 2);
        ctx.lineTo(26, height / 2);
        ctx.stroke();
        var lastConnectionPoint = canvas.toDataURL('image/png', 1);
        this.linesBackgrounds = {
          'vertical-line': verticalLine,
          'horizontal-line': horizontalLine,
          'connection-point': connectionPoint,
          'last-connection-point': lastConnectionPoint
        };
      } else {
        this.linesBackgrounds = {};
      }
    }
  }]);

  return TreeViewPane;
}();
// CONCATENATED MODULE: ./src/services/factories/JfTreeApiFactory.js








function JFTreeApi() {
  var injections = $jfrog.get(['$q', '$timeout', 'AdvancedStringMatch', 'ContextMenuService', 'JFrogEventBus']);

  var JFTreeApiClass =
  /*#__PURE__*/
  function () {
    function JFTreeApiClass(appScope) {
      Object(classCallCheck["a" /* default */])(this, JFTreeApiClass);

      _.extend(this, injections);

      this.dataWasSet = false;
      this.$root = [];
      this.$viewPanes = [];
      this.$openedNodes = [];
      this.actions = [];
      this.listeners = {};
      this.supportedEvents = ['ready', 'pagination.change', 'item.clicked', 'item.dblClicked', 'item.selected', 'item.before.open', 'keydown'];
      this.appScope = appScope;
      this.objectName = 'Item';
      this.GO_UP_NODE = {
        $specialNode: 'GO_UP'
      };

      this.paneSelector = function () {
        return 'default';
      };
    }

    Object(createClass["a" /* default */])(JFTreeApiClass, [{
      key: "setNodeTemplate",
      value: function setNodeTemplate(nodeTemplate) {
        this.nodeTemplate = nodeTemplate;
        return this;
      }
    }, {
      key: "setTreeData",
      value: function setTreeData(rootData) {
        this.dataWasSet = true;
        this.$root = rootData;
        this.$viewPanes.forEach(function (vp) {
          return vp._buildFlatItems();
        });

        if (!this.$isReady) {
          this.$isReady = true;
          this.fire('ready');
        }
      }
    }, {
      key: "setDrillDownMode",
      value: function setDrillDownMode() {
        var _this = this;

        var drillDownMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var defer = this.$q.defer();
        var oldVal = this.$drillDownMode;
        this.$drillDownMode = drillDownMode;

        if (!!oldVal !== !!drillDownMode) {
          this._freeze();

          this.refreshTree(false).then(function () {
            _this._refreshIndentations();

            _this.centerOnSelected();

            _this._unFreeze();

            defer.resolve();
          });
        } else {
          defer.resolve();
        }

        return defer.promise;
      }
    }, {
      key: "_refreshIndentations",
      value: function _refreshIndentations() {
        this.$viewPanes.forEach(function (vp) {
          return vp._refreshIndentations();
        });
      }
    }, {
      key: "setSortingFunction",
      value: function setSortingFunction(sortingFunction) {
        this.sortingFunction = sortingFunction;
        return this;
      }
    }, {
      key: "setDataDriver",
      value: function setDataDriver(dataDriver) {
        this.dataGettersSet = true;

        if (dataDriver.uniqueId) {
          this.uniqueIdGetter = dataDriver.uniqueId;
        }

        if (dataDriver.nodeById) {
          this.nodeByIdGetter = dataDriver.nodeById;
        }

        if (dataDriver.text) {
          this.textGetter = dataDriver.text;
        }

        if (dataDriver.childrenChecker) {
          this.childrenChecker = dataDriver.childrenChecker;
        }

        if (dataDriver.children) {
          this.childrenGetter = dataDriver.children;
        }

        if (dataDriver.parent) {
          this.parentGetter = dataDriver.parent;
        }

        if (dataDriver.classes) {
          this.classGetter = dataDriver.classes;
        }

        if (dataDriver.pane) {
          this.paneSelector = dataDriver.pane;
        }

        if (dataDriver.contextMenuItems) {
          this.contextMenuItemsGetter = dataDriver.contextMenuItems;

          this._createContextMenu();
        }

        this._getRoot();

        return this;
      }
    }, {
      key: "_getRoot",
      value: function _getRoot() {
        var _this2 = this;

        var defer = this.$q.defer();
        this.getChildren(null).then(function (rootData) {
          if (rootData && _.isArray(rootData)) {
            _this2.setTreeData(rootData);

            defer.resolve();
          }
        });
        return defer.promise;
      }
    }, {
      key: "setFilterCallback",
      value: function setFilterCallback(filterCallback) {
        var _this3 = this;

        this.filterCallback = function (node) {
          if (node === _this3.GO_UP_NODE) return true;

          if (node.$$$filterResultCache !== undefined) {
            return node.$$$filterResultCache;
          } else {
            var cbResult = filterCallback(node);
            node.$$$filterResultCache = cbResult;
            return cbResult;
          }
        };

        return this;
      }
    }, {
      key: "isNodeFiltered",
      value: function isNodeFiltered(node) {
        return this.filterCallback ? this.filterCallback(node) : true;
      }
    }, {
      key: "quickFind",
      value: function quickFind(quickFindTerm) {
        this.quickFindTerm = quickFindTerm;
        this.quickFindMatches = this._getQuickFindFlatMatches();
        delete this.quickFindIndex;

        this._selectNextSearchResult();

        return this;
      }
    }, {
      key: "_getQuickFindFlatMatches",
      value: function _getQuickFindFlatMatches() {
        var matches = [];
        this.$viewPanes.forEach(function (vp) {
          matches = matches.concat(vp.getQuickFindMatches());
          if (vp.dirCtrl) vp.dirCtrl.refreshHack.count++;
        });
        return matches;
      }
    }, {
      key: "getQuickFindMatches",
      value: function getQuickFindMatches() {
        return _.map(this._getQuickFindFlatMatches(), 'data');
      }
    }, {
      key: "_getViewPaneForNode",
      value: function _getViewPaneForNode(node) {
        var viewPane = _.find(this.$viewPanes, function (vp) {
          return vp.findNode(function (n) {
            return n === node;
          });
        });

        return viewPane;
      }
    }, {
      key: "centerOnNode",
      value: function centerOnNode(node) {
        var viewPane = this._getViewPaneForNode(node);

        if (viewPane) viewPane.centerOnNode(node);
      }
    }, {
      key: "centerOnSelected",
      value: function centerOnSelected() {
        var selected = this.getSelectedNode(true);

        if (selected) {
          var flat = this._flatFromNode(selected);

          if (flat) flat.pane.centerOnItem(flat);
        }
      }
    }, {
      key: "refreshNode",
      value: function refreshNode(node) {
        var viewPane = this._getViewPaneForNode(node);

        if (viewPane) return viewPane.refreshNode(node);else return this.$q.when();
      }
    }, {
      key: "_freeze",
      value: function _freeze() {
        this.$viewPanes.forEach(function (vp) {
          return vp._freeze();
        });
      }
    }, {
      key: "_unFreeze",
      value: function _unFreeze() {
        this.$viewPanes.forEach(function (vp) {
          return vp._unFreeze();
        });
      }
    }, {
      key: "freeze",
      value: function freeze() {
        if (this.$masterFreeze) return;

        this._freeze();

        this.$masterFreeze = true;
      }
    }, {
      key: "unFreeze",
      value: function unFreeze() {
        if (!this.$masterFreeze) return;
        this.$masterFreeze = false;

        this._unFreeze();
      }
    }, {
      key: "refreshNodeContextMenu",
      value: function refreshNodeContextMenu(node) {
        var viewPane = this._getViewPaneForNode(node);

        if (viewPane) viewPane.refreshNodeContextMenu(node);
      }
    }, {
      key: "refreshTree",
      value: function refreshTree() {
        var _this4 = this;

        var deleteCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var resetOpenedNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var defer = this.$q.defer();
        if (deleteCache) delete this.$rootCache;
        if (resetOpenedNodes) this.$openedNodes = [];
        var pendingPromises = this.$viewPanes.length;
        this.$viewPanes.forEach(function (vp) {
          vp.refreshView().then(function () {
            pendingPromises--;

            if (!pendingPromises) {
              defer.resolve();
            }
          });
        });
        this.$openedNodes = _.filter(this.$openedNodes, function (node) {
          var fi = _this4._flatFromNode(node);

          return !!fi;
        });
        return defer.promise;
      }
    }, {
      key: "isNodeOpen",
      value: function isNodeOpen(node) {
        var ignoreFreeze = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return !!_.find(this.$viewPanes, function (vp) {
          return vp.isNodeOpen(node, ignoreFreeze);
        });
      }
    }, {
      key: "findNode",
      value: function findNode(findFunction) {
        var viewPane = _.find(this.$viewPanes, function (vp) {
          return !!vp.findNode(findFunction);
        });

        if (viewPane) {
          return viewPane.findNode(findFunction);
        }
      }
    }, {
      key: "findNodeByUniqueId",
      value: function findNodeByUniqueId(uniqueId) {
        var viewPane = _.find(this.$viewPanes, function (vp) {
          return !!vp.findNodeByUniqueId(uniqueId);
        });

        if (viewPane) {
          return viewPane.findNodeByUniqueId(uniqueId);
        }
      }
    }, {
      key: "selectNode",
      value: function selectNode(node) {
        var fireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var flat = this._flatFromNode(node);

        if (flat) this._setSelected(flat, fireEvent);
      }
    }, {
      key: "preSelectNode",
      value: function preSelectNode(node) {
        var flat = this._flatFromNode(node);

        if (flat) this._preSelect(flat);
      }
    }, {
      key: "_onArrowKey",
      value: function _onArrowKey(down, viewPane) {
        var _this5 = this;

        var items = viewPane._getFilteredData();

        if (!items.length) return;
        if (!this.$preSelectedNode) Vue.set(this, '$preSelectedNode', this.$selectedNode);

        if (this.quickFindTerm) {
          if (down) this._selectNextSearchResult();else this._selectPreviousSearchResult();
        } else {
          var selectedItem;

          if (this.$preSelectedNode === undefined) {
            selectedItem = items[down ? 0 : items.length - 1];
          } else {
            var currIndex = _.findIndex(items, function (fi) {
              return fi.data === _this5.$preSelectedNode;
            });

            if (down && items[currIndex + 1] || !down && currIndex - 1 >= 0) {
              selectedItem = items[currIndex + (down ? 1 : -1)];
            } else {
              selectedItem = items[down ? 0 : items.length - 1];
            }
          } //                this._setSelected(selectedItem);
          //                viewPane.centerOnItem(selectedItem);


          this._preSelect(selectedItem);
        }
      }
    }, {
      key: "_selectNextSearchResult",
      value: function _selectNextSearchResult() {
        if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
          this.quickFindIndex = 0;
        } else if (this.quickFindIndex + 1 < this.quickFindMatches.length) {
          this.quickFindIndex++;
        } else if (this.quickFindIndex + 1 === this.quickFindMatches.length) {
          this.quickFindIndex = 0;
        }

        this._gotoCurrentSearchResult();
      }
    }, {
      key: "_selectPreviousSearchResult",
      value: function _selectPreviousSearchResult() {
        if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
          this.quickFindIndex = this.quickFindMatches.length - 1;
        } else if (this.quickFindIndex - 1 >= 0) {
          this.quickFindIndex--;
        } else if (this.quickFindIndex - 1 === -1) {
          this.quickFindIndex = this.quickFindMatches.length - 1;
        }

        this._gotoCurrentSearchResult();
      }
    }, {
      key: "_gotoCurrentSearchResult",
      value: function _gotoCurrentSearchResult() {
        if (this.quickFindIndex !== undefined && this.quickFindMatches[this.quickFindIndex]) {
          var item = this.quickFindMatches[this.quickFindIndex]; //                item.pane.centerOnItem(item);

          this._preSelect(item);
        }
      }
    }, {
      key: "handleKeyEvent",
      value: function handleKeyEvent(e) {
        if (_.includes(['ArrowDown', 'Down', 'ArrowUp', 'Up'], e.key)) {
          var keydown = $.Event('keydown', {
            keyCode: e.keyCode,
            which: e.which,
            key: e.key
          });
          var dirCtrl = this.$viewPanes[0].dirCtrl;
          $(dirCtrl.$element).find('.jf-tree').trigger(keydown);
          e.preventDefault();
        }
      }
    }, {
      key: "_flatFromNode",
      value: function _flatFromNode(node) {
        var pane = _.find(this.$viewPanes, function (vp) {
          return !!vp._flatFromNode(node);
        });

        if (pane) return pane._flatFromNode(node);
      }
    }, {
      key: "openSelected",
      value: function openSelected() {
        var scrollUpIfNeeded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.openNode(this.$selectedNode, scrollUpIfNeeded);
      }
    }, {
      key: "openPreSelected",
      value: function openPreSelected() {
        var scrollUpIfNeeded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.openNode(this.$preSelectedNode || this.$selectedNode, scrollUpIfNeeded);
      }
    }, {
      key: "closeSelected",
      value: function closeSelected() {
        this.closeNode(this.$selectedNode);
      }
    }, {
      key: "toggleSelected",
      value: function toggleSelected(scrollUpIfNeeded) {
        if (this.isNodeOpen(this.$selectedNode)) {
          this.closeSelected();
        } else {
          this.openSelected(scrollUpIfNeeded);
        }
      }
    }, {
      key: "openNode",
      value: function openNode(node) {
        var _this6 = this;

        var scrollUpIfNeeded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var drillDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var preSelect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        if (!node) return;
        if (this.fire('item.before.open', node) === false) return this.$q.when();
        var defer = this.$q.defer();

        var flat = this._flatFromNode(node);

        if (flat && flat.hasChildren !== false && !flat.data.$noChildren && !flat.$pending) {
          if (!_.includes(this.$openedNodes, node)) {
            this.$openedNodes.push(node);
            flat.$pending = true;
            this.getChildren(node).then(function (children) {
              if (!children.length) node.$noChildren = true;else flat.hasChildren = true;
              var reDrill = false;

              if (_this6.$drillDownMode && _this6.$currParentFlat) {
                if (flat.data !== _this6.GO_UP_NODE && _this6.uniqueIdGetter(flat.data) === _this6.uniqueIdGetter(_this6.$currParentFlat.data)) {
                  reDrill = true;
                }
              }

              if (_this6.$drillDownMode && (reDrill || drillDown)) {
                _this6.drillDown(flat);
              } else {
                if (preSelect) _this6._preSelect(flat);

                var addedFlats = flat.pane._addChildren(children, flat.level + 1, flat);

                if (scrollUpIfNeeded) {
                  if (addedFlats.length >= 3) {
                    flat.pane.bringItemToView(addedFlats[2], false);
                  } else if (addedFlats.length) {
                    flat.pane.bringItemToView(addedFlats[addedFlats.length - 1], false);
                  }
                }
              }

              defer.resolve();
              flat.$pending = false;
            });
          } else {
            defer.resolve();
          }
        } else {
          if (flat && flat.$pending) {
            this.$timeout(function () {
              _this6.openNode(node, scrollUpIfNeeded).then(function () {
                defer.resolve();
              });
            }, 100);
          } else {
            defer.resolve();
          }
        }

        return defer.promise;
      }
    }, {
      key: "closeNode",
      value: function closeNode(node) {
        if (_.includes(this.$openedNodes, node)) {
          _.remove(this.$openedNodes, function (n) {
            return n === node;
          });

          var flat = this._flatFromNode(node);

          if (flat) flat.pane._removeChildren(flat);
        }
      }
    }, {
      key: "toggleExpansion",
      value: function toggleExpansion(node) {
        var flat = this._flatFromNode(node);

        if (flat && flat.pane.isNodeOpen(node)) {
          this.closeNode(node);
        } else {
          this.openNode(node, true);
        }
      }
    }, {
      key: "deleteNode",
      value: function deleteNode(node) {
        var flat = this._flatFromNode(node);

        flat.pane._deleteItem(flat);
      }
    }, {
      key: "drillUp",
      value: function drillUp() {
        if (!this.$drillDownMode) return;
        this.closeNode(this.$currParentFlat.$origFlat.data);
        var parent = this.$currParentFlat.$origFlat.parent;

        if (parent && parent.data !== this.GO_UP_NODE) {
          this.drillDown(parent);
        } else {
          this.drillUpToRoot();
        }

        this._refreshIndentations();
      }
    }, {
      key: "drillDown",
      value: function drillDown(flatItem) {
        var goUpFlat = flatItem.pane._createFlatItem(this.GO_UP_NODE);

        this.$currParentFlat = flatItem.pane._createFlatItem(flatItem.data, 1, goUpFlat);
        var orig = flatItem;

        while (orig.$origFlat) {
          orig = orig.$origFlat;
        }

        this.$currParentFlat.$origFlat = orig;
        if (flatItem.pane.dirCtrl) flatItem.pane.dirCtrl.resetScroll();
        flatItem.pane.$flatItems = [goUpFlat, this.$currParentFlat];

        flatItem.pane._addChildren(flatItem.data.$childrenCache, 2, this.$currParentFlat);

        this.selectNode(this.$currParentFlat.data, false);

        this._refreshIndentations();
      }
    }, {
      key: "drillUpToRoot",
      value: function drillUpToRoot() {
        if (!this.$currParentFlat) return;
        this.$openedNodes = [];
        this.$currParentFlat.$origFlat.pane.dirCtrl.resetScroll();
        this.setTreeData(this.$rootCache);
        delete this.$currParentFlat;

        this._refreshIndentations();

        this.centerOnSelected();
      }
    }, {
      key: "getCurrentParent",
      value: function getCurrentParent() {
        return this.$currParentFlat ? this.$currParentFlat.data : null;
      }
    }, {
      key: "openDeepNodeByUniqueId",
      value: function openDeepNodeByUniqueId(uniqueId) {
        var _this7 = this;

        var defer = this.$q.defer();
        this.nodeByIdGetter(uniqueId).then(function (node) {
          _this7.openDeepNode(node).then(function () {
            defer.resolve();
          });
        });
        return defer.promise;
      }
    }, {
      key: "openDeepNode",
      value: function openDeepNode(node) {
        var _this8 = this;

        if (!node) {
          console.error('openDeepNode was called with undefined node');
          return;
        }

        if (this.$drillDownMode) {
          this.drillUpToRoot();
        }

        var defer = this.$q.defer();
        var nodesToOpen = [];
        var curr = node;

        while (curr) {
          nodesToOpen.push(curr);
          curr = this.parentGetter(curr);
        }

        if (!nodesToOpen.length) {
          this.selectNode(node);
          return;
        }

        nodesToOpen.reverse();
        var index = 0;

        var handleNext = function handleNext() {
          var nextId = _this8.uniqueIdGetter(nodesToOpen[index]);

          var nextNode = _this8.findNode(function (n) {
            return _this8.uniqueIdGetter(n) === nextId;
          });

          if (index + 1 < nodesToOpen.length) {
            if (nextNode) _this8.openNode(nextNode).then(function () {
              index++;
              handleNext();
            });else {
              defer.resolve();
            }
          } else {
            _this8.$timeout(function () {
              if (nextNode) {
                var flat = _this8._flatFromNode(nextNode);

                if (flat) _this8.selectNode(nextNode);else {
                  _this8.selectFirst();
                } //                        this.treeApi.openNode(nodeToSelect)
              } else {
                _this8.selectFirst();
              }

              defer.resolve();
            });
          }
        };

        handleNext();
        return defer.promise;
      }
    }, {
      key: "getChildren",
      value: function getChildren(node) {
        var _this9 = this;

        var defer = this.$q.defer();

        if (this.childrenGetter) {
          if (node && node.$childrenCache) {
            defer.resolve(node.$childrenCache);
          } else if (!node && this.$rootCache) {
            defer.resolve(this.$rootCache);
          } else {
            var childrenOrPromise = this.childrenGetter(node);

            if (childrenOrPromise && childrenOrPromise.then) {
              childrenOrPromise.then(function (children) {
                if (children && _this9.sortingFunction) {
                  children = children.sort(_this9.sortingFunction);
                }

                if (node) node.$childrenCache = children;else _this9.$rootCache = children;
                defer.resolve(children);
              });
            } else {
              if (this.sortingFunction && childrenOrPromise) {
                childrenOrPromise = childrenOrPromise.sort(this.sortingFunction);
              }

              if (node) node.$childrenCache = childrenOrPromise;else this.$rootCache = childrenOrPromise;
              defer.resolve(childrenOrPromise || []);
            }
          }
        } else {
          defer.resolve([]);
        }

        return defer.promise;
      }
    }, {
      key: "_setSelected",
      value: function _setSelected(item) {
        var fireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (fireEvent && item.data !== this.GO_UP_NODE && this.$selectedNode !== this.GO_UP_NODE) {
          var entityChange = !this.uniqueIdGetter || item.data && this.$selectedNode && this.uniqueIdGetter(item.data) !== this.uniqueIdGetter(this.$selectedNode) || !this.$selectedNode && item.data || this.$selectedNode && !item.data;
          Vue.set(this, '$selectedNode', item.data);

          if (entityChange) {
            this.fire('item.selected', item.data);
          }
        } else {
          Vue.set(this, '$selectedNode', item.data);
        }

        Vue.set(this, '$preSelectedNode', null);
      }
    }, {
      key: "_preSelect",
      value: function _preSelect(item) {
        Vue.set(this, '$preSelectedNode', item.data);
        item.pane.bringItemToView(item);
      }
    }, {
      key: "selectPreSelected",
      value: function selectPreSelected() {
        if (this.$preSelectedNode) {
          this._setSelected(this._flatFromNode(this.$preSelectedNode));
        }
      }
    }, {
      key: "_isSelected",
      value: function _isSelected(item) {
        return this.$freezedSelected ? this.$freezedSelected === item.data : this.$selectedNode === item.data;
      }
    }, {
      key: "_isPreSelected",
      value: function _isPreSelected(item) {
        return this.$freezedPreSelected ? this.$freezedPreSelected === item.data : this.$preSelectedNode === item.data;
      }
    }, {
      key: "_freezeSelected",
      value: function _freezeSelected() {
        this.$freezedSelected = this.$selectedNode;
        this.$freezedPreSelected = this.$preSelectedNode;
      }
    }, {
      key: "_unFreezeSelected",
      value: function _unFreezeSelected() {
        delete this.$freezedSelected;
        delete this.$freezedPreSelected;
      }
    }, {
      key: "selectFirst",
      value: function selectFirst() {
        if (this.$viewPanes[0]) this.$viewPanes[0].selectFirst();
      }
    }, {
      key: "getSelectedNode",
      value: function getSelectedNode() {
        var ignoreFreeze = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return !ignoreFreeze ? this.$freezedSelected || this.$selectedNode : this.$selectedNode || null;
      }
    }, {
      key: "getPreSelectedNode",
      value: function getPreSelectedNode() {
        var ignoreFreeze = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return !ignoreFreeze ? this.$freezedPreSelected || this.$preSelectedNode : this.$preSelectedNode || null;
      }
    }, {
      key: "on",
      value: function on(event, listener) {
        if (!_.includes(this.supportedEvents, event)) {
          console.error('jf-tree: Unsupported Event: ' + event);
          return;
        }

        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(listener);
        return this;
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (!_.includes(this.supportedEvents, event)) {
          console.error('jf-tree: Unsupported Event: ' + event);
          return;
        }

        if (this.listeners[event]) {
          if (listener) {
            _.remove(this.listeners[event], function (l) {
              return l === listener;
            });
          } else {
            this.listeners[event] = [];
          }
        }
      }
    }, {
      key: "fire",
      value: function fire(event) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        var stopped = false;

        if (this.listeners[event]) {
          this.listeners[event].forEach(function (listener) {
            if (stopped) return;
            if (listener.apply(void 0, params) === false) stopped = true;
          });
        }

        return !stopped;
      }
    }, {
      key: "setObjectName",
      value: function setObjectName(objectName) {
        var useAn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.objectName = objectName;
        this.useAnWithObjectName = useAn;
        return this;
      }
    }, {
      key: "sortBy",
      value: function sortBy() {
        return this;
      }
    }, {
      key: "setActions",
      value: function setActions(actions) {
        this.actions = actions;
        return this;
      }
    }, {
      key: "createViewPane",
      value: function createViewPane(viewPaneName) {
        viewPaneName = viewPaneName || 'default';
        var exists = this.getViewPane(viewPaneName);
        if (exists) return exists;else {
          var viewPane = new tree_view_pane_TreeViewPane(viewPaneName, this);
          this.$viewPanes.push(viewPane);
          return viewPane;
        }
      }
    }, {
      key: "getViewPane",
      value: function getViewPane(viewPaneName) {
        viewPaneName = viewPaneName || 'default';
        return _.find(this.$viewPanes, function (vp) {
          return vp.viewPaneName === viewPaneName;
        });
      }
    }, {
      key: "_setDirectiveController",
      value: function _setDirectiveController(ctrl) {
        var pane = this.getViewPane(ctrl.viewPaneName);
        if (!pane) console.error("Missing view pane '".concat(ctrl.viewPaneName, "'. Forgot to create it?"));else pane._setDirectiveController(ctrl);
      }
    }, {
      key: "setEmptyTreeText",
      value: function setEmptyTreeText(text) {
        this.emptyTreeText = text;
        return this;
      }
    }, {
      key: "refreshFilter",
      value: function refreshFilter() {
        this.$viewPanes.forEach(function (vp) {
          return vp.refreshFilter(true);
        });
      }
    }, {
      key: "focus",
      value: function focus() {
        if (this.$viewPanes[0]) this.$viewPanes[0].focus();
      }
    }, {
      key: "onViewUpdate",
      value: function onViewUpdate(originView) {
        this.$viewPanes.forEach(function (vp) {
          if (vp !== originView) vp.update(false);
        });
      }
    }, {
      key: "refreshPaneSelection",
      value: function refreshPaneSelection() {
        this.$viewPanes.forEach(function (vp) {
          return vp._buildFlatItems();
        });
      }
    }, {
      key: "getParentNode",
      value: function getParentNode(node) {
        var flat = this._flatFromNode(node);

        var parent = flat.parent;
        if (parent) return parent.data;
      }
    }, {
      key: "_createContextMenu",
      value: function _createContextMenu() {
        var _this10 = this;

        this.ContextMenuService.contextMenu({
          selector: '.jf-tree .jf-tree-item',
          build: function build($trigger) {
            var defer = _this10.$q.defer();

            var rowCtrl = ($($trigger[0]).is('.jf-tree-item') ? $($trigger[0]) : $($($trigger[0]).parents('jf-tree-item')[0])).prop('comp');
            var items = rowCtrl.data.data.$cachedCMItems;

            if (items) {
              defer.resolve(items);
            } else {
              _this10.contextMenuItemsGetter(rowCtrl.data.data, function (items) {
                rowCtrl.data.data.$cachedCMItems = items;
                defer.resolve(items);
              });
            }

            return defer.promise;
          }
        });
      }
    }, {
      key: "getNodesCount",
      value: function getNodesCount() {
        var count = 0;
        this.$viewPanes.forEach(function (vp) {
          count += vp.getNodesCount();
        });
        return count;
      }
    }, {
      key: "getFilteredNodesCount",
      value: function getFilteredNodesCount() {
        var count = 0;
        this.$viewPanes.forEach(function (vp) {
          count += vp.getFilteredNodesCount();
        });
        return count;
      }
    }, {
      key: "showLines",
      value: function showLines() {
        this.linesVisible = true;

        this._refreshIndentations();

        return this;
      }
    }, {
      key: "hideLines",
      value: function hideLines() {
        this.linesVisible = false;

        this._refreshIndentations();
      }
    }, {
      key: "bringNodeToView",
      value: function bringNodeToView(node) {
        var doScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var fi = this._flatFromNode(node);

        if (fi) {
          fi.pane.bringItemToView(fi, !doScroll);
        }
      }
    }, {
      key: "registerEventOnNode",
      value: function registerEventOnNode(event, callback) {
        if (!this.eventsToRegisterOnNode) this.eventsToRegisterOnNode = [];
        this.eventsToRegisterOnNode.push({
          event: event,
          callback: callback
        });
      }
    }]);

    return JFTreeApiClass;
  }();

  return JFTreeApiClass;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__("f499");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.to-string.js
var es6_object_to_string = __webpack_require__("06db");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("5176");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("e814");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.ends-with.js
var es6_string_ends_with = __webpack_require__("aef6");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// CONCATENATED MODULE: ./src/ui_components/jf_table_view/cell_template_generators.js
var nextId = 0;
var cellTemplateGenerators = {
  artifactoryRepoPathColumn: function artifactoryRepoPathColumn(specialClass) {
    return '<div><div v-if="row.entity.repoKey" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.repoKey}}/{{row.entity.path}}</div>' + '<div v-if="!row.entity.repoKey" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.path}}</div></div>';
  },
  downloadableColumn: function downloadableColumn(specialClass) {
    return '<div><div v-if="row.entity.downloadLink" class="jf-link ui-grid-cell-contents ' + specialClass + '">{{row.entity.name}}</div>' + '<div v-if="!row.entity.downloadLink" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.name}}</div></div>';
  },
  booleanColumn: function booleanColumn(model) {
    return '<div class="grid-checkbox"><input v-model="' + model + '" type="checkbox" disabled/><span class="icon icon-v"></span></div>';
  },
  checkboxColumn: function checkboxColumn(model, click, disabled) {
    return '<div><div class="grid-cell-checkbox"><jf-checkbox><input v-model="' + model + '"' + (click && click.length ? ' @input="' + click + '"' : '') + (disabled && disabled.length ? ' :disabled="' + disabled + '"' : '') + ' type="checkbox"/></jf-checkbox></div></div>';
  },
  listableColumn: function listableColumn(listModel, rowNameModel, displayModel, alwaysShow) {
    var testIdPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var showAsyncData = arguments.length > 5 ? arguments[5] : undefined;
    var externalCountModel = arguments.length > 6 ? arguments[6] : undefined;
    testIdPrefix = testIdPrefix ? testIdPrefix + '-' : '';

    if (displayModel) {
      displayModel = "{{".concat(listModel, ".length}} | {{").concat(displayModel, "}}");
    } else {
      displayModel = "{{".concat(externalCountModel, " ? ").concat(externalCountModel, " : ").concat(listModel, ".length}} | {{").concat(listModel, ".join(', ')}}{{").concat(externalCountModel, " && ").concat(externalCountModel, " > ").concat(listModel, ".length ? ',...' : ''}}");
    }

    var id = "'".concat(testIdPrefix, "' + row.uid + '_").concat(nextId, "'");
    var template = "<div>\n                            <div v-if=\"".concat(listModel, ".length\"\n                                 @mouseenter=\"table.options.handleListableColumnOverflow('").concat(testIdPrefix, "'+row.uid+'_'+").concat(nextId, ", ").concat(showAsyncData, ", ").concat(externalCountModel, ", ").concat(listModel, ".length)\"   \n                                 :class=\"{'ui-grid-cell-contents no-tooltip': true, 'always-show': ").concat(showAsyncData, " || ").concat(alwaysShow, "}\" \n                                 :id=\"").concat(id, "\">\n                                <span class=\"gridcell-content-text\">").concat(displayModel, "</span>\n                                <a class=\"jf-link gridcell-showall\" \n                                v-if=\"!(").concat(showAsyncData, ")\" \n                                @click=\"table.options.showAll(").concat(listModel, ",").concat(rowNameModel, ",col);$event.stopPropagation()\"> (See All)</a>\n                                <a class=\"jf-link gridcell-showall\" \n                                v-if=\"").concat(showAsyncData, "\" \n                                @click=\"table.options.asyncShowAll(").concat(rowNameModel, ",col)\"> (See All)</a>\n                             </div>\n                             <div v-if=\"!").concat(listModel, ".length\" \n                                  class=\"ui-grid-cell-contents no-tooltip\" \n                                  :id=\"").concat(id, "\">-</div>\n                        </div>");
    nextId++;
    return template;
  },
  iconColumn: function iconColumn(cellText, cellIcon, iconClass) {
    return "<div id=\"type\"><i :class=\"'icon icon-' + ".concat(cellIcon, " + '").concat(iconClass ? ' ' + iconClass : '', "'\"></i>{{").concat(cellText, "}}</div>");
  },
  ajaxColumn: function ajaxColumn() {
    return '<div class="ui-grid-cell-contents status-grid"><div class="icon-hourglass" v-if="!row.entity.status"></div>{{row.entity.status}}</div>';
  }
};
/* harmony default export */ var cell_template_generators = (cellTemplateGenerators);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// CONCATENATED MODULE: ./src/components/JfDataListModal/index.js


var JfDataListModal = {
  template: "\n            <template slot=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"close\" aria-label=\"Close\" @click=\"$dismiss()\"><span aria-hidden=\"_true\">\xD7</span></button>\n                <h4 class=\"modal-title\" id=\"popup-header\">{{items.length}} {{colName}} For {{objectName}} '{{rowName}}'</h4>\n            </template>\n            <template slot=\"modal-footer\">\n                <button class=\"btn btn-default\" @click=\"close()\" id=\"popup-cancel\">Close</button>\n            </template>\n\n            <!-- modal-body content -->\n\n            <input type=\"text\" name=\"filter\" class=\"input-text\" v-model=\"filter.text\" placeholder=\"Filter\">\n            <div class=\"group-list-wrapper\" v-if=\"!noResults()\">\n                <ul class=\"group-list\">\n                    <li class=\"group-list-item\" v-jf-tooltip-on-overflow v-for=\"(item, $index) in items\" v-if=\"filterItem(item)\">\n                        <div v-if=\"!item.url\" v-html=\"item.label || item\"></div>\n                        <a v-if=\"item.url\" class=\"jf-link\" :href=\"item.url\" v-html=\"item.label\" target=\"_blank\"></a>\n                    </li>\n                </ul>\n            </div>\n\n            <div class=\"empty-filter-placeholder filter-no-results\" v-if=\"noResults()\">\n                Current filter has no results. <a href=\"\" class=\"jf-link\" @click.prevent=\"filter.text = ''\">Clear filter</a>\n            </div>\n\n            <!-- modal-body content -->\n    ",
  'jf@inject': ['JFrogUIUtils'],
  methods: {
    filterItem: function filterItem(item) {
      if (this.filter.text) {
        var escaped = this.JFrogUIUtils.escapeForRegex(this.filter.text);
        var regex = new RegExp('.*' + escaped.split('\\*').join('.*') + '.*', 'i');
        return regex.test(item.label) || regex.test(item);
      } else {
        return true;
      }
    },
    noResults: function noResults() {
      var _this = this;

      var filteredResults = _.filter(this.items, function (item) {
        return _this.filterItem(item);
      });

      return filteredResults.length === 0;
    }
  }
};
// CONCATENATED MODULE: ./src/services/factories/JFrogTableViewOptionsFactory.js





















var COMMON_ACTIONS = {
  delete: {
    icon: 'icon icon-clear',
    tooltip: 'Delete'
  },
  download: {
    icon: 'icon icon-download',
    href: function href(row) {
      return row.downloadLink;
    },
    tooltip: 'Download'
  }
};
var defaultAppOptions;
function JFrogTableViewOptions() {
  var injections = $jfrog.get(['$timeout', '$rootScope', '$modal', '$state', 'JFrogDownload', 'JFrogModal', 'JFrogUIUtils']);
  createContextMenu();

  var JFrogTableViewOptionsClass =
  /*#__PURE__*/
  function () {
    function JFrogTableViewOptionsClass(appScope) {
      Object(classCallCheck["a" /* default */])(this, JFrogTableViewOptionsClass);

      _.extend(this, injections);

      this.data = [];
      this.actions = [];
      this.columns = [];
      this.listeners = {};
      this.supportedEvents = ['pagination.change', 'selection.change', 'row.clicked', 'row.dragged', 'row.in.view'];
      this.appScope = appScope; // selection types

      this.NO_SELECTION = 0;
      this.SINGLE_SELECTION = 1;
      this.MULTI_SELECTION = 2; // pagination mode

      this.PAGINATION = 0;
      this.VIRTUAL_SCROLL = 1;
      this.EXTERNAL_PAGINATION = 2;
      this.INFINITE_SCROLL = 3;
      this.INFINITE_VIRTUAL_SCROLL = 4;

      this._setDefaults();
    }

    Object(createClass["a" /* default */])(JFrogTableViewOptionsClass, [{
      key: "_setDefaults",
      value: function _setDefaults() {
        if (defaultAppOptions) {
          this.objectName = defaultAppOptions.objectName;
          this.emptyTableText = defaultAppOptions.emptyTableText;
          this.rowHeight = defaultAppOptions.rowHeight;
          this.headerRowHeight = defaultAppOptions.headerRowHeight;
          this.rowsPerPage = defaultAppOptions.rowsPerPage;
          this.sortable = defaultAppOptions.sortable;
          this.selectionMode = defaultAppOptions.selectionMode;
          this.paginationMode = defaultAppOptions.paginationMode;
          this.actionButtonSize = defaultAppOptions.actionButtonSize;
          this.selectionColumnWidth = defaultAppOptions.selectionColumnWidth;
          this.resizableColumns = defaultAppOptions.resizableColumns;
          this.defaultFilterByAll = defaultAppOptions.defaultFilterByAll;
          this.columnsCustomization = defaultAppOptions.columnsCustomization;
          this.headersVisible = defaultAppOptions.headersVisible;
          this.filterVisible = defaultAppOptions.filterVisible;
          this.paginationVisible = defaultAppOptions.paginationVisible;
          this.autoFocusFilter = defaultAppOptions.autoFocusFilter;
          this.noCount = defaultAppOptions.noCount;
          this.tooltipFilterDisabled = defaultAppOptions.tooltipFilterDisabled;
          this.subRowsEnabled = defaultAppOptions.subRowsEnabled;
          this.draggableRows = defaultAppOptions.draggableRows;
          this.rowInViewDebounceTime = defaultAppOptions.rowInViewDebounceTime;
        } else {
          this.objectName = 'Item';
          this.rowHeight = '50px';
          this.headerRowHeight = '50px';
          this.rowsPerPage = 25;
          this.sortable = true;
          this.selectionMode = this.NO_SELECTION;
          this.paginationMode = this.PAGINATION;
          this.actionButtonSize = 50; //px

          this.selectionColumnWidth = 50; //px

          this.resizableColumns = true;
          this.defaultFilterByAll = true;
          this.columnsCustomization = false;
          this.headersVisible = true;
          this.filterVisible = true;
          this.paginationVisible = true;
          this.autoFocusFilter = false;
          this.noCount = false;
          this.draggableRows = false;
          this.rowInViewDebounceTime = 500;
          this.externalSearchFields = null;
        }
      }
    }, {
      key: "on",
      value: function on(event, listener) {
        if (!_.includes(this.supportedEvents, event)) {
          console.error('jf-table-view: Unsupported Event: ' + event);
          return;
        }

        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(listener);
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (!_.includes(this.supportedEvents, event)) {
          console.error('jf-table-view: Unsupported Event: ' + event);
          return;
        }

        if (this.listeners[event]) {
          if (listener) {
            _.remove(this.listeners[event], function (l) {
              return l === listener;
            });
          } else {
            this.listeners[event] = [];
          }
        }
      }
    }, {
      key: "hasListenersFor",
      value: function hasListenersFor(event) {
        return !!this.listeners[event];
      }
    }, {
      key: "fire",
      value: function fire(event) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        if (this.listeners[event]) {
          this.listeners[event].forEach(function (listener) {
            return listener.apply(void 0, params);
          });
        } // This is for backward compatibility with old grid


        if (event === 'selection.change') {
          if (this.onSelectionChange) this.onSelectionChange();
          if (this.onSelectionChangeBatch) this.onSelectionChangeBatch();
        }
      }
    }, {
      key: "setData",
      value: function setData(data, internalCall) {
        var _this = this;

        var rnd = Math.floor(10000 * Math.random());

        while (rnd === this.rnd) {
          rnd = Math.floor(10000 * Math.random());
        }

        this.rnd = rnd;
        var idPrefix = this.rnd + (this.registeredTabularDnd ? this.registeredTabularDnd.dndRole : '');

        if (this.paginationMode === this.VIRTUAL_SCROLL) {
          data.forEach(function (item, i) {
            item.$$$id = idPrefix + i + '';
          });
        }

        if (this.paginationMode === this.EXTERNAL_PAGINATION && internalCall !== '$$internal$$') {
          console.error('When using external pagination, you should not call setData directly !');
        } else if (this.paginationMode === this.INFINITE_SCROLL && internalCall !== '$$internal$$') {
          console.error('When using infinite scroll, you should not call setData directly !');
        } else {
          this.origData = _.sortBy(data, '');

          if (this.subRowsEnabled) {
            this.data = this._transformDataForSubRowsSupport(data, true);
          } else {
            this.data = data;
          }

          if (!this.data) this.data = [];
          this.update();
        }

        this.dataWasSet = true;

        if (this.paginationMode === this.VIRTUAL_SCROLL && this.dirCtrl) {
          this.dirCtrl.vsApi.reset();
        }

        if (this.dirCtrl) {
          this.dirCtrl._fireDebouncedRowsInView();
        }

        if (this.registeredTabularDnd && this.registeredTabularDnd.dndCtrl) {
          Vue.nextTick(function () {
            return _this.registeredTabularDnd.dndCtrl.$forceUpdate();
          });
        }

        return this;
      }
    }, {
      key: "_transformDataForSubRowsSupport",
      value: function _transformDataForSubRowsSupport(data, autoExpand) {
        var _this2 = this;

        var rowsToExpand = [];
        data.forEach(function (row) {
          if (row.$subRows) {
            row.$expandable = true;

            if (_.isArray(row.$subRows)) {
              row.$subRows.forEach(function (sub) {
                sub.$parentRow = row;
              });

              if (row.$expanded) {
                rowsToExpand.push(row);
              }
            } else if (_.isFunction(row.$subRows)) {
              var origFunc = row.$subRows;

              row.$subRows = function () {
                var promise = origFunc();
                row.$pendingSubRows = true;
                promise.then(function (subRows) {
                  subRows.forEach(function (sub) {
                    sub.$parentRow = row;
                  });
                  row.$subRows = subRows;
                  delete row.$pendingSubRows;
                });
                return promise;
              };

              if (row.$expanded) {
                row.$subRows().then(function () {
                  return _this2._addSubRows(row, data);
                });
              }
            }
          }
        });
        if (autoExpand) rowsToExpand.forEach(function (row) {
          return _this2._addSubRows(row, data);
        });
        return data;
      }
    }, {
      key: "toggleExpansion",
      value: function toggleExpansion(row) {
        var _this3 = this;

        if (_.isFunction(row.$subRows)) {
          row.$subRows().then(function () {
            return _this3.toggleExpansion(row);
          });
        } else {
          if (row.$expandable) {
            Vue.set(row, '$expanded', !row.$expanded);

            if (row.$expanded) {
              this._addSubRows(row);
            } else {
              this._removeSubRows(row);
            }
          } else if (row.$parentRow) {
            this.toggleExpansion(row.$parentRow);
          }
        }
      }
    }, {
      key: "_addSubRows",
      value: function _addSubRows(row) {
        var _addTo;

        var addTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        addTo = addTo || this.data;
        var index = _.indexOf(addTo, row) + 1;

        var newSubRows = _.filter(row.$subRows, function (subRow) {
          return addTo.indexOf(subRow) === -1;
        });

        newSubRows.forEach(function (sr, i) {
          sr.$$$id = row.$$$id + '.' + i;
        });

        (_addTo = addTo).splice.apply(_addTo, [index, 0].concat(Object(toConsumableArray["a" /* default */])(newSubRows)));

        if (addTo === this.data) {
          this.refreshFilter();
          this.update();
        }
      }
    }, {
      key: "_removeSubRows",
      value: function _removeSubRows(row) {
        var _this4 = this;

        if (row.$subRows) {
          row.$subRows.forEach(function (subRow) {
            var index = _this4.data.indexOf(subRow);

            if (index >= 0) {
              _this4.data.splice(index, 1);
            }
          });
        }

        this.refreshFilter();
        this.update();
      }
    }, {
      key: "showCounter",
      value: function showCounter() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.noCount = !show;
        return this;
      }
    }, {
      key: "showFilter",
      value: function showFilter() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.filterVisible = show;
        return this;
      }
    }, {
      key: "showPagination",
      value: function showPagination() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.paginationVisible = show;
        return this;
      }
    }, {
      key: "setRowsPerPage",
      value: function setRowsPerPage(rpp) {
        this.rowsPerPage = rpp;
        return this;
      }
    }, {
      key: "enableColumnsResize",
      value: function enableColumnsResize() {
        var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.resizableColumns = enabled;
        return this;
      }
    }, {
      key: "enableSubRows",
      value: function enableSubRows() {
        this.subRowsEnabled = true;
        return this;
      }
    }, {
      key: "update",
      value: function update() {
        var noSort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var noGrouping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        //            console.log('update',noSort,noGrouping)
        if (this.dirCtrl) {
          if (!noGrouping) {
            this.refreshGrouping();
          }

          this.origData = _.sortBy(this.data, '');

          if (!noSort) {
            this.sortBy(this.sortByField, true);
          } else {
            if (this.dirCtrl) this.dirCtrl.refresh();
          }

          this._normalizeWidths(); //This is for updating header cell templates


          var temp = _.cloneDeep(this.headersRow);

          this.headersRow = temp;
          this.refreshFilter(true);
        }
      }
    }, {
      key: "setObjectName",
      value: function setObjectName(objectName) {
        var useAn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.objectName = objectName;
        this.useAnWithObjectName = useAn;
        return this;
      }
    }, {
      key: "setRowClassAttr",
      value: function setRowClassAttr(rowClassAttr) {
        this.rowClassAttr = rowClassAttr;
        return this;
      }
    }, {
      key: "setRowInViewDebounceTime",
      value: function setRowInViewDebounceTime(debounceTime) {
        this.rowInViewDebounceTime = debounceTime;
        return this;
      }
    }, {
      key: "setNewEntityAction",
      value: function setNewEntityAction(newEntityCallback) {
        this.newEntityCallback = newEntityCallback;
        return this;
      }
    }, {
      key: "filterColumns",
      value: function filterColumns(columns) {
        var _this5 = this;

        return _.filter(columns, function (col) {
          return (!col.isVisible || col.isVisible()) && (!_this5.visibleFields || _this5.visibleFields.indexOf(col.field) !== -1);
        });
      }
    }, {
      key: "setNoFilterResultsMessage",
      value: function setNoFilterResultsMessage(message) {
        this.noFilterResultsText = message;
      }
    }, {
      key: "setColumns",
      value: function setColumns(columns) {
        var _this6 = this;

        this.defaultFilterByAll = !_.filter(columns, function (c) {
          return c.filterable === true;
        }).length;

        if (!this.origColumnDefs) {
          this.origColumnDefs = _.cloneDeep(columns);
        }

        if (this.columnsCustomization && !this.availableColumns) {
          this.loadCustomizedColumnsState();
          this.createAvailableColumnsArray();
          this.updateCustomizedColumns(false);
        }

        columns = this.filterColumns(columns);
        this.columns = columns;
        var actions = [];
        this.columns.forEach(function (col) {
          if (col.actions) {
            col.customActions = col.customActions || [];

            _.forEach(col.actions, function (callback, key) {
              var action;

              if (callback.visibleWhen) {
                action = _this6._getCommonAction(key, callback.callback, callback.visibleWhen);
              } else {
                action = _this6._getCommonAction(key, callback.callback || callback);
              }

              col.customActions.push(action);
            });
          }

          if (col.customActions && col.customActions.length) {
            actions = actions.concat(col.customActions);
          }

          if (col.sortable === undefined) col.sortable = true;
        });

        if (actions.length) {
          if (!this.actionsAggregated) {
            this.actionsAggregated = true;
            this.origActions = this.actions;
          }

          this.setActions(this.origActions.length ? this.origActions.concat(actions) : actions);
        }

        this._sortableFields = _.map(_.filter(this.columns, function (c) {
          return !_.isUndefined(c.header);
        }), 'field');

        if (this.sortable && !this.sortByField) {
          this.sortByField = this._sortableFields ? this._sortableFields[0] : undefined;
        }

        this._normalizeWidths();

        this._checkGroupingSupport();

        this.showHeaders(this.headersVisible);
        return this;
      }
    }, {
      key: "_checkGroupingSupport",
      value: function _checkGroupingSupport() {
        var groupables = _.filter(this.columns, function (c) {
          return !!c.allowGrouping;
        });

        if (this.subRowsEnabled && groupables.length) {
          console.error('jf-table-view: Grouping is not supported with sub rows !');
          groupables.forEach(function (c) {
            return c.allowGrouping = false;
          });
        } else if (this.paginationMode === this.INFINITE_SCROLL && groupables.length) {
          console.error('jf-table-view: Grouping is not supported with infinite scroll !');
          groupables.forEach(function (c) {
            return c.allowGrouping = false;
          });
        }
      }
    }, {
      key: "setRowHeight",
      value: function setRowHeight(height, headerHeight) {
        this.rowHeight = height;
        this.headerRowHeight = headerHeight || height;
        return this;
      }
    }, {
      key: "showHeaders",
      value: function showHeaders() {
        var _this7 = this;

        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.headersVisible = show;
        this.headersRow = {};
        this.columns.forEach(function (column) {
          if (column.header) {
            _.set(_this7.headersRow, column.field, column.header);
          }
        });
        return this;
      }
    }, {
      key: "setSelection",
      value: function setSelection(selectionMode) {
        this.selectionMode = selectionMode;

        this._normalizeWidths();

        return this;
      }
    }, {
      key: "setPaginationMode",
      value: function setPaginationMode(pagiMode, paginationCallback) {
        var _this8 = this;

        this.paginationMode = pagiMode;

        if (this.paginationMode === this.EXTERNAL_PAGINATION) {
          if (!paginationCallback || typeof paginationCallback !== 'function') {
            console.error('Setting pagination mode to EXTERNAL_PAGINATION require pagination callback function as the second parameter of setPaginationMode');
            this.paginationMode = this.PAGINATION;
          } else {
            this.externalPaginationCallback = paginationCallback;
            this.pendingExternalPaging = true;

            if (this.dirCtrl && !this.initialExternalPaginationSent) {
              this.$timeout(function () {
                return _this8.sendExternalPageRequest();
              });
            }
          }
        } else if (this.paginationMode === this.INFINITE_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
          if (!paginationCallback || typeof paginationCallback !== 'function') {
            console.error('Setting pagination mode to INFINITE_SCROLL require pagination callback function as the second parameter of setPaginationMode');
            this.paginationMode = this.PAGINATION;
          } else {
            this.infiniteScrollCallback = paginationCallback;
            this.showPagination(false);
            this.showCounter(false);
            this.showFilter(false);
            this.setSortable(false);
            this.infiniteScrollOffset = 0;

            if (this.dirCtrl && !this.initialInfiniteScrollRequestSent) {
              if (!this.infiniteScrollChunkSize && this.rowsPerPage) this.infiniteScrollChunkSize = this.rowsPerPage;
              this.$timeout(function () {
                return _this8.sendInfiniteScrollRequest();
              });
            }
          }
        }

        this._checkGroupingSupport();

        return this;
      }
    }, {
      key: "hasSelection",
      value: function hasSelection() {
        return _.includes([this.SINGLE_SELECTION, this.MULTI_SELECTION], this.selectionMode);
      }
    }, {
      key: "getSelected",
      value: function getSelected() {
        return _.filter(this.data, {
          $selected: true
        });
      }
    }, {
      key: "getSelectedCount",
      value: function getSelectedCount() {
        return this.getSelected().length;
      }
    }, {
      key: "sortBy",
      value: function sortBy(field) {
        var resort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var sendExternal = false;

        if (!resort && this.sortByField === field) {
          this.revSort = !this.revSort;
          sendExternal = true;
        } else if (!resort) {
          this.revSort = false;
        }

        if (this.sortByField !== field) {
          sendExternal = true;
        }

        this.sortByField = field;

        if (this.externalSortCallback && sendExternal) {
          this.externalSortCallback(field, this.revSort ? 'desc' : 'asc');
          return;
        }

        if (this.paginationMode === this.EXTERNAL_PAGINATION && sendExternal) {
          this.sendExternalPageRequest();
        }

        this.refreshSorting();
        return this;
      }
    }, {
      key: "reverseSortingDir",
      value: function reverseSortingDir() {
        this.sortBy(this.sortByField);
        return this;
      }
    }, {
      key: "setSortable",
      value: function setSortable() {
        var sortable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (sortable && this.draggableRows && !this.registeredTabularDnd) return;
        this.sortable = sortable;

        if (sortable && !this.sortByField) {
          this.sortBy(this._sortableFields ? this._sortableFields[0] : undefined);
        } else if (!sortable) {
          this.sortBy(undefined);
        }

        return this;
      }
    }, {
      key: "setDraggable",
      value: function setDraggable(callback) {
        this.draggableRows = true;
        this.setSortable(false);
        if (callback) this.on('row.dragged', callback);
        return this;
      }
    }, {
      key: "setActions",
      value: function setActions(actions) {
        this.actions = actions;

        this._normalizeWidths();

        return this;
      }
    }, {
      key: "setAutoFocusFilter",
      value: function setAutoFocusFilter() {
        var autoFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.autoFocusFilter = autoFocus;
        return this;
      }
    }, {
      key: "setBatchActions",
      value: function setBatchActions(batchActions) {
        this.batchActions = batchActions;
        this.setSelection(this.MULTI_SELECTION);
        return this;
      }
    }, {
      key: "_setDirectiveController",
      value: function _setDirectiveController(ctrl) {
        var _this9 = this;

        this.dirCtrl = ctrl;
        this.update();

        if (this.paginationMode === this.EXTERNAL_PAGINATION) {
          this.$timeout(function () {
            return _this9.sendExternalPageRequest();
          });
          this.initialExternalPaginationSent = true;
        } else if (this.paginationMode === this.INFINITE_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
          this.$timeout(function () {
            _this9._initInfiniteScroll();

            if (!_this9.infiniteScrollChunkSize && _this9.rowsPerPage) _this9.infiniteScrollChunkSize = _this9.rowsPerPage;

            _this9.sendInfiniteScrollRequest();

            _this9.initialInfiniteScrollRequestSent = true;
          });
        }

        this.dirCtrl._fireDebouncedRowsInView();
      }
    }, {
      key: "_initInfiniteScroll",
      value: function _initInfiniteScroll() {
        var _this10 = this;

        var EDGE = 50;

        if (this.paginationMode === this.INFINITE_SCROLL) {
          var scrollParent = window.$(this.dirCtrl.$element).scrollParent();
          scrollParent.on('scroll', function (e) {
            if (!_this10.infiniteScrollHasMore || _this10.pendingInfiniteScroll) return;
            var bottomReached = false;

            if (scrollParent[0] === document) {
              if (window.$(window).scrollTop() + window.$(window).height() >= window.$(document).height() - EDGE) {
                bottomReached = true;
              }
            } else {
              if (scrollParent[0].scrollHeight - scrollParent.scrollTop() <= scrollParent[0].clientHeight + EDGE) {
                bottomReached = true;
              }
            }

            if (bottomReached) {
              e.preventDefault();
              _this10.infiniteScrollOffset += _this10.infiniteScrollChunkSize;
              _this10.rowsPerPage += _this10.infiniteScrollChunkSize;

              _this10.sendInfiniteScrollRequest();
            }
          });
        } else if (this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
          this.dirCtrl.vsApi.registerBottomReachedListener(function () {
            if (!_this10.infiniteScrollHasMore || _this10.pendingInfiniteScroll) return;
            _this10.infiniteScrollOffset = _this10.getRawData().length;

            _this10.sendInfiniteScrollRequest();
          });
        }
      }
    }, {
      key: "getActionsContainerWidthInPixels",
      value: function getActionsContainerWidthInPixels() {
        return this.actionButtonSize * (this.actions.length <= 3 || this.isRowActionGroupingDisabled ? this.actions.length : 1);
      }
    }, {
      key: "_normalizeWidths",
      value: function _normalizeWidths() {
        var _this11 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!this.dirCtrl) {
          return;
        }

        var actionsWidth = 0;
        var selectionWidth = 0;

        if (this.actions) {
          actionsWidth = this.getActionsContainerWidthInPixels();
        }

        if (this.hasSelection()) {
          selectionWidth = this.selectionColumnWidth;
        }

        var totalAbs = actionsWidth + selectionWidth;
        var totalPerc = 0;
        var percsOfUnderThresholdColumns = 0;
        this.columns.forEach(function (col) {
          if (col.origWidth === undefined) {
            col.origWidth = col.width;
          }

          var width = col.origWidth;

          if (width && width.trim().endsWith('%')) {
            if (col.underWidthThresholde) {
              percsOfUnderThresholdColumns += parse_float_default()(width);
            } else {
              totalPerc += parse_float_default()(width);
            }
          } else if (width && width.trim().endsWith('px')) {
            totalAbs += parse_float_default()(width);
          } else if (width === undefined) {
            col.origWidth = col.width = 100 / _this11.columns.length + '%';
            totalPerc += parse_float_default()(col.width);
          }
        });

        var setNormalWidths = function setNormalWidths() {
          var containerWidth;

          if (_this11.data.length) {
            containerWidth = $(_this11.dirCtrl.$element).find('.jf-table-row').innerWidth();
          } else {
            containerWidth = $(_this11.dirCtrl.$element).find('.jf-table-view-container').width();
          }

          var percSpace = containerWidth - totalAbs; //                let absPerc = (totalAbs/containerWidth)*100;

          var normalizer = 100 / totalPerc;
          var totalFinalPerc = (actionsWidth + selectionWidth) / containerWidth * 100;
          var shouldReCalc = false;

          _this11.columns.forEach(function (col) {
            var width = col.origWidth;

            if (width && width.trim().endsWith('%')) {
              var origVal = parse_float_default()(width);

              var newVal = normalizer * origVal * percSpace / 100;
              var normalizerIgnoringThreshold = 100 / (totalPerc + (col.underWidthThresholde ? origVal : 0));
              var newValIgnoringThreshold = normalizerIgnoringThreshold * origVal * percSpace / 100;

              if (!col.underWidthThresholde && col.pixelWidthThreshold && newVal < col.pixelWidthThreshold) {
                shouldReCalc = true;
                col.underWidthThresholde = true;
              } else if (col.underWidthThresholde && newValIgnoringThreshold >= col.pixelWidthThreshold) {
                shouldReCalc = true;
                delete col.underWidthThresholde;
              } else if (!col.underWidthThresholde) {
                var newPerc = newVal / containerWidth * 100;
                col.width = newPerc + '%';
                totalFinalPerc += newPerc;
              } else if (col.underWidthThresholde && col.pixelWidthThreshold && newValIgnoringThreshold < col.pixelWidthThreshold) {
                col.width = 0;
              }
            } else if (width) {
              totalFinalPerc += 100 * parse_float_default()(width) / containerWidth;
            }
          }); //                console.log(totalFinalPerc);


          if (shouldReCalc && !recurse) {
            _this11._normalizeWidths(false, true);
          } else {
            Vue.set(_this11, 'ready', true);
          }
        };

        if (delay) this.$timeout(function () {
          return setNormalWidths();
        });else setNormalWidths();
      }
    }, {
      key: "getDisplayNameForField",
      value: function getDisplayNameForField(field) {
        var col = _.find(this.columns, {
          field: field
        });

        if (col) {
          return col.header;
        }
      }
    }, {
      key: "setEmptyTableText",
      value: function setEmptyTableText(text) {
        this.emptyTableText = text;
        return this;
      }
    }, {
      key: "setEmptyTableAction",
      value: function setEmptyTableAction(cb) {
        this.emptyTableAction = cb;
        return this;
      }
    }, {
      key: "setEmptyTableCallToAction",
      value: function setEmptyTableCallToAction(text) {
        this.emptyTableCallActionText = text;
        return this;
      }
    }, {
      key: "disableFilterTooltip",
      value: function disableFilterTooltip() {
        this.tooltipFilterDisabled = true;
        return this;
      }
    }, {
      key: "getSelectedRows",
      value: function getSelectedRows() {
        return _.filter(this.data, {
          $selected: true
        });
      }
    }, {
      key: "clearSelection",
      value: function clearSelection() {
        if (this.dirCtrl) this.dirCtrl.clearSelection();
      }
    }, {
      key: "groupBy",
      value: function groupBy(field) {
        this.groupedBy = this.groupedBy === field ? null : field;

        if (this.groupedBy) {
          this.setFirstColumn(field);
        } else {
          this.restoreColumnOrder();
        }

        this.openedGroupHeaders = [];
        this.groupedData = null;
        this.refreshGrouping();
        return this;
      }
    }, {
      key: "refreshGrouping",
      value: function refreshGrouping() {
        if (this.groupedData) {
          this.openedGroupHeaders = _.filter(this.groupedData, {
            $groupHeader: {
              $expanded: true
            }
          });
        }

        delete this.groupedData;
        this.refreshSorting();
      }
    }, {
      key: "refreshFilter",
      value: function refreshFilter() {
        var noGroupsRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        delete this.filterCache;

        if (this.paginationMode === this.EXTERNAL_PAGINATION) {
          this.sendExternalPageRequest();
        }

        if (!noGroupsRefresh) this.refreshGrouping();
      }
    }, {
      key: "refreshSorting",
      value: function refreshSorting() {
        delete this.sortedData;
        if (this.dirCtrl) this.dirCtrl.refresh(false);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.refreshFilter();
      }
    }, {
      key: "updateGroupExpansionState",
      value: function updateGroupExpansionState(groupHeaderRow) {
        var doUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var field = groupHeaderRow.$groupHeader.field;
        var value = groupHeaderRow.$groupHeader.value;

        var toRemove = _.filter(this.groupedData, function (row) {
          return !row.$groupHeader && _.get(row, field) == value;
        });

        this.groupedData = _.difference(this.groupedData, toRemove);

        if (groupHeaderRow.$groupHeader.$expanded) {
          var _this$groupedData;

          var index = _.indexOf(this.groupedData, groupHeaderRow);

          (_this$groupedData = this.groupedData).splice.apply(_this$groupedData, [index + 1, 0].concat(Object(toConsumableArray["a" /* default */])(this.fullGroupedData[value])));
        }

        if (doUpdate) this.update(false, true);
      }
    }, {
      key: "setFirstColumn",
      value: function setFirstColumn(field) {
        this.restoreColumnOrder();

        var column = _.find(this.columns, {
          field: field
        });

        if (column) {
          var index = this.columns.indexOf(column);
          column.$originalIndex = index;
          this.columns.splice(index, 1);
          this.columns.splice(0, 0, column);
        }
      }
    }, {
      key: "restoreColumnOrder",
      value: function restoreColumnOrder() {
        var originalIndex = this.columns[0] && this.columns[0].$originalIndex;

        if (originalIndex) {
          var temp = this.columns[0];
          this.columns.splice(0, 1);
          this.columns.splice(originalIndex, 0, temp);
        }
      }
    }, {
      key: "getPageData",
      value: function getPageData() {
        if (this.paginationMode === this.PAGINATION) {
          return this.dirCtrl ? this.getPrePagedData().slice(this.dirCtrl.currentPage * this.rowsPerPage, this.dirCtrl.currentPage * this.rowsPerPage + this.rowsPerPage) : [];
        } else if (this.paginationMode === this.VIRTUAL_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
          return this.dirCtrl && this.dirCtrl.vsApi && this.dirCtrl.vsApi.getPageData ? this.dirCtrl.vsApi.getPageData() : [];
        } else if (this.paginationMode === this.EXTERNAL_PAGINATION || this.paginationMode === this.INFINITE_SCROLL) {
          return this.getRawData();
        }
      }
    }, {
      key: "sendExternalPageRequest",
      value: function sendExternalPageRequest() {
        var _this12 = this;

        if (!this.dirCtrl || _.isUndefined(this.dirCtrl.currentPage)) {
          return;
        }

        var paginationParams = {
          pageNum: this.dirCtrl.currentPage,
          numOfRows: this.rowsPerPage,
          direction: !this.sortByField ? null : this.revSort ? 'desc' : 'asc',
          orderBy: this.sortByField,
          filter: !_.isNull(this.externalSearchFields) ? null : this.dirCtrl.tableFilter || null,
          filterBy: !_.isNull(this.externalSearchFields) ? null : _.map(this.getFilterables(), 'field'),
          externalSearchFields: this.externalSearchFields || null
        };

        if (_.isEqual(this.lastPaginationParams, paginationParams)) {
          return;
        }

        this.lastPaginationParams = paginationParams;
        var promise = this.externalPaginationCallback(paginationParams);

        if (!promise || !promise.then) {
          console.error('External pagination callback should return promise');
        } else {
          this.pendingExternalPaging = true;
          promise.then(function (pagedData) {
            _this12.setData(pagedData.data, '$$internal$$');

            Vue.set(_this12, 'externalTotalCount', {
              total: pagedData.totalCount,
              filtered: pagedData.filteredCount
            });
            _this12.pendingExternalPaging = false;
            _this12.dirCtrl.noFilterResults = _this12.externalTotalCount.filtered === 0 && _this12.externalTotalCount.total > 0;

            _this12.dirCtrl.paginationApi.update();
          });
        }
      }
    }, {
      key: "sendInfiniteScrollRequest",
      value: function sendInfiniteScrollRequest() {
        var _this13 = this;

        var resetData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!this.dirCtrl || this.pendingInfiniteScroll) {
          return;
        }

        var wholePageHeight = this.dirCtrl.getActualPageHeight(true);

        if (wholePageHeight < parse_int_default()(this.rowHeight) && recurse < 20) {
          setTimeout(function () {
            _this13.sendInfiniteScrollRequest(resetData, ++recurse);
          }, 100);
          return;
        }

        var endlessScrollParams = {
          offset: this.infiniteScrollOffset,
          numOfRows: this.infiniteScrollChunkSize !== 'auto' ? this.infiniteScrollChunkSize : 2 + Math.floor(wholePageHeight / parse_int_default()(this.rowHeight)) //vsApi.getItemsPerPage()

        };

        if (this.externalSearchFields) {
          endlessScrollParams = assign_default()({}, {
            externalSearchFields: this.externalSearchFields
          });
        }

        var promise = this.infiniteScrollCallback(endlessScrollParams);

        if (!promise || !promise.then) {
          console.error('Infinite scroll callback should return promise');
        } else {
          Vue.set(this, 'pendingInfiniteScroll', true);
          return promise.then(function (moreData) {
            if (resetData) {
              _this13.setData(moreData.data, '$$internal$$');
            } else {
              _this13.setData(_this13.data.concat(moreData.data), '$$internal$$');
            }

            _this13.infiniteScrollHasMore = moreData.hasMore;
            Vue.set(_this13, 'pendingInfiniteScroll', false);
          });
        }
      }
    }, {
      key: "getTotalLengthOfData",
      value: function getTotalLengthOfData() {
        if (this.paginationMode === this.EXTERNAL_PAGINATION) {
          return this.externalTotalCount ? this.externalTotalCount.filtered || 0 : 0;
        } else {
          return this.getPrePagedData().length;
        }
      }
    }, {
      key: "getFilterables",
      value: function getFilterables() {
        var filterables;

        if (this.defaultFilterByAll) {
          filterables = _.filter(this.columns, function (col) {
            return col.filterable !== false;
          });
        } else {
          filterables = _.filter(this.columns, function (col) {
            return col.filterable === true;
          });
        }

        return filterables;
      }
    }, {
      key: "getFilterTooltip",
      value: function getFilterTooltip() {
        if (!this.columns || !this.columns.length) {
          return '';
        } else {
          var filterables = this.getFilterables();

          if (filterables.length === this.columns.length && this.columns.length > 1) {
            return 'Filter by any column';
          } else {
            return 'Filter by ' + _.map(filterables, function (c) {
              return c.header || _.startCase(c.field);
            }).join(', ');
          }
        }
      }
    }, {
      key: "_reorderStickies",
      value: function _reorderStickies(data) {
        var stickies = _.filter(data, function (i) {
          return i.$sticky;
        });

        stickies.forEach(function (sticky) {
          data.splice(data.indexOf(sticky), 1);
        });
        data.splice.apply(data, [0, 0].concat(Object(toConsumableArray["a" /* default */])(stickies)));
        Array.prototype.splice.apply(data, [0, 0].concat(stickies));
      }
    }, {
      key: "_saveAndRemoveSubRows",
      value: function _saveAndRemoveSubRows(data) {
        if (!this.subRowsEnabled) {
          return data;
        }

        this.savedSubRowsParents = _.filter(data, function (d) {
          return d.$subRows && d.$expanded;
        });
        return _.filter(data, function (d) {
          return !d.$parentRow;
        });
      }
    }, {
      key: "_reInsertSubRows",
      value: function _reInsertSubRows(data) {
        var _this14 = this;

        if (!this.subRowsEnabled) {
          return data;
        }

        var newData = [].concat(data);

        if (this.savedSubRowsParents) {
          this.savedSubRowsParents.forEach(function (parent) {
            _this14._addSubRows(parent, newData);
          });
        }

        return newData;
      }
    }, {
      key: "getPrePagedData",
      value: function getPrePagedData() {
        return this.getSortedData(this.getGroupedData(this.getFilteredData(this.getRawData())));
      }
    }, {
      key: "getSortedData",
      value: function getSortedData(sourceData) {
        var _this15 = this;

        if (this.paginationMode === this.EXTERNAL_PAGINATION || this.externalSortCallback || !this.sortByField) {
          return sourceData;
        } else {
          if (!this.sortedData) {
            (function () {
              sourceData = _this15._saveAndRemoveSubRows(sourceData);

              var colObj = _.find(_this15.columns, {
                field: _this15.sortByField
              });

              if (colObj) {
                if (colObj.sortingAlgorithm) {
                  if (_this15.groupedData) {
                    if (_this15.groupedBy === _this15.sortByField) {
                      _this15.sortedData = sourceData.sort(function (a, b) {
                        if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === _this15.sortByField && a.$groupHeader.value === _.get(b, _this15.sortByField)) {
                          return -1;
                        } else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === _this15.sortByField && b.$groupHeader.value === _.get(a, _this15.sortByField)) {
                          return 1;
                        } else {
                          var valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, _this15.sortByField);
                          var valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, _this15.sortByField);
                          return (_this15.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
                        }
                      });
                    } else {
                      for (var key in _this15.fullGroupedData) {
                        var groupData = _this15.fullGroupedData[key];
                        groupData.sort(function (a, b) {
                          var valA = _.get(a, _this15.sortByField);

                          var valB = _.get(b, _this15.sortByField);

                          return (_this15.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
                        });
                      }

                      _this15.groupedData.forEach(function (row) {
                        if (row.$groupHeader) {
                          _this15.updateGroupExpansionState(row, false);
                        }
                      });

                      _this15.sortedData = sourceData;
                    }
                  } else {
                    _this15.sortedData = sourceData.sort(function (a, b) {
                      return (_this15.revSort ? -1 : 1) * colObj.sortingAlgorithm(_.get(a, _this15.sortByField), _.get(b, _this15.sortByField), a, b, colObj);
                    });
                  }
                } else {
                  if (colObj.sortBy) {
                    if (_this15.groupedData) {
                      if (_this15.groupedBy === _this15.sortByField) {
                        _this15.sortedData = _.sortBy(sourceData, function (row) {
                          return (_this15.revSort ? -1 : 1) * colObj.sortBy(row.$groupHeader.value, row);
                        });
                      } else {
                        for (var _key2 in _this15.fullGroupedData) {
                          _this15.fullGroupedData[_key2] = _.sortBy(_this15.fullGroupedData[_key2], function (row) {
                            return (_this15.revSort ? -1 : 1) * colObj.sortBy(_.get(row, _this15.sortByField), row);
                          });
                        }

                        _this15.groupedData.forEach(function (row) {
                          if (row.$groupHeader) {
                            _this15.updateGroupExpansionState(row, false);
                          }
                        });

                        _this15.sortedData = sourceData;
                      }
                    } else {
                      _this15.sortedData = _.sortBy(sourceData, function (row) {
                        return (_this15.revSort ? -1 : 1) * colObj.sortBy(_.get(row, _this15.sortByField), row);
                      });
                    }
                  } else {
                    if (_this15.groupedData) {
                      if (_this15.groupedBy === _this15.sortByField) {
                        _this15.sortedData = sourceData.sort(function (a, b) {
                          if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === _this15.sortByField && a.$groupHeader.value === _.get(b, _this15.sortByField)) {
                            return -1;
                          } else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === _this15.sortByField && b.$groupHeader.value === _.get(a, _this15.sortByField)) {
                            return 1;
                          } else {
                            var valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, _this15.sortByField);
                            var valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, _this15.sortByField);
                            return (_this15.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
                          }
                        });
                      } else {
                        for (var _key3 in _this15.fullGroupedData) {
                          var _groupData = _this15.fullGroupedData[_key3];

                          _groupData.sort(function (a, b) {
                            var valA = _.get(a, _this15.sortByField);

                            var valB = _.get(b, _this15.sortByField);

                            return (_this15.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
                          });
                        }

                        _this15.groupedData.forEach(function (row) {
                          if (row.$groupHeader) {
                            _this15.updateGroupExpansionState(row, false);
                          }
                        });

                        _this15.sortedData = sourceData;
                      }
                    } else {
                      var temp = _.sortBy(sourceData, function (item) {
                        var val = _.get(item, _this15.sortByField);

                        return _.isString(val) ? val.toLowerCase() : _.isArray(val) ? val.length : val;
                      });

                      if (_this15.revSort) _this15.sortedData = temp.reverse();else _this15.sortedData = temp;
                    }
                  }
                }

                _this15.sortedData = _this15._reInsertSubRows(_this15.sortedData);

                _this15._reorderStickies(_this15.sortedData);
              } else {
                _this15.sortedData = [].concat(sourceData);
              }
            })();
          }

          return this.sortedData;
        }
      }
    }, {
      key: "getGroupedData",
      value: function getGroupedData(sourceData) {
        var _this16 = this;

        if (this.paginationMode === this.EXTERNAL_PAGINATION || !this.groupedBy) {
          return sourceData;
        } else {
          if (!this.groupedData) {
            this.setFirstColumn(this.groupedBy);
            this.fullGroupedData = _.groupBy(sourceData, this.groupedBy);
            var tempData = [];

            var column = _.find(this.columns, {
              field: this.groupedBy
            });

            for (var key in this.fullGroupedData) {
              var data = this.fullGroupedData[key];
              tempData.push({
                $groupHeader: {
                  field: this.groupedBy,
                  value: _.get(data[0], this.groupedBy),
                  col: column,
                  count: data.length
                }
              });
            }

            this.groupedData = tempData; // reopen previously opened group headers

            this.openedGroupHeaders.forEach(function (wasOpened) {
              var toBeOpened = _.find(_this16.groupedData, {
                $groupHeader: {
                  value: wasOpened.$groupHeader.value
                }
              });

              if (toBeOpened) {
                toBeOpened.$groupHeader.$expanded = true;

                _this16.updateGroupExpansionState(toBeOpened, false);
              }
            });
          }

          return this.groupedData;
        }
      }
    }, {
      key: "getFilteredData",
      value: function getFilteredData(sourceData) {
        var _this17 = this;

        sourceData = sourceData || this.getRawData();

        if (this.paginationMode === this.EXTERNAL_PAGINATION) {
          return sourceData || [];
        }

        if (this.dirCtrl && !this.dirCtrl.tableFilter) {
          Vue.set(this.dirCtrl, 'noFilterResults', false);
          return sourceData || [];
        }

        if (!this.filterCache) {
          this.filterCache = _.filter(sourceData, function (row) {
            for (var i in _this17.columns) {
              var col = _this17.columns[i];

              if (_this17.defaultFilterByAll && col.filterable !== false || !_this17.defaultFilterByAll && col.filterable === true) {
                if (row.$sticky && !row.$stickyFilterable || _this17._isSubVisible(row, col) || row.$groupHeader || _.get(row, col.field) && _.includes(_.get(row, col.field).toString().toLowerCase(), _this17.dirCtrl.tableFilter.toLowerCase())) {
                  return true;
                }
              }
            }

            return false;
          });
        }

        if (this.dirCtrl) {
          Vue.set(this.dirCtrl, 'noFilterResults', !!(!this.filterCache.length && sourceData.length));
        }

        return this.filterCache;
      }
    }, {
      key: "_isSubVisible",
      value: function _isSubVisible(row, col) {
        if (!this.subRowsEnabled) {
          return false;
        }

        var subsVisible = false;

        if (row.$expandable) {
          for (var i = 0; i < row.$subRows.length; i++) {
            var subRow = row.$subRows[i];

            if (this.defaultFilterByAll && col.filterable !== false || !this.defaultFilterByAll && col.filterable === true) {
              if (_.get(subRow, col.field) && _.includes(_.get(subRow, col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase())) {
                subsVisible = true;
                break;
              }
            }
          }
        }

        return subsVisible;
      }
    }, {
      key: "getRawData",
      value: function getRawData() {
        return this.data || [];
      }
    }, {
      key: "allowColumnsCustomization",
      value: function allowColumnsCustomization() {
        this.columnsCustomization = true;
        this.loadCustomizedColumnsState();
        this.createAvailableColumnsArray();
        this.updateCustomizedColumns();
        return this;
      }
    }, {
      key: "createAvailableColumnsArray",
      value: function createAvailableColumnsArray() {
        var _this18 = this;

        if (!this.origColumnDefs) {
          return;
        }

        this.availableColumns = [];
        this.origColumnDefs.forEach(function (colDef) {
          var item = {
            id: colDef.field,
            text: colDef.header || _.startCase(colDef.field),
            isSelected: !_this18.visibleFields && !colDef.optional || _this18.visibleFields && _this18.visibleFields.indexOf(colDef.field) !== -1
          };

          _this18.availableColumns.push(item);
        });
      }
    }, {
      key: "refreshColumns",
      value: function refreshColumns() {
        if (this.origColumnDefs) {
          this.setColumns(_.cloneDeep(this.origColumnDefs));
        }
      }
    }, {
      key: "updateCustomizedColumns",
      value: function updateCustomizedColumns() {
        var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!this.availableColumns) {
          return;
        }

        this.visibleFields = _.map(_.filter(this.availableColumns, function (col) {
          return col.isSelected;
        }), 'id');
        this.saveCustomizedColumnsState();

        if (refresh) {
          this.refreshColumns();
        }
      }
    }, {
      key: "setId",
      value: function setId(id) {
        this.tableId = id;
        return this;
      }
    }, {
      key: "saveCustomizedColumnsState",
      value: function saveCustomizedColumnsState() {
        if (!this.tableId) {
          return;
        }

        if (!localStorage.jfTableViewSettings) {
          localStorage.jfTableViewSettings = stringify_default()(Object(defineProperty["a" /* default */])({}, this.tableId, this.visibleFields));
        } else {
          var settings = JSON.parse(localStorage.jfTableViewSettings);
          settings[this.tableId] = this.visibleFields;
          localStorage.jfTableViewSettings = stringify_default()(settings);
        }
      }
    }, {
      key: "loadCustomizedColumnsState",
      value: function loadCustomizedColumnsState() {
        if (!this.tableId) {
          return;
        }

        var settings = localStorage.jfTableViewSettings;

        if (settings) {
          settings = JSON.parse(settings);
          var mySetting = settings[this.tableId];
          this.visibleFields = mySetting;
        }
      }
    }, {
      key: "setKey",
      value: function setKey(key) {
        if (typeof key === 'function') {
          this.keyFn = function (row) {
            return key(row);
          };
        } else {
          this.keyFn = function (row) {
            return row[key];
          };
        }

        return this;
      }
    }, {
      key: "updateData",
      value: function updateData(data) {
        var _this19 = this;

        var removeIfMissing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var maxRowsLen = arguments.length > 2 ? arguments[2] : undefined;

        if (!this.data || !this.data.length) {
          this.setData(data);
        } else if (!this.keyFn) {
          throw new Error('Cannot update data, no key was defined. (use setKey(key|keyFn))');
        } else {
          var existingRows = [];
          var doUpdate = false;
          data.forEach(function (row) {
            var exists = _.find(_this19.data, function (r) {
              return _this19.keyFn(r) === _this19.keyFn(row);
            });

            if (exists) {
              existingRows.push(exists);

              for (var key in exists) {
                if (!key.startsWith('$')) {
                  exists[key] = row[key];
                }
              }

              if (row.$subRows) {
                var subRowsToSave = [];
                row.$subRows.forEach(function (subRow) {
                  var existsSub = _.find(exists.$subRows, function (r) {
                    return _this19.keyFn(r) === _this19.keyFn(subRow);
                  });

                  if (existsSub) {
                    subRowsToSave.push(existsSub);

                    for (var subKey in existsSub) {
                      if (!subKey.startsWith('$')) {
                        existsSub[subKey] = subRow[subKey];
                      }
                    }
                  } else {
                    subRow.$parentRow = exists;

                    if (!exists.$subRows) {
                      exists.$subRows = [];
                      exists.$expandable = true;
                    }

                    exists.$subRows.push(subRow);
                    exists.$subRows.reverse();
                    subRowsToSave.push(subRow);
                    doUpdate = true;
                  }
                });

                if (removeIfMissing) {
                  var removed = _.difference(exists.$subRows, subRowsToSave);

                  if (removed.length) {
                    doUpdate = true;

                    _.remove(exists.$subRows, function (sr) {
                      return _.includes(removed, sr);
                    });
                  }
                }
              }
            } else {
              _this19.data.push(row);

              existingRows.push(row);
              doUpdate = true;
            }
          });

          if (removeIfMissing) {
            var removed = _.difference(this.data, existingRows);

            if (removed.length) {
              doUpdate = true;

              _.remove(this.data, function (row) {
                return _.includes(removed, row);
              });
            }
          }

          if (doUpdate) this.update();
        }
      }
    }, {
      key: "isOverflowing",
      value: function isOverflowing(cellId) {
        var elem = $(this.dirCtrl.$element).find('#' + cellId);
        var text = elem.children('.gridcell-content-text');
        var showAll = elem.children('.gridcell-showall');
        var cellItemContent = elem.text().trim();
        var width = 0;

        if (showAll.length) {
          width = showAll.outerWidth();
        } //        showAll.css('background-color',elem.parent().css('background-color'));


        if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth()) {
          //            elem.css('padding-right',width+'px');
          elem.addClass('overflow');
          elem.find('.gridcell-showall').show();
          return true;
        } else {
          elem.removeClass('overflow');
          elem.find('.gridcell-showall').hide(); //            elem.css('padding-right','5px');

          return false;
        }
      }
    }, {
      key: "handleListableColumnOverflow",
      value: function handleListableColumnOverflow(cellId, showAsyncData, externalCountModel, listModelLength) {
        var elem = $(this.dirCtrl.$element).find('#' + cellId);
        var cellItemContent = elem.text().trim();

        if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth() || showAsyncData && externalCountModel > listModelLength) {
          elem.addClass('overflow');
          elem.find('.gridcell-showall').show();
          return true;
        } else {
          elem.removeClass('overflow');
          elem.find('.gridcell-showall').hide();
          return false;
        }
      }
    }, {
      key: "showAll",
      value: function showAll(model, rowName, col) {
        var objectName = _.startCase(this.objectName.indexOf('/') >= 0 ? this.objectName.split('/')[0] : this.objectName);

        var modalScope = {
          items: model,
          colName: col.header,
          rowName: rowName,
          objectName: objectName,
          filter: {}
        };
        this.JFrogModal.launchModal(JfDataListModal, modalScope, 'sm', false, {
          dontRejectOnClose: true,
          class: "show-all-modal"
        });
      }
    }, {
      key: "asyncShowAll",
      value: function asyncShowAll(rowName, col) {
        var _this20 = this;

        if (col && col.asyncDataCallback) {
          col.asyncDataCallback(rowName).then(function (dataList) {
            _this20.showAll(dataList, rowName, col);
          });
        }
      }
    }, {
      key: "_getCommonAction",
      value: function _getCommonAction(key, callback, visibleWhen) {
        var action = COMMON_ACTIONS[key];
        action = _.extend({
          callback: callback
        }, action);

        if (visibleWhen) {
          action = _.extend({
            visibleWhen: visibleWhen
          }, action);
        }

        return action;
      }
    }, {
      key: "toggleColumnsCustomizationDropdown",
      value: function toggleColumnsCustomizationDropdown() {
        var _this21 = this;

        var opened = $(this.dirCtrl.$element).find('.drop-down-container').length;
        if (!opened) this.$timeout(function () {
          $(_this21.dirCtrl.$element).find('.main-box').click();
        });
      }
    }, {
      key: "hasVisibleActionsFor",
      value: function hasVisibleActionsFor(rowData) {
        var visible = _.filter(this.actions, function (act) {
          return !act.visibleWhen || act.visibleWhen(rowData);
        });

        return !!visible.length;
      }
    }, {
      key: "dragRow",
      value: function dragRow(row) {
        if (this.registeredTabularDnd && this.getSelectedCount()) {
          row.$selected = true;
          this.startMultiDrag();
          return;
        }

        this.draggedRow = row;
        this.draggedIndex = _.findIndex(this.data, function (r) {
          return r === row;
        });

        _.remove(this.data, function (r) {
          return r === row;
        });

        this.update();
        this.refreshFilter();
      }
    }, {
      key: "startMultiDrag",
      value: function startMultiDrag() {
        var _this22 = this;

        var selected = this.getSelectedRows();
        var filtered = this.getFilteredData();
        selected = _.filter(selected, function (item) {
          return _.includes(filtered, item);
        });
        this.draggedRows = _.map(selected, function (selectedRow) {
          return {
            row: selectedRow,
            index: _.findIndex(_this22.data, function (r) {
              return r === selectedRow;
            })
          };
        });

        _.remove(this.data, function (r) {
          return _.includes(selected, r);
        });

        this.update();
        this.refreshFilter();
      }
    }, {
      key: "dropDraggedRow",
      value: function dropDraggedRow(targetRow) {
        var draggedRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var tabularDndDrag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.registeredTabularDnd && (this.draggedRows || _.isArray(draggedRow))) {
          this.dropDraggedRows(targetRow, draggedRow, tabularDndDrag);
          return;
        }

        if (this.markedDropTarget) {
          this.markedDropTarget.removeClass('drop-target-mark');
        }

        var targetIndex;

        if (!targetRow) {
          targetIndex = tabularDndDrag ? this.data.length : this.draggedIndex;
        } else {
          targetIndex = _.findIndex(this.data, function (r) {
            return r === targetRow;
          });
          if (targetIndex === -1) targetIndex = this.draggedIndex;
        }

        this.data.splice(targetIndex, 0, draggedRow || this.draggedRow);
        this.draggedRow = null;
        this.update();
        this.refreshFilter();
        this.fire('row.dragged', this.data);
        this.dirCtrl.vsApi.refresh();
      }
    }, {
      key: "dropDraggedRows",
      value: function dropDraggedRows(targetRow) {
        var _this23 = this;

        var draggedRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var tabularDndDrag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.markedDropTarget) {
          this.markedDropTarget.removeClass('drop-target-mark');
        }

        (draggedRows || this.draggedRows).forEach(function (draggedRow, i) {
          var targetIndex;

          if (!targetRow) {
            targetIndex = tabularDndDrag ? _this23.data.length : draggedRow.index;
          } else {
            targetIndex = _.findIndex(_this23.data, function (r) {
              return r === targetRow;
            });
            if (targetIndex === -1) targetIndex = draggedRow.index;
          }

          _this23.data.splice(targetIndex, 0, draggedRow.row);
        });
        this.draggedRows = null;
        this.update();
        this.refreshFilter();
        this.fire('row.dragged', this.data);
        this.dirCtrl.vsApi.refresh();
      }
    }, {
      key: "markDropTarget",
      value: function markDropTarget(rowElem) {
        if (this.markedDropTarget) {
          this.markedDropTarget.removeClass('drop-target-mark');
        }

        if (rowElem && !rowElem.is('.headers')) {
          rowElem.addClass('drop-target-mark');
          this.markedDropTarget = rowElem;
        }
      }
    }, {
      key: "_registerTabularDnd",
      value: function _registerTabularDnd(tabularDndController, role, otherTableOptions) {
        var emptyTableStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.registeredTabularDnd = {
          dndCtrl: tabularDndController,
          dndRole: role,
          dndOther: otherTableOptions,
          emptyTableStyle: emptyTableStyle
        };
      }
    }, {
      key: "useExternalSortCallback",
      value: function useExternalSortCallback(externalSortCallback) {
        this.externalSortCallback = externalSortCallback;
        return this;
      }
    }, {
      key: "alwaysShowSortingArrows",
      value: function alwaysShowSortingArrows() {
        this.showSortingArrowsAlways = true;
        return this;
      }
    }, {
      key: "disableFilterWhen",
      value: function disableFilterWhen(isFilterDisabledCallback) {
        this.isFilterDisabledCallback = isFilterDisabledCallback;
        return this;
      }
    }, {
      key: "disableRowActionGrouping",
      value: function disableRowActionGrouping() {
        this.isRowActionGroupingDisabled = true;
        return this;
      }
    }]);

    return JFrogTableViewOptionsClass;
  }();

  JFrogTableViewOptionsClass.cellTemplateGenerators = cell_template_generators;

  JFrogTableViewOptionsClass.setAppDefaults = function (defaultsSetter) {
    defaultAppOptions = new JFrogTableViewOptionsClass();
    defaultsSetter(defaultAppOptions);
  };

  return JFrogTableViewOptionsClass;

  function createContextMenu() {
    var _this24 = this;

    window.$.contextMenu({
      selector: '.jf-table-view .jf-table-row:not(.headers)',
      build: function build($trigger, e) {
        var rowCtrl = $($trigger[0]).prop('comp');
        var tableOptions = rowCtrl.tableView.options;
        var row = rowCtrl.data;

        var allActions = _.filter(tableOptions.actions, function (act) {
          return row && (!act.visibleWhen || act.visibleWhen(row));
        });

        var editAction = getEditAction($trigger, row, tableOptions);
        var additionalActions = getAdditionalActions($trigger, row, tableOptions);

        if (!allActions.length && !editAction && additionalActions.length === 0 || !row) {
          return false;
        } else {
          var cmItems = {};

          if (editAction) {
            cmItems['*edit*'] = {
              name: 'Edit',
              icon: 'artifactory-edit'
            };
          }

          var getIconName = function getIconName(classdef) {
            if (classdef === undefined) return '';
            var iconName;
            var classes = classdef.split(' ');
            classes.forEach(function (cls) {
              if (cls.startsWith('icon-')) {
                iconName = cls.substr(5);
              }
            });
            return iconName;
          };

          if (additionalActions) {
            for (var i in additionalActions) {
              var action = additionalActions[i];
              cmItems['@' + action.name] = {
                name: action.name,
                icon: getIconName(action.icon)
              };
            }
          }

          for (var actI in allActions) {
            var act = allActions[actI];
            act.key = act.tooltip.split(' ').join('').toLowerCase();
            cmItems[act.key] = {
              name: act.tooltip,
              icon: getIconName(act.icon)
            };
          }

          injections.$timeout(function () {
            $('.context-menu-item').on('click', function (e) {
              if (tableOptions.actionToDo) {
                $(e.target).trigger('contextmenu:hide');
                injections.$timeout(function () {
                  tableOptions.actionToDo();
                  delete tableOptions.actionToDo;
                }, 100);
              }
            });
          });
          return {
            callback: function callback(key, options) {
              tableOptions.actionToDo = function () {
                if (key === '*edit*') {
                  editAction.do();
                } else if (key.startsWith('@')) {
                  var actionName = key.substr(1);

                  var _action = _.find(additionalActions, {
                    name: actionName
                  });

                  _action.do();
                } else {
                  var _act = _.find(allActions, {
                    key: key
                  });

                  _act.callback(row);

                  if (_act.href) {
                    var url = grid.options.getActionHref(_act, row);

                    if (url) {
                      _this24.JFrogDownload(url);
                    }
                  }
                }
              };

              return false;
            },
            items: cmItems
          };
        }
      }
    });
  }

  function getEditAction($trigger, row, tableOptions) {
    var _this25 = this;

    var objScope = {
      row: {
        entity: row
      },
      grid: tableOptions,
      appScope: tableOptions.appScope
    };
    var editState = $trigger.find('[ui-sref]:not(.no-cm-action):not([cm-additional-action])').length ? $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action):not([cm-additional-action])')[0].attributes['ui-sref'].textContent : null;

    if (editState) {
      var stateAndParams = _getStateAndParamsFromUISrefString(editState, objScope);

      return {
        do: function _do() {
          _this25.$state.go(stateAndParams.state, stateAndParams.stateParams);
        }
      };
    } else {
      var ngClicks = $trigger.find('[ng-click]:not(.no-cm-action):not([cm-additional-action])');
      var clickCommand;

      for (var i in ngClicks) {
        var ngClick = ngClicks[i];

        if (ngClick.attributes && ngClick.attributes['ng-click'] && (ngClick.attributes['ng-click'].textContent.startsWith('grid.appScope.') || ngClick.attributes['ng-click'].textContent.startsWith('appScope.'))) {
          clickCommand = ngClick.attributes['ng-click'].textContent;
          break;
        }
      }

      if (clickCommand) {
        var parenthesesOpenIndex = clickCommand.indexOf('(');
        var funcName = clickCommand.substr(0, parenthesesOpenIndex);
        var paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

        var params = _.map(paramsString.split(','), function (paramString) {
          return _.get(objScope, _.trim(paramString));
        });

        var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));

        var func = _.get(objScope, funcName).bind(funcThis);

        return {
          do: function _do() {
            func.apply(null, params);
          }
        };
      } else return null;
    }
  }

  function getAdditionalActions($trigger, row, tableOptions) {
    var _this26 = this;

    var objScope = {
      row: {
        entity: row
      },
      grid: tableOptions,
      appScope: tableOptions.appScope
    };
    var additionalCommands = [];
    var additionalElems = $trigger.find('[cm-additional-action]');

    for (var i = 0; i < additionalElems.length; i++) {
      var elem = additionalElems[i];
      var clickCommand = elem.attributes['ng-click'] ? elem.attributes['ng-click'].textContent : undefined;
      var srefLink = elem.attributes['ui-sref'] ? elem.attributes['ui-sref'].textContent : undefined;
      var icon = elem.attributes['cm-additional-action-icon'] ? elem.attributes['cm-additional-action-icon'].textContent : undefined;
      var commandName = elem.attributes['cm-additional-action'].textContent;

      if (commandName && clickCommand) {
        (function () {
          var parenthesesOpenIndex = clickCommand.indexOf('(');
          var funcName = clickCommand.substr(0, parenthesesOpenIndex);
          var paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

          var params = _.map(paramsString.split(','), function (paramString) {
            return _.get(objScope, _.trim(paramString));
          });

          var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));

          var func = _.get(objScope, funcName).bind(funcThis);

          additionalCommands.push({
            name: commandName,
            icon: icon,
            do: function _do() {
              func.apply(null, params);
            }
          });
        })();
      } else if (commandName && srefLink) {
        (function () {
          var stateAndParams = _getStateAndParamsFromUISrefString(srefLink, objScope);

          var func = function func() {
            _this26.$state.go(stateAndParams.state, stateAndParams.stateParams);
          };

          additionalCommands.push({
            name: commandName,
            icon: icon,
            do: function _do() {
              func();
            }
          });
        })();
      }
    }

    return additionalCommands;
  }

  function _getStateAndParamsFromUISrefString(uiSrefContent, objScope) {
    var parenthesesOpenIndex = uiSrefContent.indexOf('(');
    var state = uiSrefContent.substr(0, parenthesesOpenIndex !== -1 ? parenthesesOpenIndex : undefined);
    var paramsString = uiSrefContent.substr(parenthesesOpenIndex);
    var openBraceIndex = paramsString.indexOf('{');
    var closeBraceIndex = paramsString.lastIndexOf('}');
    var paramsObj = {};

    if (openBraceIndex !== -1 && closeBraceIndex !== -1) {
      paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);
      var paramsSplit = paramsString.split(',');
      paramsSplit.forEach(function (param) {
        var keyVal = param.split(':');
        var key = keyVal[0].trim();
        var val = keyVal[1].trim();
        if (val.startsWith('row.') || val.startsWith('grid.')) val = _.get(objScope, val);else if (val.startsWith('!row.') || val.startsWith('grid.')) val = !_.get(objScope, val);else if (val.startsWith('\'')) val = val.split('\'').join('');else if (val.startsWith('"')) val = val.split('"').join('');
        paramsObj[key] = val;
      });
    }

    return {
      state: state,
      stateParams: paramsObj
    };
  }
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("a4bb");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./node_modules/deep-diff/index.js
var deep_diff = __webpack_require__("6e8d");

// CONCATENATED MODULE: ./src/services/factories/JFrogUiModelSaverFactory.js











var JFrogUiModelSaverFactory_JFrogUIModelSaver =
/*#__PURE__*/
function () {
  function JFrogUIModelSaver(controller, modelObjects, excludePaths) {
    var _this = this;

    Object(classCallCheck["a" /* default */])(this, JFrogUIModelSaver);

    var injected = $jfrog.get(['$timeout', 'JFrogModal', '$q']);
    this.$timeout = injected.$timeout;
    this.$q = injected.$q;
    this.JFrogModal = injected.JFrogModal;
    this.controller = controller;
    this.controller._$modelSaver$_ = this;
    this.confirmOnLeave = true;
    this.modelObjects = modelObjects;
    this.excludePaths = excludePaths;
    this.savedModels = {};
    this.saved = false;
    this.$timeout(function () {
      if (!_this.saved) {
        _this.save();
      }
    });
  }

  Object(createClass["a" /* default */])(JFrogUIModelSaver, [{
    key: "save",
    value: function save(objectName) {
      var _this2 = this;

      this.modelObjects.forEach(function (objName) {
        if (!objectName || objectName === objName) {
          _this2.savedModels[objName] = lodash_default.a.cloneDeep(_this2.controller[objName]);
        }
      });
      this.saved = true;
    }
  }, {
    key: "isModelSaved",
    value: function isModelSaved() {
      var isSaved = true;

      for (var objectNameI in this.modelObjects) {
        var objectName = this.modelObjects[objectNameI];

        if (!lodash_default.a.isEqual(this.savedModels[objectName], this.controller[objectName])) {
          var deefObj = Object(deep_diff["DeepDiff"])(this.savedModels[objectName], this.controller[objectName]);

          if (this._isDiffReal(deefObj, this.excludePaths[objectNameI])) {
            isSaved = false;
            break;
          }
        }
      }

      return isSaved;
    }
  }, {
    key: "_isDiffReal",
    value: function _isDiffReal(deefObj, excludePaths) {
      var excludes = excludePaths ? excludePaths.split(';') : [];
      var isReal = false;

      for (var key in deefObj) {
        var deef = deefObj[key];

        if (deef.path && deef.path.length && (!lodash_default.a.isString(deef.path[deef.path.length - 1]) || deef.path[deef.path.length - 1].startsWith('$$') || this._isExcluded(deef.path, excludes))) {
          continue;
        }

        if (deef.lhs === undefined && deef.rhs === '' || deef.lhs === '' && deef.rhs === undefined || deef.lhs === undefined && lodash_default.a.isArray(deef.rhs) && deef.rhs.length === 0 || deef.lhs === undefined && lodash_default.a.isObject(deef.rhs) && keys_default()(deef.rhs).length === 0) {// not real
        } else {
          //real
          isReal = true;
          break;
        }
      }

      return isReal;
    }
  }, {
    key: "_isExcluded",
    value: function _isExcluded(path, excludes) {
      if (!excludes.length) {
        return false;
      }

      var excluded = false;

      for (var i in excludes) {
        var exclude = excludes[i];
        var exPath = exclude.split('.');
        var match = true;

        for (var pI in exPath) {
          if (exPath[pI] !== '*' && exPath[pI] !== path[pI] || (exPath[pI] === '*' && path[pI]) === undefined) {
            match = false;
            break;
          }
        }

        if (match) {
          excluded = true;
        }

        break;
      }

      return excluded;
    }
  }, {
    key: "ask",
    value: function ask() {
      var defer = this.$q.defer();

      if (!this.isModelSaved()) {
        JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = true;
        this.JFrogModal.confirm('You have unsaved changes. Leaving this page will discard changes.', 'Discard Changes', {
          confirm: 'Discard'
        }).then(function () {
          defer.resolve();
        }).catch(function (e) {
          defer.reject();
        }).finally(function () {
          JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;
        });
      } else {
        defer.resolve();
      }

      return defer.promise;
    }
  }]);

  return JFrogUIModelSaver;
}();
/*
Utility method which returns the closest vue instance

References:
https://github.com/vuejs/vue/issues/5621
https://forum.vuejs.org/t/dom-element-to-vue-component/7617/2
https://jsfiddle.net/Linusborg/50wL7mdz/19156/
*/


function findVueComponent(node) {
  if (node.__vue__) {
    return node.__vue__;
  } else {
    return findVueComponent(node.parentNode);
  }
}

function JFrogUIModelSaverFactory() {
  return {
    get confirmDiscardModalOpen() {
      return JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen;
    },

    createInstance: function createInstance(controller, modelObjects, excludePaths) {
      excludePaths = excludePaths || [];
      return new JFrogUiModelSaverFactory_JFrogUIModelSaver(controller, modelObjects, excludePaths);
    },
    checkDiscardConfirmation: function checkDiscardConfirmation($q, e) {
      var defer = $q.defer();
      var forms = $('form');
      var changeDiscovered = false;

      var _loop = function _loop(i) {
        var form = forms[i];
        var controller = findVueComponent(form);

        if (controller && controller._$modelSaver$_ && controller._$modelSaver$_.confirmOnLeave && !controller._$modelSaver$_.isModelSaved()) {
          changeDiscovered = true;

          controller._$modelSaver$_.ask().then(function () {
            controller._$modelSaver$_.confirmOnLeave = false;
            defer.resolve();
          }).catch(function (e) {
            defer.reject();
          });

          return "break";
        }
      };

      for (var i = 0; i < forms.length; i++) {
        var _ret = _loop(i);

        if (_ret === "break") break;
      }

      if (!changeDiscovered && !e) {
        defer.resolve();
      } else if (changeDiscovered && e) {
        e.preventDefault();
      }

      return defer.promise;
    }
  };
}
JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;
// CONCATENATED MODULE: ./src/services/factories/JFrogUiWebWorkerFactory.js




function JFrogUiWebWorkerFactory_JFrogUIWebWorker() {
  var injections = $jfrog.get(['$q', 'JFrogUILibConfig', 'WebWorkersPool']);
  'ngInject';
  return (
    /*#__PURE__*/
    function () {
      function JFrogUIWebWorker() {
        Object(classCallCheck["a" /* default */])(this, JFrogUIWebWorker);

        _.extend(this, injections);

        this.wwPool = new this.WebWorkersPool(this.getPathToWebWorker(), 1);
      }

      Object(createClass["a" /* default */])(JFrogUIWebWorker, [{
        key: "getPathToWebWorker",
        value: function getPathToWebWorker() {
          return (this.JFrogUILibConfig.config.webworkersPath || '') + '/jfrog-ui-essentials.webworker.js';
        }
      }, {
        key: "check",
        value: function check() {
          var _this = this;

          var defer = this.$q.defer();

          if (this.checking) {
            if (!this.pendingCheckDefers) this.pendingCheckDefers = [];
            this.pendingCheckDefers.push(defer);
          } else {
            this.wwPool.open();
            this.checking = true;
            this.wwPool.send({
              cmd: 'testWorker'
            }).then(function (response) {
              _this.checking = false;

              if (response === 'OK') {
                defer.resolve();

                if (_this.pendingCheckDefers) {
                  _this.pendingCheckDefers.forEach(function (d) {
                    return d.resolve();
                  });

                  delete _this.pendingCheckDefers;
                }
              } else {
                defer.reject();

                if (_this.pendingCheckDefers) {
                  _this.pendingCheckDefers.forEach(function (d) {
                    return d.reject();
                  });

                  delete _this.pendingCheckDefers;
                }
              }

              _this.wwPool.close();
            }).catch(function (e) {
              _this.checking = false;
              defer.reject();

              if (_this.pendingCheckDefers) {
                _this.pendingCheckDefers.forEach(function (d) {
                  return d.reject();
                });

                delete _this.pendingCheckDefers;
              }

              _this.wwPool.close();
            });
          }

          return defer.promise;
        }
      }, {
        key: "open",
        value: function open(poolSize) {
          this.wwPool.open(poolSize);
        }
      }, {
        key: "close",
        value: function close() {
          this.wwPool.close();
        }
      }, {
        key: "markupPreview",
        value: function markupPreview(type, markup) {
          var instanceId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (!this.wwPool.isOpened()) this.open();
          var defer = this.$q.defer();
          this.wwPool.kill({
            cmd: 'convertMarkup',
            instanceId: instanceId
          });
          this.wwPool.send({
            cmd: 'convertMarkup',
            instanceId: instanceId,
            type: type,
            markup: markup
          }).then(function (response) {
            if (response.html !== undefined) {
              defer.resolve(response.html);
            } else defer.reject();
          }).catch(function (e) {
            defer.reject();
          });
          return defer.promise;
        }
      }, {
        key: "runFunction",
        value: function runFunction(func) {
          if (!this.wwPool.isOpened()) this.open();
          var defer = this.$q.defer();

          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          this.wwPool.send({
            cmd: 'runFunction',
            function: func.toString(),
            params: params
          }).then(function (response) {
            defer.resolve(response.response);
          }).catch(function (e) {
            defer.reject();
          });
          return defer.promise;
        }
      }]);

      return JFrogUIWebWorker;
    }()
  );
}
// CONCATENATED MODULE: ./src/services/factories/RecursiveDirectiveFactory.js
function RecursiveDirectiveFactory_recursiveDirective() {
  var _this = this,
      _arguments = arguments;

  this.$inject('$compile');
  'ngInject';
  return {
    compile: function compile(elem, link) {
      link = _.isFunction(link) ? {
        post: link
      } : link;
      var origContents = elem.contents().remove();
      var compileFunction;
      return {
        pre: link && link.pre ? link.pre : null,
        post: function post(scope, elem) {
          compileFunction = !compileFunction ? _this.$compile(origContents) : compileFunction;
          compileFunction(scope, function (clone) {
            return elem.append(clone);
          });
          if (link && link.post) link.post.apply(null, _arguments);
        }
      };
    }
  };
}
// CONCATENATED MODULE: ./src/services/factories/WebWorkersPoolFactory.js



function WebWorkersPoolFactory_WebWorkersPool() {
  var injections = $jfrog.get(['$q']);
  'ngInject';
  return (
    /*#__PURE__*/
    function () {
      function WebWorkersPool(webworkerPath) {
        var poolSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        Object(classCallCheck["a" /* default */])(this, WebWorkersPool);

        _.extend(this, injections);

        this.webworkerPath = webworkerPath;
        this.poolSize = poolSize; //           this.debug();
      }

      Object(createClass["a" /* default */])(WebWorkersPool, [{
        key: "debug",
        value: function debug() {
          var _this = this;

          this.debugEnabled = true;
          setInterval(function () {
            if (!_this.pool) return;
            var size = _this.pool.length;

            var free = _.filter(_this.pool, {
              busy: false
            }).length;

            console.log("Pool size: ".concat(size, "   |   Free workers: ").concat(free));
          }, 200);
        }
      }, {
        key: "open",
        value: function open(poolSize) {
          poolSize = poolSize || this.poolSize;
          this.pool = [];

          for (var i = 0; i < poolSize; i++) {
            this.addWorker();
          }
        }
      }, {
        key: "isOpened",
        value: function isOpened() {
          return !!this.pool;
        }
      }, {
        key: "close",
        value: function close() {
          if (!this.pool) return;
          this.pool.forEach(function (spot) {
            spot.worker.terminate();
          });
          this.pool = null;
        }
      }, {
        key: "kill",
        value: function kill() {
          var _this2 = this;

          var msgMatch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var busySpots = _.filter(this.pool, {
            busy: true
          });

          var matchedSpots = _.filter(busySpots, _.isEmpty(msgMatch) ? {} : {
            msg: msgMatch
          });

          matchedSpots.forEach(function (spot) {
            if (_this2.debugEnabled) console.log('Terminating worker: #' + _this2.pool.indexOf(spot));
            spot.worker.terminate();
            spot.worker = new Worker(_this2.webworkerPath);
            spot.busy = false;
            spot.msg = null;
          });
          this.normalizePool();
        }
      }, {
        key: "normalizePool",
        value: function normalizePool() {
          while (this.pool.length > this.poolSize) {
            var freeSpot = _.find(this.pool, {
              busy: false
            });

            if (freeSpot) this.pool.splice(this.pool.indexOf(freeSpot), 1);else break;
          }
        }
      }, {
        key: "addWorker",
        value: function addWorker() {
          var worker = new Worker(this.webworkerPath);
          var poolSpot = {
            worker: worker,
            msg: null,
            busy: false
          };
          this.pool.push(poolSpot);
          return poolSpot;
        }
      }, {
        key: "send",
        value: function send(msg) {
          var _this3 = this;

          if (!this.pool) {
            console.error('WebWorkersPool: Must call open() before sending.');
            return;
          }

          var defer = this.$q.defer();

          var freeSpot = _.find(this.pool, {
            busy: false
          });

          if (!freeSpot) {
            freeSpot = this.addWorker();
          }

          freeSpot.worker.onmessage = function (e) {
            defer.resolve(e.data);
            freeSpot.busy = false;

            _this3.normalizePool();
          };

          freeSpot.worker.onerror = function (e) {
            defer.reject(e);
            freeSpot.busy = false;

            _this3.normalizePool();
          };

          freeSpot.busy = true;
          freeSpot.msg = msg;
          freeSpot.worker.postMessage(msg);
          return defer.promise;
        }
      }]);

      return WebWorkersPool;
    }()
  );
}
// CONCATENATED MODULE: ./src/services/factories/JFrogIFrameDownloadFactory.js

function JFrogIFrameDownload() {
  this.$inject('JFrogNotifications', '$timeout');
  'ngInject';
  return function (url, defaultErrorMessage) {
    var _this = this;

    var iframe = $('<iframe style="display: none">');
    iframe.on('load', function (event) {
      var responseObjStr, response, defaultMessage;

      try {
        responseObjStr = $(event.target).contents().find('pre').text();
      } catch (e) {
        //workaround for ie .contents() ACCESS DENIED error
        defaultMessage = defaultErrorMessage || 'Something went wrong.';
      }

      if (responseObjStr) {
        try {
          response = JSON.parse(JSON.parse(responseObjStr).errors[0].message).error;
        } catch (e) {}
      }

      if (defaultMessage || response) {
        var message = defaultMessage || response;

        _this.$timeout(function () {
          _this.JFrogNotifications.create({
            error: message
          });

          if (iframe.parent().length) iframe.remove();
        });
      }
    });
    iframe.ready(function () {
      _this.$timeout(function () {
        if (iframe.parent().length) iframe.remove();
      }, 15000);
    });
    iframe.attr('src', url).appendTo('body');
  };
}
// CONCATENATED MODULE: ./src/services/factories/JFrogDownloadFactory.js
function JFrogDownload() {
  return function (url) {
    document.location = url;
  };
}
// CONCATENATED MODULE: ./src/services/JFrogUploaderFactoryService.js



/**
 * Created by idannaim on 8/4/15.
 */
var JFrogUploaderFactoryService_controller;
var JFrogUploaderFactoryService_JFrogUploaderFactory =
/*#__PURE__*/
function () {
  function JFrogUploaderFactory() {
    Object(classCallCheck["a" /* default */])(this, JFrogUploaderFactory);

    this.$inject('FileUploader');
    this.fileUploader = this.FileUploader;
  }

  Object(createClass["a" /* default */])(JFrogUploaderFactory, [{
    key: "getUploaderInstance",
    value: function getUploaderInstance(controller) {
      return new JFrogUploader(this.fileUploader, controller);
    }
  }]);

  return JFrogUploaderFactory;
}();
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("7618");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfConfirmModalComponent/index.vue?vue&type=template&id=30619948&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',_vm._b({on:{"hide":_vm._handleHide,"hidden":_vm._afterModalHidden}},'b-modal',_vm.modalProps,false),[_c('template',{slot:"modal-title"},[_c('div',{attrs:{"id":"popup-header"},domProps:{"innerHTML":_vm._s(_vm.title)}})]),_c('template',{slot:"modal-footer"},[(_vm.checkboxLabel)?_c('jf-checkbox',{staticClass:"pull-left",attrs:{"text":_vm.checkboxLabel}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checkbox.checked),expression:"checkbox.checked"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.checkbox.checked)?_vm._i(_vm.checkbox.checked,null)>-1:(_vm.checkbox.checked)},on:{"change":[function($event){var $$a=_vm.checkbox.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.checkbox, "checked", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.checkbox, "checked", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.checkbox, "checked", $$c)}},function($event){return _vm.onCheckboxStateChange(_vm.checkbox.checked)}]}})]):_vm._e(),_c('button',{staticClass:"btn btn-default",attrs:{"id":"popup-cancel"},on:{"click":function($event){return _vm.$dismiss()}}},[_vm._v(_vm._s(_vm.int_buttons.cancel))]),_c('button',{staticClass:"btn btn-primary",attrs:{"id":"popup-confirm"},on:{"click":function($event){return _vm.$close(true)}}},[_vm._v(_vm._s(_vm.int_buttons.confirm))])],1),_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfConfirmModalComponent/index.vue?vue&type=template&id=30619948&

// EXTERNAL MODULE: ./node_modules/q/q.js
var q = __webpack_require__("4be7");
var q_default = /*#__PURE__*/__webpack_require__.n(q);

// CONCATENATED MODULE: ./src/mixins/ModalMixins/index.js


var _methods;



var removeClassIfNecessary = function removeClassIfNecessary(selector, className) {
  var element = $(selector);

  if (element.hasClass(className)) {
    element.removeClass(className);
  }
};

var hack = function hack() {
  Vue.nextTick().then(function () {
    removeClassIfNecessary('#jfModal___BV_modal_outer_', "show");
    removeClassIfNecessary('#jfModal', "show");
    $('#jfModal___BV_modal_outer_').parent().remove(); //Remove any existing modal divs
  });
};

var whenElementIsVisible = function whenElementIsVisible(selector, callBack) {
  var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if ($(selector)[0]) {
    callBack();
  } else if (count < 180) {
    setTimeout(function () {
      whenElementIsVisible(selector, callBack, ++count);
    }, 1000);
  }
};

var addClassIfNecessary = function addClassIfNecessary(selector, className) {
  var element = $(selector);

  if (!element.hasClass(className)) {
    element.addClass(className);
  }
};
/* This hack causes the modal to become visible immediately.
The issue can be observed if you comment out the next few lines of code
and then try to load the show-all modal from the jf-table-view demo page
(cell template example)
*/


var forceModalVisibility = function forceModalVisibility() {
  Vue.nextTick().then(function () {
    whenElementIsVisible("#jfModal", function () {
      addClassIfNecessary("#jfModal___BV_modal_backdrop_", "show");
      addClassIfNecessary("#jfModal", "show");
    });
  });
};

/* harmony default export */ var ModalMixins = ({
  'jf@inject': ['$q'],
  props: ['uiEssNoCloseOnEsc', 'uiEssNoCloseOnBackdrop', 'uiEssModalPromise', 'uiEssSize', 'dontRejectOnClose', 'uiEssModalClass'],
  data: function data() {
    return {
      modalProps: {
        ref: 'jfModal',
        id: 'jfModal',
        centered: true,
        'modal-class': this.uiEssModalClass || '',
        'no-close-on-esc': this.uiEssNoCloseOnEsc || false,
        'no-close-on-backdrop': this.uiEssNoCloseOnBackdrop || false,
        size: this.uiEssSize == 'lg' || this.uiEssSize == 'sm' ? this.uiEssSize : ''
      },
      modalPromise: this.uiEssModalPromise || q_default.a.defer()
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (typeof _this._size == 'number') {
        $('.modal-dialog').css('max-width', _this._size);
      }
    });
  },
  methods: (_methods = {
    show: function show(selector) {
      $('#jfModal___BV_modal_outer_').parent().remove(); //Remove any existing modal divs

      $(this.$mount().$el).appendTo(selector);
      this.$refs.jfModal.show();
      forceModalVisibility(); //hack
    },
    close: function close() {
      //Added for backward compatibility
      this.$close(true);
    },
    $ok: function $ok() {
      //Added for backward compatibility
      this.$close(true);
    },
    $close: function $close(succeeded) {
      if (!succeeded) {
        this.$dismiss();
      } else {
        this.modalPromise.resolve();
        this.$refs.jfModal.hide();
      }
    },
    dismiss: function dismiss() {
      //Added for backward compatibility
      this.$dismiss();
    },
    _afterModalHidden: function _afterModalHidden() {
      hack();
    },
    $dismiss: function $dismiss() {
      if (!this.dontRejectOnClose && this.$props.uiEssModalPromise) {
        this.promiseIsPending = false;
        this.$props.uiEssModalPromise.reject();
      }
    },
    handlePromise: function handlePromise() {
      if (this.modalPromise.promise.isPending()) {
        if (!this.dontRejectOnClose) {
          this.modalPromise.reject();
        } else {
          this.modalPromise.resolve();
        }
      }
    }
  }, Object(defineProperty["a" /* default */])(_methods, "$dismiss", function $dismiss() {
    this.handlePromise();
    this.$refs.jfModal.hide();
  }), Object(defineProperty["a" /* default */])(_methods, "_handleHide", function _handleHide() {
    this.handlePromise();
    setTimeout(hack, 10);
  }), _methods)
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfConfirmModalComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfConfirmModalComponentvue_type_script_lang_js_ = ({
  name: 'jf-modal',
  props: ["title", "buttons", "content", "checkbox", "checkboxLabel", "checkBoxChangeListener"],
  methods: {
    onCheckboxStateChange: function onCheckboxStateChange(state) {
      if (typeof this.checkBoxChangeListener == "function") {
        this.checkBoxChangeListener(state);
      }
    }
  },
  mixins: [ModalMixins],
  data: function data() {
    var int_buttons = this.buttons || {};
    int_buttons.cancel = int_buttons.cancel || "Cancel";
    int_buttons.confirm = int_buttons.confirm || "Confirm";
    return {
      int_buttons: int_buttons
    };
  }
});
// CONCATENATED MODULE: ./src/components/JfConfirmModalComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfConfirmModalComponentvue_type_script_lang_js_ = (JfConfirmModalComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfConfirmModalComponent/index.vue?vue&type=style&index=0&lang=less&
var JfConfirmModalComponentvue_type_style_index_0_lang_less_ = __webpack_require__("099d");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfConfirmModalComponent/index.vue






/* normalize component */

var JfConfirmModalComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfConfirmModalComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfConfirmModalComponent = (JfConfirmModalComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCodeModalComponent/index.vue?vue&type=template&id=39acf9be&
var JfCodeModalComponentvue_type_template_id_39acf9be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',_vm._b({attrs:{"ok-only":_vm.okOnly,"ok-title":"Close","ok-variant":"secondary"},on:{"ok":_vm.$ok,"hide":_vm._handleHide,"hidden":_vm._afterModalHidden}},'b-modal',_vm.modalProps,false),[_c('template',{slot:"modal-title"},[_c('div',{attrs:{"id":"popup-header"},domProps:{"innerHTML":_vm._s(_vm.title)}})]),(_vm.beforeMessage)?_c('p',{domProps:{"innerHTML":_vm._s(_vm.beforeMessage)}}):_vm._e(),_c('div',{staticClass:"codemirror-wrapper"},[_c('jf-clip-copy',{staticClass:"code-mirror-copy",attrs:{"text-to-copy":_vm.content || '',"show-copy-text":"true","object-name":_vm.objectName || 'Content'}}),_c('jf-code-mirror',{attrs:{"mode":_vm.int_mode.name || ''},model:{value:(_vm.content),callback:function ($$v) {_vm.content=$$v},expression:"content"}})],1)],2)}
var JfCodeModalComponentvue_type_template_id_39acf9be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfCodeModalComponent/index.vue?vue&type=template&id=39acf9be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCodeModalComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfCodeModalComponentvue_type_script_lang_js_ = ({
  name: 'jf-modal',
  props: ["title", "content", "objectName", "mode", "beforeMessage"],
  mixins: [ModalMixins],
  data: function data() {
    return {
      okOnly: true,
      int_mode: this.mode || {
        name: ""
      }
    };
  }
});
// CONCATENATED MODULE: ./src/components/JfCodeModalComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfCodeModalComponentvue_type_script_lang_js_ = (JfCodeModalComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfCodeModalComponent/index.vue?vue&type=style&index=0&lang=less&
var JfCodeModalComponentvue_type_style_index_0_lang_less_ = __webpack_require__("23cd");

// CONCATENATED MODULE: ./src/components/JfCodeModalComponent/index.vue






/* normalize component */

var JfCodeModalComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfCodeModalComponentvue_type_script_lang_js_,
  JfCodeModalComponentvue_type_template_id_39acf9be_render,
  JfCodeModalComponentvue_type_template_id_39acf9be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfCodeModalComponent = (JfCodeModalComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFullTextModalComponent/index.vue?vue&type=template&id=4595d1a9&
var JfFullTextModalComponentvue_type_template_id_4595d1a9_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',{ref:"jfModal",attrs:{"id":"jfModal","ok-only":_vm.okOnly,"ok-title":"Close","ok-variant":"secondary"},on:{"ok":_vm.$ok,"hide":_vm._handleHide,"hidden":_vm._afterModalHidden}},[_c('template',{slot:"modal-title"},[_c('div',{attrs:{"id":"popup-header"}},[_vm._v(_vm._s(_vm.title))])]),(_vm.text)?_c('div',{staticClass:"modal-body simple-text"},[_c('p',{staticClass:"full-text-item",domProps:{"innerHTML":_vm._s(_vm.text)}})]):_vm._e(),(_vm.list)?_c('div',{staticClass:"modal-body text-to-list"},_vm._l((_vm.list),function(item,index){return _c('p',{key:index,staticClass:"full-text-item",domProps:{"innerHTML":_vm._s(item)},on:{"click":function($event){return _vm.onItemClick(item)}}})}),0):_vm._e()],2)}
var JfFullTextModalComponentvue_type_template_id_4595d1a9_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfFullTextModalComponent/index.vue?vue&type=template&id=4595d1a9&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFullTextModalComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfFullTextModalComponentvue_type_script_lang_js_ = ({
  name: 'jf-fulltext-modal',
  props: ["title", "text", "list", "listItemClickCB"],
  mixins: [ModalMixins],
  data: function data() {
    return {
      okOnly: true
    };
  },
  methods: {
    onItemClick: function onItemClick(item) {
      this.$refs.jfModal.hide();

      if (typeof this.listItemClickCB == "function") {
        this.listItemClickCB(item);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfFullTextModalComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfFullTextModalComponentvue_type_script_lang_js_ = (JfFullTextModalComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfFullTextModalComponent/index.vue?vue&type=style&index=0&lang=less&
var JfFullTextModalComponentvue_type_style_index_0_lang_less_ = __webpack_require__("26a0");

// CONCATENATED MODULE: ./src/components/JfFullTextModalComponent/index.vue






/* normalize component */

var JfFullTextModalComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfFullTextModalComponentvue_type_script_lang_js_,
  JfFullTextModalComponentvue_type_template_id_4595d1a9_render,
  JfFullTextModalComponentvue_type_template_id_4595d1a9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfFullTextModalComponent = (JfFullTextModalComponent_component.exports);
// CONCATENATED MODULE: ./src/components/JfDynamicModalComponent/index.js

/* harmony default export */ var JfDynamicModalComponent = (function () {
  return {
    mixins: [ModalMixins],
    props: [],
    methods: {}
  };
});
;
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardModalComponent/index.vue?vue&type=template&id=605c6978&
var JfWizardModalComponentvue_type_template_id_605c6978_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',_vm._b({attrs:{"modal-class":_vm.classForStep},on:{"hidden":_vm._afterModalHidden,"hide":_vm._handleHide}},'b-modal',_vm.modalProps,false),[_c('template',{slot:"modal-header"},[(_vm.wizardDefinitionObject.cancelable)?_c('span',{staticClass:"icon icon-clear",on:{"click":function($event){return _vm.dismiss()}}}):_vm._e(),_c('div',{staticClass:"title-wrapper icon-hidden",class:{'no-border' : _vm.wizardDefinitionObject.steps[_vm.currentStep-1].hideTitleBorder}},[(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].icon)?_c('div',{staticClass:"icon",class:{'build-animation' : _vm.wizardDefinitionObject.steps[_vm.currentStep-1].buildIcon}},[_c('img',{attrs:{"srcset":_vm.wizardDefinitionObject.steps[_vm.currentStep-1].iconSrcset,"src":_vm.wizardDefinitionObject.steps[_vm.currentStep-1].icon,"alt":""}}),(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].buildIcon)?_c('img',{staticClass:"build",attrs:{"srcset":_vm.wizardDefinitionObject.steps[_vm.currentStep-1].buildIconSrcset,"ng-src":"wizardDefinitionObject.steps[currentStep-1].buildIcon","alt":""}}):_vm._e()]):_vm._e(),_c('div',{staticClass:"title"},[(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].name)?_c('h1',[_vm._v(_vm._s(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].name))]):_vm._e(),(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].description)?_c('div',{staticClass:"description",domProps:{"innerHTML":_vm._s(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].description)}}):_vm._e()])])]),_c('div',{ref:"currentPage",staticClass:"modal-body clearfix "}),_c('template',{slot:"modal-footer"},[_c('div',{attrs:{"jf-disable-ng-animate":""}},[(_vm.doNotShowWizardAgain)?_c('div',{staticClass:"pull-left"},[_c('jf-checkbox',{attrs:{"text":_vm.doNotShowWizardAgain.label}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.doNotShowWizardAgain.model),expression:"doNotShowWizardAgain.model"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.doNotShowWizardAgain.model)?_vm._i(_vm.doNotShowWizardAgain.model,null)>-1:(_vm.doNotShowWizardAgain.model)},on:{"change":[function($event){var $$a=_vm.doNotShowWizardAgain.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.doNotShowWizardAgain, "model", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.doNotShowWizardAgain, "model", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.doNotShowWizardAgain, "model", $$c)}},function($event){return _vm.preventShowingWizardAgain()}]}})])],1):_vm._e(),_c('div',{staticClass:"progress-indicator"},_vm._l((_vm.wizardDefinitionObject.steps),function(led,index){return _c('div',{key:index,staticClass:"progress-indicator-led",class:{current: _vm.$index === _vm.currentStep-1}})}),0),_c('div',{staticClass:"modal-footer-buttons-container"},[(!_vm.wizardDefinitionObject.steps[_vm.currentStep-1].customButtons)?_c('div',[(_vm.currentStep > 1 && _vm.wizardDefinitionObject.steps[_vm.currentStep-2].supportReturnTo !== false)?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending,"id":"wizard-popup-prev"},on:{"click":function($event){return _vm.prevStep()}}},[_vm._v("Back")]):_vm._e(),(_vm.currentStep < _vm.totalSteps && _vm.wizardDefinitionObject.steps[_vm.currentStep-1].skippable)?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending,"jf-clear-errors":"","id":"wizard-popup-skip"},on:{"click":function($event){return _vm.nextStep(true)}}},[_vm._v("Skip")]):_vm._e(),(_vm.currentStep < _vm.totalSteps)?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending || !_vm.wizardHooks.isStepCompleted(_vm.wizardDefinitionObject.steps[_vm.currentStep-1]),"id":"wizard-popup-next"},on:{"click":function($event){return _vm.nextStep()}}},[_vm._v("Next")]):_vm._e(),(_vm.currentStep === _vm.totalSteps)?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending || (!_vm.wizardHooks.isStepCompleted(_vm.wizardDefinitionObject.steps[_vm.currentStep-1]) && !_vm.wizardDefinitionObject.steps[_vm.currentStep-1].skippable),"id":"wizard-popup-finish"},on:{"click":function($event){return _vm.finish()}}},[_vm._v("Finish")]):_vm._e()]):_vm._e(),(_vm.wizardDefinitionObject.steps[_vm.currentStep-1].customButtons)?_c('div',_vm._l((_vm.wizardDefinitionObject.steps[_vm.currentStep-1].customButtons),function(button,index){return _c('span',{key:index},[(button.action==='back' && (_vm.currentStep > 1 && _vm.wizardDefinitionObject.steps[_vm.currentStep-2].supportReturnTo !== false))?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending,"id":"wizard-popup-prev-custom"},on:{"click":function($event){return _vm.prevStep()}}},[_vm._v(_vm._s(button.label))]):_vm._e(),(button.action==='skip' && (_vm.currentStep < _vm.totalSteps && _vm.wizardDefinitionObject.steps[_vm.currentStep-1].skippable))?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending,"jf-clear-errors":"","id":"wizard-popup-skip-custom"},on:{"click":function($event){return _vm.nextStep(true)}}},[_vm._v(_vm._s(button.label))]):_vm._e(),(button.action==='next' && (_vm.currentStep < _vm.totalSteps))?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending || !_vm.wizardHooks.isStepCompleted(_vm.wizardDefinitionObject.steps[_vm.currentStep-1]),"id":"wizard-popup-next-custom"},on:{"click":function($event){return _vm.nextStep()}}},[_vm._v(_vm._s(button.label))]):_vm._e(),(button.action==='finish' && (_vm.currentStep === _vm.totalSteps))?_c('button',{staticClass:"btn",attrs:{"disabled":_vm.pending || (!_vm.wizardHooks.isStepCompleted(_vm.wizardDefinitionObject.steps[_vm.currentStep-1]) && !_vm.wizardDefinitionObject.steps[_vm.currentStep-1].skippable),"id":"wizard-popup-finish-custom"},on:{"click":function($event){return _vm.finish()}}},[_vm._v(_vm._s(button.label))]):_vm._e(),(_vm.isFunction(button.action))?_c('button',{staticClass:"btn",attrs:{"disabled":button.isDisabled && button.isDisabled(),"id":"wizard-popup-custom-button"},on:{"click":function($event){return button.action()}}},[_vm._v(_vm._s(button.label))]):_vm._e()])}),0):_vm._e()])])])],2)}
var JfWizardModalComponentvue_type_template_id_605c6978_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfWizardModalComponent/index.vue?vue&type=template&id=605c6978&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardModalComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfWizardModalComponentvue_type_script_lang_js_ = ({
  name: 'jf-wizard-modal',
  mixins: [ModalMixins],
  "jf@inject": ['JFrogUILibConfig', 'JFrogNotifications'],
  props: ['wizardDefinitionObject', 'wizardHooks', 'JFrogModal'],
  data: function data() {
    return {
      currentStep: !this.wizardDefinitionObject.initialStep ? 1 : _.findIndex(wizardDefinitionObject.steps, {
        id: this.wizardDefinitionObject.initialStep
      }) + 1,
      totalSteps: this.wizardDefinitionObject.steps.length,
      doNotShowWizardAgain: this.wizardDefinitionObject.doNotShowWizardAgain,
      pending: false
    };
  },
  mounted: function mounted() {
    this.getContentForPage();
  },
  watch: {
    currentStep: function currentStep() {
      this.getContentForPage();
    },
    wizardHooks: function wizardHooks() {
      this.$forceUpdate();
    }
  },
  computed: {
    classForStep: function classForStep() {
      return "wizard-modal ".concat(this.wizardDefinitionObject.steps[this.currentStep - 1].class || "");
    }
  },
  methods: {
    getContentForPage: function getContentForPage() {
      this.titleInit();
      var currentPageContainer = this.$refs.currentPage;
      var currentPage = currentPageContainer.firstChild;

      if (currentPage) {
        currentPageContainer.removeChild(currentPage);
      }

      var currentStep = this.wizardDefinitionObject.steps[this.currentStep - 1];
      var modifiers = Object(esm_typeof["a" /* default */])(currentStep.template) == 'object' ? currentStep.template : this.JFrogUILibConfig.getConfig().customModalTemplates[currentStep.template];
      var ComponentClass = Vue.extend({
        name: "wizard-page",
        template: modifiers.template,
        mixins: [modifiers],
        props: ["WizCtrl"]
      });
      var component = new ComponentClass({
        propsData: {
          WizCtrl: this.wizardHooks
        }
      }); // $(this.$el).find('.modal-body').empty().append(component.$mount().$el);

      component.$mount();
      currentPageContainer.appendChild(component.$el);
    },
    cancel: function cancel() {
      if (this.wizardHooks.onCancel) this.wizardHooks.onCancel();
      this.dismiss();
    },
    titleInit: function titleInit() {
      if (this.wizardHooks.onWizardShow) this.wizardHooks.onWizardShow(this.wizardDefinitionObject.steps[this.currentStep - 1]);
    },
    nextStep: function nextStep(skip) {
      var _this = this;

      if (this.wizardHooks.onStepChange) {
        var response = this.wizardHooks.onStepChange(this.wizardDefinitionObject.steps[this.currentStep], this.wizardDefinitionObject.steps[this.currentStep - 1], skip ? 'skip' : 'next');

        if (response && response.then) {
          this.pending = true;
          response.then(function (pRes) {
            if (pRes !== false) _this.currentStep++;
            if (_this.wizardHooks.afterStepChange) _this.wizardHooks.afterStepChange(_this.wizardDefinitionObject.steps[_this.currentStep - 1], _this.wizardDefinitionObject.steps[_this.currentStep - 2], skip ? 'skip' : 'next');
            _this.pending = false;
          }).catch(function () {
            _this.pending = false;
          });
        } else if (response !== false) {
          this.currentStep++;
          if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep - 2], skip ? 'skip' : 'next');
        }
      } else {
        this.currentStep++;
      }

      this.JFrogModal._calculateMaxHeight(true);
    },
    prevStep: function prevStep() {
      var _this2 = this;

      if (this.wizardHooks.onStepChange) {
        var response = this.wizardHooks.onStepChange(this.wizardDefinitionObject.steps[this.currentStep - 2], this.wizardDefinitionObject.steps[this.currentStep - 1], 'prev');

        if (response && response.then) {
          this.pending = true;
          response.then(function (pRes) {
            if (pRes !== false) _this2.currentStep--;
            if (_this2.wizardHooks.afterStepChange) _this2.wizardHooks.afterStepChange(_this2.wizardDefinitionObject.steps[_this2.currentStep - 1], _this2.wizardDefinitionObject.steps[_this2.currentStep], 'prev');
            _this2.pending = false;
          }).catch(function () {
            _this2.pending = false;
          });
        } else if (response !== false) {
          this.currentStep--;
          if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep], 'prev');
        }
      } else {
        this.currentStep--;
      }

      this.JFrogModal._calculateMaxHeight(true);
    },
    finish: function finish() {
      if (this.wizardHooks.onComplete) this.wizardHooks.onComplete();
      this.$close(true);
    },
    isFunction: function isFunction(val) {
      return _.isFunction(val);
    },
    preventShowingWizardAgain: function preventShowingWizardAgain() {
      if (this.doNotShowWizardAgain && this.doNotShowWizardAgain.globalFlagName) {
        localStorage[this.doNotShowWizardAgain.globalFlagName] = true;
        this.finish();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfWizardModalComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWizardModalComponentvue_type_script_lang_js_ = (JfWizardModalComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfWizardModalComponent/index.vue





/* normalize component */

var JfWizardModalComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfWizardModalComponentvue_type_script_lang_js_,
  JfWizardModalComponentvue_type_template_id_605c6978_render,
  JfWizardModalComponentvue_type_template_id_605c6978_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfWizardModalComponent = (JfWizardModalComponent_component.exports);
// CONCATENATED MODULE: ./src/services/JFrogModalFactory.js






/* This class's purpose is only to make the JFrogModalService more testable. In tests, this class will be mocked */






var JFrogModalFactory_JFrogModalFactory =
/*#__PURE__*/
function () {
  function JFrogModalFactory() {
    Object(classCallCheck["a" /* default */])(this, JFrogModalFactory);
  }

  Object(createClass["a" /* default */])(JFrogModalFactory, [{
    key: "getModal",
    value: function getModal(modalObj, scope, JFrogUILibConfig) {
      var ModalComponent;

      switch (modalObj.template) {
        case '@confirm_modal':
          ModalComponent = JfConfirmModalComponent;
          break;

        case '@code_modal':
          ModalComponent = JfCodeModalComponent;
          break;

        case '@full.text.modal':
          ModalComponent = JfFullTextModalComponent;
          break;

        case '@wizard_modal':
          ModalComponent = JfWizardModalComponent;
          break;

        default:
          // Have intentionally not used this as a mixin because we are modifying the template
          ModalComponent = new JfDynamicModalComponent(); //Get the custom Modal's details

          var modifiers = Object(esm_typeof["a" /* default */])(modalObj.template) == 'object' ? modalObj.template : JFrogUILibConfig.getConfig().customModalTemplates[modalObj.template]; //Embed the dynamic content into a modal

          ModalComponent.template = "<b-modal v-bind=\"modalProps\" @hide=\"_handleHide\" @hidden=\"_afterModalHidden\">".concat(modifiers.template, "</b-modal>"); //Add any properties specified in the dynamic modal to this component definition

          ModalComponent.mixins.push(modifiers);

          if (scope) {
            _.extend(modalObj, scope);
            /* Specifically for backward compatibility. If any fields are passed, add them as props */


            ModalComponent.props = [].concat(Object(toConsumableArray["a" /* default */])(ModalComponent.props), Object(toConsumableArray["a" /* default */])(keys_default()(scope)));
          }

      }

      var ComponentClass = Vue.extend(ModalComponent);
      var modalInstance = new ComponentClass({
        propsData: modalObj
      });
      modalInstance.show('#app');
      return modalInstance;
    }
  }]);

  return JFrogModalFactory;
}();


// CONCATENATED MODULE: ./src/services/JFrogModalService.js







var JFrogModalService_JFrogModal =
/*#__PURE__*/
function () {
  function JFrogModal() {
    Object(classCallCheck["a" /* default */])(this, JFrogModal);

    this.$inject('$rootScope', '$q', '$timeout', 'JFrogEventBus', 'JFrogUILibConfig');
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
  }
  /**
   * build the path to the template location
   * and delegate to the $modal service
   * return the modal instance
   *
   * @param template
   * @param scope
   * @returns {{Modal instance}}
   */


  Object(createClass["a" /* default */])(JFrogModal, [{
    key: "launchModal",
    value: function launchModal(template) {
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var size = arguments.length > 2 ? arguments[2] : undefined;
      var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var options = arguments.length > 4 ? arguments[4] : undefined;
      var modalObj = {
        template: template
      };
      return this._launch(modalObj, scope, size, cancelable, options);
    }
  }, {
    key: "_launch",
    value: function _launch(modalObj, scope, size) {
      var _this = this;

      var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var options = arguments.length > 4 ? arguments[4] : undefined;
      modalObj.uiEssNoCloseOnBackdrop = cancelable === false;
      modalObj.uiEssNoCloseOnEsc = cancelable === false;
      modalObj.uiEssSize = size || 'lg';
      modalObj.uiEssModalClass = options && options.class || '';
      modalObj.uiEssModalPromise = this.$q.defer();
      modalObj.JFrogModal = this;
      var result = modalObj.uiEssModalPromise.promise;

      if (options && _.isObject(options)) {
        _.extend(modalObj, options);
      }

      var focused = $(':focus');
      if (focused.length) focused.blur();
      var modalInstance = new JFrogModalFactory_JFrogModalFactory().getModal(modalObj, scope, this.JFrogUILibConfig);
      this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, function () {
        modalInstance.$close(true);
      }); //TODO much of this logic can be moved to the mixin

      this._calculateMaxHeight();

      var keyDownBinded = this._onKeyDown.bind(this); // Modal close event handler is registered as result.then(errorCallback)
      // In some cases the modal close event is caught by result.finally()


      result.then(function () {}, function () {
        _this.modalIsClosing = true;
      }).finally(function () {
        _this.modalIsClosing = true;
        $(window).off('resize', _this._calculateMaxHeight());
        $(document).off('keydown', keyDownBinded);
      });
      $(window).resize(function () {
        _this._calculateMaxHeight();
      });
      $(document).on('keydown', keyDownBinded);
      /* The interface expects a result (promise) & a close method to be returned */

      return {
        result: result,
        close: function close() {
          return modalInstance.$close(true);
        }
      };
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var target = $(event.target);

      if (event.keyCode === 13) {
        if (target.attr('jf-enter-press') === undefined) {
          if ($('.wizard-modal').length) {
            this._clickFirstFoundButton(['.wizard-modal button#wizard-popup-next', '.wizard-modal button#wizard-popup-next-custom', '.wizard-modal button#wizard-popup-finish']);
          } else {
            this._clickFirstFoundButton(['.modal-dialog button.btn-primary:not(.ignore-enter)']);
          }

          event.preventDefault();
        }
      }
    }
  }, {
    key: "_clickFirstFoundButton",
    value: function _clickFirstFoundButton(selectorsArray) {
      for (var i in selectorsArray) {
        var selector = selectorsArray[i];

        if ($(selector).length) {
          if (!$(selector).is('[disabled]')) {
            $(selector).click();
          }

          break;
        }
      }
    }
    /**
     * Calculate and set the max-height attribute of a modal's body
     * */

  }, {
    key: "_calculateMaxHeight",
    value: function _calculateMaxHeight(isWizardStep) {
      if (this.modalIsClosing) {
        this.$set(this, 'modalIsClosing', false);
        return;
      } // Try to hide the wizard modal body in this digest cycle before calculating height in the next digest cycle.
      // This is very important for cases that the modal has more then one step - such as onboarding wizard (and
      // applies to every step but the first)


      if (isWizardStep) $('.modal-body').hide(); // Calculate and set modal body height in the next digest cycle
      // After the resizing is done - the modal body is shown again.

      this.resizeModalBodyInNextCycle();
    }
  }, {
    key: "resizeModalBodyInNextCycle",
    value: function resizeModalBodyInNextCycle() {
      var _this2 = this;

      this.$timeout(function () {
        // Hide modal body before perfroming calculations
        var modal = $('.modal-content');
        var modalBody = modal.find('.modal-body'); // Calculate and show content

        var wizardModalContainer = modalBody.closest('.wizard-modal');

        if (wizardModalContainer.length > 0) {
          modalBody.hide();

          _this2.resizeWizardModalBody(modal, wizardModalContainer, modalBody);

          modalBody.show();
        } else {
          _this2.resizeAnyModalBody(modal, modalBody);
        }
      });
    }
  }, {
    key: "resizeAnyModalBody",
    value: function resizeAnyModalBody(modal, modalBody) {
      var modalOffsetTop = 110,
          //Modal offset top
      viewPortHeight = window.innerHeight,
          // View port height
      modalHeight = viewPortHeight - 2 * modalOffsetTop;
      this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
    }
  }, {
    key: "resizeWizardModalBody",
    value: function resizeWizardModalBody(modal, wizardContainer, modalBody) {
      var modalHeight = wizardContainer.height();
      this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
    }
  }, {
    key: "setModalBodyMaxHeight",
    value: function setModalBodyMaxHeight(modal, modalBody, modalHeight) {
      var headerHeight = modal.find('.modal-header').outerHeight() || 0,
          // Header height
      footerHeight = modal.find('.modal-footer').outerHeight() || 0,
          // Footer height
      maxHeight = modalHeight - headerHeight - footerHeight;
      modalBody.css('max-height', maxHeight);
    }
    /**
     * launch a modal that shows content in a codemirror container
     *
     * @param title - title of the modal
     * @param content - content for the code mirror container
     * @param mode - mode for code mirror editor options (usually {name: <mimetype>}
     * @param beforeMessage - message to insert before the codemirror element
     */

  }, {
    key: "launchCodeModal",
    value: function launchCodeModal(title, content, mode, beforeMessage, objectName) {
      var options = {
        content: content,
        mode: mode,
        title: title,
        beforeMessage: beforeMessage,
        objectName: objectName
      };
      return this.launchModal('@code_modal', null, 'sm', null, options);
    }
    /**
     * launch a modal that shows a confirmation box, and returns a promise
     *
     * @param title - title of the confirmation box
     * @param content - HTML content of the confirmation box
     * @param buttons - button text (Object(confirm: String, cancel: String))
     * @returns promise - resolved if the user confirmed, rejected otherwise
     */

  }, {
    key: "confirm",
    value: function confirm(content, title, buttons, checkboxLabel, checkBoxChangeListener) {
      buttons = buttons || {};
      var options = {
        buttons: buttons,
        content: content,
        title: title || 'Are you sure?',
        checkboxLabel: checkboxLabel,
        checkbox: {
          checked: false
        },
        checkBoxChangeListener: checkBoxChangeListener
      };
      return this.launchModal('@confirm_modal', {}, 'sm', null, options).result;
    }
  }, {
    key: "launchWizard",
    value: function launchWizard(wizardDefinitionObject) {
      var wizardHooks = new wizardDefinitionObject.controller();
      delete wizardDefinitionObject.controller;
      wizardDefinitionObject.cancelable = !!(wizardDefinitionObject.cancelable && wizardDefinitionObject.backdropCancelable);
      var options = {
        wizardDefinitionObject: wizardDefinitionObject,
        wizardHooks: wizardHooks
      };

      _.extend(options, wizardDefinitionObject.modalOptions);

      var modalInstance = this.launchModal('@wizard_modal', null, wizardDefinitionObject.size, wizardDefinitionObject.cancelable, options);
      modalInstance.result.catch(function (reason) {
        if (reason) modalInstance.cancel();
      });
      return modalInstance.result;
    }
  }]);

  return JFrogModal;
}();
// CONCATENATED MODULE: ./src/services/JFrogGridFactoryService.js







var headerCellTemplate = __webpack_require__("cb06");

var globals = {};
var JFrogGridFactoryService_JFrogGridFactory =
/*#__PURE__*/
function () {
  /* @ngInject */
  function JFrogGridFactory() {
    Object(classCallCheck["a" /* default */])(this, JFrogGridFactory);

    this.$inject('uiGridConstants', '$timeout', '$window', '$state', '$modal', '$rootScope', 'JFrogDownload', 'JFrogEventBus', 'JFrogUIUtils');
    globals.$timeout = this.$timeout;
    globals.$window = this.$window;
    globals.$state = this.$state;
    globals.$modal = this.$modal;
    globals.download = this.JFrogDownload;
    globals.$rootScope = this.$rootScope;
    globals.JFrogEventBus = this.JFrogEventBus;
    globals.utils = this.JFrogUIUtils;

    this._createContextMenu();
  }

  Object(createClass["a" /* default */])(JFrogGridFactory, [{
    key: "getGridInstance",
    value: function getGridInstance(scope) {
      return new JFrogGrid(scope, this.uiGridConstants);
    }
  }, {
    key: "getDefaultCellTemplate",
    value: function getDefaultCellTemplate() {
      return headerCellTemplate;
    }
  }, {
    key: "_createContextMenu",
    value: function _createContextMenu() {
      var _this = this;

      $.contextMenu({
        selector: '.grid-container .ui-grid-cell-contents, .grid-container .grid-cell-checkbox',
        build: function build($trigger, e) {
          var row = angular.element($trigger[0]).scope().row;
          var uiGrid = angular.element($trigger[0]).controller('uiGrid');
          if (!uiGrid) return;
          var grid = uiGrid.grid;
          var rowActions = grid.appScope.grids[grid.id].buttons;

          var customActionsRaw = _.pluck(grid.columns, 'colDef.customActions');

          var allActions = [];

          if (customActionsRaw) {
            customActionsRaw.forEach(function (acts) {
              if (acts) {
                acts.forEach(function (act) {
                  allActions.push(act);
                });
              }
            });
          }

          if (rowActions) {
            rowActions.forEach(function (act) {
              allActions.push(act);
            });
          }

          allActions = _.filter(allActions, function (act) {
            return row && (!act.visibleWhen || grid.options.checkVisibleWhen(act, row));
          });

          var editAction = _this._getEditAction($trigger, row, grid);

          var additionalActions = _this._getAdditionalActions($trigger, row, grid);

          if (!allActions.length && !editAction && additionalActions.length === 0 || !row) {
            return false;
          } else {
            var cmItems = {};

            if (editAction) {
              cmItems['*edit*'] = {
                name: 'Edit',
                icon: 'artifactory-edit'
              };
            }

            var getIconName = function getIconName(classdef) {
              var iconName;
              var classes = classdef.split(' ');
              classes.forEach(function (cls) {
                if (cls.startsWith('icon-')) {
                  iconName = cls.substr(5);
                }
              });
              return iconName;
            };

            if (additionalActions) {
              for (var i in additionalActions) {
                var action = additionalActions[i];
                cmItems['@' + action.name] = {
                  name: action.name,
                  icon: getIconName(action.icon)
                };
              }
            }

            for (var actI in allActions) {
              var act = allActions[actI];
              act.key = act.tooltip.split(' ').join('').toLowerCase();
              cmItems[act.key] = {
                name: act.tooltip,
                icon: getIconName(act.icon)
              };
            }

            globals.$timeout(function () {
              $('.context-menu-item').on('click', function (e) {
                if (_this.actionToDo) {
                  $(e.target).trigger('contextmenu:hide');
                  globals.$timeout(function () {
                    _this.actionToDo();

                    _this.$delete(_this, 'actionToDo');
                  }, 100);
                }
              });
            });
            return {
              callback: function callback(key, options) {
                _this.$set(_this, 'actionToDo', function () {
                  if (key === '*edit*') {
                    editAction.do();
                  } else if (key.startsWith('@')) {
                    var actionName = key.substr(1);

                    var _action = _.find(additionalActions, {
                      name: actionName
                    });

                    _action.do();
                  } else {
                    var _act = _.find(allActions, {
                      key: key
                    });

                    grid.options.callActionCallback(_act, row);

                    if (_act.href) {
                      var url = grid.options.getActionHref(_act, row);
                      if (url) globals.download(url);
                    }
                  }
                });

                return false;
              },
              items: cmItems
            };
          }
        }
      });
    }
  }, {
    key: "_getEditAction",
    value: function _getEditAction($trigger, row, grid) {
      var objScope = {
        row: row,
        grid: grid
      };
      var editState = $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)').length ? $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)')[0].attributes['ui-sref'].textContent : null;

      if (editState) {
        var parenthesesOpenIndex = editState.indexOf('(');
        var state = editState.substr(0, parenthesesOpenIndex);
        var paramsString = editState.substr(parenthesesOpenIndex);
        var openBraceIndex = paramsString.indexOf('{');
        var closeBraceIndex = paramsString.lastIndexOf('}');
        paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);
        var paramsObj = {};
        var paramsSplit = paramsString.split(',');
        paramsSplit.forEach(function (param) {
          var keyVal = param.split(':');
          var key = keyVal[0].trim();
          var val = keyVal[1].trim();
          if (val.startsWith('row.') || val.startsWith('grid.')) val = _.get(objScope, val);else if (val.startsWith('!row.') || val.startsWith('!grid.')) val = !_.get(objScope, val);else if (val.startsWith('\'')) val = val.split('\'').join('');else if (val.startsWith('"')) val = val.split('"').join('');
          paramsObj[key] = val;
        });
        return {
          do: function _do() {
            globals.$state.go(state, paramsObj);
          }
        };
      } else {
        var ngClicks = $trigger.parent().parent().find('[ng-click]:not(.no-cm-action)');
        var clickCommand;

        for (var i in ngClicks) {
          var ngClick = ngClicks[i];

          if (ngClick.attributes && ngClick.attributes['ng-click'] && ngClick.attributes['ng-click'].textContent.startsWith('grid.appScope')) {
            clickCommand = ngClick.attributes['ng-click'].textContent;
            break;
          }
        }

        if (clickCommand) {
          var _parenthesesOpenIndex = clickCommand.indexOf('(');

          var funcName = clickCommand.substr(0, _parenthesesOpenIndex);

          var _paramsString = clickCommand.substr(_parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

          var param = _.get(objScope, _paramsString);

          var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));

          var func = _.get(objScope, funcName).bind(funcThis);

          return {
            do: function _do() {
              func(param);
            }
          };
        } else return null;
      }
    }
  }, {
    key: "_getAdditionalActions",
    value: function _getAdditionalActions($trigger, row, grid) {
      var objScope = {
        row: row,
        grid: grid
      };
      var additionalCommands = [];
      var additionalElems = $trigger.parent().parent().find('[cm-aditional-action]');

      for (var i = 0; i < additionalElems.length; i++) {
        var elem = additionalElems[i];
        var clickCommand = elem.attributes['ng-click'].textContent;
        var icon = elem.attributes['class'].textContent;
        var commandName = elem.attributes['cm-aditional-action'].textContent;

        if (clickCommand) {
          (function () {
            var parenthesesOpenIndex = clickCommand.indexOf('(');
            var funcName = clickCommand.substr(0, parenthesesOpenIndex);
            var paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

            var param = _.get(objScope, paramsString);

            var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));

            var func = _.get(objScope, funcName).bind(funcThis);

            additionalCommands.push({
              name: commandName,
              icon: icon,
              do: function _do() {
                func(param);
              }
            });
          })();
        }
      }

      return additionalCommands;
    }
  }]);

  return JFrogGridFactory;
}();
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("768b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.search.js
var es6_regexp_search = __webpack_require__("386d");

// CONCATENATED MODULE: ./src/services/JFrogSubRouterService.js















var JFrogSubRouterService_JFrogSubRouter =
/*#__PURE__*/
function () {
  function JFrogSubRouter() {
    Object(classCallCheck["a" /* default */])(this, JFrogSubRouter);

    this.$inject('$state', '$location', '$rootScope', '$timeout');
    this.$masterScope = this.$rootScope.$new();
    this.$rootScope = this.$rootScope;
    this.$state = this.$state;
    this.$timeout = this.$timeout;
    this.$location = this.$location;
    this.$listeners = {};
    this.supportedEvents = ['state.change', 'params.change'];
  }

  Object(createClass["a" /* default */])(JFrogSubRouter, [{
    key: "createLocalRouter",
    value: function createLocalRouter(config) {
      var _this = this;

      this._watchStateChanges();

      this._watchLocationChanges();

      if (this.$config) {
        this._exitState();
      }

      this.$set(this, '$config', _.cloneDeep(config));
      this.$set(this.$config, 'parentScope', config.parentScope);
      this.$set(this.$config, 'baseStateName', this.$state.current.name);
      this.$set(this.$config, 'basePath', _.trim(this._sharedStartOfString([this.$state.current.url, this.$location.path()]), '/'));

      if (this.$state.current.url.indexOf('JFrogSubRouterPath') === -1) {
        console.warn('In order for JFrogSubRouter to work properly, you must define the sub path in your ui-router state, as being of type \'JFrogSubRouterPath\'. In your ui-router state definition, set the \'url\' field as \'/YOUR/BASE/PATH/{anySubRouteParamName:JFrogSubRouterPath}\' ');
      }

      this._initParams();

      this._mapPathToParams();

      this._createScope();

      this._createApiOnConfig();

      this.$config.parentScope.$on('$destroy', function () {
        _this._exitState();

        _this.unwatchUIRouterState();

        _this.unwatchUrl();
      });
      return this.$config.$api;
    }
  }, {
    key: "getActiveRouter",
    value: function getActiveRouter() {
      return this.$config.$api;
    }
  }, {
    key: "_createApiOnConfig",
    value: function _createApiOnConfig() {
      var THIS = this;
      this.$set(this.$config, '$api', {
        get params() {
          return THIS.$config.$params;
        },

        set params(params) {
          THIS.$config.$params = params;

          THIS._mapParamsToPath();
        },

        get state() {
          return THIS._getCurrentState();
        },

        get config() {
          return THIS.$config;
        },

        updateUrl: function updateUrl() {
          var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          if (!force && THIS.$config.hotSyncUrl) return;else THIS._mapParamsToPath();
        },
        goto: function goto(stateName, params) {
          THIS._gotoState(stateName, params);
        },
        listenForChanges: function listenForChanges(watchedParams, states, listener) {
          var _this2 = this;

          var scope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
          watchedParams = !_.isArray(watchedParams) ? [watchedParams] : watchedParams;
          states = !_.isArray(states) ? states ? [states] : [] : states;
          this.on('params.change', function (oldParams, newParams) {
            if (!states.length || _.includes(states, _this2.state)) {
              var match = watchedParams.reduce(function (acc, curr) {
                return acc || oldParams[curr] !== newParams[curr];
              }, false);
              if (match) listener(oldParams, newParams, _this2.state);
            }
          }, scope);
        },
        on: function on(event, listener, scope) {
          var _this3 = this;

          if (!_.includes(THIS.supportedEvents, event)) {
            console.error('JFrogSubRouter: Unsupported Event: ' + event);
            return;
          }

          if (!THIS.$listeners[event]) THIS.$listeners[event] = [];
          THIS.$listeners[event].push(listener);

          if (scope) {
            scope.$on('$destroy', function () {
              _this3.off(event, listener);
            });
          }
        },
        off: function off(event, listener) {
          if (!_.includes(THIS.supportedEvents, event)) {
            console.error('JFrogSubRouter: Unsupported Event: ' + event);
            return;
          }

          if (THIS.$listeners[event]) {
            if (listener) {
              _.remove(THIS.$listeners[event], function (l) {
                return l === listener;
              });
            } else {
              THIS.$listeners[event] = [];
            }
          }
        },
        fire: function fire(event) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          if (THIS.$listeners[event]) {
            THIS.$listeners[event].forEach(function (listener) {
              return listener.apply(void 0, params);
            });
          }
        }
      });
    }
  }, {
    key: "_sharedStartOfString",
    value: function _sharedStartOfString(array) {
      var A = array.concat().sort(),
          a1 = A[0],
          a2 = A[A.length - 1],
          L = a1.length,
          i = 0;

      while (i < L && a1.charAt(i) === a2.charAt(i)) {
        i++;
      }

      return a1.substring(0, i);
    }
  }, {
    key: "_createScope",
    value: function _createScope() {
      var _this4 = this;

      this.$set(this.$config, '$scope', this.$rootScope.$new());
      this.$set(this.$config.$scope, 'config', this.$config);
      this.$set(this.$config.$scope, 'unwatchParams', this.$config.$scope.$watch('config.$params', function (newVal, oldVal) {
        if (!_this4.$config.$params || _this4.$config.baseStateName !== _this4.$state.current.name || _.isEqual(newVal, oldVal) && _.isEqual(_this4._getPathAsParams(), _this4.$config.$params)) {
          return;
        }

        if (_this4.$config.hotSyncUrl) _this4._mapParamsToPath();
      }, true));
      this.$set(this.$config.$scope, 'unwatchState', this.$config.$scope.$watch('config.$api.state', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === null) {
            if (_this4.$config.onInvalidState) {
              _this4.$config.onInvalidState(oldVal, _this4.$config.$params);
            }
          } else {
            if (_this4.$config.onStateChange) {
              _this4.$config.onStateChange(oldVal, newVal);

              if (_this4.$config) _this4.$config.$api.fire('state.change', oldVal, newVal);
            }
          }
        }
      }));
    }
  }, {
    key: "_destroyScope",
    value: function _destroyScope() {
      this.$config.$scope.unwatchParams();
      this.$config.$scope.unwatchState();
      this.$config.$scope.$destroy();
    }
  }, {
    key: "_exitState",
    value: function _exitState() {
      this.$set(this.$config, '$destroyed', true);

      this._destroyScope();

      this.$set(this, '$config', null);
    }
  }, {
    key: "_getCurrentState",
    value: function _getCurrentState() {
      var _this5 = this;

      var state = null;

      if (this.$config.states && this.$config.$initialized) {
        for (var i = 0; i < this.$config.states.length; i++) {
          var stateDef = this.$config.states[i];
          var mandatoriesCheck = stateDef.params.mandatory ? stateDef.params.mandatory.reduce(function (acc, curr) {
            return acc && !!_this5.$config.$params[curr];
          }, true) : true;
          var nullifiedCheck = stateDef.params.nullify ? stateDef.params.nullify.reduce(function (acc, curr) {
            return acc && _this5.$config.$params[curr] === null;
          }, true) : true;

          if (mandatoriesCheck && nullifiedCheck) {
            state = stateDef.name;
            break;
          }
        }
      }

      return state;
    }
  }, {
    key: "_gotoState",
    value: function _gotoState(stateName, params) {
      var _this6 = this;

      if (!this.$config.states) {
        console.error("Trying to go to state ".concat(stateName, ", but no states were defined"));
      } else {
        var stateDef = _.find(this.$config.states, {
          name: stateName
        });

        if (!stateDef) {
          console.error("Trying to go to state ".concat(stateName, ", but no such state were defined"));
        } else {
          if (params) _.extend(this.$config.$params, params);

          if (stateDef.params.mandatory) {
            stateDef.params.mandatory.forEach(function (mandatoryParam) {
              if (!_this6.$config.$params[mandatoryParam]) {
                console.error("State change error: Missing mandatory param: ".concat(mandatoryParam));
              }
            });
          }

          if (stateDef.params.nullify) {
            stateDef.params.nullify.forEach(function (nullifiedParam) {
              if (params && params[nullifiedParam]) {
                console.error("State change error: Unsupported param: ".concat(nullifiedParam));
              }

              _this6.$set(_this6.$config.$params, nullifiedParam, null);
            });
          }

          if (stateDef.params.defaults) {
            for (var key in stateDef.params.defaults) {
              var value = stateDef.params.defaults[key];

              if (this.$config.$params[key] === null) {
                this.$set(this.$config.$params, key, value);
              }
            }
          }
        }
      }
    }
  }, {
    key: "_watchLocationChanges",
    value: function _watchLocationChanges() {
      var _this7 = this;

      if (!this.$masterScope.$location) this.$set(this.$masterScope, '$location', this.$location);
      this.$set(this, 'unwatchUrl', this.$masterScope.$watch('$location.absUrl()', function (newVal, oldVal) {
        if (_this7.$config) {
          var beforeParams = _.cloneDeep(_this7.$config.$params);

          _this7._mapPathToParams();

          if (!_this7.$config.$initialized) {
            _this7.$set(_this7.$config, '$initialized', true);

            if (_this7.$config.onInit) {
              _this7.$config.onInit();

              beforeParams = _.cloneDeep(_this7.$config.$params);
            }
          }

          if (!_.isEqual(beforeParams, _this7.$config.$params)) {
            if (_this7.$config.onChangeFromUrl) _this7.$config.onChangeFromUrl(beforeParams, _this7.$config.$params);
            if (_this7.$config) _this7.$config.$api.fire('params.change', beforeParams, _this7.$config.$params);
          }
        }
      }));
    }
  }, {
    key: "_watchStateChanges",
    value: function _watchStateChanges() {
      var _this8 = this;

      var onStateChange = function onStateChange(e, toState, toParams, fromState, fromParams) {
        if (_this8.$config) {
          if (toState.name === _this8.$config.baseStateName && fromState.name === _this8.$config.baseStateName) {
            var search = _this8.$location.search();

            _this8.$state.go(toState.name, toParams, {
              notify: false,
              reload: false,
              location: 'replace',
              inherit: true
            });

            _this8.unwatchUrl();

            _this8.$timeout(function () {
              _this8.$location.search(search).replace();

              _this8._watchLocationChanges();
            });

            e.preventDefault();
          }
        }
      };

      this.$set(this, 'unwatchUIRouterState', this.$rootScope.$on('$stateChangeStart', onStateChange));
    }
  }, {
    key: "_getParametersFromConfig",
    value: function _getParametersFromConfig() {
      var urlStructure = this.$config.urlStructure;

      var _urlStructure$split = urlStructure.split('?'),
          _urlStructure$split2 = Object(slicedToArray["a" /* default */])(_urlStructure$split, 2),
          pathParams = _urlStructure$split2[0],
          searchParams = _urlStructure$split2[1];

      pathParams = _.without(pathParams.split('/'), '');
      searchParams = searchParams.split('&');
      pathParams = _.map(pathParams, function (param) {
        return param.substr(1);
      });
      searchParams = _.map(searchParams, function (param) {
        return param.substr(1);
      });
      return {
        path: pathParams,
        search: searchParams,
        all: pathParams.concat(searchParams)
      };
    }
  }, {
    key: "_getPathAsParams",
    value: function _getPathAsParams() {
      var _this9 = this;

      var params = {};

      var configParams = this._getParametersFromConfig();

      var path = this.$location.path();

      var search = this._decodeSearchParams(this.$location.search());

      var basePathParts = this.$config.basePath.split('/');

      var pathParts = _.filter(path.split('/'), function (part) {
        return part !== '' && !_.includes(basePathParts, part);
      });

      configParams.all.forEach(function (param) {
        if (params[param]) {
          params[param] = null;
        }
      });
      pathParts.forEach(function (part, index) {
        var param = configParams.path[index];
        if (param) params[param] = _this9._customPathPartDecode(part);
      });
      configParams.search.forEach(function (searchParam) {
        if (search[searchParam]) {
          params[searchParam] = search[searchParam];
        }
      });
      return params;
    }
  }, {
    key: "_initParams",
    value: function _initParams() {
      var _this10 = this;

      this.$set(this.$config, '$params', {});

      var configParams = this._getParametersFromConfig();

      configParams.all.forEach(function (param) {
        _this10.$set(_this10.$config.$params, param, null);
      });
    }
  }, {
    key: "_mapPathToParams",
    value: function _mapPathToParams() {
      var _this11 = this;

      if (!this.$config) return;

      var currentUrlParams = this._getPathAsParams();

      _.extend(this.$config.$params, currentUrlParams);

      var configParams = this._getParametersFromConfig();

      var remove = false;
      configParams.path.forEach(function (pathParam) {
        if (!currentUrlParams[pathParam]) remove = true;
        if (remove) _this11.$set(_this11.$config.$params, pathParam, null);
      });

      var search = this._decodeSearchParams(this.$location.search());

      configParams.search.forEach(function (queryParam) {
        if (!search[queryParam]) {
          _this11.$set(_this11.$config.$params, queryParam, null);
        }
      });
    }
  }, {
    key: "_mapParamsToPath",
    value: function _mapParamsToPath() {
      var _this12 = this;

      if (!this.$config) return;

      var configParams = this._getParametersFromConfig();

      var pathParts = [''].concat(this.$config.basePath.split('/'));
      var stop = false;
      configParams.path.forEach(function (param) {
        if (!stop) {
          var val = _this12.$config.$params[param];

          if (val === null) {
            stop = true;
          } else {
            pathParts.push(_this12._customPathPartEncode(val));
          }
        }
      });
      var searchParams = {};
      configParams.search.forEach(function (param) {
        var val = _this12.$config.$params[param];

        if (val !== null) {
          searchParams[param] = val;
        }
      });
      this.$location.search(this._encodeSearchParams(searchParams));
      this.$location.path(pathParts.join('/') + '/');
    }
  }, {
    key: "_encodeSearchParams",
    value: function _encodeSearchParams(searchParams) {
      var _this13 = this;

      var isEmptyObject = function isEmptyObject(obj) {
        return keys_default()(obj).reduce(function (acc, curr) {
          return acc && (obj[curr] === null || obj[curr] === undefined);
        }, true);
      };

      if (this.$config.encodeSearchParamsAsBase64 === true) {
        return isEmptyObject(searchParams) ? {} : {
          state: btoa(stringify_default()(searchParams))
        };
      } else if (_.isString(this.$config.encodeSearchParamsAsBase64)) {
        return isEmptyObject(searchParams) ? {} : Object(defineProperty["a" /* default */])({}, this.$config.encodeSearchParamsAsBase64, btoa(stringify_default()(searchParams)));
      } else if (_.isObject(this.$config.encodeSearchParamsAsBase64)) {
        var _ret = function () {
          var result = _.cloneDeep(searchParams);

          var _loop = function _loop(key) {
            var params = _this13.$config.encodeSearchParamsAsBase64[key];
            var toEncode = {};
            params.forEach(function (param) {
              delete result[param];
              toEncode[param] = searchParams[param];
            });
            if (!isEmptyObject(toEncode)) result[key] = btoa(stringify_default()(toEncode));
          };

          for (var key in _this13.$config.encodeSearchParamsAsBase64) {
            _loop(key);
          }

          return {
            v: result
          };
        }();

        if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
      } else {
        return searchParams;
      }
    }
  }, {
    key: "_decodeSearchParams",
    value: function _decodeSearchParams(searchParams) {
      if (this.$config.encodeSearchParamsAsBase64 === true) {
        return searchParams.state ? JSON.parse(atob(decodeURIComponent(searchParams.state))) : {};
      } else if (_.isString(this.$config.encodeSearchParamsAsBase64)) {
        return searchParams[this.$config.encodeSearchParamsAsBase64] ? JSON.parse(atob(decodeURIComponent(searchParams[this.$config.encodeSearchParamsAsBase64]))) : {};
      } else if (_.isObject(this.$config.encodeSearchParamsAsBase64)) {
        var result = _.cloneDeep(searchParams);

        for (var key in this.$config.encodeSearchParamsAsBase64) {
          if (result[key]) {
            var decoded = JSON.parse(atob(decodeURIComponent(result[key])));
            delete result[key];

            _.extend(result, decoded);
          }
        }

        return result;
      } else {
        return searchParams;
      }
    }
  }, {
    key: "_customPathPartEncode",
    value: function _customPathPartEncode(pathPart) {
      if (!pathPart) return pathPart;
      return encodeURIComponent(pathPart).replace(/%2F/g, '~2F');
    }
  }, {
    key: "_customPathPartDecode",
    value: function _customPathPartDecode(pathPart) {
      if (!pathPart) return pathPart;
      return decodeURIComponent(pathPart.replace(/~2F/g, '%2F'));
    }
  }]);

  return JFrogSubRouter;
}();
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./src/services/JfFullTextServiceService.js




var JfFullTextServiceService_JfFullTextService =
/*#__PURE__*/
function () {
  function JfFullTextService() {
    Object(classCallCheck["a" /* default */])(this, JfFullTextService);

    this.$inject('JFrogModal');
    this.modal = this.JFrogModal;
  }

  Object(createClass["a" /* default */])(JfFullTextService, [{
    key: "showFullTextModal",
    value: function showFullTextModal(text, textSubject, modalWidth) {
      var showAsList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var listItemClickCB = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var windowClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      if (!text || !text.length) {
        return;
      }

      var options = {
        windowClass: 'full-text-modal' + (windowClass ? ' ' + windowClass : ''),
        title: textSubject,
        text: !showAsList && this.toHtmlRows(text),
        list: showAsList && text,
        listItemClickCB: listItemClickCB
      };
      return this.modal.launchModal('@full.text.modal', {}, modalWidth, true, options);
    }
  }, {
    key: "toHtmlRows",
    value: function toHtmlRows(text) {
      if (typeof text === 'string') {
        return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
      } else if (is_array_default()(text)) {
        return text.join('<br />');
      }
    }
  }]);

  return JfFullTextService;
}();
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfContextMenuComponent/index.vue?vue&type=template&id=00732f82&scoped=true&
var JfContextMenuComponentvue_type_template_id_00732f82_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isOpen)?_c('div',{staticClass:"jf-context-menu",style:(_vm.position)},_vm._l((_vm.actions),function(action,index){return _c('a',{key:index,staticClass:"action-item",attrs:{"href":action.link,"icon-name":action.icon || ''},on:{"click":function($event){$event.preventDefault();return _vm._onActionClick($event, action)}}},[_c('i',{staticClass:"action-icon",class:action.icon}),_c('span',[_vm._v(_vm._s(action.name))])])}),0):_vm._e()}
var JfContextMenuComponentvue_type_template_id_00732f82_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfContextMenuComponent/index.vue?vue&type=template&id=00732f82&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfContextMenuComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
var CONTEXT_MENU_WIDTH = 190;
var CONTEXT_MENU_ROW_HEIGHT = 40;
var ERROR_MARGIN = 15;
/* harmony default export */ var JfContextMenuComponentvue_type_script_lang_js_ = ({
  name: 'jf-context-menu',
  'jf@inject': ['$timeout', 'JFrogEventBus'],
  data: function data() {
    return {
      position: {
        top: 0,
        left: 0
      },
      isOpen: false,
      actions: []
    };
  },
  created: function created() {
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
  },
  mounted: function mounted() {
    this._registerToEvents();

    this._handleDocumentClick();
  },
  beforeDestroy: function beforeDestroy() {
    $(document).off('mousedown', this.documentClickHandler);
  },
  methods: {
    _registerToEvents: function _registerToEvents() {
      var _this = this;

      this.JFrogEventBus.registerOnScope(this, this.EVENTS.CONTEXT_MENU_OPEN, function (options) {
        _this.actions = options.actions;
        _this.clickedItemData = options.clickedItemData;

        _this._setContextMenuPosition(options.actions.length || keys_default()(options.actions).length, options.event.pageX, options.event.pageY);

        _this.isOpen = true;
      });
    },
    _setContextMenuPosition: function _setContextMenuPosition(numberOfActions, pageX, pageY) {
      var _this2 = this;

      if (numberOfActions === 0) {
        return;
      }

      var windowElem = $(window);
      var windowHeight = windowElem.innerHeight();
      var windowWidth = windowElem.innerWidth();
      var left = pageX + ERROR_MARGIN,
          top = pageY + ERROR_MARGIN / 2,
          contextMenuHeight = numberOfActions * CONTEXT_MENU_ROW_HEIGHT;

      if (pageX + (CONTEXT_MENU_WIDTH + ERROR_MARGIN) >= windowWidth) {
        left = pageX - (CONTEXT_MENU_WIDTH + ERROR_MARGIN);
      }

      if (pageY + contextMenuHeight + ERROR_MARGIN / 2 >= windowHeight) {
        top = pageY - (contextMenuHeight + ERROR_MARGIN / 2);
      }

      if (top < ERROR_MARGIN) top = ERROR_MARGIN;
      this.position = {
        left: "".concat(left, "px"),
        top: "".concat(top, "px")
      };
      this.$nextTick(function () {
        _this2.$forceUpdate();
      });
    },
    _onActionClick: function _onActionClick($event, action) {
      $event.stopPropagation();
      this.isOpen = false;

      if (action.callback) {
        action.callback(this.clickedItemData);
      }

      if (this.onAnyActionFired && typeof this.onAnyActionFired === 'function') {
        this.onAnyActionFired();
      }
    },
    _handleDocumentClick: function _handleDocumentClick() {
      var _this3 = this;

      this.documentClickHandler = function (e) {
        var target = $(e.target);
        var insideContextMenu = !!target.parents('.jf-context-menu').length;

        if (!insideContextMenu) {
          _this3.$timeout(function () {
            _this3.isOpen = false;
          });
        }
      };

      $(document).on('mousedown', this.documentClickHandler);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfContextMenuComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfContextMenuComponentvue_type_script_lang_js_ = (JfContextMenuComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfContextMenuComponent/index.vue?vue&type=style&index=0&id=00732f82&scoped=true&lang=less&
var JfContextMenuComponentvue_type_style_index_0_id_00732f82_scoped_true_lang_less_ = __webpack_require__("520b");

// CONCATENATED MODULE: ./src/components/JfContextMenuComponent/index.vue






/* normalize component */

var JfContextMenuComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfContextMenuComponentvue_type_script_lang_js_,
  JfContextMenuComponentvue_type_template_id_00732f82_scoped_true_render,
  JfContextMenuComponentvue_type_template_id_00732f82_scoped_true_staticRenderFns,
  false,
  null,
  "00732f82",
  null
  
)

/* harmony default export */ var JfContextMenuComponent = (JfContextMenuComponent_component.exports);
// CONCATENATED MODULE: ./src/services/ContextMenuServiceService.js




var ContextMenuServiceService_ContextMenuService =
/*#__PURE__*/
function () {
  /* @ngInject */
  function ContextMenuService() {
    Object(classCallCheck["a" /* default */])(this, ContextMenuService);

    this.$inject('$timeout', 'JFrogEventBus');
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();

    this._compileContextMenu();
  }
  /***
   * _compileContextMenu - Copmile the context menu once and apend to body
   * @private
   * */


  Object(createClass["a" /* default */])(ContextMenuService, [{
    key: "_compileContextMenu",
    value: function _compileContextMenu() {
      this.$body = $(document).find('body:eq(0)');

      if (!this.$body.find('.jf-context-menu').length) {
        var ComponentClass = Vue.extend(JfContextMenuComponent);
        var componentInstance = new ComponentClass();
        this.$body.append(componentInstance.$mount().$el);
      }
    }
    /***
     * openContextMenu - fires the display event , listened by the context menu component
     * @private
     * @param actionsCallback - returns an array of action objects, each heaving name, icon, href, callback , or
     *  either a $promise.
     * @param clickedItem - a $element that represents the clicked element.
     * @param event - the click event passed by using code
     * */

  }, {
    key: "_openContextMenu",
    value: function _openContextMenu(actionsCallback, clickedItemData, clickEvent, trigger) {
      var _this = this;

      var _launchContextMenuEvent = function _launchContextMenuEvent(actions) {
        var options = {
          actions: actions,
          clickedItemData: clickedItemData,
          event: clickEvent
        };

        _this.JFrogEventBus.dispatch(_this.EVENTS.CONTEXT_MENU_OPEN, options);
      };

      var cbResponse = actionsCallback(trigger);

      if (cbResponse.then) {
        cbResponse.then(function (actions) {
          _launchContextMenuEvent(actions);
        });
      } else {
        _launchContextMenuEvent(cbResponse);
      }
    }
    /***
     * contextMenu - sets a context menu for an element
     * @public
     * @param settings - gets a settings object consisted of
     * */

  }, {
    key: "contextMenu",
    value: function contextMenu(settings) {
      var _this2 = this;

      $(document).contextmenu(function (e) {
        var target = $(e.target);
        var closest = target.closest(settings.selector);

        if (closest.length) {
          e.preventDefault();
          e.stopPropagation();

          _this2.$timeout(function () {
            if (settings.build && typeof settings.build === 'function') {
              _this2._openContextMenu(settings.build, settings.data, e, closest);
            }
          });

          return false;
        }
      });
    }
  }]);

  return ContextMenuService;
}();
// CONCATENATED MODULE: ./src/services/AdvancedStringMatchService.js






var AdvancedStringMatchService_AdvancedStringMatch =
/*#__PURE__*/
function () {
  function AdvancedStringMatch() {
    var _this = this;

    Object(classCallCheck["a" /* default */])(this, AdvancedStringMatch);

    this.$inject('$sanitize');
    this.$sanitize = this.$sanitize;

    this.match = function (str, match) {
      return _this.doMatch(str, match);
    };

    this.highlight = function (elem, segments, hlElemType, hlClass) {
      return _this.doHighlight(elem, segments, hlElemType, hlClass);
    };
  }

  Object(createClass["a" /* default */])(AdvancedStringMatch, [{
    key: "getMatchCount",
    value: function getMatchCount(str, match) {
      var searchInside = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var i = 0;

      while (str[i] && match[i] && str[i] === match[i]) {
        i++;
      }

      var result;

      if (i === 0 && searchInside) {
        var len = match.length;
        var start = str.indexOf(match.substr(0, len));

        while (start === -1 && len > 0) {
          len--;
          start = str.indexOf(match.substr(0, len));
        }

        if (start !== -1 && len > 1) {
          i = start;

          while (str[i] && match[i - start] && str[i] === match[i - start]) {
            i++;
          }

          result = {
            start: start,
            length: i - start
          };
        } else {
          result = {
            start: 0,
            length: 0
          };
        }
      } else {
        result = {
          start: 0,
          length: i
        };
      }

      return result;
    }
  }, {
    key: "doMatch",
    value: function doMatch(str, match) {
      if (!str) return;
      str = str.toLowerCase();
      match = match.toLowerCase();
      if (!match || !str) return {
        matched: false,
        segments: []
      };
      var index = str.indexOf(match);

      if (index !== -1) {
        return {
          matched: true,
          segments: [{
            start: index,
            length: match.length
          }]
        };
      } else {
        var regexp = /\_|\-|\.|\/| /;
        var regexp_no_dot = /\_|\-|\/| /;
        var parts = match.indexOf('.') !== -1 ? str.split(regexp_no_dot) : str.split(regexp);

        if (match.indexOf('.') !== -1) {
          var tempParts = [];
          parts.forEach(function (part) {
            if (part.indexOf('.') === -1) {
              tempParts.push(part);
            } else {
              var innerParts = part.split('.');
              innerParts = _.map(innerParts, function (part) {
                return '.' + part;
              });
              innerParts[0] = innerParts[0].substr(1); // we don't want '.' before the first entry

              tempParts = tempParts.concat(innerParts);
            }
          });
          parts = tempParts;
        }

        match = match.split(regexp_no_dot).join('');
        var gotMatch = false;
        var pos = 0;
        var segments = [];
        var searchInside = false;

        if (match[0] === '*') {
          while (match[0] === '*') {
            match = match.substr(1);
          }
        }

        for (var i = 0; i < parts.length; i++) {
          var matchCount = this.getMatchCount(parts[i], match, !gotMatch || searchInside);

          if (matchCount.length !== 0) {
            if (parts[i].startsWith('.')) pos--;
            segments.push({
              start: pos + matchCount.start,
              length: matchCount.length
            });
            gotMatch = true;
          }

          match = match.substr(matchCount.length);

          if (match[0] === '*') {
            searchInside = true;

            while (match[0] === '*') {
              match = match.substr(1);
            }

            var newPart = parts[i].substr(matchCount.start + matchCount.length);
            if (newPart) parts.splice(i + 1, 0, newPart);else pos++;
            pos += matchCount.start + matchCount.length;
          } else {
            if (matchCount.length !== 0) searchInside = false;
            pos += parts[i].length + 1;
          }

          if (!match.length) break;
        }

        if (match.length) gotMatch = false;
        return {
          matched: gotMatch,
          segments: gotMatch ? segments : []
        };
      }
    }
  }, {
    key: "getHighlighted",
    value: function getHighlighted(text, segments, hlElemType, hlClass) {
      if (!segments.length || !text) return text;else {
        var last = 0;
        var highlighted = '';

        for (var i in segments) {
          if (text.substr(segments[i].start, segments[i].length)) {
            highlighted += this.$sanitize(text.substr(last, segments[i].start - last));
            highlighted += "<".concat(hlElemType, " class=\"").concat(hlClass, "\">");
            highlighted += this.$sanitize(text.substr(segments[i].start, segments[i].length));
            highlighted += "</".concat(hlElemType, ">");
            last = segments[i].start + segments[i].length;
          }
        }

        highlighted += this.$sanitize(text.substr(last, text.length - last));
        return highlighted;
      }
    }
  }, {
    key: "doHighlight",
    value: function doHighlight(elem, segments) {
      var hlElemType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'span';
      var hlClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'highlight';
      var contents = elem.contents();

      var textNode = _.find(contents, {
        nodeType: 3
      });

      if (!textNode) {
        for (var i = 0; i < contents.length; i++) {
          textNode = _.find(contents[i].childNodes, {
            nodeType: 3
          });
          if (textNode) break;
        }
      }

      if (textNode) {
        var highlighted = this.getHighlighted(textNode.nodeValue, segments, hlElemType, hlClass);
        $(textNode).replaceWith(highlighted);
      }
    }
  }]);

  return AdvancedStringMatch;
}();
// CONCATENATED MODULE: ./src/services/JFrogUiUtilsService.js








var JFrogUiUtilsService_JFrogUIUtils =
/*#__PURE__*/
function () {
  function JFrogUIUtils() {
    Object(classCallCheck["a" /* default */])(this, JFrogUIUtils);

    this.$inject('$timeout');
  }

  Object(createClass["a" /* default */])(JFrogUIUtils, [{
    key: "getCapitalizedKeys",
    value: function getCapitalizedKeys(object, dictionary) {
      var getCapitalized = function getCapitalized(str) {
        str = str.split('_').join(' ');
        str = str.split(' ').map(function (word) {
          return _.capitalize(word);
        }).join(' ');
        return str;
      };

      var destObj = {};

      for (var key in object) {
        if (dictionary && dictionary[key]) {
          destObj[dictionary[key]] = object[key];
        } else {
          var capitalized = getCapitalized(key);
          destObj[capitalized] = object[key];
        }
      }

      return destObj;
    }
  }, {
    key: "getSafeHtml",
    value: function getSafeHtml(unsafeHtml) {
      if (!unsafeHtml) return unsafeHtml;

      var decoded = _.unescape(unsafeHtml);

      var safe = _.escape(decoded);

      return safe;
    }
  }, {
    key: "fireResizeEvent",
    value: function fireResizeEvent() {
      var resizeEvent = document.createEvent('Event');
      resizeEvent.initEvent('resize', false, true);
      this.$timeout(function () {
        try {
          window.dispatchEvent(new Event('resize'));
        } catch (e) {
          window.dispatchEvent(resizeEvent);
        }
      });
    }
  }, {
    key: "stringifyData",
    value: function stringifyData(value, separator) {
      if (_.isEmpty(value)) {
        return '';
      }

      if (_.isArray(value)) {
        var resultArray = _.map(value, function (item) {
          if (item.name) {
            return item.name;
          }

          return item;
        });

        if (separator && typeof separator === 'string') {
          return resultArray.join(separator);
        }

        return resultArray.join(', ');
      }

      return value;
    }
  }, {
    key: "formatHtmlList",
    value: function formatHtmlList(list, maxInRow) {
      var _this = this;

      var result = "";
      var temp = [];

      _.forEach(list, function (item) {
        if (temp.length === maxInRow) {
          result += _this.stringifyData(temp) + "<br>";
          temp = [item];
        } else {
          temp.push(item);
        }
      });

      if (temp.length > 0) {
        result += this.stringifyData(temp) + "<br>";
      }

      return result;
    }
  }, {
    key: "capitalizeFirstLetter",
    value: function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }, {
    key: "saveTextAsFile",
    value: function saveTextAsFile(text, fileName) {
      var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
          ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
          ieEDGE = navigator.userAgent.match(/Edge/g),
          ieVer = ie ? ie[1] : ie11 ? 11 : ieEDGE ? 12 : -1;

      if (ie && ieVer < 10) {
        console.log('No blobs on IE ver<10');
        return;
      }

      var textFileAsBlob = new Blob([text], {
        type: 'text/plain'
      });

      if (ieVer > -1) {
        window.navigator.msSaveBlob(textFileAsBlob, fileName);
        return;
      }

      var downloadLink = document.createElement('a');
      downloadLink.download = fileName;
      downloadLink.innerHTML = 'Download File';

      if (window.URL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

        downloadLink.onclick = function (event) {
          document.body.removeChild(event.target);
          console.log('oh my blob');
        };

        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        console.log(downloadLink);
      }

      downloadLink.click();
    }
  }, {
    key: "compareVersions",
    value: function compareVersions(aText, bText) {
      var splitters = /\-|\.|_/;
      var aArr = aText.split(splitters);
      var bArr = bText.split(splitters);
      var minLength = Math.min(aArr.length, bArr.length);
      var first;

      for (var i = 0; i < minLength; i++) {
        var aNum = parse_int_default()(aArr[i]);

        var bNum = parse_int_default()(bArr[i]);

        var aIsNum = !_.isNaN(aNum);
        var bIsNum = !_.isNaN(bNum);

        if (aIsNum && bIsNum && aNum < bNum) {
          first = 'a';
          break;
        } else if (aIsNum && bIsNum && aNum > bNum) {
          first = 'b';
          break;
        } else if (!aIsNum || !bIsNum || aNum === bNum) {
          if (aArr[i] < bArr[i]) {
            first = 'a';
            break;
          } else if (aArr[i] > bArr[i]) {
            first = 'b';
            break;
          }
        }
      }

      if (!first) {
        if (aArr.length > 3 && bArr.length > 3) {
          if (aArr.length > bArr.length) first = 'b';else if (aArr.length < bArr.length) first = 'a';
        } else {
          if (aArr.length > bArr.length) first = 'a';else if (aArr.length < bArr.length) first = 'b';
        }
      }

      return first === 'a' ? -1 : first === 'b' ? 1 : 0;
    }
  }, {
    key: "sortData",
    value: function sortData(aText, bText) {
      aText = aText.toLowerCase();
      bText = bText.toLowerCase();
      var aScore = 0,
          bScore = 0;
      var aHasNumVal = !_.isNaN(parse_int_default()(aText));
      var bHasNumVal = !_.isNaN(parse_int_default()(bText));

      if (aHasNumVal && bHasNumVal) {
        var addTo = this.compareVersions(aText, bText);
        if (addTo === -1) aScore += 100;
        if (addTo === 1) bScore += 100;
      } else {
        var aDigitIndex = aText.search(/\d/);
        var bDigitIndex = bText.search(/\d/);

        if (aDigitIndex === bDigitIndex && aDigitIndex !== -1) {
          var aBeforeNum = aText.substr(0, aDigitIndex);
          var bBeforeNum = bText.substr(0, bDigitIndex);

          if (aBeforeNum === bBeforeNum) {
            var aFromNum = aText.substr(aDigitIndex);
            var bFromNum = bText.substr(bDigitIndex);

            var _addTo = this.compareVersions(aFromNum, bFromNum);

            if (_addTo === -1) aScore += 100;
            if (_addTo === 1) bScore += 100;
          }
        }

        if (aText < bText) aScore++;
        if (aText > bText) bScore++;
      }

      return aScore < bScore ? 1 : -1;
    }
  }, {
    key: "b64EncodeUnicode",
    value: function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    }
  }, {
    key: "escapeForRegex",
    value: function escapeForRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
  }]);

  return JFrogUIUtils;
}();
// CONCATENATED MODULE: ./src/services/JFrogNotificationsService.js


var JFrogNotificationsService_JFrogNotifications =
/*#__PURE__*/
function () {
  function JFrogNotifications() {
    Object(classCallCheck["a" /* default */])(this, JFrogNotifications);

    this.$inject('toaster', '$timeout', '$rootScope', 'JFrogEventBus');
    this.toast = this.toaster;
    this.lastNotification = null;
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.errors = [];
    this.MIN_ERROR_TIME = 6000;
    this.registerEvents();
  }

  Object(createClass["a" /* default */])(JFrogNotifications, [{
    key: "registerEvents",
    value: function registerEvents() {
      var _this = this;

      this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_NOTIFICATIONS, function () {
        _this.errors.forEach(function (error) {
          if (!error.closing) {
            error.closing = true;
            var now = new Date().getTime();
            var delay = now - error.time > _this.MIN_ERROR_TIME ? 0 : _this.MIN_ERROR_TIME - (now - error.time);
            var instance = error.instance;
            window.setTimeout(function () {
              instance.goAway(0);

              var i = _this.errors.indexOf(error);

              _this.errors.splice(i, 1);
            }, delay);
          }
        });
      });
    }
  }, {
    key: "create",
    value: function create(message, allowHtml) {
      if (message.info) {
        this.showNotification(message.info, message.timeout, 'toasted-primary', allowHtml);
      }

      if (message.warn) {
        this.showNotification(message.warn, message.timeout, 'toasted-warning', allowHtml);
      }

      if (message.error) {
        var instance = this.showNotification(message.error, message.timeout, 'toasted-error', allowHtml);
        this.errors.push({
          time: new Date().getTime(),
          instance: instance
        });
      }
    }
  }, {
    key: "showNotification",
    value: function showNotification(content, timeout, classType, allowHtml) {
      var _this2 = this;

      if (this.lastNotification === content) {
        return;
      }

      var notificationObject = this.createToastedObject(timeout);
      this.buildNotificationHtml(notificationObject, content, classType, allowHtml);
      this.$set(this, 'lastNotification', content);
      window.setTimeout(function () {
        _this2.$set(_this2, 'lastNotification', null);
      }, timeout || 5000);
      return notificationObject;
    }
  }, {
    key: "createToastedObject",
    value: function createToastedObject(timeout) {
      return Vue.toasted.show('WILL BE DELETED', {
        position: 'top-center',
        containerClass: 'toast-top-center',
        duration: timeout || 5000
      });
    }
  }, {
    key: "buildNotificationHtml",
    value: function buildNotificationHtml(notificationObject, content, classType, allowHtml) {
      // used to modify vue-toasted notifications to essentials angularjs notifications Html structure
      // (for design purposes)
      var notificationElement = notificationObject.el;
      notificationElement.innerHTML = '';
      notificationElement.classList.remove('toasted-primary');
      notificationElement.classList.add(classType); // close button

      var closeDiv = document.createElement('div');
      var closeButton = document.createElement('button');
      closeButton.classList.add('toast-close-button');
      closeButton.type = 'button';
      closeButton.innerText = '×';

      closeButton.onclick = function () {
        notificationObject.goAway(0);
      };

      closeDiv.append(closeButton);
      notificationElement.append(closeDiv); // title

      var titleDiv = document.createElement('div');
      titleDiv.classList.add('toast-title');
      notificationElement.append(titleDiv); // toast message

      var messageDiv = document.createElement('div');
      messageDiv.classList.add('toast-message');
      var messageInnerDiv = document.createElement('div');

      if (allowHtml) {
        messageInnerDiv.innerHTML = content;
      } else {
        messageInnerDiv.innerText = messageInnerDiv.textContent = content;
      }

      messageDiv.append(messageInnerDiv);
      notificationElement.append(messageDiv); // add style

      notificationElement.style.position = 'absolute';
      notificationElement.style.left = '0';
      notificationElement.style.right = '0';
      notificationElement.style.marginLeft = 'auto';
      notificationElement.style.marginRight = 'auto';
      notificationElement.style.marginTop = '0';
    }
    /**
     * Show toast with HTML content
     *
     * @param message {{type: string, body: string}}
     */

  }, {
    key: "createMessageWithHtml",
    value: function createMessageWithHtml(message) {
      var messageObj = {
        timeout: message.timeout || 5000
      };
      message[message.type || 'info'] = message.body;
      this.create(messageObj, true);
    }
  }, {
    key: "clear",
    value: function clear() {
      Vue.toasted.clear();
    }
  }]);

  return JFrogNotifications;
}();
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/create.js
var create = __webpack_require__("4aa6");
var create_default = /*#__PURE__*/__webpack_require__.n(create);

// CONCATENATED MODULE: ./src/constants/jfrog_ui_lib_events.constants.js
var jfrog_ui_lib_events_constants_events = {
  TABS_REFRESH: 'tabs:refresh',
  TABS_URL_CHANGED: 'tabs:url:changed',
  FORM_CLEAR_FIELD_VALIDATION: 'form:clear:field',
  FORM_SUBMITTED: 'form:submitted',
  CLOSE_MODAL: 'modal:close',
  CLOSE_NOTIFICATIONS: 'notifications:close',
  SIDEBAR_SIZE_CHANGE: 'sidebar:size:change',
  RESET_GRID_PAGINATION: 'reset:grid:pagination',
  TABLEVIEW_HIDE_ACTIONS_DROPDOWN: 'tableview:hide:actions:dropdown',
  CONTEXT_MENU_OPEN: 'context:menu:open',
  WIZARD_TAB_CHANGE: 'wizard:tab:change'
};
/* harmony default export */ var jfrog_ui_lib_events_constants = (jfrog_ui_lib_events_constants_events);
// CONCATENATED MODULE: ./src/services/JFrogEventBusService.js






/**
* Service for components communication
*/

var JFrogEventBusService_JFrogEventBus =
/*#__PURE__*/
function () {
  /**
   * init an empty map
   */

  /* @ngInject */
  function JFrogEventBus() {
    Object(classCallCheck["a" /* default */])(this, JFrogEventBus);

    this.$inject('$timeout', 'JFrogUILibConfig');
    this._listeners = create_default()(null);
    var events = jfrog_ui_lib_events_constants;

    _.extend(events, this.JFrogUILibConfig.getConfig().customEventsDefinition);

    this.eventDef = events;
    var eventNames = {};

    keys_default()(events).forEach(function (key) {
      return eventNames[events[key]] = key;
    });

    this.EVENTS = eventNames;
  }

  Object(createClass["a" /* default */])(JFrogEventBus, [{
    key: "getEventsDefinition",
    value: function getEventsDefinition() {
      return this.eventDef;
    }
  }, {
    key: "_randomId",
    value: function _randomId() {
      return Math.floor(Math.random() * 100000000000 + 1);
    }
    /**
     *
     * push a callback to the event name array is exist.
     * if the event doesn't exist, create this key and
     * init an empty array for it.
     *
     * @param {string / array(string)} eventNames - single event or array of events
     * @param {Function} callback
     * @returns {Deregister} the deregistration function
     */

  }, {
    key: "register",
    value: function register(eventNames, callback) {
      var _this = this;

      if (_.isArray(eventNames)) {
        return eventNames.map(function (eventName) {
          return _this._registerSingleEvent(eventName, callback);
        });
      } else {
        return this._registerSingleEvent(eventNames, callback);
      }
    }
  }, {
    key: "_registerSingleEvent",
    value: function _registerSingleEvent(eventName, callback) {
      var _this2 = this;

      this._verifyEventExists(eventName);

      this.$set(this._listeners, eventName, this._listeners[eventName] || []);
      var listener = {
        _callback: callback,
        _id: this._randomId()
      };

      this._listeners[eventName].push(listener);

      return function () {
        _this2._remove(eventName, listener._id);
      };
    }
    /**
     * Registers a callback and makes sure that it deregisters on scope destroy
     */

  }, {
    key: "registerOnScope",
    value: function registerOnScope(scope, eventNames, callback) {
      var deregisters = this.register(eventNames, callback);
      if (!_.isArray(deregisters)) deregisters = [deregisters];
      scope.$on('$destroy', function () {
        deregisters.forEach(function (deregister) {
          return deregister();
        });
      });
    }
    /**
     *
     * invoke all the callbacks in the array under the
     * event key. throw an error if the event key doesn't
     * exist
     *
     * @param {string} eventName
     */

  }, {
    key: "dispatch",
    value: function dispatch(eventName, payload) {
      this._verifyEventExists(eventName);

      if (this._listeners[eventName]) {
        this._listeners[eventName].forEach(function (listener) {
          return listener._callback(payload);
        });
      }
    }
  }, {
    key: "_verifyEventExists",
    value: function _verifyEventExists(eventName) {
      if (!this.EVENTS || !this.EVENTS[eventName]) throw new Error('There are no events registered under the name ' + eventName);
    }
    /**
     *
     * remove the callback from the array under the
     * event name key if exist.
     * throw an error if the event key doesn't exist
     *
     * @param {string} eventName
     * @param {Number} index
     */

  }, {
    key: "_remove",
    value: function _remove(eventName, id) {
      if (this._listeners[eventName] == 'undefined') {
        throw new Error('This event does not exist');
      }

      if (!_.find(this._listeners[eventName], {
        _id: id
      })) {
        throw new Error('This callback is not registered under this event name');
      }

      _.remove(this._listeners[eventName], function (listener) {
        return listener._id == id;
      });
    }
  }]);

  return JFrogEventBus;
}();
// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__("9224");

// CONCATENATED MODULE: ./src/services/providers/JFrogUiLibConfigProvider.js



var JFrogUiLibConfigProvider_JFrogUILibConfig =
/*#__PURE__*/
function () {
  function JFrogUILibConfig() {
    Object(classCallCheck["a" /* default */])(this, JFrogUILibConfig);

    var buildVersion = package_0.version;
    this.version = buildVersion ? buildVersion : 'UNKNOWN.VERSION';
    this.config = {};
    if (this.version === 'UNKNOWN.VERSION') console.log("%cRunning with unknown version of jfrog-ui-essentials!", "color: #ff0000;");
  }

  Object(createClass["a" /* default */])(JFrogUILibConfig, [{
    key: "$get",
    value: function $get() {
      return this;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      _.extend(this.config, config);
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this.config;
    }
  }]);

  return JFrogUILibConfig;
}();
// CONCATENATED MODULE: ./src/init/MainRunBlock.js
function main() {
  this.$inject('$httpBackend', '$animate'); //$httpBackend.whenPOST(/.*/).passThrough();
  //$httpBackend.whenPUT(/.*/).passThrough();
  //$httpBackend.whenGET(/.*/).passThrough();
  //$httpBackend.whenDELETE(/.*/).passThrough();
  //$httpBackend.whenPATCH(/.*/).passThrough();
  //angular.uppercase was removed in 1.7.0, we polyfill it here, to prevent breakage of 3rd party (ui-grid)

  /*
      angular.uppercase = str => str.toUpperCase();
      tempFixForAnimateParamsReversal(this.$animate);
      initSelectizeConfig();
      initCodemirrorConfig();
  */
}
// CONCATENATED MODULE: ./src/configs/ConfigConfig.js
function ConfigConfig_config() {
  this.$inject('$urlMatcherFactoryProvider');
  this.$urlMatcherFactoryProvider.type('JFrogSubRouterPath', {
    encode: function encode(item) {
      return item;
    },
    decode: function decode(item) {
      return item;
    },
    is: function is(item) {
      return true;
    }
  });
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js
var entries = __webpack_require__("2d1f");
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// CONCATENATED MODULE: ./src/constants/validation.constants.js
/* harmony default export */ var validation_constants = ({
  "required": "This field is mandatory",
  "unique": "This value must be unique",
  "validator": "This value is invalid",
  "email": "Please enter a valid email",
  "url": "Please enter a valid url",
  "number": "Please enter an Integer",
  "min": "Value too low",
  "max": "Value too high",
  "minlength": "Value too short",
  "maxlength": "Value too long",
  "invalidCron": "The cron expression is invalid",
  "pastCron": "The next run time is in the past",
  "uniqueId": "Key is already used",
  "name": "Name cannot be blank or contain /\\:|?*\"<>",
  "xmlName": "Name cannot be blank or contain spaces & special characters",
  "integerValue": "Value must be an integer number",
  "mustAddValueTolist": "You must add a value to list"
});
// EXTERNAL MODULE: ./node_modules/vee-validate/dist/vee-validate.esm.js
var vee_validate_esm = __webpack_require__("7bb1");

// CONCATENATED MODULE: ./src/configs/JfrogUiEssentialsConfig.js






var JfrogUiEssentialsConfig_jfrogUiEssentialsConfig = function jfrogUiEssentialsConfig() {
  var injections = $jfrog.get(['$qProvider', 'JFrogUILibConfigProvider']);
  injections.$qProvider.errorOnUnhandledRejections(false);

  if (window.$$$$jfuieConfig) {
    injections.JFrogUILibConfigProvider.setConfig(window.$$$$jfuieConfig);
    delete window.$$$$jfuieConfig;
  }

  var customMessages = injections.JFrogUILibConfigProvider.getConfig().customValidationMessages || {};
  var customValidationRules = injections.JFrogUILibConfigProvider.getConfig().customValidationRules || {};
  var dict = {
    messages: Object(objectSpread["a" /* default */])({}, validation_constants),
    custom: Object(objectSpread["a" /* default */])({}, customMessages)
  };

  keys_default()(customValidationRules).forEach(function (validationRuleKey) {
    vee_validate_esm["b" /* Validator */].extend(validationRuleKey, customValidationRules[validationRuleKey]);
  });

  vee_validate_esm["b" /* Validator */].extend('customValidations', function (value, args) {
    var obj = args;

    entries_default()(obj).forEach(function (_ref) {
      var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
          errorCode = _ref2[0],
          func = _ref2[1];

      vee_validate_esm["b" /* Validator */].extend(errorCode, function (value, args) {
        return func(value);
      });
    });

    return true;
  });
  vee_validate_esm["b" /* Validator */].localize('en', dict);
};
// CONCATENATED MODULE: ./src/configs/CodeMirrorAsciidocConfig.js








function codeMirrorAsciidocConfig() {
  ///
  /// This is a third party code: https://github.com/asciidoctor/codemirror-asciidoc
  ///
  "use strict";

  CodeMirror.defineMode("asciidoc", function (config, parserConfig) {
    // Ace highlight rules function imported below.
    var HighlightRules = function HighlightRules() {
      var identifierRe = "[a-zA-Z\xA1-\uFFFF]+\\b";
      this.$rules = {
        "start": [{
          token: "empty",
          regex: /$/
        }, {
          token: "literal",
          regex: /^\.{4,}\s*$/,
          next: "listingBlock"
        }, {
          token: "literal",
          regex: /^-{4,}\s*$/,
          next: "literalBlock"
        }, {
          token: "literal",
          regex: /^\+{4,}\s*$/,
          next: "passthroughBlock"
        }, {
          token: "keyword",
          regex: /^={4,}\s*$/
        }, {
          token: "text",
          regex: /^\s*$/
        }, // immediately return to the start mode without matching anything
        {
          token: "empty",
          regex: "",
          next: "dissallowDelimitedBlock"
        }],
        "dissallowDelimitedBlock": [{
          include: "paragraphEnd"
        }, {
          token: "comment",
          regex: '^//.+$'
        }, {
          token: "keyword",
          regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s"
        }, {
          include: "listStart"
        }, {
          token: "literal",
          regex: /^\s+.+$/,
          next: "indentedBlock"
        }, {
          token: "empty",
          regex: "",
          next: "text"
        }],
        "paragraphEnd": [{
          token: "doc.comment",
          regex: /^\/{4,}\s*$/,
          next: "commentBlock"
        }, {
          token: "tableBlock",
          regex: /^\s*[|!]=+\s*$/,
          next: "tableBlock"
        }, // open block, ruler
        {
          token: "keyword",
          regex: /^(?:--|''')\s*$/,
          next: "start"
        }, {
          token: "option",
          regex: /^\[.*\]\s*$/,
          next: "start"
        }, {
          token: "pageBreak",
          regex: /^>{3,}$/,
          next: "start"
        }, {
          token: "literal",
          regex: /^\.{4,}\s*$/,
          next: "listingBlock"
        }, {
          token: "titleUnderline",
          regex: /^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/,
          next: "start"
        }, {
          token: "singleLineTitle",
          regex: /^={1,6}\s+\S.*$/,
          next: "start"
        }, {
          token: "otherBlock",
          regex: /^(?:\*{2,}|_{2,})\s*$/,
          next: "start"
        }, // .optional title
        {
          token: "optionalTitle",
          regex: /^\.[^.\s].+$/,
          next: "start"
        }],
        "listStart": [{
          token: "keyword",
          regex: /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,
          next: "listText"
        }, {
          token: "meta.tag",
          regex: /^.+(?::{2,4}|;;)(?: |$)/,
          next: "listText"
        }, // continuation
        {
          token: "keyword",
          regex: /^\+\s*$/,
          next: "start"
        }],
        "text": [{
          token: ["link", "link"],
          regex: /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/
        }, {
          token: ["link", "link"],
          regex: /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/
        }, {
          token: "link",
          regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/
        }, {
          include: "macros"
        }, {
          include: "paragraphEnd"
        }, {
          token: "literal",
          regex: /\+{3,}/,
          next: "smallPassthrough"
        }, {
          token: "escape",
          regex: /\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/
        }, {
          token: "escape",
          regex: /\\[_*'`+#]|\\{2}[_*'`+#]{2}/
        }, {
          token: "keyword",
          regex: /\s\+$/
        }, // any word
        {
          token: "text",
          regex: identifierRe
        }, {
          token: ["keyword", "string", "keyword"],
          regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/
        }, {
          token: "keyword",
          regex: /<<[\w\d\-$]+,?|>>/
        }, {
          token: "constant.character",
          regex: /\({2,3}.*?\){2,3}/
        }, // List of callouts
        {
          token: "support.function.list.callout",
          regex: /^(?:<\d+>|\d+>|>) /,
          next: "text"
        }, // Anchor
        {
          token: "keyword",
          regex: /\[\[.+?\]\]/
        }, // bibliography
        {
          token: "support",
          regex: /^\[{3}[\w\d =\-]+\]{3}/
        }, {
          include: "quotes"
        }, // text block end
        {
          token: "empty",
          regex: /^\s*$/,
          next: "start"
        }],
        "listText": [{
          include: "listStart"
        }, {
          include: "text"
        }],
        "indentedBlock": [{
          token: "literal",
          regex: /^[\s\w].+$/,
          next: "indentedBlock"
        }, {
          token: "literal",
          regex: "",
          next: "start"
        }],
        "listingBlock": [{
          token: "literal",
          regex: /^\.{4,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "constant.numeric",
          regex: '<\\d+>'
        }, {
          token: "literal",
          regex: '[^<]+'
        }, {
          token: "literal",
          regex: '<'
        }],
        "literalBlock": [{
          token: "literal",
          regex: /^-{4,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "constant.numeric",
          regex: '<\\d+>'
        }, {
          token: "literal",
          regex: '[^<]+'
        }, {
          token: "literal",
          regex: '<'
        }],
        "passthroughBlock": [{
          token: "literal",
          regex: /^\+{4,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "literal",
          regex: identifierRe + "|\\d+"
        }, {
          include: "macros"
        }, {
          token: "literal",
          regex: "."
        }],
        "smallPassthrough": [{
          token: "literal",
          regex: /[+]{3,}/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "literal",
          regex: /^\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "literal",
          regex: identifierRe + "|\\d+"
        }, {
          include: "macros"
        }],
        "commentBlock": [{
          token: "doc.comment",
          regex: /^\/{4,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "doc.comment",
          regex: '^.*$'
        }],
        "tableBlock": [{
          token: "tableBlock",
          regex: /^\s*\|={3,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "tableBlock",
          regex: /^\s*!={3,}\s*$/,
          next: "innerTableBlock"
        }, {
          token: "tableBlock",
          regex: /\|/
        }, {
          include: "text",
          noEscape: true
        }],
        "innerTableBlock": [{
          token: "tableBlock",
          regex: /^\s*!={3,}\s*$/,
          next: "tableBlock"
        }, {
          token: "tableBlock",
          regex: /^\s*|={3,}\s*$/,
          next: "dissallowDelimitedBlock"
        }, {
          token: "tableBlock",
          regex: /\!/
        }],
        "macros": [{
          token: "macro",
          regex: /{[\w\-$]+}/
        }, {
          token: ["text", "string", "text", "constant.character", "text"],
          regex: /({)([\w\-$]+)(:)?(.+)?(})/
        }, {
          token: ["text", "markup.list.macro", "keyword", "string"],
          regex: /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/
        }, {
          token: ["markup.list.macro", "keyword", "string"],
          regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/
        }, {
          token: ["markup.list.macro", "keyword"],
          regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/
        }, {
          token: "keyword",
          regex: /^:.+?:(?= |$)/
        }],
        "quotes": [{
          token: "string.italic",
          regex: /__[^_\s].*?__/
        }, {
          token: "string.italic",
          regex: quoteRule("_")
        }, {
          token: "keyword.bold",
          regex: /\*\*[^*\s].*?\*\*/
        }, {
          token: "keyword.bold",
          regex: quoteRule("\\*")
        }, {
          token: "literal",
          regex: /\+\+[^+\s].*?\+\+/
        }, {
          token: "literal",
          regex: quoteRule("\\+")
        }, {
          token: "literal",
          regex: /\$\$.+?\$\$/
        }, {
          token: "literal",
          regex: quoteRule("\\$")
        }, {
          token: "literal",
          regex: /``[^`\s].*?``/
        }, {
          token: "literal",
          regex: quoteRule("`")
        }, {
          token: "keyword",
          regex: /\^[^\^].*?\^/
        }, {
          token: "keyword",
          regex: quoteRule("\\^")
        }, {
          token: "keyword",
          regex: /~[^~].*?~/
        }, {
          token: "keyword",
          regex: quoteRule("~")
        }, {
          token: "keyword",
          regex: /##?/
        }, {
          token: "keyword",
          regex: /(?:\B|^)``|\b''/
        }]
      };

      function quoteRule(ch) {
        var prefix = /\w/.test(ch) ? "\\b" : "(?:\\B|^)";
        return prefix + ch + "[^" + ch + "].*?" + ch + "(?![\\w*])";
      } //addQuoteBlock("text")


      var tokenMap = {
        macro: "constant.character",
        tableBlock: "doc.comment",
        titleUnderline: "markup.heading",
        singleLineTitle: "markup.heading",
        pageBreak: "string",
        option: "string.regexp",
        otherBlock: "markup.list",
        literal: "support.function",
        optionalTitle: "constant.numeric",
        escape: "constant.language.escape",
        link: "markup.underline.list"
      };

      for (var state in this.$rules) {
        var stateRules = this.$rules[state];

        for (var i = stateRules.length; i--;) {
          var rule = stateRules[i];

          if (rule.include || typeof rule == "string") {
            var args = [i, 1].concat(this.$rules[rule.include || rule]);

            if (rule.noEscape) {
              args = args.filter(function (x) {
                return !x.next;
              });
            }

            stateRules.splice.apply(stateRules, args);
          } else if (rule.token in tokenMap) {
            rule.token = tokenMap[rule.token];
          }
        }
      }
    }; // Ace's Syntax Tokenizer.
    // tokenizing lines longer than this makes editor very slow


    var MAX_TOKEN_COUNT = 1000;

    var Tokenizer = function Tokenizer(rules) {
      this.states = rules;
      this.regExps = {};
      this.matchMappings = {};

      for (var key in this.states) {
        var state = this.states[key];
        var ruleRegExps = [];
        var matchTotal = 0;
        var mapping = this.matchMappings[key] = {
          defaultToken: "text"
        };
        var flag = "g";
        var splitterRurles = [];

        for (var i = 0; i < state.length; i++) {
          var rule = state[i];
          if (rule.defaultToken) mapping.defaultToken = rule.defaultToken;
          if (rule.caseInsensitive) flag = "gi";
          if (rule.regex == null) continue;
          if (rule.regex instanceof RegExp) rule.regex = rule.regex.toString().slice(1, -1); // Count number of matching groups. 2 extra groups from the full match
          // And the catch-all on the end (used to force a match);

          var adjustedregex = rule.regex;
          var matchcount = new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length - 2;

          if (is_array_default()(rule.token)) {
            if (rule.token.length == 1 || matchcount == 1) {
              rule.token = rule.token[0];
            } else if (matchcount - 1 != rule.token.length) {
              throw new Error("number of classes and regexp groups in '" + rule.token + "'\n'" + rule.regex + "' doesn't match\n" + (matchcount - 1) + "!=" + rule.token.length);
            } else {
              rule.tokenArray = rule.token;
              rule.token = null;
              rule.onMatch = this.$arrayTokens;
            }
          } else if (typeof rule.token == "function" && !rule.onMatch) {
            if (matchcount > 1) rule.onMatch = this.$applyToken;else rule.onMatch = rule.token;
          }

          if (matchcount > 1) {
            if (/\\\d/.test(rule.regex)) {
              // Replace any backreferences and offset appropriately.
              adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function (match, digit) {
                return "\\" + (parse_int_default()(digit, 10) + matchTotal + 1);
              });
            } else {
              matchcount = 1;
              adjustedregex = this.removeCapturingGroups(rule.regex);
            }

            if (!rule.splitRegex && typeof rule.token != "string") splitterRurles.push(rule); // flag will be known only at the very end
          }

          mapping[matchTotal] = i;
          matchTotal += matchcount;
          ruleRegExps.push(adjustedregex); // makes property access faster

          if (!rule.onMatch) rule.onMatch = null;
        }

        splitterRurles.forEach(function (rule) {
          rule.splitRegex = this.createSplitterRegexp(rule.regex, flag);
        }, this);
        this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
      }
    };

    (function () {
      this.$setMaxTokenCount = function (m) {
        MAX_TOKEN_COUNT = m | 0;
      };

      this.$applyToken = function (str) {
        var values = this.splitRegex.exec(str).slice(1);
        var types = this.token.apply(this, values); // required for compatibility with old modes

        if (typeof types === "string") return [{
          type: types,
          value: str
        }];
        var tokens = [];

        for (var i = 0, l = types.length; i < l; i++) {
          if (values[i]) tokens[tokens.length] = {
            type: types[i],
            value: values[i]
          };
        }

        return tokens;
      }, this.$arrayTokens = function (str) {
        if (!str) return [];
        var values = this.splitRegex.exec(str);
        if (!values) return "text";
        var tokens = [];
        var types = this.tokenArray;

        for (var i = 0, l = types.length; i < l; i++) {
          if (values[i + 1]) tokens[tokens.length] = {
            type: types[i],
            value: values[i + 1]
          };
        }

        return tokens;
      };

      this.removeCapturingGroups = function (src) {
        var r = src.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function (x, y) {
          return y ? "(?:" : x;
        });
        return r;
      };

      this.createSplitterRegexp = function (src, flag) {
        if (src.indexOf("(?=") != -1) {
          var stack = 0;
          var inChClass = false;
          var lastCapture = {};
          src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function (m, esc, parenOpen, parenClose, square, index) {
            if (inChClass) {
              inChClass = square != "]";
            } else if (square) {
              inChClass = true;
            } else if (parenClose) {
              if (stack == lastCapture.stack) {
                lastCapture.end = index + 1;
                lastCapture.stack = -1;
              }

              stack--;
            } else if (parenOpen) {
              stack++;

              if (parenOpen.length != 1) {
                lastCapture.stack = stack;
                lastCapture.start = index;
              }
            }

            return m;
          });
          if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end))) src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
        }

        return new RegExp(src, (flag || "").replace("g", ""));
      };
      /**
       * Returns an object containing two properties: `tokens`, which contains all the tokens; and `state`, the current state.
       * @returns {Object}
       **/


      this.getLineTokens = function (line, startState) {
        if (startState && typeof startState != "string") {
          var stack = startState.slice(0);
          startState = stack[0];
        } else var stack = [];

        var currentState = startState || "start";
        var state = this.states[currentState];

        if (!state) {
          currentState = "start";
          state = this.states[currentState];
        }

        var mapping = this.matchMappings[currentState];
        var re = this.regExps[currentState];
        re.lastIndex = 0;
        var match,
            tokens = [];
        var lastIndex = 0;
        var token = {
          type: null,
          value: ""
        };

        while (match = re.exec(line)) {
          var type = mapping.defaultToken;
          var rule = null;
          var value = match[0];
          var index = re.lastIndex;

          if (index - value.length > lastIndex) {
            var skipped = line.substring(lastIndex, index - value.length);

            if (token.type == type) {
              token.value += skipped;
            } else {
              if (token.type) tokens.push(token);
              token = {
                type: type,
                value: skipped
              };
            }
          }

          for (var i = 0; i < match.length - 2; i++) {
            if (match[i + 1] === undefined) continue;
            rule = state[mapping[i]];
            if (rule.onMatch) type = rule.onMatch(value, currentState, stack);else type = rule.token;

            if (rule.next) {
              if (typeof rule.next == "string") currentState = rule.next;else currentState = rule.next(currentState, stack);
              state = this.states[currentState];

              if (!state) {
                window.console && console.error && console.error(currentState, "doesn't exist");
                currentState = "start";
                state = this.states[currentState];
              }

              mapping = this.matchMappings[currentState];
              lastIndex = index;
              re = this.regExps[currentState];
              re.lastIndex = index;
            }

            break;
          }

          if (value) {
            if (typeof type == "string") {
              if ((!rule || rule.merge !== false) && token.type === type) {
                token.value += value;
              } else {
                if (token.type) tokens.push(token);
                token = {
                  type: type,
                  value: value
                };
              }
            } else if (type) {
              if (token.type) tokens.push(token);
              token = {
                type: null,
                value: ""
              };

              for (var i = 0; i < type.length; i++) {
                tokens.push(type[i]);
              }
            }
          }

          if (lastIndex == line.length) break;
          lastIndex = index;

          if (tokens.length > MAX_TOKEN_COUNT) {
            // chrome doens't show contents of text nodes with very long text
            while (lastIndex < line.length) {
              if (token.type) tokens.push(token);
              token = {
                value: line.substring(lastIndex, lastIndex += 2000),
                type: "overflow"
              };
            }

            currentState = "start";
            stack = [];
            break;
          }
        }

        if (token.type) tokens.push(token);

        if (stack.length > 1) {
          if (stack[0] !== currentState) stack.unshift(currentState);
        }

        return {
          tokens: tokens,
          state: stack.length ? stack : currentState
        };
      };
    }).call(Tokenizer.prototype); // Token conversion.
    // See <https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode#common-tokens>
    // This is not an exact match nor the best match that can be made.

    var tokenFromAceToken = {
      empty: null,
      text: null,
      // Keyword
      keyword: 'keyword',
      control: 'keyword',
      operator: 'operator',
      // Constants
      constant: 'atom',
      numeric: 'number',
      character: 'atom',
      escape: 'atom',
      // Variables
      variable: 'variable',
      parameter: 'variable-3',
      language: 'variable-2',
      // Python's `self` uses that.
      // Comments
      comment: 'comment',
      line: 'comment',
      'double-slash': 'comment',
      'double-dash': 'comment',
      'number-sign': 'comment',
      percentage: 'comment',
      block: 'comment',
      doc: 'comment',
      // String
      string: 'string',
      quoted: 'string',
      single: 'string',
      double: 'string',
      triple: 'string',
      unquoted: 'string',
      interpolated: 'string',
      regexp: 'string-2',
      meta: 'keyword',
      literal: 'qualifier',
      support: 'builtin',
      // Markup
      markup: 'tag',
      underline: 'link',
      link: 'link',
      strong: 'strong',
      heading: 'header',
      em: 'em',
      list: 'variable-2',
      numbered: 'variable-2',
      unnumbered: 'variable-2',
      quote: 'quote',
      raw: 'variable-2',
      // Markdown's raw block uses that.
      // Invalid
      invalid: 'error',
      illegal: 'invalidchar',
      deprecated: 'error'
    }; // Takes a list of Ace tokens, returns a (string) CodeMirror token.

    var cmTokenFromAceTokens = function cmTokenFromAceTokens(tokens) {
      var token = null;

      for (var i = 0; i < tokens.length; i++) {
        // Find the most specific token.
        if (tokenFromAceToken[tokens[i]] !== undefined) {
          token = tokenFromAceToken[tokens[i]];
        }
      }

      return token;
    }; // Consume a token from plannedTokens.


    var consumeToken = function consumeToken(stream, state) {
      var plannedToken = state.plannedTokens.shift();

      if (plannedToken === undefined) {
        return null;
      }

      stream.match(plannedToken.value);
      var tokens = plannedToken.type.split('.');
      return cmTokenFromAceTokens(tokens);
    };

    var matchToken = function matchToken(stream, state) {
      // Anormal start: we already have planned tokens to consume.
      if (state.plannedTokens.length > 0) {
        return consumeToken(stream, state);
      } // Normal start.


      var currentState = state.current;
      var currentLine = stream.match(/.*$/, false)[0];
      var tokenized = tokenizer.getLineTokens(currentLine, currentState); // We got a {tokens, state} object.
      // Each token is a {value, type} object.

      state.plannedTokens = tokenized.tokens;
      state.current = tokenized.state; // Consume a token.

      return consumeToken(stream, state);
    }; // Initialize all state.


    var aceHighlightRules = new HighlightRules();
    var tokenizer = new Tokenizer(aceHighlightRules.$rules);
    return {
      startState: function startState() {
        return {
          current: 'start',
          // List of {value, type}, with type being an Ace token string.
          plannedTokens: []
        };
      },
      blankLine: function blankLine(state) {
        matchToken('', state);
      },
      token: matchToken
    };
  });
  CodeMirror.defineMIME("text/x-asciidoc", "asciidoc");
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/compileComp.js


var compileComp_Vue = window.Vue;
window.Vue = compileComp_Vue;
function AngularCompileCompServiceMock(template) {
  var _data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parentComp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var props = {};
  var copiedFromParent = {};

  if (parentComp) {
    keys_default()(parentComp.$options.props || {}).forEach(function (prop) {
      props[prop] = parentComp[prop];
    });

    copiedFromParent = lodash_default.a.pick(parentComp.$options, 'methods', 'components');
  }

  var options = lodash_default.a.extend({}, copiedFromParent, {
    template: template,
    router: $jfrog.router,
    data: function data() {
      return lodash_default.a.extend({}, props, _data);
    }
  });

  var parent = (parentComp || {}).$parent;

  while (parent) {
    lodash_default.a.extend(options.components, parent.$options.components);

    parent = parent.$parent;
  }

  return options;
}
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/filter.js
var filter_Vue = window.Vue;
function AngularFilterServiceMock(filterName) {
  return filter_Vue.filter(filterName);
}
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/sanitize.js
var sanitizeHtml = __webpack_require__("cb8f");

function AngularSanitizeServiceMock(content) {
  return sanitizeHtml(content);
}
// EXTERNAL MODULE: ./node_modules/axios/index.js
var node_modules_axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(node_modules_axios);

// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/http.js




var http_AngularHttpProviderMock =
/*#__PURE__*/
function () {
  function AngularHttpProviderMock() {
    Object(classCallCheck["a" /* default */])(this, AngularHttpProviderMock);

    this.interceptors = [];
  }

  Object(createClass["a" /* default */])(AngularHttpProviderMock, [{
    key: "$get",
    value: function $get() {
      return this;
    }
  }]);

  return AngularHttpProviderMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/injector.js

var injector_AngularInjectorServiceMock = function AngularInjectorServiceMock() {
  Object(classCallCheck["a" /* default */])(this, AngularInjectorServiceMock);

  this.get = function () {
    var _$jfrog;

    return (_$jfrog = $jfrog).get.apply(_$jfrog, arguments);
  };
};
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.string.trim-right.js
var es7_string_trim_right = __webpack_require__("7c0e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.string.trim-left.js
var es7_string_trim_left = __webpack_require__("23be");

// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/location.js








var location_AngularLocationProviderMock =
/*#__PURE__*/
function () {
  function AngularLocationProviderMock() {
    var _this = this;

    Object(classCallCheck["a" /* default */])(this, AngularLocationProviderMock);

    this.location = window.location;
    this.updateRouter = true;
    this.$router.beforeEach(function (to, from, next) {
      if (_this.updateRouter) next();
    });
  }

  Object(createClass["a" /* default */])(AngularLocationProviderMock, [{
    key: "$get",
    value: function $get() {
      return this;
    }
  }, {
    key: "hashPrefix",
    value: function hashPrefix(_hashPrefix) {
      console.error('Setting custom hash prefix is not yet supported');
    }
  }, {
    key: "url",
    value: function url(newUrl) {
      var _this2 = this;

      if (!newUrl) {
        return _.trimStart(this.location.hash, '#');
      } else {
        this._update(function () {
          _this2.location.hash = '#' + newUrl;
        });
      }
    }
  }, {
    key: "absUrl",
    value: function absUrl() {
      return this.location.href;
    }
  }, {
    key: "protocol",
    value: function protocol() {
      return _.trimEnd(this.location.protocol, ':');
    }
  }, {
    key: "host",
    value: function host() {
      return this.location.host.split(':')[0];
    }
  }, {
    key: "port",
    value: function port() {
      return parse_int_default()(this.location.host.split(':')[1]);
    }
  }, {
    key: "path",
    value: function path(newPath) {
      var _this3 = this;

      if (!newPath) {
        return this.url().split('#')[0].split('?')[0];
      } else {
        this._update(function () {
          var url = _this3.url();

          var hash = url.split('#')[1] || '';
          var search = url.split('#')[0].split('?')[1] || '';
          _this3.location.hash = '#' + newPath + (search ? '?' + search : '') + (hash ? '#' + hash : '');
        });
      }
    }
  }, {
    key: "search",
    value: function search() {
      var _this4 = this;

      for (var _len = arguments.length, newSearch = new Array(_len), _key = 0; _key < _len; _key++) {
        newSearch[_key] = arguments[_key];
      }

      if (!newSearch.length) {
        var searchObj = {};
        var searchString = this.url().split('#')[0].split('?')[1];

        if (searchString) {
          var searchParts = searchString.split('&');
          searchParts.forEach(function (part) {
            var split = part.split('=');
            searchObj[split[0]] = split[1];
          });
        }

        return searchObj;
      } else {
        var update = function update(obj) {
          var searchParts = [];

          keys_default()(obj).forEach(function (key) {
            searchParts.push("".concat(key, "=").concat(obj[key]));
          });

          var searchStr = searchParts.join('&');

          var hash = _this4.hash();

          var path = _this4.path();

          _this4._update(function () {
            _this4.location.hash = '#' + path + (searchStr ? '?' + searchStr : '') + (hash ? '#' + hash : '');
          });
        };

        if (_.isObject(newSearch[0])) {
          update(newSearch[0]);
        } else if (_.isString(newSearch[0]) && (_.isString(newSearch[1]) || _.isNumber(newSearch[1]))) {
          var _searchObj = this.search();

          _searchObj[newSearch[0]] = newSearch[1];
          update(_searchObj);
        }
      }
    }
  }, {
    key: "hash",
    value: function hash(newHash) {
      var _this5 = this;

      if (newHash === undefined) {
        return this.url().split('#')[1] || '';
      } else {
        this._update(function () {
          _this5.location.hash = '#' + _this5.url().split('#')[0] + (newHash ? '#' + newHash : '');
        });
      }
    }
  }, {
    key: "replace",
    value: function replace() {
      console.error('$location.replace is not currently supported !');
    }
  }, {
    key: "state",
    value: function state() {
      console.error('$location.state is not currently supported !');
      return null;
    }
  }, {
    key: "_update",
    value: function _update(f) {
      this.updateRouter = false;
      f();
      this.$set(this, 'dummy', (this.dummy || 0) + 1);
      this.updateRouter = true;
    }
  }]);

  return AngularLocationProviderMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/resource.js












var resource_$jfrog;
var $q;
var $http;
function AngularResourceServiceMock(url, paramDefaults, actions, options) {
  $q = this.$jfrog.get('$q');
  $http = this.$jfrog.get('$http');
  resource_$jfrog = this.$jfrog;
  return createResourceClass({
    url: url,
    paramDefaults: paramDefaults,
    actions: actions,
    options: options
  });
}

function setupInterceptors() {
  var interceptorsArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var axios = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var interceptorAdapter = function interceptorAdapter(ng1Interceptor) {
    if (!ng1Interceptor) {
      return function () {};
    } else {
      return function (config) {
        if (config.config && config.config.method) config.config.method = config.config.method.toUpperCase();
        if (config.config) config.config.data = config.config.data ? JSON.parse(config.config.data) : null;
        var ret = ng1Interceptor(config);
        if (config.config) ret.config.data = ret.config.data ? stringify_default()(config.config.data) : null;
        return ret;
      };
    }
  };

  interceptorsArray.forEach(function (interceptor) {
    if (interceptor.request || interceptor.requestError) {
      axios.interceptors.request.use(interceptorAdapter(interceptor.request), interceptorAdapter(interceptor.requestError));
    }

    if (interceptor.response || interceptor.responseError) {
      axios.interceptors.response.use(interceptorAdapter(interceptor.response), interceptorAdapter(interceptor.responseError));
    }
  });
}

function createResourceClass(resourceParams) {
  var defaultActions = {
    'get': {
      method: 'GET'
    },
    'save': {
      method: 'POST'
    },
    'query': {
      method: 'GET',
      isArray: true
    },
    'remove': {
      method: 'DELETE'
    },
    'delete': {
      method: 'DELETE'
    }
  };

  var actions = lodash_default.a.extend({}, defaultActions, resourceParams.actions);

  var Resource = function Resource() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object(classCallCheck["a" /* default */])(this, Resource);

    lodash_default.a.extend(this, data);

    keys_default()(actions).forEach(function (actionKey) {
      var action = actions[actionKey];

      _this.constructor.prototype['$' + actionKey] = function () {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        return doAction.bind(_this)(action, params);
      };
    });
  };

  function doAction(action, callParams) {
    var _this2 = this;

    var axios;

    if (this && this.axios) {
      axios = this.axios;
    } else {
      axios = axios_default.a.create();
      if (this) this.axios = axios;
      setupInterceptors($http.interceptors.map(function (i) {
        return resource_$jfrog.get(i);
      }), axios);
      if (action.interceptor) setupInterceptors([action.interceptor], axios);
    }

    var compilation = compilePath(action.url || resourceParams.url, lodash_default.a.extend({}, resourceParams.paramDefaults, action.params), lodash_default.a.extend({}, action.params, (action.method === 'GET' ? callParams[0] : {}) || {}));
    var compiledPath = compilation.compiledPath;
    var requestHasPayload = !lodash_default.a.includes(['GET'], action.method);
    var ownPayload = this && requestHasPayload ? lodash_default.a.pick(this, lodash_default.a.filter(keys_default()(this), function (k) {
      return !k.startsWith('$');
    })) : {};
    var payload = requestHasPayload ? lodash_default.a.merge({}, ownPayload, callParams.length === 2 ? callParams[1] : callParams[0]) : undefined;
    var axiosPromise = axios({
      method: action.method,
      url: compiledPath,
      params: action.method === 'GET' ? compilation.unusedReplacers : {},
      data: payload
    });
    var ret = action.isArray ? [] : {};
    var defer = $q.defer();
    axiosPromise.then(function (response) {
      var data = !action.interceptor ? response.data : response;

      if (action.isArray && !lodash_default.a.isArray(data)) {
        defer.reject('Expected response to be array. Url = ', compiledPath);
      } else if (action.isArray) {
        var _ret;

        data = lodash_default.a.map(data, function (d) {
          var i = new Resource();

          lodash_default.a.extend(i, d);

          return i;
        });
        defer.resolve(data);

        (_ret = ret).splice.apply(_ret, [0, 0].concat(Object(toConsumableArray["a" /* default */])(data)));
      } else {
        var i = new Resource();

        lodash_default.a.extend(i, data);

        if (action.interceptor) i.resource = response.data;
        defer.resolve(i);

        lodash_default.a.extend(ret, data);

        if (_this2) lodash_default.a.extend(_this2, data);
      }
    });

    if (!this) {
      ret.$promise = defer.promise;
    } else {
      ret = defer.promise;
    }

    return ret;
  }

  Resource.prototype.resourceParams = resourceParams;

  keys_default()(actions).forEach(function (actionKey) {
    var action = actions[actionKey];

    Resource[actionKey] = function () {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return doAction(action, params);
    };
  });

  return Resource;
}

function compilePath(pathLayout, pathParams) {
  var paramReplacers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var compiled = pathLayout;
  var replacersUsed = [];

  for (var key in pathParams) {
    var replacer = pathParams[key] || '';

    if (lodash_default.a.isString(replacer) && replacer.startsWith('@')) {
      replacer = paramReplacers[replacer.substr(1)] || '';
      replacersUsed.push(replacer.substr(1));
    }

    compiled = compiled.split(":".concat(key)).join(replacer);
  }

  var emptyParams = compiled.match(/:([0-9|a-z|A-Z]*)/g);

  if (emptyParams) {
    emptyParams.forEach(function (param) {
      if (param.substr(1)) {
        compiled = compiled.split("/".concat(param)).join('');
      }
    });
  }

  return {
    compiledPath: lodash_default.a.trimEnd(compiled, '/'),
    unusedReplacers: lodash_default.a.pick.apply(lodash_default.a, [paramReplacers].concat(Object(toConsumableArray["a" /* default */])(lodash_default.a.filter(keys_default()(paramReplacers), function (k) {
      return !lodash_default.a.includes(replacersUsed, k);
    }))))
  };
}
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/scope.js




var scope_AngularScopeServiceMock = function AngularScopeServiceMock(vueComp) {
  Object(classCallCheck["a" /* default */])(this, AngularScopeServiceMock);

  if (vueComp.$options.ng1_legacy && vueComp.$options.ng1_legacy['controllerAs']) {
    lodash_default.a.extend(this, Object(defineProperty["a" /* default */])({}, vueComp.$options.ng1_legacy['controllerAs'], vueComp));
  } else {
    lodash_default.a.extend(this, vueComp.$data);
  }

  this.$comp = vueComp;

  this.$on = function (msg, callback) {
    switch (msg) {
      case '$destroy':
        {
          vueComp.$$onDestroy = callback;
          break;
        }
    }
  };

  this.$watch = function (expr, callback) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    vueComp.$watch(expr, callback, {
      deep: deep,
      immediate: true
    });
  };

  this.$destroy = function () {
    vueComp.$destroy();
  };

  this.$new = function () {
    var _data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var v = new Vue({
      data: function data() {
        return lodash_default.a.extend({}, _data, vueComp.$data);
      }
    });
    return new AngularScopeServiceMock(v);
  };

  define_property_default()(this, '$parent', {
    get: function get() {
      return vueComp.$parent ? new AngularScopeServiceMock(vueComp.$parent) : null;
    }
  });
};
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/rootScope.js



var rootScope_AngularRootScopeServiceMock =
/*#__PURE__*/
function () {
  function AngularRootScopeServiceMock() {
    Object(classCallCheck["a" /* default */])(this, AngularRootScopeServiceMock);
  }

  Object(createClass["a" /* default */])(AngularRootScopeServiceMock, [{
    key: "$on",
    value: function $on(event, callback) {
      if (event === '$stateChangeStart') {
        this.$router.beforeEach(function (to, from, next) {
          var _preventDefault = false;
          var event = {
            preventDefault: function preventDefault() {
              return _preventDefault = true;
            }
          };
          var toState = to;
          var fromState = to;
          var toParams = to.params;
          var fromParams = from.params;
          callback(event, toState, toParams, fromState, fromParams);
          if (!_preventDefault) next();
        });
      }
    }
  }, {
    key: "$new",
    value: function $new() {
      var _data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var v = new Vue({
        data: function data() {
          return _data;
        }
      });
      return new scope_AngularScopeServiceMock(v);
    }
  }]);

  return AngularRootScopeServiceMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/q.js



var q_AngularQServiceMock =
/*#__PURE__*/
function () {
  function AngularQServiceMock() {
    Object(classCallCheck["a" /* default */])(this, AngularQServiceMock);
  }

  Object(createClass["a" /* default */])(AngularQServiceMock, [{
    key: "$get",
    value: function $get() {
      return {
        defer: function defer() {
          return q_default.a.defer();
        },
        when: function when() {
          return q_default.a.when.apply(q_default.a, arguments);
        }
      };
    }
  }, {
    key: "errorOnUnhandledRejections",
    value: function errorOnUnhandledRejections() {}
  }]);

  return AngularQServiceMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/timeout_and_interval.js
AngularTimeoutServiceMock.cancel = function (handler) {
  clearTimeout(handler);
};

function AngularTimeoutServiceMock(cb) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setTimeout(cb, to);
}

AngularIntervalServiceMock.cancel = function (handler) {
  clearInterval(handler);
};

function AngularIntervalServiceMock(cb) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setInterval(cb, to);
}
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/state.js





var state_AngularStateServiceMock =
/*#__PURE__*/
function () {
  function AngularStateServiceMock() {
    var _this = this;

    Object(classCallCheck["a" /* default */])(this, AngularStateServiceMock);

    this.$stateParams = this.$jfrog.get('$stateParams');

    if (this.$router) {
      this._update();

      this.$router.afterEach(function (to, from) {
        _this._update();
      });
    }
  }

  Object(createClass["a" /* default */])(AngularStateServiceMock, [{
    key: "_update",
    value: function _update() {
      var _this2 = this;

      this.params = this._getFullParams();

      keys_default()(this.$stateParams).forEach(function (key) {
        return delete _this2.$stateParams[key];
      });

      lodash_default.a.extend(this.$stateParams, this.params);

      this.current = this.$router.currentRoute;
    }
  }, {
    key: "_getFullParams",
    value: function _getFullParams() {
      var _this3 = this;

      var params = this.$router.currentRoute.params;
      var queryParams = {};

      if (this.$router && this.$router.currentRoute.meta && this.$router.currentRoute.meta.queryParams) {
        this.$router.currentRoute.meta.queryParams.forEach(function (param) {
          if (_this3.$router.currentRoute.query[param]) {
            queryParams[param] = _this3.$router.currentRoute.query[param];
          }
        });
      }

      return lodash_default.a.extend({}, params, queryParams);
    }
  }, {
    key: "go",
    value: function go(stateName, stateParams) {
      if (stateName === '.') stateName = this.current.name;
      this.$router.push({
        name: stateName,
        params: stateParams
      });
    }
  }]);

  return AngularStateServiceMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/urlMatcherFactory.js


var urlMatcherFactory_AngularUrlMatcherFactoryMock =
/*#__PURE__*/
function () {
  function AngularUrlMatcherFactoryMock() {
    Object(classCallCheck["a" /* default */])(this, AngularUrlMatcherFactoryMock);
  }

  Object(createClass["a" /* default */])(AngularUrlMatcherFactoryMock, [{
    key: "$get",
    value: function $get() {
      return {};
    }
  }, {
    key: "type",
    value: function type() {}
  }]);

  return AngularUrlMatcherFactoryMock;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/compile.js




var compile_Vue = window.Vue;
window.Vue = compile_Vue;
function AngularCompileServiceMock(element) {
  return function (scope) {
    var template = element.outerHTML;
    var controllerAs = scope.$comp.$options.ng1_legacy && scope.$comp.$options.ng1_legacy['controllerAs'];

    if (controllerAs) {
      template = template.replace(new RegExp(controllerAs.replace(/\$/g, '\\$') + '.', 'g'), '');
    }
    /*
            let el = document.createElement('div');
            element.parentNode.replaceChild(el, element);
    */


    var props = {};
    if (scope.$comp.$options.props) keys_default()(scope.$comp.$options.props).forEach(function (prop) {
      props[prop] = scope.$comp[prop];
    });

    var options = lodash_default.a.extend({}, lodash_default.a.pick(scope.$comp.$options, 'methods', 'components'), {
      //            el,
      template: template,
      router: $jfrog.router,
      data: function data() {
        return lodash_default.a.extend({}, props, scope.$comp.$data);
      }
    });

    var parent = scope.$comp.$parent;

    while (parent) {
      lodash_default.a.extend(options.components, parent.$options.components);

      parent = parent.$parent;
    }

    var v = new compile_Vue(options);
    v.$mount();
    element.parentNode.replaceChild(v.$el, element);
    return v;
  };
}
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__("1157");
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// CONCATENATED MODULE: ./src/plugins/JFrogUI/angularjs-mocks/transclude.js




var transclude_Vue = window.Vue;
var transclude_AngularTranscludeServiceMock =
/*#__PURE__*/
function () {
  function AngularTranscludeServiceMock() {
    Object(classCallCheck["a" /* default */])(this, AngularTranscludeServiceMock);
  }

  Object(createClass["a" /* default */])(AngularTranscludeServiceMock, [{
    key: "$get",
    value: function $get() {
      var transcludeFn = function AngularTranscludeServiceMock(component) {
        var cb, scope;

        if (lodash_default.a.isFunction(arguments.length <= 1 ? undefined : arguments[1])) {
          cb = arguments.length <= 1 ? undefined : arguments[1];
        } else if (lodash_default.a.isFunction(arguments.length <= 2 ? undefined : arguments[2])) {
          scope = arguments.length <= 1 ? undefined : arguments[1];
          cb = arguments.length <= 2 ? undefined : arguments[2];
        }

        if (cb) {
          var el = document.createElement('div');

          if (scope && scope.$comp !== component.$parent) {
            console.error('Passing a scope to $transclude is not currently supported!');
          }

          var v = new transclude_Vue({
            el: el,
            render: function render(h, context) {
              return component.$slots.default[0];
            }
          });
          cb(jquery_default()(v.$el), v);
        }
      };

      transcludeFn.isSlotFilled = function (slotName) {
        return !!transcludeFn.$comp.$slots[lodash_default.a.kebabCase(slotName)];
      };

      return transcludeFn;
    }
  }]);

  return AngularTranscludeServiceMock;
}();
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/construct.js + 1 modules
var construct = __webpack_require__("9a04");

// CONCATENATED MODULE: ./src/plugins/JFrogUI/DependencyInjectionManager.js














var DependencyInjectionManager_Vue = window.Vue;
var DependencyInjectionManager_DependencyInjectionManager =
/*#__PURE__*/
function () {
  function DependencyInjectionManager() {
    Object(classCallCheck["a" /* default */])(this, DependencyInjectionManager);

    this.injectables = {};
    this.registeredInjectables = [];
    this.servicesClientsMap = {};
    this.configs = {};
    this.InjectableTypes = {
      SERVICE: 'service',
      CONSTRUCTOR: 'constructor',
      AUTO_CONSTRUCTOR: 'autoConstructor',
      FACTORY: 'factory',
      PROVIDER: 'provider',
      FUNCTION: 'function',
      DATA: 'data',
      CONSTANT: 'constant'
    };
  }

  Object(createClass["a" /* default */])(DependencyInjectionManager, [{
    key: "setRouter",
    value: function setRouter(router) {
      this.router = router;
    }
  }, {
    key: "registerService",
    value: function registerService(name, _class) {
      this.registerInjectable({
        type: this.InjectableTypes.SERVICE,
        name: name,
        class: _class
      });
    }
  }, {
    key: "registerConstructor",
    value: function registerConstructor(name, _class) {
      this.registerInjectable({
        type: this.InjectableTypes.CONSTRUCTOR,
        name: name,
        class: _class
      });
    }
  }, {
    key: "registerAutoConstructor",
    value: function registerAutoConstructor(name, _class) {
      this.registerInjectable({
        type: this.InjectableTypes.AUTO_CONSTRUCTOR,
        name: name,
        class: _class
      });
    }
  }, {
    key: "registerFactory",
    value: function registerFactory(name, func) {
      this.registerInjectable({
        type: this.InjectableTypes.FACTORY,
        name: name,
        function: func
      });
    }
  }, {
    key: "registerConfig",
    value: function registerConfig(name, func) {
      var _this = this;

      var thisObj = {
        $inject: function $inject() {
          for (var _len = arguments.length, injections = new Array(_len), _key = 0; _key < _len; _key++) {
            injections[_key] = arguments[_key];
          }

          _this.injectProvidersOn.apply(_this, [thisObj].concat(injections));
        }
      };
      this.configs[name] = func.bind(thisObj);
    }
  }, {
    key: "registerRunBlock",
    value: function registerRunBlock(name, func) {
      var _this2 = this;

      var thisObj = {
        $inject: function $inject() {
          for (var _len2 = arguments.length, injections = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            injections[_key2] = arguments[_key2];
          }

          _this2.injectOn.apply(_this2, [thisObj].concat(injections));
        }
      };
      this.configs[name] = func.bind(thisObj);
    }
  }, {
    key: "registerProvider",
    value: function registerProvider(name, func) {
      this.registerInjectable({
        type: this.InjectableTypes.PROVIDER,
        name: name,
        function: func
      });
    }
  }, {
    key: "registerFunction",
    value: function registerFunction(name, func) {
      this.registerInjectable({
        type: this.InjectableTypes.FUNCTION,
        name: name,
        function: func
      });
    }
  }, {
    key: "registerData",
    value: function registerData(name, data) {
      this.registerInjectable({
        type: this.InjectableTypes.DATA,
        name: name,
        data: data
      });
    }
  }, {
    key: "registerConstant",
    value: function registerConstant(name, constant) {
      this.registerInjectable({
        type: this.InjectableTypes.CONSTANT,
        name: name,
        constant: constant
      });
    }
  }, {
    key: "registerInjectable",
    value: function registerInjectable(descriptor) {
      if (!descriptor.type || !lodash_default.a.includes(lodash_default.a.values(this.InjectableTypes), descriptor.type)) {
        console.error('DI: Wrong or missing injectable type', descriptor.type);
        return;
      }

      if (!descriptor.name) {
        console.error('DI: Missing name for injectable');
        return;
      }

      if (this.injectables[descriptor.name]) {
        console.error('DI: Already registered injectable with name: ', descriptor.name);
        return;
      }

      this.registeredInjectables.push(descriptor);
    }
  }, {
    key: "get",
    value: function get(injectable) {
      var _this3 = this;

      if (lodash_default.a.isArray(injectable)) {
        var injections = {};
        injectable.forEach(function (injectable) {
          injections[injectable] = _this3.get(injectable);
        });
        return injections;
      } else {
        if (injectable.endsWith('Provider')) return this.getProvider(injectable);
      }

      var injection = null;

      if (this.injectables[injectable]) {
        if (this.injectables[injectable].$new) {
          injection = this.injectables[injectable].$new();
        }

        if (this.injectables[injectable].$get) {
          injection = this.injectables[injectable].$get();
        } else if (this.injectables[injectable].$init) {
          this.injectables[injectable].$init();
          injection = this.injectables[injectable];
        } else if (this.injectables[injectable].$factoryFunc) {
          var thisObj = {
            $inject: function $inject() {
              for (var _len3 = arguments.length, injections = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                injections[_key3] = arguments[_key3];
              }

              _this3.injectOn.apply(_this3, [thisObj].concat(injections));
            }
          };
          var f = this.injectables[injectable].$factoryFunc.bind(thisObj);
          injection = f();
        } else if (this.injectables[injectable].$provider) {
          var inst = new this.injectables[injectable].$provider();
          this.injectables[injectable] = {
            $get: inst.$get.bind(inst),
            $provider: inst
          };
          injection = this.injectables[injectable].$get();
        } else {
          injection = this.injectables[injectable];
        }
      }

      return injection;
    }
  }, {
    key: "getProvider",
    value: function getProvider(injectable) {
      if (!injectable.endsWith('Provider')) {
        console.error('Provider injections should end with "Provider"');
      } else {
        injectable = injectable.substr(0, injectable.length - 'Provider'.length);
        var injection = null;

        if (this.injectables[injectable]) {
          if (this.injectables[injectable].$provider && this.injectables[injectable].$provider.prototype) {
            this._injectDefaultInjections(this.injectables[injectable].$provider.prototype);

            var inst = new this.injectables[injectable].$provider();

            this._makeInjectableReactive(inst, injectable);

            this.injectables[injectable] = {
              $get: inst.$get.bind(inst),
              $provider: inst
            };
            injection = this.injectables[injectable].$provider;
          }

          if (this.injectables[injectable].$get) {
            injection = this.injectables[injectable].$provider;
          } else {
            console.error('Injectable is not legal in config blocks: ' + injectable + 'Provider');
          }
        } else {
          console.error('Unknown Provider Injection: ' + injectable + 'Provider');
        }

        return injection;
      }
    }
  }, {
    key: "injectServicesToComponent",
    value: function injectServicesToComponent(component) {
      var _this4 = this;

      if (component.$options['jf@inject']) {
        var injections = component.$options['jf@inject'];
        if (lodash_default.a.isString(injections)) injections = injections.split(',');
        injections.forEach(function (injection) {
          injection = injection.trim();

          if (_this4.injectables[injection]) {
            if (component.$store && !_this4.injectables[injection].$store && injection !== '$stateParams') {
              _this4.injectables[injection].$store = component.$store;
            }

            if (injection !== '$stateParams') {
              var injectee = _this4.injectables[injection];
              if (injectee.$provider && injectee.$provider.prototype) injectee = injectee.$provider.prototype;
              if (!injectee) console.log(injection);

              if (!injectee.$jfrog) {
                injectee.$jfrog = DependencyInjectionManager_Vue.prototype.$jfrog;
                var router = _this4.router;
                injectee.$router = router;

                define_property_default()(injectee, '$route', {
                  get: function get() {
                    return router.currentRoute;
                  }
                });
              }
            }

            if (injection === '$scope') {
              component[injection] = _this4.injectables[injection].$new(component);
            } else if (injection === '$transclude') {
              var $transclude = _this4.get(injection);

              $transclude.$comp = component;

              component[injection] = function () {
                for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  args[_key4] = arguments[_key4];
                }

                $transclude.apply(void 0, [component].concat(args));
              };

              keys_default()($transclude).forEach(function (key) {
                return component[injection][key] = $transclude[key];
              });
            } else {
              component[injection] = _this4.get(injection);
            }

            if (!_this4.servicesClientsMap[injection]) _this4.servicesClientsMap[injection] = [];

            if (!lodash_default.a.includes(_this4.servicesClientsMap[injection], component)) {
              _this4.servicesClientsMap[injection].push(component);
            }
          } else {
            if (injection !== '$element') {
              console.error('Unknown Injection: ' + injection);
            }
          }
        });
      }
    }
  }, {
    key: "injectOn",
    value: function injectOn(obj) {
      var _this5 = this;

      for (var _len5 = arguments.length, injections = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        injections[_key5 - 1] = arguments[_key5];
      }

      if (injections.length === 1) {
        injections = injections[0];
      }

      if (lodash_default.a.isString(injections)) injections = injections.split(',');
      injections.forEach(function (injection) {
        obj[injection] = _this5.get(injection);
      });
    }
  }, {
    key: "injectProvidersOn",
    value: function injectProvidersOn(obj) {
      var _this6 = this;

      for (var _len6 = arguments.length, injections = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        injections[_key6 - 1] = arguments[_key6];
      }

      if (injections.length === 1) {
        injections = injections[0];
      }

      if (lodash_default.a.isString(injections)) injections = injections.split(',');
      injections.forEach(function (injection) {
        obj[injection] = _this6.getProvider(injection);
      });
    }
  }, {
    key: "prepareInjectables",
    value: function prepareInjectables() {
      var _this7 = this;

      var dim = this;

      var services = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.SERVICE
      });

      services.forEach(function (serviceDescriptor) {
        if (serviceDescriptor.name === '$stateParams') {
          _this7.injectables[serviceDescriptor.name] = {};
        } else {
          _this7.injectables[serviceDescriptor.name] = {
            $init: function $init() {
              var Class = serviceDescriptor.class;

              _this7._injectDefaultInjections(Class.prototype);

              var serviceInstance = new Class();

              _this7._makeInjectableReactive(serviceInstance, serviceDescriptor.name);

              _this7.injectables[serviceDescriptor.name] = serviceInstance;
            }
          };
        }
      });

      var constructors = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.CONSTRUCTOR
      });

      constructors.forEach(function (constructorDescriptor) {
        _this7.injectables[constructorDescriptor.name] = constructorDescriptor.class;
      });

      var autoConstructors = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.AUTO_CONSTRUCTOR
      });

      autoConstructors.forEach(function (autoConstructorDescriptor) {
        var AutoConstructor = autoConstructorDescriptor.class;
        _this7.injectables[autoConstructorDescriptor.name] = {
          $new: function $new() {
            for (var _len7 = arguments.length, params = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              params[_key7] = arguments[_key7];
            }

            return Object(construct["a" /* default */])(AutoConstructor, params);
          }
        };
      });

      var factories = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.FACTORY
      });

      factories.forEach(function (factoryDescriptor) {
        _this7.injectables[factoryDescriptor.name] = {
          $factoryFunc: factoryDescriptor.function
        };
      });

      var providers = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.PROVIDER
      });

      providers.forEach(function (providerDescriptor) {
        _this7.injectables[providerDescriptor.name] = {
          $provider: providerDescriptor.function
        };
      });

      var functions = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.FUNCTION
      });

      functions.forEach(function (functionDescriptor) {
        _this7.injectables[functionDescriptor.name] = functionDescriptor.function;
      });

      var constants = lodash_default.a.filter(this.registeredInjectables, {
        type: this.InjectableTypes.CONSTANT
      });

      constants.forEach(function (constantDescriptor) {
        _this7.injectables[constantDescriptor.name] = constantDescriptor.constant;
      });
    }
  }, {
    key: "onComponentDestruction",
    value: function onComponentDestruction(comp) {
      var _this8 = this;

      keys_default()(this.servicesClientsMap).forEach(function (injectable) {
        var comps = _this8.servicesClientsMap[injectable];

        lodash_default.a.remove(comps, function (c) {
          return c === comp;
        });
      });
    }
  }, {
    key: "runConfigs",
    value: function runConfigs() {
      lodash_default.a.values(this.configs).forEach(function (func) {
        func();
      });
    }
  }, {
    key: "_injectDefaultInjections",
    value: function _injectDefaultInjections(injectee) {
      var dim = this;

      if (!injectee.$jfrog) {
        injectee.$jfrog = DependencyInjectionManager_Vue.prototype.$jfrog;

        injectee.$inject = function () {
          for (var _len8 = arguments.length, injections = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            injections[_key8] = arguments[_key8];
          }

          dim.injectOn.apply(dim, [this].concat(injections));
        };

        var router = this.router;
        injectee.$router = router;

        define_property_default()(injectee, '$route', {
          get: function get() {
            return router.currentRoute;
          }
        });

        injectee.$set = DependencyInjectionManager_Vue.set.bind(DependencyInjectionManager_Vue);
        injectee.$delete = DependencyInjectionManager_Vue.delete.bind(DependencyInjectionManager_Vue);
      }
    }
  }, {
    key: "_makeInjectableReactive",
    value: function _makeInjectableReactive(serviceInstance, serviceName) {
      if (!serviceInstance.$reactive) return;
      var dim = this;
      var vue = new DependencyInjectionManager_Vue({
        data: function data() {
          return {
            serviceInstance: serviceInstance
          };
        },
        watch: {
          serviceInstance: {
            handler: function handler(n, o) {
              var clients = dim.servicesClientsMap[serviceName];
              if (clients) clients.forEach(function (cl) {
                cl.$forceUpdate();
              });
            },
            deep: true
          }
        }
      });
      serviceInstance.$reactive = true;
    }
  }]);

  return DependencyInjectionManager;
}();
// CONCATENATED MODULE: ./src/plugins/JFrogUI/index.js





























var JFrogUI_$jfrog;
var JFrogUI_dim = new DependencyInjectionManager_DependencyInjectionManager();
var JFrogUI = {
  install: function install(Vue, options) {
    var _this = this;

    var plugin = this;
    this.dim = JFrogUI_dim;
    this.dim.setRouter(options.router);
    Vue.use(vee_validate_esm["c" /* default */], {
      fieldsBagName: 'veeFields',
      validity: true
    });
    Vue.prototype.$jfrog = window.$jfrog = JFrogUI_$jfrog = {
      apiRoot: plugin.$apiRoot,
      get: function get(injectable) {
        return _this.dim.get(injectable);
      },
      getProvider: function getProvider(injectable) {
        return _this.dim.getProvider(injectable);
      },
      injectOn: function injectOn(obj) {
        var _this$dim;

        for (var _len = arguments.length, injections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          injections[_key - 1] = arguments[_key];
        }

        return (_this$dim = _this.dim).injectOn.apply(_this$dim, [obj].concat(injections));
      },
      router: JFrogUI.dim.router
    };

    Vue.prototype.$filterArray = function (array, filterBy) {
      return lodash_default.a.filter(array, function (item) {
        if (lodash_default.a.isString(filterBy) && lodash_default.a.isString(item)) {
          return item.indexOf(filterBy) !== -1;
        } else if (lodash_default.a.isString(filterBy) && lodash_default.a.isObject(item)) {
          var match = false;

          lodash_default.a.forEach(lodash_default.a.values(item), function (val) {
            if (lodash_default.a.isString(val) && val.indexOf(filterBy) !== -1) {
              match = true;
              return false;
            }
          });

          return match;
        } else if (lodash_default.a.isObject(filterBy) && lodash_default.a.isObject(item)) {
          var recursiveMatchFinder = function recursiveMatchFinder(obj, filterObj) {
            var match = true;

            lodash_default.a.forEach(lodash_default.a.entries(obj), function (_ref) {
              var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
                  key = _ref2[0],
                  val = _ref2[1];

              if (filterObj[key]) {
                if (!lodash_default.a.isObject(filterObj[key]) && !lodash_default.a.isObject(val)) {
                  if ((val + '').indexOf(filterObj[key]) === -1) {
                    match = false;
                    return false;
                  }
                } else {
                  match = recursiveMatchFinder(val, filterObj[key]);
                  if (!match) return false;
                }
              }
            });

            return match;
          };

          return recursiveMatchFinder(item, filterBy);
        }
      });
    };

    createInjectables();
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        //                this.$options.appMountedMethods = this.$options.mounted.slice(1);
        //                this.$options.mounted = [this.$options.mounted[0]];
        if (plugin.angularjsMockMode) {
          if (this.$options.ng1_legacy && this.$options.ng1_legacy['ng1compileFn']) {
            handleCompileFunction.bind(this)();
          }

          if (this.$options.ng1_legacy && this.$options.ng1_legacy['controllerAs']) {
            this[this.$options.ng1_legacy['controllerAs']] = this;
          }
        }
      },
      created: function created() {
        plugin.dim.injectServicesToComponent(this);
      },
      beforeMount: function beforeMount() {
        if (plugin.angularjsMockMode) {
          if (this.$options.ng1_legacy && this.$options.ng1_legacy.ng1preLinkFn) {
            var attrs = {};
            [this.$props, this.$listeners].forEach(function (obj) {
              lodash_default.a.entries(obj).forEach(function (entry) {
                define_property_default()(attrs, lodash_default.a.camelCase(entry[0]), {
                  get: function get() {
                    return entry[1];
                  }
                });
              });
            });
            this.$options.ng1_legacy.ng1preLinkFn(this.$scope || new scope_AngularScopeServiceMock(this), jquery_default()(this.$el), attrs, this);
          }
        }
      },
      mounted: function mounted() {
        var _this2 = this;

        if (plugin.angularjsMockMode) {
          this.$element = jquery_default()(this.$el);
          var linkCtrlParam = this;

          if (this.$options.ng1_legacy && this.$options.ng1_legacy.require) {
            linkCtrlParam = handleNg1Require.bind(this)();
          }

          if (this.$options.appMountedMethods) {
            this.$options.appMountedMethods.forEach(function (method) {
              return method.bind(_this2)();
            });
          }

          if (this.$options.ng1_legacy && this.$options.ng1_legacy.ng1postLinkFn) {
            var attrs = {};
            [this.$props, this.$listeners].forEach(function (obj) {
              lodash_default.a.entries(obj).forEach(function (entry) {
                define_property_default()(attrs, lodash_default.a.camelCase(entry[0]), {
                  get: function get() {
                    return entry[1];
                  }
                });
              });
            });
            this.$options.ng1_legacy.ng1postLinkFn(this.$scope || new scope_AngularScopeServiceMock(this), jquery_default()(this.$el), attrs, linkCtrlParam);
          }
        }
      },
      beforeDestroy: function beforeDestroy() {
        plugin.dim.onComponentDestruction();
        if (this.$$onDestroy) this.$$onDestroy();
      }
    });

    function handleNg1Require() {
      var _this3 = this;

      var require = this.$options.ng1_legacy.require;
      var linkCtrlParam = this;

      var perString = function perString(require) {
        var clean = lodash_default.a.trim(require, '^');

        var kebab = lodash_default.a.kebabCase(clean);

        var ret;

        if (require.startsWith('^^')) {
          if (kebab !== _this3.$parent.$options.name) {
            console.error("Component '".concat(kebab, "', required by component '").concat(_this3.$options.name, "', can't be found!"));
          } else {
            ret = _this3.$parent;
          }
        } else if (require.startsWith('^')) {
          if (kebab !== _this3.$parent.$options.name && kebab !== _this3.$options.name) {
            console.error("Component '".concat(kebab, "', required by component '").concat(_this3.$options.name, "', can't be found!"));
          } else {
            ret = kebab === _this3.$options.name ? _this3 : _this3.$parent;
          }
        } else {
          if (kebab !== _this3.$options.name) {
            console.error("Component '".concat(kebab, "', required by component '").concat(_this3.$options.name, "', can't be found!"));
          } else {
            ret = _this3;
          }
        }

        return ret;
      };

      if (lodash_default.a.isString(require)) {
        linkCtrlParam = perString(require) || this;
      } else if (lodash_default.a.isArray(require)) {
        linkCtrlParam = [];

        require.forEach(function (r) {
          return linkCtrlParam.push(perString(r));
        });
      } else if (lodash_default.a.isObject(require)) {
        linkCtrlParam = {};

        keys_default()(require).forEach(function (k) {
          var ctrl = perString(require[k]);
          linkCtrlParam[k] = ctrl;
          _this3[k] = ctrl;
        });
      }

      return linkCtrlParam;
    }

    function handleCompileFunction() {
      var _this4 = this;

      var ngCompile = this.$options.ng1_legacy['ng1compileFn'];
      var attrs = {};
      var tElem = jquery_default()("<div>".concat(lodash_default.a.trim(this.$options.template), "</div>"));

      if (this.$parent && this.$parent.$options.template) {
        var tParent = jquery_default()("<div>".concat(lodash_default.a.trim(this.$parent.$options.template), "</div>"));
        var selfs = tParent.find(this.$options.name);

        var thisInstanceIndex = lodash_default.a.filter(this.$parent.$children, {
          $options: {
            name: this.$options.name
          }
        }).indexOf(this);

        lodash_default.a.forEach(selfs[thisInstanceIndex].attributes, function (attr) {
          var THIS = _this4;

          var propName = lodash_default.a.camelCase(lodash_default.a.trim(attr.name, ':@'));

          define_property_default()(attrs, propName, {
            get: function get() {
              return attr.value;
            },
            set: function set(newExpression) {
              define_property_default()(THIS, propName, {
                get: function get() {
                  return lodash_default.a.get(THIS.$parent, newExpression);
                }
              });
            }
          });
        });
      }

      var transcludeFn = JFrogUI_dim.get('$transclude');
      var response = ngCompile(tElem, attrs, function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        transcludeFn.apply(void 0, [_this4].concat(args));
      });

      if (lodash_default.a.isFunction(response)) {
        this.$options.ng1_legacy = this.$options.ng1_legacy || {};
        this.$options.ng1_legacy.ng1postLinkFn = response;
      } else if (lodash_default.a.isObject(response)) {
        this.$options.ng1_legacy = this.$options.ng1_legacy || {};
        this.$options.ng1_legacy.ng1preLinkFn = response.pre;
        this.$options.ng1_legacy.ng1postLinkFn = response.post;
      }

      this.$options.template = tElem[0].innerHTML;
    }

    function createInjectables() {
      if (plugin.angularjsMockMode) {
        registerAngularjsMocks();
      }

      plugin.dim.prepareInjectables();
      plugin.dim.runConfigs();
    }

    function registerAngularjsMocks() {
      plugin.dim.registerProvider('$location', location_AngularLocationProviderMock);
      plugin.dim.registerProvider('$http', http_AngularHttpProviderMock);
      plugin.dim.registerProvider('$transclude', transclude_AngularTranscludeServiceMock);
      plugin.dim.registerProvider('$q', q_AngularQServiceMock);
      plugin.dim.registerProvider('$urlMatcherFactory', urlMatcherFactory_AngularUrlMatcherFactoryMock);
      plugin.dim.registerService('$rootScope', rootScope_AngularRootScopeServiceMock);
      plugin.dim.registerService('$state', state_AngularStateServiceMock);
      plugin.dim.registerService('$injector', injector_AngularInjectorServiceMock);
      plugin.dim.registerService('$stateParams', {});
      plugin.dim.registerAutoConstructor('$scope', scope_AngularScopeServiceMock);
      plugin.dim.registerFunction('$resource', AngularResourceServiceMock);
      plugin.dim.registerFunction('$compile', AngularCompileServiceMock);
      plugin.dim.registerFunction('$compileComp', AngularCompileCompServiceMock);
      plugin.dim.registerFunction('$timeout', AngularTimeoutServiceMock);
      plugin.dim.registerFunction('$interval', AngularIntervalServiceMock);
      plugin.dim.registerFunction('$filter', AngularFilterServiceMock);
      plugin.dim.registerFunction('$sanitize', AngularSanitizeServiceMock);
    }

    if (plugin.angularjsMockMode) {
      Vue.directive('init', {
        bind: function bind(el, binding, vnode) {
          var functionName = binding.expression.split('(')[0].trim();

          if (!lodash_default.a.has(vnode.context, functionName) && !lodash_default.a.get(vnode.context, functionName)) {
            console.error('v-init: Method does not exist: ' + functionName);
          } else {
            lodash_default.a.get(vnode.context, functionName)();
          }
        }
      });
    }
  },
  // Main plugin object interface
  registerServices: function registerServices(services) {
    lodash_default.a.entries(services).forEach(function (entry) {
      JFrogUI_dim.registerService(entry[0], entry[1]);
    });
  },
  registerConstructors: function registerConstructors(constructors) {
    lodash_default.a.entries(constructors).forEach(function (entry) {
      JFrogUI_dim.registerConstructor(entry[0], entry[1]);
    });
  },
  registerAutoConstructors: function registerAutoConstructors(autoConstructors) {
    lodash_default.a.entries(autoConstructors).forEach(function (entry) {
      JFrogUI_dim.registerAutoConstructor(entry[0], entry[1]);
    });
  },
  registerFactories: function registerFactories(factories) {
    lodash_default.a.entries(factories).forEach(function (entry) {
      JFrogUI_dim.registerFactory(entry[0], entry[1]);
    });
  },
  registerConfigs: function registerConfigs(configs) {
    lodash_default.a.entries(configs).forEach(function (entry) {
      JFrogUI_dim.registerConfig(entry[0], entry[1]);
    });
  },
  registerRunBlocks: function registerRunBlocks(runs) {
    lodash_default.a.entries(runs).forEach(function (entry) {
      JFrogUI_dim.registerRunBlock(entry[0], entry[1]);
    });
  },
  registerProviders: function registerProviders(providers) {
    lodash_default.a.entries(providers).forEach(function (entry) {
      JFrogUI_dim.registerProvider(entry[0], entry[1]);
    });
  },
  registerFunctions: function registerFunctions(functions) {
    lodash_default.a.entries(functions).forEach(function (entry) {
      JFrogUI_dim.registerFunction(entry[0], entry[1]);
    });
  },
  registerConstants: function registerConstants(constants) {
    lodash_default.a.entries(constants).forEach(function (entry) {
      JFrogUI_dim.registerConstant(entry[0], entry[1]);
    });
  },
  mockAngularJS: function mockAngularJS() {
    this.angularjsMockMode = true;
  },
  setAPIRoot: function setAPIRoot(apiRoot) {
    this.$apiRoot = apiRoot;
  } // End of main plugin object interface

};
/* harmony default export */ var plugins_JFrogUI = (JFrogUI);

// CONCATENATED MODULE: ./src/servicesRegistration.js
























var servicesRegistration = {
  registerConfigs: function registerConfigs() {
    return plugins_JFrogUI.registerConfigs({
      jfrogUiEssentialsConfig: JfrogUiEssentialsConfig_jfrogUiEssentialsConfig,
      codeMirrorAsciidocConfig: codeMirrorAsciidocConfig,
      config: ConfigConfig_config
    });
  },
  registerRunBlocks: function registerRunBlocks() {
    return plugins_JFrogUI.registerRunBlocks({
      main: main
    });
  },
  registerProviders: function registerProviders() {
    return plugins_JFrogUI.registerProviders({
      JFrogUILibConfig: JFrogUiLibConfigProvider_JFrogUILibConfig
    });
  },
  registerServices: function registerServices() {
    return plugins_JFrogUI.registerServices({
      JFrogEventBus: JFrogEventBusService_JFrogEventBus,
      JFrogNotifications: JFrogNotificationsService_JFrogNotifications,
      JFrogUIUtils: JFrogUiUtilsService_JFrogUIUtils,
      AdvancedStringMatch: AdvancedStringMatchService_AdvancedStringMatch,
      ContextMenuService: ContextMenuServiceService_ContextMenuService,
      JfFullTextService: JfFullTextServiceService_JfFullTextService,
      JFrogSubRouter: JFrogSubRouterService_JFrogSubRouter,
      JFrogGridFactory: JFrogGridFactoryService_JFrogGridFactory,
      JFrogModal: JFrogModalService_JFrogModal,
      JFrogUploaderFactory: JFrogUploaderFactoryService_JFrogUploaderFactory
    });
  },
  registerFactories: function registerFactories() {
    return plugins_JFrogUI.registerFactories({
      JFrogDownload: JFrogDownload,
      JFrogIFrameDownload: JFrogIFrameDownload,
      WebWorkersPool: WebWorkersPoolFactory_WebWorkersPool,
      recursiveDirective: RecursiveDirectiveFactory_recursiveDirective,
      JFrogUIWebWorker: JFrogUiWebWorkerFactory_JFrogUIWebWorker,
      JFrogUIModelSaverFactory: JFrogUIModelSaverFactory,
      JFrogTableViewOptions: JFrogTableViewOptions,
      JFTreeApi: JFTreeApi
    });
  },
  registerConstants: function registerConstants() {
    return plugins_JFrogUI.registerConstants({});
  },
  registerAll: function registerAll() {
    servicesRegistration.registerConfigs();
    servicesRegistration.registerRunBlocks();
    servicesRegistration.registerProviders();
    servicesRegistration.registerServices();
    servicesRegistration.registerFactories();
    servicesRegistration.registerConstants();
  }
};
// CONCATENATED MODULE: ./src/plugins/JFrogUI/Ng1AttributeDirectiveAdapter.js









var Ng1AttributeDirectiveAdapter_Vue = window.Vue;
var Ng1AttributeDirectiveAdapter_Ng1AttributeDirectiveAdapter =
/*#__PURE__*/
function () {
  function Ng1AttributeDirectiveAdapter() {
    Object(classCallCheck["a" /* default */])(this, Ng1AttributeDirectiveAdapter);
  }

  Object(createClass["a" /* default */])(Ng1AttributeDirectiveAdapter, null, [{
    key: "patchLinkFunction",
    value: function patchLinkFunction(linkFn, scopeDef) {
      return function (el, binding, vnode) {
        var scope;

        if (scopeDef) {
          scope = {};

          lodash_default.a.entries(scopeDef).forEach(function (entry) {
            if (entry[0] === lodash_default.a.camelCase(binding.name)) {
              if (entry[1] === '=' || binding.modifiers.bind) {
                define_property_default()(scope, entry[0], {
                  get: function get() {
                    return lodash_default.a.get(vnode.context, binding.expression);
                  }
                });
              } else {
                scope[entry[0]] = binding.expression;
              }
            } else {
              define_property_default()(scope, entry[0], {
                get: function get() {
                  if (entry[1] === '=') {
                    return lodash_default.a.get(vnode.context, el.attributes.getNamedItem(lodash_default.a.kebabCase(entry[0])).value);
                  } else {
                    var ni = el.attributes.getNamedItem(lodash_default.a.kebabCase(entry[0]));
                    return ni ? ni.value : null;
                  }
                }
              });
            }
          });
        } else {
          scope = vnode.context.$data;
        }

        var thisObj = {
          $inject: function $inject() {
            var _Vue$prototype$$jfrog;

            for (var _len = arguments.length, injections = new Array(_len), _key = 0; _key < _len; _key++) {
              injections[_key] = arguments[_key];
            }

            (_Vue$prototype$$jfrog = Ng1AttributeDirectiveAdapter_Vue.prototype.$jfrog).injectOn.apply(_Vue$prototype$$jfrog, [thisObj].concat(injections));
          }
        };
        var bindedFn = linkFn.bind(thisObj);
        var attrs = {};

        if (binding.modifiers.bind) {
          define_property_default()(attrs, lodash_default.a.camelCase(binding.name), {
            get: function get() {
              if (!lodash_default.a.isFunction(binding.value)) {
                return lodash_default.a.get(vnode.context, lodash_default.a.trim(binding.expression, '\''));
              } else {
                return binding.value();
              }
            }
          });
        } else {
          attrs[lodash_default.a.camelCase(binding.name)] = lodash_default.a.trim(binding.expression, '\'');
        }

        lodash_default.a.values(el.attributes).forEach(function (attr) {
          define_property_default()(attrs, lodash_default.a.camelCase(attr.name), {
            get: function get() {
              return attr.value;
            }
          });
        });

        attrs.$observe = function (path, cb) {
          if (path === lodash_default.a.camelCase(binding.name)) {
            vnode.context.$watch(!lodash_default.a.isFunction(binding.value) ? binding.expression : binding.value, function () {
              if (lodash_default.a.get(vnode.context, lodash_default.a.trim(binding.expression, '\''))) {
                cb(lodash_default.a.get(vnode.context, lodash_default.a.trim(binding.expression, '\'')));
              } else if (lodash_default.a.isFunction(binding.value)) {
                cb(binding.value());
              }
            });
          } else {
            console.error('!!!!!!!!');
          }
        };

        bindedFn(scope, jquery_default()(el), attrs);
      };
    }
  }]);

  return Ng1AttributeDirectiveAdapter;
}();
// CONCATENATED MODULE: ./src/directives/JfDynamicTemplateDirective.js
var JfDynamicTemplateDirective_Vue = window.Vue;

JfDynamicTemplateDirective_Vue.directive('jf-dynamic-template', {
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = Ng1AttributeDirectiveAdapter_Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

var ng1LinkFunction = function ng1LinkFunction($scope, ele, attrs) {
  var injections = $jfrog.get(['$compile']);
  $scope.$watch(attrs.jfDynamicTemplate, function (html) {
    ele.html(html);
    injections.$compile(ele.contents())($scope);
  });
};
// EXTERNAL MODULE: ./src/directives/JfIncludeReplaceDirective.js
var JfIncludeReplaceDirective = __webpack_require__("b24e");

// CONCATENATED MODULE: ./src/directives/JfTooltipDirective.js
var JfTooltipDirective_Vue = window.Vue;

JfTooltipDirective_Vue.directive('jf-tooltip', {
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = Ng1AttributeDirectiveAdapter_Ng1AttributeDirectiveAdapter.patchLinkFunction(JfTooltipDirective_ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

function JfTooltipDirective_ng1LinkFunction($scope, $element, $attrs) {
  $($element).tooltipster({
    animation: 'fade',
    contentAsHTML: 'true',
    trigger: 'hover',
    onlyOne: 'true',
    interactive: 'true',
    position: 'bottom',
    theme: 'tooltipster-default bottom'
  });
  $($element).tooltipster('content', $attrs.jfTooltip === '' ? null : $attrs.jfTooltip);
  $attrs.$observe('jfTooltip', function (val) {
    val = val === '' ? null : val
    /*this.$sanitize(val)*/
    ;
    $($element).tooltipster('content', val);
  });
}
// EXTERNAL MODULE: ./src/directives/JfClearErrorsDirective.js
var JfClearErrorsDirective = __webpack_require__("160c");

// EXTERNAL MODULE: ./src/directives/JfFakeReadonlyDirective.js
var JfFakeReadonlyDirective = __webpack_require__("877b");

// CONCATENATED MODULE: ./src/directives/JfTooltipOnOverflowDirective.js
var JfTooltipOnOverflowDirective_Vue = window.Vue;

JfTooltipOnOverflowDirective_Vue.directive('jf-tooltip-on-overflow', {
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = Ng1AttributeDirectiveAdapter_Ng1AttributeDirectiveAdapter.patchLinkFunction(JfTooltipOnOverflowDirective_ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

function JfTooltipOnOverflowDirective_ng1LinkFunction($scope, $element, $attrs) {
  $($element).on('mouseenter', function (e) {
    var targets = [$($element), $(e.target)];
    var tooltipShown = false;

    var isNoTooltip = function isNoTooltip(cell) {
      return cell[0] && cell[0].classList && cell[0].classList.contains('no-tooltip');
    };

    for (var i = 0; !tooltipShown && i < targets.length; i++) {
      var target = targets[i];
      var targetContent = target.children(':not(:visible)').length ? target.children(':visible').text().trim() : target.text().trim();
      targetContent = targetContent === '' ? null : targetContent
      /*$sanitize(targetContent)*/
      ;

      if (!isNoTooltip(target) && target[0].scrollWidth > Math.round(target.innerWidth())) {
        if (!!targetContent && !target.hasClass('tooltipstered')) {
          var options = {
            animation: 'fade',
            contentAsHTML: 'true',
            trigger: 'hover',
            onlyOne: 'true',
            interactive: 'true',
            position: 'bottom',
            theme: 'tooltipster-default bottom',
            content: targetContent
          };

          if ($scope.trustTooltipText) {
            options.contentAsHTML = 'true';
          }

          target.tooltipster(options);
          target.tooltipster('show');
        } else if (!!targetContent) {
          target.tooltipster('enable');

          if (target.tooltipster('content') != targetContent) {
            target.tooltipster('content', targetContent);
          }
        }
      } else if (target.hasClass('tooltipstered')) {
        target.tooltipster('disable');
      }
    }
  });
  /*
  $scope.$on('$destroy', () => {
  $($element).off('mouseenter');
  $($element).off('mouseleave');
  });
  */
}
// CONCATENATED MODULE: ./src/directives/JfRevealInputDirective.js

var JfRevealInputDirective_Vue = window.Vue;

JfRevealInputDirective_Vue.directive('jf-reveal-input', {
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = Ng1AttributeDirectiveAdapter_Ng1AttributeDirectiveAdapter.patchLinkFunction(JfRevealInputDirective_ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

function JfRevealInputDirective_ng1LinkFunction($scope, $element, $attrs) {
  var revealInputComponent = new JfRevealInputDirective_Vue({
    template: "<i class=\"icon icon-view jf-reveal-input\"\n                  v-jf-tooltip.bind=\"tooltipText\"\n                  v-if=\"hasData()\"\n                  @click=\"updateInput()\"></i>",
    data: function data() {
      return {
        elementIcon: null,
        inputId: $attrs.jfRevealInput,
        tooltipText: 'Show ' + $attrs.objectName
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.elementIcon = this.$element;
      setTimeout(function () {
        $("#".concat(_this.inputId)).on('input', function () {
          _this.$forceUpdate();
        });
      });
    },
    methods: {
      hasData: function hasData() {
        var input = $("#".concat(this.inputId));
        return !!input.val();
      },
      updateInput: function updateInput() {
        var input = $("#".concat(this.inputId));
        var type = input.attr('type');

        if (type === 'text') {
          input.attr('type', 'password');
          this.elementIcon.removeClass('icon-unview').addClass('icon-view');
          this.tooltipText = this.tooltipText.replace('Hide', 'Show');
        } else {
          input.attr('type', 'text');
          this.elementIcon.removeClass('icon-view').addClass('icon-unview');
          this.tooltipText = this.tooltipText.replace('Show', 'Hide');
        }
      }
    }
  });
  var comp = revealInputComponent.$mount();
  $element[0].appendChild(comp.$el);
}
// CONCATENATED MODULE: ./src/directives/JfResizeDirective.js

var JfResizeDirective_Vue = window.Vue;

/*
Reference: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
*/

var attachEvent = document.attachEvent;
var isIE = navigator.userAgent.match(/Trident/);

var requestFrame = function () {
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return window.setTimeout(fn, 20);
  };

  return function (fn) {
    return raf(fn);
  };
}();

var cancelFrame = function () {
  var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function (id) {
    return cancel(id);
  };
}();

function resizeListener(e) {
  var win = e.target || e.srcElement;
  if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
  win.__resizeRAF__ = requestFrame(function () {
    var trigger = win.__resizeTrigger__;

    trigger.__resizeListeners__.forEach(function (fn) {
      fn.call(trigger, e);
    });
  });
}

function objectLoad(e) {
  this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
  this.contentDocument.defaultView.addEventListener('resize', resizeListener);
}

var addResizeListener = function addResizeListener(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];

    if (attachEvent) {
      element.__resizeTrigger__ = element;
      element.attachEvent('onresize', resizeListener);
    } else {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      var obj = element.__resizeTrigger__ = document.createElement('object');
      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
      obj.__resizeElement__ = element;
      obj.onload = objectLoad;
      obj.type = 'text/html';
      if (isIE) element.appendChild(obj);
      obj.data = 'about:blank';
      if (!isIE) element.appendChild(obj);
    }
  }

  element.__resizeListeners__.push(fn);
};

JfResizeDirective_Vue.directive('jf-resize', {
  inserted: function inserted(el, binding) {
    addResizeListener(el, lodash_default.a.debounce(function () {
      if (typeof binding.value == 'function') {
        binding.value();
      }
    }, 1000, {
      "leading": false,
      trailing: true
    }));
  }
});
// CONCATENATED MODULE: ./src/importDirectives.js








// EXTERNAL MODULE: ./src/filters/SplitWordsFilter.js
var SplitWordsFilter = __webpack_require__("ca45");

// CONCATENATED MODULE: ./src/filters/FormatedNumberFilter.js


var FormatedNumberFilter_Vue = window.Vue;
FormatedNumberFilter_Vue.filter('formatedNumber', function (value) {
  var newValue = value;

  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';

    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parse_float_default()((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision));
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');

      if (dotLessShortValue.length <= 2) {
        break;
      }
    }

    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }

  return newValue;
});
// CONCATENATED MODULE: ./src/filters/FilesizeFilter.js

var FilesizeFilter_Vue = window.Vue;
FilesizeFilter_Vue.filter('filesize', function (bytes, precision) {
  if (bytes === 0) return 'empty file';
  if (isNaN(parse_float_default()(bytes)) || !isFinite(bytes)) return '-';
  if (typeof precision === 'undefined') precision = 1;
  var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      number = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
});
// CONCATENATED MODULE: ./src/importFilters.js



// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue?vue&type=template&id=34c64372&scoped=true&
var JfSummaryRowItemComponentvue_type_template_id_34c64372_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.summaryItemIsActive)?_c('div',{staticClass:"summery-labeled-item"},[_c('div',{staticClass:"summary-item-label"},[_vm._v(_vm._s(_vm.summaryItemLabel))]),_c('div',{staticClass:"jf-summary-row-item"},[(!_vm.summaryItemUnwrap)?_c('span',{staticClass:"summary-item-wrapper"},[_vm._t("default")],2):_vm._e(),(_vm.summaryItemUnwrap)?_vm._t("default"):_vm._e()],2)]):_vm._e()}
var JfSummaryRowItemComponentvue_type_template_id_34c64372_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue?vue&type=template&id=34c64372&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSummaryRowItemComponentvue_type_script_lang_js_ = ({
  name: 'jf-summary-row-item',
  props: ['summaryItemLabel', 'summaryItemUnwrap', 'summaryItemIsActive'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var JfSummaryRowComponent_JfSummaryRowItemComponentvue_type_script_lang_js_ = (JfSummaryRowItemComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue?vue&type=style&index=0&id=34c64372&scoped=true&lang=less&
var JfSummaryRowItemComponentvue_type_style_index_0_id_34c64372_scoped_true_lang_less_ = __webpack_require__("59ca");

// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue






/* normalize component */

var JfSummaryRowItemComponent_component = Object(componentNormalizer["a" /* default */])(
  JfSummaryRowComponent_JfSummaryRowItemComponentvue_type_script_lang_js_,
  JfSummaryRowItemComponentvue_type_template_id_34c64372_scoped_true_render,
  JfSummaryRowItemComponentvue_type_template_id_34c64372_scoped_true_staticRenderFns,
  false,
  null,
  "34c64372",
  null
  
)

/* harmony default export */ var JfSummaryRowItemComponent = (JfSummaryRowItemComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/index.vue?vue&type=template&id=6d31c20e&scoped=true&
var JfSummaryRowComponentvue_type_template_id_6d31c20e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"summary-row jf-content-section",style:(_vm.$ctrl.inlineStyle)},[_vm._t("default")],2)}
var JfSummaryRowComponentvue_type_template_id_6d31c20e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=template&id=6d31c20e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
/* harmony default export */ var JfSummaryRowComponentvue_type_script_lang_js_ = ({
  name: 'jf-summary-row',
  props: [],
  'jf@inject': ['$element'],
  data: function data() {
    return {
      columnsToShow: [],
      inlineStyle: {}
    };
  },
  mounted: function mounted() {
    this.filterOutInactiveColumns();
    this.setColumnsLayout();
  },
  methods: {
    filterOutInactiveColumns: function filterOutInactiveColumns() {
      this.columnsToShow = this.$element.find('.summery-labeled-item');
    },
    setColumnsLayout: function setColumnsLayout() {
      var layout = '';

      _.forEach(this.columnsToShow, function (col) {
        layout += "".concat($(col).attr('width') || '1fr', " ");
      });

      this.inlineStyle = {
        gridTemplateColumns: layout,
        "-ms-grid-columns": layout
      };
    }
  },
  ng1_legacy: {
    'controllerAs': '$ctrl'
  }
});
// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSummaryRowComponentvue_type_script_lang_js_ = (JfSummaryRowComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=style&index=0&id=6d31c20e&scoped=true&lang=less&
var JfSummaryRowComponentvue_type_style_index_0_id_6d31c20e_scoped_true_lang_less_ = __webpack_require__("42a0");

// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue






/* normalize component */

var JfSummaryRowComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfSummaryRowComponentvue_type_script_lang_js_,
  JfSummaryRowComponentvue_type_template_id_6d31c20e_scoped_true_render,
  JfSummaryRowComponentvue_type_template_id_6d31c20e_scoped_true_staticRenderFns,
  false,
  null,
  "6d31c20e",
  null
  
)

/* harmony default export */ var JfSummaryRowComponent = (JfSummaryRowComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDividerComponent/index.vue?vue&type=template&id=104fee22&scoped=true&
var JfDividerComponentvue_type_template_id_104fee22_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-divider"},[_c('div',{staticClass:"jf-divider-container"},[_c('div',{staticClass:"jf-divider-header"},[_vm._v(_vm._s(_vm.text))]),_c('div',{staticClass:"jf-divider-line"})])])}
var JfDividerComponentvue_type_template_id_104fee22_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDividerComponent/index.vue?vue&type=template&id=104fee22&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDividerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfDividerComponentvue_type_script_lang_js_ = ({
  name: 'jf-divider',
  props: ['text'],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/JfDividerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDividerComponentvue_type_script_lang_js_ = (JfDividerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDividerComponent/index.vue?vue&type=style&index=0&id=104fee22&scoped=true&lang=less&
var JfDividerComponentvue_type_style_index_0_id_104fee22_scoped_true_lang_less_ = __webpack_require__("e858");

// CONCATENATED MODULE: ./src/components/JfDividerComponent/index.vue






/* normalize component */

var JfDividerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDividerComponentvue_type_script_lang_js_,
  JfDividerComponentvue_type_template_id_104fee22_scoped_true_render,
  JfDividerComponentvue_type_template_id_104fee22_scoped_true_staticRenderFns,
  false,
  null,
  "104fee22",
  null
  
)

/* harmony default export */ var JfDividerComponent = (JfDividerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeIndentationComponent/index.vue?vue&type=template&id=c56d0cf0&scoped=true&
var JfTreeIndentationComponentvue_type_template_id_c56d0cf0_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-tree-indentation"},[_c('div',{staticClass:"indentation-wrap",style:({width: (_vm.indentation ? _vm.indentation.length * 26 : 0) + 'px'})},[(_vm.visible)?_c('div',{staticClass:"indentation-flex-wrap",domProps:{"innerHTML":_vm._s(_vm.indentationHtml)}}):_vm._e()])])}
var JfTreeIndentationComponentvue_type_template_id_c56d0cf0_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue?vue&type=template&id=c56d0cf0&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeIndentationComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeIndentationComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-indentation',
  props: ['indentation', 'height', 'visible', 'linesBackgrounds'],
  'jf@inject': [],
  data: function data() {
    return {
      indentationHtml: null
    };
  },
  created: function created() {
    var _this = this;

    this.$watch('jfTreeIndentation.indentation', function () {
      if (!_this.indentation) return; // Build the inner html for the units here in js, it is much faster than using ng-repeat

      var indentationHtml = '';

      var htmlForIndentation = function htmlForIndentation(indentation) {
        if (_this.linesBackgrounds[indentation.background]) {
          return "<div class=\"indentation-unit\" style=\"height: ".concat(_this.height, "; background-image: url('").concat(_this.linesBackgrounds[indentation.background], "')\"></div>");
        } else {
          return "<div class=\"indentation-unit\" style=\"height: ".concat(_this.height, ";\"></div>");
        }
      };

      _this.indentation.forEach(function (indentation) {
        indentationHtml += htmlForIndentation(indentation);
      });

      _this.indentationHtml = indentationHtml;
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTreeIndentation'
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeIndentationComponentvue_type_script_lang_js_ = (JfTreeIndentationComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue





/* normalize component */

var JfTreeIndentationComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeIndentationComponentvue_type_script_lang_js_,
  JfTreeIndentationComponentvue_type_template_id_c56d0cf0_scoped_true_render,
  JfTreeIndentationComponentvue_type_template_id_c56d0cf0_scoped_true_staticRenderFns,
  false,
  null,
  "c56d0cf0",
  null
  
)

/* harmony default export */ var JfTreeIndentationComponent = (JfTreeIndentationComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=template&id=d58e0598&scoped=true&
var JfTreeCompiledCellComponentvue_type_template_id_d58e0598_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var JfTreeCompiledCellComponentvue_type_template_id_d58e0598_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"compile-this"})])}]


// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=template&id=d58e0598&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeCompiledCellComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-compiled-cell',
  props: ['itemId', 'treeItem'],
  'jf@inject': ['$element', '$timeout', '$scope'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    this.$scope.$watch('compiledCell.treeItem.data', function () {
      _this.compile();
    });
  },
  ng1_legacy: {
    'controllerAs': 'compiledCell'
  },
  methods: {
    compile: function compile() {
      var elem = $(this.$element).find(".compile-this");
      this.treeItem.tree.compileTemplate(elem, this.itemId);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeCompiledCellComponentvue_type_script_lang_js_ = (JfTreeCompiledCellComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue





/* normalize component */

var JfTreeCompiledCellComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeCompiledCellComponentvue_type_script_lang_js_,
  JfTreeCompiledCellComponentvue_type_template_id_d58e0598_scoped_true_render,
  JfTreeCompiledCellComponentvue_type_template_id_d58e0598_scoped_true_staticRenderFns,
  false,
  null,
  "d58e0598",
  null
  
)

/* harmony default export */ var JfTreeCompiledCellComponent = (JfTreeCompiledCellComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeItemComponent/index.vue?vue&type=template&id=0ffaa123&scoped=true&
var JfTreeItemComponentvue_type_template_id_0ffaa123_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.refreshHack.count && _vm.getClasses().concat(_vm.getCustomClasses()),style:({height: _vm.tree.viewPane.itemHeight, 'line-height': _vm.tree.viewPane.itemHeight}),on:{"click":function($event){return _vm.onItemClick($event)},"dblclick":function($event){return _vm.onItemDoubleClick()}}},[_c('div',{staticClass:"jf-tree-item-container",style:({height: _vm.tree.viewPane.itemHeight, 'line-height': _vm.tree.viewPane.itemHeight})},[_c('jf-tree-indentation',{attrs:{"visible":_vm.tree.api.linesVisible,"height":_vm.tree.viewPane.itemHeight,"lines-backgrounds":_vm.tree.viewPane.linesBackgrounds,"indentation":_vm.getIndentation()}}),(_vm.data.level >= 1 && _vm.tree.api.linesVisible && !_vm.shouldShowExpander() && !_vm.data.$pending)?_c('div',{staticClass:"no-children-line-extension",style:({height: _vm.tree.viewPane.itemHeight, 'background-image': 'url(\'' + _vm.tree.viewPane.linesBackgrounds['horizontal-line'] + '\')'})}):_vm._e(),(_vm.data.data === _vm.tree.api.GO_UP_NODE)?_c('span',{staticClass:"drill-back"},[_vm._v("  ..")]):_vm._e(),(_vm.data.data !== _vm.tree.api.GO_UP_NODE && (_vm.shouldShowExpander() || _vm.data.$pending || _vm.data.level === 0))?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initExpander()),expression:"initExpander()"}],staticClass:"node-expander",style:({height: _vm.tree.viewPane.itemHeight}),on:{"click":function($event){_vm.shouldShowExpander() && _vm.toggleExpansion(); $event.stopPropagation();}}},[(_vm.shouldShowExpander())?_c('div',{staticClass:"action-icon icon icon-addons-arrow-right"}):_vm._e(),(_vm.data.$pending)?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e()]):_vm._e(),(_vm.data.data !== _vm.tree.api.GO_UP_NODE)?_c('div',{staticClass:"jf-tree-item-content"},[_c('jf-tree-compiled-cell',{attrs:{"item-id":_vm.itemId,"tree-item":_vm.jfTreeItem}})],1):_vm._e()],1)])}
var JfTreeItemComponentvue_type_template_id_0ffaa123_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue?vue&type=template&id=0ffaa123&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeItemComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeItemComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-item',
  props: ['data', 'itemId', 'tree'],
  'jf@inject': ['$scope', '$element', '$timeout', 'AdvancedStringMatch'],
  data: function data() {
    return {
      refreshHack: this.tree.refreshHack
    };
  },
  created: function created() {
    this.asm = this.AdvancedStringMatch;
  },
  mounted: function mounted() {
    $(this.$el).prop('comp', this);

    this._watchSelection();

    this._watchExpansion();

    this._registerEvents();
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */


    $(this.$element).prop('ctrl', this);
  },
  ng1_legacy: {
    'controllerAs': 'jfTreeItem'
  },
  methods: {
    _registerEvents: function _registerEvents() {
      var _this = this;

      if (this.tree.api.eventsToRegisterOnNode) {
        this.tree.api.eventsToRegisterOnNode.forEach(function (registeredEvent) {
          _this.tree.api.JFrogEventBus.registerOnScope(_this.$scope, registeredEvent.event, function () {
            for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
              params[_key] = arguments[_key];
            }

            registeredEvent.callback(_this.data.data, params);
          });
        });
      }
    },
    initExpander: function initExpander() {
      this._syncExpansionClass(this.isExpanded());
    },
    _syncExpansionClass: function _syncExpansionClass(expanded) {
      var iconElem = $(this.$element).find('.node-expander');

      if (expanded) {
        iconElem.addClass('expanded');
      } else {
        iconElem.removeClass('expanded');
      }
    },
    _watchExpansion: function _watchExpansion() {
      var _this2 = this;

      this.$scope.$watch(function () {
        return _this2.isExpanded();
      }, function (expanded) {
        return _this2._syncExpansionClass(expanded);
      });
      this.$scope.$watch('jfTreeItem.data', function () {
        return _this2._syncExpansionClass(_this2.isExpanded());
      });
    },
    _watchSelection: function _watchSelection() {
      var _this3 = this;

      //This is instead of using ng-class, which not working smoothly in safari
      var toggleClass = function toggleClass(add, className) {
        if (add) {
          $(_this3.$element).addClass(className);
        } else {
          $(_this3.$element).removeClass(className);
        }
      };

      this.$scope.$watch(function () {
        return _this3.tree.api.$freezedSelected || _this3.tree.api.$selectedNode;
      }, function (selected) {
        var iAmSelected = selected === _this3.data.data;
        toggleClass(iAmSelected, 'selected');
      });
      this.$scope.$watch(function () {
        return _this3.tree.api.$freezedPreSelected || _this3.tree.api.$preSelectedNode;
      }, function (preSelected) {
        var iAmPreSelected = preSelected === _this3.data.data;
        toggleClass(iAmPreSelected, 'pre-selected');
      });
      this.$scope.$watch('jfTreeItem.data', function () {
        var iAmPreSelected = (_this3.tree.api.$freezedPreSelected || _this3.tree.api.$preSelectedNode) === _this3.data.data;
        var iAmSelected = (_this3.tree.api.$freezedSelected || _this3.tree.api.$selectedNode) === _this3.data.data;
        toggleClass(iAmSelected, 'selected');
        toggleClass(iAmPreSelected, 'pre-selected');
      });
    },
    _getTreeContainer: function _getTreeContainer() {
      return $(this.tree.$element).find('.jf-tree-container');
    },
    isSelected: function isSelected() {
      return this.tree.api._isSelected(this.data);
    },
    isPreSelected: function isPreSelected() {
      return this.tree.api._isPreSelected(this.data);
    },
    onItemClick: function onItemClick(e) {
      if (e.type === 'click') {
        if (this.data.data === this.tree.api.GO_UP_NODE) {
          this.tree.api.drillUp();
        } else {
          this.tree.api._setSelected(this.data);

          this.tree.api.fire('item.clicked', this.data.data);
        }
      }
    },
    onItemDoubleClick: function onItemDoubleClick() {
      this.tree.api.fire('item.dblClicked', this.data.data);
    },
    isExpanded: function isExpanded() {
      return this.tree.viewPane.isNodeOpen(this.data.data);
    },
    toggleExpansion: function toggleExpansion() {
      this.tree.api.toggleExpansion(this.data.data);
    },
    isQuickFindMatch: function isQuickFindMatch() {
      var elem = $(this.$element).find('.jf-tree-item-content .node-text');

      if (elem.length) {
        var text = elem.text();
        elem.unhighlight();

        if (text && this.tree.api.quickFindTerm) {
          var asmResponse = this.asm.match(text, this.tree.api.quickFindTerm);

          if (asmResponse.matched) {
            this.asm.highlight(elem, asmResponse.segments);
          }

          return asmResponse.matched;
        } else return false;
      }
    },
    getClasses: function getClasses() {
      var classes = ['jf-tree-item'];
      if (this.isQuickFindMatch()) classes.push('quick-find-match');
      return classes;
    },
    getCustomClasses: function getCustomClasses() {
      if (!this.data.data || this.data.data === this.tree.api.GO_UP_NODE || !this.tree.api.classGetter) return [];else {
        var classes = this.tree.api.classGetter(this.data.data);
        if (!classes) classes = [];else if (!_.isArray(classes)) classes = [classes];
        return classes;
      }
    },
    shouldShowExpander: function shouldShowExpander() {
      return this.data.hasChildren && !this.data.data.$noChildren && !this.data.$pending;
    },
    getIndentation: function getIndentation() {
      if (!this.data.data.$indentation) {
        this.createIndentation();
      }

      return this.data.data.$indentation;
    },
    createIndentation: function createIndentation() {
      if (!this.tree.api.linesVisible) {
        this.$set(this.data.data, '$indentation', _.map(new Array(this.data.level), function (i) {
          return {};
        }));
        return;
      }

      var flats = this.data.pane.$flatItems;

      var isLastChild = function isLastChild(item) {
        if (item.$isLastChild === undefined) {
          var parent = item.parent;

          var children = _.filter(flats, {
            parent: parent
          });

          var index = children.indexOf(item);
          item.$isLastChild = index !== -1 && index === children.length - 1;
        }

        return item.$isLastChild;
      };

      var indentation = [];
      var relevantItem = this.data;

      for (var i = this.data.level - 1; i >= 0; i--) {
        var isLast = isLastChild(relevantItem);
        var unit = {
          index: i,
          background: i === this.data.level - 1 ? isLast ? 'last-connection-point' : 'connection-point' : isLast ? '' : 'vertical-line'
        };
        indentation.push(unit);
        relevantItem = relevantItem.parent;
      }

      this.$set(this.data.data, '$indentation', indentation.reverse());
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeItemComponentvue_type_script_lang_js_ = (JfTreeItemComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue





/* normalize component */

var JfTreeItemComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeItemComponentvue_type_script_lang_js_,
  JfTreeItemComponentvue_type_template_id_0ffaa123_scoped_true_render,
  JfTreeItemComponentvue_type_template_id_0ffaa123_scoped_true_staticRenderFns,
  false,
  null,
  "0ffaa123",
  null
  
)

/* harmony default export */ var JfTreeItemComponent = (JfTreeItemComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeComponent/index.vue?vue&type=template&id=5732e7ae&scoped=true&
var JfTreeComponentvue_type_template_id_5732e7ae_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-tree",class:_vm.viewPaneName + '-pane',staticStyle:{"clear":"both"},attrs:{"tabindex":"0"}},[(_vm.viewPane)?_c('div',{staticClass:"jf-tree-container",style:({height: _vm.getPageHeight() + 'px', overflow: _vm.isEmpty() || !_vm.api.dataGettersSet ? 'visible' : 'hidden'})},[_c('div',{staticClass:"tree-items-container",style:({transform: 'translate(0, ' + (-_vm.getTranslate()) + 'px)'})},[_c('div',{staticClass:"scroll-faker-container",style:({transform: 'translate(0, ' + (_vm.getTranslate()) + 'px)', right: 0, height: _vm.getPageHeight() + 'px'})},[_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initScrollFaker()),expression:"initScrollFaker()"}],staticClass:"scroll-faker",style:({height: (_vm.getTotalScrollHeight() > _vm.maxFakeScrollHeight ? _vm.maxFakeScrollHeight : _vm.getTotalScrollHeight()) + 'px'})})]),_c('div',{staticClass:"h-scroll-wrapper",style:({height: (_vm.getPageHeight() + _vm.getTranslate()) + 'px'}),on:{"mousewheel":function($event){$event.preventDefault();return _vm.onMouseWheel($event)}}},[_c('div',{staticClass:"h-scroll-content"},_vm._l((_vm.viewPane._getPageData()),function(item,$index){return _c('jf-tree-item',{key:$index,attrs:{"tree":_vm.jfTree,"item-id":$index,"data":item}})}),1)])]),(!_vm.api.dataGettersSet)?_c('div',{staticClass:"missing-data-setters"},[_vm._v("\n                "+_vm._s('jf-tree: Data getters was not set (call setDataDriver())')+"\n            ")]):_vm._e(),(_vm.isEmpty())?_c('div',{staticClass:"empty-tree-placeholder"},[_vm._v("\n                "+_vm._s(_vm.api.emptyTreeText || 'This tree is empty !')+"\n            ")]):_vm._e(),(_vm.noFilterResults)?_c('div',{staticClass:"empty-tree-placeholder filter-no-results"},[_vm._v("\n                Current filter has no results. "),_c('a',{attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.clearFilter()}}},[_vm._v("Clear filter")])]):_vm._e()]):_vm._e()])])}
var JfTreeComponentvue_type_template_id_5732e7ae_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=template&id=5732e7ae&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree',
  props: {
    api: {},
    viewPaneName: {
      default: 'default'
    }
  },
  'jf@inject': ['$scope', '$element', '$timeout', '$compile', '$rootScope'],
  data: function data() {
    return {
      viewPane: null,
      maxFakeScrollHeight: 1000000,
      noFilterResults: null,
      virtualScrollIndex: 0,
      virtScrollDisplacement: 0,
      currentPage: 0,
      refreshHack: {
        count: 1
      }
    };
  },
  created: function created() {
    var _this = this;

    this.cellScopes = [];
    this.$scope.$watch('jfTree.api', function (api) {
      if (_this.api) {
        _this.api._setDirectiveController(_this);
      }

      if (_this.api && !_this.paginationApi) {
        _this.paginationApi = new JfTreeComponentvue_type_script_lang_js_PaginationApi(_this);

        _this.paginationApi.registerChangeListener(function () {
          _this.refresh(false);
        });
      }
    });
    this.$scope.$on('$destroy', function () {
      _this.cellScopes.forEach(function (s) {
        return s.$destroy();
      });
    });
    $(window).on('resize', function () {
      if (_this.viewPane.autoHeight) _this.viewPane._setAutoItemsPerPage();
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    $(this.$element).find('.jf-tree').keydown(function (e) {
      switch (e.key) {
        case 'Down':
        case 'ArrowDown':
          e.preventDefault();

          _this2.api._onArrowKey(true, _this2.viewPane);

          break;

        case 'Up':
        case 'ArrowUp':
          e.preventDefault();

          _this2.api._onArrowKey(false, _this2.viewPane);

          break;

        case 'Enter':
          e.preventDefault();

          if (_this2.api.getPreSelectedNode() === _this2.api.GO_UP_NODE) {
            _this2.api.drillUp();
          } else {
            _this2.api.selectPreSelected();

            _this2.api.toggleSelected(true);
          }

          break;

        case 'Right':
        case 'ArrowRight':
          {
            e.preventDefault();

            var relevant = _this2.api.getPreSelectedNode() || _this2.api.getSelectedNode();

            if (relevant) {
              if (!_this2.api.isNodeOpen(relevant)) _this2.api.openNode(relevant, true);else {
                if (relevant.$childrenCache && relevant.$childrenCache.length) {
                  _this2.api.preSelectNode(relevant.$childrenCache[0]);
                }
              }
            }

            break;
          }

        case 'Left':
        case 'ArrowLeft':
          {
            e.preventDefault();

            var _relevant = _this2.api.getPreSelectedNode() || _this2.api.getSelectedNode();

            if (_relevant) {
              if (_this2.api.isNodeOpen(_relevant)) _this2.api.closeNode(_relevant);else {
                var parent = _this2.api.getParentNode(_relevant);

                if (parent) _this2.api.preSelectNode(parent);
              }
            }

            break;
          }

        default:
          if (!e.ctrlKey && !e.shiftKey && !e.metaKey && e.key.toLowerCase() === String.fromCharCode(e.which).toLowerCase()) {
            _this2.api.fire('keydown', e);
          }

      }
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTree'
  },
  methods: {
    clearFilter: function clearFilter() {
      this.treeFilter = '';
      this.onUpdateFilter();
    },
    compileTemplate: function compileTemplate(elem, itemId) {
      var node = this.viewPane._getPageData()[itemId];

      if (!node) return;

      var existingScope = _.find(this.cellScopes, function (s) {
        return s.node === node.data;
      });

      var itemScope;

      if (!existingScope) {
        itemScope = this.$rootScope.$new({
          node: node.data,
          appScope: this.api.appScope,
          tree: {
            api: this.api
          }
        });
        this.cellScopes.push(itemScope);
      } else itemScope = existingScope;

      var template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node.data) : this.api.nodeTemplate;
      var templateElem = $('<div>' + template + '</div>');
      this.$compile(templateElem.children()[0])(itemScope);
      elem.empty();
      elem.append(templateElem.children()[0]);
    },
    _normalizeWheelEvent: function _normalizeWheelEvent(event) {
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0,
          sY = 0,
          pX = 0,
          pY = 0;

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    onMouseWheel: function onMouseWheel($event, $delta, $deltaX, $deltaY) {
      if (this.viewPane.scrollTimeout) {
        this.$timeout.cancel(this.viewPane.scrollTimeout);
        delete this.viewPane.scrollTimeout;
      }

      var normalDelta = this._normalizeWheelEvent($event).pixelY;

      var xDelta = this._normalizeWheelEvent($event).pixelX;

      if (Math.abs(normalDelta) < Math.abs(xDelta)) {
        $event.stopPropagation();
        return;
      }

      var scrollAmount = 0.02 * Math.abs(normalDelta);

      var scrollPosBefore = this.viewPane._getCurrentScrollPos();

      if ($event.deltaY > 0) {
        // scrollUp
        this.viewPane._scrollTo(scrollPosBefore + scrollAmount);
      } else if ($event.deltaY < 0) {
        // scrollDown
        this.viewPane._scrollTo(scrollPosBefore - scrollAmount);
      }

      this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
      if (scrollPosBefore !== this.viewPane._getCurrentScrollPos()) $event.preventDefault();
      this.syncFakeScroller(false);
      this.viewPane.focus();
    },
    resetScroll: function resetScroll() {
      this.virtualScrollIndex = 0;
      this.virtScrollDisplacement = 0;
      this.currentPage = 1;
      this.syncFakeScroller(false);
    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.viewPane._getPrePagedData().length * parse_float_default()(this.viewPane.itemHeight);
    },
    getPageHeight: function getPageHeight() {
      if (this.viewPane.containerHeight) {
        return this.viewPane.containerHeight;
      } else {
        var len = this.viewPane._getPrePagedData().length;

        if (len < this.viewPane.itemsPerPage) return len * parse_float_default()(this.viewPane.itemHeight);else return this.viewPane.itemsPerPage * parse_float_default()(this.viewPane.itemHeight);
      }
    },
    initScrollFaker: function initScrollFaker() {
      var _this3 = this;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      scrollParent.on('scroll', function (e) {
        if (_this3.$settingScroll) {
          delete _this3.$settingScroll;
          return;
        }

        if (_this3.viewPane.scrollTimeout) {
          _this3.$timeout.cancel(_this3.viewPane.scrollTimeout);

          delete _this3.viewPane.scrollTimeout;
        }

        var len = _this3.viewPane._getPrePagedData().length;

        if (len) {
          var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
          var relativePosition = scrollParent.scrollTop() / maxScrollTop;

          if (_.isNaN(relativePosition)) {
            relativePosition = 1;
          }

          var newScrollIndex = relativePosition * (len - _this3.viewPane.itemsPerPage);
          if (newScrollIndex < 0) newScrollIndex = 0;
          _this3.virtualScrollIndex = Math.floor(newScrollIndex);
          _this3.virtScrollDisplacement = newScrollIndex - _this3.virtualScrollIndex;
          _this3.currentPage = Math.floor((_this3.virtualScrollIndex + _this3.viewPane.itemsPerPage - 1) / _this3.viewPane.itemsPerPage);
        } else {
          _this3.virtualScrollIndex = 0;
          _this3.virtScrollDisplacement = 0;
          _this3.currentPage = 0;
        }

        _this3.api.fire('pagination.change', _this3.paginationApi.getCurrentPage());
      });
    },
    getTranslate: function getTranslate() {
      var displacement = this.$freezedVScrollDisplacement !== undefined ? this.$freezedVScrollDisplacement : this.virtScrollDisplacement;

      if (!displacement) {
        return 0;
      } else {
        var pixels = displacement * parse_float_default()(this.viewPane.itemHeight);

        return pixels;
      }
    },
    syncFakeScroller: function syncFakeScroller() {
      var _this4 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var len = this.viewPane._getPrePagedData(true).length;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      var relativePosition = this.viewPane._getCurrentScrollPos() / (len - this.viewPane.itemsPerPage);

      var sync = function sync() {
        var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
        var scrollTop = Math.floor(maxScrollTop * relativePosition);
        _this4.$settingScroll = true;
        scrollParent.scrollTop(scrollTop);
      };

      if (delay) this.$timeout(sync);else sync();
    },
    getScrollWidth: function getScrollWidth() {
      var el = $(this.$element).find('.scroll-faker-container')[0];
      return el.offsetWidth - el.clientWidth;
    },
    refresh: function refresh() {
      var _this5 = this;

      setTimeout(function () {
        return _this5.refreshHack.count++;
      });
    },
    isEmpty: function isEmpty() {
      return !!(this.api.dataWasSet && !this.viewPane._getRawData().length && !this.viewPane.$freezed);
    },
    _freezeVScroll: function _freezeVScroll() {
      this.$freezedVScrollIndex = this.virtualScrollIndex;
      this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
    },
    _unFreezeVScroll: function _unFreezeVScroll() {
      delete this.$freezedVScrollIndex;
      delete this.$freezedVScrollDisplacement;
    }
  }
});

var JfTreeComponentvue_type_script_lang_js_PaginationApi =
/*#__PURE__*/
function () {
  function PaginationApi(treeCtrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.treeCtrl = treeCtrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      return Math.ceil(this.treeCtrl.viewPane.getTotalLengthOfData() / this.treeCtrl.viewPane.itemsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return this.treeCtrl.currentPage + 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.getCurrentPage() === this.getTotalPages()) return;
      this.treeCtrl.currentPage++;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.getCurrentPage() === 1) return;
      this.treeCtrl.currentPage--;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      if (pageNum < 1 || pageNum > this.getTotalPages()) return;
      this.treeCtrl.currentPage = pageNum - 1;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "update",
    value: function update() {
      var _this6 = this;

      if (this.getCurrentPage() > this.getTotalPages()) {
        this.setPage(this.getTotalPages());
      }

      if (this.listeners) this.listeners.forEach(function (listener) {
        return listener(_this6.getCurrentPage());
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      if (!this.listeners) this.listeners = [];
      this.listeners.push(listener);
    }
  }, {
    key: "syncVirtualScroll",
    value: function syncVirtualScroll() {
      this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage * this.treeCtrl.viewPane.itemsPerPage;
      this.treeCtrl.syncFakeScroller();
    }
  }]);

  return PaginationApi;
}();
// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeComponentvue_type_script_lang_js_ = (JfTreeComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=style&index=0&id=5732e7ae&scoped=true&lang=less&
var JfTreeComponentvue_type_style_index_0_id_5732e7ae_scoped_true_lang_less_ = __webpack_require__("bdab");

// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue






/* normalize component */

var JfTreeComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeComponentvue_type_script_lang_js_,
  JfTreeComponentvue_type_template_id_5732e7ae_scoped_true_render,
  JfTreeComponentvue_type_template_id_5732e7ae_scoped_true_staticRenderFns,
  false,
  null,
  "5732e7ae",
  null
  
)

/* harmony default export */ var JfTreeComponent = (JfTreeComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableTopComponent/index.vue?vue&type=template&id=70782c91&scoped=true&
var JfTableTopComponentvue_type_template_id_70782c91_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-table-top clearfix"},[_c('div',{staticClass:"counter-and-filter-wrapper"},[(_vm.tableView.options && !_vm.tableView.options.noCount)?_c('div',{staticClass:"table-counter"},[_vm._v(_vm._s(_vm.totalRecords)),(_vm.tableView.getSelectedRecords())?_c('span',[_vm._v(" ("+_vm._s(_vm.tableView.getSelectedRecords())+" Selected)")]):_vm._e()]):_vm._e(),_c('div',{staticClass:"external-filters"},[_vm._t("external-filters")],2),(!_vm.hasExternalFilter)?_c('div',{staticClass:"jf-table-filter"},[(_vm.tableView.options && _vm.tableView.options.filterVisible)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tableView.tableFilter),expression:"tableView.tableFilter"},{name:"init",rawName:"v-init",value:(_vm.tableView.initFilter()),expression:"tableView.initFilter()"},{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.filterTooltip),expression:"filterTooltip",modifiers:{"bind":true}}],staticClass:"input-text",class:{'no-results': _vm.tableView.noFilterResults},attrs:{"disabled":_vm.isFilterDisabled(),"ng-model-options":"{debounce: { 'default': 500 } }","placeholder":"Filter"},domProps:{"value":(_vm.tableView.tableFilter)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.tableView, "tableFilter", $event.target.value)},function($event){return _vm.tableView.onUpdateFilter()}]}}):_vm._e()]):_vm._e()]),(_vm.tableView.options)?_c('div',{staticClass:"batch-actions-wrapper"},[_c('jf-table-view-batch-actions',{attrs:{"table-options":_vm.tableView.options,"actions":_vm.tableView.options.batchActions}})],1):_vm._e(),(_vm.tableView.options)?_c('div',{staticClass:"pagination-controls"},[(_vm.tableView.paginationApi && _vm.tableView.options.paginationVisible)?_c('jf-drag-drop-pagination',{ref:"pagination",attrs:{"pagination-api":_vm.tableView.paginationApi}}):_vm._e()],1):_vm._e()])])}
var JfTableTopComponentvue_type_template_id_70782c91_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue?vue&type=template&id=70782c91&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableTopComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableTopComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-top',
  props: ['tableView', 'totalRecords'],
  data: function data() {
    return {};
  },
  computed: {
    filterTooltip: function filterTooltip() {
      return !this.tableView.options.tooltipFilterDisabled ? this.tableView.options.getFilterTooltip() : '';
    },
    hasExternalFilter: function hasExternalFilter() {
      return !!this.$slots['external-filters'] || !!this.$scopedSlots['external-filters'];
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfTableTop'
  },
  methods: {
    isFilterDisabled: function isFilterDisabled() {
      return !(this.tableView.options && (this.tableView.options.getRawData().length || this.tableView.options.externalTotalCount && this.tableView.options.externalTotalCount.total > 0)) || this.tableView.options.isFilterDisabledCallback && this.tableView.options.isFilterDisabledCallback();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableTopComponentvue_type_script_lang_js_ = (JfTableTopComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue





/* normalize component */

var JfTableTopComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableTopComponentvue_type_script_lang_js_,
  JfTableTopComponentvue_type_template_id_70782c91_scoped_true_render,
  JfTableTopComponentvue_type_template_id_70782c91_scoped_true_staticRenderFns,
  false,
  null,
  "70782c91",
  null
  
)

/* harmony default export */ var JfTableTopComponent = (JfTableTopComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableCompiledCellComponent/index.vue?vue&type=template&id=67729ebe&scoped=true&
var JfTableCompiledCellComponentvue_type_template_id_67729ebe_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.compiledTemplate)?_c(_vm.compiledTemplate.comp,_vm._b({tag:"component"},'component',_vm.compiledTemplate.props,false)):_vm._e()],1)}
var JfTableCompiledCellComponentvue_type_template_id_67729ebe_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue?vue&type=template&id=67729ebe&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableCompiledCellComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableCompiledCellComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-compiled-cell',
  props: ['field', 'rowId', 'tableRow'],
  'jf@inject': ['$element', '$timeout', '$scope'],
  data: function data() {
    return {
      compiledTemplate: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$scope.$watch('compiledCell.tableRow.data', function () {
      _this.compile();
    });
  },
  ng1_legacy: {
    'controllerAs': 'compiledCell'
  },
  methods: {
    compile: function compile() {
      if (!this.compiledTemplate) {
        this.compiledTemplate = this.tableRow.tableView.compileTemplate(this.field, this.rowId);
      } else {
        this.compiledTemplate.props = this.tableRow.tableView.compileTemplate(this.field, this.rowId).props;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableCompiledCellComponentvue_type_script_lang_js_ = (JfTableCompiledCellComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue





/* normalize component */

var JfTableCompiledCellComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableCompiledCellComponentvue_type_script_lang_js_,
  JfTableCompiledCellComponentvue_type_template_id_67729ebe_scoped_true_render,
  JfTableCompiledCellComponentvue_type_template_id_67729ebe_scoped_true_staticRenderFns,
  false,
  null,
  "67729ebe",
  null
  
)

/* harmony default export */ var JfTableCompiledCellComponent = (JfTableCompiledCellComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=template&id=13b7a2b8&scoped=true&
var JfTableViewBatchActionsComponentvue_type_template_id_13b7a2b8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"grid-batch-actions text-right"},_vm._l((_vm.actions),function(action,$index){
var _obj;
return _c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(function () { return _vm.isDisabled(action) && action.getDisabledTooltip ? action.getDisabledTooltip() : ''; }),expression:"() => isDisabled(action) && action.getDisabledTooltip ? action.getDisabledTooltip() : ''",modifiers:{"bind":true}}],staticClass:"grid-batch-action-wrapper",class:{'more-actions': action === _vm.MORE_ACTIONS},style:({visibility: action === _vm.MORE_ACTIONS || (_vm.visibleActions && _vm.visibleActions.indexOf(action) !== -1) ? 'inherit' : 'hidden', opacity: action === _vm.MORE_ACTIONS || (_vm.visibleActions && _vm.visibleActions.indexOf(action) !== -1) ? 1 : 0}),attrs:{"data-action-id":action.name}},[(action !== _vm.MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen()))?_c('a',{class:( _obj = {disabled: _vm.isDisabled(action)}, _obj['btn batch-action-' + action.icon] = true, _obj ),on:{"click":function($event){$event.preventDefault();return _vm.perform(action)}}},[(action.img)?_c('img',{attrs:{"src":'images/' + action.icon + '.png'}}):_vm._e(),(!action.img)?_c('i',{class:'icon icon-' + action.icon}):_vm._e(),_vm._v(" "+_vm._s(action.name)+"\n            ")]):_vm._e(),(action === _vm.MORE_ACTIONS)?_c('div',{staticClass:"more-wrapper"},[_c('jf-actions',{attrs:{"parent-controller":_vm.jfTableViewBatchActions,"label":"More Actions","init-method":"initActions","show-drop-down-for-one-item":true}})],1):_vm._e()])}),0)])}
var JfTableViewBatchActionsComponentvue_type_template_id_13b7a2b8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=template&id=13b7a2b8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableViewBatchActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-view-batch-actions',
  props: ['actions', 'tableOptions'],
  'jf@inject': ['$element', '$scope', '$timeout'],
  data: function data() {
    return {
      MORE_ACTIONS: {
        '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$scope.$watch('jfTableViewBatchActions.tableOptions', function () {
      if (!_this.tableOptions) return;

      _this.tableOptions.on('selection.change', function () {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });
    });
    this.$scope.$on('ui-layout.resize', function () {
      _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    $(window).on('resize', function () {
      _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    this.$scope.$watch('jfTableViewBatchActions.actions', function () {
      return _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    this.$timeout(function () {
      _this.calcActionsVisibility();

      _this.$forceUpdate();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTableViewBatchActions'
  },
  methods: {
    perform: function perform(action) {
      if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
        action.callback && action.callback(this.tableOptions.getSelectedRows());
      }
    },
    anySelected: function anySelected() {
      return this.tableOptions && this.tableOptions.getSelectedRows().length > 0;
    },
    isDisabled: function isDisabled(action) {
      return !this.anySelected() || action.disabledWhen && action.disabledWhen();
    },
    calcActionsVisibility: function calcActionsVisibility() {
      var _this2 = this;

      if (!this.actions) return;
      var visible = [];
      var inDropDown = [];
      var moreDropdownWidth = 125;
      var elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');
      var containerWidth = $(this.$element).children().width();
      var totalWidth = 0;
      var addTo = visible;
      var moreActionsNewIndex = -1;
      var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

      for (var i = 0; i < elems.length; i++) {
        var el = $(elems[i]);
        totalWidth += el.width();
        var id = el.attr('data-action-id');

        var act = _.find(this.actions, {
          name: id
        });

        var index = this.actions.indexOf(act);

        if ((totalWidth > containerWidth || this.moreActions && this.moreActions.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) && addTo === visible) {
          addTo = inDropDown;
          moreActionsNewIndex = index;

          if (visible.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) {
            var last = visible.pop();
            inDropDown.push(last);
            moreActionsNewIndex = this.actions.indexOf(last);
          }
        }

        if (act) addTo.push(act);
      }

      if (totalWidth < containerWidth) {
        inDropDown = [];
        visible = _.filter(this.actions, function (act) {
          return act !== _this2.MORE_ACTIONS;
        });
        moreActionsNewIndex = -1;
      }

      var temp = {
        TEMP: 'TEMP'
      };

      if (moreActionsOldIndex !== -1) {
        this.actions.splice(moreActionsOldIndex, 1, temp);
      }

      if (moreActionsNewIndex !== -1) {
        this.actions.splice(moreActionsNewIndex, 0, this.MORE_ACTIONS);
      }

      var tempIndex = this.actions.indexOf(temp);

      if (tempIndex !== -1) {
        this.actions.splice(tempIndex, 1);
      }

      this.visibleActions = visible;
      this.moreActions = inDropDown;
      this.$timeout(function () {
        return _this2.updateMoreActions();
      });
    },
    initActions: function initActions(actionsController) {
      this.moreActionsController = actionsController;
      if (this.gridOptions) this.gridOptions.moreActionsController = actionsController;
      this.updateMoreActions();
    },
    updateMoreActions: function updateMoreActions() {
      var _this3 = this;

      if (!this.moreActionsController) return;

      var actionsCount = _.filter(this.actions, function (act) {
        return act !== _this3.MORE_ACTIONS;
      }).length;

      if (this.moreActions.length < actionsCount) {
        this.moreActionsController.label = 'More Actions';
      } else if (this.moreActions.length === actionsCount) {
        this.moreActionsController.label = 'Actions';
      }

      var dict = {};
      this.moreActions.forEach(function (action) {
        dict[action.name] = {
          title: action.name,
          icon: 'icon-' + action.icon,
          disabled: _this3.isDisabled(action)
        };
      });
      this.moreActionsController.setActionsDictionary(dict);
      this.moreActionsController.setActions(_.map(this.moreActions, function (_action) {
        return {
          name: _action.name,
          visibleWhen: _action.visibleWhen,
          action: function action() {
            return _this3.perform(_action);
          }
        };
      }));
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewBatchActionsComponentvue_type_script_lang_js_ = (JfTableViewBatchActionsComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue





/* normalize component */

var JfTableViewBatchActionsComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewBatchActionsComponentvue_type_script_lang_js_,
  JfTableViewBatchActionsComponentvue_type_template_id_13b7a2b8_scoped_true_render,
  JfTableViewBatchActionsComponentvue_type_template_id_13b7a2b8_scoped_true_staticRenderFns,
  false,
  null,
  "13b7a2b8",
  null
  
)

/* harmony default export */ var JfTableViewBatchActionsComponent = (JfTableViewBatchActionsComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/index.vue?vue&type=template&id=01b5badb&scoped=true&
var JfTableRowComponentvue_type_template_id_01b5badb_scoped_true_render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.data)?_c('div',{staticClass:"jf-table-row",class:( _obj = {headers: _vm.rowId === 'headers', 'group-header': _vm.data && _vm.data.$groupHeader, 'expanded': _vm.data && _vm.data.$groupHeader && _vm.data.$groupHeader.$expanded, 'sub-row': _vm.data && _vm.data.$parentRow, sticky: _vm.data && _vm.data.$sticky, selected: _vm.data && _vm.data.$selected, 'drag-mark': _vm.rowId !== 'headers' && _vm.tableView.options.draggableRows && !(_vm.tableView.options.registeredTabularDnd.dndCtrl.disabled) && _vm.isRowDraggable()}, _obj[_vm.data[_vm.tableView.options.rowClassAttr]] = _vm.tableView.options.rowClassAttr && _vm.data[_vm.tableView.options.rowClassAttr], _obj ),style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight, opacity: _vm.tableView.options.ready ? 1 : 0}),on:{"mousemove":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseMove($event)},"mousedown":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseDown($event)},"mouseup":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseUp($event)},"mouseleave":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseUp($event)},"click":function($event){return _vm.onRowClick($event)}}},[(_vm.tableView.options.hasSelection())?_c('div',{staticClass:"jf-table-cell selection",class:{'single-selection' : _vm.tableView.options.selectionMode === _vm.tableView.options.SINGLE_SELECTION},style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.selectionColumnWidth + 'px'})},[_c('div',{staticClass:"jf-table-cell-content"},[((!_vm.data.$groupHeader && _vm.rowId !== 'headers') || (_vm.tableView.options.selectionMode === _vm.tableView.options.MULTI_SELECTION && _vm.tableView.options.getRawData().length))?_c('div',{staticClass:"selection-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.selectionColumnWidth +'px'})},[_c('div',{staticClass:"selection-icon icon icon-datagrid-v",class:{selected: _vm.data.$selected || (_vm.rowId === 'headers' && _vm.tableView.allSelected)},on:{"click":function($event){_vm.toggleSelection(_vm.rowId === 'headers');$event.stopPropagation();}}})]):_vm._e()])]):_vm._e(),(_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell group-header",style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight,
                  lineHeight: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight})},[_c('i',{staticClass:"icon icon-small-arrow-down",class:{'expanded': _vm.data.$groupHeader.$expanded}}),(_vm.data.$groupHeader.col && !_vm.data.$groupHeader.col.cellTemplate)?_c('span',{staticClass:"jf-table-cell-content group-header"},[_vm._v("\n            "+_vm._s(_vm.data.$groupHeader.value)+"\n        ")]):_vm._e(),(_vm.data.$groupHeader.col && _vm.data.$groupHeader.col.cellTemplate)?_c('div',{staticClass:"jf-table-cell-content group-header"},[_c('jf-table-compiled-cell',{attrs:{"field":_vm.data.$groupHeader.field,"row-id":_vm.rowId,"table-row":_vm.jfTableRow}})],1):_vm._e(),_c('div',{staticClass:"group-header-count"},[_vm._v("("+_vm._s(_vm.data.$groupHeader.count)+")")])]):_vm._e(),_vm._l((_vm.tableView.options.columns),function(col,$index){
                  var _obj;
return (!_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell",class:( _obj = {header: _vm.rowId === 'headers' && col.header, sortable: _vm.rowId === 'headers' && _vm.tableView.options.sortable && _vm.tableView.options.getRawData().length && col.sortable && !_vm.hoveringResize, 'column-resizer': _vm.hoveringResize}, _obj['drag-right'] = col.$dragRightBorder, _obj['drag-left'] = col.$dragLeftBorder, _obj['field-id-' + _vm.kebab(col.field)] = true, _obj['row-expander-cell'] = $index === 0 && _vm.tableView.options.subRowsEnabled, _obj ),style:({height: _vm.rowId === 'headers' ? _vm.tableView.options.headerRowHeight : _vm.tableView.options.rowHeight, width: col.width}),on:{"click":function($event){return _vm.onClickCell(col,$event)}}},[($index === 0 && _vm.tableView.options.subRowsEnabled)?_c('div',{staticClass:"row-expander",class:{placeholder: (!_vm.data.$subRows && !_vm.data.$parentRow) || (_vm.data.$subRows && _vm.data.$subRows.length === 0) || (_vm.data.$parentRow)},style:({height: _vm.tableView.options.rowHeight}),on:{"click":function($event){return _vm.toggleExpansion($event)}}},[(_vm.data.$subRows && _vm.data.$subRows.length && !_vm.data.$parentRow && !_vm.data.$pendingSubRows)?_c('i',{staticClass:"action-icon icon icon-small-arrow-down",class:{'expanded': _vm.data.$expanded}}):_vm._e(),(_vm.data.$pendingSubRows)?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e()]):_vm._e(),((!col.cellTemplate && _vm.rowId !== 'headers') || (!col.headerCellTemplate && _vm.rowId === 'headers'))?_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-table-cell-content",class:{'row-expander-content': $index === 0 && _vm.tableView.options.subRowsEnabled,
                        'YO' : !(_vm.rowId === 'headers' &&
                                    _vm.tableView.options.sortable &&
                                    (_vm.tableView.options.sortByField === col.field || _vm.tableView.options.showSortingArrowsAlways) &&
                                    col.sortable && _vm.tableView.options.getRawData().length &&
                                    (col.header || col.headerCellTemplate)) &&
                                    col.textAlign === 'center'},style:({'text-align': col.textAlign || 'auto'})},[_vm._v("\n            "+_vm._s(_vm.getField(col.field))+"\n            "),_c('i',{staticClass:"icon sorting-icon icon-small-arrow-down",class:{'rotate180': !_vm.tableView.options.revSort || (_vm.tableView.options.sortByField !== col.field && _vm.tableView.options.showSortingArrowsAlways),
                          active: _vm.tableView.options.sortByField === col.field,
                          'invisible' : !(_vm.rowId === 'headers' && _vm.tableView.options.sortable && (_vm.tableView.options.sortByField === col.field || _vm.tableView.options.showSortingArrowsAlways) && col.sortable && _vm.tableView.options.getRawData().length && (col.header || col.headerCellTemplate))}}),(_vm.rowId === 'headers' && col.allowGrouping)?_c('div',{staticClass:"group-button-wrapper"},[_c('div',{staticClass:"group-button icon-grouping-off",class:{'icon-grouping-on': _vm.tableView.options.groupedBy === col.field},on:{"click":function($event){_vm.tableView.options.groupBy(col.field); $event.stopPropagation();}}})]):_vm._e()]):_vm._e(),((col.cellTemplate && _vm.rowId !== 'headers') || (col.headerCellTemplate && _vm.rowId === 'headers'))?_c('div',{staticClass:"jf-table-cell-content",class:{'drag-mark': $index === 0 && _vm.rowId !== 'headers' && _vm.tableView.options.draggableRows},style:({'text-align': col.textAlign || 'auto'})},[_c('jf-table-compiled-cell',{key:_vm.rowId,attrs:{"field":col.field,"row-id":_vm.rowId,"table-row":_vm.jfTableRow}}),(_vm.rowId === 'headers' && _vm.tableView.options.sortable && (_vm.tableView.options.sortByField === col.field || _vm.tableView.options.showSortingArrowsAlways) && col.sortable && _vm.tableView.options.getRawData().length && (col.header || col.headerCellTemplate))?_c('i',{staticClass:"icon sorting-icon",class:{'icon-down-arrow': _vm.tableView.options.revSort && _vm.tableView.options.sortByField === col.field, 'icon-up-arrow': !_vm.tableView.options.revSort || (_vm.tableView.options.sortByField !== col.field && _vm.tableView.options.showSortingArrowsAlways), active: _vm.tableView.options.sortByField === col.field}}):_vm._e(),(_vm.rowId === 'headers' && col.allowGrouping)?_c('div',{staticClass:"group-button-wrapper"},[_c('div',{staticClass:"group-button icon-grouping-off",class:{'icon-grouping-on': _vm.tableView.options.groupedBy === col.field},on:{"click":function($event){_vm.tableView.options.groupBy(col.field); $event.stopPropagation();}}})]):_vm._e()],1):_vm._e()]):_vm._e()}),(_vm.rowId !== 'headers' && _vm.tableView.options.actions.length && !_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell actions",style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight, width: _vm._getRowActionsWidth()})},[_c('div',{staticClass:"jf-table-cell-content"},[_vm._l((_vm.tableView.options.actions),function(action){return (_vm.tableView.options.actions.length <= 3 || _vm.tableView.options.isRowActionGroupingDisabled)?_c('div',{staticClass:"action-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.actionButtonSize + 'px', visibility: !action.visibleWhen || action.visibleWhen(_vm.data) ? 'visible' : 'hidden'})},[_c('row-action',{attrs:{"action":action,"data":_vm.data,"on-action-click":_vm.fireAction}})],1):_vm._e()}),(_vm.tableView.options && !_vm.tableView.options.isRowActionGroupingDisabled && _vm.tableView.options.actions.length > 3 )?_c('div',{staticClass:"action-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.actionButtonSize + 'px', visibility: _vm.tableView.options.hasVisibleActionsFor(_vm.data) ? 'visible' : 'hidden'})},[_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.actionsTooltip),expression:"actionsTooltip",modifiers:{"bind":true}}],staticClass:"action-icon icon-more",on:{"click":function($event){return _vm.toggleActionsDropdown($event)}}})]):_vm._e()],2)]):_vm._e(),(_vm.rowId === 'headers' && _vm.tableView.options.columnsCustomization)?_c('div',{staticClass:"columns-customization-icon",on:{"click":function($event){return _vm.tableView.options.toggleColumnsCustomizationDropdown()}}},[_c('i',{staticClass:"icon-menu-arrow"})]):_vm._e(),(_vm.actionsDropdownOpen)?_c('div',{staticClass:"jf-table-row-actions-dropdown"},_vm._l((_vm.tableView.options.actions),function(action){return (!action.visibleWhen || action.visibleWhen(_vm.data))?_c('div',{staticClass:"action-item",attrs:{"icon-name":action.icon || ''},on:{"click":function($event){_vm.fireAction(action);$event.stopPropagation();_vm.actionsDropdownOpen=false;}}},[_c('i',{staticClass:"action-icon",class:action.icon}),(!action.href)?_c('span',[_vm._v(_vm._s(action.tooltip))]):_vm._e(),(action.href)?_c('a',{attrs:{"href":action.href(_vm.data)}},[_vm._v(_vm._s(action.tooltip))]):_vm._e()]):_vm._e()}),0):_vm._e()],2):_vm._e()}
var JfTableRowComponentvue_type_template_id_01b5badb_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue?vue&type=template&id=01b5badb&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=template&id=16c7be22&scoped=true&
var RowActionvue_type_template_id_16c7be22_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.action.href)?_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.action.tooltip),expression:"action.tooltip",modifiers:{"bind":true}}],staticClass:"action-icon",class:_vm.action.icon,on:{"click":function($event){return _vm.actionHandler(_vm.action,$event)}}}):_vm._e(),(_vm.action.href)?_c('a',{attrs:{"href":_vm.action.href(_vm.data)},on:{"click":function($event){return _vm.actionHandler(_vm.action,$event)}}},[_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.action.tooltip),expression:"action.tooltip",modifiers:{"bind":true}}],staticClass:"action-icon",class:_vm.action.icon})]):_vm._e()])}
var RowActionvue_type_template_id_16c7be22_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=template&id=16c7be22&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var RowActionvue_type_script_lang_js_ = ({
  name: 'RowAction',
  props: ['onActionClick', 'action', 'data'],
  methods: {
    actionHandler: function actionHandler(action, $event) {
      $event.stopPropagation();
      this.onActionClick(action);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RowActionvue_type_script_lang_js_ = (RowActionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue





/* normalize component */

var RowAction_component = Object(componentNormalizer["a" /* default */])(
  components_RowActionvue_type_script_lang_js_,
  RowActionvue_type_template_id_16c7be22_scoped_true_render,
  RowActionvue_type_template_id_16c7be22_scoped_true_staticRenderFns,
  false,
  null,
  "16c7be22",
  null
  
)

/* harmony default export */ var RowAction = (RowAction_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfTableRowComponentvue_type_script_lang_js_ = ({
  components: {
    RowAction: RowAction
  },
  name: 'jf-table-row',
  props: ['data', 'rowId', 'tableView'],
  'jf@inject': ['$scope', '$element', '$timeout', 'JFrogEventBus'],
  data: function data() {
    return {
      hoveringResize: null,
      actionsDropdownOpen: null
    };
  },
  computed: {
    actionsTooltip: function actionsTooltip() {
      return this.actionsDropdownOpen ? '' : 'Actions';
    }
  },
  created: function created() {
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
  },
  mounted: function mounted() {
    var _this = this;

    $(this.$el).prop('comp', this);
    this.templatesCount = _.filter(this.tableView.options.columns, function (col) {
      return !!col.cellTemplate;
    }).length;
    this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, function (tableView) {
      if (tableView === _this.tableView) _this.actionsDropdownOpen = false;
    });
    if (this.tableView.options.draggableRows) this.$timeout(function () {
      return _this.initDragAndDrop();
    });
    $(this.$element).prop('ctrl', this);
  },
  ng1_legacy: {
    'controllerAs': 'jfTableRow'
  },
  methods: {
    getField: function getField(field) {
      return _.get(this.data, field);
    },
    kebab: function kebab(str) {
      return _.kebabCase(str);
    },
    toggleSelection: function toggleSelection(all) {
      if (this.tableView.options.isRowSelectable && !this.tableView.options.isRowSelectable({
        entity: this.data
      })) return;

      if (!all) {
        if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
          this.$set(this.data, '$selected', !this.data.$selected);

          if (!this.data.$selected) {
            this.$set(this.tableView, 'allSelected', false);

            if (this.tableView.options.groupedBy) {
              var groupHeader = _.find(this.tableView.options.getPrePagedData(), {
                $groupHeader: {
                  value: _.get(this.data, this.tableView.options.groupedBy)
                }
              });

              if (groupHeader) groupHeader.$selected = false;
            }
          }

          if (this.data.$groupHeader) this.tableView.groupSelection(this.data);
        } else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
          this.tableView.clearSelection();
          this.$set(this.data, '$selected', true);
        }
      } else {
        this.tableView.toggleSelectAll();
      }

      this.tableView.options.fire('selection.change', this.tableView.options.getSelectedRows());
    },
    toggleGroupExpansion: function toggleGroupExpansion() {
      this.$set(this.data.$groupHeader, '$expanded', !this.data.$groupHeader.$expanded);
      this.tableView.options.updateGroupExpansionState(this.data);
      this.$forceUpdate();
    },
    fireAction: function fireAction(action) {
      if (action.callback) action.callback(this.data);
      this.tableView.onUpdateFilter();
    },
    onMouseMove: function onMouseMove(e) {
      if (!this.resizingColumns) {
        if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
        if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
        this.hoveringResize = this._getHoveringResizePoint(e);
      } else {
        this.dragColumnResize(e);
      }
    },
    dragColumnResize: function dragColumnResize(e) {
      var MIN_WIDTH = 5; //percent

      var container = this._getTableContainer();

      var containerWidth = container.innerWidth();
      var mouseX = e.pageX - container.offset().left;
      var mouseXPerc = Math.round(mouseX / containerWidth * 100);
      var offset = mouseXPerc - this.resizeDragStart;
      var newLeftWidth, newRightWidth;

      if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('%')) {
        newLeftWidth = parse_float_default()(this.hoveringResize.origLeftWidth) + offset + '%';
      } else if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('px')) {
        var perc = parse_float_default()(this.hoveringResize.origLeftWidth) / containerWidth * 100;
        newLeftWidth = perc + offset + '%';
      }

      if (this.hoveringResize.right) {
        if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('%')) {
          newRightWidth = parse_float_default()(this.hoveringResize.origRightWidth) - offset + '%';
        } else if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('px')) {
          var _perc = parse_float_default()(this.hoveringResize.origRightWidth) / containerWidth * 100;

          newRightWidth = _perc - offset + '%';
        }
      }

      if (parse_float_default()(newLeftWidth) > MIN_WIDTH && (!newRightWidth || parse_float_default()(newRightWidth) > MIN_WIDTH)) {
        this.$set(this.hoveringResize.left, 'width', this.$set(this.hoveringResize.left, 'origWidth', newLeftWidth));
        if (this.hoveringResize.right) this.$set(this.hoveringResize.right, 'width', this.$set(this.hoveringResize.right, 'origWidth', newRightWidth));
      }
    },
    onMouseDown: function onMouseDown(e) {
      if (this.hoveringResize) {
        var container = this._getTableContainer();

        var containerWidth = container.innerWidth();
        var mouseX = e.pageX - container.offset().left;
        var mouseXPerc = Math.round(mouseX / containerWidth * 100);
        this.resizingColumns = true;
        this.resizeDragStart = mouseXPerc;
        this.$set(this.hoveringResize.left, '$dragRightBorder', true);
        if (this.hoveringResize.right) this.$set(this.hoveringResize.right, '$dragLeftBorder', true);
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
      if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
      this.resizingColumns = false;
      delete this.resizeDragStart;
    },
    _getHoveringResizePoint: function _getHoveringResizePoint(e) {
      var columns = this.tableView.options.columns;

      var container = this._getTableContainer();

      var containerWidth = container.innerWidth();
      var mouseX = e.pageX - container.offset().left;
      var mouseXPerc = Math.round(mouseX / containerWidth * 100);
      var percCount = this.tableView.options.hasSelection() ? this.tableView.options.selectionColumnWidth / containerWidth * 100 : 0;
      var hovering = false;

      for (var colI = 0; colI < columns.length; colI++) {
        var col = columns[colI];

        if (_.isString(col.width) && col.width.endsWith('%')) {
          percCount += parse_float_default()(col.width);
        } else if (_.isString(col.width) && col.width.endsWith('px')) {
          var perc = parse_float_default()(col.width) / containerWidth * 100;
          percCount += perc;
        }

        if (Math.abs(percCount - mouseXPerc) <= 0.5) {
          hovering = {
            left: col,
            right: columns[colI + 1],
            origLeftWidth: col.width,
            origRightWidth: columns[colI + 1] ? columns[colI + 1].width : undefined
          };
          break;
        }
      }

      return hovering;
    },
    _getTableContainer: function _getTableContainer() {
      return $(this.tableView.$element).find('.jf-table-view-container');
    },
    onClickCell: function onClickCell(col, event) {
      //        event.stopPropagation();
      if (this.rowId === 'headers' && col.header && this.tableView.options.sortable && !this.hoveringResize && col.sortable) {
        this.tableView.options.sortBy(col.field);
        this.$forceUpdate();
      }
    },
    onRowClick: function onRowClick($event) {
      if (this.data.$groupHeader) {
        this.toggleGroupExpansion();
      } else {
        if (this.rowId !== 'headers') this.tableView.options.fire('row.clicked', {
          entity: this.data,
          event: $event
        });
      }
    },
    toggleExpansion: function toggleExpansion($event) {
      $event.stopPropagation();
      this.tableView.options.toggleExpansion(this.data);
    },
    toggleActionsDropdown: function toggleActionsDropdown(e) {
      e.stopPropagation();
      var origState = this.actionsDropdownOpen;
      this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this.tableView);
      this.actionsDropdownOpen = !origState;
    },
    initDragAndDrop: function initDragAndDrop() {
      var _this2 = this;

      if (this.rowId === 'headers') return;
      window.$(this.$element).draggable({
        helper: 'clone',
        scroll: true,
        distance: 10,
        appendTo: $(this.tableView.$element).find('.jf-table-view-container'),
        start: function start(event, ui) {
          return _this2.dragStart(event, ui);
        },
        stop: function stop(event, ui) {
          return _this2.dragStop(event, ui);
        },
        drag: function drag(event, ui) {
          return _this2.dragMove(event, ui);
        }
      });
      $(this.$element).addClass('drag-enabled');
    },
    dragStart: function dragStart(event, ui) {
      if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.disabled) {
        event.preventDefault();
        return;
      }

      if (!this.isRowDraggable()) {
        event.preventDefault();
        return;
      }

      $('body').addClass('grabbing');
      this.tableView.options.dragRow(this.data);
      this.initDragHelper(ui.helper);
    },
    isRowDraggable: function isRowDraggable() {
      if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr && !_.isUndefined(this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) && !this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) {
        return false;
      } else return true;
    },
    initDragHelper: function initDragHelper(helper) {
      helper.addClass('row-drag-helper');

      if (this.tableView.options.registeredTabularDnd) {
        var numOfDraggedRows = this.tableView.options.draggedRows ? this.tableView.options.draggedRows.length : 1;

        if (numOfDraggedRows > 1) {
          helper.addClass('multiple').html("<span>\u2261</span>" + numOfDraggedRows + ' ' + this.tableView.getObjectNameByCount(numOfDraggedRows, this.tableView.options.registeredTabularDnd.dndCtrl.entityName || 'Item'));
        }
      }
    },
    dragStop: function dragStop(event, ui) {
      var _this3 = this;

      var draggedRowsArrayForDndEvent = this.tableView.options.draggedRow ? [this.tableView.options.draggedRow] : _.map(this.tableView.options.draggedRows, 'row');
      var target = $(event.originalEvent.target);
      target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];
      $('body').removeClass('grabbing');

      var handleForeignDrop = function handleForeignDrop(targetRow) {
        _this3.tableView.options.registeredTabularDnd.dndOther.dropDraggedRow(targetRow, _this3.tableView.options.draggedRow || _this3.tableView.options.draggedRows, true);

        _this3.tableView.options.markDropTarget(null);

        _this3.tableView.options.registeredTabularDnd.dndCtrl.onDragTransfer(draggedRowsArrayForDndEvent, _this3.tableView.options);

        delete _this3.tableView.options.draggedRow;
        delete _this3.tableView.options.draggedRows;
      };

      if (target) {
        if (this.isForeignDrop(target)) {
          handleForeignDrop($(target).prop('ctrl').data);
        } else {
          this.tableView.options.dropDraggedRow($(target).prop('ctrl').data);
        }
      } else {
        if (this.tableView.options.registeredTabularDnd) {
          if ($(event.originalEvent.target).is('.empty-table-placeholder') && $(event.originalEvent.target).parents('.jf-table-view')[0] !== $(this.tableView.$element).find('.jf-table-view')[0]) {
            handleForeignDrop(null);
          } else {
            var container = $(event.originalEvent.target).is('.tabular-dnd-table-container') ? $(event.originalEvent.target) : $(event.originalEvent.target).parents('.tabular-dnd-table-container');
            var myRole = this.tableView.options.registeredTabularDnd.dndRole;

            if (container && (container.is('.available-table') && myRole === 'selected' || container.is('.selected-table') && myRole === 'available')) {
              handleForeignDrop(null);
            } else {
              this.tableView.options.dropDraggedRow();
            }
          }
        } else {
          this.tableView.options.dropDraggedRow();
        }
      }
    },
    handleScrollOnDrag: function handleScrollOnDrag(target, event) {
      if (this.tableView.options.paginationMode === this.tableView.options.VIRTUAL_SCROLL) {
        var tableView;

        if (this.tableView.options.registeredTabularDnd && target) {
          var rowCtrl = $(target).prop('ctrl');
          tableView = rowCtrl.tableView;
        } else if (!this.tableView.options.registeredTabularDnd) {
          tableView = this.tableView;
        }

        if (!tableView) return;
        var container = $(tableView.$element).find('.table-rows-container');
        var containerY = container[0].getClientRects()[0].y;
        var relativeY = event.clientY - containerY;
        var containerHeight = container.height();
        var vsApi = tableView.vsApi;

        if (relativeY < 50) {
          vsApi.scroll(-0.1 * (50 - relativeY));
        } else if (relativeY > containerHeight - 50) {
          vsApi.scroll(0.1 * (50 - (containerHeight - relativeY)));
        }
      }
    },
    dragMove: function dragMove(event, ui) {
      var target = $(event.originalEvent.target);
      target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];
      this.handleScrollOnDrag(target, event);
      if (!target && $(event.originalEvent.target).is('.empty-table-placeholder')) target = event.originalEvent.target;

      if (target) {
        this.tableView.options.markDropTarget($(target));
      } else {
        this.tableView.options.markDropTarget(null);
      }
    },
    isForeignDrop: function isForeignDrop(dropTarget) {
      if (!this.tableView.options.registeredTabularDnd) return false;else {
        var targetTableView = $(dropTarget).prop('ctrl') ? $(dropTarget).prop('ctrl').tableView : null;
        if (targetTableView && targetTableView.options === this.tableView.options.registeredTabularDnd.dndOther) return true;else return false;
      }
    },
    _getRowActionsWidth: function _getRowActionsWidth() {
      return this.tableView.options.getActionsContainerWidthInPixels() + 'px';
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableRowComponentvue_type_script_lang_js_ = (JfTableRowComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue





/* normalize component */

var JfTableRowComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableRowComponentvue_type_script_lang_js_,
  JfTableRowComponentvue_type_template_id_01b5badb_scoped_true_render,
  JfTableRowComponentvue_type_template_id_01b5badb_scoped_true_staticRenderFns,
  false,
  null,
  "01b5badb",
  null
  
)

/* harmony default export */ var JfTableRowComponent = (JfTableRowComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewComponent/index.vue?vue&type=template&id=eef9187a&scoped=true&
var JfTableViewComponentvue_type_template_id_eef9187a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-table-view",staticStyle:{"clear":"both"}},[_c('div',{staticClass:"new-entity-wrapper"},[(_vm.options && _vm.options.newEntityCallback)?_c('a',{staticClass:"new-entity",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.createNewEntity()}}},[_c('i',{staticClass:"icon icon-new"}),(_vm.options && !_vm.options.newEntityCustomText)?_c('span',[_vm._v("Add "+_vm._s(_vm.options.useAnWithObjectName ? 'an' : 'a')+" "+_vm._s(_vm.objectName ? _vm.objectName.split('/')[0] : _vm.options.objectName ? _vm.options.objectName.split('/')[0] : 'Item'))]):_vm._e(),(_vm.options && _vm.options.newEntityCustomText)?_c('span',[_vm._v(_vm._s(_vm.options.newEntityCustomText))]):_vm._e()]):_vm._e()]),_c('jf-table-top',{ref:"top",attrs:{"total-records":_vm.getTotalRecords(),"table-view":_vm.jfTableView}},[_vm._t("external-filters",null,{"slot":"external-filters"})],2),(_vm.options && _vm.options.columnsCustomization)?_c('div',{staticClass:"columns-customization-wrap"},[_c('div',{staticClass:"columns-customization pull-right"},[_c('jf-multi-dropdown',{attrs:{"title":"Columns","no-filter":"true","filter-placeholder":"Filter Columns","items":_vm.options.availableColumns,"on-change":"options.updateCustomizedColumns()"}})],1)]):_vm._e(),(_vm.options)?_c('div',{staticClass:"jf-table-view-container"},[(_vm.options && _vm.options.headersVisible)?_c('div',{staticClass:"jf-table-view-header"},[_c('jf-table-row',{attrs:{"table-view":_vm.jfTableView,"row-id":'headers',"data":_vm.options.headersRow}})],1):_vm._e(),(_vm.options && (_vm.options.paginationMode === _vm.options.VIRTUAL_SCROLL || _vm.options.paginationMode === _vm.options.INFINITE_VIRTUAL_SCROLL))?_c('div',{staticClass:"table-rows-container",style:({height: _vm.getActualPageHeight() + 'px'})},[_c('jf-vscroll',{attrs:{"with-each":"entity","prevent-default-scroll":this.options.pendingInfiniteScroll,"in":_vm.options.getPrePagedData(),"api":_vm.vsApi}},[_c('div',{pre:true},[_c('div',{pre:true,attrs:{"v-if":"is_last() && options && options.pendingInfiniteScroll && options.paginationMode === options.INFINITE_VIRTUAL_SCROLL",":style":"{height: options.rowHeight}","class":"loading-more"}},[_c('div',{pre:true,attrs:{"class":"spinner-msg-local"}},[_c('div',{pre:true,attrs:{"class":"icon-hourglass-local"}})])]),_c('jf-table-row',{pre:true,attrs:{"v-else":"",":table-view":"jfTableView",":row-id":"v_index()",":data":"entity"}})],1)])],1):_vm._e(),(_vm.options && _vm.options.paginationMode !== _vm.options.VIRTUAL_SCROLL && _vm.options.paginationMode !== _vm.options.INFINITE_VIRTUAL_SCROLL)?_c('div',{staticClass:"table-rows-container"},_vm._l((_vm.options.getPageData()),function(entity,$index){return _c('jf-table-row',{key:$index,attrs:{"table-view":_vm.jfTableView,"row-id":$index,"data":entity}})}),1):_vm._e(),(_vm.options && _vm.options.dataWasSet && !_vm.options.getRawData().length && !_vm.options.pendingExternalPaging && (!_vm.options.externalTotalCount || _vm.options.externalTotalCount.total === 0))?_c('div',{staticClass:"empty-table-placeholder",style:(_vm.options.registeredTabularDnd ? _vm.options.registeredTabularDnd.emptyTableStyle : {})},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.options.emptyTableText || 'This table is empty !')}}),(_vm.options.emptyTableAction && _vm.options.emptyTableCallActionText)?_c('a',{staticClass:"jf-link",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.options.emptyTableAction()}}},[_vm._v(_vm._s(_vm.options.emptyTableCallActionText))]):_vm._e()]):_vm._e(),(_vm.options && _vm.noFilterResults)?_c('div',{staticClass:"empty-table-placeholder filter-no-results"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.options.noFilterResultsText || 'Current filter has no results.')}}),(_vm.tableFilter)?_c('a',{staticClass:"jf-link",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.clearFilter()}}},[_vm._v("Clear filter")]):_vm._e()]):_vm._e(),(_vm.options && _vm.options.pendingInfiniteScroll && _vm.options.paginationMode !== _vm.options.INFINITE_VIRTUAL_SCROLL)?_c('div',{staticClass:"loading-more",style:({height: _vm.options.rowHeight})},[_vm._m(0)]):_vm._e()]):_vm._e()],1)])}
var JfTableViewComponentvue_type_template_id_eef9187a_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})])}]


// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=template&id=eef9187a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewComponent/index.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableViewComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-view',
  props: ['options', 'objectName'],
  'jf@inject': ['$scope', '$element', '$timeout', '$compileComp', '$rootScope', 'JFrogEventBus'],
  data: function data() {
    var _this = this;

    return {
      vsApi: {
        onInit: function onInit() {
          _this.vsApi.registerScrollListener(function (scrollPos) {
            return _this.onVScroll(scrollPos);
          });
        }
      },
      noFilterResults: null,
      tableFilter: null,
      currentPage: 0,
      allSelected: false,
      jfTableView: this,
      cellScopes: [],
      cellComponents: []
    };
  },
  created: function created() {
    var _this2 = this;

    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.$scope.$watch('jfTableView.options', function (options) {
      if (_this2.options && _this2.options.dirCtrl !== _this2) {
        _this2.options._setDirectiveController(_this2);
      }

      if (_this2.options && !_this2.paginationApi) {
        _this2.paginationApi = new JfTableViewComponentvue_type_script_lang_js_PaginationApi(_this2);

        _this2.paginationApi.registerChangeListener(function () {
          _this2.refresh(false);

          _this2._fireDebouncedRowsInView();
        });

        _this2.currentPage = 0;
      }
    });

    var on_resize = function on_resize() {
      _this2.options._normalizeWidths();

      _this2._fireDebouncedRowsInView();

      _this2.$forceUpdate();

      if (_this2.vsApi && _this2.vsApi.refresh) _this2.vsApi.refresh();
    };

    $(window).on('resize', on_resize);
    this.$scope.$on('$destroy', function () {
      //                this.cellScopes.forEach(s => s.$destroy());
      $(window).off('resize', on_resize);
    });
  },
  mounted: function mounted() {
    this.$containerElement = this.$element.find('.jf-table-view');

    this._handleDocumentClick();
  },
  ng1_legacy: {
    'controllerAs': 'jfTableView'
  },
  methods: {
    clearFilter: function clearFilter() {
      this.tableFilter = '';
      this.onUpdateFilter();
    },
    getActualPageHeight: function getActualPageHeight() {
      var maxForInfiniteVirtualScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (maxForInfiniteVirtualScroll) {
        return $(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top;
      } else if (this.options.rowsPerPage === 'auto' && $(this.$element).find('.table-rows-container').length) {
        return Math.min($(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top, parse_float_default()(this.options.rowHeight) * this.options.getPrePagedData().length);
      } else {
        return parse_float_default()(this.options.rowHeight) * Math.min(this.options.rowsPerPage, this.options.getPrePagedData().length) + 2;
      }
    },
    compileTemplate: function compileTemplate(field, rowId) {
      var columnObj = _.find(this.options.columns, {
        field: field
      });

      var rowObj = rowId !== 'headers' ? this.options.getPageData()[rowId] : this.options.headersRow;
      if (!rowObj) return;

      if (rowObj.$groupHeader) {
        var groupRowObj = {};

        _.set(groupRowObj, rowObj.$groupHeader.field, rowObj.$groupHeader.value);

        rowObj = groupRowObj;
      }

      var existingScope = _.find(this.cellScopes, function (s) {
        return s.row.uid === rowId && s.col.field === columnObj.field;
      });

      var rowScope;

      if (!existingScope) {
        rowScope = {
          row: {
            entity: rowObj,
            uid: rowId
          },
          col: columnObj,
          MODEL_COL_FIELD: _.get(rowObj, field),
          COL_FIELD: _.get(rowObj, field),
          appScope: this.options.appScope,
          grid: {
            appScope: this.options.appScope
          },
          //Backward compatibility with old grid
          table: {
            options: this.options
          }
        };
        this.cellScopes.push(rowScope);
        var template = rowId !== 'headers' ? columnObj.cellTemplate : columnObj.headerCellTemplate;
        var templateElem = $('<div>' + template + '</div>');

        this._autoAddEllipsisClass(templateElem);

        template = templateElem.html();
        /*
                            if (this.options.appScope && this.options.appScope.$comp) {
                                rowScope.$comp.$options.components = this.options.appScope.$comp.$options.components;
                            }
        */

        var compOptions = this.$compileComp(template, {}, this.options.appScope && this.options.appScope.$comp);
        compOptions.props = keys_default()(rowScope);
        this.cellComponents.push(compOptions);
        return {
          comp: compOptions,
          props: rowScope
        };
      } else {
        var index = this.cellScopes.indexOf(existingScope);
        var comp = this.cellComponents[index];

        var scope = Object(objectSpread["a" /* default */])({}, existingScope, {
          row: {}
        });

        scope.row.entity = rowObj;
        scope.row.uid = rowId;
        return {
          comp: comp,
          props: scope
        };
      }
    },
    _autoAddEllipsisClass: function _autoAddEllipsisClass(templateRoot) {
      var allText = templateRoot.text();
      var elementToAddTo = null;

      var recursiveAdd = function recursiveAdd(root) {
        var children = root.children();
        var childToRecurseInto = null;

        for (var i = 0; i < children.length; i++) {
          var child = $(children[i]);

          if (child.text() === allText) {
            childToRecurseInto = child;
            break;
          }
        }

        if (childToRecurseInto) {
          recursiveAdd(childToRecurseInto);
        } else {
          elementToAddTo = root;
        }
      };

      recursiveAdd(templateRoot);

      if (elementToAddTo) {
        if (!elementToAddTo.is('[disable-tooltip-on-overflow]')) {
          elementToAddTo.attr('v-jf-tooltip-on-overflow', '');
        }

        elementToAddTo.addClass('overflow-ellipsis');
      }
    },
    onUpdateFilter: function onUpdateFilter() {
      this.options.refreshFilter();
      this.refresh();
      this.paginationApi.setPage(1, true);
      this.paginationApi.update();
    },
    refresh: function refresh() {
      var updatePagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var pageData = this.options.getPageData();
      /*
                      let unusedScopes = _.filter(this.cellScopes, scope => pageData.indexOf(scope.row.entity) === -1);
                      unusedScopes.forEach(s => {
                          this.cellScopes.splice(this.cellScopes.indexOf(s), 1);
      //                    s.$destroy();
                      });
      */

      if (this.paginationApi && updatePagination) this.paginationApi.update();
      this.$forceUpdate();
    },
    clearSelection: function clearSelection() {
      var _this3 = this;

      this.options.getRawData().forEach(function (row) {
        return _this3.$delete(row, '$selected');
      });
      this.allSelected = false;
    },
    toggleSelectAll: function toggleSelectAll() {
      var _this4 = this;

      this.allSelected = !this.allSelected;
      this.options.getPrePagedData().forEach(function (row) {
        if (_this4.options.isRowSelectable && !_this4.options.isRowSelectable({
          entity: row
        })) {
          _this4.$set(row, '$selected', false);
        } else {
          _this4.$set(row, '$selected', _this4.allSelected);
        }
      });

      if (this.options.groupedBy) {
        this.options.getFilteredData().forEach(function (row) {
          if (_this4.options.isRowSelectable && !_this4.options.isRowSelectable({
            entity: row
          })) {
            _this4.$set(row, '$selected', false);
          } else {
            _this4.$set(row, '$selected', _this4.allSelected);
          }
        });
      }
    },
    onVScroll: function onVScroll(scrollPos) {
      var virtualScrollIndex = Math.floor(scrollPos);
      var virtualScrollDisplacement = scrollPos - virtualScrollIndex;
      this.currentPage = Math.floor((virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
      this.paginationApi.update();

      this._fireDebouncedRowsInView();
    },
    _fireDebouncedRowsInView: function _fireDebouncedRowsInView() {
      var _this5 = this;

      if (!this.options.hasListenersFor('row.in.view')) return;

      var debounceCall = function debounceCall(debouncedFunc, debounceTime) {
        if (_this5.debounceTimeout) _this5.$timeout.cancel(_this5.debounceTimeout);
        _this5.debounceTimeout = _this5.$timeout(function () {
          debouncedFunc();
        }, debounceTime);
      };
      /*
                      debounceCall(() => {
                          let pageData = this.options.paginationMode === this.options.VIRTUAL_SCROLL ? this.vsApi.getPageData() : this.options.getPageData();
                          let lriv = this.lastRowsInView || [];
                          this.lastRowsInView = pageData;
                          pageData = _.filter(pageData, row => !_.includes(lriv, row));
                          pageData.forEach(row => this.options.fire('row.in.view', row));
                      }, this.options.rowInViewDebounceTime);
      */

    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.options.getPrePagedData().length * parse_float_default()(this.options.rowHeight) + 'px';
    },
    getScrollWidth: function getScrollWidth() {
      var el = $(this.$element).find('.scroll-faker-container')[0];
      return el.offsetWidth - el.clientWidth;
    },
    createNewEntity: function createNewEntity() {
      var _this6 = this;

      this.options.newEntityCallback();
      this.$timeout(function () {
        return _this6.onUpdateFilter();
      });
    },
    groupSelection: function groupSelection(groupHeader) {
      var query = {};

      _.set(query, groupHeader.$groupHeader.field, groupHeader.$groupHeader.value);

      var group = _.filter(this.options.getFilteredData(), query);

      group.forEach(function (row) {
        return row.$selected = groupHeader.$selected;
      });
    },
    initFilter: function initFilter() {
      var _this7 = this;

      this.$timeout(function () {
        if (_this7.options && _this7.options.autoFocusFilter) {
          var filterInput = $(_this7.$element).find('.jf-table-filter input');
          filterInput.focus();
        }
      });
    },
    getTotalRecords: function getTotalRecords() {
      if (!this.options) return;
      var count = 0;

      if (this.options.paginationMode === this.options.EXTERNAL_PAGINATION) {
        count = this.options.getTotalLengthOfData();
      } else {
        count = _.filter(this.options.getFilteredData(), function (record) {
          return !record.$parentRow;
        }).length;
      }

      return count + ' ' + this.getObjectNameByCount(count);
    },
    getObjectNameByCount: function getObjectNameByCount(count, objectName) {
      objectName = objectName || this.options.objectName;
      var recordsName;

      if (objectName) {
        if (objectName.indexOf('/') >= 0) {
          var splited = objectName.split('/');
          recordsName = count !== 1 ? splited[1] : splited[0];
        } else {
          recordsName = count !== 1 ? objectName + 's' : objectName;
        }
      } else {
        recordsName = count !== 1 ? 'records' : 'record';
      }

      return _.startCase(recordsName);
    },
    getSelectedRecords: function getSelectedRecords() {
      if (!this.options) return 0;
      var count = this.options.getSelectedRows().length;
      return count;
    },
    _handleDocumentClick: function _handleDocumentClick() {
      var _this8 = this;

      var handler = function handler(e) {
        _this8.$timeout(function () {
          var shouldCloseDropdown = !$(e.target).parents('.jf-table-cell.actions').length || $(e.target).parents('.jf-table-view')[0] !== $(_this8.$element).find('.jf-table-view')[0];
          if (shouldCloseDropdown) _this8.JFrogEventBus.dispatch(_this8.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, _this8);
        });
      };

      $(document).on('click', handler);
      this.$scope.$on('$destroy', function () {
        $(document).off('click', handler);
      });
    }
  }
});

var JfTableViewComponentvue_type_script_lang_js_PaginationApi =
/*#__PURE__*/
function () {
  function PaginationApi(tableCtrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.tableCtrl = tableCtrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      return Math.ceil(this.tableCtrl.options.getTotalLengthOfData() / this.tableCtrl.options.rowsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return this.tableCtrl.currentPage + 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.getCurrentPage() === this.getTotalPages()) return;
      this.tableCtrl.currentPage++;
      this.syncVirtualScroll();
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.getCurrentPage() === 1) return;
      this.tableCtrl.currentPage--;
      this.syncVirtualScroll();
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "sendExternalPageRequest",
    value: function sendExternalPageRequest() {
      if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.EXTERNAL_PAGINATION) {
        this.tableCtrl.options.sendExternalPageRequest();
      }
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (pageNum < 1 || pageNum > this.getTotalPages()) return;
      this.tableCtrl.currentPage = pageNum - 1;
      this.syncVirtualScroll(jump);
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "update",
    value: function update() {
      var _this9 = this;

      if (this.getCurrentPage() > this.getTotalPages()) {
        this.setPage(1, true);
      }

      if (this.listeners) this.listeners.forEach(function (listener) {
        return listener(_this9.getCurrentPage());
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      if (!this.listeners) this.listeners = [];
      this.listeners.push(listener);
    }
  }, {
    key: "syncVirtualScroll",
    value: function syncVirtualScroll() {
      var jump = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
        this.tableCtrl.vsApi.scrollTo(this.tableCtrl.currentPage * this.tableCtrl.options.rowsPerPage, jump ? 0 : 500);
      }
    }
  }]);

  return PaginationApi;
}();
// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewComponentvue_type_script_lang_js_ = (JfTableViewComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=style&index=0&id=eef9187a&scoped=true&lang=less&
var JfTableViewComponentvue_type_style_index_0_id_eef9187a_scoped_true_lang_less_ = __webpack_require__("54d4");

// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue






/* normalize component */

var JfTableViewComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewComponentvue_type_script_lang_js_,
  JfTableViewComponentvue_type_template_id_eef9187a_scoped_true_render,
  JfTableViewComponentvue_type_template_id_eef9187a_scoped_true_staticRenderFns,
  false,
  null,
  "eef9187a",
  null
  
)

/* harmony default export */ var JfTableViewComponent = (JfTableViewComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewWrapper/index.vue?vue&type=template&id=2076319c&scoped=true&
var JfTableViewWrappervue_type_template_id_2076319c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('jf-table-view',{attrs:{"options":_vm.tableOptions}},[_vm._t("external-filters",null,{"slot":"external-filters"})],2)}
var JfTableViewWrappervue_type_template_id_2076319c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue?vue&type=template&id=2076319c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewWrapper/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var JfTableViewWrappervue_type_script_lang_js_ = ({
  name: 'jf-table-view-wrapper',
  components: {
    JfTableView: JfTableViewComponent
  },
  props: ['options', 'objectName', 'tableId', 'data', 'columns', 'actions', 'batchActions', 'scope', 'rowsPerPage', 'emptyTableText', 'useVirtualScroll', 'enableSubrows', 'sortBy', 'groupBy', 'showFilter', 'showPagination', 'showCounter', 'sortable', 'disableFilterTooltip', 'externalSearchFields', 'newEntityCustomText'],
  'jf@inject': ['JFrogTableViewOptions', '$q', '$scope'],
  data: function data() {
    return {
      tableOptions: null,
      columnsSet: false
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function handler(val) {
        if (val && val !== this.tableOptions.data) this.setData();
      }
    },
    externalSearchFields: function externalSearchFields(newVal) {
      this.tableOptions.externalSearchFields = newVal;

      if (this.tableOptions.paginationMode === this.tableOptions.INFINITE_SCROLL || this.tableOptions.paginationMode === this.tableOptions.INFINITE_VIRTUAL_SCROLL) {
        this.tableOptions.sendInfiniteScrollRequest(true);
      }

      if (this.tableOptions.paginationMode === this.tableOptions.EXTERNAL_PAGINATION) {
        this.tableOptions.sendExternalPageRequest();
      }
    }
  },
  created: function created() {
    var _this = this;

    this.tableOptions = this.options || new this.JFrogTableViewOptions(this.scope || this.$scope);

    if (!_.isUndefined(this.enableSubrows)) {
      this.tableOptions.enableSubRows();
    }

    if (this.tableId) {
      this.tableOptions.setId(this.tableId);
    }

    if (this.objectName) {
      this.tableOptions.setObjectName(this.objectName);
    }

    if (this.rowsPerPage) {
      if (_.isString(this.rowsPerPage) && this.rowsPerPage !== 'auto') {
        console.error('Error: rows-per-page should be a number, or the string \'auto\'.');
      }

      this.tableOptions.setRowsPerPage(this.rowsPerPage);
    }

    this.$watch(function () {
      return _this.getActualColumns();
    }, function () {
      if (_this.columns
      /* && !this.columnsSet*/
      ) {
          _this.tableOptions.setColumns(_this.getActualColumns());

          _this.columnsSet = true;
        }

      ;
    }, {
      immediate: true
    });
    /*
                if (this.columns) {
                    this.tableOptions.setColumns(this.getActualColumns());
                    this.columnsSet = true;
                }
    */

    if (this.actions) {
      this.tableOptions.setActions(this.actions);
    }

    if (this.batchActions) {
      this.tableOptions.setBatchActions(this.batchActions);
    }

    if (this.emptyTableText) {
      this.tableOptions.setEmptyTableText(this.emptyTableText);
    }

    if (this.groupBy) {
      this.tableOptions.groupBy(this.groupBy);
    }

    if (this.sortBy) {
      this.tableOptions.sortBy(this.sortBy);
    }

    if (!_.isUndefined(this.showFilter)) {
      this.tableOptions.showFilter(this.showFilter);
    }

    if (!_.isUndefined(this.showPagination)) {
      this.tableOptions.showPagination(this.showPagination);
    }

    if (!_.isUndefined(this.showCounter)) {
      this.tableOptions.showCounter(this.showCounter);
    }

    if (!_.isUndefined(this.sortable)) {
      this.tableOptions.setSortable(this.sortable);
    }

    if (!_.isUndefined(this.useVirtualScroll) && !this.$listeners['load-more']) {
      this.tableOptions.setPaginationMode(this.tableOptions.VIRTUAL_SCROLL);
    }

    if (!_.isUndefined(this.disableFilterTooltip)) {
      this.tableOptions.disableFilterTooltip();
    }

    if (!_.isUndefined(this.externalSearchFields)) {
      this.tableOptions.externalSearchFields = this.externalSearchFields;
    }

    if (!_.isUndefined(this.newEntityCustomText)) {
      this.tableOptions.newEntityCustomText = this.newEntityCustomText;
    }

    if (!this.options) {
      this.$emit('init', {
        tableOptions: this.tableOptions,
        cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators
      });
    }

    if (this.$listeners['new-entity']) {
      this.tableOptions.setNewEntityAction(function () {
        _this.$emit('new-entity');
      });
    }

    if (this.$listeners['row-clicked']) {
      this.tableOptions.on('row.clicked', function (eventData) {
        _this.$emit('row-clicked', {
          eventData: eventData
        });
      });
    }

    if (this.$listeners['external-sort']) {
      this.tableOptions.useExternalSortCallback(function (field, dir) {
        _this.$emit('external-sort', {
          field: field,
          dir: dir
        });
      });
    }

    if (this.$listeners['load-more']) {
      this.tableOptions.setPaginationMode(!_.isUndefined(this.useVirtualScroll) ? this.tableOptions.INFINITE_VIRTUAL_SCROLL : this.tableOptions.INFINITE_SCROLL, function (params) {
        var defer = _this.$q.defer();

        _this.$emit('load-more', params);

        _this.pageResolver = defer.resolve;
        return defer.promise;
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.data) this.setData(true);

    if (this.$listeners['page-needed']) {
      this.tableOptions.setPaginationMode(this.tableOptions.EXTERNAL_PAGINATION, function (pagingData) {
        var defer = _this2.$q.defer();

        _this2.$emit('page-needed', pagingData);

        _this2.pageResolver = defer.resolve;
        return defer.promise;
      });
    }
  },
  methods: {
    setData: function setData(initialSet) {
      if (!this.$listeners['page-needed'] && !this.$listeners['load-more'] && this.tableOptions.paginationMode !== this.tableOptions.EXTERNAL_PAGINATION) {
        this.tableOptions.setData(this.data);
      } else if (!initialSet && this.$listeners['load-more'] && !this.pageResolver) {
        this.tableOptions.setData(this.data.data, '$$internal$$');
      } else if (this.pageResolver) {
        this.pageResolver(this.data);
        this.pageResolver = null;
      }
    },
    getActualColumns: function getActualColumns() {
      if (_.isFunction(this.columns)) {
        if (this.JFrogTableViewOptions) {
          return this.columns({
            cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators
          });
        } else {
          return null;
        }
      } else {
        return this.columns;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewWrappervue_type_script_lang_js_ = (JfTableViewWrappervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue





/* normalize component */

var JfTableViewWrapper_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewWrappervue_type_script_lang_js_,
  JfTableViewWrappervue_type_template_id_2076319c_scoped_true_render,
  JfTableViewWrappervue_type_template_id_2076319c_scoped_true_staticRenderFns,
  false,
  null,
  "2076319c",
  null
  
)

/* harmony default export */ var JfTableViewWrapper = (JfTableViewWrapper_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFileDropComponent/index.vue?vue&type=template&id=7132089a&scoped=true&
var JfFileDropComponentvue_type_template_id_7132089a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"wrapper-drop-zone"},[_c('div',{staticClass:"drop-zone",class:{'drop-zone-load': _vm.jfFileUploader.queue.length , 'multiple': _vm.multiple},attrs:{"nv-file-drop":"","uploader":"jfFileUploader","nv-file-over":"","over-class":"drop-zone-hover","disabled":_vm.jfFileDisabled}},[_c('label',{staticClass:"file-input-label"},[(!_vm.jfFileUploader.queue[0].progress && !_vm.multiple)?_c('input',{staticClass:"select-files-hidden",attrs:{"type":"file","nv-file-select":"","uploader":"jfFileUploader","disabled":_vm.jfFileDisabled,"title":" "}}):_vm._e(),(!_vm.anyFileUploadInProgress() && _vm.multiple)?_c('input',{staticClass:"select-files-hidden",attrs:{"type":"file","nv-file-select":"","uploader":"jfFileUploader","disabled":_vm.jfFileDisabled,"title":" ","multiple":""}}):_vm._e(),(_vm.multiple || !_vm.jfFileUploader.queue.length)?_c('div',[_c('span',[_vm._v("Drop file")]),_vm._v(" here or "),_c('span',[_vm._v("Select file")])]):_vm._e(),(!_vm.multiple && _vm.jfFileUploader.queue.length && (!_vm.jfFileUploader.queue[0].progress || !_vm.showProgressBar))?_c('div',{staticClass:"drop-zone-file-name"},[_vm._v(_vm._s(_vm.jfFileUploader.queue[0].file.name))]):_vm._e(),(!_vm.multiple && _vm.showProgressBar)?_c('div',_vm._l((_vm.jfFileUploader.queue),function(item){return _c('div',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.jfFileUploader.isHTML5 && item.progress),expression:"jfFileUploader.isHTML5 && item.progress"}],staticClass:"file-upload-progress file-info"},[_c('div',{staticClass:"progress-file-drop"},[_c('div',{staticClass:"progress"},[_c('div',{staticClass:"progress-bar",style:({ 'width': item.progress + '%' }),attrs:{"role":"progressbar"}})])])])])}),0):_vm._e()]),(_vm.multiple)?_c('div',{staticClass:"upload-files-frame"},[_c('ul',_vm._l((_vm.jfFileUploader.queue),function(item){return _c('li',{staticClass:"upload-item"},[_c('jf-checkbox',{directives:[{name:"show",rawName:"v-show",value:(item.hasCheckbox),expression:"item.hasCheckbox"},{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:( _vm.checkboxesName ),expression:" checkboxesName ",modifiers:{"bind":true}}],staticClass:"file-selection pull-left"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.isCheckboxChecked),expression:"item.isCheckboxChecked"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(item.isCheckboxChecked)?_vm._i(item.isCheckboxChecked,null)>-1:(item.isCheckboxChecked)},on:{"input":function($event){return item.onCheckboxChange(item)},"change":function($event){var $$a=item.isCheckboxChecked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(item, "isCheckboxChecked", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(item, "isCheckboxChecked", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(item, "isCheckboxChecked", $$c)}}}})]),_c('span',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:( item.file.name ),expression:" item.file.name ",modifiers:{"bind":true}}],staticClass:"file-name-deploy-multi"},[_vm._v(_vm._s(item.file.name))]),_c('a',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip",value:('Remove'),expression:"'Remove'"}],staticClass:"icon icon-clear pull-right item-remove",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();item.remove(); _vm.multiUploadItemRemoved(); _vm.removeItemCallback(item)}}})],1)}),0)]):_vm._e()])])])}
var JfFileDropComponentvue_type_template_id_7132089a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue?vue&type=template&id=7132089a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFileDropComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfFileDropComponentvue_type_script_lang_js_ = ({
  name: 'jf-file-drop',
  props: ['jfFileUploader', 'jfFileDisabled', 'showProgressBar', 'multiple', 'checkboxesName'],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfFileDropComponentvue_type_script_lang_js_ = (JfFileDropComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue





/* normalize component */

var JfFileDropComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfFileDropComponentvue_type_script_lang_js_,
  JfFileDropComponentvue_type_template_id_7132089a_scoped_true_render,
  JfFileDropComponentvue_type_template_id_7132089a_scoped_true_staticRenderFns,
  false,
  null,
  "7132089a",
  null
  
)

/* harmony default export */ var JfFileDropComponent = (JfFileDropComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGraphsComponent/index.vue?vue&type=template&id=1277cd12&scoped=true&
var JfGraphsComponentvue_type_template_id_1277cd12_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"chart"})}
var JfGraphsComponentvue_type_template_id_1277cd12_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue?vue&type=template&id=1277cd12&scoped=true&

// EXTERNAL MODULE: ./node_modules/billboard.js/dist/billboard.js
var billboard = __webpack_require__("21aa");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGraphsComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//

/* harmony default export */ var JfGraphsComponentvue_type_script_lang_js_ = ({
  name: 'jf-graphs',
  props: ['hideSearch', 'options'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    this._generate();
  },
  methods: {
    _generate: function _generate() {
      var _this = this;

      if (this.chart) {
        this.chart.destroy();
      }
      /* Polyfill for IE 11 which doesnt support Object.assign */


      if (typeof assign_default.a != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        define_property_default()(Object, 'assign', {
          value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
              // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];

              if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }

            return to;
          },
          writable: true,
          configurable: true
        });
      }
      /* End Polyfill for IE 11 which doesnt support Object.assign */


      this.chart = billboard["bb"].generate(assign_default()({
        bindto: this.$refs.chart
      }, this.options));
      window.addEventListener('onorientationchange', function () {
        _this.chart.resize();
      });
    }
  },
  updated: function updated() {
    if (this.chart) {
      this._generate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGraphsComponentvue_type_script_lang_js_ = (JfGraphsComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue





/* normalize component */

var JfGraphsComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfGraphsComponentvue_type_script_lang_js_,
  JfGraphsComponentvue_type_template_id_1277cd12_scoped_true_render,
  JfGraphsComponentvue_type_template_id_1277cd12_scoped_true_staticRenderFns,
  false,
  null,
  "1277cd12",
  null
  
)

/* harmony default export */ var JfGraphsComponent = (JfGraphsComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPendingDataComponent/index.vue?vue&type=template&id=6619b3a2&scoped=true&
var JfPendingDataComponentvue_type_template_id_6619b3a2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.waitFor && (!_vm.delaySpinner || _vm.showSpinner))?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e(),(_vm.waitFor)?_vm._t("default"):_vm._e()],2)}
var JfPendingDataComponentvue_type_template_id_6619b3a2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue?vue&type=template&id=6619b3a2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPendingDataComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfPendingDataComponentvue_type_script_lang_js_ = ({
  name: 'jf-pending-data',
  props: ['waitFor', 'delaySpinner'],
  data: function data() {
    return {
      showSpinner: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.delaySpinner) {
      setTimeout(function () {
        _this.showSpinner = true;
      }, !_.isNaN(parse_int_default()(this.delaySpinner)) ? this.delaySpinner : 400);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfPendingDataComponentvue_type_script_lang_js_ = (JfPendingDataComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue





/* normalize component */

var JfPendingDataComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfPendingDataComponentvue_type_script_lang_js_,
  JfPendingDataComponentvue_type_template_id_6619b3a2_scoped_true_render,
  JfPendingDataComponentvue_type_template_id_6619b3a2_scoped_true_staticRenderFns,
  false,
  null,
  "6619b3a2",
  null
  
)

/* harmony default export */ var JfPendingDataComponent = (JfPendingDataComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=50ee5aa3&scoped=true&
var JfTextBoxComponentvue_type_template_id_50ee5aa3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-text-box-container"},[_c('div',{staticClass:"jf-text-box-content-current"},[_vm._v(_vm._s(_vm.content)),(_vm.ready && _vm.isOverflowing)?_c('span',{staticClass:"jf-text-box-show-all",style:({'white-space': _vm.wrapSeeAll ? 'inherit' : 'nowrap'}),domProps:{"innerHTML":_vm._s(_vm.seeAllCustomText)},on:{"click":function($event){return _vm.seeAll()}}}):_vm._e()]),_c('div',{staticClass:"jf-text-box-content-full"}),_c('div',{staticClass:"jf-text-box-content-stage"})])])}
var JfTextBoxComponentvue_type_template_id_50ee5aa3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=50ee5aa3&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTextBoxComponent/index.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTextBoxComponentvue_type_script_lang_js_ = ({
  name: 'jf-text-box',
  props: ['text', 'modalTitle', 'seeAllText', 'maxLines', 'noAction', 'customAction'],
  'jf@inject': ['$scope', '$element', '$timeout', '$interval', '$compile', '$q', 'JfFullTextService'],
  data: function data() {
    return {
      content: null,
      ready: null,
      wrapSeeAll: null,
      seeAllCustomText: this.seeAllText || '(Show All ...)'
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.fullTextElement.text(this.text);
    this.registerResize();
    setTimeout(function () {
      return _this.refreshText();
    });
    this.fullTextModal = this.JfFullTextService;
  },
  beforeDestroy: function beforeDestroy() {
    this.deregisterResize();
  },
  methods: {
    registerResize: function registerResize() {
      var _this2 = this;

      var appliedRefresh = function appliedRefresh() {
        _this2.refreshText();

        _this2.$forceUpdate();
      };

      var debouncedRefresh = _.debounce(appliedRefresh, 0, {
        leading: true
      }); // let throttledRefresh = _.throttle(appliedRefresh, 150, {/*leading: false*/})


      this.onResize = debouncedRefresh;
      $(window).on('resize', this.onResize);
    },
    deregisterResize: function deregisterResize() {
      $(window).off('resize', this.onResize);
    },
    setStageText: function setStageText(text) {
      this.stageElement.text(text);
    },
    refreshText: function refreshText() {
      var _this3 = this;

      this.measureLineHeight();

      if (!this.isOverflowing) {
        this.content = this.text;
      } else {
        this.stageElement.html('');
        var words = this.splitText(this.text);
        var i = 1;

        var getNumOfLinesUntil = function getNumOfLinesUntil(index) {
          var withSeeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

          _this3.setStageText(_.trimEnd(words.slice(0, index).join('')) + (withSeeAll ? ' ' : ''));

          if (withSeeAll) _this3.stageElement.append($("  <div class=\"jf-text-box-show-all\">".concat(_this3.seeAllCustomText, "</div>")));
          return _this3.numOfStageRows();
        };

        while (getNumOfLinesUntil(i) <= this.numOfWholeRows && i <= words.length) {
          i++;
        }

        if (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i)) {
          this.wrapSeeAll = true;
        } else this.wrapSeeAll = false;
        /*
                    let saved = i;
                    i--;
                    while (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i) && i > 0) {
                        console.log('?');
                        i--;
                    }
                     if  (i === 0) {
                        i = saved;
                        this.wrapSeeAll = true;
                    }
                    else this.wrapSeeAll = false;
        */


        var fit = words.slice(0, i);
        this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
        if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        var m = 0;

        while (this.numOfStageRows() > this.numOfWholeRows && i > m) {
          m++;
          fit = words.slice(0, i - m);
          this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
          if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        }

        this.content = _.trimEnd(fit.join(''));
      }

      this.ready = true;
      this.$forceUpdate();
    },
    numOfStageRows: function numOfStageRows() {
      var contentHeight = this.stageElement.height();
      return Math.ceil(contentHeight / this.lineHeight - 0.1);
    },
    splitText: function splitText(text) {
      if (this.splitCache) return this.splitCache;else {
        var regex = /\s+/g;
        var parts = [];
        var match = regex.exec(text);
        var lastIndex = 0;

        while (match) {
          parts.push(text.substr(lastIndex, match.index - lastIndex) + match[0]);
          lastIndex = match.index + match[0].length;
          match = regex.exec(text);
        }

        parts.push(text.substr(lastIndex, text.length - lastIndex));
        parts = _.map(parts, function (part) {
          if (part.length > 16) return part.split('');else return part;
        });
        parts = _.flatten(parts);
        this.splitCache = parts;
        return parts;
      }
    },
    measureLineHeight: function measureLineHeight() {
      this.stageElement.text('*');
      this.lineHeight = this.stageElement.height();

      if (this.maxLines) {
        this.containerElement.height(parse_int_default()(this.maxLines) * this.lineHeight);
      }
    },
    seeAll: function seeAll() {
      var _this4 = this;

      if (this.noAction) return;
      var text = this.text;

      if (this.customAction) {
        this.customAction({
          text: text
        });
      } else {
        var modalInstance = this.fullTextModal.showFullTextModal(text, this.modalTitle || 'Full Text', 500, false, null, 'text-box-show-all-modal');
        this.deregisterResize();
        modalInstance.result.finally(function () {
          setTimeout(function () {
            return _this4.registerResize();
          });
        });
      }
    }
    /* Getter Elements */

  },
  computed: {
    containerElement: {
      get: function get() {
        if (!this.cachedContainerElement) {
          this.cachedContainerElement = $(this.$element).find('.jf-text-box-container');
        }

        return this.cachedContainerElement;
      }
    },
    fullTextElement: {
      get: function get() {
        if (!this.cachedFullTextElement) {
          this.cachedFullTextElement = $(this.$element).find('.jf-text-box-content-full');
        }

        return this.cachedFullTextElement;
      }
    },
    currentTextElement: {
      get: function get() {
        if (!this.cachedCurrentTextElement) {
          this.cachedCurrentTextElement = $(this.$element).find('.jf-text-box-content-current');
        }

        return this.cachedCurrentTextElement;
      }
    },
    stageElement: {
      get: function get() {
        if (!this.cachedStageElement) {
          this.cachedStageElement = $(this.$element).find('.jf-text-box-content-stage');
        }

        return this.cachedStageElement;
      }
    },
    containerHeight: {
      get: function get() {
        return this.containerElement.height();
      }
    },
    containerWidth: {
      get: function get() {
        return this.containerElement.width();
      }
    },
    numOfWholeRows: {
      get: function get() {
        var auto = Math.floor(this.containerHeight / this.lineHeight + 0.1);
        return this.maxLines ? Math.min(parse_int_default()(this.maxLines), auto) : auto;
      }
    },
    numOfActualRows: {
      get: function get() {
        var contentHeight = this.fullTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
      }
    },
    numOfVisibleRows: {
      get: function get() {
        var contentHeight = this.currentTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
      }
    },
    isOverflowing: {
      get: function get() {
        return this.numOfActualRows > this.numOfWholeRows;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTextBoxComponentvue_type_script_lang_js_ = (JfTextBoxComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=style&index=0&id=50ee5aa3&scoped=true&lang=less&
var JfTextBoxComponentvue_type_style_index_0_id_50ee5aa3_scoped_true_lang_less_ = __webpack_require__("adeb");

// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue






/* normalize component */

var JfTextBoxComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTextBoxComponentvue_type_script_lang_js_,
  JfTextBoxComponentvue_type_template_id_50ee5aa3_scoped_true_render,
  JfTextBoxComponentvue_type_template_id_50ee5aa3_scoped_true_staticRenderFns,
  false,
  null,
  "50ee5aa3",
  null
  
)

/* harmony default export */ var JfTextBoxComponent = (JfTextBoxComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfOnOffSwitchComponent/index.vue?vue&type=template&id=3c625da4&scoped=true&
var JfOnOffSwitchComponentvue_type_template_id_3c625da4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-on-off-toggler",class:{'on-selected' : _vm.isOn,
                'off-selected' : !_vm.isOn}},[_c('jf-toggler',{model:{value:(_vm.isOn),callback:function ($$v) {_vm.isOn=$$v},expression:"isOn"}}),_c('span',{staticClass:"on-option-text jf-toggler-text",domProps:{"innerHTML":_vm._s(_vm.on)}}),_c('span',{staticClass:"off-option-text jf-toggler-text",domProps:{"innerHTML":_vm._s(_vm.off)}})],1)])}
var JfOnOffSwitchComponentvue_type_template_id_3c625da4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=template&id=3c625da4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfOnOffSwitchComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfOnOffSwitchComponentvue_type_script_lang_js_ = ({
  name: 'jf-on-off-switch',
  props: ['selected', 'options'],
  data: function data() {
    return {
      on: null,
      isOn: Boolean,
      off: null,
      selectedValue: this.selected
    };
  },
  created: function created() {
    if (!this.options) throw 'Must supply options';
    this.on = this.options[0];
    this.off = this.options[1];
    this.selectedValue = this.selectedValue || this.on;
    this.isOn = this.on === this.selectedValue ? true : false;
  }
});
// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfOnOffSwitchComponentvue_type_script_lang_js_ = (JfOnOffSwitchComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=style&index=0&id=3c625da4&scoped=true&lang=less&
var JfOnOffSwitchComponentvue_type_style_index_0_id_3c625da4_scoped_true_lang_less_ = __webpack_require__("9f5a");

// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue






/* normalize component */

var JfOnOffSwitchComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfOnOffSwitchComponentvue_type_script_lang_js_,
  JfOnOffSwitchComponentvue_type_template_id_3c625da4_scoped_true_render,
  JfOnOffSwitchComponentvue_type_template_id_3c625da4_scoped_true_staticRenderFns,
  false,
  null,
  "3c625da4",
  null
  
)

/* harmony default export */ var JfOnOffSwitchComponent = (JfOnOffSwitchComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchTogglerComponent/index.vue?vue&type=template&id=48e113b2&scoped=true&
var JfSwitchTogglerComponentvue_type_template_id_48e113b2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-switch-toggler",class:{'left-option-selected' : _vm.isLeftOptionOn,
            'right-option-selected' : !_vm.isLeftOptionOn}},[_c('span',{staticClass:"left-option-text jf-toggler-text",domProps:{"innerHTML":_vm._s(_vm.leftOption.text)}}),_c('jf-toggler',{on:{"input":function($event){return _vm.toggleSelection()}},model:{value:(_vm.isLeftOptionOn),callback:function ($$v) {_vm.isLeftOptionOn=$$v},expression:"isLeftOptionOn"}}),_c('span',{staticClass:"right-option-text jf-toggler-text",domProps:{"innerHTML":_vm._s(_vm.rightOption.text)}})],1)}
var JfSwitchTogglerComponentvue_type_template_id_48e113b2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=template&id=48e113b2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchTogglerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSwitchTogglerComponentvue_type_script_lang_js_ = ({
  name: 'jf-switch-toggler',
  props: ['value', 'options'],
  data: function data() {
    return {
      isLeftOptionOn: null,
      leftOption: {
        text: null
      },
      rightOption: {
        text: null
      },
      model: this.value
    };
  },
  created: function created() {
    if (!this.options) throw 'Must supply options'; // Supports 2 methods of options:
    // array of strings
    // array of objects of type {'value': ..., 'text': ...}
    // The model is assigned the value, and the text is displayed

    this.setOptionObjects();

    if (_.isEmpty(this.model)) {
      this.model = this.leftOption.value;
    }

    this.isLeftOptionOn = this.model === this.leftOption.value;
  },
  methods: {
    toggleSelection: function toggleSelection() {
      this.model = this.model === this.leftOption.value ? this.rightOption.value : this.leftOption.value;
      this.$emit('input', this.model);
    },
    setOptionObjects: function setOptionObjects() {
      var optionObjects = this.options.map(function (option) {
        if (typeof option === 'string') return {
          value: option,
          text: option
        };else {
          return option;
        }
      });
      this.leftOption = optionObjects[0];
      this.rightOption = optionObjects[1];
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSwitchTogglerComponentvue_type_script_lang_js_ = (JfSwitchTogglerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=style&index=0&id=48e113b2&scoped=true&lang=less&
var JfSwitchTogglerComponentvue_type_style_index_0_id_48e113b2_scoped_true_lang_less_ = __webpack_require__("582c");

// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue






/* normalize component */

var JfSwitchTogglerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfSwitchTogglerComponentvue_type_script_lang_js_,
  JfSwitchTogglerComponentvue_type_template_id_48e113b2_scoped_true_render,
  JfSwitchTogglerComponentvue_type_template_id_48e113b2_scoped_true_staticRenderFns,
  false,
  null,
  "48e113b2",
  null
  
)

/* harmony default export */ var JfSwitchTogglerComponent = (JfSwitchTogglerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTogglerComponent/index.vue?vue&type=template&id=7f57c9c2&scoped=true&
var JfTogglerComponentvue_type_template_id_7f57c9c2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-toggler"},[_c('div',{staticClass:"switch-toggle",class:{'left': _vm.value, 'right': !_vm.value},on:{"click":function($event){return _vm.toggleSelection()}}},[_c('span')])])}
var JfTogglerComponentvue_type_template_id_7f57c9c2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTogglerComponent/index.vue?vue&type=template&id=7f57c9c2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTogglerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTogglerComponentvue_type_script_lang_js_ = ({
  name: 'jf-toggler',
  props: ['value'],
  data: function data() {
    return {};
  },
  methods: {
    toggleSelection: function toggleSelection() {
      this.$emit('input', !this.value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTogglerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTogglerComponentvue_type_script_lang_js_ = (JfTogglerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTogglerComponent/index.vue?vue&type=style&index=0&id=7f57c9c2&scoped=true&lang=less&
var JfTogglerComponentvue_type_style_index_0_id_7f57c9c2_scoped_true_lang_less_ = __webpack_require__("d247");

// CONCATENATED MODULE: ./src/components/JfTogglerComponent/index.vue






/* normalize component */

var JfTogglerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTogglerComponentvue_type_script_lang_js_,
  JfTogglerComponentvue_type_template_id_7f57c9c2_scoped_true_render,
  JfTogglerComponentvue_type_template_id_7f57c9c2_scoped_true_staticRenderFns,
  false,
  null,
  "7f57c9c2",
  null
  
)

/* harmony default export */ var JfTogglerComponent = (JfTogglerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/index.vue?vue&type=template&id=7032d9d2&scoped=true&
var JfDataListComponentvue_type_template_id_7032d9d2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('table',{staticClass:"data-list"},[_c('tbody',_vm._l((_vm.formattedItems),function(item,index){return _c('tr',{key:index,staticClass:"data-list-item"},[(!item.hideLabel)?_c('td',{staticClass:"data-list-item-label"},[_vm._v(_vm._s(item.label)+":")]):_vm._e(),_c('td',{staticClass:"data-list-item-value"},[_c('jf-datalist-item-component',{attrs:{"item":item,"index":index},on:{"item-updated":_vm.updateList}})],1)])}),0)])])}
var JfDataListComponentvue_type_template_id_7032d9d2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=template&id=7032d9d2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=template&id=1f794ba3&
var JfDatalistItemComponentvue_type_template_id_1f794ba3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"templateValue",staticClass:"value"},[(_vm.item.isUrl && ( _vm.item.url == undefined || _vm.item.url.length ))?_c('a',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-link",attrs:{"href":_vm.item.url ? _vm.item.url : _vm.item.value,"target":"_blank"},domProps:{"innerHTML":_vm._s(_vm.item.value)}}):_vm._e(),((_vm.item.isUrl && _vm.item.url != undefined && !_vm.item.url.length) || (!_vm.item.value))?_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],domProps:{"innerHTML":_vm._s(_vm.getItemValue(_vm.item.value))}}):_vm._e(),(!_vm.item.isUrl && !_vm.isArray(_vm.item.value) && !_vm.item.template)?_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],domProps:{"innerHTML":_vm._s(_vm.item.value)}}):_vm._e(),(_vm.isArray(_vm.item.value) && !_vm.item.template)?_c('div',{attrs:{"id":'data-list-row-' + _vm.index}},[_vm._l((_vm.item.value),function(tag,index2){return _c('div',{key:index2,staticClass:"tag"},[(tag.url)?_c('a',{staticClass:"gridcell-content-text jf-link",attrs:{"href":tag.url,"target":"_blank"},domProps:{"innerHTML":_vm._s(tag.label)}}):_vm._e(),(!tag.url)?_c('span',{staticClass:"gridcell-content-text",domProps:{"innerHTML":_vm._s(tag.label)}}):_vm._e(),(_vm.item.delete)?_c('i',{staticClass:"icon icon-close delete-tag",on:{"click":function($event){return _vm.deleteTag(tag)}}}):_vm._e()])}),(_vm.showAllValue)?_c('a',{staticClass:"jf-link gridcell-showall",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.showAll(_vm.item.value,_vm.item.label,_vm.item.objectName)}}},[_vm._v("(See "+_vm._s(_vm.item.value.length > 1 ? 'All' : 'List')+")")]):_vm._e()],2):_vm._e(),(_vm.item.copy && !_vm.isArray(_vm.item.value))?_c('div',{staticClass:"copy"},[_c('jf-clip-copy',{attrs:{"text-to-copy":_vm.item.value}})],1):_vm._e()])}
var JfDatalistItemComponentvue_type_template_id_1f794ba3_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=template&id=1f794ba3&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var JfDatalistItemComponentvue_type_script_lang_js_ = ({
  name: 'jf-datalist-item-component',
  props: ['item', 'index'],
  'jf@inject': ['JFrogModal', 'JFrogUIUtils', 'JFrogUILibConfig'],
  data: function data() {
    return {
      showAllValue: false
    };
  },
  mounted: function mounted() {
    this.showAllValue = this.item.value.length >= 1 ? this.htmlIsOverflowing('#data-list-row-' + this.index) : false;

    if (this.showAllValue) {
      this.$forceUpdate;
    }

    this.createTemplate();
  },
  updated: function updated() {
    this.createTemplate();
  },
  methods: {
    deleteTag: function deleteTag(tag) {
      /* 
          Invoked when user deletes a value in a data list item
          Updates the value object by removing the entry for the item
          Emits event with the updated data list item object and the index in the data list
      */
      this.item.value = lodash_default.a.filter(this.item.value, function (valueItem) {
        return valueItem.label !== tag.label;
      });
      this.$emit('item-updated', {
        index: this.index,
        item: this.item
      });
    },
    htmlIsOverflowing: function htmlIsOverflowing(rowId) {
      if (!this.$el) return false;
      var elem = $(rowId);
      var children = elem.children('.tag');
      var maxWidth = elem.closest('.data-list-item-value').outerWidth() - 60;
      var totalChildrenWidth = 0;
      children.each(function (i, child) {
        var childElem = $(child);
        totalChildrenWidth += childElem.outerWidth() + parse_int_default()(childElem.css('margin-left')) + parse_int_default()(childElem.css('margin-right'));

        if (totalChildrenWidth < maxWidth) {
          childElem.removeClass('overflowing-child');
        }

        if (totalChildrenWidth > maxWidth && !childElem.is('.overflowing-child')) {
          childElem.addClass('overflowing-child');
        }
      });
      return elem.children('.tag.overflowing-child').length > 0;
    },
    showAll: function showAll(model, rowName, objectName) {
      var modalScope = {
        items: model,
        rowName: rowName,
        colName: '',
        objectName: objectName,
        filter: {}
      };
      this.JFrogModal.launchModal(JfDataListModal, modalScope, 'sm', true, {
        dontRejectOnClose: true,
        class: "show-all-modal"
      });
    },
    isArray: function isArray(o) {
      return is_array_default()(o);
    },
    getItemValue: function getItemValue(value) {
      return value || '&nbsp';
    },
    createTemplate: function createTemplate() {
      var item = this.item;

      if (!item.template) {
        return;
      }

      var mixin = Object(esm_typeof["a" /* default */])(item.template) === 'object' ? item.template : !this.isHtml(item.template) ? this.JFrogUILibConfig.getConfig().customModalTemplates[item.template] : {
        template: item.template
      };
      var template = "".concat(mixin.template);
      var ComponentClass = Vue.extend({
        name: 'template-component',
        template: template,
        mixins: [mixin],
        props: ['item'].concat(Object(toConsumableArray["a" /* default */])(keys_default()(item.scope || {})))
      });
      var component = new ComponentClass({
        propsData: lodash_default.a.extend({
          item: lodash_default.a.omit(item, ['scope'])
        }, item.scope)
      });
      component.$mount();
      this.$refs.templateValue.append(component.$el);
    },
    isHtml: function isHtml(value) {
      return /<[a-z/][\s\S]*>/i.test(value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var JfDataListComponent_JfDatalistItemComponentvue_type_script_lang_js_ = (JfDatalistItemComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=style&index=0&lang=less&
var JfDatalistItemComponentvue_type_style_index_0_lang_less_ = __webpack_require__("eeec");

// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue






/* normalize component */

var JfDatalistItemComponent_component = Object(componentNormalizer["a" /* default */])(
  JfDataListComponent_JfDatalistItemComponentvue_type_script_lang_js_,
  JfDatalistItemComponentvue_type_template_id_1f794ba3_render,
  JfDatalistItemComponentvue_type_template_id_1f794ba3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfDatalistItemComponent = (JfDatalistItemComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfDataListComponentvue_type_script_lang_js_ = ({
  name: 'jf-data-list',
  props: ['items'],
  components: {
    JfDatalistItemComponent: JfDatalistItemComponent
  },
  data: function data() {
    return {
      formattedItems: [],
      isMounted: false
    };
  },
  watch: {
    items: function items(newVal) {
      this.filterItems(newVal);
    }
  },
  mounted: function mounted() {
    this.$forceUpdate();
    this.isMounted = true;
    this.filterItems(this.items);
  },
  ng1_legacy: {
    'controllerAs': 'jfDataList'
  },
  methods: {
    filterItems: function filterItems(items) {
      if (items) {
        this.formattedItems = _.filter(items, function (item) {
          return item.label != '' && !item.isHidden;
        });
      }
    },
    updateList: function updateList(updatedItem) {
      /* 
          Invoked when a value in the data list is deleted
          Updates the "items" array with the received data list item
          Emits event with the updated data list
      */
      this.items.splice(updatedItem.index, 1, updatedItem.item);
      this.$emit("data-list-updated", this.items);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDataListComponentvue_type_script_lang_js_ = (JfDataListComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=style&index=0&id=7032d9d2&scoped=true&lang=less&
var JfDataListComponentvue_type_style_index_0_id_7032d9d2_scoped_true_lang_less_ = __webpack_require__("5b0d");

// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue






/* normalize component */

var JfDataListComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDataListComponentvue_type_script_lang_js_,
  JfDataListComponentvue_type_template_id_7032d9d2_scoped_true_render,
  JfDataListComponentvue_type_template_id_7032d9d2_scoped_true_staticRenderFns,
  false,
  null,
  "7032d9d2",
  null
  
)

/* harmony default export */ var JfDataListComponent = (JfDataListComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollElementComponent/index.vue?vue&type=template&id=da695f2a&scoped=true&
var JfVscrollElementComponentvue_type_template_id_da695f2a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.compiledProps)?_c(_vm.template,_vm._b({tag:"component"},'component',_vm.compiledProps,false)):_vm._e()],1)}
var JfVscrollElementComponentvue_type_template_id_da695f2a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue?vue&type=template&id=da695f2a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollElementComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
/* harmony default export */ var JfVscrollElementComponentvue_type_script_lang_js_ = ({
  name: 'jf-vscroll-element',
  props: ['data', 'template', 'variable', 'index', 'last', 'vscroll'],
  'jf@inject': ['$scope', '$compileComp', '$element', '$timeout'],
  data: function data() {
    return {
      compiledProps: null
    };
  },
  computed: {},
  created: function created() {
    /*
                let unwatchHeight = this.$scope.$watch('jfVScrollElement.childrenHeight', () => {
                    if (this.childrenHeight && this.childrenHeight > 1) {
                        this.vscroll.setItemHeight(this.childrenHeight);
                        unwatchHeight();
                    }
                });
    */
  },
  watch: {},
  mounted: function mounted() {
    var _this = this,
        _elementScope;

    var elementScope = (_elementScope = {}, Object(defineProperty["a" /* default */])(_elementScope, this.variable, this.data), Object(defineProperty["a" /* default */])(_elementScope, "v_index", function v_index() {
      return _this.index;
    }), Object(defineProperty["a" /* default */])(_elementScope, "is_last", function is_last() {
      return _this.last;
    }), _elementScope); //            this.compiledTemplate = this.$compileComp(this.template, {});

    this.compiledProps = elementScope;
    Vue.nextTick(function () {
      _this.vscroll.setItemHeight(_this.childrenHeight());

      _this.$scope.$watch('jfVScrollElement.data', function () {
        if (!_this.compiledProps || !_this.variable || !_this.data) return;
        _this.compiledProps[_this.variable] = _this.data;
      });
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfVScrollElement'
  },
  methods: {
    childrenHeight: function childrenHeight() {
      return $(this.$element).children().height() || 50;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfVscrollElementComponentvue_type_script_lang_js_ = (JfVscrollElementComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue





/* normalize component */

var JfVscrollElementComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfVscrollElementComponentvue_type_script_lang_js_,
  JfVscrollElementComponentvue_type_template_id_da695f2a_scoped_true_render,
  JfVscrollElementComponentvue_type_template_id_da695f2a_scoped_true_staticRenderFns,
  false,
  null,
  "da695f2a",
  null
  
)

/* harmony default export */ var JfVscrollElementComponent = (JfVscrollElementComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollComponent/index.vue?vue&type=template&id=925388b8&scoped=true&
var JfVscrollComponentvue_type_template_id_925388b8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"v-scroll-container"},[_c('div',{staticClass:"v-scroll-inner-container",style:({transform: 'translate(0, ' + (-_vm.getTranslate()) + 'px)', height: _vm.containerHeight + 'px', opacity: _vm.ready ? 1 : 0})},[_c('div',{staticClass:"scroll-faker-container",style:({transform: 'translate(0, ' + (_vm.getTranslate()) + 'px)', right: 0, height: _vm.getPageHeight() + 'px'})},[_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initScrollFaker()),expression:"initScrollFaker()"}],staticClass:"scroll-faker",style:({height: (_vm.getTotalScrollHeight() > _vm.maxFakeScrollHeight ? _vm.maxFakeScrollHeight : _vm.getTotalScrollHeight()) + 'px'})})]),_c('div',{staticClass:"h-scroll-wrapper",style:({height: (_vm.getPageHeight() + _vm.getTranslate()) + 'px'}),on:{"mousewheel":_vm.onMouseWheel}},[_c('div',{staticClass:"h-scroll-content"},_vm._l((_vm.getPage()),function(item,$index){return _c('jf-vscroll-element',{attrs:{"vscroll":_vm.jfVScroll,"data":item,"index":$index,"template":_vm.childComponent,"variable":_vm.withEach,"last":$index === _vm.getPage().length - 1}})}),1)])])])])}
var JfVscrollComponentvue_type_template_id_925388b8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=template&id=925388b8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfVscrollComponentvue_type_script_lang_js_ = ({
  name: 'jf-vscroll',
  props: ['withEach', 'api', 'in', 'preventDefaultScroll'],
  'jf@inject': ['$scope', '$timeout', '$compileComp', '$element', '$q'],
  data: function data() {
    return {
      ready: false,
      maxFakeScrollHeight: 1000000,
      transcludedContent: null,
      containerHeight: 0,
      scrollTimeout: undefined,
      virtualScrollIndex: 0,
      virtScrollDisplacement: 0,
      settingScroll: false,
      itemHeight: undefined,
      itemsPerPage: 1,
      childComponent: null
    };
  },
  watch: {
    in: function _in() {
      this.refresh();
    }
  },
  created: function created() {
    var _this = this;

    var whenReadyDefer = this.$q.defer();
    this.whenReady = whenReadyDefer.promise;
    this.$scope.$watch('jfVScroll.ready', function () {
      if (_this.ready) {
        _this.refresh();

        whenReadyDefer.resolve();
      }
    });
  },
  mounted: function mounted() {
    this.childComponent = this.$compileComp(this.transcludedContent, this.$parent.$data, this.$parent);
    this.childComponent.props = [this.withEach, 'v_index', 'is_last'];
    this.containerHeight = $(this.$element).parent().height() + 1;

    this._setAutoItemsPerPage();

    this._initApi();
  },
  ng1_legacy: {
    ng1compileFn: function ng1compileFn(element, attrs, transcludeFn) {
      return {
        post: function post(scope, element, attrs, directiveCtrl) {
          transcludeFn(function (clone) {
            var html = '';

            for (var i = 0; i < clone.length; i++) {
              html += clone[i].outerHTML || '';
            }

            html = html.replace('v-pre', '');
            directiveCtrl.transcludedContent = html;
          });
        }
      };
    },
    'controllerAs': 'jfVScroll'
  },
  computed: {
    /*
                containerHeight() {
                    return $(this.$element).parent().height();
                }
    */
  },
  methods: {
    setItemHeight: function setItemHeight(itemHeight) {
      if (this.itemHeight !== undefined && this.itemHeight !== itemHeight && !this.inequalHeightsWarned) {
        this.inequalHeightsWarned = true;
        console.error('Virtual scroll will not work correctly if items are not all the same height');
      }

      if (this.itemHeight === undefined) {
        this.itemHeight = itemHeight;

        this._setAutoItemsPerPage();

        this.ready = true;
        if (this.api.onInit) this.api.onInit();
      }
    },
    _setAutoItemsPerPage: function _setAutoItemsPerPage() {
      if (!this.itemHeight) return;
      this.itemsPerPage = Math.floor(this.containerHeight / this.itemHeight);
    },
    getItemsPerPage: function getItemsPerPage() {
      return this.itemsPerPage;
    },
    initScrollFaker: function initScrollFaker() {
      var _this2 = this;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      scrollParent.on('scroll', function (e) {
        if (_this2.settingScroll) {
          _this2.settingScroll = false;
          return;
        }

        if (_this2.autoScrolling) {
          return;
        }

        if (_this2.scrollTimeout) {
          _this2.$timeout.cancel(_this2.scrollTimeout);

          delete _this2.scrollTimeout;
        }

        var len = _this2.in.length;

        if (len) {
          var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
          var relativePosition = scrollParent.scrollTop() / maxScrollTop;

          if (_.isNaN(relativePosition)) {
            relativePosition = 1;
          }

          var newScrollIndex = relativePosition * (len - _this2.itemsPerPage);
          if (newScrollIndex < 0) newScrollIndex = 0;
          _this2.virtualScrollIndex = Math.floor(newScrollIndex);
          _this2.virtScrollDisplacement = newScrollIndex - _this2.virtualScrollIndex;

          if (_this2.virtualScrollIndex + _this2.itemsPerPage >= _this2.in.length - 2) {
            if (_this2.bottomReachedListener) {
              _this2.bottomReachedListener();
            }
          }
        } else {
          _this2.virtualScrollIndex = 0;
          _this2.virtScrollDisplacement = 0;
        }
      });
    },
    syncFakeScroller: function syncFakeScroller() {
      var _this3 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var len = this.in.length;
      var scrollParent = $(this.$element).find('.scroll-faker-container');
      var relativePosition = this._getCurrentScrollPos() / (len - this.itemsPerPage);

      var sync = function sync() {
        var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
        var scrollTop = Math.floor(maxScrollTop * relativePosition);
        _this3.settingScroll = true;
        scrollParent.scrollTop(scrollTop);
      };

      if (delay) this.$timeout(sync);else sync();
    },
    getPage: function getPage() {
      var vScrollIndex = this.virtualScrollIndex;
      var additionals = vScrollIndex + this.itemsPerPage + 2 <= this.in.length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= this.in.length ? 1 : 0;
      return this.in.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
    },
    getTranslate: function getTranslate() {
      var displacement = this.virtScrollDisplacement;

      if (!displacement) {
        return 0;
      } else {
        var pixels = displacement * this.itemHeight;
        return pixels;
      }
    },
    getPageHeight: function getPageHeight() {
      if (this.containerHeight) {
        return this.containerHeight;
      } else {
        var len = this.in.length;
        if (len < this.itemsPerPage) return len * this.itemHeight;else return this.itemsPerPage * this.itemHeight;
      }
    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.in.length * this.itemHeight;
    },
    onMouseWheel: function onMouseWheel($event) {
      if (this.scrollTimeout) {
        this.$timeout.cancel(this.scrollTimeout);
        this.scrollTimeout = undefined;
      }

      var normalDelta = this._normalizeWheelEvent($event).pixelY;

      var xDelta = this._normalizeWheelEvent($event).pixelX;

      if (Math.abs(normalDelta) < Math.abs(xDelta)) {
        $event.stopPropagation();
        return;
      }

      var scrollAmount = 0.02 * Math.abs(normalDelta);

      var scrollPosBefore = this._getCurrentScrollPos();

      if ($event.deltaY > 0) {
        // scrollUp
        this._scrollTo(scrollPosBefore + scrollAmount);
      } else if ($event.deltaY < 0) {
        // scrollDown
        this._scrollTo(scrollPosBefore - scrollAmount);
      }

      if (scrollPosBefore !== this._getCurrentScrollPos() || this.preventDefaultScroll) {
        $event.preventDefault(); //        this.syncFakeScroller(false);
      }
    },
    _getCurrentScrollPos: function _getCurrentScrollPos() {
      return this.virtualScrollIndex + this.virtScrollDisplacement;
    },
    scrollTo: function scrollTo(scrollPos) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      var dist = scrollPos - this._getCurrentScrollPos();

      this.scroll(dist, duration);
    },
    _scrollTo: function _scrollTo(scrollPos) {
      var dist = scrollPos - this._getCurrentScrollPos();

      this._scroll(dist);
    },
    scroll: function scroll(numOfRows) {
      var _this4 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      if (duration === 0) {
        this._scroll(numOfRows);

        return;
      }

      if (this.scrollTimeout) {
        this.$timeout.cancel(this.scrollTimeout);
        this.scrollTimeout = undefined;
      }

      var quadraticEase = function quadraticEase(k) {
        return k * (2 - k);
      };

      var interval = 40;

      var currentScrollPos = this._getCurrentScrollPos();

      var steps = Math.ceil(duration / interval);
      var currentStep = 1;

      var cycle = function cycle() {
        var progress = currentStep / steps;

        _this4._scrollTo(currentScrollPos + quadraticEase(progress) * numOfRows);

        currentStep++;

        if (currentStep <= steps) {
          _this4.scrollTimeout = _this4.$timeout(function () {
            return cycle();
          }, interval);
        } else {
          _this4.scrollTimeout = undefined;
          _this4.autoScrolling = false;
        }
      };

      this.autoScrolling = true;
      cycle();
    },
    _scroll: function _scroll(numOfRows) {
      if (!numOfRows) return;
      var abs = Math.abs(numOfRows);
      var sign = numOfRows / abs;
      var full = Math.floor(abs);
      this.virtualScrollIndex += sign * full;
      this.virtScrollDisplacement += sign * (abs - full);

      if (this.virtScrollDisplacement >= 1) {
        this.virtualScrollIndex += 1;
        this.virtScrollDisplacement -= 1;
      }

      if (this.virtScrollDisplacement < 0) {
        this.virtualScrollIndex -= 1;
        this.virtScrollDisplacement = 1 - Math.abs(this.virtScrollDisplacement);
      }

      if (this.virtualScrollIndex < 0) {
        this.virtualScrollIndex = 0;
        this.virtScrollDisplacement = 0;
      }

      if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length) {
        this.virtualScrollIndex = this.in.length - this.itemsPerPage;
        this.virtScrollDisplacement = 0;

        if (this.bottomReachedListener) {
          this.bottomReachedListener();
        }
      }

      if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length - 2) {
        if (this.bottomReachedListener) {
          this.bottomReachedListener();
        }
      }

      if (this.virtualScrollIndex < 0) this.virtualScrollIndex = 0;
      this.syncFakeScroller(false);
    },
    _normalizeWheelEvent: function _normalizeWheelEvent(event) {
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0,
          sY = 0,
          pX = 0,
          pY = 0;

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    resetScroll: function resetScroll() {
      this.virtualScrollIndex = 0;
      this.virtScrollDisplacement = 0;
      this.syncFakeScroller(false);
    },
    centerOnItem: function centerOnItem(item) {
      var _this5 = this;

      if (!this.ready) {
        this.whenReady.then(function () {
          _this5.centerOnItem(item);
        });
        return;
      }

      var prePaged = this.in;
      var index = prePaged.indexOf(item);
      var halfPage = Math.floor(this.itemsPerPage / 2);

      if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
        this.virtualScrollIndex = 0;
      } else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
        this.virtualScrollIndex = prePaged.length - this.itemsPerPage;
      } else {
        this.virtualScrollIndex = index - halfPage;
      }

      this.syncFakeScroller(false);
    },
    bringItemToView: function bringItemToView(item) {
      var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var prePaged = this.in;
      var index = prePaged.indexOf(item);

      if (index - 1 < this.virtualScrollIndex) {
        this.scrollTo(index, jump ? 0 : undefined);
      } else if (index + 1 > this.virtualScrollIndex + this.itemsPerPage) {
        var fullItems = this.containerHeight ? Math.floor(this.containerHeight / this.itemHeight) : this.itemsPerPage;
        var scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
        var displace = this.containerHeight ? 1 - (this.containerHeight / this.itemHeight - fullItems) : 1;
        var hScrollFactor = 0;

        if (this._hasHorizontalScrollbar()) {
          var pixelFactor = this._getHorizontalScrollbarHeight();

          hScrollFactor = pixelFactor / this.itemHeight;
        }

        this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
      }

      this.syncFakeScroller(false);
    },
    _hasHorizontalScrollbar: function _hasHorizontalScrollbar() {
      var hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
      return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
    },
    _getHorizontalScrollbarHeight: function _getHorizontalScrollbarHeight() {
      var hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
      return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
    },
    _freezeVScroll: function _freezeVScroll() {
      this.$freezedVScrollIndex = this.virtualScrollIndex;
      this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
    },
    _unFreezeVScroll: function _unFreezeVScroll() {
      delete this.$freezedVScrollIndex;
      delete this.$freezedVScrollDisplacement;
    },
    registerScrollListener: function registerScrollListener(listener) {
      var _this6 = this;

      if (!this.scrollListener) {
        this.scrollListener = listener;
        this.$scope.$watch(function () {
          return _this6.virtualScrollIndex + _this6.virtScrollDisplacement;
        }, function () {
          _this6.scrollListener(_this6._getCurrentScrollPos());
        });
      }
    },
    registerBottomReachedListener: function registerBottomReachedListener(listener) {
      this.bottomReachedListener = listener;
    },
    refresh: function refresh() {
      var _this7 = this;

      Vue.nextTick(function () {
        _this7.containerHeight = $(_this7.$element).parent().height() + 1;

        _this7._setAutoItemsPerPage();
      });
    },
    _initApi: function _initApi() {
      var _this8 = this;

      if (this.api) {
        this.api.getPageData = function () {
          return _this8.getPage();
        };

        this.api.reset = function (item) {
          return _this8.resetScroll();
        };

        this.api.refresh = function () {
          return _this8.refresh();
        };

        this.api.centerOnItem = function (item) {
          return _this8.centerOnItem(item);
        };

        this.api.bringItemToView = function (item) {
          var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          return _this8.bringItemToView(item, jump);
        };

        this.api.freezeScroll = function () {
          return _this8._freezeVScroll();
        };

        this.api.unFreezeScroll = function () {
          return _this8._unFreezeVScroll();
        };

        this.api.sync = function () {
          return _this8.syncFakeScroller(false);
        };

        this.api.scroll = function (numOfRows) {
          var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
          return _this8.scroll(numOfRows, duration);
        };

        this.api.scrollTo = function (scrollPos) {
          var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
          return _this8.scrollTo(scrollPos, duration);
        };

        this.api.registerScrollListener = function (listener) {
          return _this8.registerScrollListener(listener);
        };

        this.api.registerBottomReachedListener = function (listener) {
          return _this8.registerBottomReachedListener(listener);
        };

        this.api.getItemsPerPage = function () {
          return _this8.getItemsPerPage();
        };

        this.api.whenReady = function () {
          return _this8.whenReady;
        };
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfVscrollComponentvue_type_script_lang_js_ = (JfVscrollComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=style&index=0&id=925388b8&scoped=true&lang=less&
var JfVscrollComponentvue_type_style_index_0_id_925388b8_scoped_true_lang_less_ = __webpack_require__("e5b3");

// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue






/* normalize component */

var JfVscrollComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfVscrollComponentvue_type_script_lang_js_,
  JfVscrollComponentvue_type_template_id_925388b8_scoped_true_render,
  JfVscrollComponentvue_type_template_id_925388b8_scoped_true_staticRenderFns,
  false,
  null,
  "925388b8",
  null
  
)

/* harmony default export */ var JfVscrollComponent = (JfVscrollComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=template&id=3280b7c8&scoped=true&
var JfDragAndDropTxtComponentvue_type_template_id_3280b7c8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"drag-and-drop-txt-wrapper",class:{'ready-for-upload':_vm.shouldDisplayUploadIcon()}},[(_vm.dndHeadingHtml)?_c('label',{domProps:{"innerHTML":_vm._s(_vm.dndHeadingHtml)}}):_vm._e(),_c('jf-field',{attrs:{"autofocus":_vm.dndAutoFocus}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.dndContent),expression:"dndContent"}],staticClass:"input-text monospaced",style:(_vm.dndStyle),attrs:{"name":"dndtext","required":_vm.dndRequired,"spellcheck":"false"},domProps:{"value":(_vm.dndContent)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.dndContent=$event.target.value},function($event){return _vm.dndChange()}]}}),_c('label',{staticClass:"call-to-action-label",class:{'icon-upload':_vm.shouldDisplayUploadIcon()},domProps:{"innerHTML":_vm._s(_vm.dndCallToAction)}})])],1)])}
var JfDragAndDropTxtComponentvue_type_template_id_3280b7c8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=template&id=3280b7c8&scoped=true&

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
/* harmony default export */ var JfDragAndDropTxtComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-and-drop-txt',
  props: ['dndContent', 'dndHeadingHtml', 'dndStyle', 'dndRequired', 'dndCallToAction', 'dndAutoFocus'],
  'jf@inject': ['$scope', '$element', '$attrs', 'JFrogNotifications'],
  data: function data() {
    return {};
  },
  created: function created() {
    this.draggedFileSizeLimit = 400; // limit file size (in KB)

    this.entered = false;
  },
  mounted: function mounted() {
    this.dndAutoFocus = this.dndAutoFocus === undefined ? true : this.dndAutoFocus;
    this.dndCallToAction = this.dndCallToAction || "Copy your text or\n<b>drop a file</b>";
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
  }
});
// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragAndDropTxtComponentvue_type_script_lang_js_ = (JfDragAndDropTxtComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfDragAndDropTxtComponent/index.vue





/* normalize component */

var JfDragAndDropTxtComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDragAndDropTxtComponentvue_type_script_lang_js_,
  JfDragAndDropTxtComponentvue_type_template_id_3280b7c8_scoped_true_render,
  JfDragAndDropTxtComponentvue_type_template_id_3280b7c8_scoped_true_staticRenderFns,
  false,
  null,
  "3280b7c8",
  null
  
)

/* harmony default export */ var JfDragAndDropTxtComponent = (JfDragAndDropTxtComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfRadioButtonComponent/index.vue?vue&type=template&id=5cb32a52&scoped=true&
var JfRadioButtonComponentvue_type_template_id_5cb32a52_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[(_vm.text)?_c('label',{staticClass:"jf-radio-button"},[_c('span'),_vm._v(" "+_vm._s(_vm.text)+"\n    "),(_vm.helper)?_c('span',{staticClass:"helper"},[_vm._v(_vm._s(_vm.helper))]):_vm._e()]):_vm._e(),(!_vm.text)?_c('label',{staticClass:"jf-radio-button"},[_c('span'),_c('span',{attrs:{"slot":"template"},on:{"click":function($event){return _vm.onClickTemplate()}},slot:"template"}),(_vm.helper)?_c('span',{staticClass:"helper"},[_vm._v(_vm._s(_vm.helper))]):_vm._e()]):_vm._e()])])}
var JfRadioButtonComponentvue_type_template_id_5cb32a52_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfRadioButtonComponent/index.vue?vue&type=template&id=5cb32a52&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfRadioButtonComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfRadioButtonComponentvue_type_script_lang_js_ = ({
  name: 'jf-radio-button',
  props: ['text', 'helper'],
  'jf@inject': ['$element', '$transclude', '$timeout', '$scope'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    this.$transclude(function (clone) {
      _this.$element.find('label').prepend(clone);
    });
    this.$set(this.$scope, 'onClickTemplate', function () {
      $(_this.$element).parent().find('input[type=radio]').prop('checked', false);
      $(_this.$element).find('input[type=radio]').prop('checked', true);
    });
  }
});
// CONCATENATED MODULE: ./src/components/JfRadioButtonComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfRadioButtonComponentvue_type_script_lang_js_ = (JfRadioButtonComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfRadioButtonComponent/index.vue?vue&type=style&index=0&id=5cb32a52&scoped=true&lang=less&
var JfRadioButtonComponentvue_type_style_index_0_id_5cb32a52_scoped_true_lang_less_ = __webpack_require__("b038");

// CONCATENATED MODULE: ./src/components/JfRadioButtonComponent/index.vue






/* normalize component */

var JfRadioButtonComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfRadioButtonComponentvue_type_script_lang_js_,
  JfRadioButtonComponentvue_type_template_id_5cb32a52_scoped_true_render,
  JfRadioButtonComponentvue_type_template_id_5cb32a52_scoped_true_staticRenderFns,
  false,
  null,
  "5cb32a52",
  null
  
)

/* harmony default export */ var JfRadioButtonComponent = (JfRadioButtonComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfJsTreeWrapComponent/index.vue?vue&type=template&id=72451b3c&scoped=true&
var JfJsTreeWrapComponentvue_type_template_id_72451b3c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasData()),expression:"hasData()"}],staticClass:"jf-js-tree-wrap-container"},[(_vm.treeHeader)?_c('div',{staticClass:"tree-browser-header"},[_c('div',{staticClass:"tree-browser-header-tabs",domProps:{"innerHTML":_vm._s(_vm.treeHeader)}})]):_vm._e(),_vm._m(0)])])}
var JfJsTreeWrapComponentvue_type_template_id_72451b3c_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-element-container"},[_c('div',[_c('div',{staticClass:"tree-element"})])])}]


// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue?vue&type=template&id=72451b3c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfJsTreeWrapComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfJsTreeWrapComponentvue_type_script_lang_js_ = ({
  name: 'jf-js-tree-wrap',
  props: ['treeData', 'treeHeader', 'checkboxes'],
  'jf@inject': ['$scope', '$q', '$element', '$timeout'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$scope.$watch('jfJsTreeWrap.treeData', function (data) {
      if (data && !_this.built) _this.initTree();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfJsTreeWrap'
  },
  methods: {
    treeConfig: function treeConfig() {
      return {
        'core': {
          'data': {}
        },
        'checkbox': {
          'keep_selected_style': false,
          'three_state': true,
          'tie_selection': false,
          'whole_node': false
        },
        'plugins': this.checkboxes === true || this.checkboxes === undefined ? ['wholerow', 'checkbox'] : []
      };
    },
    initTree: function initTree() {
      var _this2 = this;

      this.buildTree().then(function () {
        _this2.registerTreeEvents();

        _this2.$emit('on-ready', {
          jstree: _this2.jstree()
        });

        _this2.built = true;
      });
    },
    registerTreeEvents: function registerTreeEvents() {
      var _this3 = this;

      $(this.treeElement).on('select_node.jstree', function (e, args) {});
      $(this.treeElement).on('check_node.jstree', function (e, args) {
        _this3.$timeout(function () {
          return _this3.$emit('on-state-change');
        });
      });
      $(this.treeElement).on('uncheck_node.jstree', function (e, args) {
        _this3.$timeout(function () {
          return _this3.$emit('on-state-change');
        });
      });
    },
    buildTree: function buildTree() {
      var _this4 = this;

      this.transformedData = this.transformData(this.treeData);
      var TreeConfig = this.treeConfig();

      TreeConfig.core.data = function (obj, cb) {
        if (obj.id === '#') cb(_this4.transformedData);else {
          var children = _this4.$emit('get-children-func', {
            node: obj.data.originalObject()
          });

          if (children.then) {
            children.then(function (data) {
              return cb(_this4.transformData(data));
            });
          } else {
            cb(children ? _this4.transformData(children) : []);
          }
        }
      };

      this.treeElement = $(this.$element).find('.tree-element');
      $(this.treeElement).jstree(TreeConfig);
      var defer = this.$q.defer();
      $(this.treeElement).on('ready.jstree', function (e) {
        defer.resolve();
      });
      return defer.promise;
    },
    jstree: function jstree() {
      return $(this.treeElement).jstree();
    },
    transformData: function transformData(origData) {
      var _this5 = this;

      if (!origData || !origData.length) return;
      return _.map(origData, function (origItem) {
        var item = {};
        item.data = {
          originalObject: function originalObject() {
            return origItem;
          }
        };

        var children = _this5.$emit('get-children-func', {
          node: origItem
        });

        item.children = children && (children.length || children.then) ? true : [];
        item.text = _this5.$emit('get-text-func', {
          node: origItem
        }) || '';
        item.icon = 'jf-tree-no-icon';
        item.state = _this5.getInitialStateFunc ? _this5.$emit('get-initial-state-func', {
          node: origItem
        }) : {
          opened: false,
          disabled: false,
          selected: false,
          checked: false
        };

        _this5.setItemMethods(origItem);

        return item;
      });
    },
    setItemMethods: function setItemMethods(item) {
      var _this6 = this;

      item.$isChecked = function () {
        var node = _this6.getTreeNodeByOrigItem(item);

        return node ? _this6.jstree().is_checked(node) : false;
      };

      item.$isOpened = function () {
        var node = _this6.getTreeNodeByOrigItem(item);

        return node ? _this6.jstree().is_open(node) : false;
      };

      item.$setChecked = function () {
        var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var node = _this6.getTreeNodeByOrigItem(item);

        if (node) {
          if (checked) _this6.jstree().check_node(node);else _this6.jstree().uncheck_node(node);
        }
      };

      item.$setOpened = function () {
        var opened = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var node = _this6.getTreeNodeByOrigItem(item);

        if (node) {
          if (opened) _this6.jstree().open_node(node, null, false);else _this6.jstree().close_node(node, null, false);
        }
      };
    },
    getTreeNodeByOrigItem: function getTreeNodeByOrigItem(origItem) {
      var treeJSON = this.jstree().get_json();
      var found;

      var recursiveFind = function recursiveFind(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].data.originalObject() === origItem) {
            found = arr[i];
            break;
          }
        }

        if (!found) {
          for (var _i = 0; _i < arr.length; _i++) {
            if (arr[_i].children && arr[_i].children.length) {
              found = recursiveFind(arr[_i].children);
              if (found) break;
            }
          }
        }

        return found;
      };

      recursiveFind(treeJSON);
      return found;
    },
    hasData: function hasData() {
      return this.treeData && this.treeData.length;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfJsTreeWrapComponentvue_type_script_lang_js_ = (JfJsTreeWrapComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue





/* normalize component */

var JfJsTreeWrapComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfJsTreeWrapComponentvue_type_script_lang_js_,
  JfJsTreeWrapComponentvue_type_template_id_72451b3c_scoped_true_render,
  JfJsTreeWrapComponentvue_type_template_id_72451b3c_scoped_true_staticRenderFns,
  false,
  null,
  "72451b3c",
  null
  
)

/* harmony default export */ var JfJsTreeWrapComponent = (JfJsTreeWrapComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarkupEditorComponent/index.vue?vue&type=script&lang=js&

var TEMPLATE = "\n<div>\n    <div class=\"jf-markup-editor\" :class=\"{'has-editor-label':editorLabel}\" v-if=\"webworkerOk || previewersCount === 2\">\n        <div class=\"controls\">\n            <div class=\"editor-label\" v-if=\"editorLabel\" :class=\"{'editor-label-position':isInEditMode()}\">\n                {{editorLabel}}\n            </div>\n            <div class=\"lang-select-wrapper\" v-if=\"showControls && isEditable\">\n                <jf-ui-select class=\"form-group-cell\"\n                              :jf-select-disabled=\"!isInEditMode()\"\n                              v-model=\"currentLanguage\"\n                              @jf-select-change=\"onLanguageChange\"\n                              :jf-select-options=\"['Markdown','Asciidoc','Plain Text']\">\n                </jf-ui-select>\n            </div>\n            <div class=\"switch-wrapper\" v-if=\"showControls\">\n                <jf-switch v-model=\"currentMode\" @input=\"onChangeModeInternal()\" :options=\"modeOptions\" ref=\"switchController\" class=\"no-margin-top\">\n                </jf-switch>\n            </div>\n            <button class=\"btn btn-default edit-button\" type=\"button\" v-if=\"!showControls && isEditable\" @click=\"activateEditor()\">\n                <span v-if=\"value && value.length > 0\">\n                <i class=\"icon icon-edit-pen\"></i>\n                <span>Edit</span>\n                </span>\n                <span v-if=\"!value || value.length === 0\">\n                <i class=\"icon icon-new\"></i>\n                <span>Add</span>\n                </span>\n            </button>\n        </div>\n\n        <div class=\"code-mirror-wrapper codemirror-wrapper\"  v-if=\"isInEditMode()\">\n\n            <jf-code-mirror v-if=\"currentLanguage === 'Markdown'\"\n                            mime-type=\"text/x-markdown\"\n                            mode=\"gfm\"\n                            :allow-edit=\"true\"\n                            :key=\"currentLanguage\"\n                            height=\"100%\"\n                            :autofocus=\"!preventAutoFocus\"\n                            enable-copy-to-clipboard=\"value && value.length\"\n                            clipboard-copy-entity-name=\"text\"\n                            :value=\"value\" @input=\"$emit('input', arguments[0])\">\n            </jf-code-mirror>\n            <jf-code-mirror v-if=\"currentLanguage === 'Asciidoc'\"\n                            mime-type=\"text/x-markdown\"\n                            mode=\"asciidoc\"\n                            :allow-edit=\"true\"\n                            :key=\"currentLanguage\"\n                            height=\"100%\"\n                            :autofocus=\"!preventAutoFocus\"\n                            enable-copy-to-clipboard=\"value && value.length\"\n                            clipboard-copy-entity-name=\"text\"\n                            :value=\"value\" @input=\"$emit('input', arguments[0])\">\n            </jf-code-mirror>\n            <jf-code-mirror v-if=\"currentLanguage === 'Plain Text'\"\n                            :allow-edit=\"true\"\n                            :key=\"currentLanguage\"\n                            height=\"100%\"\n                            :autofocus=\"!preventAutoFocus\"\n                            enable-copy-to-clipboard=\"value && value.length\"\n                            clipboard-copy-entity-name=\"text\"\n                            :value=\"value\" @input=\"$emit('input', arguments[0])\">\n            </jf-code-mirror>\n            <button v-if=\"onSave\" @click=\"onSaveClick()\" class=\"btn btn-primary save-button pull-right\">\n                Save\n            </button>\n            <button v-if=\"!hideCancelButton\" @click=\"onCancel()\" class=\"btn btn-secondary clancel-button pull-right\">\n                Cancel\n            </button>\n        </div>\n\n        <div class=\"preview-wrapper\"  v-if=\"!isInEditMode()\">\n            <div class=\"preview\" :class=\"{'empty-preview': !preview || preview.length === 0}\" v-html=\"preview\">\n            </div>\n            <div class=\"no-markup\" v-if=\"!preview\">\n                <span>No markup available.</span>&nbsp;\n                <a class=\"jf-link\" v-if=\"!showControls && isEditable\" @click.prevent=\"activateEditor()\">\n                    Add markup.\n                </a>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n";
var PREVIEW_MODE = 'Preview';
var EDIT_MODE = 'Edit';
/* harmony default export */ var JfMarkupEditorComponentvue_type_script_lang_js_ = ({
  template: TEMPLATE,
  name: 'jf-markup-editor',
  props: ['value', 'previewRenderers', 'language', 'mode', 'editable', 'showControls', 'hideCancelButton', 'editorLabel', 'preventAutoFocus'],
  'jf@inject': ['$timeout', '$scope', 'JFrogUIWebWorker'],
  data: function data() {
    return {
      webworkerOk: null,
      previewersCount: null,
      modeOptions: null,
      onSave: null,
      preview: {
        length: null
      },
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
      this.preview = preview;
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
// CONCATENATED MODULE: ./src/components/JfMarkupEditorComponent/index.vue
var JfMarkupEditorComponent_render, JfMarkupEditorComponent_staticRenderFns




/* normalize component */

var JfMarkupEditorComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfMarkupEditorComponentvue_type_script_lang_js_,
  JfMarkupEditorComponent_render,
  JfMarkupEditorComponent_staticRenderFns,
  false,
  null,
  "4a15dbe8",
  null
  
)

/* harmony default export */ var JfMarkupEditorComponent = (JfMarkupEditorComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListSelectionComponent/index.vue?vue&type=template&id=5564e7bc&scoped=true&
var JfListSelectionComponentvue_type_template_id_5564e7bc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-list-selection"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterList),expression:"filterList"}],staticClass:"input-text dnd-filter",attrs:{"type":"text","placeholder":"Filter..."},domProps:{"value":(_vm.filterList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterList=$event.target.value},function($event){return _vm.onFilterChange()}]}}),_c('div',{staticClass:"group-list-wrapper"},[_c('ul',{staticClass:"group-list"},[_c('li',{staticClass:"group-list-item",staticStyle:{"display":"none"}},[_vm._v("*")]),_vm._l((_vm.getPageItems()),function(item,index){return _c('li',_vm._b({key:index,staticClass:"group-list-item cursor-pointer",class:{'not-clickable': !item.clickable, 'highlighted': item.highlighted && _vm.highlightSelected},on:{"dblclick":function($event){return _vm.onItemClick(item)},"click":function($event){_vm.allowSingleClick ? _vm.onItemSelection(item) : null}}},'li',_vm.addToolTip(item),false),[(item.icon_class)?_c('i',_vm._b({staticClass:"icon pull-left",class:item.icon_class},'i',_vm.addToolTip(item),false)):_vm._e(),_vm._v("\n                "+_vm._s(item.name)+"\n                "),_c('i',{staticClass:"icon icon-arrow pull-right cursor-pointer",on:{"click":function($event){return _vm.onItemSelection(item)}}})])})],2)]),_c('div',[_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.paginationApi}})],1)])}
var JfListSelectionComponentvue_type_template_id_5564e7bc_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=template&id=5564e7bc&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListSelectionComponent/index.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var JfListSelectionComponentvue_type_script_lang_js_PaginationApi =
/*#__PURE__*/
function () {
  function PaginationApi(ctrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.ctrl = ctrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      if (!this.ctrl.usePagination) {
        return 0;
      }

      return Math.ceil(this.ctrl.filter(this.ctrl.items, this.ctrl.filterList).length / this.ctrl.itemsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      if (this.ctrl.currentPage > this.getTotalPages()) {
        this.ctrl.currentPage = this.getTotalPages();
      }

      if (this.ctrl.currentPage < 1) {
        this.ctrl.currentPage = 1;
      }

      return this.ctrl.currentPage;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.ctrl.currentPage < this.getTotalPages()) {
        this.ctrl.currentPage++;
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.ctrl.currentPage > 1) {
        this.ctrl.currentPage--;
      }
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
        this.ctrl.currentPage = pageNum;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.ctrl.$timeout(function () {
        if (_this.getCurrentPage() > _this.getTotalPages()) {
          _this.setPage(_this.getTotalPages());
        }

        if (_this.listener) {
          _this.listener(_this.getCurrentPage());
        }
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      this.listener = listener;
    }
  }]);

  return PaginationApi;
}();

/* harmony default export */ var JfListSelectionComponentvue_type_script_lang_js_ = ({
  name: 'jf-list-selection',
  props: ['items', 'usePagination', 'highlightSelected', 'allowSingleClick'],
  'jf@inject': ['$timeout'],
  data: function data() {
    return {
      filterList: null,
      paginationApi: null,
      itemsPerPage: this.items && this.items.length || 0,
      currentPage: 1
    };
  },
  created: function created() {
    this.paginationApi = new JfListSelectionComponentvue_type_script_lang_js_PaginationApi(this);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      if (!_this2.$element) {
        return;
      }

      var containerHeight = _this2.$element.find('.group-list-wrapper').innerHeight();

      var itemHeight = _this2.$element.find('.group-list-item').outerHeight();

      _this2.itemsPerPage = Math.floor(containerHeight / itemHeight);
    });
  },
  methods: {
    filter: function filter(originalList, filterCriteria) {
      if (filterCriteria) {
        return originalList.filter(function (item) {
          return item.name.toLowerCase().indexOf(filterCriteria) != -1;
        });
      }

      return originalList;
    },
    addToolTip: function addToolTip(item) {
      var prop = {};

      if (item.icon_tooltip) {
        prop = {
          "jf-tooltip": item.icon_tooltip
        };
      }

      return prop;
    },
    getPageItems: function getPageItems() {
      if (!this.usePagination) {
        return this.filter(this.items, this.filterList);
      }

      var start = (this.currentPage - 1) * this.itemsPerPage;
      var slice = this.filter(this.items, this.filterList).slice(start, start + this.itemsPerPage);
      return slice;
    },
    onFilterChange: function onFilterChange() {
      this.paginationApi.setPage(1);
      this.paginationApi.update();
    },
    onItemSelection: function onItemSelection(item) {
      if (this.highlightSelected && !item.highlighted) {
        var lastHiglighted = _.find(this.items, function (i) {
          return i.highlighted;
        });

        if (lastHiglighted) {
          lastHiglighted.highlighted = false;
        }

        item.highlighted = true;
      }

      this.onItemClick(item);
    },
    onItemClick: function onItemClick(item) {
      this.$emit('select', item);
      this.paginationApi.update();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfListSelectionComponentvue_type_script_lang_js_ = (JfListSelectionComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=style&index=0&id=5564e7bc&scoped=true&lang=less&
var JfListSelectionComponentvue_type_style_index_0_id_5564e7bc_scoped_true_lang_less_ = __webpack_require__("2ccd");

// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue






/* normalize component */

var JfListSelectionComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfListSelectionComponentvue_type_script_lang_js_,
  JfListSelectionComponentvue_type_template_id_5564e7bc_scoped_true_render,
  JfListSelectionComponentvue_type_template_id_5564e7bc_scoped_true_staticRenderFns,
  false,
  null,
  "5564e7bc",
  null
  
)

/* harmony default export */ var JfListSelectionComponent = (JfListSelectionComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDatetimepickerComponent/index.vue?vue&type=template&id=47f0b8a5&
var JfDatetimepickerComponentvue_type_template_id_47f0b8a5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-datetimepicker"},[_c('div',{ref:"pickerElement",staticClass:"input-group",class:{disabled: !_vm.isEnabled, error: _vm.error}},[_c('date-picker',{attrs:{"config":_vm.dpOpitons,"wrap":_vm.wrap},model:{value:(_vm.datetime),callback:function ($$v) {_vm.datetime=$$v},expression:"datetime"}}),_vm._m(0)],1),(_vm.error)?_c('div',{staticClass:"field-validation-error"},[_c('div',{staticClass:"jf-validation"},[_vm._v("\n            this field is required\n        ")])]):_vm._e()])}
var JfDatetimepickerComponentvue_type_template_id_47f0b8a5_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon calendar"},[_c('span',{staticClass:"glyphicon glyphicon-calendar"})])}]


// CONCATENATED MODULE: ./src/components/JfDatetimepickerComponent/index.vue?vue&type=template&id=47f0b8a5&

// EXTERNAL MODULE: ./node_modules/vue-bootstrap-datetimepicker/dist/vue-bootstrap-datetimepicker.js
var vue_bootstrap_datetimepicker = __webpack_require__("133f");
var vue_bootstrap_datetimepicker_default = /*#__PURE__*/__webpack_require__.n(vue_bootstrap_datetimepicker);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDatetimepickerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfDatetimepickerComponentvue_type_script_lang_js_ = ({
  name: 'jf-datetimepicker',
  components: {
    datePicker: vue_bootstrap_datetimepicker_default.a
  },
  props: {
    isDatepickerOpen: {
      default: false,
      type: Boolean
    },
    isRequired: {
      default: false,
      type: Boolean
    },
    model: {
      default: {}
    },
    options: null,
    attrId: {
      default: null
    },
    isEnabled: {
      default: true,
      type: Boolean
    }
  },
  data: function data() {
    return {
      wrap: true,
      dpOpitons: {
        allowInputToggle: true,
        toolbarPlacement: 'top'
      }
    };
  },
  computed: {
    uniqId: function uniqId() {
      return this.attrId || this._uid;
    },
    datetime: {
      get: function get() {
        if (!this.model) {
          return;
        }

        return window.moment(this.model);
      },
      set: function set(val) {
        this.$emit('update:model', val);
        this.$emit('on-change', val);
      }
    },
    error: function error() {
      return this.isRequired && !this.model;
    }
  },
  created: function created() {
    this.setDatepickerOptions();
  },
  mounted: function mounted() {
    var pickerElement = this.$refs.pickerElement; // apply essentials css to inner component

    pickerElement.firstChild.classList.add('input-text');
    this.dateTimePickerObj = window.$(pickerElement).datetimepicker();

    if (this.isDatepickerOpen) {
      this.show();
    }
  },
  methods: {
    setDatepickerOptions: function setDatepickerOptions() {
      if (this.options) {
        this.dpOpitons = _.assign({}, this.options, this.dpOpitons);
      }
    },
    show: function show() {
      this.dateTimePickerObj.data('DateTimePicker').show();
    }
  },
  watch: {
    isDatepickerOpen: function isDatepickerOpen(val) {
      if (val) {
        this.show();
      } else {
        this.$emit('update:isDatepickerOpen', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDatetimepickerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDatetimepickerComponentvue_type_script_lang_js_ = (JfDatetimepickerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDatetimepickerComponent/index.vue?vue&type=style&index=0&lang=less&
var JfDatetimepickerComponentvue_type_style_index_0_lang_less_ = __webpack_require__("48a9");

// CONCATENATED MODULE: ./src/components/JfDatetimepickerComponent/index.vue






/* normalize component */

var JfDatetimepickerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDatetimepickerComponentvue_type_script_lang_js_,
  JfDatetimepickerComponentvue_type_template_id_47f0b8a5_render,
  JfDatetimepickerComponentvue_type_template_id_47f0b8a5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfDatetimepickerComponent = (JfDatetimepickerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPasswordStrengthComponent/index.vue?vue&type=template&id=14a06e0c&scoped=true&
var JfPasswordStrengthComponentvue_type_template_id_14a06e0c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"password-strength-container"},[_c('div',{staticClass:"password-strength-meter",class:this.strength.class},[_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 0}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 1}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 2}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 3}}),_c('div',{staticClass:"password-strength-section",class:{ 'show-section': this.strength.sections > 4}})]),_c('label',{staticClass:"password-strength-label"},[_vm._v(_vm._s(this.strength.label))])])])}
var JfPasswordStrengthComponentvue_type_template_id_14a06e0c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPasswordStrengthComponent/index.vue?vue&type=template&id=14a06e0c&scoped=true&

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

// CONCATENATED MODULE: ./src/components/JfPasswordStrengthComponent/index.vue






/* normalize component */

var JfPasswordStrengthComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfPasswordStrengthComponentvue_type_script_lang_js_,
  JfPasswordStrengthComponentvue_type_template_id_14a06e0c_scoped_true_render,
  JfPasswordStrengthComponentvue_type_template_id_14a06e0c_scoped_true_staticRenderFns,
  false,
  null,
  "14a06e0c",
  null
  
)

/* harmony default export */ var JfPasswordStrengthComponent = (JfPasswordStrengthComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarqueeComponent/index.vue?vue&type=template&id=65fdec6e&scoped=true&
var JfMarqueeComponentvue_type_template_id_65fdec6e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-marquee-container"},[_c('span',{directives:[{name:"init",rawName:"v-init",value:(_vm.checkOverflow()),expression:"checkOverflow()"}]},[(!_vm.$transclude.isSlotFilled('innerHtml'))?_vm._t("default"):_vm._e(),(_vm.$transclude.isSlotFilled('innerHtml'))?_vm._t("default"):_vm._e()],2)])])}
var JfMarqueeComponentvue_type_template_id_65fdec6e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue?vue&type=template&id=65fdec6e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarqueeComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfMarqueeComponentvue_type_script_lang_js_ = ({
  name: 'jf-marquee',
  props: ['disabled'],
  'jf@inject': ['$element', '$timeout', '$interval', '$scope', '$transclude'],
  data: function data() {
    return {};
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    this.container = $(this.$element).find('.jf-marquee-container');
    this.content = $(this.$element).find('.jf-marquee-container span');
    this.container.on('mouseenter', function () {
      return _this.onMouseEnter();
    });
    this.container.on('mouseleave', function () {
      return _this.onMouseLeave();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfMarquee'
  },
  methods: {
    onMouseEnter: function onMouseEnter() {
      if (this.disabled) return;
      this.checkOverflow();

      if (this.overflowing) {
        this.animPeriod = this.content.innerWidth() * 0.01;
        this.startAnimation(1000);
      }
    },
    onMouseLeave: function onMouseLeave() {
      if (this.disabled) return;

      if (this.overflowing) {
        this.content.css('transition', 'none');
        this.content.css('left', '0');
        this.container.removeClass('animating');
        if (this.startAnimTimeout) this.$timeout.cancel(this.startAnimTimeout);
        if (this.loopAnimTimeout) this.$timeout.cancel(this.loopAnimTimeout);
      }
    },
    startAnimation: function startAnimation() {
      var _this2 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.container.addClass('animating');
      this.content.css('transition', "left ".concat(this.animPeriod, "s linear"));
      this.content.css('left', '0');
      this.startAnimTimeout = this.$timeout(function () {
        _this2.content.css('left', -_this2.content.innerWidth() + 'px');

        _this2.loopAnimTimeout = _this2.$timeout(function () {
          _this2.content.css('transition', 'none');

          _this2.content.css('left', _this2.container.innerWidth() + 'px');

          _this2.animPeriod = (_this2.container.innerWidth() + _this2.content.innerWidth()) * 0.01;

          _this2.$timeout(function () {
            return _this2.startAnimation();
          }, 10);
        }, _this2.animPeriod * 1000);
      }, delay);
    },
    checkOverflow: function checkOverflow() {
      if (!this.container) return;

      if (Math.round(this.container.innerWidth()) < Math.round(this.container[0].scrollWidth)) {
        this.container.addClass('overflowing');
        this.overflowing = true;
      } else {
        this.container.removeClass('overflowing');
        this.overflowing = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfMarqueeComponentvue_type_script_lang_js_ = (JfMarqueeComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue





/* normalize component */

var JfMarqueeComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfMarqueeComponentvue_type_script_lang_js_,
  JfMarqueeComponentvue_type_template_id_65fdec6e_scoped_true_render,
  JfMarqueeComponentvue_type_template_id_65fdec6e_scoped_true_staticRenderFns,
  false,
  null,
  "65fdec6e",
  null
  
)

/* harmony default export */ var JfMarqueeComponent = (JfMarqueeComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWidgetsLayoutComponent/index.vue?vue&type=script&lang=js&













var JfWidgetsLayoutComponentvue_type_script_lang_js_TEMPLATE = "\n<div>\n    <div class=\"jf-widgets-layout-container\"  :style=\"containerCss\" @mouseleave=\"onMouseLeave($event)\" @mousemove=\"onMouseMove($event)\" @mousedown=\"onMouseDown($event)\" @mouseup=\"onMouseUp($event)\">\n        <div class=\"widgets-padder\" :style=\"padderCss\">\n            <div v-for=\"rowOrColumn in transformedLayout\" class=\"widgets-row\">\n                <div v-for=\"layoutObj in rowOrColumn\" :style=\"cssRules[layoutObj.cssId]\" class=\"widget-wrapper\" :class=\"{['widget-wrapper-' + widgets[layoutObj.widget].id.toLowerCase()]: true, 'atom': !layoutObj.subLayout}\">\n                    <div v-if=\"!layoutObj.subLayout && editMode\" class=\"edit-mode-actions\" @mousemove=\"onWidgetMouseMove($event)\">\n                        <i class=\"glyphicon glyphicon-asterisk\" v-jf-tooltip=\"'Change'\" @click=\"changeWidget(layoutObj)\"></i>\n                        <i class=\"glyphicon glyphicon-remove-circle\" v-jf-tooltip=\"'Remove'\" v-if=\"getWidgetsCount() > 1\" @click=\"removeWidget(layoutObj)\"></i>\n                        <i class=\"glyphicon glyphicon-resize-vertical\" v-jf-tooltip=\"'Vertical Split'\" @click=\"splitCell(layoutObj,'v')\"></i>\n                        <i class=\"glyphicon glyphicon-resize-horizontal\" v-jf-tooltip=\"'Horizontal Split'\" @click=\"splitCell(layoutObj,'h')\"></i>\n                    </div>\n                    <div v-if=\"!layoutObj.subLayout && editMode && layoutObj.selectWidgetMode\" class=\"select-widget-mode\" @mousemove=\"onWidgetMouseMove($event)\">\n                        <div class=\"widget-selector\">\n                            <jf-ui-select :jf-select-model=\"layoutObj.widget\" jf-select-display-func=\"getWidgetName($item)\" jf-select-placeholder=\"Select A Widget\" jf-select-change=\"onWidgetChange(layoutObj)\" :jf-select-options=\"widgetKeys\"></jf-ui-select>\n                        </div>\n                    </div>\n                    <div v-if=\"!layoutObj.subLayout && (_getRootDirective().transformedLayout.length > 1 || _getRootDirective().transformedLayout[0].length > 1) && options.expandablePanes\" :style=\"{top: top, left: left}\" class=\"expansion-corner-mask\">\n                        <div class=\"expansion-corner-fill\" @click=\"expandPane(layoutObj)\">\n                            <div class=\"icon icon-thin-arrow\" :class=\"{expanded: layoutObj.expanded}\"></div>\n                        </div>\n                    </div>\n                    <div class=\"widget-container\" @mousemove=\"onWidgetMouseMove($event)\" v-if=\"!layoutObj.subLayout\" :style=\"{overflow: widgets[layoutObj.widget].scroll ? 'auto' : 'hidden'}\">\n                        <div v-if=\"widgets[layoutObj.widget] && widgets[layoutObj.widget].showSpinner\" class=\"widget-spinner\">\n                            <div class=\"spinner-msg\">\n                                <div class=\"icon-hourglass\"></div>\n                            </div>\n                        </div>\n                        <div v-if=\"widgets[layoutObj.widget] && widgets[layoutObj.widget].template\" v-show=\"widgets[layoutObj.widget].$compiled || (!widgets[layoutObj.widget].model && !widgets[layoutObj.widget].controller)\">\n                            <div class=\"compile-children\" v-show=\"widgets[layoutObj.widget].$compiled\" :id=\"layoutObj.widget\" v-html=\"widgets[layoutObj.widget].template\"></div>\n                        </div>\n                    </div>\n                    <div v-if=\"layoutObj.subLayout\">\n                        <jf-widgets-layout :layout=\"layoutObj.subLayout\" :widgets=\"widgets\" :options=\"subOptions\" parent-cell=\"layoutObj\"></jf-widgets-layout>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"home-disclaimer\" v-html=\"footerText\" v-if=\"footerText\"></div>\n    </div>\n</div>\n";
/* harmony default export */ var JfWidgetsLayoutComponentvue_type_script_lang_js_ = ({
  template: JfWidgetsLayoutComponentvue_type_script_lang_js_TEMPLATE,
  name: 'jf-widgets-layout',
  props: ['widgets', 'layout', 'options', 'parentCell', 'footerText'],
  'jf@inject': ['$scope', '$rootScope', '$compile', '$timeout', '$q', '$templateRequest', '$sce', '$injector', '$element'],
  data: function data() {
    return {
      containerCss: null,
      padderCss: null,
      transformedLayout: null,
      cssRules: null,
      editMode: null,
      widgetKeys: null,
      top: null,
      left: null,
      subOptions: null
    };
  },
  created: function created() {
    this.ANIM_DURATION = 0.5;
  },
  mounted: function mounted() {
    var _this = this;

    this.setDefaultOptions();

    var onChange = function onChange(newval, oldval) {
      if (!newval) return;

      _this.transformLayout();

      _this.updateFlatCells();

      _this.updateCss();

      _this.updateDragLines();

      if (_this.recompile) {
        _this.recompile = false;

        keys_default()(_this.widgets).forEach(function (id) {
          return delete _this.widgets[id].$compiled;
        });

        _this.templatesLoadStarted = false;
        _this.templatesLoaded = false;

        _this.$timeout(function () {
          return _this.compileElements();
        });
      } else if (!_this.templatesLoadStarted || _this.templatesLoaded) {
        keys_default()(_this.widgets).forEach(function (id) {
          if (_this._isWidgetInUse(id)) delete _this.widgets[id].$compiled;
        });

        _this.loadTemplates().then(function () {
          _this.$timeout(function () {
            return _this.compileElements();
          });
        });
      }
    };

    this.$scope.$watch('jfWidgetsLayout.options.editMode', function (editMode) {
      _this.editMode = editMode === undefined ? false : editMode;

      _this.$set(_this.subOptions, 'editMode', _this.editMode);

      if (!editMode) {
        _this.cleanLayout();

        if (!_this.options.isSub) {
          _this.updateLayoutJSON();

          if (_this.wasEditing) {
            if (_this.options.onEditEnd && _this.layoutJSON) _this.options.onEditEnd(_this.layoutJSON);
            _this.recompile = true;
          }
        }
      }

      _this.wasEditing = _this.editMode;
    });
    this.$scope.$watch('jfWidgetsLayout.layout', onChange);
    this.$scope.$watch('jfWidgetsLayout.widgets', function (widgets) {
      if (widgets) {
        _this.widgetKeys = keys_default()(widgets);
      }
    });

    if (this.options.parent && this.parentCell) {
      this.$set(this.parentCell, '$childLayout', this);
    }

    this.$scope.$on('$destroy', function () {
      if (_this.scopes) _this.scopes.forEach(function (s) {
        return s.$destroy();
      });
    });
  },
  ng1_legacy: {
    ng1compileFn: function ng1compileFn(element) {
      return recursiveDirective.compile(element);
    },
    'controllerAs': 'jfWidgetsLayout'
  },
  methods: {
    setDefaultOptions: function setDefaultOptions() {
      if (!this.options) this.options = {};
      if (!this.options.padding) this.$set(this.options, 'padding', 10);
      if (!this.options.minHeight) this.$set(this.options, 'minHeight', 'initial');
      if (!this.options.backColor) this.$set(this.options, 'backColor', 'transparent');
      if (this.options.allowResize === undefined) this.$set(this.options, 'allowResize', false);
      if (this.options.outerPadding === undefined) this.$set(this.options, 'outerPadding', true);
      if (this.options.editMode === undefined) this.$set(this.options, 'editMode', false);
      this.subOptions = _.cloneDeep(this.options);
      this.$set(this.subOptions, 'minHeight', 'initial');
      this.$set(this.subOptions, 'isSub', true);
      this.$set(this.subOptions, 'parent', this);
    },
    transformLayout: function transformLayout() {
      var _this2 = this;

      var _getSizeFromCell = function _getSizeFromCell(cell) {
        var i1 = cell.indexOf('%');
        var i2 = cell.indexOf('px');
        if (i1 !== -1) return cell.substr(0, i1);
        if (i2 !== -1) return cell.substr(0, i2);
      };

      var _getWidgetNameFromCell = function _getWidgetNameFromCell(cell) {
        var i = cell.indexOf('@');
        if (i !== -1) return cell.substr(i + 1);
      };

      var _getSubLayoutFromCell = function _getSubLayoutFromCell(cell) {
        var i = cell.indexOf('#');
        if (i !== -1) return cell.substr(i + 1);
      };

      this.transformedLayout = [];
      var theLayout = this.layout.main || this.layout;

      if (theLayout.rows) {
        this.mainAxis = 'rows';
      } else if (theLayout.columns) {
        this.mainAxis = 'columns';
      } else {
        console.log('Layout Format Error! Must have rows or columns.');
        return;
      }

      theLayout[this.mainAxis].forEach(function (rowOrColumn) {
        var tRowOrColumn = [];
        rowOrColumn.cells.forEach(function (cell) {
          var height = _this2.mainAxis === 'rows' ? rowOrColumn.size : _getSizeFromCell(cell);
          var width = _this2.mainAxis === 'columns' ? rowOrColumn.size : _getSizeFromCell(cell);

          var subLayoutName = _getSubLayoutFromCell(cell);

          var tCell = {
            widget: _getWidgetNameFromCell(cell),
            subLayout: subLayoutName ? _this2.layout[subLayoutName] : undefined,
            percentWidth: parse_int_default()(width),
            percentHeight: parse_int_default()(height)
          };

          if (rowOrColumn.new) {
            _this2.$timeout(function () {
              _this2.splitCell(tCell, _this2.mainAxis === 'columns' ? 'v' : 'h');
            });
          }

          tRowOrColumn.push(tCell);
        });

        _this2.transformedLayout.push(tRowOrColumn);
      });
      this.normalizeSizes();
    },
    updateFlatCells: function updateFlatCells() {
      var _this3 = this;

      this.flatCells = [];
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (cell) {
          _this3.flatCells.push(cell);
        });
      });
    },
    loadTemplates: function loadTemplates() {
      var _this4 = this;

      var defer = this.$q.defer();

      if (this.templatesLoaded) {
        defer.resolve();
        return defer.promise;
      }

      this.templatesLoadStarted = true;
      var fired = 0,
          completed = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (layoutDef) {
          var widget = _this4.widgets[layoutDef.widget];

          if (widget) {
            if (widget.templateUrl && !widget.template) {
              fired++;

              _this4.$templateRequest(widget.templateUrl).then(function (template) {
                if (!widget.$templateLoaded) {
                  widget.template = _this4.$sce.trustAsHtml(template);
                  widget.$templateLoaded = true;
                }
              }).finally(function () {
                completed++; //                            console.log('completed ' + completed + ' out of ' + fired);

                if (fired === completed) {
                  _this4.templatesLoaded = true;
                  defer.resolve();
                }
              });
            } else if (widget.template) {
              if (!widget.$templateLoaded) {
                widget.template = _this4.$sce.trustAsHtml(widget.template);
                widget.$templateLoaded = true;
              }
            }
          }
        });
      });
      if (!fired) defer.resolve();
      return defer.promise;
    },
    updateCss: function updateCss() {
      var _this5 = this;

      var oldRules = _.cloneDeep(this.cssRules);

      this.cssRules = {};
      var currentX = 0,
          currentY = 0;
      var cssRunningId = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        if (_this5.mainAxis === 'rows') currentX = 0;else if (_this5.mainAxis === 'columns') currentY = 0;
        var topSize = 0;
        rowOrColumn.forEach(function (layoutDef) {
          var widget = _this5.widgets[layoutDef.widget];
          layoutDef.cssId = cssRunningId;

          if (!widget) {
            layoutDef.widget = '$widget' + cssRunningId;
          }

          cssRunningId++;
          _this5.cssRules[layoutDef.cssId] = {
            top: currentY + '%',
            left: currentX + '%',
            bottom: 100 - (currentY + layoutDef.percentHeight) + '%',
            right: 100 - (currentX + layoutDef.percentWidth) + '%',
            padding: _this5.options.padding / 2 + 'px',
            opacity: oldRules && oldRules[layoutDef.cssId] && oldRules[layoutDef.cssId].opacity !== undefined ? oldRules[layoutDef.cssId].opacity : 1
          };

          if (_this5.mainAxis === 'rows') {
            currentX += layoutDef.percentWidth;
            if (layoutDef.percentHeight > topSize) topSize = layoutDef.percentHeight;
          } else if (_this5.mainAxis === 'columns') {
            currentY += layoutDef.percentHeight;
            if (layoutDef.percentWidth > topSize) topSize = layoutDef.percentWidth;
          }
        });
        if (_this5.mainAxis === 'rows') currentY += topSize;else if (_this5.mainAxis === 'columns') currentX += topSize;
      });
      var pad = this.options.isSub ? 0 : this.options.outerPadding ? this.options.padding / 2 : -this.options.padding / 2;
      this.padderCss = {
        top: pad + 'px',
        left: pad + 'px',
        bottom: pad + 'px',
        right: pad + 'px'
      };
      this.containerCss = {
        'min-height': this.options.minHeight + 'px',
        'background-color': this.options.backColor,
        'overflow': this.options.isSub && this.editMode ? 'visible' : 'hidden'
      };
      if (this.options.parent) this.options.parent.updateCss();
    },
    updateDragLines: function updateDragLines() {
      this.dragLines = [];

      for (var key in this.cssRules) {
        var rules = this.cssRules[key];

        var top = parse_float_default()(rules.top);

        var bottom = parse_float_default()(rules.bottom);

        var left = parse_float_default()(rules.left);

        var right = parse_float_default()(rules.right);

        var cell = _.find(this.flatCells, {
          cssId: parse_int_default()(key)
        });

        this.addLinesFromRect({
          x1: left,
          y1: top,
          x2: 100 - right,
          y2: 100 - bottom,
          cssRules: rules,
          widget: cell.widget
        });
        cell.percentWidth = 100 - right - left;
        cell.percentHeight = 100 - bottom - top;
      }
    },
    compileElements: function compileElements() {
      var _this6 = this;

      var elems = $('.compile-children');
      if (this.scopes) this.scopes.forEach(function (s) {
        return s.$destroy();
      });
      this.scopes = [];

      for (var i = 0; i < elems.length; i++) {
        var elem = $(elems[i]);
        var widgetId = elem.prop('id');

        if (this._isWidgetInUse(widgetId)) {
          (function () {
            var widget = _this6._getWidgetById(widgetId);

            var scope = _this6.$rootScope.$new();

            _this6.scopes.push(scope);

            var children = elem.children();

            if (widget.model) {
              _.extend(scope, widget.model);
            }

            if (_this6.options.sharedModel) {
              _.extend(scope, _this6.options.sharedModel);
            }

            if (!widget.controller) {
              widget.controller = function Ctrl() {
                Object(classCallCheck["a" /* default */])(this, Ctrl);
              };
            }

            widget.controller.prototype.$widgetLayoutManager = _this6;

            var controllerInstance = _this6.$injector.instantiate(widget.controller);

            controllerInstance.$element = children[0];
            controllerInstance.$layoutObject = _this6._getLayoutByWidget(elem.prop('id'));
            controllerInstance.$scope = scope;
            controllerInstance.$widgetObject = widget;
            var controllerObject = {};
            controllerObject[widget.controllerAs || 'ctrl'] = controllerInstance;

            _.extend(scope, controllerObject);

            if (controllerInstance.$onInit) controllerInstance.$onInit(); //We compile only first child, templates should have only one root element!

            var rootChild = $(children[0]);

            if (!rootChild.prop('compiled')) {
              _this6.$compile(rootChild)(scope);

              rootChild.prop('compiled', true);
            }

            _this6.$timeout(function () {
              widget.$compiled = true;
            });
          })();
        }
      }
    },
    _getWidgetById: function _getWidgetById(id) {
      var widget = this.widgets[id];
      return widget;
    },
    _getLayoutByWidget: function _getLayoutByWidget(id) {
      var layout;

      for (var i in this.transformedLayout) {
        var rowOrColumn = this.transformedLayout[i];
        layout = _.find(rowOrColumn, {
          widget: id
        });
        if (layout) break;
      }

      return layout;
    },
    _isWidgetInUse: function _isWidgetInUse(widgetId) {
      return !!_.find(this.flatCells, {
        widget: widgetId
      });
    },
    _getPrecPoint: function _getPrecPoint(e) {
      var container = $(this.$element).find('.jf-widgets-layout-container');
      var containerWidth = container.innerWidth();
      var containerHeight = container.innerHeight();
      var mouseX = e.pageX - container.offset().left;
      var mouseY = e.pageY - container.offset().top;
      var xprec = Math.round(mouseX / containerWidth * 100);
      var yprec = Math.round(mouseY / containerHeight * 100);
      return {
        x: xprec,
        y: yprec
      };
    },
    onMouseMove: function onMouseMove(e) {
      if (!this.options.allowResize && !this.editMode) return;

      if (this.draggingLines) {
        this.onDrag(e);
        e.preventDefault();
      } else {
        var container = $(this.$element).find('.jf-widgets-layout-container');

        var prec = this._getPrecPoint(e);

        this.closestLines = this.getClosestLines(prec.x, prec.y);

        if (this.closestLines.length) {
          var directions = _.map(this.closestLines, 'cssRelevantRule');

          var cursor;

          if (_.includes(directions, 'right') && _.includes(directions, 'left') && _.includes(directions, 'top') && _.includes(directions, 'bottom')) {
            cursor = 'all-scroll';
            this.setSubIsOnEdge(true);
          } else if (_.includes(directions, 'top') && _.includes(directions, 'bottom')) {
            cursor = 'row-resize';
            this.setSubIsOnEdge(true);
          } else if (_.includes(directions, 'right') && _.includes(directions, 'left')) {
            cursor = 'col-resize';
            this.setSubIsOnEdge(true);
          } else {
            cursor = 'default';
            this.setSubIsOnEdge(false);
          }

          container.css('cursor', cursor);
        } else {
          if (!this.subIsOnEdge) {
            container.css('cursor', 'default');
            this.setSubIsOnEdge(false);
          }
        }
      }
    },
    onMouseLeave: function onMouseLeave(e) {
      if (!this.options.allowResize && !this.editMode) return;
      this.onMouseUp();
      this.setSubIsOnEdge(false);
    },
    onDrag: function onDrag(e) {
      var perc = this._getPrecPoint(e);

      var xDiff = perc.x - this.dragStartPt.x;
      var yDiff = perc.y - this.dragStartPt.y;
      var okToDrag = true;

      for (var i in this.closestLines) {
        var line = this.closestLines[i];
        var origLine = this.dragStartLines[i];

        var top = parse_float_default()(origLine.cssRules.top);

        var bottom = parse_float_default()(origLine.cssRules.bottom);

        var left = parse_float_default()(origLine.cssRules.left);

        var right = parse_float_default()(origLine.cssRules.right);

        var originalHeight = this._getLayoutByWidget(line.widget).percentHeight;

        var originalWidth = this._getLayoutByWidget(line.widget).percentWidth;

        if (line.cssRelevantRule === 'top') {
          var newTop = top + yDiff;
          var newHeight = 100 - bottom - newTop;

          if (newHeight < 0.2 * originalHeight) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'bottom') {
          var newBottom = bottom - yDiff;

          var _newHeight = 100 - newBottom - top;

          if (_newHeight < 0.2 * originalHeight) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'left') {
          var newLeft = left + xDiff;
          var newWidth = 100 - right - newLeft;

          if (newWidth < 0.2 * originalWidth) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'right') {
          var newRight = right - xDiff;

          var _newWidth = 100 - newRight - left;

          if (_newWidth < 0.2 * originalWidth) {
            okToDrag = false;
            break;
          }
        }
      }

      if (okToDrag) {
        for (var _i in this.closestLines) {
          var _line = this.closestLines[_i];
          if (!this.ensureCSSRulesSync(_line, e)) break;
          var _origLine = this.dragStartLines[_i];

          if (_line.cssRelevantRule === 'top') {
            var _top = parse_float_default()(_origLine.cssRules.top);

            _line.cssRules.top = _top + yDiff + '%';
          } else if (_line.cssRelevantRule === 'bottom') {
            var _bottom = parse_float_default()(_origLine.cssRules.bottom);

            _line.cssRules.bottom = _bottom - yDiff + '%';
          } else if (_line.cssRelevantRule === 'left') {
            var _left = parse_float_default()(_origLine.cssRules.left);

            _line.cssRules.left = _left + xDiff + '%';
          } else if (_line.cssRelevantRule === 'right') {
            var _right = parse_float_default()(_origLine.cssRules.right);

            _line.cssRules.right = _right - xDiff + '%';
          }
        }
      }
    },
    ensureCSSRulesSync: function ensureCSSRulesSync(line, e) {
      // Very hacky solution TODO: Find a better solution!
      var found = false;

      for (var key in this.cssRules) {
        if (this.cssRules[key] === line.cssRules) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.onMouseUp();
        this.onMouseMove(e);
        this.onMouseDown(e);
        this.onMouseMove(e);
        return false;
      }

      return true;
    },
    onMouseDown: function onMouseDown(e) {
      if (!this.options.allowResize && !this.editMode) return;

      if (this.closestLines && this.closestLines.length) {
        this.draggingLines = true;
        this.dragStartPt = _.cloneDeep(this._getPrecPoint(e));
        this.dragStartLines = _.cloneDeep(this.closestLines);

        this._setTransitions(false);

        e.preventDefault();
        e.stopPropagation();
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (!this.options.allowResize && !this.editMode) return;
      this.updateDragLines();
      this.closestLines = null;
      this.draggingLines = false;
      this.dragStartPt = null;
      this.dragStartLines = null;
      if (e) this._setTransitions(true);
    },
    onWidgetMouseMove: function onWidgetMouseMove(e) {
      if (!this.options.allowResize && !this.editMode) return;
      if (this.draggingLines || this.isParentDragging()) return;
      var container = $(this.$element).find('.jf-widgets-layout-container');

      if (!this.subIsOnEdge) {
        container.css('cursor', 'default');
        this.setSubIsOnEdge(false);
      }

      e.stopPropagation();
    },
    addLinesFromRect: function addLinesFromRect(rect) {
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y1,
        x2: rect.x2,
        y2: rect.y1,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'top'
      });
      this.dragLines.push({
        x1: rect.x2,
        y1: rect.y1,
        x2: rect.x2,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'right'
      });
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y2,
        x2: rect.x2,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'bottom'
      });
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y1,
        x2: rect.x1,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'left'
      });
    },
    getClosestLines: function getClosestLines(x, y) {
      var _this7 = this;

      var closest = [];
      this.dragLines.forEach(function (line) {
        var infinite = (line.cssRelevantRule === 'bottom' || line.cssRelevantRule === 'top') && _this7.mainAxis === 'rows' || (line.cssRelevantRule === 'right' || line.cssRelevantRule === 'left') && _this7.mainAxis === 'columns';

        var dist = _this7.getPointDistToLine({
          x: x,
          y: y
        }, line, infinite);

        if (dist <= 1) closest.push(line);
      });
      var filtered = [];

      var top = _.filter(closest, {
        cssRelevantRule: 'top'
      });

      var bottom = _.filter(closest, {
        cssRelevantRule: 'bottom'
      });

      var left = _.filter(closest, {
        cssRelevantRule: 'left'
      });

      var right = _.filter(closest, {
        cssRelevantRule: 'right'
      });

      top.forEach(function (line) {
        var matches = _this7.mainAxis === 'rows' ? _.filter(bottom, {
          y1: line.y1
        }) : _.filter(bottom, {
          x1: line.x1,
          x2: line.x2
        });

        if (matches.length) {
          filtered.push(line);
          matches.forEach(function (match) {
            return filtered.push(match);
          });
        }
      });
      left.forEach(function (line) {
        var matches = _this7.mainAxis === 'columns' ? _.filter(right, {
          x1: line.x1
        }) : _.filter(right, {
          y1: line.y1,
          y2: line.y2
        });

        if (matches.length) {
          filtered.push(line);
          matches.forEach(function (match) {
            return filtered.push(match);
          });
        }
      });
      return filtered;
    },
    getPointDistToLine: function getPointDistToLine(pt, line, infiniteLine) {
      if (line.x1 === line.x2) {
        if (infiniteLine) return Math.abs(pt.x - line.x1);else if (pt.y < line.y1) return this.getPointDistToPoint(pt, {
          x: line.x1,
          y: line.y1
        });else if (pt.y > line.y2) return this.getPointDistToPoint(pt, {
          x: line.x2,
          y: line.y2
        });else return Math.abs(pt.x - line.x1);
      } else if (line.y1 === line.y2) {
        if (infiniteLine) return Math.abs(pt.y - line.y1);
        if (pt.x < line.x1) return this.getPointDistToPoint(pt, {
          x: line.x1,
          y: line.y1
        });else if (pt.x > line.x2) return this.getPointDistToPoint(pt, {
          x: line.x2,
          y: line.y2
        });else return Math.abs(pt.y - line.y1);
      }
    },
    getPointDistToPoint: function getPointDistToPoint(pt1, pt2) {
      return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
    },
    setSubIsOnEdge: function setSubIsOnEdge(onEdge) {
      var parent = this.options.parent;

      while (parent) {
        parent.subIsOnEdge = onEdge;
        parent = parent.options.parent;
      }
    },
    isParentDragging: function isParentDragging() {
      var recurse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var parent = this.options.parent;
      if (parent) return parent.draggingLines || parent.isParentDragging(true);else return recurse ? this.draggingLines : false;
    },
    removeWidget: function removeWidget(layoutObj) {
      this._setTransitions(true);

      var rowOrColumnToRemove = null;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var index = _.indexOf(rowOrColumn, layoutObj);

        if (index !== -1) {
          rowOrColumn.splice(index, 1);

          if (rowOrColumn.length === 0) {
            rowOrColumnToRemove = rowOrColumn;
          }
        }
      });

      if (rowOrColumnToRemove) {
        var index = _.indexOf(this.transformedLayout, rowOrColumnToRemove);

        this.transformedLayout.splice(index, 1);
      }

      if (this.transformedLayout.length === 0) {
        if (this.options.isSub) {
          var parentLayoutObj = _.find(this.options.parent.flatCells, {
            subLayout: this.layout
          });

          this.options.parent.removeWidget(parentLayoutObj);
        }
      }

      this.megaRefresh();
    },
    normalizeSizes: function normalizeSizes() {
      var _this8 = this;

      var totalSizeMajor = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var totalSizeMinor = 0;
        var totalSizeMajorAdd = 0;
        rowOrColumn.forEach(function (cell) {
          totalSizeMinor += _this8.mainAxis === 'columns' ? cell.percentHeight : cell.percentWidth;
          var major = _this8.mainAxis === 'columns' ? cell.percentWidth : cell.percentHeight;
          totalSizeMajorAdd = major > totalSizeMajorAdd ? major : totalSizeMajorAdd;
        });
        totalSizeMajor += totalSizeMajorAdd;

        if (totalSizeMinor !== 100) {
          rowOrColumn.forEach(function (cell) {
            if (_this8.mainAxis === 'columns') {
              cell.percentHeight = 100 * cell.percentHeight / totalSizeMinor;
            } else {
              cell.percentWidth = 100 * cell.percentWidth / totalSizeMinor;
            }
          });
        }
      });

      if (totalSizeMajor !== 100) {
        this.transformedLayout.forEach(function (rowOrColumn) {
          rowOrColumn.forEach(function (cell) {
            if (_this8.mainAxis === 'columns') {
              cell.percentWidth = 100 * cell.percentWidth / totalSizeMajor;
            } else {
              cell.percentHeight = 100 * cell.percentHeight / totalSizeMajor;
            }
          });
        });
      }
    },
    splitCell: function splitCell(layoutObj, orientation) {
      var _this9 = this;

      this._setTransitions(true);

      this.transformedLayout.forEach(function (rowOrColumn) {
        var index = _.indexOf(rowOrColumn, layoutObj);

        if (index !== -1) {
          var clone = angular.copy(layoutObj);

          if (orientation === 'h' && _this9.mainAxis === 'rows' || orientation === 'v' && _this9.mainAxis === 'columns') {
            var attr = orientation === 'h' ? 'percentWidth' : 'percentHeight';
            layoutObj[attr] /= 2;
            clone[attr] /= 2;
            rowOrColumn.splice(index + 1, 0, clone);
            clone.selectWidgetMode = true;
          } else {
            delete layoutObj.widget;
            layoutObj.subLayout = {};
            var axis = _this9.mainAxis === 'columns' ? 'rows' : 'columns';
            layoutObj.subLayout[axis] = [{
              size: '100%',
              cells: ['100% @' + clone.widget],
              new: true
            }];
          }
        }
      });
      this.megaRefresh();
    },
    megaRefresh: function megaRefresh() {
      var _this10 = this;

      this.updateFlatCells();
      this.normalizeSizes();
      this.updateCss();
      this.updateDragLines();
      this.loadTemplates().then(function () {
        _this10.$timeout(function () {
          return _this10.compileElements();
        });
      });
    },
    changeWidget: function changeWidget(layoutObj) {
      layoutObj.selectWidgetMode = !layoutObj.selectWidgetMode;
      this.updateCss();
    },
    onWidgetChange: function onWidgetChange(layoutObj) {
      layoutObj.selectWidgetMode = false;
      this.templatesLoaded = false;
      this.megaRefresh();
    },
    getWidgetName: function getWidgetName(key) {
      return this.widgets[key] ? this.widgets[key].name || key : '';
    },
    updateLayoutJSON: function updateLayoutJSON() {
      var _this11 = this;

      if (!this.transformedLayout) return;
      this.layoutJSON = {};
      this.layoutJSON.main = {};
      this.layoutJSON.main[this.mainAxis] = [];
      var subLayoutCounter = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var rowOrColumnObject = {};
        rowOrColumn.forEach(function (cell) {
          if (!rowOrColumnObject.size) rowOrColumnObject.size = cell[_this11.mainAxis === 'columns' ? 'percentWidth' : 'percentHeight'] + '%';
          if (!rowOrColumnObject.cells) rowOrColumnObject.cells = [];
          var cellString = '';
          cellString += cell[_this11.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] + '%';
          if (cell.widget && !cell.widget.startsWith('$')) cellString += ' @' + cell.widget;

          if (cell.$childLayout) {
            cell.$childLayout.updateLayoutJSON();
            var subName = 'sub' + subLayoutCounter;
            subLayoutCounter++;
            _this11.layoutJSON[subName] = cell.$childLayout.layoutJSON;
            cellString += ' #' + subName;
          }

          rowOrColumnObject.cells.push(cellString);
        });

        _this11.layoutJSON.main[_this11.mainAxis].push(rowOrColumnObject);
      });
    },
    getWidgetsCount: function getWidgetsCount() {
      return $('.widget-container').length;
    },
    _setTransitions: function _setTransitions(active) {
      if (active) {
        $('.widgets-padder .widget-wrapper').css('transition', "all ".concat(this.ANIM_DURATION, "s ease-out"));
      } else {
        $('.widgets-padder .widget-wrapper').css('transition', 'none');
      }
    },
    _getRootDirective: function _getRootDirective() {
      if (!this.options.parent) return this;else return this.options.parent._getRootDirective();
    },
    cleanLayout: function cleanLayout() {
      if (!this.transformedLayout) return; // Remove empty layout directives from parent

      if (!this.transformedLayout.length && this.options.parent) {
        var parentLayoutObj = _.find(this.options.parent.flatCells, {
          subLayout: this.layout
        });

        this.options.parent.removeWidget(parentLayoutObj);
      } // In case this directive is a sub and only has one widget in one cell, we move the widget to parent
      else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.options.parent) {
          var _parentLayoutObj = _.find(this.options.parent.flatCells, {
            subLayout: this.layout
          });

          var axis = keys_default()(_parentLayoutObj.subLayout)[0];

          if (!_parentLayoutObj.subLayout[axis][0] || _parentLayoutObj.subLayout[axis][0] && !_parentLayoutObj.subLayout[axis][0].new) {
            if (this.transformedLayout[0][0].widget) {
              _parentLayoutObj.widget = this.transformedLayout[0][0].widget;
              delete _parentLayoutObj.subLayout;
              delete _parentLayoutObj.$childLayout;
            } else if (this.transformedLayout[0][0].subLayout) {
              _parentLayoutObj.subLayout = this.transformedLayout[0][0].subLayout;
              delete _parentLayoutObj.widget;
            }
          }
        } // In case this directive is the root and only has one sub in one cell, we move the sub data to this
        else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.transformedLayout[0][0].subLayout && !this.options.parent) {
            console.log('pre', stringify_default()(this.layout));
            var theSub = this.transformedLayout[0][0].subLayout;
            this.layout = theSub;
            console.log('post', stringify_default()(this.layout));
            this.transformLayout();
            this.cleanLayout();
          }
    },
    expandPane: function expandPane(layoutObj) {
      var _this12 = this;

      var expanding = this.$expanded = !this.$expanded ? layoutObj : null;
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (cell) {
          if (expanding) {
            cell.dimBeforeExpansion = {
              width: cell.percentWidth,
              height: cell.percentHeight
            };

            if (cell === layoutObj) {
              cell.percentWidth = cell.percentHeight = 100;
            } else {
              _this12.cssRules[cell.cssId].opacity = 0;
              var onTheSameRowOrColumn = rowOrColumn.indexOf(layoutObj) !== -1;

              if (onTheSameRowOrColumn) {
                cell[_this12.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 0;
                cell[_this12.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 100;
              } else {
                cell[_this12.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 0;
                cell[_this12.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 100;
              }
            }
          } else {
            cell.percentWidth = cell.dimBeforeExpansion.width;
            cell.percentHeight = cell.dimBeforeExpansion.height;
            delete cell.dimBeforeExpansion;
          }
        });
      });

      if (expanding) {
        this.$timeout(function () {
          _this12.updateCss();
        }, this.ANIM_DURATION * 1000);
      } else {
        this.updateCss();
        this.$timeout(function () {
          _this12.transformedLayout.forEach(function (rowOrColumn) {
            rowOrColumn.forEach(function (cell) {
              _this12.cssRules[cell.cssId].opacity = 1;
            });
          });
        }, this.ANIM_DURATION * 1000);
      }

      if (this.options.parent && this.parentCell) {
        this.options.parent.expandPane(this.parentCell);
      }

      layoutObj.expanded = !layoutObj.expanded;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfWidgetsLayoutComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWidgetsLayoutComponentvue_type_script_lang_js_ = (JfWidgetsLayoutComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfWidgetsLayoutComponent/index.vue
var JfWidgetsLayoutComponent_render, JfWidgetsLayoutComponent_staticRenderFns




/* normalize component */

var JfWidgetsLayoutComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfWidgetsLayoutComponentvue_type_script_lang_js_,
  JfWidgetsLayoutComponent_render,
  JfWidgetsLayoutComponent_staticRenderFns,
  false,
  null,
  "92e4184e",
  null
  
)

/* harmony default export */ var JfWidgetsLayoutComponent = (JfWidgetsLayoutComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMultiDropdownComponent/index.vue?vue&type=template&id=724e1038&scoped=true&
var JfMultiDropdownComponentvue_type_template_id_724e1038_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-multi-dropdown",class:{'disabled':_vm.disabled,'with-text-inputs':_vm.textInputs,'borderless':_vm.borderless}},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label)+" "),(_vm.showLabelCounter && _vm.selectedItems().length)?_c('span',[_vm._v("("+_vm._s(_vm.selectedItems().length)+")")]):_vm._e()]):_vm._e(),_c('div',{staticClass:"main-box",class:{'selected-view' : _vm.selectedItems().length,
                    'no-items': !_vm.items.length && _vm.noItemsMessage,
                    'no-label': !_vm.label},on:{"click":function($event){return _vm.onClick()}}},[(_vm.showSelected && !_vm.selectedItems().length)?_c('span',[_vm._v(_vm._s(_vm.title))]):_vm._e(),(!_vm.showSelected)?_c('span',{staticClass:"title-wrapper"},[_vm._v("\n            "+_vm._s(_vm.title)+"\n            "),_c('span',{staticClass:"selected-counter"},[_vm._v("("+_vm._s(_vm.getSelectedCount())+")")])]):_vm._e(),(_vm.showSelected && _vm.selectedItems().length)?_c('span',[_vm._v("\n            "+_vm._s(_vm.getSelectedForTitle())+"\n        ")]):_vm._e(),_c('span',{staticClass:"actions"},[(_vm.showSelected && _vm.selectedItems().length)?_c('i',{staticClass:"clear-field",on:{"click":function($event){$event.stopPropagation();return _vm.unSelectAll()}}},[_vm._v("×")]):_vm._e(),_c('i',{staticClass:"icon-small-arrow-down"})])]),(_vm.opened)?_c('div',{staticClass:"drop-down-container"},[(!_vm.noFilter)?_c('div',{staticClass:"filter-container"},[_c('form',[_c('jf-field',{attrs:{"autofocus":true}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterText),expression:"filterText"}],staticClass:"input-text",attrs:{"type":"text","autocomplete":"off","name":"items-filter","placeholder":_vm.filterPlaceholder},domProps:{"value":(_vm.filterText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filterText=$event.target.value}}})])],1)]):_vm._e(),(_vm.items.length)?_c('div',{staticClass:"list-container"},_vm._l((_vm.$filterArray(_vm.items, {text: _vm.filterText})),function(item,$index){return _c('div',{staticClass:"drop-down-item",class:{'last-selected': $index === _vm.lastSelectedIndex && !_vm.filterText, 'disabled': item.disabled}},[(!_vm.singleSelection)?_c('label',{staticClass:"jf-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.isSelected),expression:"item.isSelected"}],attrs:{"type":"checkbox","disabled":item.disabled},domProps:{"checked":Array.isArray(item.isSelected)?_vm._i(item.isSelected,null)>-1:(item.isSelected)},on:{"change":[function($event){var $$a=item.isSelected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(item, "isSelected", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(item, "isSelected", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(item, "isSelected", $$c)}},function($event){return _vm.onSelection()}]}}),_c('span'),(item.iconClass)?_c('i',{staticClass:"item-icon",class:item.iconClass}):_vm._e(),_vm._v("\n                        "+_vm._s(item.text)+"\n                    ")]):_vm._e(),(_vm.singleSelection)?_c('jf-radio-button',{key:item.isSelected,attrs:{"text":item.text}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.singleSelectionIndex),expression:"singleSelectionIndex"}],attrs:{"type":"radio","disabled":item.disabled},domProps:{"value":item.$id,"checked":_vm._q(_vm.singleSelectionIndex,item.$id)},on:{"change":[function($event){_vm.singleSelectionIndex=item.$id},function($event){return _vm.onSingleSelection()}]}})]):_vm._e(),(_vm.textInputs)?_c('span',{staticClass:"text-input-wrapper"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.inputTextValue),expression:"item.inputTextValue"}],staticClass:"input-text",attrs:{"type":"text","name":"items-filter","placeholder":item.inputPlaceholder || 'Free text'},domProps:{"value":(item.inputTextValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "inputTextValue", $event.target.value)}}})]):_vm._e()],1)}),0):_vm._e(),(_vm.items.length)?_c('div',{staticClass:"batch-action-buttons"},[_c('button',{staticClass:"btn btn-default pull-right",attrs:{"type":"button"},on:{"click":function($event){return _vm.clearSelection()}}},[_vm._v("\n                    "+_vm._s(_vm.singleSelection ? 'Clear selection' : 'Clear All')+"\n                ")]),(!_vm.singleSelection)?_c('button',{staticClass:"btn btn-default pull-right",attrs:{"type":"button"},on:{"click":function($event){return _vm.selectAll()}}},[_vm._v("\n                    Select All\n                ")]):_vm._e()]):_vm._e(),(!_vm.items.length && _vm.noItemsMessage)?_c('div',{staticClass:"list-container"},[_c('div',{staticClass:"no-items-message"},[_vm._v("\n                    "+_vm._s(_vm.noItemsMessage)+"\n                ")])]):_vm._e()]):_vm._e()])])}
var JfMultiDropdownComponentvue_type_template_id_724e1038_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue?vue&type=template&id=724e1038&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMultiDropdownComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfMultiDropdownComponentvue_type_script_lang_js_ = ({
  name: 'jf-multi-dropdown',
  props: ['title', 'label', 'filterPlaceholder', 'noItemsMessage', 'items', 'disabled', 'noSort', 'dropdownOpened', 'showSelected', 'showLabelCounter', 'noFilter', 'noSelectedFirst', 'singleSelection', 'textInputs', 'borderless'],
  'jf@inject': ['$scope', '$filter', '$element'],
  data: function data() {
    return {
      opened: null,
      filterText: null,
      lastSelectedIndex: null,
      singleSelectionIndex: -1
    };
  },
  created: function created() {
    var _this = this;

    this.filter = this.$filterArray;
    this.opened = false;
    this.$scope.$watch('jfMultiDropdown.items', function (newVal, oldVal) {
      if (newVal) {
        //this.sortItems();
        if (_this.singleSelection) {
          _this.items.forEach(function (item, index) {
            return item.$id = index;
          });

          var disabled = _.filter(_this.items, function (item) {
            return item.disabled;
          });

          disabled.forEach(function (item) {
            return item.isSelected = false;
          });

          var selected = _.filter(_this.items, function (item) {
            return item.isSelected;
          });

          if (selected.length > 1) {
            selected.slice(1).forEach(function (item) {
              return item.isSelected = false;
            });
          }

          if (selected.length) {
            _this.singleSelectionIndex = selected[0].$id;
          }
        }
      }
    });
    this.$scope.$watch('jfMultiDropdown.dropdownOpened', function (val) {
      if (val === true) {
        if (!_this.items) {
          return;
        }

        _this.opened = true;
        _this.filterText = '';
      } else if (val === false) {
        _this.opened = false;
        _this.filterText = '';
      } else {}
    });
  },
  mounted: function mounted() {
    this.handleOutsideClick();
  },
  ng1_legacy: {
    'controllerAs': 'jfMultiDropdown'
  },
  methods: {
    sendOpenStateChange: function sendOpenStateChange() {
      this.$emit('on-open-state-change', {
        opened: this.opened
      });

      if (!this.opened && !this.singleSelection) {//                    this.sortItems();
      }
    },
    handleOutsideClick: function handleOutsideClick() {
      var _this2 = this;

      var handler = function handler(e) {
        var outside = !$(e.target).parents('.jf-multi-dropdown').length || $(e.target).parents('.jf-multi-dropdown')[0] !== $(_this2.$element).find('.jf-multi-dropdown')[0];

        if (outside) {
          var changed = !!_this2.opened;
          _this2.opened = false;

          if (changed) {
            _this2.sendOpenStateChange();
          }
        }
      };

      $(document).on('click', handler);
      this.$scope.$on('$destroy', function () {
        $(document).off('click', handler);
      });
    },
    getSelectedForTitle: function getSelectedForTitle() {
      var selected = _.filter(this.items, function (item) {
        return item.isSelected;
      });

      selected = _.map(selected, function (s) {
        return s.selectedText || s.text;
      });
      return selected.join(', ');
    },
    onClick: function onClick() {
      if (this.disabled !== true) {
        if (!this.items) {
          return;
        }

        this.opened = !this.opened;
        this.sendOpenStateChange();
        this.filterText = '';
      }
    },
    onSingleSelection: function onSingleSelection() {
      var _this3 = this;

      Vue.nextTick(function () {
        _this3.items.forEach(function (item, index) {
          if (!item.disabled) {
            item.isSelected = false;
          }
        });

        var selected = _.find(_this3.items, function (item) {
          return item.$id == _this3.singleSelectionIndex;
        });

        selected.isSelected = true;

        _this3.applyChanges();
      });
    },
    getSelectedCount: function getSelectedCount() {
      var selected = _.filter(this.items, function (item) {
        return item.isSelected && !item.isAllToggleCheckbox;
      });

      return selected.length;
    },
    applyChanges: function applyChanges() {
      var _this4 = this;

      Vue.nextTick(function () {
        var selected = _.filter(_this4.items, function (item) {
          return item.isSelected;
        });

        _this4.$emit('on-change', selected);

        _this4.$forceUpdate();
      });
    },
    selectedItems: function selectedItems() {
      var selected = _.filter(this.items, function (item) {
        return item.isSelected;
      });

      selected = _.map(selected, 'text');
      return selected;
    },
    sortItems: function sortItems() {
      if (this.opened) return;

      if (this.noSelectedFirst) {
        return;
      }

      if (!this.items) {
        return;
      }

      var selected = this.noSort ? _.filter(this.items, function (item) {
        return item.isSelected;
      }) : _.sortBy(_.filter(this.items, function (item) {
        return item.isSelected;
      }), 'text');
      var unSelected = this.noSort ? _.filter(this.items, function (item) {
        return !item.isSelected;
      }) : _.sortBy(_.filter(this.items, function (item) {
        return !item.isSelected;
      }), 'text');
      this.lastSelectedIndex = selected.length - 1;
      var combined = selected.concat(unSelected);
      this.items.splice.apply(this.items, [0, this.items.length].concat(combined));
    },
    selectAll: function selectAll() {
      if (this.disabled) return;
      this.filter(this.items, this.filterText).forEach(function (item) {
        if (!item.disabled) {
          item.isSelected = true;
        }
      });
      this.applyChanges();
    },
    unSelectAll: function unSelectAll() {
      if (this.disabled) return;
      this.filter(this.items, this.filterText).forEach(function (item) {
        if (!item.disabled) {
          item.isSelected = false;
        }
      });
      this.applyChanges();
      this.singleSelectionIndex = -1;
    },
    onSelection: function onSelection() {
      this.applyChanges();
    },
    clearSelection: function clearSelection() {
      if (this.disabled) return;

      if (this.textInputs) {
        _.forEach(this.items, function (item) {
          item.inputTextValue = '';
        });
      }

      this.unSelectAll();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfMultiDropdownComponentvue_type_script_lang_js_ = (JfMultiDropdownComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue





/* normalize component */

var JfMultiDropdownComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfMultiDropdownComponentvue_type_script_lang_js_,
  JfMultiDropdownComponentvue_type_template_id_724e1038_scoped_true_render,
  JfMultiDropdownComponentvue_type_template_id_724e1038_scoped_true_staticRenderFns,
  false,
  null,
  "724e1038",
  null
  
)

/* harmony default export */ var JfMultiDropdownComponent = (JfMultiDropdownComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSidebarComponent/index.vue?vue&type=template&id=334f9b6b&scoped=true&
var JfSidebarComponentvue_type_template_id_334f9b6b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{style:(_vm.menu),attrs:{"id":"jf-main-nav"},on:{"mouseleave":function($event){return _vm.mouseLeaveMenu($event)},"mouseover":function($event){return _vm.mouseOverMenu()}}},[_c('span',{staticClass:"pin-menu",on:{"click":function($event){return _vm.pinMenu()}}},[_c('i',{staticClass:"icon-menu-arrow",class:{'menu-arrow-close' : _vm.pinMenuStatus}})]),_c('ul',{staticClass:"sidebar-wrapper-inner",on:{"click":function($event){return _vm.closeSubMenu(0,true,true)}}},_vm._l((_vm.menuItems),function(item){return (!item.isHidden)?_c('li',{class:{disabled: item.isDisabled, active: (item.stateParent | _vm.includedByState) || _vm.isCurrentItem(item) || _vm.highLightOnState(item.stateRelated), 'icon-arrow-left':item.children },attrs:{"jf-disable-feature":item.feature},on:{"click":function($event){$event.stopPropagation(); _vm.itemClick(item)}}},[(item.isDisabled)?_c('a',{staticClass:"menu-item disabled",class:item.customClasses,attrs:{"id":item.id}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(!item.isDisabled && !item.children && !item.template)?_c('a',{staticClass:"menu-item",class:item.customClasses,attrs:{"id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverSimpleItem(item)}}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(!item.isDisabled && !item.children && item.template)?_c('a',{directives:[{name:"jf-dynamic-template",rawName:"v-jf-dynamic-template",value:('item.template'),expression:"'item.template'"}],staticClass:"menu-item",class:item.customClasses,attrs:{"id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverSimpleItem(item)}}}):_vm._e(),(!item.isDisabled && item.children)?_c('a',{staticClass:"menu-item extended-item",attrs:{"href":"","id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverExtendedItem(item)},"mouseleave":function($event){return _vm.onMouseLeaveExtendedItem(item)}}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(item.children && !item.isDisabled)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.openSub === item),expression:"openSub === item"}],staticClass:"sub-menu",on:{"mouseover":function($event){return _vm.subMenuOver()},"click":function($event){return $event.stopPropagation()}}},[(_vm.noSearchBox === undefined && !_vm.openSub.noSearchBox)?_c('div',{staticClass:"searchbox-wrapper"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.menuSearchQuery),expression:"menuSearchQuery"}],staticClass:"input-text",attrs:{"type":"text","id":"menuSearchQuery","placeholder":"Filter Menu...","autocomplete":"off","jf-enter-press":"chooseSingleChoice()"},domProps:{"value":(_vm.menuSearchQuery)},on:{"focus":function($event){return _vm.openSubMenu()},"input":[function($event){if($event.target.composing){ return; }_vm.menuSearchQuery=$event.target.value},function($event){return _vm.checkForSingleChoice()}],"keydown":function($event){return _vm.navigateInMenu($event)}}}),_c('span',{staticClass:"clear-input",class:{'disabled': !_vm.menuSearchQuery},on:{"click":function($event){_vm.menuSearchQuery = ''}}},[_vm._v("×")])]):_vm._e(),_c('div',{staticClass:"masonry",class:{'no-search-box': _vm.noSearchBox !== undefined || _vm.openSub.noSearchBox},attrs:{"tabindex":"-1"}},[_c('div',_vm._l((_vm.subMenuItems),function(item){return (!item.isHidden)?_c('div',{staticClass:"section"},[_c('h3',[_vm._v(_vm._s(item.label))]),_vm._l((item.subItems),function(subItem){return (!subItem.isHidden)?_c('span',{attrs:{"jf-disable-feature":subItem.feature}},[(subItem.isDisabled)?_c('a',{class:{'blocked': subItem.isDisabled}},[_vm._v("\n                                    "+_vm._s(subItem.label)+"\n                                ")]):_vm._e(),_c('router-link',{attrs:{"to":{name: ' subItem.state  ({{ subItem.stateParams }})'}}},[(!subItem.isDisabled)?_c('a',{class:{'highlight' : _vm.searchHighlightCheck(subItem.label),
                                              'not-active' : !_vm.searchHighlightCheck(subItem.label) && _vm.menuSearchQuery.length,
                                              'current' : _vm.isCurrentItem(subItem)},attrs:{"data-state":subItem.state,"data-params":subItem.stateParams,"id":'item-' + subItem.id},on:{"click":function($event){$event.preventDefault();return _vm.subMenuItemClick(subItem)},"keydown":function($event){return _vm.navigateInMenu($event)}}},[_vm._v("\n                                    "+_vm._s(subItem.label)+"\n                                ")]):_vm._e()])],1):_vm._e()})],2):_vm._e()}),0)])]):_vm._e()]):_vm._e()}),0),(_vm.footerTemplate)?_c('ng2vue-include',{attrs:{"src":"footerTemplate"}}):_vm._e(),(_vm.footerTemplateHtml)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.footerTemplateHtml)}}):_vm._e()],1)])}
var JfSidebarComponentvue_type_template_id_334f9b6b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=template&id=334f9b6b&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSidebarComponent/index.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSidebarComponentvue_type_script_lang_js_ = ({
  name: 'jf-sidebar',
  props: ['driver', 'footerTemplate', 'menuItems', 'openAdminSize', 'defaultSubMenuWidth', 'noSearchBox', 'defaultSubMenuId'],
  'jf@inject': ['$scope', '$state', '$timeout', '$interval', '$window', '$rootScope', 'JFrogEventBus'],
  data: function data() {
    return {
      menu: {
        'transition-duration': '.3s'
      },
      pinMenuStatus: true,
      openSub: {
        noSearchBox: null
      },
      menuSearchQuery: '',
      subMenuItems: null,
      footerTemplateHtml: '<div class="img-wrapper"><img  src="/images/jfrog.svg" alt=""></div>'
    };
  },
  created: function created() {
    console.log("CREATED!±!#@@!#@!#@!#@!#!@WQ");
    this.trim = _.trim;
    this.currentTab = 'Home';
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.pinMenuStatus = JSON.parse(localStorage.pinMenu || 'false');
    this.currentFocus = $(':focus');
    this.skip = false;
    this.$scope.$on('$destroy', function () {
      $('body').off('keydown');
    });
  },
  mounted: function mounted() {
    var _this = this;

    console.log("MOUNTED!±!#@@!#@!#@!#@!#!@WQ");
    this.subMenuWidth = this.defaultSubMenuWidth || this.openAdminSize || '900px';
    this.defaultSubWidth = this.subMenuWidth;
    this.defaultSubMenuId = this.defaultSubMenuId || 'admin';

    if (!this.driver) {
      console.error('jf-sidebar: No driver is provided');
      this.driver = {};
    }

    this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];

    if (this.driver.setMenu) {
      this.driver.setMenu(this);
    }

    if (this.driver.registerEvents) {
      this.driver.registerEvents();
    }

    this.refreshMenu();

    if (this.driver.getFooterData) {
      this.driver.getFooterData().then(function (footerData) {
        return _this.footerData = footerData;
      });
    }

    this.initSideBar();
    this.$forceUpdate();
  },
  ng1_legacy: {
    'controllerAs': 'jfSidebar'
  },
  methods: {
    initSideBar: function initSideBar() {
      var _this2 = this;

      this.pinMenuStatus ? this.$set(this.menu, 'width', '200px') : this.$set(this.menu, 'width', '55px');
      this.pinMenuStatus ? this.$set(this.menu, 'transitionDelay', '.2s') : this.$set(this.menu, 'transitionDelay', '.3s');
      this.$timeout(function () {
        return _this2._trackResize();
      });
      $('body').on('keydown', function (e) {
        if (_this2.driver.onKeyDown) {
          _this2.driver.onKeyDown(e);
        } // Ctrl + right arrow to open the default sub menu


        if (e.keyCode === 39 && e.ctrlKey && e.altKey && $('.sub-menu').length) {
          _this2.$timeout(function () {
            var defaultItem = _.find(_this2.menuItems, {
              id: _this2.defaultSubMenuId
            });

            if (defaultItem) {
              _this2._setExtendedMenu(defaultItem);
            }

            _this2.openSubMenu();
          });

          e.preventDefault();
        } // ESC click or Ctrl+left to close default sub menu


        if ((e.keyCode === 27 || e.keyCode === 37 && e.ctrlKey && e.altKey) && _this2.menu.width === _this2.subMenuWidth && $('.sub-menu').length > 0) {
          _this2.$timeout(function () {
            _this2.menuSearchQuery = '';
            $('#menuSearchQuery').blur();

            _this2.$set(_this2.menu, 'width', _this2.defaultWidth());

            _this2._updateTabIndex();
          });

          e.preventDefault();
        }
      });
    },
    isCollapsed: function isCollapsed() {
      return this.menu.width === '55px';
    },
    mouseOverMenu: function mouseOverMenu() {
      var _this3 = this;

      if (this.mouseIsOver) {
        return;
      }

      this.mouseIsOver = true;

      if (this.menu.width === this.subMenuWidth && $('.menu-item:hover').length && $('a.menu-item.extended-item:hover').length < 1) {
        if (_.isUndefined(this.closeSubMenuDelay) && !$('.sub-menu:hover').length) {
          this.closeSubMenuDelay = this.$timeout(function () {
            _this3.closeSubMenu();

            delete _this3.closeSubMenuDelay;
          }, 300);
        }
      } else if (this.menu.width != '200px' && !$('.pin-menu:hover').length && $('.sub-menu:hover').length < 1) {
        // if menu isn't open
        if (_.isUndefined(this.openMenu)) {
          this.openMenu = this.$timeout(function () {
            var widthToOpen = $('.sub-menu').length > 0 && $('a.menu-item.extended-item:hover').length ? _this3.subMenuWidth : '200px';

            if (($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length) && !_.isUndefined(_this3.openMenu)) {
              _this3.$timeout.cancel(_this3.openMenu);

              delete _this3.openMenu;
              return;
            }

            _this3._updateMenuObject(widthToOpen, '.3s', '0s');
          }, 2000);
        }
      }
    },
    mouseLeaveMenu: function mouseLeaveMenu(e) {
      if (e && e.toElement) {
        if ($(e.toElement).hasClass('tooltipster-content') || $(e.toElement.parentElement).hasClass('tooltipster-arrow')) {
          return;
        }
      }

      this.mouseIsOver = false;

      if (this.menu.width != this.subMenuWidth) {
        // if sub menu menu isn't open
        this._updateMenuObject(this.defaultWidth(), '.3s');
      }

      this.closeSubMenu();

      this._openMenuStop();

      this._subMenuDelayStop();
    },
    subMenuOver: function subMenuOver() {
      if (!_.isUndefined(this.subMenuItemDelayTimer)) {
        this.$timeout.cancel(this.subMenuItemDelayTimer);
        delete this.subMenuItemDelayTimer;
      }

      if (!_.isUndefined(this.closeSubMenuDelay)) {
        this.$timeout.cancel(this.closeSubMenuDelay);
        delete this.closeSubMenuDelay;
      }
    },
    _updateMenuObject: function _updateMenuObject(width) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0s';
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0s';
      this.menu = {
        'width': width,
        'transition-duration': duration,
        'transition-delay': delay
      };
    },
    isCurrentTab: function isCurrentTab(tab) {
      return this.currentTab === tab.label;
    },
    setCurrentTab: function setCurrentTab(tab) {
      this.currentTab === tab.label ? this.currentTab = '' : this.currentTab = tab.label;
    },
    refreshMenu: function refreshMenu() {
      console.log("******* PUSGIN ITEMS!!!!", this._getMenuItems());
      this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
    },
    goToState: function goToState(item) {
      if (this.driver.onBeforeStateSwitch) {
        this.driver.onBeforeStateSwitch(item);
      }

      this.$state.go(item.state, item.stateParams);
    },
    _getMenuItems: function _getMenuItems() {
      return this.driver.getMenuItems ? this.driver.getMenuItems() : [];
    },
    defaultWidth: function defaultWidth() {
      return this.pinMenuStatus ? '200px' : '55px';
    },
    pinMenu: function pinMenu() {
      this.pinMenuStatus = !this.pinMenuStatus;
      console.log('Pinning!', this.pinMenuStatus);
      localStorage.pinMenu = this.pinMenuStatus;

      if (!_.isUndefined(this.openMenu)) {
        this._openMenuStop();
      }

      this.$set(this.menu, 'transitionDelay', '0s');
      this.$set(this.menu, 'width', this.defaultWidth()); //if (!this.pinMenuStatus) {
      //    // close menu - [block screen?]
      //}

      this._trackResize();
    },
    _trackResize: function _trackResize() {
      var _this4 = this;

      if (this.trackResizeInterval) {
        this.$interval.cancel(this.trackResizeInterval);
      }

      var origWidth = parse_int_default()($('#jf-content').css('width'));

      var lastWidth = origWidth;
      var noChangeLoops = 0;
      var resizeEvent = document.createEvent('Event');
      resizeEvent.initEvent('resize', false, true);
      this.trackResizeInterval = this.$interval(function () {
        var currWidth = parse_int_default()($('#jf-content').css('width'));

        if (currWidth === lastWidth) {
          noChangeLoops++;
        } else {
          noChangeLoops = 0;
        }

        if (noChangeLoops >= 20) {
          _this4.$interval.cancel(_this4.trackResizeInterval);

          delete _this4.trackResizeInterval;
        }

        lastWidth = currWidth;

        _this4.$timeout(function () {
          try {
            window.dispatchEvent(new Event('resize'));
          } catch (e) {
            window.dispatchEvent(resizeEvent);
          }

          _this4.JFrogEventBus.dispatch(_this4.EVENTS.SIDEBAR_SIZE_CHANGE);
        });
      }, 1);
    },
    itemClick: function itemClick(item) {
      var _this5 = this;

      if (this.subMenuCloseDelay) {
        this.$timeout.cancel(this.subMenuCloseDelay);
        delete this.subMenuCloseDelay;
      }

      if (!item.children) {
        //            delete this.openSub;
        this.closeSubMenu(0, true);

        if (this.menu.width === '55px' || this.menu.width === '200px') {
          this._openMenuStop();

          this._subMenuDelayStop();
        }

        if (!item.isDisabled) {
          this.$timeout(function () {
            return _this5.goToState(item);
          }, 20);
        }
      } else if (item.children) {
        if (!this.isSubMenuOpen()) {
          this._setExtendedMenu(item);

          this.openSubMenu();
        } else {
          this.closeSubMenu(0, true, true);

          this._subMenuDelayStop();

          if (this.openSub !== item) {
            this.$timeout(function () {
              _this5.itemClick(item);
            }, 500);
          }
        }
      }
    },
    _setExtendedMenu: function _setExtendedMenu(item) {
      if (!item) {
        return;
      }

      if (item.children === true && this.legacyAdminMenuItems) {
        //backward compatibility for single extended ('admin') menu
        this.subMenuItems = this.legacyAdminMenuItems;
        this.subMenuWidth = this.defaultSubWidth;
        this.openSub = item;
      } else if (item.children) {
        this.subMenuItems = item.children;
        this.subMenuWidth = item.subMenuWidth || this.defaultSubWidth;
        this.openSub = item;
      }
    },
    openSubMenu: function openSubMenu() {
      var _this6 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.subMenuCloseDelay) {
        this.$timeout.cancel(this.subMenuCloseDelay);
        delete this.subMenuCloseDelay;
      }

      if ($('.sub-menu').length > 0) {
        this._openMenuStop();

        this._subMenuDelayStop();

        if ($(':focus').length && $(':focus')[0].id != 'admin' && $(':focus')[0].id != 'menuSearchQuery') {
          this.currentFocus = $(':focus');
        }

        if (delay && _.isUndefined(this.subMenuDelay)) {
          this.subMenuDelay = this.$timeout(function () {
            _this6.openSubMenu();

            _this6._setSubMenuFocus();

            _this6._subMenuDelayStop();

            return;
          }, 2000);
        } else {
          if (!this.skip && this.menu.width !== this.subMenuWidth) {
            this._updateMenuObject('50px', '0.3s', '0s');

            this.$timeout(function () {
              return _this6._setSubMenuFocus();
            });

            if (!_.isUndefined(this.subMenuDelay)) {
              this._subMenuDelayStop();
            }
          }
        }

        this._updateTabIndex();
      }
    },
    onMouseOverSimpleItem: function onMouseOverSimpleItem(item) {
      this.closeSubMenu(1800, true, true);
    },
    onMouseOverExtendedItem: function onMouseOverExtendedItem(item) {
      var _this7 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.isSubMenuOpen()) {
        this._setExtendedMenu(item);

        this.openSubMenu(delay);
      } else {
        if (this.openSub !== item) {
          this.closeSubMenu(0, true, true);

          this._subMenuDelayStop();

          this.$timeout(function () {
            _this7.onMouseOverExtendedItem(item, false);
          }, 500);
        } else {
          this.openSubMenu(true);
        }
      }
    },
    onMouseLeaveExtendedItem: function onMouseLeaveExtendedItem(e) {
      this._subMenuDelayStop();

      this.subMenuItemDelay = true;
      this.closeSubMenu(1800, true, true);
    },
    isSubMenuOpen: function isSubMenuOpen() {
      return $('#jf-main-nav').css('width') === this.subMenuWidth;
    },
    clickOffMenu: function clickOffMenu() {
      if ($('.sub-menu').length > 0 && !$('.menu-item:hover').length && (this.menu.width != '55px' || !this.pinMenuStatus && this.menu.width != '200px')) {
        // TODO: Fix this rule. shuldn't happen if menu is 55px or 200 with pinned on
        if (this.menu.width != '55px' && !$('.sub-menu:hover').length) {
          this._updateMenuObject(this.defaultWidth(), '.3s');

          this.menuSearchQuery = '';

          this._updateTabIndex();
        }
      }
    },
    closeSubMenu: function closeSubMenu(delay) {
      var _this8 = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var expand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (delay) {
        if (this.subMenuCloseDelay) {
          this.$timeout.cancel(this.subMenuCloseDelay);
          delete this.subMenuCloseDelay;
        }

        this.subMenuCloseDelay = this.$timeout(function () {
          if (_this8.subMenuCloseDelay) {
            _this8.$timeout.cancel(_this8.subMenuCloseDelay);

            delete _this8.subMenuCloseDelay;
          }

          _this8.closeSubMenu(0, force, expand);
        }, delay);
        return;
      }

      if (!force && ($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length || $('.sub-menu').find('a').is(':focus') || $('#menuSearchQuery').is(':focus') && $('#menuSearchQuery').val().length > 0)) {
        return;
      } else if (this.subMenuItemDelay) {
        this.subMenuItemDelayTimer = this.$timeout(function () {
          _this8.subMenuItemDelay = false;
          delete _this8.subMenuItemDelayTimer;

          if (!$('.sub-menu:hover').length && !$('.tooltipster-content:hover').length && !$('.tooltipster-arrow:hover').length) {
            _this8.closeSubMenu(delay, force, expand);
          }
        }, 100);
        return;
      } else {
        if (expand && $('#jf-main-nav:hover').length) {
          this.$set(this.menu, 'width', '200px');
        } else {
          this.$set(this.menu, 'width', this.defaultWidth());
        }

        if (this.currentFocus.length) {
          this.currentFocus[0].focus();
        }

        $('#menuSearchQuery').blur();
        $('.masonry').scrollTop(0);
        this.menuSearchQuery = '';

        this._updateTabIndex();
      }
    },
    _openMenuStop: function _openMenuStop() {
      this.$timeout.cancel(this.openMenu);
      delete this.openMenu;
    },
    _subMenuDelayStop: function _subMenuDelayStop() {
      this.$timeout.cancel(this.subMenuDelay);
      delete this.subMenuDelay;
    },
    _setSubMenuFocus: function _setSubMenuFocus() {
      if (!$('.sub-menu:hover').length) {
        $('#menuSearchQuery').focus();
        $('#jf-main-nav').scrollLeft(0);
      }
    },
    _updateTabIndex: function _updateTabIndex() {
      if (this.menu.width != this.subMenuWidth) {
        $('.sub-menu').find('a,input').attr('tabindex', -1);
        $('.sub-menu').find('a,input').blur();
      } else {
        var highlighted = $('.sub-menu').find('a.highlight');

        if (highlighted.length) {
          $('.sub-menu').find('input').removeAttr('tabindex');
          $('.sub-menu').find('a.highlight').removeAttr('tabindex');
          $('.sub-menu').find('a:not(.highlight)').attr('tabindex', -1);
        } else {
          $('.sub-menu').find('a,input').removeAttr('tabindex');
        }
      }

      $('#jf-main-nav').scrollLeft(0);
    },
    searchHighlightCheck: function searchHighlightCheck(menuItem) {
      if (this.menuSearchQuery) {
        var string = menuItem.toLowerCase().replace(/ /g, '');
        var searchstring = this.menuSearchQuery.toLowerCase().replace(/ /g, '');

        if (_.includes(string, searchstring)) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkForSingleChoice: function checkForSingleChoice() {
      $('#jf-main-nav').scrollLeft(0);
      this.$timeout(function () {
        $('.single-choice').removeClass('single-choice');
        var elem = $('.masonry').find('.highlight');

        if (elem.length == 1) {
          elem.addClass('single-choice');
        }
      }, 50);
    },
    chooseSingleChoice: function chooseSingleChoice() {
      var elem = $('.single-choice');

      if (elem.length) {
        if (this.driver.onBeforeStateSwitch) {
          this.driver.onBeforeStateSwitch({
            state: elem.data('state'),
            stateParams: elem.data('params')
          });
        }

        this.$state.go(elem.data('state'), elem.data('params'));
        this.menuSearchQuery = '';

        this._updateMenuObject(this.defaultWidth(), '.3s');

        this._updateTabIndex();
      } else {
        return false;
      }
    },
    subMenuItemClick: function subMenuItemClick(subItem) {
      var _this9 = this;

      this.menuSearchQuery = '';

      this._updateMenuObject(this.defaultWidth(), '.3s');

      this._updateTabIndex();

      this.skip = true;
      this.$timeout(function () {
        _this9.skip = false;
      }, 400);

      if (this.driver.onBeforeStateSwitch) {
        this.driver.onBeforeStateSwitch(subItem);
      }

      this.$state.go(subItem.state, subItem.stateParams);
    },
    navigateInMenu: function navigateInMenu(e) {
      var key = e.keyCode;
      var $allHighlighted = $('.sub-menu').find('.highlight');
      var $allFocusableItems = $('.sub-menu').find('a:focusable');

      switch (key) {
        case 38:
          // UP
          if ($(e.currentTarget).is(':input')) {
            return;
          }

          if (!$('.highlight').length) {
            if (!$allFocusableItems.length) {
              // if no available choices at all (not-active) return
              return;
            } else {
              $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) - 1).focus();
            }
          } else {
            // if highlighted
            $allHighlighted.eq($.inArray($('.highlight:focus')[0], $allHighlighted) - 1).focus();
          }

          break;

        case 40:
          // DOWN
          if ($(e.currentTarget).is(':input')) {
            if ($allHighlighted.length) {
              $allHighlighted[0].focus();
            } else {
              $('.sub-menu').find('a').first(':focusable').focus();
            }
          } else {
            if (!$('.highlight').length) {
              if (!$allFocusableItems.length) {
                // if no available choices at all (not-active) return
                return;
              } else if ($.inArray($(':focus')[0], $allFocusableItems) === $allFocusableItems.length - 1) {
                // if last item go to first item
                $allFocusableItems[0].focus();
              } else {
                $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) + 1).focus();
              }
            } else {
              // if highlighted
              if ($.inArray($('.highlight:focus')[0], $allHighlighted) === $allHighlighted.length - 1) {
                $allHighlighted[0].focus();
              } else {
                $allHighlighted.eq($.inArray($('.highlight:focus')[0], $allHighlighted) + 1).focus();
              }
            }
          }

          break;

        case 8:
          //Backspace
          if (this.focusedElement && !$('#menuSearchQuery').is(':focus')) {
            e.preventDefault();
            return;
          }

          break;
      }
    },
    isCurrentItem: function isCurrentItem(subItem) {
      var result = _.includes(this.$state.current.name, subItem.state);

      if (result && subItem.stateParams) {
        var relevantParams = _.pick(this.$state.params, keys_default()(subItem.stateParams));

        result = _.isEqual(relevantParams, subItem.stateParams);
      }

      return result;
    },
    highLightOnState: function highLightOnState(statesArr) {
      if (!statesArr) {
        return false;
      }

      var currentStateName = this.$state.current.name;
      return statesArr.indexOf(currentStateName) > -1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSidebarComponentvue_type_script_lang_js_ = (JfSidebarComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=style&index=0&id=334f9b6b&scoped=true&lang=less&
var JfSidebarComponentvue_type_style_index_0_id_334f9b6b_scoped_true_lang_less_ = __webpack_require__("8def");

// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue






/* normalize component */

var JfSidebarComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfSidebarComponentvue_type_script_lang_js_,
  JfSidebarComponentvue_type_template_id_334f9b6b_scoped_true_render,
  JfSidebarComponentvue_type_template_id_334f9b6b_scoped_true_staticRenderFns,
  false,
  null,
  "334f9b6b",
  null
  
)

/* harmony default export */ var JfSidebarComponent = (JfSidebarComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfClipCopyComponent/index.vue?vue&type=template&id=1e255658&scoped=true&
var JfClipCopyComponentvue_type_template_id_1e255658_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"clip-copy-button"},[_c('a',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.tooltipText),expression:"tooltipText",modifiers:{"bind":true}}],staticClass:"copy-to-clip icon icon-copy-to-clipboard-2",attrs:{"id":_vm.copyIconId},on:{"click":_vm.doCopy}})])}
var JfClipCopyComponentvue_type_template_id_1e255658_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfClipCopyComponent/index.vue?vue&type=template&id=1e255658&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfClipCopyComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
var TOOLTIP_DEFAULT_TEXT = 'Copy to clipboard';
var DEFAULT_FEEDBACK_DELAY = 4000;
/* harmony default export */ var JfClipCopyComponentvue_type_script_lang_js_ = ({
  name: 'jf-clip-copy',
  'jf@inject': ['$timeout'],
  props: ['textToCopy', 'objectName', 'keepTooltipLetterCase'],
  data: function data() {
    return {
      origTooltip: '',
      tooltipText: TOOLTIP_DEFAULT_TEXT,
      showTooltip: false,
      FEEDBACK_DELAY: DEFAULT_FEEDBACK_DELAY,
      timeoutPromise: null
    };
  },
  computed: {
    copyIconId: function copyIconId() {
      return "copy-icon-".concat(this._uid);
    }
  },
  mounted: function mounted() {
    if (this.objectName) {
      this.origTooltip = this.tooltipText = "Copy ".concat(this.keepTooltipLetterCase ? this.objectName : this.objectName.toLowerCase(), " to clipboard");
    } else {
      this.origTooltip = this.tooltipText = 'Copy to clipboard';
    }
  },
  methods: {
    doCopy: function doCopy() {
      this.$copyText(this.textToCopy).then(this.onSuccessfulCopy()).catch(function (e) {
        console.log(e);
      });
    },
    onSuccessfulCopy: function onSuccessfulCopy() {
      var _this = this;

      if (!this.textToCopy) {
        return;
      }

      if (this.timeoutPromise) {
        this.$timeout.cancel(this.timeoutPromise);
        this.timeoutPromise = null;
      }

      this.tooltipText = this.objectName ? this.objectName.charAt(0).toUpperCase() + this.objectName.substr(1) + ' copied to clipboard' : 'Value copied to clipboard';
      this.timeoutPromise = this.$timeout(function () {
        _this.tooltipText = _this.origTooltip;
      }, this.FEEDBACK_DELAY);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfClipCopyComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfClipCopyComponentvue_type_script_lang_js_ = (JfClipCopyComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfClipCopyComponent/index.vue?vue&type=style&index=0&id=1e255658&scoped=true&lang=less&
var JfClipCopyComponentvue_type_style_index_0_id_1e255658_scoped_true_lang_less_ = __webpack_require__("e13f");

// CONCATENATED MODULE: ./src/components/JfClipCopyComponent/index.vue






/* normalize component */

var JfClipCopyComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfClipCopyComponentvue_type_script_lang_js_,
  JfClipCopyComponentvue_type_template_id_1e255658_scoped_true_render,
  JfClipCopyComponentvue_type_template_id_1e255658_scoped_true_staticRenderFns,
  false,
  null,
  "1e255658",
  null
  
)

/* harmony default export */ var JfClipCopyComponent = (JfClipCopyComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfEnterPressComponent/index.vue?vue&type=template&id=36ead2c6&scoped=true&
var JfEnterPressComponentvue_type_template_id_36ead2c6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
var JfEnterPressComponentvue_type_template_id_36ead2c6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue?vue&type=template&id=36ead2c6&scoped=true&

// CONCATENATED MODULE: ./src/constants/keys.constants.js
/* harmony default export */ var keys_constants = ({
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  HOTKEYS: {
    ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
  },
  PROPERTY_TYPE: {
    MULTI_SELECT: null,
    SINGLE_SELECT: 1,
    ANY_VALUE: 0
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfEnterPressComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* ---------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------- */
// No need for this component being converted. Simply use -
//   <input v-on:keyup.enter="callback">

/* ---------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------- */

/* harmony default export */ var JfEnterPressComponentvue_type_script_lang_js_ = ({
  name: 'jf-enter-press',
  'jf@inject': ['$element', '$scope'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$element.on('keypress', function (e) {
      return _this._onKeyPress(e);
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$scope.$on('$destroy', function () {
      return _this.$element.off('keypress');
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfEnterPress'
  },
  methods: {
    _onKeyPress: function _onKeyPress(e) {
      if (e.keyCode != keys_constants.ENTER) return;
      e.preventDefault();
      this.$emit('callback');
      if (!this.$scope.$phase) this.$scope.$apply();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfEnterPressComponentvue_type_script_lang_js_ = (JfEnterPressComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue





/* normalize component */

var JfEnterPressComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfEnterPressComponentvue_type_script_lang_js_,
  JfEnterPressComponentvue_type_template_id_36ead2c6_scoped_true_render,
  JfEnterPressComponentvue_type_template_id_36ead2c6_scoped_true_staticRenderFns,
  false,
  null,
  "36ead2c6",
  null
  
)

/* harmony default export */ var JfEnterPressComponent = (JfEnterPressComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfUiSelectComponent/index.vue?vue&type=script&lang=js&


var JfUiSelectComponentvue_type_script_lang_js_TEMPLATE = "\n   <div>\n\n       <multi-select @open=\"opened\" :options-limit=\"loadChunks\" :internal-search=\"false\" @search-change=\"onSearch\" :allow-empty=\"false\" :disabled=\"jfSelectDisabled\" :close-on-select=\"!jfSelectMultiple\" :multiple=\"jfSelectMultiple\" @input=\"onInputChange\" :value=\"value\" :options=\"manipulatedList\" :searchable=\"true\" :show-labels=\"false\" :placeholder=\"jfSelectPlaceholder\" :track-by=\"displayAttr\" :label=\"displayAttr\">\n\n      <template slot=\"singleLabel\" slot-scope=\"props\">\n\n    <jf-marquee>\n     <div class=\"option__desc\"><span class=\"option__title\">  <i  v-if=\"props.option.icon\" class=\"icon option__icon\" :class=\"props.option.icon\"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option) }}</span></div>\n\n   </jf-marquee>\n   </template>\n\n     <template slot=\"option\" slot-scope=\"props\">\n     <div class=\"option__desc\"><span class=\"option__title\"><i  v-if=\"props.option.icon\" class=\"icon option__icon\" :class=\"props.option.icon\"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option)  }} <jf-help-tooltip :html=\"jfSelectHelpTooltips(props.option)\" v-if=\"jfSelectHelpTooltips\"></jf-help-tooltip></span></div>\n   </template>\n\n    <template v-if=\"jfSelectLoadChunks && jfSelectLoadChunks < manipulatedList.length\" slot=\"afterList\" slot-scope=\"props\">\n<div class=\"option__desc\"><span @click=\"increaseLimit\" :class=\"{'disabled':exccededLimit}\" class=\"option__title load-more\">  {{jfSelectLoadMoreLabel || 'Load More'}} <div class=\"multiselect__spinner\" style=\"display:none;\"></div> </span> </div>\n   </template>\n\n    </multi-select>\n\n   </div>";
/* harmony default export */ var JfUiSelectComponentvue_type_script_lang_js_ = ({
  template: JfUiSelectComponentvue_type_script_lang_js_TEMPLATE,
  name: 'jf-ui-select',
  props: ['jfSelectOptions', 'jfSelectDisplayFunc', 'jfSelectDisabled', 'jfSelectDisableMarquee', 'jfSelectMultiple', 'jfSelectDisplayAttr', 'jfSelectFilterAttr', 'jfSelectPlaceholder', 'jfSelectLoadChunks', 'jfSelectLoadMoreLabel', 'jfSelectHelpTooltips', 'value'],
  watch: {
    jfSelectOptions: function jfSelectOptions() {
      this.manipulatedList = _.cloneDeep(this.jfSelectOptions);
    }
  },
  data: function data() {
    return {
      manipulatedList: _.cloneDeep(this.jfSelectOptions),
      jfSelectOptionsView: null,
      exccededLimit: null,
      loadChunks: this.jfSelectLoadChunks
    };
  },
  computed: {},
  beforeMount: function beforeMount() {
    parse_int_default()(this.jfSelectLoadChunks);

    this.displayAttr = this.jfSelectDisplayAttr || null;
  },
  mounted: function mounted() {
    var _this = this;

    if (this.jfSelectLoadChunks) {
      this.originalLoadChunks = this.jfSelectLoadChunks;
    }

    this.displayLabel = function (item) {
      if (item === null || item === undefined) return null;
      if (_this.isMorePlaceholder(item)) return _this.jfSelectLoadMoreLabel || 'More Options...';
      if (item[_this.jfSelectDisabled]) return null;
      return _this.$emit('jf-select-display-func', {
        $item: item
      });
    };

    if (this.jfSelectLoadChunks === undefined) {} else if (this.jfSelectLoadChunks === '') {
      this.chunkSize = 10;
      this.jfSelectOptionsView = [];
    } else {
      this.chunkSize = parse_int_default()(this.jfSelectLoadChunks) < 4 ? 4 : parse_int_default()(this.jfSelectLoadChunks);
      this.jfSelectOptionsView = [];
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfUiSelect'
  },
  methods: {
    opened: function opened() {
      console.log("checking if excceded limit");

      if (this.jfSelectLoadChunks && this.loadChunks < this.jfSelectOptions.length) {
        this.exccededLimit = false;
      }
    },
    increaseLimit: function increaseLimit() {
      if (!this.exccededLimit) {
        this.loadChunks += this.originalLoadChunks;

        if (this.loadChunks >= this.jfSelectOptions.length) {
          this.exccededLimit = true;
        }
      }
    },
    onSearch: function onSearch(searchQ, id) {
      var _this$manipulatedList,
          _this2 = this;

      this.manipulatedList.splice(0, this.manipulatedList.length);

      (_this$manipulatedList = this.manipulatedList).push.apply(_this$manipulatedList, Object(toConsumableArray["a" /* default */])(_.filter(this.jfSelectOptions, function (o) {
        if (_.isObject(o)) {
          return o[_this2.displayAttr].toLowerCase().indexOf(searchQ.toLowerCase()) > -1;
        } else {
          return o.toLowerCase().indexOf(searchQ.toLowerCase()) > -1;
        }
      })));
    },
    setSelectText: function setSelectText(text) {
      if (this.jfSelectDisplayFunc) {
        return this.jfSelectDisplayFunc(text);
      } else {
        return text;
      }
    },
    onInputChange: function onInputChange(val) {
      this.$emit('jf-select-change');
      this.$emit('input', val);
    },
    onSelect: function onSelect($item, $model) {
      this.$emit('jf-select-change');
      if (this.jfSelectOptionsView) this.jfSelectOptionsView = [];
    },
    onClick: function onClick(item, $event) {
      if (this.jfSelectOptionsView && this.isMorePlaceholder(item)) {
        var newLoads = this[this.filtered ? 'filtered' : 'jfSelectOptions'].slice(this.loaded, this.loaded + this.chunkSize);
        this.jfSelectOptionsView = this.jfSelectOptionsView.slice(0, this.loaded).concat(newLoads);

        if (this[this.filtered ? 'filtered' : 'jfSelectOptions'].length > this.jfSelectOptionsView.length) {
          this.jfSelectOptionsView.push(this.createMorePlaceholder());
        }

        this.loaded += this.chunkSize;
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfUiSelectComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfUiSelectComponentvue_type_script_lang_js_ = (JfUiSelectComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfUiSelectComponent/index.vue?vue&type=style&index=0&id=e682a796&scoped=true&lang=less&
var JfUiSelectComponentvue_type_style_index_0_id_e682a796_scoped_true_lang_less_ = __webpack_require__("d1e7");

// CONCATENATED MODULE: ./src/components/JfUiSelectComponent/index.vue
var JfUiSelectComponent_render, JfUiSelectComponent_staticRenderFns





/* normalize component */

var JfUiSelectComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfUiSelectComponentvue_type_script_lang_js_,
  JfUiSelectComponent_render,
  JfUiSelectComponent_staticRenderFns,
  false,
  null,
  "e682a796",
  null
  
)

/* harmony default export */ var JfUiSelectComponent = (JfUiSelectComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPanelComponent/index.vue?vue&type=template&id=be09b244&scoped=true&
var JfPanelComponentvue_type_template_id_be09b244_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.containerClass},[(_vm.jfPanelHeading)?_c('span',{staticClass:"panel-heading"},[_vm._v("\n        "+_vm._s(_vm.jfPanelHeading)+" "),(_vm.jfPanelHelpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.jfPanelHelpTooltip}}):_vm._e()],1):_vm._e(),_c('div',{staticClass:"panel-body"},[_c('div',{staticClass:"panel panel-default clearfix"},[_vm._t("default")],2)])])}
var JfPanelComponentvue_type_template_id_be09b244_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=template&id=be09b244&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPanelComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfPanelComponentvue_type_script_lang_js_ = ({
  name: 'jf-panel',
  props: ['jfPanelHeading', 'jfPanelHelpTooltip', 'jfPanelClasses', 'bordered'],
  'jf@inject': ['$element'],
  data: function data() {
    return {
      todo: false,
      hasNested: false
    };
  },
  computed: {
    containerClass: function containerClass() {
      return "panel-container".concat(this.jfPanelClasses ? ' ' + this.jfPanelClasses : '', " ").concat(this.bordered || this.hasNested ? 'bordered' : '');
    }
  },
  methods: {
    hasNestedJfPanel: function hasNestedJfPanel() {
      if (!this.$element) {
        return false;
      }

      return this.$element[0].getElementsByClassName('panel-body').length > 1;
    }
  },
  mounted: function mounted() {
    this.hasNested = this.hasNestedJfPanel();
  },
  ng1_legacy: {
    'controllerAs': '$ctrl'
  }
});
// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfPanelComponentvue_type_script_lang_js_ = (JfPanelComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=style&index=0&id=be09b244&scoped=true&lang=less&
var JfPanelComponentvue_type_style_index_0_id_be09b244_scoped_true_lang_less_ = __webpack_require__("d0b4");

// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue






/* normalize component */

var JfPanelComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfPanelComponentvue_type_script_lang_js_,
  JfPanelComponentvue_type_template_id_be09b244_scoped_true_render,
  JfPanelComponentvue_type_template_id_be09b244_scoped_true_staticRenderFns,
  false,
  null,
  "be09b244",
  null
  
)

/* harmony default export */ var JfPanelComponent = (JfPanelComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDrawerComponent/index.vue?vue&type=template&id=f750ffcc&scoped=true&
var JfDrawerComponentvue_type_template_id_f750ffcc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-drawer"},[_c('div',{staticClass:"drawer-header",on:{"click":function($event){return _vm.onClickHeader()}}},[_c('div',{staticClass:"drawer-header-title"},[_vm._v("\n                "+_vm._s(_vm.header)+"\n            ")]),_c('div',{staticClass:"drawer-header-description"},[_vm._v("\n                "+_vm._s(_vm.description)+"\n            ")]),_c('i',{staticClass:"icon-small-arrow-down",class:{'drawer-arrow-close' : !_vm.opened}})]),_c('b-collapse',{staticClass:"drawer-content",attrs:{"id":"collapse"},model:{value:(_vm.opened),callback:function ($$v) {_vm.opened=$$v},expression:"opened"}},[_c('b-card',[_vm._t("default")],2)],1)],1)])}
var JfDrawerComponentvue_type_template_id_f750ffcc_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=template&id=f750ffcc&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDrawerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfDrawerComponentvue_type_script_lang_js_ = ({
  name: 'jf-drawer',
  props: ['header', 'description', 'openFirst'],
  'jf@inject': ['JFrogUIUtils', '$timeout'],
  data: function data() {
    return {
      opened: null
    };
  },
  created: function created() {
    this.opened = false;
    this.utils = this.JFrogUIUtils;
  },
  mounted: function mounted() {
    if (this.openFirst === '0') {
      this.opened = true;
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfDrawer'
  },
  methods: {
    onClickHeader: function onClickHeader() {
      this.opened = !this.opened;
      if (this.opened) this.utils.fireResizeEvent();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDrawerComponentvue_type_script_lang_js_ = (JfDrawerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=style&index=0&id=f750ffcc&scoped=true&lang=less&
var JfDrawerComponentvue_type_style_index_0_id_f750ffcc_scoped_true_lang_less_ = __webpack_require__("a2b9");

// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue






/* normalize component */

var JfDrawerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDrawerComponentvue_type_script_lang_js_,
  JfDrawerComponentvue_type_template_id_f750ffcc_scoped_true_render,
  JfDrawerComponentvue_type_template_id_f750ffcc_scoped_true_staticRenderFns,
  false,
  null,
  "f750ffcc",
  null
  
)

/* harmony default export */ var JfDrawerComponent = (JfDrawerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabComponent/index.vue?vue&type=template&id=ef6a0cde&
var JfTabComponentvue_type_template_id_ef6a0cde_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.name === _vm.currentTabName)?_c('div',[_vm._t("default")],2):_vm._e()}
var JfTabComponentvue_type_template_id_ef6a0cde_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTabComponent/index.vue?vue&type=template&id=ef6a0cde&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
/* harmony default export */ var JfTabComponentvue_type_script_lang_js_ = ({
  name: 'jf-tab',
  props: ['name'],
  data: function data() {
    return {};
  },
  computed: {
    currentTabName: function currentTabName() {
      return this.$parent.currentTab.name;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTabComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTabComponentvue_type_script_lang_js_ = (JfTabComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTabComponent/index.vue





/* normalize component */

var JfTabComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTabComponentvue_type_script_lang_js_,
  JfTabComponentvue_type_template_id_ef6a0cde_render,
  JfTabComponentvue_type_template_id_ef6a0cde_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfTabComponent = (JfTabComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabsComponent/index.vue?vue&type=template&id=ea18396c&scoped=true&
var JfTabsComponentvue_type_template_id_ea18396c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-tabs"},[_c('ul',{staticClass:"nav nav-tabs"},[_vm._l((_vm.tabsVisible),function(tab,index){
var _obj;
return _c('li',{key:index,staticClass:"jf-tabs-tab-header",class:( _obj = {active:_vm.isActiveTab(tab), disabled:tab.isDisabled}, _obj[tab.class] = _vm.hasClass(tab), _obj ),style:({width: _vm.getTabWidthForStyle()}),attrs:{"jf-disable-feature":tab.feature}},[_c('a',{staticStyle:{"z-index":"999999"},on:{"click":function($event){$event.preventDefault();return _vm.onClickTab(tab, true)}}},[_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-tab-header-container"},[_c('span',[_vm._v(_vm._s(_vm.dictionary[tab.name]))])])])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabsCollapsed.length),expression:"tabsCollapsed.length"}],staticClass:"action-expand"},[_c('span',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.closeDropdown),expression:"closeDropdown"}],staticClass:"dropdown",class:{ open: _vm.isDropdownOpen }},[_c('a',{staticClass:"dropdown-toggle nav-tabs-more",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.isDropdownOpen = !_vm.isDropdownOpen}}},[_c('i',{staticClass:"icon-arrow"})]),_c('ul',{staticClass:"dropdown-menu dropdown-menu-right dropdown-container text-left"},_vm._l((_vm.tabsCollapsed),function(tab,index){
var _obj;
return _c('li',{key:index,staticClass:"dropdown-item",class:( _obj = {}, _obj[tab.class] = _vm.hasClass(tab), _obj ),attrs:{"jf-disable-feature":tab.feature}},[_c('a',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],on:{"click":function($event){$event.preventDefault();return _vm.onClickTab(tab, true)}}},[_c('span',[_vm._v(_vm._s(_vm.dictionary[tab.name]))])])])}),0)])])],2),_vm._t("default")],2)}
var JfTabsComponentvue_type_template_id_ea18396c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=template&id=ea18396c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabsComponent/index.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTabsComponentvue_type_script_lang_js_ = ({
  name: 'jf-tabs',
  props: ['tabs', 'dictionary', 'tabWidth', 'containerMargin', 'activeTab'],
  'jf@inject': ['JFrogEventBus', '$scope'],
  data: function data() {
    return {
      tabsVisible: null,
      tabsCollapsed: [],
      isDropdownOpen: false,
      currentTab: {
        name: null
      },
      tabwidth: this.tabWidth || "100"
    };
  },
  watch: {
    activeTab: function activeTab() {
      this.currentTab.name = this.activeTab;
    }
  },
  created: function created() {
    this.stateParams = this.$route.query;
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.currentTab.name = this.stateParams.activeTab || this.activeTab;
  },
  mounted: function mounted() {
    this._registerEvents();

    this.initTabs();
  },
  beforeDestroy: function beforeDestroy() {
    $(window).off('resize.tabs');
    this.unwatch();
    this.stateChangeListener();
  },
  methods: {
    initTabs: function initTabs() {
      var _this = this;

      // wait for the element to render and calculate how many tabs should display
      setTimeout(function () {
        _this._calculateTabsSize();

        var tab = _this._getTab(_this.currentTab);

        if (!tab || tab.isVisible === false || tab.isDisabled) {
          // If current tab doesn't exist on the tabs list at all - select the first tab
          var firstValidTab = _.findIndex(_this.tabs, function (tab) {
            return tab.isVisible !== false && !tab.isDisabled;
          });

          if (firstValidTab !== -1) _this.onClickTab(_this.tabs[firstValidTab], false);
        } else {
          // Otherwise - make sure it's visible
          _this._ensureTabVisible(_this.currentTab);
        }
      });
    },
    _calculateTabsSize: function _calculateTabsSize() {
      // wait for the element to render and calculate how many tabs should display
      var visibleTabs = _.filter(this.tabs, function (tab) {
        return tab.isVisible !== false;
      });

      var container = $(this.$el).children().eq(0);
      var containerWidth = container.width();
      var tabWidth = this.getTabWidthForStyle().endsWith('px') ? parse_int_default()(this.tabwidth) : containerWidth * parse_int_default()(this.tabwidth) / 100;

      var containerMargin = parse_int_default()(this.containerMargin);

      var expanderWidth = $('.action-expand').eq(0).outerWidth(true);
      var tabsToTake = Math.floor((containerWidth - expanderWidth - containerMargin) / tabWidth);
      this.tabsCollapsed = _.takeRight(visibleTabs, visibleTabs.length - tabsToTake);
      this.tabsVisible = _.take(visibleTabs, tabsToTake);
    },
    _registerEvents: function _registerEvents() {
      var _this2 = this;

      this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_REFRESH, function () {
        return _this2.initTabs();
      }); // URL changed (like back button / forward button / someone input a URL)

      this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_URL_CHANGED, function (stateParams) {
        _this2.currentTab.name = stateParams.tab;
      });
      $(window).on('resize.tabs', function () {
        _this2.initTabs();
      });
    },
    unwatch: function unwatch() {
      var _this3 = this;

      return this.$scope.$watch('jfTabs.tabs', function (newVal, oldVal) {
        _this3._calculateTabsSize();
      }, true);
    },
    stateChangeListener: function stateChangeListener() {
      return this.$root.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
        toState.tabChange = false;
      });
    },
    onClickTab: function onClickTab(tab, tabChange) {
      this.isDropdownOpen = false;

      if (this.$emit('on-tab-change', {
        tab: tab
      }) === false || tab.isDisabled) {
        return;
      }

      this._ensureTabVisible(tab);

      this.$router.replace({
        query: Object(objectSpread["a" /* default */])({}, this.$router.currentRoute.query, {
          activeTab: tab.name
        })
      });
      this.currentTab.name = tab.name;
    },
    _ensureTabVisible: function _ensureTabVisible(tab) {
      var collapsedTab = this._getCollapsedTab(tab);

      if (!collapsedTab) return; // Replace between collapsedTabs & visibleTabs:

      var collapsedTabIndex = this.tabsCollapsed.indexOf(collapsedTab);
      var tabToReplace = this.tabsVisible[this.tabsVisible.length - 1];
      if (!tabToReplace) return;
      this.tabsCollapsed[collapsedTabIndex] = tabToReplace;
      this.tabsVisible[this.tabsVisible.length - 1] = collapsedTab;
    },
    isActiveTab: function isActiveTab(tab) {
      return tab.name === this.currentTab.name;
    },
    _getTab: function _getTab(tab) {
      var currentTab = _.find(this.tabs, {
        name: tab.name
      });

      return currentTab;
    },
    _getCollapsedTab: function _getCollapsedTab(tab) {
      return _.find(this.tabsCollapsed, {
        name: tab.name
      });
    },
    getTabWidthForStyle: function getTabWidthForStyle() {
      return this.tabwidth.endsWith('%') ? this.tabwidth : this.tabwidth.endsWith('px') ? this.tabwidth : this.tabwidth + 'px';
    },
    hasClass: function hasClass(obj) {
      if (obj && obj.class) return true;
    },
    closeDropdown: function closeDropdown() {
      this.isDropdownOpen = false;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTabsComponentvue_type_script_lang_js_ = (JfTabsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=style&index=0&id=ea18396c&scoped=true&lang=less&
var JfTabsComponentvue_type_style_index_0_id_ea18396c_scoped_true_lang_less_ = __webpack_require__("49cc");

// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue






/* normalize component */

var JfTabsComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTabsComponentvue_type_script_lang_js_,
  JfTabsComponentvue_type_template_id_ea18396c_scoped_true_render,
  JfTabsComponentvue_type_template_id_ea18396c_scoped_true_staticRenderFns,
  false,
  null,
  "ea18396c",
  null
  
)

/* harmony default export */ var JfTabsComponent = (JfTabsComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridFilterComponent/index.vue?vue&type=template&id=41dede7b&scoped=true&
var JfGridFilterComponentvue_type_template_id_41dede7b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"grid-filter"},[_c('form',{attrs:{"name":"gridFilterForm","novalidate":""}},[_c('jf-field',{attrs:{"validations":"gridFilter","autofocus":_vm.autoFocus}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.gridFilter),expression:"gridFilter"}],staticClass:"input-text",style:({color:_vm.noMatches ? 'red' : 'black'}),attrs:{"type":"text","name":"gridFilter","jf-validator-max-text-length":"1024","ng-model-options":"{debounce: shouldFilterOnChange() ? 200 : 0}","placeholder":_vm.getPlaceHolder()},domProps:{"value":(_vm.gridFilter)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.gridFilter=$event.target.value},function($event){return _vm.onChange()}]}})]),(!_vm.shouldFilterOnChange())?_c('div',{staticClass:"btn-group"},[_c('button',{staticClass:"btn btn-primary",attrs:{"disabled":_vm.disableButton},on:{"click":function($event){return _vm.doFilter()}}},[_c('span',{staticClass:"icon icon-refresh"})])]):_vm._e()],1)])])}
var JfGridFilterComponentvue_type_template_id_41dede7b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridFilterComponent/index.vue?vue&type=template&id=41dede7b&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridFilterComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfGridFilterComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid-filter',
  props: ['disableButton', 'filterField', 'filterField2', 'grid', 'filterOnChange', 'autoFocus'],
  'jf@inject': ['$scope', '$timeout'],
  data: function data() {
    return {
      gridFilterForm: null,
      gridFilter: null,
      noMatches: null
    };
  },
  ng1_legacy: {
    'controllerAs': 'jfGridFilter'
  }
});
// CONCATENATED MODULE: ./src/components/JfGridFilterComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridFilterComponentvue_type_script_lang_js_ = (JfGridFilterComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfGridFilterComponent/index.vue





/* normalize component */

var JfGridFilterComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfGridFilterComponentvue_type_script_lang_js_,
  JfGridFilterComponentvue_type_template_id_41dede7b_scoped_true_render,
  JfGridFilterComponentvue_type_template_id_41dede7b_scoped_true_staticRenderFns,
  false,
  null,
  "41dede7b",
  null
  
)

/* harmony default export */ var JfGridFilterComponent = (JfGridFilterComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCodeMirrorComponent/index.vue?vue&type=template&id=b106956a&scoped=true&
var JfCodeMirrorComponentvue_type_template_id_b106956a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:{'codemirror-with-clip-copy' : _vm.enableCopyToClipboard}},[(_vm.enableCopyToClipboard && _vm.formattedModel && !_vm.clipboardCopyModel)?_c('jf-clip-copy',{staticClass:"code-mirror-copy pull-right",class:{'scrollbar-margin':_vm.codeMirrorIsWithScroll()},attrs:{"text-to-copy":_vm.formattedModel,"object-name":_vm.clipboardCopyEntityName || 'text'}}):_vm._e(),(_vm.enableCopyToClipboard && _vm.clipboardCopyModel)?_c('jf-clip-copy',{staticClass:"code-mirror-copy pull-right",class:{'scrollbar-margin':_vm.codeMirrorIsWithScroll()},attrs:{"text-to-copy":_vm.clipboardCopyModel,"object-name":_vm.clipboardCopyEntityName || 'text'}}):_vm._e(),_c('codemirror',{attrs:{"options":_vm.editorOptions},on:{"ready":_vm.codeMirrorLoaded},model:{value:(_vm.formattedModel),callback:function ($$v) {_vm.formattedModel=$$v},expression:"formattedModel"}})],1)])}
var JfCodeMirrorComponentvue_type_template_id_b106956a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/index.vue?vue&type=template&id=b106956a&scoped=true&

// EXTERNAL MODULE: ./node_modules/codemirror/lib/codemirror.js
var lib_codemirror = __webpack_require__("56b3");
var lib_codemirror_default = /*#__PURE__*/__webpack_require__.n(lib_codemirror);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCodeMirrorComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 //    const CodeMirror = window.CodeMirror;
//    import { search } from '@/directives/jf_codemirror/search/search.js'

;
/* harmony default export */ var JfCodeMirrorComponentvue_type_script_lang_js_ = ({
  name: 'jf-code-mirror',
  props: ['mimeType', 'mode', 'value', 'allowEdit', 'height', 'apiAccess', 'autofocus', 'matchBrackets', 'autoFormat', 'autoIndent', 'enableCopyToClipboard', 'clipboardCopyModel', 'clipboardCopyEntityName'],
  'jf@inject': ['$scope', '$element', '$timeout', 'JFrogUIUtils'],
  data: function data() {
    return {
      formattedModel: null,
      editorOptions: null
    };
  },
  created: function created() {
    this.defineExtensions();
  },
  mounted: function mounted() {
    this._formatModel();

    this.editorOptions = {
      lineNumbers: true,
      readOnly: !this.allowEdit,
      // Don't use nocursor - it disables search
      lineWrapping: true,
      mode: this.mode || 'links',
      viewportMargin: 65,
      autofocus: this.autofocus === 'true',
      mimeType: this.mimeType,
      matchBrackets: this.matchBrackets //                onLoad: this.codeMirrorLoaded.bind(this)

    }; // Hide cursor in readonly mode

    if (!this.allowEdit) {
      this.$set(this.editorOptions, 'cursorBlinkRate', -1);
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfCodeMirror'
  },
  methods: {
    codeMirrorLoaded: function codeMirrorLoaded(_editor) {
      var _this = this;

      Vue.nextTick(function () {
        _this.cmApi = _editor;

        if (_this.height) {
          var codeMirrorElement = $(_this.$element).find('.CodeMirror');

          if (_this.height === 'flexible') {
            codeMirrorElement.css('top', 0);
            codeMirrorElement.css('bottom', 0);
            codeMirrorElement.css('left', 0);
            codeMirrorElement.css('right', 0);
            codeMirrorElement.css('position', 'absolute');
          } else {
            codeMirrorElement.css('height', _this.height);
          }
        }

        $(_editor.display.wrapper).on('click', '.cm-link', function (e) {
          var url = $(_this).text();

          if (url) {
            window.open(url, '_blank');
          }
        });

        _this.$scope.$on('$destroy', function () {
          _this.$destroyed = true;
          $(_editor.display.wrapper).off('click');
        });

        if (_this.apiAccess) {
          _this.$set(_this.apiAccess, 'api', _this.cmApi);

          if (_this.apiAccess.onLoad) {
            _this.apiAccess.onLoad();
          }
        }
      });
    },
    autoFormatText: function autoFormatText(indent) {
      var last = this.cmApi.lineCount();
      var start = {
        line: 0,
        ch: 0
      },
          end = {
        line: last
      };

      if (indent) {
        this.cmApi.autoIndentRange(start, end);
      } else {
        this.cmApi.autoFormatRange(start, end);
      }

      this.cmApi.setCursor(start);
    },
    _isJSON: function _isJSON(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }

      return true;
    },
    _formatModel: function _formatModel() {
      var _this2 = this;

      var format = function format(content) {
        if (_this2.autoFormat && (_this2.mode === 'javascript' || _this2.mode === 'htmlmixed')) {
          _this2.$timeout(function () {
            if (_this2.cmApi && _this2.cmApi.getValue().length > 0) {
              _this2.autoFormatText();

              _this2.formattedModel = _this2.cmApi.getValue();

              _this2.cmApi.refresh();
            }
          });
        }

        if (_this2._isJSON(content)) {
          _this2.formattedModel = __webpack_require__("e552").js_beautify(content);
        } else {
          _this2.formattedModel = content;
        }

        _this2.expectChange();

        _this2.refreshUntilVisible();
      };

      if (!this.allowEdit) {
        format(this.value);
        this.$scope.$watch('jfCodeMirror.value', function (v) {
          format(v);
        });
      } else {
        this.formattedModel = this.value;
        this.$scope.$watch('jfCodeMirror.value', function (v) {
          if (_this2.formattedModel !== _this2.value) {
            _this2.formattedModel = _this2.value;

            _this2.expectChange();

            _this2.refreshUntilVisible();
          }
        });
        this.$scope.$watch('jfCodeMirror.formattedModel', function (v) {
          _this2.$emit('input', v);
        });
        this.expectChange();
        this.refreshUntilVisible();
      }
    },
    refreshUntilVisible: function refreshUntilVisible() {
      var _this3 = this;

      if (this.cmApi) this.cmApi.refresh();
      if (this.allowEdit) return;
      this.$timeout(function () {
        var cmText = $(_this3.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g, '');

        if (_this3.expectingChange && cmText === _this3.lastVal) {
          if (_this3.cmApi) {
            _this3.cmApi.refresh();
          }

          if (!_this3.$destroyed) _this3.refreshUntilVisible();
        } else if (_this3.expectingChange) {
          _this3.expectingChange = false;
          delete _this3.lastVal;
        }
      }, 100);
    },
    expectChange: function expectChange() {
      var cmText = $(this.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g, '');
      this.expectingChange = true;
      this.lastVal = cmText;
    },
    defineExtensions: function defineExtensions() {
      var _this4 = this;

      lib_codemirror_default.a.defineExtension('autoFormatRange', function (from, to) {
        var cm = _this4.cmApi;
        var outer = cm.getMode(),
            text = cm.getRange(from, to).split('\n');
        var state = lib_codemirror_default.a.copyState(outer, cm.getTokenAt(from).state);
        var tabSize = cm.getOption('tabSize');
        var out = '',
            lines = 0,
            atSol = from.ch == 0;

        var newline = function newline() {
          out += '\n';
          atSol = true;
          ++lines;
        };

        for (var i = 0; i < text.length; ++i) {
          var stream = new lib_codemirror_default.a.StringStream(text[i], tabSize);

          while (!stream.eol()) {
            var inner = lib_codemirror_default.a.innerMode(outer, state);
            var style = outer.token(stream, state),
                cur = stream.current();
            stream.start = stream.pos;

            if (!atSol || /\S/.test(cur)) {
              out += cur;
              atSol = false;
            }

            if (!atSol && inner.mode.newlineAfterToken && inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || '', inner.state)) newline();
          }

          if (!stream.pos && outer.blankLine) outer.blankLine(state);
          if (!atSol) newline();
        }

        cm.operation(function () {
          cm.replaceRange(out, from, to);

          for (var _cur = from.line + 1, end = from.line + lines; _cur <= end; ++_cur) {
            cm.indentLine(_cur, 'smart');
          }
        });
      }); // Applies automatic mode-aware indentation to the specified range

      lib_codemirror_default.a.defineExtension('autoIndentRange', function (from, to) {
        var cmInstance = _this4.cmApi;

        _this4.cmApi.operation(function () {
          for (var i = from.line; i <= to.line; i++) {
            cmInstance.indentLine(i, 'smart');
          }
        });
      });
    },
    codeMirrorIsWithScroll: function codeMirrorIsWithScroll() {
      if (!this.$element) return false;
      var codemirrorScrollBar = this.$element.find('.CodeMirror .CodeMirror-vscrollbar:not(:hidden)');
      return codemirrorScrollBar && codemirrorScrollBar.length > 0;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfCodeMirrorComponentvue_type_script_lang_js_ = (JfCodeMirrorComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfCodeMirrorComponent/index.vue?vue&type=style&index=0&id=b106956a&scoped=true&lang=less&
var JfCodeMirrorComponentvue_type_style_index_0_id_b106956a_scoped_true_lang_less_ = __webpack_require__("88eb");

// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/index.vue






/* normalize component */

var JfCodeMirrorComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfCodeMirrorComponentvue_type_script_lang_js_,
  JfCodeMirrorComponentvue_type_template_id_b106956a_scoped_true_render,
  JfCodeMirrorComponentvue_type_template_id_b106956a_scoped_true_staticRenderFns,
  false,
  null,
  "b106956a",
  null
  
)

/* harmony default export */ var JfCodeMirrorComponent = (JfCodeMirrorComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFieldComponent/index.vue?vue&type=template&id=7e763e16&scoped=true&
var JfFieldComponentvue_type_template_id_7e763e16_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-field",class:{'sticky-errors': _vm.dontPushDownErrors}},[_c('div',{class:{'input-label': _vm.animated}},[_c('validation-provider',{attrs:{"rules":_vm.inferredRules,"events":['input', 'focus'],"name":_vm.validationDomain},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return _c('div',{},[_c('div',{class:{invalid: errors.length && !_vm.focused}},[_vm._t("default")],2),(errors.length && !_vm.focused)?_c('div',{staticClass:"field-validation-error"},_vm._l((errors),function(error){return _c('div',{staticClass:"jf-validation"},[_vm._v("\n                            "+_vm._s(error)+"\n                        ")])}),0):_vm._e()])}}],null,true)})],1)])])}
var JfFieldComponentvue_type_template_id_7e763e16_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=template&id=7e763e16&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFieldComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfFieldComponentvue_type_script_lang_js_ = ({
  name: 'jf-field',
  components: {
    ValidationProvider: vee_validate_esm["a" /* ValidationProvider */]
  },
  'jf@inject': ['JFrogEventBus', 'JFrogUILibConfig', '$timeout', '$rootScope', '$scope'],
  props: ['animated', 'validations', 'validationRules', 'customValidations', 'validationsParams', 'autofocus', 'invalidateOnSubmit', 'alwaysShowErrors', 'dontValidateDisabled', 'delayedInit', 'dontPushDownErrors'],
  data: function data() {
    return {
      focused: false,
      inferredRules: '',
      formField: null,
      inputElement: null,
      inputName: '',
      validationDomain: this.validations || 'common'
    };
  },
  mounted: function mounted() {
    this.inputElement = this.$element.find('input');

    if (!this.inputElement.length) {
      this.inputElement = this.$element.find('textarea');
    }

    if (this.inputElement.length) {
      this.inputName = this.inputElement[0].attributes['name'] ? this.inputElement[0].attributes['name'].value : '';
      this.formField = this.$element.parents('form')[0].attributes['name'] ? window[this.$element.parents('form')[0].attributes['name'].value][this.inputName] : null;
      this.inferRules();
      this.init();
    }
  },
  methods: {
    init: function init() {
      var _this = this;

      var EVENTS = this.JFrogEventBus.getEventsDefinition();

      var init = function init() {
        if (_this.formField) _this.formField.initialValue = true;

        _this.$scope.$watch(function () {
          return _this.autofocus;
        }, function () {
          return _this.focusInput();
        });

        _this.JFrogEventBus.registerOnScope(_this.$scope, EVENTS.FORM_SUBMITTED, _this._onFormSubmitted);

        _this.JFrogEventBus.registerOnScope(_this.$scope, EVENTS.FORM_CLEAR_FIELD_VALIDATION, function (force) {
          _this._onBlur(force);

          if (_this.formField) _this.formField.preventShowErrors = true;
        });

        _this.$scope.$on('$destroy', function () {
          _this.inputElement.off('blur');

          _this.inputElement.off('keyup');

          _this.inputElement.off('keydown');

          _this.inputElement.off('focus');
        });

        _this.inputElement.on('keydown', function () {
          return _this._onKeyDown();
        });

        if (!_this.invalidateOnSubmit && _this.validationDomain) {
          _this.inputElement.on('blur', function () {
            return _this._onBlur();
          });

          _this.inputElement.on('keyup', function () {
            return _this._onKeyUp();
          });
        }

        if (_this.invalidateOnSubmit || _this.validationDomain) {
          _this.inputElement.on('focus', function () {
            return _this._onFocus();
          });
        }

        if (_this.dontValidateDisabled) {
          _this.$rootScope.$watch(function () {
            return _this.inputElement[0].disabled;
          }, function () {
            return _this._onDisabledChanged(_this.inputElement[0].disabled);
          });
        }

        _this.focusInput();
      };

      if (this.delayedInit) {
        this.$timeout(function () {
          return init();
        });
      } else {
        init();
      }
    },
    focusInput: function focusInput() {
      var _this2 = this;

      if (this.autofocus && this.autofocus != 'false') {
        if (this.formField) {
          this.formField.isAutoFocused = true;
          this.formField.isAutoFocusedFlag = true;
        }

        this.$timeout(function () {
          if (_this2.inputElement.scrollParent && _this2.inputElement.scrollParent()) {
            var y = _this2.inputElement.scrollParent().scrollTop();

            _this2.inputElement.focus();

            _this2.inputElement.scrollParent().scrollTop(y);
          } else {
            _this2.inputElement.focus();
          }
        });
      }
    },
    _onDisabledChanged: function _onDisabledChanged(disabled) {
      if (disabled) {
        this.formField.showErrors = false;
      } else {
        this.formField.showErrors = true;
      }
    },
    _onFormSubmitted: function _onFormSubmitted(formName) {
      if (!formName || this.form.$name === formName && !this.formField.$valid) {
        if (this.formField) this.formField.showErrors = true;
      } else {
        if (this.formField) this.formField.showErrors = false;
      }
    },
    _onBlur: function _onBlur(force) {
      var _this3 = this;

      this.focused = false;
      this.$timeout(function () {
        if (_this3.formField) {
          if (force) {
            _this3.formField.showErrors = false;
          } else if (!_this3.formField.preventShowErrors) {
            _this3.formField.showErrors = true;
          }
        }
      });

      if (this.formField && this.formField.isAutoFocused) {
        if (!this.formField.isAutoFocusedFlag) {
          this.formField.isAutoFocused = false;
          this.formField.showErrors = true;
        } else {
          this.formField.isAutoFocusedFlag = false;
        }
      }
    },
    _onFocus: function _onFocus() {
      var _this4 = this;

      this.focused = true;
      this.$timeout(function () {
        if (_this4.formField) {
          _this4.formField.showErrors = false;
          _this4.formField.preventShowErrors = false;
        }
      });
    },
    _onKeyDown: function _onKeyDown() {
      if (this.formField) {
        this.formField.initialValue = false;
        this.formField.isAutoFocusedFlag = false;
      }
    },
    _onKeyUp: function _onKeyUp() {
      var value = this.inputElement.val();

      if (value !== null && value !== undefined && value !== '') {
        this.inputElement.addClass('hascontent');
      } else {
        this.inputElement.removeClass('hascontent');
      }
    },
    inferRules: function inferRules() {
      var rules = {};
      var attrs = this.inputElement[0].attributes;
      if (attrs.required) rules.required = true;

      if (attrs.type) {
        if (attrs.type.value === 'email') rules.email = true;else if (attrs.type.value === 'url') rules.url = true;else if (attrs.type.value === 'number') rules.decimal = true;else if (attrs.type.value === 'date') rules.date_format = 'YYYY-MM-DD';else if (attrs.type.value === 'datetime-local') rules.date_format = 'YYYY-MM-DDThh:mm';else if (attrs.type.value === 'time') rules.date_format = 'YYYY-Www';else if (attrs.type.value === 'week') rules.date_format = 'hh:mm';else if (attrs.type.value === 'month') rules.date_format = 'YYYY-MM';
      }

      if (attrs.min) rules.min_value = attrs.min.value;
      if (attrs.max) rules.max_value = attrs.max.value;
      if (attrs.pattern) rules.regex = attrs.pattern.value;

      if (this.customValidations) {
        rules.customValidations = this.customValidations;

        keys_default()(this.customValidations).forEach(function (key) {
          rules[key] = true;
        });
      }

      if (this.validationRules) {
        if (_.isObject(this.validationRules)) {
          _.extend(rules, this.validationRules);
        } else {
          if (_.isString(this.validationRules)) {
            var strParts = this.validationRules.split('|').map(function (p) {
              return _.trim(p);
            });
            strParts.forEach(function (part) {
              var key = part.split(':')[0];
              var val = part.substr(key.length);
              rules[key] = val;
            });
          }
        }
      }

      this.inferredRules = rules;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfFieldComponentvue_type_script_lang_js_ = (JfFieldComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=style&index=0&id=7e763e16&scoped=true&lang=less&
var JfFieldComponentvue_type_style_index_0_id_7e763e16_scoped_true_lang_less_ = __webpack_require__("271b");

// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue






/* normalize component */

var JfFieldComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfFieldComponentvue_type_script_lang_js_,
  JfFieldComponentvue_type_template_id_7e763e16_scoped_true_render,
  JfFieldComponentvue_type_template_id_7e763e16_scoped_true_staticRenderFns,
  false,
  null,
  "7e763e16",
  null
  
)

/* harmony default export */ var JfFieldComponent = (JfFieldComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfValidationComponent/index.vue?vue&type=template&id=42cf285a&scoped=true&
var JfValidationComponentvue_type_template_id_42cf285a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ng-messages',{staticClass:"jf-validation",style:({position: _vm.dontPushDown ? 'absolute' : 'relative'}),attrs:{"for":"field.$error"}},_vm._l((_vm.messages),function(key,value){return _c('div',[_c('div',{attrs:{"ng-message-exp":"key","id":"validation-label"}},[_vm._v(_vm._s(_vm.applyParams(value)))])])}),0)],1)}
var JfValidationComponentvue_type_template_id_42cf285a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue?vue&type=template&id=42cf285a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfValidationComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfValidationComponentvue_type_script_lang_js_ = ({
  name: 'jf-validation',
  props: ['field', 'dictionary', 'validationsParams', 'dontPushDown'],
  'jf@inject': ['JFrogUILibConfig'],
  data: function data() {
    return {
      messages: null
    };
  },
  created: function created() {
    return {
      scope: {
        field: '=',
        dictionary: '@',
        validationsParams: '=',
        dontPushDown: '='
      },
      controller: jfValidation,
      controllerAs: 'jfValidation',
      bindToController: true,
      templateUrl: 'directives/jf_validation/jf_validation.html'
    };
  },
  ng1_legacy: {
    'controllerAs': 'jfValidation'
  }
});
// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfValidationComponentvue_type_script_lang_js_ = (JfValidationComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue





/* normalize component */

var JfValidationComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfValidationComponentvue_type_script_lang_js_,
  JfValidationComponentvue_type_template_id_42cf285a_scoped_true_render,
  JfValidationComponentvue_type_template_id_42cf285a_scoped_true_staticRenderFns,
  false,
  null,
  "42cf285a",
  null
  
)

/* harmony default export */ var JfValidationComponent = (JfValidationComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridBatchActionsComponent/index.vue?vue&type=template&id=d5129628&scoped=true&
var JfGridBatchActionsComponentvue_type_template_id_d5129628_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"grid-batch-actions text-right"},_vm._l((_vm.actions),function(action,$index){
var _obj;
return _c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.isDisabled(action) ? action.getDisabledTooltip() : ''),expression:"isDisabled(action) ? action.getDisabledTooltip() : ''",modifiers:{"bind":true}}],staticClass:"grid-batch-action-wrapper",class:{'more-actions': action === _vm.MORE_ACTIONS},style:({visibility: action === _vm.MORE_ACTIONS || _vm.visibleActions.indexOf(action) !== -1 ? 'inherit' : 'hidden', opacity: action === _vm.MORE_ACTIONS || _vm.visibleActions.indexOf(action) !== -1 ? 1 : 0}),attrs:{"data-action-id":action.name}},[(action !== _vm.MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen()))?_c('a',{class:( _obj = {disabled: _vm.isDisabled(action)}, _obj['btn batch-action-' + action.icon] = true, _obj ),on:{"click":function($event){$event.preventDefault();return _vm.perform(action)}}},[(action.img)?_c('img',{attrs:{"src":'images/' + action.icon + '.png'}}):_vm._e(),(!action.img)?_c('i',{class:'icon icon-' + action.icon}):_vm._e(),_vm._v(" "+_vm._s(action.name)+"\n            ")]):_vm._e(),(action === _vm.MORE_ACTIONS)?_c('div',{staticClass:"more-wrapper"},[_c('jf-actions',{attrs:{"parent-controller":_vm.jfBatchActions,"label":"More Actions","init-method":"initActions","show-drop-down-for-one-item":true}})],1):_vm._e()])}),0)])}
var JfGridBatchActionsComponentvue_type_template_id_d5129628_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue?vue&type=template&id=d5129628&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridBatchActionsComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfGridBatchActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid-batch-actions',
  props: ['actions', 'gridApi', 'gridOptions'],
  'jf@inject': ['$element', '$scope', '$timeout'],
  data: function data() {
    return {
      MORE_ACTIONS: {
        '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@'
      }
    };
  },
  created: function created() {
    var _this = this;

    this.$scope.$watch('jfBatchActions.gridApi', function () {
      if (!_this.gridApi) return;

      _this.gridApi.selection.on.rowSelectionChanged(_this.$scope, function (row) {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });

      _this.gridApi.selection.on.rowSelectionChangedBatch(_this.$scope, function (row) {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$scope.$on('ui-layout.resize', function () {
      _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    $(window).on('resize', function () {
      _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$scope.$watch('jfBatchActions.actions', function () {
      return _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$timeout(function () {
      return _this2.calcActionsVisibility();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfBatchActions'
  },
  methods: {
    perform: function perform(action) {
      if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
        action.callback && action.callback(this.gridApi.selection.getSelectedRows());
      }
    },
    anySelected: function anySelected() {
      return this.gridApi && this.gridApi.selection.getSelectedRows().length > 0;
    },
    isDisabled: function isDisabled(action) {
      return !this.anySelected() || action.disabledWhen && action.disabledWhen();
    },
    calcActionsVisibility: function calcActionsVisibility() {
      var _this3 = this;

      if (!this.actions) return;
      var visible = [];
      var inDropDown = [];
      var moreDropdownWidth = 115;
      var elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');
      var containerWidth = $(this.$element).width();
      var totalWidth = 0;
      var addTo = visible;
      var moreActionsNewIndex = -1;
      var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

      for (var i = 0; i < elems.length; i++) {
        var el = $(elems[i]);
        totalWidth += el.width();
        var id = el.attr('data-action-id');

        var act = _.find(this.actions, {
          name: id
        });

        var index = this.actions.indexOf(act);

        if ((totalWidth > containerWidth || this.moreActions && this.moreActions.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) && addTo === visible) {
          addTo = inDropDown;
          moreActionsNewIndex = index;

          if (visible.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) {
            var last = visible.pop();
            inDropDown.push(last);
            moreActionsNewIndex = this.actions.indexOf(last);
          }
        }

        if (act) addTo.push(act);
      }

      if (totalWidth < containerWidth) {
        inDropDown = [];
        visible = _.filter(this.actions, function (act) {
          return act !== _this3.MORE_ACTIONS;
        });
        moreActionsNewIndex = -1;
      }

      var temp = {
        TEMP: 'TEMP'
      };

      if (moreActionsOldIndex !== -1) {
        this.actions.splice(moreActionsOldIndex, 1, temp);
      }

      if (moreActionsNewIndex !== -1) {
        this.actions.splice(moreActionsNewIndex, 0, this.MORE_ACTIONS);
      }

      var tempIndex = this.actions.indexOf(temp);

      if (tempIndex !== -1) {
        this.actions.splice(tempIndex, 1);
      }

      this.visibleActions = visible;
      this.moreActions = inDropDown;
      this.$timeout(function () {
        return _this3.updateMoreActions();
      });
    },
    initActions: function initActions(actionsController) {
      this.moreActionsController = actionsController;
      if (this.gridOptions) this.$set(this.gridOptions, 'moreActionsController', actionsController);
      this.updateMoreActions();
    },
    updateMoreActions: function updateMoreActions() {
      var _this4 = this;

      if (!this.moreActionsController) return;

      var actionsCount = _.filter(this.actions, function (act) {
        return act !== _this4.MORE_ACTIONS;
      }).length;

      if (this.moreActions.length < actionsCount) {
        this.moreActionsController.label = 'More Actions';
      } else if (this.moreActions.length === actionsCount) {
        this.moreActionsController.label = 'Actions';
      }

      var dict = {};
      this.moreActions.forEach(function (action) {
        dict[action.name] = {
          title: action.name,
          icon: 'icon-' + action.icon,
          disabled: _this4.isDisabled(action)
        };
      });
      this.moreActionsController.setActionsDictionary(dict);
      this.moreActionsController.setActions(_.map(this.moreActions, function (action) {
        return {
          name: action.name,
          visibleWhen: action.visibleWhen,
          action: action.callback
        };
      }));
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridBatchActionsComponentvue_type_script_lang_js_ = (JfGridBatchActionsComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue





/* normalize component */

var JfGridBatchActionsComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfGridBatchActionsComponentvue_type_script_lang_js_,
  JfGridBatchActionsComponentvue_type_template_id_d5129628_scoped_true_render,
  JfGridBatchActionsComponentvue_type_template_id_d5129628_scoped_true_staticRenderFns,
  false,
  null,
  "d5129628",
  null
  
)

/* harmony default export */ var JfGridBatchActionsComponent = (JfGridBatchActionsComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridPaginationComponent/index.vue?vue&type=template&id=8e132ec8&scoped=true&
var JfGridPaginationComponentvue_type_template_id_8e132ec8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.gridApi.pagination.getTotalPages())?_c('div',{staticClass:"grid-pagination text-right"},[_c('p',[_c('input',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip",value:('Jump to Page'),expression:"'Jump to Page'"},{name:"model",rawName:"v-model",value:(_vm.pageViewModel),expression:"pageViewModel"}],staticClass:"grid-page-box",style:({'width': (_vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + _vm.getTotalPages().toString().length * _vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}),attrs:{"type":"text"},domProps:{"value":(_vm.pageViewModel)},on:{"blur":function($event){return _vm.onBlur()},"input":[function($event){if($event.target.composing){ return; }_vm.pageViewModel=$event.target.value},function($event){return _vm.pageChanged()}]}}),_vm._v("\n            out of "+_vm._s(_vm.getTotalPages())+"\n            "),_c('a',{class:{disabled: _vm.currentPage === 1},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.prevPage()}}},[_vm._v("‹")]),_c('a',{class:{disabled: _vm.currentPage === _vm.gridApi.pagination.getTotalPages()},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.nextPage()}}},[_vm._v("›")])])]):_vm._e()])}
var JfGridPaginationComponentvue_type_template_id_8e132ec8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue?vue&type=template&id=8e132ec8&scoped=true&

// CONCATENATED MODULE: ./src/constants/general.constants.js
var GENERAL_CONSTANTS = {
  PAGINATION_DIGIT_WIDTH_PX: 8
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridPaginationComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfGridPaginationComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid-pagination',
  props: ['gridApi'],
  'jf@inject': ['$scope', '$timeout', 'JFrogEventBus'],
  data: function data() {
    return {
      CONSTANTS: {
        PAGINATION_DIGIT_WIDTH_PX: null
      },
      pageViewModel: 1,
      currentPage: 1
    };
  },
  created: function created() {
    var _this = this;

    this.CONSTANTS = GENERAL_CONSTANTS;
    this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, function () {
      return _this.resetPagination();
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    this.gridApi = this.$scope.gridApi;
    this.$timeout(function () {
      if (_this2.gridApi.pagination) {
        _this2.gridApi.pagination.on.paginationChanged(_this2.$scope, function (pageNum) {
          _this2.currentPage = pageNum;
          _this2.pageViewModel = _this2.currentPage;
        });
      }
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfGridPagination'
  },
  methods: {
    onBlur: function onBlur() {
      this.pageViewModel = parse_int_default()(this.pageViewModel);
      if (!this.pageViewModel) this.pageViewModel = this.currentPage;
    },
    pageChanged: function pageChanged() {
      this.pageViewModel = parse_int_default()(this.pageViewModel);
      if (this.pageViewModel !== 0 && !this.pageViewModel) return;
      this.currentPage = this.pageViewModel;
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.gridApi.pagination.getTotalPages()) this.currentPage = this.gridApi.pagination.getTotalPages();
      this.pageViewModel = this.currentPage;
      this.gridApi.pagination.seek(this.currentPage);
    },
    nextPage: function nextPage() {
      if (this.currentPage === this.gridApi.pagination.getTotalPages()) return;
      this.gridApi.pagination.nextPage();
      this.currentPage = this.gridApi.pagination.getPage();
    },
    prevPage: function prevPage() {
      this.gridApi.pagination.previousPage();
      this.currentPage = this.gridApi.pagination.getPage();
    },
    getTotalPages: function getTotalPages() {
      this.gridApi.pagination.seek(this.currentPage);
      return this.gridApi.pagination.getTotalPages();
    },
    resetPagination: function resetPagination() {
      this.gridApi.pagination.seek(1);
      this.currentPage = 1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridPaginationComponentvue_type_script_lang_js_ = (JfGridPaginationComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue





/* normalize component */

var JfGridPaginationComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfGridPaginationComponentvue_type_script_lang_js_,
  JfGridPaginationComponentvue_type_template_id_8e132ec8_scoped_true_render,
  JfGridPaginationComponentvue_type_template_id_8e132ec8_scoped_true_staticRenderFns,
  false,
  null,
  "8e132ec8",
  null
  
)

/* harmony default export */ var JfGridPaginationComponent = (JfGridPaginationComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridComponent/index.vue?vue&type=template&id=4274c67c&scoped=true&
var JfGridComponentvue_type_template_id_4274c67c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.gridOptions.data)?_c('div',{staticClass:"grid-container",class:{'single-select':_vm.gridOptions.allowSingleSelect},style:({overflow: _vm.gridOptions.moreActionsController.isDropdownOpen ? 'visible' : 'hidden'})},[(_vm.gridOptions.columnsCustomization)?_c('div',{staticClass:"columns-customization pull-right"},[_c('jf-multi-dropdown',{attrs:{"title":"Columns","filter-placeholder":"Filter Columns","items":_vm.gridOptions.availableColumns,"on-change":"gridOptions.updateCustomizedColumns()"}})],1):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.noPagination || !_vm.noCount || _vm.gridOptions.batchActions.length || _vm.filterField),expression:"!noPagination || !noCount || gridOptions.batchActions.length || filterField"}],staticClass:"wrapper-grid-actions"},[_c('div',{staticClass:"counter-and-filter"},[(!_vm.noCount)?_c('div',{staticClass:"grid-counter"},[_vm._v(_vm._s(_vm.getTotalRecords())),(_vm.getSelectedRecords())?_c('span',[_vm._v(" ("+_vm._s(_vm.getSelectedRecords())+" Selected)")]):_vm._e()]):_vm._e(),(_vm.filterField)?_c('div',{staticClass:"filter-group"},[_c('jf-grid-filter',{attrs:{"auto-focus":_vm.autoFocus,"filter-grid":"gridOptions","filter-field":_vm.filterField,"filter-field2":_vm.filterField2,"filter-on-change":_vm.filterOnChange}})],1):_vm._e()]),_c('jf-grid-pagination',{directives:[{name:"show",rawName:"v-show",value:(!_vm.noPagination),expression:"!noPagination"}],staticClass:"pull-right",attrs:{"grid-api":_vm.gridOptions.api}}),_c('jf-grid-batch-actions',{attrs:{"grid-options":_vm.gridOptions,"grid-api":_vm.gridOptions.api,"actions":_vm.gridOptions.batchActions}})],1),_c('div',{directives:[{name:"ui-grid-draggable-rows",rawName:"v-ui-grid-draggable-rows",value:(''),expression:"''"}],staticClass:"grid",style:({visibility: _vm.gridOptions.columnDefs.length ? 'visible' : 'hidden'}),attrs:{"ui-grid":"gridOptions","ui-grid-selection":"","ui-grid-pagination":"","ui-grid-grouping":"","ui-grid-edit":"","ui-grid-resize-columns":""}})]):_vm._e()])}
var JfGridComponentvue_type_template_id_4274c67c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue?vue&type=template&id=4274c67c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfGridComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid',
  props: ['gridOptions', 'filterField', 'filterField2', 'filterOnChange', 'autoFocus', 'objectName'],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridComponentvue_type_script_lang_js_ = (JfGridComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue





/* normalize component */

var JfGridComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfGridComponentvue_type_script_lang_js_,
  JfGridComponentvue_type_template_id_4274c67c_scoped_true_render,
  JfGridComponentvue_type_template_id_4274c67c_scoped_true_staticRenderFns,
  false,
  null,
  "4274c67c",
  null
  
)

/* harmony default export */ var JfGridComponent = (JfGridComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchComponent/index.vue?vue&type=template&id=6d0383ba&scoped=true&
var JfSwitchComponentvue_type_template_id_6d0383ba_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-switch",class:_vm.jfSwitchClass},[(_vm.jfSwitchTitle)?_c('span',{staticClass:"jf-switch-title"},[_vm._v(_vm._s(_vm.jfSwitchTitle))]):_vm._e(),(_vm.helpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.helpTooltip}}):_vm._e(),_c('ul',{staticClass:"jf-switch-options"},_vm._l((_vm.optionObjects),function(option,index){return _c('li',{key:index},[_c('a',{staticClass:"jf-switch-option",class:{active: _vm.isSelected(option), disabled: _vm.disabled},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.selectOption(option)}}},[_vm._v(_vm._s(option.text))])])}),0)],1)}
var JfSwitchComponentvue_type_template_id_6d0383ba_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=template&id=6d0383ba&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSwitchComponentvue_type_script_lang_js_ = ({
  name: 'jf-switch',
  props: ['jfSwitchTitle', 'options', 'value', 'disabled', 'helpTooltip', 'jfSwitchClass'],
  data: function data() {
    return {
      optionObjects: null
    };
  },
  mounted: function mounted() {
    if (!this.options) throw 'Must supply options'; // Supports 2 methods of options:
    // array of strings
    // array of objects of type {'value': ..., 'text': ...}
    // The model is assigned the value, and the text is displayed

    this.updateOptionObjects();
    if (_.isEmpty(this.value)) this.$emit('input', this.optionObjects[0].value);
  },
  methods: {
    updateOptionObjects: function updateOptionObjects() {
      this.optionObjects = this.options.map(function (option) {
        if (typeof option === 'string') return {
          value: option,
          text: option
        };else return option;
      });
    },
    selectOption: function selectOption(option) {
      if (this.disabled) return;
      this.$emit('input', option.value);
    },
    isSelected: function isSelected(option) {
      return this.value === option.value;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSwitchComponentvue_type_script_lang_js_ = (JfSwitchComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=style&index=0&id=6d0383ba&scoped=true&lang=less&
var JfSwitchComponentvue_type_style_index_0_id_6d0383ba_scoped_true_lang_less_ = __webpack_require__("6993");

// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue






/* normalize component */

var JfSwitchComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfSwitchComponentvue_type_script_lang_js_,
  JfSwitchComponentvue_type_template_id_6d0383ba_scoped_true_render,
  JfSwitchComponentvue_type_template_id_6d0383ba_scoped_true_staticRenderFns,
  false,
  null,
  "6d0383ba",
  null
  
)

/* harmony default export */ var JfSwitchComponent = (JfSwitchComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCheckboxComponent/index.vue?vue&type=template&id=fb11f60c&scoped=true&
var JfCheckboxComponentvue_type_template_id_fb11f60c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-checkbox"},[_c('label',[_c('span'),_vm._v(" "+_vm._s(_vm.text)+"\n    ")]),(_vm.helpTooltip && _vm.helpTooltip.length)?_c('jf-help-tooltip',{staticClass:"help-tooltip",attrs:{"text":_vm.helpTooltip}}):_vm._e()],1)}
var JfCheckboxComponentvue_type_template_id_fb11f60c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfCheckboxComponent/index.vue?vue&type=template&id=fb11f60c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCheckboxComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfCheckboxComponentvue_type_script_lang_js_ = ({
  name: 'jf-checkbox',
  props: {
    text: String,
    helpTooltip: String
  },
  'jf@inject': ['$element', '$transclude'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    this.$transclude(function (clone, vm) {
      _this.transcludedVM = vm;

      _this.$element.find('label').prepend(clone);
    });
  },
  updated: function updated() {
    if (this.transcludedVM) this.transcludedVM.$forceUpdate();
  },
  ng1_legacy: {
    'controllerAs': 'jfCheckbox'
  }
});
// CONCATENATED MODULE: ./src/components/JfCheckboxComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfCheckboxComponentvue_type_script_lang_js_ = (JfCheckboxComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfCheckboxComponent/index.vue?vue&type=style&index=0&id=fb11f60c&scoped=true&lang=less&
var JfCheckboxComponentvue_type_style_index_0_id_fb11f60c_scoped_true_lang_less_ = __webpack_require__("9806");

// CONCATENATED MODULE: ./src/components/JfCheckboxComponent/index.vue






/* normalize component */

var JfCheckboxComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfCheckboxComponentvue_type_script_lang_js_,
  JfCheckboxComponentvue_type_template_id_fb11f60c_scoped_true_render,
  JfCheckboxComponentvue_type_template_id_fb11f60c_scoped_true_staticRenderFns,
  false,
  null,
  "fb11f60c",
  null
  
)

/* harmony default export */ var JfCheckboxComponent = (JfCheckboxComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListMakerComponent/index.vue?vue&type=template&id=a7004292&scoped=true&
var JfListMakerComponentvue_type_template_id_a7004292_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-list-maker"},[(!_vm.hideAddNewFields)?_c('div',{staticClass:"list-new-value",class:{dropdown: _vm.predefinedValues}},[_c('div',[_c('jf-field',{attrs:{"validations":"common","dont-push-down-errors":true,"delayed-init":true}},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label))]):_vm._e(),(_vm.helpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.helpTooltip}}):_vm._e(),((_vm.inputType || 'text')==='checkbox'&&(!_vm.predefinedValues))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.newValue)?_vm._i(_vm.newValue,null)>-1:(_vm.newValue)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":function($event){_vm.errorMessage=null},"change":function($event){var $$a=_vm.newValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.newValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.newValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.newValue=$$c}}}}):((_vm.inputType || 'text')==='radio'&&(!_vm.predefinedValues))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":"radio"},domProps:{"checked":_vm._q(_vm.newValue,null)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":function($event){_vm.errorMessage=null},"change":function($event){_vm.newValue=null}}}):(!_vm.predefinedValues)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":_vm.inputType || 'text'},domProps:{"value":(_vm.newValue)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":[function($event){if($event.target.composing){ return; }_vm.newValue=$event.target.value},function($event){_vm.errorMessage=null}]}}):_vm._e(),(_vm.predefinedValues)?_c('jf-ui-select',{attrs:{"jf-select-placeholder":_vm.derivedPlaceHolder,"jf-select-disabled":_vm.disabled,"jf-select-options":_vm.predefinedValues},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v},expression:"newValue"}}):_vm._e()],1)],1),_c('div',{staticClass:"list-new-value-button"},[_c('i',{staticClass:"icon icon-plus-sign",attrs:{"disabled":_vm.addingNotAllowed},on:{"click":_vm.addValue}})])]):_vm._e(),(_vm.errorMessage)?_c('div',{staticClass:"jf-validation"},[_vm._v(_vm._s(_vm.errorMessage))]):_vm._e(),(_vm.int_values.length)?_c('div',{staticClass:"list-maker-list",attrs:{"id":_vm.int_listId}},_vm._l((_vm.int_values),function(value,index){return _c('div',{key:index,staticClass:"list-maker-list-row"},[_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"list-maker-row-value"},[_vm._v(_vm._s(value))]),_c('div',{staticClass:"list-maker-list-buttons"},[(_vm.int_values.length > _vm.int_minLength && !_vm.disabled)?_c('a',{staticClass:"icon icon-close",attrs:{"href":"","disabled":_vm.disabled},on:{"click":function($event){$event.preventDefault();return _vm.removeValue(index)}}}):_vm._e()])])}),0):_vm._e()])}
var JfListMakerComponentvue_type_template_id_a7004292_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=template&id=a7004292&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListMakerComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfListMakerComponentvue_type_script_lang_js_ = ({
  name: 'jf-list-maker',
  props: ['value', 'label', 'helpTooltip', 'objectName', 'disabled', 'noSort', 'minLength', 'inputType', 'predefinedValues', 'placeholder', 'listId', 'hideAddNewFields', 'validationRegex', 'validationRegexMessage', 'caseInsensitive'],
  data: function data() {
    return {
      newValue: "",
      errorMessage: null,
      derivedPlaceHolder: this.placeholder || "New ".concat(this.objectName || "Value"),
      // The three variables below are being added to avoid mutating the prop
      int_listId: this.listId,
      int_noSort: this.noSort || false,
      int_minLength: this.minLength || 0
    };
  },
  watch: {
    listId: function listId(changedValue) {
      this.int_listId = changedValue;
    },
    noSort: function noSort(changedValue) {
      this.int_noSort = changedValue;
    }
  },
  computed: {
    addingNotAllowed: function addingNotAllowed() {
      return this.disabled || !this.newValue || !this.newValue.length;
    },
    int_values: function int_values() {
      var int_values = this.value || [];
      this.int_noSort = this.noSort || this.$attrs.hasOwnProperty('noSort');

      if (int_values && !this.int_noSort) {
        int_values = lodash_default.a.sortBy(int_values);
      }

      return int_values;
    }
  },
  mounted: function mounted() {
    if (!this.int_listId) {
      var randomId = Math.floor(1000000000 * Math.random());
      this.int_listId = 'list-id-' + randomId;
    }
  },
  methods: {
    addValue: function addValue() {
      if (this.addingNotAllowed) {
        return;
      }

      this.errorMessage = null;

      if (lodash_default.a.isEmpty(this.newValue.trim())) {
        this.errorMessage = 'Must input value';
      } else if (!this._isValueUnique(this.newValue)) {
        this.errorMessage = 'Value already exists';
      } else if (!lodash_default.a.isEmpty(this.validationRegex) && !new RegExp(this.validationRegex).test(this.newValue)) {
        this.errorMessage = lodash_default.a.isEmpty(this.validationRegexMessage) ? 'Value not valid' : this.validationRegexMessage;
      } else {
        this.$emit('on-add-value', {
          newValue: this.newValue
        });
        this.int_values.push(this.newValue);
        this.newValue = "";
        this.$emit('on-after-add-value');
      }

      var returnValue = this.int_values;

      if (!this.int_noSort) {
        returnValue = lodash_default.a.sortBy(returnValue);
      }

      this.$emit('input', returnValue);
    },
    removeValue: function removeValue(index) {
      var copyOfValues = Object(toConsumableArray["a" /* default */])(this.int_values);

      copyOfValues.splice(index, 1);
      this.$emit('input', copyOfValues);
      this.$emit('on-after-delete-value');
    },
    _isValueUnique: function _isValueUnique(text) {
      if (this.caseInsensitive) {
        return !this.int_values || !lodash_default.a.find(this.int_values, function (val) {
          return val.toLowerCase() === text.toLowerCase();
        });
      }

      return !this.int_values || this.int_values.indexOf(text) == -1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfListMakerComponentvue_type_script_lang_js_ = (JfListMakerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=style&index=0&id=a7004292&scoped=true&lang=less&
var JfListMakerComponentvue_type_style_index_0_id_a7004292_scoped_true_lang_less_ = __webpack_require__("db6f");

// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue






/* normalize component */

var JfListMakerComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfListMakerComponentvue_type_script_lang_js_,
  JfListMakerComponentvue_type_template_id_a7004292_scoped_true_render,
  JfListMakerComponentvue_type_template_id_a7004292_scoped_true_staticRenderFns,
  false,
  null,
  "a7004292",
  null
  
)

/* harmony default export */ var JfListMakerComponent = (JfListMakerComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfHelpTooltipComponent/index.vue?vue&type=template&id=3badff9f&scoped=true&
var JfHelpTooltipComponentvue_type_template_id_3badff9f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-help-tooltip",attrs:{"v-jf-tooltip":_vm.html}},[_c('div',[_c('span',{staticClass:"tooltip-icon jf-tooltipster"},[_c('span',[_vm._t("default")],2)])])])}
var JfHelpTooltipComponentvue_type_template_id_3badff9f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=template&id=3badff9f&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfHelpTooltipComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfHelpTooltipComponentvue_type_script_lang_js_ = ({
  name: 'jf-help-tooltip',
  props: ['placement', 'text', 'html', 'maxWidth'],
  'jf@inject': ['$transclude'],
  data: function data() {
    return {};
  },
  ng1_legacy: {
    ng1postLinkFn: function ng1postLinkFn($scope, element, attrs, ctrl) {
      var content = ctrl.text || ctrl.html || ctrl.$transclude().html();
      if (!content) return;
      content = content.replace(/\n/g, '<br>');
      $(element).find('.jf-tooltipster').tooltipster({
        animation: 'fade',
        contentAsHTML: 'true',
        trigger: 'hover',
        onlyOne: 'true',
        interactive: 'true',
        interactiveTolerance: 500,
        maxWidth: ctrl.maxWidth || 600,
        position: ctrl.placement,
        theme: "tooltipster-default " + ctrl.placement,
        content: content,
        functionReady: function functionReady() {
          $(element).find('.jf-tooltipster').addClass('active');
        },
        functionAfter: function functionAfter() {
          $(element).find('.jf-tooltipster').removeClass('active');
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfHelpTooltipComponentvue_type_script_lang_js_ = (JfHelpTooltipComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=style&index=0&id=3badff9f&scoped=true&lang=less&
var JfHelpTooltipComponentvue_type_style_index_0_id_3badff9f_scoped_true_lang_less_ = __webpack_require__("24d2");

// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue






/* normalize component */

var JfHelpTooltipComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfHelpTooltipComponentvue_type_script_lang_js_,
  JfHelpTooltipComponentvue_type_template_id_3badff9f_scoped_true_render,
  JfHelpTooltipComponentvue_type_template_id_3badff9f_scoped_true_staticRenderFns,
  false,
  null,
  "3badff9f",
  null
  
)

/* harmony default export */ var JfHelpTooltipComponent = (JfHelpTooltipComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfActionsComponent/index.vue?vue&type=template&id=0319e8f4&scoped=true&
var JfActionsComponentvue_type_template_id_0319e8f4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.getActiveActionsCount()),expression:"getActiveActionsCount()"}],staticClass:"list-inline"},[_vm._l((_vm.fixedActions),function(actionObj,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(!actionObj.visibleWhen || actionObj.visibleWhen()),expression:"!actionObj.visibleWhen || actionObj.visibleWhen()"}],key:index,staticClass:"action-button",class:{disabled: actionObj.disabled || (actionObj.disabledWhen && actionObj.disabledWhen())},on:{"click":function($event){return _vm.doAction(actionObj,$event)}}},[_c('a',{attrs:{"href":actionObj.href,"download":""}},[_c('i',{staticClass:"action-icon icon",class:actionObj.icon}),_vm._v(" "+_vm._s(actionObj.title)+"\n            ")])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.dynamicActions.length),expression:"dynamicActions.length"}],staticClass:"action-button"},[_c('span',{staticClass:"dropdown",class:{ open: _vm.isDropdownOpen }},[_c('ul',{staticClass:"dropdown-menu dropdown-menu-right actions-dropdown text-left"},_vm._l((_vm.dynamicActions),function(actionObj,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:((!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden),expression:"(!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden"}],key:index,staticClass:"action-item dynamic-action"},[_c('a',{staticClass:"action-container",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.doAction(actionObj,$event)}}},[(actionObj.icon)?_c('span',{staticClass:"action-icon icon",class:actionObj.icon}):_vm._e(),(actionObj.image && !actionObj.icon)?_c('span',{staticClass:"action-icon"},[_c('img',{attrs:{"src":actionObj.image}})]):_vm._e(),_c('span',{staticClass:"action-name"},[_vm._v(_vm._s(actionObj.title))])])])}),0),_c('a',{staticClass:"dropdown-toggle actions-more",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.isDropdownOpen = !_vm.isDropdownOpen}}},[_vm._v("\n                    "+_vm._s(_vm.int_label)+" "),_c('i',{staticClass:"action-icon icon icon-small-arrow-down"})])])])],2)])}
var JfActionsComponentvue_type_template_id_0319e8f4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=template&id=0319e8f4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfActionsComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-actions',
  props: ['label', 'initMethod', 'fixedActionsNames', 'disableMouseOverEvents', 'showDropDownForOneItem'],
  data: function data() {
    return {
      fixedActions: [],
      dynamicActions: [],
      isDropdownOpen: false,
      anyActionHasAnIcon: false,
      actionsList: {
        actions: []
      },
      int_label: this.label || 'Actions',
      clicked: false,
      stayOpened: false
    };
  },
  computed: {
    hasSingleVisibleAction: function hasSingleVisibleAction() {
      return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
    }
  },
  watch: {
    actionsList: function actionsList(newVal) {
      console.log("in watch for actions");

      this._divideActions();
    },
    isDropdownOpen: function isDropdownOpen(newVal) {
      if (!newVal && this.clicked) {
        this.isDropdownOpen = true;
        this.clicked = false;
        this.stayOpened = true;
      } else if (!newVal && this.stayOpened) {
        this.stayOpened = false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var thisComponent = this;

    if (!thisComponent.initMethod || !thisComponent.$parent[thisComponent.initMethod]) {
      console.error('jfActions: Missing init-method attribute');
      return;
    } else {
      thisComponent.$parent[thisComponent.initMethod](thisComponent);
    }

    this.intervalId = setInterval(function () {
      thisComponent._divideActions();
    }, 2000);
    thisComponent.$watch('hasSingleVisibleAction', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        thisComponent._divideActions();
      }
    });
    var dropdownOver = false;
    var buttonOver = false;
    var $dropdownElement = thisComponent.$element.find('.actions-more');
    var $buttonElement = thisComponent.$element.find('.action-button');

    if (!thisComponent.disableMouseOverEvents) {
      $dropdownElement.on('mouseup', function () {
        if (!thisComponent.stayOpened) {
          thisComponent.clicked = true;
        }
      });
      $dropdownElement.on('mouseenter', function () {
        buttonOver = true;

        thisComponent._toggleDropdown(true);
      });
      $dropdownElement.on('mouseleave', function () {
        buttonOver = false;

        if (!thisComponent.stayOpened) {
          thisComponent._toggleDropdown(dropdownOver);
        }
      });
      $buttonElement.on('mouseenter', function () {
        dropdownOver = true;

        thisComponent._toggleDropdown(true);
      });
      $buttonElement.on('mouseleave', function () {
        dropdownOver = false;

        if (!thisComponent.stayOpened) {
          setTimeout(function () {
            thisComponent._toggleDropdown(buttonOver || dropdownOver);
          }, 200);
        }
      });
    }

    this.showDropdown = function () {
      _this.stayOpened = true;
      _this.clicked = true;
      buttonOver = true;
      dropdownOver = true;

      _this._toggleDropdown(true);
    };

    this.hideDropdown = function () {
      _this.stayOpened = false;
      _this.clicked = false;
      buttonOver = false;
      dropdownOver = false;

      _this._toggleDropdown(false);
    };
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.intervalId);

    if (!this.disableMouseOverEvents) {
      var $dropdownElement = this.$element.find('.actions-more');
      var $buttonElement = this.$element.find('.action-button');
      $dropdownElement.off('mouseup');
      $dropdownElement.off('mouseenter');
      $dropdownElement.off('mouseleave');
      $buttonElement.off('mouseenter');
      $buttonElement.off('mouseleave');
    }
  },
  methods: {
    setActionsHandler: function setActionsHandler(actionsHandler) {
      this.actionsHandler = actionsHandler;
    },
    setCurrentEntity: function setCurrentEntity(entity) {
      this.currentEntity = entity;
    },
    setActionsDictionary: function setActionsDictionary(actionsDictionary) {
      this.actionsDictionary = actionsDictionary;

      this._transformActionsData();
    },
    setActions: function setActions(actions) {
      this.actionsList.actions = actions;

      this._transformActionsData();
    },
    doAction: function doAction(actionObj, e) {
      if (actionObj.disabled || actionObj.disabledWhen && actionObj.disabledWhen()) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      if (actionObj.name === 'Download' && actionObj.xrayShouldValidate) {
        e.preventDefault();
      }

      if (this.actionsHandler) {
        this.actionsHandler.perform(actionObj, this.currentEntity);
      } else if (actionObj.action) {
        actionObj.action(this.currentEntity);
      }
    },
    getActiveActionsCount: function getActiveActionsCount() {
      if (!this.actionsList.actions || !this.actionsList.actions.length) return 0;
      return _.filter(this.actionsList.actions, function (act) {
        return !act.visibleWhen || act.visibleWhen();
      }).length;
    },
    _toggleDropdown: function _toggleDropdown(isOpen) {
      var _this2 = this;

      setTimeout(function () {
        _this2.isDropdownOpen = isOpen;
      }, 10);
    },
    _transformActionsData: function _transformActionsData() {
      var _this3 = this;

      if (!this.actionsDictionary || !this.actionsList) {
        return;
      } // extend action properties from ACTIONS dictionary


      this.actionsList.actions.forEach(function (actionObj) {
        if (!_this3.actionsDictionary[actionObj.name]) {
          console.log('Unrecognized action', actionObj.name);
          return true;
        }

        Vue.util.extend(actionObj, _this3.actionsDictionary[actionObj.name]);
      }); // Divide actions to fixed and dynamic (dropdown)

      this._divideActions();
    },
    _divideActions: function _divideActions() {
      var _this4 = this;

      this.fixedActions = [];
      this.dynamicActions = [];

      if (this.hasSingleVisibleAction) {
        this.fixedActions.push(this.actionsList.actions.find(function (action) {
          return action.visibleWhen();
        }));
        return;
      }

      _.forEach(this.actionsList.actions, function (actionObj) {
        if (_.includes(_this4.fixedActionsNames, actionObj.name)) {
          _this4.fixedActions.push(actionObj);
        } else {
          _this4.dynamicActions.push(actionObj);

          _this4.anyActionHasAnIcon = _this4.anyActionHasAnIcon || !!actionObj.icon;
        }
      });

      if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
        this.fixedActions.push(this.dynamicActions.pop());
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfActionsComponentvue_type_script_lang_js_ = (JfActionsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=style&index=0&id=0319e8f4&scoped=true&lang=less&
var JfActionsComponentvue_type_style_index_0_id_0319e8f4_scoped_true_lang_less_ = __webpack_require__("36a9");

// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue






/* normalize component */

var JfActionsComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfActionsComponentvue_type_script_lang_js_,
  JfActionsComponentvue_type_template_id_0319e8f4_scoped_true_render,
  JfActionsComponentvue_type_template_id_0319e8f4_scoped_true_staticRenderFns,
  false,
  null,
  "0319e8f4",
  null
  
)

/* harmony default export */ var JfActionsComponent = (JfActionsComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropPaginationComponent/index.vue?vue&type=template&id=2fe0a935&scoped=true&
var JfDragDropPaginationComponentvue_type_template_id_2fe0a935_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.paginationApi.getTotalPages())?_c('div',{staticClass:"grid-pagination text-right"},[_c('p',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pageViewModel),expression:"pageViewModel"}],staticClass:"grid-page-box",style:({'width': (_vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + _vm.paginationApi.getTotalPages().toString().length * _vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}),attrs:{"type":"text","jf-tooltip":"Jump to Page"},domProps:{"value":(_vm.pageViewModel)},on:{"blur":function($event){return _vm.onBlur()},"input":[function($event){if($event.target.composing){ return; }_vm.pageViewModel=$event.target.value},function($event){return _vm.pageChanged()}]}}),_vm._v("\n            out of "+_vm._s(_vm.paginationApi.getTotalPages())+"\n            "),_c('a',{class:{disabled: _vm.currentPage === 1},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.prevPage()}}},[_vm._v("‹")]),_c('a',{class:{disabled: _vm.currentPage === _vm.paginationApi.getTotalPages()},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.nextPage()}}},[_vm._v("›")])])]):_vm._e()])}
var JfDragDropPaginationComponentvue_type_template_id_2fe0a935_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue?vue&type=template&id=2fe0a935&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropPaginationComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfDragDropPaginationComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-drop-pagination',
  props: ['paginationApi'],
  data: function data() {
    return {
      pageViewModel: 1,
      currentPage: this.paginationApi && this.paginationApi.currentPage ? this.paginationApi.currentPage : 0
    };
  },
  created: function created() {
    this.CONSTANTS = _.extend({
      PAGINATION_DIGIT_WIDTH_PX: null
    }, GENERAL_CONSTANTS);
  },
  mounted: function mounted() {
    var _this = this;

    if (this.paginationApi) {
      this.currentPage = this.paginationApi.getCurrentPage();
      this.pageViewModel = this.currentPage;
      this.paginationApi.registerChangeListener(function (pageNum) {
        _this.currentPage = pageNum;
        _this.pageViewModel = _this.currentPage;
      });
    }
  },
  methods: {
    onBlur: function onBlur() {
      this.pageViewModel = parse_int_default()(this.pageViewModel);
      if (!this.pageViewModel) this.pageViewModel = this.currentPage;
    },
    pageChanged: function pageChanged() {
      this.pageViewModel = parse_int_default()(this.pageViewModel);
      if (this.pageViewModel !== 0 && !this.pageViewModel) return;
      this.currentPage = this.pageViewModel;
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.paginationApi.getTotalPages()) this.currentPage = this.paginationApi.getTotalPages();
      this.pageViewModel = this.currentPage;
      this.paginationApi.setPage(this.currentPage);
    },
    nextPage: function nextPage() {
      this.paginationApi.nextPage();
      this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
    },
    prevPage: function prevPage() {
      this.paginationApi.prevPage();
      this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragDropPaginationComponentvue_type_script_lang_js_ = (JfDragDropPaginationComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue





/* normalize component */

var JfDragDropPaginationComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDragDropPaginationComponentvue_type_script_lang_js_,
  JfDragDropPaginationComponentvue_type_template_id_2fe0a935_scoped_true_render,
  JfDragDropPaginationComponentvue_type_template_id_2fe0a935_scoped_true_staticRenderFns,
  false,
  null,
  "2fe0a935",
  null
  
)

/* harmony default export */ var JfDragDropPaginationComponent = (JfDragDropPaginationComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropComponent/index.vue?vue&type=template&id=e4050446&scoped=true&
var JfDragDropComponentvue_type_template_id_e4050446_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"dnd-panel",attrs:{"tabindex":"0"},on:{"keydown":function($event){return _vm.onKeyDown($event)}}},[_c('div',{staticClass:"row dnd-filter-wrapper"},[_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterExcludeList),expression:"filterExcludeList"}],staticClass:"input-text dnd-filter",style:({color:_vm.noMatches ? 'red' : 'black'}),attrs:{"type":"text","ng-model-options":"{debounce: 200}","placeholder":"Filter...","disabled":_vm.disabled},domProps:{"value":(_vm.filterExcludeList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterExcludeList=$event.target.value},function($event){return _vm.updateExcludeFilter(true)}]}})]),_c('div',{staticClass:"col-lg-2 col-md-2 col-sm-2"}),_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterIncludeList),expression:"filterIncludeList"}],staticClass:"input-text dnd-filter",style:({color:_vm.noIncludeMatches ? 'red' : 'black'}),attrs:{"type":"text","ng-model-options":"{debounce: 200}","placeholder":"Filter...","disabled":_vm.disabled},domProps:{"value":(_vm.filterIncludeList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterIncludeList=$event.target.value},function($event){return _vm.updateIncludeFilter(true)}]}})])]),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[(_vm.headers.leftTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v("\n                    "+_vm._s(_vm.headers.leftTitle)+"\n                ")]):_vm._e(),_c('div',{staticClass:"dnd-list-wrapper",attrs:{"id":_vm.excludeListId},on:{"mouseenter":function($event){return _vm.mouseIsInExclude(true)},"mouseleave":function($event){return _vm.mouseIsInExclude(false)}}},[_c('ul',{staticClass:"dnd-list"},_vm._l((_vm.getViewableExcludes()),function(item,$index){return _c('li',{staticClass:"drag-item",class:{'drag-placeholder':item===_vm.PLACEHOLDER, 'active' : _vm.isSelected(item)},attrs:{"data-index":'exc-' + $index},on:{"click":function($event){return _vm.toggleSelection(item)},"dblclick":function($event){return _vm.includeSpecific(item)},"mouseenter":function($event){return _vm.mouseOver(item)},"mouseleave":function($event){return _vm.mouseOver(null)}}},[(item !== _vm.PLACEHOLDER && !_vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),_vm._v("\n                                "+_vm._s(_vm.excludeDisplayField && item[_vm.excludeDisplayField] ? item[_vm.excludeDisplayField] : item)+"\n                            ")]):_vm._e(),(item !== _vm.PLACEHOLDER && _vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),(_vm.customTemplate)?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.compileCustomTemplate(item,'exc')),expression:"compileCustomTemplate(item,'exc')"}],staticClass:"custom-template"}):_vm._e()]):_vm._e(),(item === _vm.PLACEHOLDER)?_c('div',{staticClass:"drag-item-text"}):_vm._e()])}),0)]),_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.excludesPaginationApi}})],1),_c('div',{staticClass:"col-lg-2 col-md-2 col-sm-2"},[(_vm.headers.leftTitle || _vm.headers.rightTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v(" ")]):_vm._e(),_c('ul',{staticClass:"dnd-actions"},[_c('li',[_c('span',{attrs:{"disabled":_vm.isIncludeListEmpty() || _vm.isIncludeListFixed() || _vm.disabled},on:{"click":function($event){return _vm.excludeAll()}}},[_vm._v("«\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":!_vm.isIncludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.excludeSelected()}}},[_vm._v("‹\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":!_vm.isExcludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.includeSelected()}}},[_vm._v("›\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":_vm.isExcludeListEmpty() || _vm.disabled},on:{"click":function($event){return _vm.includeAll()}}},[_vm._v("»\n                    ")])])])]),_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[(_vm.headers.rightTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm.headers.rightTitle)+"\n                ")]):_vm._e(),_c('div',{staticClass:"dnd-list-wrapper",attrs:{"id":_vm.includeListId},on:{"mouseenter":function($event){return _vm.mouseIsInInclude(true)},"mouseleave":function($event){return _vm.mouseIsInInclude(false)}}},[_c('ul',{staticClass:"dnd-list dnd-list-fullheight"},_vm._l((_vm.getViewableIncludes()),function(item,$index){return _c('li',{staticClass:"drag-item dropped-item",class:{'drag-placeholder':item===_vm.PLACEHOLDER, 'active' : _vm.isSelected(item)},attrs:{"data-index":'inc-' + $index},on:{"click":function($event){!$event.defaultPrevented ? (_vm.toggleSelection(item)) : ''},"dblclick":function($event){return _vm.excludeSpecific(item)},"mouseenter":function($event){return _vm.mouseOver(item)},"mouseleave":function($event){return _vm.mouseOver(null)}}},[(item !== _vm.PLACEHOLDER && !_vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),_vm._v("\n                                "+_vm._s(_vm.includeDisplayField && item[_vm.includeDisplayField] ? item[_vm.includeDisplayField] : item)+"\n                            ")]):_vm._e(),(item !== _vm.PLACEHOLDER && _vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),(_vm.customTemplate)?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.compileCustomTemplate(item,'inc')),expression:"compileCustomTemplate(item,'inc')"}],staticClass:"custom-template"}):_vm._e()]):_vm._e(),(item === _vm.PLACEHOLDER)?_c('div',{staticClass:"drag-item-text"}):_vm._e(),(item && item !== _vm.PLACEHOLDER && !item['__fixed__'] && !_vm.disabled)?_c('a',{staticClass:"delete-drop-item",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();_vm.excludeSpecific(item);$event.stopPropagation();$event.preventDefault();}}},[_vm._v("✕")]):_vm._e()])}),0)]),_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.includesPaginationApi}})],1)]),_c('div',{staticClass:"clearfix"})])])}
var JfDragDropComponentvue_type_template_id_e4050446_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue?vue&type=template&id=e4050446&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfDragDropComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-drop',
  props: ['includeList', 'excludeList', 'includeDisplayField', 'excludeDisplayField', 'includeListId', 'excludeListId', 'objectsName', 'headers', 'customTemplate', 'customTemplateScope', 'usePagination', 'commObject', 'disabled'],
  'jf@inject': ['$attrs', '$interval', '$element', '$scope', '$timeout', '$compile'],
  data: function data() {
    return {
      noMatches: null,
      filterExcludeList: null,
      noIncludeMatches: null,
      filterIncludeList: null,
      PLACEHOLDER: {
        '@@@DNDPH@@@': '@@@DNDPH@@@'
      },
      excludesPaginationApi: null,
      includesPaginationApi: null
    };
  },
  created: function created() {
    this.draggedObject = null;
    this.selectedItems = [];
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.includeList) this.includeList = [];

    _.remove(this.excludeList, function (excludeItem) {
      return _.find(_this.includeList, function (includeItem) {
        return angular.equals(includeItem, excludeItem);
      });
    });

    if (this.usePagination) {
      this._initPagination();
    }

    var randomId = Math.floor(1000000000 * Math.random());
    if (!this.includeListId) this.includeListId = 'include-list-' + randomId;
    if (!this.excludeListId) this.excludeListId = 'exclude-list-' + randomId;

    if (this.commObject) {
      _.extend(this.commObject, {
        updateFilter: function updateFilter() {
          return _this.updateFilter();
        },
        excludeAll: function excludeAll() {
          return _this.excludeAll();
        },
        excludeSelected: function excludeSelected() {
          return _this.excludeSelected();
        },
        excludeSpecific: function excludeSpecific(item) {
          return _this.excludeSelected(item);
        },
        includeAll: function includeAll() {
          return _this.includeAll();
        },
        includeSelected: function includeSelected() {
          return _this.includeSelected();
        },
        includeSpecific: function includeSpecific(item) {
          return _this.includeSelected(item);
        }
      });
    }

    this._initWatchers();
  },
  ng1_legacy: {
    ng1postLinkFn: function ng1postLinkFn($scope, $element) {
      $($element).on('mouseenter', '.drag-item-text', function (e) {
        var dragItem = $(e.target);

        if (dragItem.hasClass('drag-item-text')) {
          if (dragItem[0].scrollWidth > dragItem.innerWidth()) {
            if (!dragItem.hasClass('tooltipstered')) {
              dragItem.tooltipster({
                animation: 'fade',
                trigger: 'hover',
                onlyOne: 'true',
                interactive: 'true',
                position: 'bottom',
                theme: 'tooltipster-default bottom',
                content: dragItem.text().trim()
              });
              dragItem.tooltipster('show');
            } else {
              dragItem.tooltipster('enable');
              if (dragItem.tooltipster('content') != dragItem.text().trim()) dragItem.tooltipster('content', dragItem.text().trim());
            }
          } else if (dragItem.hasClass('tooltipstered')) dragItem.tooltipster('disable');
        }
      });
    },
    'controllerAs': 'jfDragDrop'
  },
  methods: {
    _initWatchers: function _initWatchers() {
      var _this2 = this;

      // we don't use this.updateFilter() for performance, we want to update only include list when original include list is update
      this.$scope.$watch('jfDragDrop.includeList', function () {
        _this2.filterIncludeCache = _.filter(_this2.includeList, function (item) {
          return !_this2._isExcludeFilteredOut(item);
        });
      }, true);
      this.$scope.$watch('jfDragDrop.excludeList', function () {
        _this2.filterExcludeCache = _.filter(_this2.excludeList, function (item) {
          return !_this2._isIncludeFilteredOut(item);
        });
      }, true);
    },
    excludeAll: function excludeAll() {
      var _this3 = this;

      if (this.disabled || this.isIncludeListEmpty() || this.isIncludeListFixed()) return;
      var filteredOut = [];
      this.includeList.forEach(function (item) {
        if (_.isObject(item)) {
          item['__fixed__'] = undefined;
        }

        if (_this3.filterIncludeList) {
          if (_this3._isExcludeFilteredOut(item)) {
            filteredOut.push(item);
          } else {
            _this3.excludeList.push(item);
          }
        } else {
          _this3.excludeList.push(item);
        }
      });
      this.includeList = filteredOut;

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$timeout(function () {
        _this3.$emit('on-change');
      });
    },
    excludeSelected: function excludeSelected() {
      var _this4 = this;

      if (this.disabled || !this.isIncludeListItemSelected()) return;

      this._filterSelection('inc');

      this.selectedItems.forEach(function (item) {
        if (!_.isObject(item) || !item['__fixed__']) {
          _this4.includeList.splice(_this4.includeList.indexOf(item), 1);

          if (_this4.excludeList.indexOf(item) < 0) {
            _this4.excludeList.push(item);
          }
        }
      });

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    excludeSpecific: function excludeSpecific(item) {
      if (this.disabled || item['__fixed__']) return;
      var picked;

      for (var i = this.includeList.length - 1; i >= 0; i--) {
        if (this.includeList[i] == item) {
          picked = this.includeList.splice(i, 1)[0];

          this._removeItemFromSelection(picked);

          break;
        }
      }

      if (picked) {
        this.excludeList.push(picked);
      }

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    includeSpecific: function includeSpecific(item) {
      if (this.disabled) return;
      var picked;

      for (var i = this.excludeList.length - 1; i >= 0; i--) {
        if (this.excludeList[i] == item) {
          picked = this.excludeList.splice(i, 1)[0];

          this._removeItemFromSelection(picked);

          break;
        }
      }

      if (picked) {
        if (_.isObject(picked)) {
          picked['__fixed__'] = undefined;
        }

        this.includeList.push(picked);
      }

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    includeAll: function includeAll() {
      var _this5 = this;

      if (this.disabled || this.isExcludeListEmpty()) return;
      var filteredOut = [];
      this.excludeList.forEach(function (item) {
        if (_.isObject(item)) {
          item['__fixed__'] = undefined;
        }

        if (_this5.filterExcludeList) {
          if (_this5._isIncludeFilteredOut(item)) {
            filteredOut.push(item);
          } else {
            _this5.includeList.push(item);
          }
        } else {
          _this5.includeList.push(item);
        }
      });
      this.excludeList = filteredOut;

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$timeout(function () {
        _this5.$emit('on-change');
      });
    },
    includeSelected: function includeSelected() {
      var _this6 = this;

      if (this.disabled || !this.isExcludeListItemSelected()) return;

      this._filterSelection('exc');

      if (!this.includeList) {
        this.includeList = [];
      }

      if (this.excludeList.length) {
        this.selectedItems.forEach(function (item) {
          if (_.isObject(item)) {
            item['__fixed__'] = undefined;
          }

          _this6.excludeList.splice(_this6.excludeList.indexOf(item), 1);

          if (_this6.includeList.indexOf(item) < 0) {
            _this6.includeList.push(item);
          }
        });
      }

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    toggleSelection: function toggleSelection(item) {
      if (this.disabled) return;

      var index = this._inSelectedItems(item);

      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        if (!_.isObject(item) || !item['__fixed__'] || this.includeList.indexOf(item) < 0) {
          this.selectedItems.push(item);
        }
      }

      var scrollParent = $(this.$element[0].querySelector('.dnd-panel')).scrollParent();
      var tempScrollTop = scrollParent.scrollTop();
      this.$element[0].querySelector('.dnd-panel').focus();
      scrollParent.scrollTop(tempScrollTop);
    },
    isIncludeListItemSelected: function isIncludeListItemSelected() {
      var found = false;

      if (this.includeList) {
        for (var i = 0; i < this.includeList.length; i++) {
          if (this.selectedItems.indexOf(this.includeList[i]) > -1) {
            found = true;
            break;
          }
        }
      }

      return found;
    },
    isExcludeListItemSelected: function isExcludeListItemSelected() {
      var found = false;

      if (this.excludeList) {
        for (var i = 0; i < this.excludeList.length; i++) {
          if (this.selectedItems.indexOf(this.excludeList[i]) > -1) {
            found = true;
            break;
          }
        }
      }

      return found;
    },
    isExcludeListEmpty: function isExcludeListEmpty() {
      if (!this.excludeList || !this.excludeList.length) return true; //        else if (!this.filterList) return false;

      var empty = true;

      for (var i in this.excludeList) {
        var item = this.excludeList[i];

        if (!this._isIncludeFilteredOut(item) && item !== this.PLACEHOLDER) {
          empty = false;
          break;
        }
      }

      return empty;
    },
    isIncludeListEmpty: function isIncludeListEmpty() {
      if (!this.includeList || !this.includeList.length) return true;
      var empty = true;

      for (var i in this.includeList) {
        var item = this.includeList[i];

        if (!this._isExcludeFilteredOut(item) && item !== this.PLACEHOLDER) {
          empty = false;
          break;
        }
      }

      return empty;
    },
    isIncludeListFixed: function isIncludeListFixed() {
      if (this.includeList) {
        var fixed = true;

        for (var i in this.includeList) {
          var item = this.includeList[i];

          if (!_.isObject(item) || !item['__fixed__']) {
            fixed = false;
            break;
          }
        }

        ; //            return _.filter(this.includeList,{'__fixed__':undefined}).length === 0;

        return fixed;
      }
    },
    isSelected: function isSelected(item) {
      return this._inSelectedItems(item) > -1;
    },
    _removeItemFromSelection: function _removeItemFromSelection(item) {
      var index = this.selectedItems.indexOf(item);

      if (index >= 0) {
        this.selectedItems.splice(index, 1);
      }
    },
    _inSelectedItems: function _inSelectedItems(item) {
      return this.selectedItems.indexOf(item);
    },
    _clearSelectedItems: function _clearSelectedItems() {
      this.selectedItems = [];
    },
    _isIncludeFilteredOut: function _isIncludeFilteredOut(item) {
      if (!this.filterExcludeList || item === '' || item === this.PLACEHOLDER) return false;
      var regex = new RegExp('.*' + this.filterExcludeList.split('*').join('.*') + '.*', 'i');
      return !regex.test(this.excludeDisplayField && item[this.excludeDisplayField] ? item[this.excludeDisplayField] : item);
    },
    _isExcludeFilteredOut: function _isExcludeFilteredOut(item) {
      if (!this.filterIncludeList || item === '' || item === this.PLACEHOLDER) return false;
      var regex = new RegExp('.*' + this.filterIncludeList.split('*').join('.*') + '.*', 'i');
      return !regex.test(this.includeDisplayField && item[this.includeDisplayField] ? item[this.includeDisplayField] : item);
    },
    updateExcludeFilter: function updateExcludeFilter() {
      var _this7 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterExcludeCache = _.filter(this.excludeList, function (item) {
        return !_this7._isIncludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    updateIncludeFilter: function updateIncludeFilter() {
      var _this8 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterIncludeCache = _.filter(this.includeList, function (item) {
        return !_this8._isExcludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    updateFilter: function updateFilter() {
      var _this9 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterExcludeCache = _.filter(this.excludeList, function (item) {
        return !_this9._isIncludeFilteredOut(item);
      });
      this.filterIncludeCache = _.filter(this.includeList, function (item) {
        return !_this9._isExcludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    getFilteredExcludeList: function getFilteredExcludeList() {
      var ret = this.filterExcludeCache || this.excludeList;
      this.noExcludeMatches = this.excludeList && this.excludeList.length && !ret.length;
      return ret;
    },
    getFilteredIncludeList: function getFilteredIncludeList() {
      var ret = this.filterIncludeCache || this.includeList;
      this.noIncludeMatches = this.includeList && this.includeList.length && !ret.length;
      return ret;
    },
    _dragStart: function _dragStart(event, ui) {
      var dragObj = this._objectFromElement(event.target);

      if (this.disabled || dragObj.draggedFrom === this.includeList && _.isObject(dragObj.dataObject) && dragObj.dataObject['__fixed__']) {
        event.preventDefault();
        return;
      }

      this._initDragObject(dragObj);

      this._initDragHelper(ui.helper);

      this._dragAdditionals();

      this._insertPlaceHolder(this.draggedObject.draggedFrom, this.draggedObject.index);

      this.updateFilter();
      this.$scope.$apply();
    },
    _initDragObject: function _initDragObject(dragObj) {
      this.draggedObject = dragObj;
      dragObj.draggedFrom.splice(dragObj.index, 1);
      this.$scope.$apply();
    },
    _initDragHelper: function _initDragHelper(helper) {
      this.draggedObject.helper = helper;
      helper.addClass('drag-helper');
      var xicon = helper.find('.delete-drop-item');
      if (xicon) xicon.remove();
    },
    _dragAdditionals: function _dragAdditionals() {
      var _this10 = this;

      if (this.selectedItems.length) {
        //remove dragged object from selection, leave only additionals
        if (this._inSelectedItems(this.draggedObject.dataObject) >= 0) this.toggleSelection(this.draggedObject.dataObject);
        this.draggedObject.additionals = []; //only add to additionals the selected items from the draggedFrom array, and not filtered out.

        this.selectedItems.forEach(function (selected) {
          var index;
          if (_this10.draggedObject.draggedFrom === _this10.excludeList) index = _this10.getFilteredExcludeList().indexOf(selected);else index = _this10.draggedObject.draggedFrom.indexOf(selected);

          if (index >= 0) {
            _this10.draggedObject.additionals.push(selected);
          }
        });

        this._clearSelectedItems();

        this.$scope.$apply(function () {
          _this10.draggedObject.additionals.forEach(function (selected) {
            _this10.draggedObject.draggedFrom.splice(_this10.draggedObject.draggedFrom.indexOf(selected), 1);
          });

          if (_this10.draggedObject.additionals.length > 0) _this10.draggedObject.helper.addClass('multiple').html("<span>\u2261</span>" + (1 + _this10.draggedObject.additionals.length) + ' ' + (_this10.objectsName ? _this10.objectsName : 'Items'));
        });
      }
    },
    _dragStop: function _dragStop(event, ui) {
      var _this11 = this;

      if (this.draggedObject) {
        var ph = this._removePlaceHolder(); //console.log('mouseInExclude: '+this.mouseInExclude, 'mouseInInclude: '+this.mouseInInclude);


        if (this.mouseInExclude || this.mouseInInclude) {
          var droppedInArray = this.mouseInExclude ? this.excludeList : this.includeList;

          if (ph && ph.array === droppedInArray) {
            droppedInArray.splice(ph.index, 0, this.draggedObject.dataObject);
          } else {
            droppedInArray.push(this.draggedObject.dataObject);
          }
        } else {
          this.draggedObject.draggedFrom.splice(this.draggedObject.index, 0, this.draggedObject.dataObject);
        }

        if (_.isObject(this.draggedObject.dataObject)) {
          this.draggedObject.dataObject['__fixed__'] = undefined;
        }

        this._stopScrollInterval();

        this.$scope.$apply();

        this._undragAdditionals(ph.index + 1);

        this._initDragAndDropOnElement(this._elementFromObject(this.draggedObject.dataObject));

        this.draggedObject = null;

        this._clearSelectedItems();

        this.$timeout(function () {
          _this11.updateFilter();
        });

        this._updatePagination();

        this.$emit('on-change');
      }
    },
    _dragMove: function _dragMove(event, ui) {
      var _this12 = this;

      this.$scope.$apply(function () {
        var list_element = $(event.originalEvent.target);
        if (!list_element.hasClass('dnd-list-wrapper')) list_element = list_element.parents('.dnd-list-wrapper');

        if (list_element && list_element.hasClass('dnd-list-wrapper')) {
          var dragOffsetY = event.pageY - list_element.offset().top;
          if (list_element.scrollTop() > 0 && dragOffsetY > 0 && dragOffsetY < 20 && !_this12.scrollInterval) //this.scrollInterval = this.$interval(() => {
            list_element.scrollTop(list_element.scrollTop() - 5); //}, 50);
          else if (dragOffsetY > list_element.outerHeight() - 20 && dragOffsetY < list_element.outerHeight() && !_this12.scrollInterval) //this.scrollInterval = this.$interval(() => {
              list_element.scrollTop(list_element.scrollTop() + 5); //}, 50);
          //else
          //    this._stopScrollInterval();
        } //else
        //    this._stopScrollInterval();

      });
    },
    _stopScrollInterval: function _stopScrollInterval() {
      if (this.scrollInterval) {
        this.$interval.cancel(this.scrollInterval);
        this.scrollInterval = null;
      }
    },
    _undragAdditionals: function _undragAdditionals(startIndex) {
      var _this13 = this;

      if (this.draggedObject.additionals) {
        var next = startIndex;
        this.$scope.$apply(function () {
          _this13.draggedObject.additionals.forEach(function (additional) {
            if (_this13.mouseInInclude) {
              _this13.includeList.splice(next, 0, additional);
            } else if (_this13.mouseInExclude) {
              _this13.excludeList.splice(next, 0, additional);
            } else {
              _this13.draggedObject.draggedFrom.splice(next, 0, additional);
            }

            if (_.isObject(additional)) {
              additional['__fixed__'] = undefined;
            } //                this.$scope.$apply();


            _this13._initDragAndDropOnElement(_this13._elementFromObject(additional));

            next++;
          });
        });
      }
    },
    _initDragAndDropOnElement: function _initDragAndDropOnElement(elem) {
      var _this14 = this;

      if (!elem || elem.hasClass('drag-enabled')) return;
      elem.draggable({
        helper: 'clone',
        cursorAt: {
          left: -5,
          top: -5
        },
        scroll: false,
        distance: 10,
        start: function start(event, ui) {
          return _this14._dragStart(event, ui);
        },
        stop: function stop(event, ui) {
          return _this14._dragStop(event, ui);
        },
        drag: function drag(event, ui) {
          return _this14._dragMove(event, ui);
        }
      });
      elem.addClass('drag-enabled');
    },
    _objectFromElement: function _objectFromElement(elem) {
      var dataIndex = $(elem).attr('data-index');
      var parsed = dataIndex.split('-');
      var array;
      if (parsed[0] === 'inc') array = this.includeList;else if (parsed[0] === 'exc') array = this.excludeList;
      var index = parsed[1];

      if (array === this.excludeList) {
        var _obj = this.getViewableExcludes()[index];
        index = this.excludeList.indexOf(_obj);
      } else {
        var _obj2 = this.getViewableIncludes()[index];
        index = this.includeList.indexOf(_obj2);
      }

      var obj = {
        draggedFrom: array,
        dataObject: array[index],
        index: index,
        phIndex: null,
        phArray: null
      };
      return obj;
    },
    _elementFromObject: function _elementFromObject(obj) {
      var iexc = this.getViewableExcludes().indexOf(obj);
      var iinc = this.getViewableIncludes().indexOf(obj);
      var array = iexc >= 0 ? 'exc' : iinc >= 0 ? 'inc' : '';
      var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;
      if (index < 0) return null;else {
        return $(this.$element).find('li[data-index=' + array + '-' + index + ']');
      }
    },
    mouseIsInInclude: function mouseIsInInclude(isIn) {
      this.mouseInInclude = isIn;
      if (this.mouseInInclude) this.mouseInExclude = false;

      if (isIn && this.draggedObject && this.draggedObject.phArray !== this.includeList) {
        this._insertPlaceHolder(this.includeList, this.includeList.length);
      }
    },
    mouseIsInExclude: function mouseIsInExclude(isIn) {
      this.mouseInExclude = isIn;
      if (this.mouseInExclude) this.mouseInInclude = false;

      if (isIn && this.draggedObject && this.draggedObject.phArray !== this.excludeList) {
        this._insertPlaceHolder(this.excludeList, this.excludeList.length); //let list_element = $('#dnd-' + (iexc >= 0 ? 'exclude' : 'include'));

      }
    },
    initDragElement: function initDragElement(item) {
      var _this15 = this;

      this.$timeout(function () {
        var elem = _this15._elementFromObject(item);

        _this15._initDragAndDropOnElement(elem);
      });
    },
    mouseOver: function mouseOver(item) {
      if (item != null && this.draggedObject) {
        var iexc = this.excludeList.indexOf(item);
        var iinc = this.includeList.indexOf(item);
        var array = iexc >= 0 ? this.excludeList : iinc >= 0 ? this.includeList : null;
        var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;
        if (array) this._insertPlaceHolder(array, index);
      } else if (item != null) {
        this.initDragElement(item);
      }
    },
    _insertPlaceHolder: function _insertPlaceHolder(array, index) {
      this._removePlaceHolder();

      array.splice(index, 0, this.PLACEHOLDER);
      this.draggedObject.phIndex = index;
      this.draggedObject.phArray = array;
      this.updateFilter();
    },
    _findPlaceHolder: function _findPlaceHolder() {
      var phIndexExc = this.excludeList.indexOf(this.PLACEHOLDER);
      var phIndexInc = this.includeList.indexOf(this.PLACEHOLDER);

      if (phIndexExc >= 0) {
        return {
          array: this.excludeList,
          index: phIndexExc
        };
      } else if (phIndexInc >= 0) {
        return {
          array: this.includeList,
          index: phIndexInc
        };
      } else {
        return null;
      }
    },
    _removePlaceHolder: function _removePlaceHolder() {
      var ph = this._findPlaceHolder();

      if (ph) {
        ph.array.splice(ph.index, 1);
        this.draggedObject.phIndex = null;
      }

      return ph;
    },
    onKeyDown: function onKeyDown(e) {
      if (e.shiftKey && e.ctrlKey && (e.which === 65 || e.which === 97)) {
        this._clearSelectedItems();
      } else if (e.ctrlKey && (e.which === 65 || e.which === 97)) {
        e.preventDefault();
        if (this.mouseInExclude) this._selectAll(this.excludeList);else if (this.mouseInInclude) this._selectAll(this.includeList);
      }
    },
    _selectAll: function _selectAll(array) {
      var _this16 = this;

      this._clearSelectedItems();

      array.forEach(function (item) {
        _this16.toggleSelection(item);
      });
    },
    compileCustomTemplate: function compileCustomTemplate(item, type) {
      var _this17 = this;

      var displayField;
      if (type === 'exc') displayField = 'excludeDisplayField';else if (type === 'inc') displayField = 'includeDisplayField';

      var elem = this._elementFromObject(item);

      if (elem) {
        var template = this.customTemplate;
        var newElem = $(template);
        var scope = this.$scope.$new();

        _.extend(scope, {
          getItemInfo: function getItemInfo() {
            var theItem = _this17._objectFromElement(elem).dataObject;

            return {
              text: _this17[displayField] && theItem && theItem[_this17[displayField]] ? theItem[_this17[displayField]] : theItem,
              item: theItem,
              included: type === 'inc'
            };
          },
          userScope: this.customTemplateScope
        });

        this.$compile(newElem)(scope);
        var customElem = elem.find('.custom-template');
        customElem[0].innerHTML = '';
        customElem[0].appendChild(newElem[0]);
      }
    },
    _initPagination: function _initPagination() {
      this.itemsPerPage = _.isNaN(parse_int_default()(this.usePagination)) ? 8 : parse_int_default()(this.usePagination);
      this.currExcludesPage = 0;
      this.currIncludesPage = 0;
      this.excludesPaginationApi = new PaginationApi(this, 'exc');
      this.includesPaginationApi = new PaginationApi(this, 'inc'); //get item height and margin

      var e = $("<div style=\"background-color: transparent\" class=\"drag-item\">\n    <div class=\"drag-item-text\"></div>\n</div>");
      $(this.$element).find('.dnd-list')[0].appendChild(e[0]);
      var height = e.outerHeight();

      var margin = parse_int_default()(e.css('margin-bottom'));

      $(this.$element).find('.dnd-list')[0].removeChild(e[0]);
      var listWrappers = $(this.$element).find('.dnd-list-wrapper');
      var wrappersHeight = margin * 2 + (height + margin) * this.itemsPerPage;
      listWrappers.css('height', wrappersHeight + 'px');
      listWrappers.css('overflow-y', 'hidden');
      var actions = $(this.$element).find('.dnd-actions');

      var actionsHeight = parse_int_default()(actions.css('height'));

      actions.css('margin-top', (wrappersHeight - actionsHeight) / 2 + 'px');
    },
    _updatePagination: function _updatePagination() {
      if (this.usePagination) {
        this.excludesPaginationApi.update();
        this.includesPaginationApi.update();
      }
    },
    getViewableExcludes: function getViewableExcludes() {
      if (!this.usePagination) {
        return this.getFilteredExcludeList();
      } else {
        var all = this.getFilteredExcludeList();
        return _.slice(all, this.currExcludesPage * this.itemsPerPage, (this.currExcludesPage + 1) * this.itemsPerPage);
      }
    },
    getViewableIncludes: function getViewableIncludes() {
      if (!this.usePagination) {
        return this.getFilteredIncludeList();
      } else {
        var all = this.getFilteredIncludeList();
        return _.slice(all, this.currIncludesPage * this.itemsPerPage, (this.currIncludesPage + 1) * this.itemsPerPage);
      }
    },
    _filterSelection: function _filterSelection(leave) {
      var _this18 = this;

      this.selectedItems = _.filter(this.selectedItems, function (item) {
        if (leave === 'inc' && _this18.includeList && _this18.includeList.indexOf(item) >= 0) return true;else if (leave === 'exc' && _this18.excludeList && _this18.excludeList.indexOf(item) >= 0) return true;else return false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragDropComponentvue_type_script_lang_js_ = (JfDragDropComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue





/* normalize component */

var JfDragDropComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDragDropComponentvue_type_script_lang_js_,
  JfDragDropComponentvue_type_template_id_e4050446_scoped_true_render,
  JfDragDropComponentvue_type_template_id_e4050446_scoped_true_staticRenderFns,
  false,
  null,
  "e4050446",
  null
  
)

/* harmony default export */ var JfDragDropComponent = (JfDragDropComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabularDndComponent/index.vue?vue&type=template&id=25692ef9&scoped=true&
var JfTabularDndComponentvue_type_template_id_25692ef9_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-tabular-dnd",attrs:{"tabindex":"0","disabled":_vm.disabled}},[_c('div',{staticClass:"tabular-dnd-table-container available-table",class:{'no-data': !_vm.availableItems.length && (!_vm.availableItemsTableOptions || (!_vm.availableItemsTableOptions.draggedRow && !_vm.availableItemsTableOptions.draggedRows)) && !_vm.selectedItems.length && (!_vm.selectedItemsTableOptions || (!_vm.selectedItemsTableOptions.draggedRow && !_vm.selectedItemsTableOptions.draggedRows))}},[_c('jf-table-view-wrapper',{attrs:{"options":_vm.availableItemsTableOptions,"data":_vm.availableItems}})],1),_c('div',{staticClass:"dnd-actions-wrap"},[_c('ul',{staticClass:"dnd-actions"},[_c('li',[_c('span',{staticClass:"dnd-exclude-all",attrs:{"disabled":_vm.isIncludeListEmpty() || _vm.areAllRowsDisabled(_vm.selectedItemsTableOptions.getFilteredData()) || _vm.disabled},on:{"click":function($event){return _vm.excludeAll()}}},[_vm._v("«\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-exclude-selected",attrs:{"disabled":!_vm.isIncludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.excludeSelected()}}},[_vm._v("‹\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-include-selected",attrs:{"disabled":!_vm.isExcludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.includeSelected()}}},[_vm._v("›\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-include-all",attrs:{"disabled":_vm.isExcludeListEmpty() || _vm.areAllRowsDisabled(_vm.availableItemsTableOptions.getFilteredData()) || _vm.disabled},on:{"click":function($event){return _vm.includeAll()}}},[_vm._v("»\n                ")])])])]),_c('div',{staticClass:"tabular-dnd-table-container selected-table"},[_c('jf-table-view-wrapper',{attrs:{"options":_vm.selectedItemsTableOptions,"data":_vm.selectedItems}})],1)])])}
var JfTabularDndComponentvue_type_template_id_25692ef9_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=template&id=25692ef9&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabularDndComponent/index.vue?vue&type=script&lang=js&







var JfTabularDndComponentvue_type_script_lang_js_this = undefined;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfTabularDndComponentvue_type_script_lang_js_ = ({
  name: 'jf-tabular-dnd',
  components: {
    JfTableViewWrapper: JfTableViewWrapper
  },
  props: ['availableItems', 'selectedItems', 'itemClassAttr', 'itemDraggableAttr', 'columns', 'numberOfRows', 'availableItemsColumns', 'selectedItemsColumns', 'entityName', 'appScope', 'disableWholeRowSelection', 'disabled'],
  'jf@inject': ['$element', '$scope', 'JFrogTableViewOptions'],
  data: function data() {
    return {
      availableItemsTableOptions: null,
      selectedItemsTableOptions: null,
      availableItemsColumnsVar: this.availableItemsColumns,
      selectedItemsColumnsVar: this.selectedItemsColumns,
      currNumberOfRows: this.numberOfRows || 8
    };
  },
  created: function created() {
    if (this.columns) {
      this.availableItemsColumnsVar = _.cloneDeep(this.columns);
      this.selectedItemsColumnsVar = _.cloneDeep(this.columns);
    }

    this.createTables();
  },
  watch: {
    availableItems: function availableItems(val) {
      return JfTabularDndComponentvue_type_script_lang_js_this && JfTabularDndComponentvue_type_script_lang_js_this.watchListChanges && JfTabularDndComponentvue_type_script_lang_js_this.watchListChanges(val);
    },
    selectedItems: function selectedItems(val) {
      return JfTabularDndComponentvue_type_script_lang_js_this && JfTabularDndComponentvue_type_script_lang_js_this.watchListChanges && JfTabularDndComponentvue_type_script_lang_js_this.watchListChanges(val);
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfTabularDnD'
  },
  methods: {
    watchListChanges: function watchListChanges(val) {
      this._refreshBothTables();

      this._fireOnChange();
    },
    createAutoColumns: function createAutoColumns() {
      var _this2 = this;

      ['availableItemsColumnsVar', 'selectedItemsColumnsVar'].forEach(function (columnsArrayName) {
        var _this2$columnsArrayNa;

        var newColumnsArray = _.map(_this2[columnsArrayName], function (column) {
          if (_.isObject(column)) {
            return column;
          } else if (_.isString(column)) {
            return {
              field: column
            };
          }
        }); // Replacing the content of the array without changing the reference to it, to support setting Array literals on templates.


        (_this2$columnsArrayNa = _this2[columnsArrayName]).splice.apply(_this2$columnsArrayNa, [0, _this2[columnsArrayName].length].concat(Object(toConsumableArray["a" /* default */])(newColumnsArray)));
      });
    },
    createTables: function createTables() {
      var _this3 = this;

      this.createAutoColumns();
      this.availableItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
      this.selectedItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
      var emptyPlaceholdersStyle = {
        height: 50 * this.currNumberOfRows + 'px',
        'line-height': 50 * this.currNumberOfRows + 'px'
      };

      this.availableItemsTableOptions._registerTabularDnd(this, 'available', this.selectedItemsTableOptions, emptyPlaceholdersStyle);

      this.selectedItemsTableOptions._registerTabularDnd(this, 'selected', this.availableItemsTableOptions, emptyPlaceholdersStyle);

      var _this$_getObjectNames = this._getObjectNames(),
          availableObjectName = _this$_getObjectNames.availableObjectName,
          selectedObjectName = _this$_getObjectNames.selectedObjectName;

      this.availableItemsTableOptions.setColumns(this.availableItemsColumnsVar).setSelection(this.availableItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.availableItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parse_int_default()(this.currNumberOfRows)).setObjectName(availableObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
        return _this3.disabled;
      }).setEmptyTableText(!this.availableItems.length && !this.selectedItems.length ? 'No data found' : 'Drag row here');
      this.selectedItemsTableOptions.setColumns(this.selectedItemsColumnsVar).setSelection(this.selectedItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.selectedItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parse_int_default()(this.currNumberOfRows)).setObjectName(selectedObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
        return _this3.disabled;
      }).setEmptyTableText('Drag row here');
      this.$set(this.selectedItemsTableOptions, 'isRowSelectable', this.$set(this.availableItemsTableOptions, 'isRowSelectable', function (row) {
        return _this3._isItemDraggable(row.entity);
      }));

      if (!this.disableWholeRowSelection) {
        var toggleSelection = function toggleSelection(row) {
          if (_this3.disabled || _this3.itemDraggableAttr && row.entity[_this3.itemDraggableAttr] === false) {
            return;
          }

          _this3.$set(row.entity, '$selected', !row.entity.$selected);
        };

        this.availableItemsTableOptions.on('row.clicked', toggleSelection);
        this.selectedItemsTableOptions.on('row.clicked', toggleSelection);
      }

      this.availableItemsTableOptions.on('row.clicked', function (row) {
        return _this3.$emit('on-row-click', {
          row: row.entity,
          list: 'available'
        });
      });
      this.selectedItemsTableOptions.on('row.clicked', function (row) {
        return _this3.$emit('on-row-click', {
          row: row.entity,
          list: 'selected'
        });
      });
      this.availableItemsTableOptions.on('selection.change', function () {
        if (_this3.disabled) {
          _this3.availableItemsTableOptions.clearSelection();
        }
      });
      this.selectedItemsTableOptions.on('selection.change', function () {
        if (_this3.disabled) {
          _this3.selectedItemsTableOptions.clearSelection();
        }
      });
      this.$scope.$watch('jfTabularDnD.disabled', function () {
        if (_this3.disabled) {
          _this3.selectedItemsTableOptions.clearSelection();

          _this3.availableItemsTableOptions.clearSelection();
        }
      });
    },
    _getObjectNames: function _getObjectNames() {
      var availableObjectName, selectedObjectName;

      if (this.entityName) {
        if (this.entityName.indexOf('/') !== -1) {
          var _this$entityName$spli = this.entityName.split('/'),
              _this$entityName$spli2 = Object(slicedToArray["a" /* default */])(_this$entityName$spli, 2),
              single = _this$entityName$spli2[0],
              plural = _this$entityName$spli2[1];

          availableObjectName = 'Available ' + single + '/' + 'Available ' + plural;
          selectedObjectName = 'Included ' + single + '/' + 'Included ' + plural;
        } else {
          availableObjectName = 'Available ' + this.entityName;
          selectedObjectName = 'Included ' + this.entityName;
        }
      } else {
        availableObjectName = 'Available Item';
        selectedObjectName = 'Included Item';
      }

      return {
        availableObjectName: availableObjectName,
        selectedObjectName: selectedObjectName
      };
    },
    areAllRowsDisabled: function areAllRowsDisabled(itemsList) {
      var _this4 = this;

      if (!this.itemDraggableAttr || !itemsList) {
        return false;
      }

      var filtered = _.filter(itemsList, function (item) {
        return item.hasOwnProperty("".concat(_this4.itemDraggableAttr)) && item[_this4.itemDraggableAttr] === false;
      });

      return filtered.length === itemsList.length;
    },
    isIncludeListEmpty: function isIncludeListEmpty() {
      if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
        return true;
      }

      return !this.selectedItemsTableOptions.getFilteredData().length;
    },
    isExcludeListEmpty: function isExcludeListEmpty() {
      if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
        return true;
      }

      return !this.availableItemsTableOptions.getFilteredData().length;
    },
    isIncludeListItemSelected: function isIncludeListItemSelected() {
      if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
        return false;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      var filtered = this.selectedItemsTableOptions.getFilteredData();
      return !!selected.length;
      selected = _.filter(selected, function (item) {
        return _.includes(filtered, item);
      });
    },
    isExcludeListItemSelected: function isExcludeListItemSelected() {
      if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
        return false;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      var filtered = this.availableItemsTableOptions.getFilteredData();
      selected = _.filter(selected, function (item) {
        return _.includes(filtered, item);
      });
      return !!selected.length;
    },
    excludeAll: function excludeAll() {
      var _this$availableItems;

      if (this.isIncludeListEmpty() || this.disabled) {
        return;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.selectedItemsTableOptions.getFilteredData();
      filtered = this._getOnlyDraggables(filtered);

      (_this$availableItems = this.availableItems).splice.apply(_this$availableItems, [this.availableItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(filtered)));

      _.remove(this.selectedItems, function (i) {
        return _.includes(filtered, i);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    includeAll: function includeAll() {
      var _this$selectedItems;

      if (this.isExcludeListEmpty() || this.disabled) {
        return;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.availableItemsTableOptions.getFilteredData();
      filtered = this._getOnlyDraggables(filtered);

      (_this$selectedItems = this.selectedItems).splice.apply(_this$selectedItems, [this.selectedItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(filtered)));

      _.remove(this.availableItems, function (i) {
        return _.includes(filtered, i);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    excludeSelected: function excludeSelected() {
      var _this$availableItems2;

      if (!this.isIncludeListItemSelected() || this.disabled) {
        return;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.selectedItemsTableOptions.getFilteredData();

      _.remove(selected, function (i) {
        return !_.includes(filtered, i);
      });

      selected = this._getOnlyDraggables(selected);

      (_this$availableItems2 = this.availableItems).splice.apply(_this$availableItems2, [this.availableItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(selected)));

      _.remove(this.selectedItems, function (item) {
        return _.includes(selected, item);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    includeSelected: function includeSelected() {
      var _this$selectedItems2;

      if (!this.isExcludeListItemSelected() || this.disabled) {
        return;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.availableItemsTableOptions.getFilteredData();

      _.remove(selected, function (i) {
        return !_.includes(filtered, i);
      });

      selected = this._getOnlyDraggables(selected);

      (_this$selectedItems2 = this.selectedItems).splice.apply(_this$selectedItems2, [this.selectedItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(selected)));

      _.remove(this.availableItems, function (item) {
        return _.includes(selected, item);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    _getOnlyDraggables: function _getOnlyDraggables(array) {
      var _this5 = this;

      if (this.itemDraggableAttr) {
        return _.filter(array, function (item) {
          return _this5._isItemDraggable(item);
        });
      } else {
        return array;
      }
    },
    _isItemDraggable: function _isItemDraggable(item) {
      if (this.itemDraggableAttr) {
        return _.isUndefined(item[this.itemDraggableAttr]) || item[this.itemDraggableAttr];
      } else {
        return true;
      }
    },
    _refreshBothTables: function _refreshBothTables() {
      [this.availableItemsTableOptions, this.selectedItemsTableOptions].forEach(function (tableOptions) {
        tableOptions.update();
        tableOptions.refreshFilter();
        tableOptions.dirCtrl.vsApi.refresh();
      });
    },
    onDragTransfer: function onDragTransfer(draggedRows, originTableOptions) {
      draggedRows.forEach(function (draggedRow) {
        return delete draggedRow.$selected;
      });
      originTableOptions.dirCtrl.allSelected = false;

      this._fireOnChange();
    },
    _fireOnChange: function _fireOnChange() {
      this.$emit('on-change', {
        available: this.availableItems,
        selected: this.selectedItems
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTabularDndComponentvue_type_script_lang_js_ = (JfTabularDndComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=style&index=0&id=25692ef9&scoped=true&lang=less&
var JfTabularDndComponentvue_type_style_index_0_id_25692ef9_scoped_true_lang_less_ = __webpack_require__("51d4");

// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue






/* normalize component */

var JfTabularDndComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTabularDndComponentvue_type_script_lang_js_,
  JfTabularDndComponentvue_type_template_id_25692ef9_scoped_true_render,
  JfTabularDndComponentvue_type_template_id_25692ef9_scoped_true_staticRenderFns,
  false,
  null,
  "25692ef9",
  null
  
)

/* harmony default export */ var JfTabularDndComponent = (JfTabularDndComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardComponent/index.vue?vue&type=template&id=38f5b05d&
var JfWizardComponentvue_type_template_id_38f5b05d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-wizard"},[_c('div',{staticClass:"jf-wizard-container"},[_c('div',{staticClass:"wizard-bar"},[_c('ul',_vm._l((_vm.tabs),function(tab,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisible(tab)),expression:"isVisible(tab)"}],key:index,class:{'active': _vm.active.title === tab.title}},[_c('a',{attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm._switch(tab)}}},[_vm._v(_vm._s(tab.title))])])}),0)]),_c('div',{staticClass:"wizard-content"},[_vm._t("default")],2)])])}
var JfWizardComponentvue_type_template_id_38f5b05d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue?vue&type=template&id=38f5b05d&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfWizardComponentvue_type_script_lang_js_ = ({
  name: 'jf-wizard',
  props: ['config'],
  'jf@inject': ['JFrogEventBus', 'JFrogUIUtils', '$scope'],
  data: function data() {
    return {
      tabs: [],
      active: {
        title: null
      }
    };
  },
  created: function created() {
    var _this = this;

    this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, function (tab) {
      _this._switch(tab);
    });
    this.init = true;
  },
  methods: {
    registerTab: function registerTab(tab) {
      if (this.init || tab.isSelectedTab) {
        this.active = tab;
        this.init = false;
      }

      this.tabs.push(tab);
    },
    _switch: function _switch(tab) {
      this.$element.find('.wizard-content').scrollTop(0);
      this.active = typeof tab === 'string' ? _.find(this.tabs, function (t) {
        return t.title === tab;
      }) : tab;
      this.$emit('on-tab-switch', {
        tab: this.active.title
      });
      this.JFrogUIUtils.fireResizeEvent();
    },
    isVisible: function isVisible(tab) {
      return typeof tab.isVisibleTab == "undefined" || //If isVisible is NOT defined
      typeof tab.isVisibleTab == "boolean" && !!tab.isVisibleTab || //isVisible is a boolean and its value is true
      typeof tab.isVisibleTab === 'function' && tab.isVisibleTab(); //isVisible is a function and its output is truthy
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWizardComponentvue_type_script_lang_js_ = (JfWizardComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue





/* normalize component */

var JfWizardComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfWizardComponentvue_type_script_lang_js_,
  JfWizardComponentvue_type_template_id_38f5b05d_render,
  JfWizardComponentvue_type_template_id_38f5b05d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfWizardComponent = (JfWizardComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cec90f30-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardElementComponent/index.vue?vue&type=template&id=116cd1bd&
var JfWizardElementComponentvue_type_template_id_116cd1bd_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.config.enableNgShow)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.title && _vm.title === _vm.selectedTitle),expression:"title && title === selectedTitle"}],staticClass:"wizard-element-container"},[_vm._t("default")],2):_vm._e()}
var JfWizardElementComponentvue_type_template_id_116cd1bd_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue?vue&type=template&id=116cd1bd&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardElementComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfWizardElementComponentvue_type_script_lang_js_ = ({
  name: 'jf-wizard-element',
  props: ['dataTitle', 'isSelectedTab', 'isVisibleTab'],
  data: function data() {
    return {
      title: this.dataTitle,
      config: {
        enableNgShow: null
      }
    };
  },
  computed: {
    selectedTitle: function selectedTitle() {
      return this.$parent.active.title;
    }
  },
  mounted: function mounted() {
    var tabProperties = {
      title: this.dataTitle,
      isSelectedTab: this.isSelectedTab,
      isVisibleTab: this.isVisibleTab
    };
    this.$parent.registerTab(tabProperties);
    this.config = this.$parent.config;
  }
});
// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWizardElementComponentvue_type_script_lang_js_ = (JfWizardElementComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue





/* normalize component */

var JfWizardElementComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfWizardElementComponentvue_type_script_lang_js_,
  JfWizardElementComponentvue_type_template_id_116cd1bd_render,
  JfWizardElementComponentvue_type_template_id_116cd1bd_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfWizardElementComponent = (JfWizardElementComponent_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-select/src/components/Select.vue
var Select = __webpack_require__("b206");

// EXTERNAL MODULE: ./node_modules/vue-multiselect/src/index.js
var src = __webpack_require__("65ed");

// CONCATENATED MODULE: ./src/registerGlobalComponents.js






























































var registerGlobalComponents_Vue = window.Vue;
var components = [JfWizardElementComponent, JfWizardComponent, JfTabularDndComponent, JfDragDropComponent, JfDragDropPaginationComponent, JfActionsComponent, JfHelpTooltipComponent, JfListMakerComponent, JfCheckboxComponent, JfSwitchComponent, JfGridComponent, JfGridPaginationComponent, JfGridBatchActionsComponent, JfValidationComponent, JfFieldComponent, JfCodeMirrorComponent, JfGridFilterComponent, JfTabsComponent, JfTabComponent, JfDrawerComponent, JfPanelComponent, JfUiSelectComponent, JfEnterPressComponent, JfClipCopyComponent, JfSidebarComponent, JfMultiDropdownComponent, JfWidgetsLayoutComponent, JfMarqueeComponent, JfPasswordStrengthComponent, JfDatetimepickerComponent, JfListSelectionComponent, JfMarkupEditorComponent, JfJsTreeWrapComponent, JfRadioButtonComponent, JfDragAndDropTxtComponent, JfContextMenuComponent, JfVscrollComponent, JfVscrollElementComponent, JfDataListComponent, JfTogglerComponent, JfSwitchTogglerComponent, JfOnOffSwitchComponent, JfTextBoxComponent, JfPendingDataComponent, JfGraphsComponent, JfFileDropComponent, JfTableViewComponent, JfTableViewWrapper, JfTableRowComponent, JfTableViewBatchActionsComponent, JfTableCompiledCellComponent, JfTableTopComponent, JfTreeComponent, JfTreeItemComponent, JfTreeCompiledCellComponent, JfTreeIndentationComponent, JfDividerComponent, JfSummaryRowComponent, JfSummaryRowItemComponent];
components.forEach(function (comp) {
  registerGlobalComponents_Vue.component(comp.name, comp);
});
registerGlobalComponents_Vue.component('v-select', Select["a" /* default */]);
registerGlobalComponents_Vue.component('multiSelect', src["a" /* default */]);
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/es/index.js
var es = __webpack_require__("9f7b");
var es_default = /*#__PURE__*/__webpack_require__.n(es);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__("f9e3");

// EXTERNAL MODULE: ./node_modules/vue-virtual-scroller/dist/vue-virtual-scroller.esm.js
var vue_virtual_scroller_esm = __webpack_require__("e508");

// EXTERNAL MODULE: ./src/assets/stylesheets/main.less
var stylesheets_main = __webpack_require__("b79e");

// EXTERNAL MODULE: ./node_modules/vue-virtual-scroller/dist/vue-virtual-scroller.css
var vue_virtual_scroller = __webpack_require__("a899");

// EXTERNAL MODULE: ./node_modules/jf-tooltipster/css/tooltipster.css
var tooltipster = __webpack_require__("2f8a");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/dist/bootstrap-vue.css
var bootstrap_vue = __webpack_require__("2dd8");

// EXTERNAL MODULE: ./node_modules/jquery-contextmenu/dist/jquery.contextMenu.js
var jquery_contextMenu = __webpack_require__("e6e5");

// EXTERNAL MODULE: ./node_modules/components-jqueryui/jquery-ui.js
var jquery_ui = __webpack_require__("b1f8");

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/vue-clipboard2/vue-clipboard.js
var vue_clipboard = __webpack_require__("4eb5");
var vue_clipboard_default = /*#__PURE__*/__webpack_require__.n(vue_clipboard);

// EXTERNAL MODULE: ./node_modules/vue-toasted/dist/vue-toasted.min.js
var vue_toasted_min = __webpack_require__("a65d");
var vue_toasted_min_default = /*#__PURE__*/__webpack_require__.n(vue_toasted_min);

// EXTERNAL MODULE: ./node_modules/v-click-outside/dist/v-click-outside.min.min.umd.js
var v_click_outside_min_min_umd = __webpack_require__("a2df");
var v_click_outside_min_min_umd_default = /*#__PURE__*/__webpack_require__.n(v_click_outside_min_min_umd);

// EXTERNAL MODULE: ./node_modules/pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css
var bootstrap_datetimepicker = __webpack_require__("ca56");

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/fontawesome.css
var fontawesome = __webpack_require__("b2a2");

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/regular.css
var regular = __webpack_require__("8890");

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/solid.css
var solid = __webpack_require__("6755");

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport JFrogUI */__webpack_require__.d(__webpack_exports__, "a", function() { return plugins_JFrogUI; });











 //import 'codemirror/theme/monokai.css'
//import 'codemirror/addon/selection/active-line.js'
//import 'codemirror/addon/hint/show-hint.js'
//import 'codemirror/addon/hint/show-hint.css'
//import 'codemirror/addon/hint/javascript-hint.js'
//import 'codemirror/addon/scroll/annotatescrollbar.js'
//import 'codemirror/addon/search/matchesonscrollbar.js'
//import 'codemirror/addon/search/match-highlighter.js'
//import 'codemirror/mode/clike/clike.js'
//import 'codemirror/addon/comment/comment.js'
//import 'codemirror/keymap/sublime.js'
//import'codemirror/addon/fold/foldgutter.css'
//import'codemirror/addon/fold/brace-fold.js'
//import'codemirror/addon/fold/comment-fold.js'
//import'codemirror/addon/fold/foldcode.js'
//import'codemirror/addon/fold/foldgutter.js'
//import'codemirror/addon/fold/indent-fold.js'
//import'codemirror/addon/fold/markdown-fold.js'
//import'codemirror/addon/fold/xml-fold.js'



















 // date-time picker TODO use a different date time picker





window.$ = jquery_default.a;
window.moment = moment_default.a;
window.jQuery = jquery_default.a;

__webpack_require__("04c9");

__webpack_require__("38ad");

__webpack_require__("ea80");

window.CodeMirror = __webpack_require__("56b3");

var VueCodemirror = __webpack_require__("8f94");

var VueMoment = __webpack_require__("2ead");

/* harmony default export */ var src_0 = __webpack_exports__["b"] = ({
  install: function install(Vue, options) {
    if (options && options.config) {
      window.$$$$jfuieConfig = options.config;
    }

    servicesRegistration.registerAll();
    Vue.use(es_default.a);
    Vue.use(vue_virtual_scroller_esm["a" /* default */]);
    Vue.use(vue_clipboard_default.a);
    Vue.use(vue_toasted_min_default.a);
    Vue.use(VueCodemirror);
    Vue.use(v_click_outside_min_min_umd_default.a);
    Vue.use(VueMoment);
  }
}); // date-time picker TODO use a different date time picker

jquery_default.a.extend(true, jquery_default.a.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
}); // Fix for toasted library. It is injecting its css to the end of the head tag, which makes it difficult to override.
// This will move the library styling to the beginning of the head tag

(function () {
  var xpath = '//style[contains(text(),\'.toasted.rounded\')]';
  var toastedLibraryStyleElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var head = document.getElementsByTagName('head')[0];
  head.removeChild(toastedLibraryStyleElement);
  head.prepend(toastedLibraryStyleElement);
})();



/***/ }),

/***/ "b79e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "baab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bb03":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bdab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5732e7ae_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2215");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5732e7ae_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5732e7ae_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5732e7ae_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c343":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ca45":
/***/ (function(module, exports) {

var Vue = window.Vue;
Vue.filter('splitWords', function (string) {
  return splitWords(string);
});

/***/ }),

/***/ "cb06":
/***/ (function(module, exports) {

module.exports = "<div :class=\"{ 'sortable': sortable, 'sorting-active': col.sort.direction }\"> <div class=ui-grid-cell-contents col-index=renderIndex> <span>{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-visible=col.sort.direction :class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\"> &nbsp; </span> </div> <div class=ui-grid-column-menu-button v-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" @click=toggleMenu($event) :class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\"> <i class=ui-grid-icon-angle-down>&nbsp;</i> </div> <div ui-grid-filter=\"\"></div> </div>";

/***/ }),

/***/ "cd80":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ceb4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d0b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cd80");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d1e7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d7ab");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d247":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7f57c9c2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("102d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7f57c9c2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7f57c9c2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7f57c9c2_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d7ab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "db6f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7004292_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ed9c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7004292_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7004292_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7004292_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e13f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1e255658_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7e86");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1e255658_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1e255658_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1e255658_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e5b3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_925388b8_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("602e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_925388b8_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_925388b8_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_925388b8_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e858":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_104fee22_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a441");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_104fee22_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_104fee22_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_104fee22_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e90d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ed9c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "edf8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "eeec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37db");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f47e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fa0f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
});
//# sourceMappingURL=jfrog-ui-essentials.umd.js.map