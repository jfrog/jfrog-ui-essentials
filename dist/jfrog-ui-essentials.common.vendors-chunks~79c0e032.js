((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[191],{

/***/ "d16f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-selection/src/index.js + 3 modules
var src = __webpack_require__("fd32");

// EXTERNAL MODULE: ./node_modules/d3-interpolate/src/index.js + 3 modules
var d3_interpolate_src = __webpack_require__("a43d");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/tween.js
var tween = __webpack_require__("35e8");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/interpolate.js
var interpolate = __webpack_require__("e5a1");

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attr.js





function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ var attr = (function(name, value) {
  var fullname = Object(src["namespace"])(name), i = fullname === "transform" ? d3_interpolate_src["interpolateTransformSvg"] : interpolate["a" /* default */];
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, Object(tween["b" /* tweenValue */])(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attrTween.js


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i(t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i(t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ var transition_attrTween = (function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = Object(src["namespace"])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
});

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/schedule.js
var transition_schedule = __webpack_require__("aed6");

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/delay.js


function delayFunction(id, value) {
  return function() {
    Object(transition_schedule["g" /* init */])(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    Object(transition_schedule["g" /* init */])(this, id).delay = value;
  };
}

/* harmony default export */ var delay = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : Object(transition_schedule["f" /* get */])(this.node(), id).delay;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/duration.js


function durationFunction(id, value) {
  return function() {
    Object(transition_schedule["h" /* set */])(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    Object(transition_schedule["h" /* set */])(this, id).duration = value;
  };
}

/* harmony default export */ var duration = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : Object(transition_schedule["f" /* get */])(this.node(), id).duration;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/ease.js


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    Object(transition_schedule["h" /* set */])(this, id).ease = value;
  };
}

/* harmony default export */ var ease = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : Object(transition_schedule["f" /* get */])(this.node(), id).ease;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/filter.js



/* harmony default export */ var filter = (function(match) {
  if (typeof match !== "function") match = Object(src["matcher"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/merge.js


/* harmony default export */ var transition_merge = (function(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
});

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/on.js
var transition_on = __webpack_require__("68d9");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/remove.js
var remove = __webpack_require__("fca8");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/select.js
var transition_select = __webpack_require__("af93");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/selectAll.js
var selectAll = __webpack_require__("ed56");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/selection.js
var selection = __webpack_require__("70a9");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/style.js
var style = __webpack_require__("d0d0");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/styleTween.js
var styleTween = __webpack_require__("0ff1");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/text.js
var transition_text = __webpack_require__("df56");

// EXTERNAL MODULE: ./node_modules/d3-transition/src/transition/transition.js
var transition_transition = __webpack_require__("e1b1");

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/end.js


/* harmony default export */ var transition_end = (function() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = Object(transition_schedule["h" /* set */])(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });
  });
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return src_transition_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return newId; });




















var transition_id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function src_transition_transition(name) {
  return Object(src["selection"])().transition(name);
}

function newId() {
  return ++transition_id;
}

var selection_prototype = src["selection"].prototype;

Transition.prototype = src_transition_transition.prototype = {
  constructor: Transition,
  select: transition_select["a" /* default */],
  selectAll: selectAll["a" /* default */],
  filter: filter,
  merge: transition_merge,
  selection: selection["a" /* default */],
  transition: transition_transition["a" /* default */],
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on["a" /* default */],
  attr: attr,
  attrTween: transition_attrTween,
  style: style["a" /* default */],
  styleTween: styleTween["a" /* default */],
  text: transition_text["a" /* default */],
  remove: remove["a" /* default */],
  tween: tween["a" /* default */],
  delay: delay,
  duration: duration,
  ease: ease,
  end: transition_end
};


/***/ }),

/***/ "e5a1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("482f");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a43d");



/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var c;
  return (typeof b === "number" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateNumber"]
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__["color"] ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateRgb"]
      : (c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["color"])(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateRgb"])
      : d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateString"])(a, b);
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~79c0e032.js.map