((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[330],{

/***/ "1880":
/***/ (function(module, exports, __webpack_require__) {

/*
  Module dependencies
*/
var ElementType = __webpack_require__("4d1e");
var entities = __webpack_require__("e282");

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '',
      value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    output += key;
    if ((value !== null && value !== '') || opts.xmlMode) {
        output += '="' + (opts.decodeEntities ? entities.encodeXML(value) : value) + '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};


var render = module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for(var i = 0; i < dom.length; i++){
    var elem = dom[i];

    if (elem.type === 'root')
      output += render(elem.children, opts);
    else if (ElementType.isTag(elem))
      output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment)
      output += renderComment(elem);
    else if (elem.type === ElementType.CDATA)
      output += renderCdata(elem);
    else
      output += renderText(elem, opts);
  }

  return output;
};

function renderTag(elem, opts) {
  // Handle SVG
  if (elem.name === "svg") opts = {decodeEntities: opts.decodeEntities, xmlMode: true};

  var tag = '<' + elem.name,
      attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (
    opts.xmlMode
    && (!elem.children || elem.children.length === 0)
  ) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}


/***/ }),

/***/ "392b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nopropagation; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fd32");


function nopropagation() {
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].stopImmediatePropagation();
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].preventDefault();
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].stopImmediatePropagation();
});


/***/ }),

/***/ "4d1e":
/***/ (function(module, exports) {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};


/***/ }),

/***/ "8637":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return transform; });
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  return node.__zoom || identity;
}


/***/ }),

/***/ "944c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "9617":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoomEvent; });
function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}


/***/ }),

/***/ "d934":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8645");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return _zoom__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8637");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomTransform", function() { return _transform__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomIdentity", function() { return _transform__WEBPACK_IMPORTED_MODULE_1__["c"]; });





/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~c6a5805a.js.map