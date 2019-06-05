((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[331],{

/***/ "ad68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-format/src/defaultLocale.js
var defaultLocale = __webpack_require__("1231");

// EXTERNAL MODULE: ./node_modules/d3-format/src/locale.js + 1 modules
var locale = __webpack_require__("b170");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatSpecifier.js
var formatSpecifier = __webpack_require__("09b8");

// EXTERNAL MODULE: ./node_modules/d3-format/src/exponent.js
var exponent = __webpack_require__("a7fd");

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionFixed.js


/* harmony default export */ var precisionFixed = (function(step) {
  return Math.max(0, -Object(exponent["a" /* default */])(Math.abs(step)));
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionPrefix.js


/* harmony default export */ var precisionPrefix = (function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Object(exponent["a" /* default */])(value) / 3))) * 3 - Object(exponent["a" /* default */])(Math.abs(step)));
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionRound.js


/* harmony default export */ var precisionRound = (function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, Object(exponent["a" /* default */])(max) - Object(exponent["a" /* default */])(step)) + 1;
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/index.js
/* unused concated harmony import formatDefaultLocale */
/* concated harmony reexport format */__webpack_require__.d(__webpack_exports__, "a", function() { return defaultLocale["a" /* format */]; });
/* concated harmony reexport formatPrefix */__webpack_require__.d(__webpack_exports__, "b", function() { return defaultLocale["b" /* formatPrefix */]; });
/* unused concated harmony import formatLocale */
/* concated harmony reexport formatSpecifier */__webpack_require__.d(__webpack_exports__, "c", function() { return formatSpecifier["a" /* default */]; });
/* concated harmony reexport precisionFixed */__webpack_require__.d(__webpack_exports__, "d", function() { return precisionFixed; });
/* concated harmony reexport precisionPrefix */__webpack_require__.d(__webpack_exports__, "e", function() { return precisionPrefix; });
/* concated harmony reexport precisionRound */__webpack_require__.d(__webpack_exports__, "f", function() { return precisionRound; });








/***/ }),

/***/ "b170":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-format/src/exponent.js
var exponent = __webpack_require__("a7fd");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatGroup.js
var formatGroup = __webpack_require__("9871");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatNumerals.js
var formatNumerals = __webpack_require__("014a");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatSpecifier.js
var formatSpecifier = __webpack_require__("09b8");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatTrim.js
var formatTrim = __webpack_require__("91db");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatTypes.js + 1 modules
var formatTypes = __webpack_require__("b4ef");

// EXTERNAL MODULE: ./node_modules/d3-format/src/formatPrefixAuto.js
var formatPrefixAuto = __webpack_require__("cded");

// CONCATENATED MODULE: ./node_modules/d3-format/src/identity.js
/* harmony default export */ var identity = (function(x) {
  return x;
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/locale.js









var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ var src_locale = __webpack_exports__["a"] = (function(locale) {
  var group = locale.grouping && locale.thousands ? Object(formatGroup["a" /* default */])(locale.grouping, locale.thousands) : identity,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? Object(formatNumerals["a" /* default */])(locale.numerals) : identity,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = Object(formatSpecifier["a" /* default */])(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes["a" /* default */][type]) precision == null && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes["a" /* default */][type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = Object(formatTrim["a" /* default */])(value);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + formatPrefixAuto["b" /* prefixExponent */] / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = Object(formatSpecifier["a" /* default */])(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(Object(exponent["a" /* default */])(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~c735e1bc.js.map