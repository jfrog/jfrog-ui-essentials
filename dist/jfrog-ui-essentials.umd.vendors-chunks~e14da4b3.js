((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[365],{

/***/ "482f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/d3-color/src/color.js
var color = __webpack_require__("166a");

// EXTERNAL MODULE: ./node_modules/d3-color/src/lab.js
var lab = __webpack_require__("62f0");

// EXTERNAL MODULE: ./node_modules/d3-color/src/define.js
var define = __webpack_require__("63ad");

// EXTERNAL MODULE: ./node_modules/d3-color/src/math.js
var math = __webpack_require__("530a");

// CONCATENATED MODULE: ./node_modules/d3-color/src/cubehelix.js




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof color["b" /* Rgb */])) o = Object(color["h" /* rgbConvert */])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * math["b" /* rad2deg */] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(define["a" /* default */])(Cubehelix, cubehelix, Object(define["b" /* extend */])(color["a" /* Color */], {
  brighter: function(k) {
    k = k == null ? color["c" /* brighter */] : Math.pow(color["c" /* brighter */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? color["d" /* darker */] : Math.pow(color["d" /* darker */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * math["a" /* deg2rad */],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new color["b" /* Rgb */](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

// CONCATENATED MODULE: ./node_modules/d3-color/src/index.js
/* concated harmony reexport color */__webpack_require__.d(__webpack_exports__, "color", function() { return color["e" /* default */]; });
/* concated harmony reexport rgb */__webpack_require__.d(__webpack_exports__, "rgb", function() { return color["g" /* rgb */]; });
/* concated harmony reexport hsl */__webpack_require__.d(__webpack_exports__, "hsl", function() { return color["f" /* hsl */]; });
/* concated harmony reexport lab */__webpack_require__.d(__webpack_exports__, "lab", function() { return lab["a" /* default */]; });
/* concated harmony reexport hcl */__webpack_require__.d(__webpack_exports__, "hcl", function() { return lab["c" /* hcl */]; });
/* concated harmony reexport lch */__webpack_require__.d(__webpack_exports__, "lch", function() { return lab["d" /* lch */]; });
/* concated harmony reexport gray */__webpack_require__.d(__webpack_exports__, "gray", function() { return lab["b" /* gray */]; });
/* concated harmony reexport cubehelix */__webpack_require__.d(__webpack_exports__, "cubehelix", function() { return cubehelix; });





/***/ }),

/***/ "63ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return extend; });
/* harmony default export */ __webpack_exports__["a"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~e14da4b3.js.map