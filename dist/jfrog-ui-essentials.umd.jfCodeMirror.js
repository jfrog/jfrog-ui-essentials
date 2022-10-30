((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[13],{

/***/ "11c3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfCodeMirrorComponent/index.vue?vue&type=template&id=5b7e1fcc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:{'codemirror-with-clip-copy' : _vm.enableCopyToClipboard}},[(_vm.enableCopyToClipboard && _vm.formattedModel && !_vm.clipboardCopyModel)?_c('jf-clip-copy',{staticClass:"code-mirror-copy pull-right",class:{'scrollbar-margin':_vm.codeMirrorIsWithScroll()},attrs:{"text-to-copy":_vm.formattedModel,"object-name":_vm.clipboardCopyEntityName || 'text'}}):_vm._e(),(_vm.enableCopyToClipboard && _vm.clipboardCopyModel)?_c('jf-clip-copy',{staticClass:"code-mirror-copy pull-right",class:{'scrollbar-margin':_vm.codeMirrorIsWithScroll()},attrs:{"text-to-copy":_vm.clipboardCopyModel,"object-name":_vm.clipboardCopyEntityName || 'text'}}):_vm._e(),_c('codemirror',{attrs:{"options":_vm.editorOptions},on:{"ready":_vm.codeMirrorLoaded},model:{value:(_vm.formattedModel),callback:function ($$v) {_vm.formattedModel=$$v},expression:"formattedModel"}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/index.vue?vue&type=template&id=5b7e1fcc&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// EXTERNAL MODULE: ./node_modules/vue-codemirror/dist/vue-codemirror.js
var vue_codemirror = __webpack_require__("8f94");

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
var search = __webpack_require__("0b6c");

// EXTERNAL MODULE: ./node_modules/codemirror/lib/codemirror.js
var lib_codemirror = __webpack_require__("56b3");
var lib_codemirror_default = /*#__PURE__*/__webpack_require__.n(lib_codemirror);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/config.js






function aliasMime(newMime, existingMime, CodeMirror) {
  CodeMirror.defineMIME(newMime, CodeMirror.mimeModes[existingMime]);
}

function defineCodeMirrorMimes(CodeMirror) {
  aliasMime('text/x-java-source', 'text/x-java', CodeMirror);
  aliasMime('pom', 'text/xml', CodeMirror);
}

function defineCodeMirrorAqlMode(CodeMirror) {
  CodeMirror.defineMode('aql', function () {
    var urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;
    var inApiKey = false;
    return {
      token: function token(stream, state) {
        if (stream.match(/(?:curl|\-\H|\-\X|\-d|POST)\b/)) {
          return 'external-command';
        }

        if (stream.match(/(?:X\-Api\-Key)\b/)) {
          inApiKey = true;
          return 'header-tag';
        }

        if (stream.match('\'')) {
          inApiKey = false;
          return null;
        }

        if (stream.match(/(?:find|include|limit|sort|offset)\b/)) {
          return 'aql-keyword';
        }

        if (stream.match(/(?:\$and|\$or|\$ne|\$gt|\$gte|\$lt|\$lte|\$rf|\$msp|\$match|\$nmatch|\$eq|\$asc|\$desc)\b/)) {
          return 'aql-operators';
        }

        if (stream.match(/(?:items|builds|entries)\b/)) {
          return 'aql-domain';
        }

        if (stream.match(/[\{\}\[\]\(\)]+/)) {
          return 'aql-brackets';
        }

        if (stream.match(urlRegex)) {
          return 'api-url';
        }

        var ret = null;

        if (inApiKey && !stream.match(':')) {
          ret = 'api-key';
        }

        stream.next();
        return ret;
      }
    };
  });
}

function defineCodeMirrorLinkOverlay(CodeMirror) {
  var urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;
  CodeMirror.defineMode('links', function (config, parserConfig) {
    var linkOverlay = {
      token: function token(stream, state) {
        if (stream.match(urlRegex)) {
          return 'link';
        }

        while (stream.next() != null && !stream.match(urlRegex, false)) {}

        return null;
      }
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(config, config.mimeType || 'text/xml'), linkOverlay);
  });
}

function codeMirrorAsciidocConfig(CodeMirror) {
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

          if (Array.isArray(rule.token)) {
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
                return "\\" + (parseInt(digit, 10) + matchTotal + 1);
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

function initCodemirrorConfig(CodeMirror) {
  if (typeof CodeMirror === 'undefined' || _.isUndefined(CodeMirror)) return;
  codeMirrorAsciidocConfig(CodeMirror);
  defineCodeMirrorMimes(CodeMirror);
  defineCodeMirrorLinkOverlay(CodeMirror);
  defineCodeMirrorAqlMode(CodeMirror);
}
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
















window.CodeMirror = lib_codemirror_default.a;
/* harmony default export */ var JfCodeMirrorComponentvue_type_script_lang_js_ = ({
  name: 'jf-code-mirror',
  props: ['mimeType', 'mode', 'value', 'allowEdit', 'height', 'apiAccess', 'autofocus', 'matchBrackets', 'autoFormat', 'autoIndent', 'enableCopyToClipboard', 'clipboardCopyModel', 'clipboardCopyEntityName'],
  'jf@inject': ['$scope', '$element', '$timeout', 'JFrogUIUtils'],
  components: {
    codemirror: vue_codemirror["codemirror"]
  },
  data: function data() {
    return {
      formattedModel: null,
      editorOptions: null
    };
  },
  created: function created() {
    initCodemirrorConfig(lib_codemirror_default.a);
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

      var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

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
            window.open(url, '_blank', 'noopener noreferrer');
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
// EXTERNAL MODULE: ./src/components/JfCodeMirrorComponent/index.vue?vue&type=style&index=0&id=5b7e1fcc&scoped=true&lang=less&
var JfCodeMirrorComponentvue_type_style_index_0_id_5b7e1fcc_scoped_true_lang_less_ = __webpack_require__("8efb");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfCodeMirrorComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfCodeMirrorComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5b7e1fcc",
  null
  
)

/* harmony default export */ var JfCodeMirrorComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6925":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8efb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5b7e1fcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6925");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5b7e1fcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_5b7e1fcc_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfCodeMirror.js.map