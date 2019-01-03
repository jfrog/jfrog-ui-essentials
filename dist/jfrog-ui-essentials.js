/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(6);
	__webpack_require__(77);
	__webpack_require__(93);
	module.exports = __webpack_require__(97);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	main.$inject = ["$httpBackend", "$animate"];
	var initSelectizeConfig = __webpack_require__(2).initSelectizeConfig;

	var initCodemirrorConfig = __webpack_require__(3).initCodemirrorConfig;

	if (!String.prototype.endsWith) {
	    String.prototype.endsWith = function (str) {
	        return this.substr(this.length - str.length, str.length) === str;
	    };
	}
	if (!String.prototype.startsWith) {
	    String.prototype.startsWith = function (str) {
	        return this.substr(0, str.length) === str;
	    };
	}
	window.Hamster = __webpack_require__(4);
	__webpack_require__(5);

	angular.module("jfrog.ui.essentials", [
	// Vendor modules
	"ngMessages", "ngAnimate", "ui.utils", "ui.select", "ui.codemirror", "ui.router", "ngCookies", "toaster", "ngSanitize", "ngClipboard", "ui.bootstrap", "ui.grid.draggable-rows", "monospaced.mousewheel", "ae-datetimepicker",

	// Library modules
	"jfrog.ui.essentials.templates", "jfrog.ui.essentials.directives", "jfrog.ui.essentials.services", "jfrog.ui.essentials.filters"]).config(["$qProvider", function ($qProvider) {
	    $qProvider.errorOnUnhandledRejections(false);
	}]).run(main);

	/* @ngInject */
	function main($httpBackend, $animate) {

	    //$httpBackend.whenPOST(/.*/).passThrough();
	    //$httpBackend.whenPUT(/.*/).passThrough();
	    //$httpBackend.whenGET(/.*/).passThrough();
	    //$httpBackend.whenDELETE(/.*/).passThrough();
	    //$httpBackend.whenPATCH(/.*/).passThrough();

	    //angular.uppercase was removed in 1.7.0, we polyfill it here, to prevent breakage of 3rd party (ui-grid)
	    angular.uppercase = function (str) {
	        return str.toUpperCase();
	    };

	    tempFixForAnimateParamsReversal($animate);
	    initSelectizeConfig();
	    initCodemirrorConfig();
	}

	function tempFixForAnimateParamsReversal($animate) {
	    if ($animate && $animate.enabled && $animate.enabled.bind) {
	        (function () {
	            var origFunc = $animate.enabled.bind($animate);
	            $animate.enabled = function () {
	                if (typeof arguments[0] === "boolean" && typeof arguments[1] === "object") {
	                    var temp = arguments[0];
	                    arguments[0] = arguments[1];
	                    arguments[1] = temp;
	                }
	                return origFunc.apply($animate, arguments);
	            };
	        })();
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.initSelectizeConfig = initSelectizeConfig;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function initSelectizeConfig() {
		if (typeof Selectize === "undefined" || _.isUndefined(Selectize)) {
			return;
		}setSelectizePugins();
	}

	function setSelectizePugins() {
		Selectize.define("infinite_scroll", function (opts) {
			var self = this;
			var options = $.extend({ scrollRatio: 0.85, scrollStep: 20 }, opts);

			this.setup = (function () {
				var original = self.setup;
				return function () {
					original.apply(this, arguments);

					var dropdown_content = self.$dropdown_content;
					var original_maxOptions = self.settings.maxOptions;

					self.$dropdown_content.on("scroll", function (e) {
						var lastScrollTop = dropdown_content.scrollTop();
						var scrollPosition = (dropdown_content.scrollTop() + dropdown_content.innerHeight()) / dropdown_content[0].scrollHeight;
						if (scrollPosition > options.scrollRatio && self.settings.maxOptions < self.currentResults.total) {
							self.settings.maxOptions += options.scrollStep;
							self.refreshOptions();
							dropdown_content[0].scrollTop = lastScrollTop;
						}
					});

					self.on("type", function (e) {
						self.settings.maxOptions = original_maxOptions;
						self.refreshOptions();
					});
				};
			})();
		});
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.initCodemirrorConfig = initCodemirrorConfig;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function initCodemirrorConfig() {
		if (typeof CodeMirror === "undefined" || _.isUndefined(CodeMirror)) {
			return;
		}defineCodeMirrorMimes();
		defineCodeMirrorLinkOverlay();
		defineCodeMirrorAqlMode();
	}

	function aliasMime(newMime, existingMime) {
		CodeMirror.defineMIME(newMime, CodeMirror.mimeModes[existingMime]);
	}

	function defineCodeMirrorMimes() {
		aliasMime("text/x-java-source", "text/x-java");
		aliasMime("pom", "text/xml");
	}

	function defineCodeMirrorAqlMode() {
		CodeMirror.defineMode("aql", function () {
			var urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;
			var inApiKey = false;
			return {
				token: function token(stream, state) {

					if (stream.match(/(?:curl|\-\H|\-\X|\-d|POST)\b/)) {
						return "external-command";
					} else if (stream.match(/(?:X\-Api\-Key)\b/)) {
						inApiKey = true;
						return "header-tag";
					} else if (stream.match("'")) {
						inApiKey = false;
						return null;
					} else if (stream.match(/(?:find|include|limit|sort|offset)\b/)) {
						return "aql-keyword";
					} else if (stream.match(/(?:\$and|\$or|\$ne|\$gt|\$gte|\$lt|\$lte|\$rf|\$msp|\$match|\$nmatch|\$eq|\$asc|\$desc)\b/)) {
						return "aql-operators";
					} else if (stream.match(/(?:items|builds|entries)\b/)) {
						return "aql-domain";
					} else if (stream.match(/[\{\}\[\]\(\)]+/)) {
						return "aql-brackets";
					} else if (stream.match(urlRegex)) {
						return "api-url";
					} else {
						var ret = null;
						if (inApiKey && !stream.match(":")) {
							ret = "api-key";
						}
						stream.next();
						return ret;
					}
				}
			};
		});
	}

	function defineCodeMirrorLinkOverlay() {
		var urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;
		CodeMirror.defineMode("links", function (config, parserConfig) {
			var linkOverlay = {
				token: function token(stream, state) {
					if (stream.match(urlRegex)) {
						return "link";
					}
					while (stream.next() != null && !stream.match(urlRegex, false)) {}
					return null;
				}
			};

			return CodeMirror.overlayMode(CodeMirror.getMode(config, config.mimeType || "text/xml"), linkOverlay);
		});
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Hamster.js v1.1.2
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */

	"use strict";

	(function (window, document) {
	  "use strict";

	  /**
	   * Hamster
	   * use this to create instances
	   * @returns {Hamster.Instance}
	   * @constructor
	   */
	  var Hamster = (function (_Hamster) {
	    var _HamsterWrapper = function Hamster(_x) {
	      return _Hamster.apply(this, arguments);
	    };

	    _HamsterWrapper.toString = function () {
	      return _Hamster.toString();
	    };

	    return _HamsterWrapper;
	  })(function (element) {
	    return new Hamster.Instance(element);
	  });

	  // default event name
	  Hamster.SUPPORT = "wheel";

	  // default DOM methods
	  Hamster.ADD_EVENT = "addEventListener";
	  Hamster.REMOVE_EVENT = "removeEventListener";
	  Hamster.PREFIX = "";

	  // until browser inconsistencies have been fixed...
	  Hamster.READY = false;

	  Hamster.Instance = function (element) {
	    if (!Hamster.READY) {
	      // fix browser inconsistencies
	      Hamster.normalise.browser();

	      // Hamster is ready...!
	      Hamster.READY = true;
	    }

	    this.element = element;

	    // store attached event handlers
	    this.handlers = [];

	    // return instance
	    return this;
	  };

	  /**
	   * create new hamster instance
	   * all methods should return the instance itself, so it is chainable.
	   * @param   {HTMLElement}       element
	   * @returns {Hamster.Instance}
	   * @constructor
	   */
	  Hamster.Instance.prototype = {
	    /**
	     * bind events to the instance
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     * @returns {Hamster.Instance}
	     */
	    wheel: function onEvent(handler, useCapture) {
	      Hamster.event.add(this, Hamster.SUPPORT, handler, useCapture);

	      // handle MozMousePixelScroll in older Firefox
	      if (Hamster.SUPPORT === "DOMMouseScroll") {
	        Hamster.event.add(this, "MozMousePixelScroll", handler, useCapture);
	      }

	      return this;
	    },

	    /**
	     * unbind events to the instance
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     * @returns {Hamster.Instance}
	     */
	    unwheel: function offEvent(handler, useCapture) {
	      // if no handler argument,
	      // unbind the last bound handler (if exists)
	      if (handler === undefined && (handler = this.handlers.slice(-1)[0])) {
	        handler = handler.original;
	      }

	      Hamster.event.remove(this, Hamster.SUPPORT, handler, useCapture);

	      // handle MozMousePixelScroll in older Firefox
	      if (Hamster.SUPPORT === "DOMMouseScroll") {
	        Hamster.event.remove(this, "MozMousePixelScroll", handler, useCapture);
	      }

	      return this;
	    }
	  };

	  Hamster.event = {
	    /**
	     * cross-browser 'addWheelListener'
	     * @param   {Instance}    hamster
	     * @param   {String}      eventName
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     */
	    add: function add(hamster, eventName, handler, useCapture) {
	      // store the original handler
	      var originalHandler = handler;

	      // redefine the handler
	      handler = function (originalEvent) {

	        if (!originalEvent) {
	          originalEvent = window.event;
	        }

	        // create a normalised event object,
	        // and normalise "deltas" of the mouse wheel
	        var event = Hamster.normalise.event(originalEvent),
	            delta = Hamster.normalise.delta(originalEvent);

	        // fire the original handler with normalised arguments
	        return originalHandler(event, delta[0], delta[1], delta[2]);
	      };

	      // cross-browser addEventListener
	      hamster.element[Hamster.ADD_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	      // store original and normalised handlers on the instance
	      hamster.handlers.push({
	        original: originalHandler,
	        normalised: handler
	      });
	    },

	    /**
	     * removeWheelListener
	     * @param   {Instance}    hamster
	     * @param   {String}      eventName
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     */
	    remove: function remove(hamster, eventName, handler, useCapture) {
	      // find the normalised handler on the instance
	      var originalHandler = handler,
	          lookup = {},
	          handlers;
	      for (var i = 0, len = hamster.handlers.length; i < len; ++i) {
	        lookup[hamster.handlers[i].original] = hamster.handlers[i];
	      }
	      handlers = lookup[originalHandler];
	      handler = handlers.normalised;

	      // cross-browser removeEventListener
	      hamster.element[Hamster.REMOVE_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	      // remove original and normalised handlers from the instance
	      for (var h in hamster.handlers) {
	        if (hamster.handlers[h] == handlers) {
	          hamster.handlers.splice(h, 1);
	          break;
	        }
	      }
	    }
	  };

	  /**
	   * these hold the lowest deltas,
	   * used to normalise the delta values
	   * @type {Number}
	   */
	  var lowestDelta, lowestDeltaXY;

	  Hamster.normalise = {
	    /**
	     * fix browser inconsistencies
	     */
	    browser: function normaliseBrowser() {
	      // detect deprecated wheel events
	      if (!("onwheel" in document || document.documentMode >= 9)) {
	        Hamster.SUPPORT = document.onmousewheel !== undefined ? "mousewheel" : // webkit and IE < 9 support at least "mousewheel"
	        "DOMMouseScroll"; // assume remaining browsers are older Firefox
	      }

	      // detect deprecated event model
	      if (!window.addEventListener) {
	        // assume IE < 9
	        Hamster.ADD_EVENT = "attachEvent";
	        Hamster.REMOVE_EVENT = "detachEvent";
	        Hamster.PREFIX = "on";
	      }
	    },

	    /**
	     * create a normalised event object
	     * @param   {Function}    originalEvent
	     * @returns {Object}      event
	     */
	    event: function normaliseEvent(originalEvent) {
	      var event = {
	        // keep a reference to the original event object
	        originalEvent: originalEvent,
	        target: originalEvent.target || originalEvent.srcElement,
	        type: "wheel",
	        deltaMode: originalEvent.type === "MozMousePixelScroll" ? 0 : 1,
	        deltaX: 0,
	        deltaZ: 0,
	        preventDefault: function preventDefault() {
	          if (originalEvent.preventDefault) {
	            originalEvent.preventDefault();
	          } else {
	            originalEvent.returnValue = false;
	          }
	        },
	        stopPropagation: function stopPropagation() {
	          if (originalEvent.stopPropagation) {
	            originalEvent.stopPropagation();
	          } else {
	            originalEvent.cancelBubble = false;
	          }
	        }
	      };

	      // calculate deltaY (and deltaX) according to the event

	      // 'mousewheel'
	      if (originalEvent.wheelDelta) {
	        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
	      }
	      // webkit
	      if (originalEvent.wheelDeltaX) {
	        event.deltaX = -1 / 40 * originalEvent.wheelDeltaX;
	      }

	      // 'DomMouseScroll'
	      if (originalEvent.detail) {
	        event.deltaY = originalEvent.detail;
	      }

	      return event;
	    },

	    /**
	     * normalise 'deltas' of the mouse wheel
	     * @param   {Function}    originalEvent
	     * @returns {Array}       deltas
	     */
	    delta: function normaliseDelta(originalEvent) {
	      var delta = 0,
	          deltaX = 0,
	          deltaY = 0,
	          absDelta = 0,
	          absDeltaXY = 0,
	          fn;

	      // normalise deltas according to the event

	      // 'wheel' event
	      if (originalEvent.deltaY) {
	        deltaY = originalEvent.deltaY * -1;
	        delta = deltaY;
	      }
	      if (originalEvent.deltaX) {
	        deltaX = originalEvent.deltaX;
	        delta = deltaX * -1;
	      }

	      // 'mousewheel' event
	      if (originalEvent.wheelDelta) {
	        delta = originalEvent.wheelDelta;
	      }
	      // webkit
	      if (originalEvent.wheelDeltaY) {
	        deltaY = originalEvent.wheelDeltaY;
	      }
	      if (originalEvent.wheelDeltaX) {
	        deltaX = originalEvent.wheelDeltaX * -1;
	      }

	      // 'DomMouseScroll' event
	      if (originalEvent.detail) {
	        delta = originalEvent.detail * -1;
	      }

	      // Don't return NaN
	      if (delta === 0) {
	        return [0, 0, 0];
	      }

	      // look for lowest delta to normalize the delta values
	      absDelta = Math.abs(delta);
	      if (!lowestDelta || absDelta < lowestDelta) {
	        lowestDelta = absDelta;
	      }
	      absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
	      if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
	        lowestDeltaXY = absDeltaXY;
	      }

	      // convert deltas to whole numbers
	      fn = delta > 0 ? "floor" : "ceil";
	      delta = Math[fn](delta / lowestDelta);
	      deltaX = Math[fn](deltaX / lowestDeltaXY);
	      deltaY = Math[fn](deltaY / lowestDeltaXY);

	      return [delta, deltaX, deltaY];
	    }
	  };

	  if (typeof window.define === "function" && window.define.amd) {
	    // AMD
	    window.define("hamster", [], function () {
	      return Hamster;
	    });
	  } else if (true) {
	    // CommonJS
	    module.exports = Hamster;
	  } else {
	    // Browser global
	    window.Hamster = Hamster;
	  }
	})(window, window.document);

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
	 * angular-mousewheel v1.0.5
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */

	"use strict";

	angular.module("monospaced.mousewheel", []).directive("msdWheel", ["$parse", function ($parse) {
	  return {
	    restrict: "A, C",
	    link: function link(scope, element, attr) {
	      var expr = $parse(attr.msdWheel),
	          fn = function fn(event, delta, deltaX, deltaY) {
	        scope.$apply(function () {
	          expr(scope, {
	            $event: event,
	            $delta: delta,
	            $deltaX: deltaX,
	            $deltaY: deltaY
	          });
	        });
	      },
	          hamster;

	      if (typeof Hamster === "undefined") {
	        // fallback to standard wheel event
	        element.bind("wheel", function (event) {
	          scope.$apply(function () {
	            expr(scope, {
	              $event: event
	            });
	          });
	        });
	        return;
	      }

	      // don't create multiple Hamster instances per element
	      if (!(hamster = element.data("hamster"))) {
	        hamster = Hamster(element[0]);
	        element.data("hamster", hamster);
	      }

	      // bind Hamster wheel event
	      hamster.wheel(fn);

	      // unbind Hamster wheel event
	      scope.$on("$destroy", function () {
	        hamster.unwheel(fn);
	      });
	    }
	  };
	}]);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var MODULE_DATA_LIST = __webpack_require__(7).MODULE_DATA_LIST;

	var jfListMaker = __webpack_require__(12).jfListMaker;

	var jfActions = __webpack_require__(13).jfActions;

	var jfOnOffSwitch = _interopRequire(__webpack_require__(14));

	var jfSwitchToggler = _interopRequire(__webpack_require__(15));

	var jfTabularDnD = __webpack_require__(16).jfTabularDnD;

	var jfDragDrop = __webpack_require__(17).jfDragDrop;

	var jfDragDropPagination = __webpack_require__(18).jfDragDropPagination;

	var jfToggler = _interopRequire(__webpack_require__(20));

	var jfTooltip = __webpack_require__(21).jfTooltip;

	var jfHelpTooltip = __webpack_require__(22).jfHelpTooltip;

	var jfCheckbox = __webpack_require__(23).jfCheckbox;

	var jfSwitch = __webpack_require__(24).jfSwitch;

	var jfGrid = __webpack_require__(25).jfGrid;

	var jfGridPagination = __webpack_require__(26).jfGridPagination;

	var jfGridBatchActions = __webpack_require__(27).jfGridBatchActions;

	var jfField = __webpack_require__(28).jfField;

	var jfCodeMirror = __webpack_require__(29).jfCodeMirror;

	var jfGridFilter = __webpack_require__(35).jfGridFilter;

	var jfTabs = __webpack_require__(36).jfTabs;

	var jfTab = __webpack_require__(37).jfTab;

	var jfDrawer = __webpack_require__(38).jfDrawer;

	var jfPanel = __webpack_require__(39).jfPanel;

	var jfUiSelect = __webpack_require__(40).jfUiSelect;

	var jfRevealInput = __webpack_require__(41).jfRevealInput;

	var jfDisableNgAnimate = __webpack_require__(42).jfDisableNgAnimate;

	var jfIncludeReplace = __webpack_require__(43).jfIncludeReplace;

	var jfEnterPress = __webpack_require__(44).jfEnterPress;

	var jfTooltipOnOverflow = __webpack_require__(46).jfTooltipOnOverflow;

	var jfClipCopy = __webpack_require__(47).jfClipCopy;

	var jfValidation = __webpack_require__(48).jfValidation;

	var jfSidebar = __webpack_require__(50).jfSidebar;

	var jfMultiDropdown = __webpack_require__(51).jfMultiDropdown;

	var jfRadioButton = __webpack_require__(52).jfRadioButton;

	var jfWidgetsLayout = __webpack_require__(53).jfWidgetsLayout;

	var jfMarquee = __webpack_require__(54).jfMarquee;

	var jfPasswordStrength = __webpack_require__(55).jfPasswordStrength;

	var jfClearErrors = __webpack_require__(58).jfClearErrors;

	var jfFakeReadonly = __webpack_require__(59).jfFakeReadonly;

	var jfMarkupEditor = __webpack_require__(60).jfMarkupEditor;

	var jfJsTreeWrap = __webpack_require__(62).jfJsTreeWrap;

	var jfAutoComplete = __webpack_require__(63).jfAutoComplete;

	var jfDatetimepicker = __webpack_require__(64).jfDatetimepicker;

	var jfDynamicTemplate = __webpack_require__(65).jfDynamicTemplate;

	var jfListSelection = __webpack_require__(66).jfListSelection;

	var jfDragAndDropTxt = __webpack_require__(67).jfDragAndDropTxt;

	var jfContextMenu = __webpack_require__(68).jfContextMenu;

	var jfVScroll = __webpack_require__(69).jfVScroll;

	var jfVScrollElement = __webpack_require__(70).jfVScrollElement;

	var jfPendingData = __webpack_require__(71).jfPendingData;

	var jfTextBox = __webpack_require__(72).jfTextBox;

	var jfReparent = __webpack_require__(73).jfReparent;

	var jfWizard = _interopRequire(__webpack_require__(74));

	var jfWizardElement = _interopRequire(__webpack_require__(75));

	var jfBillboard = __webpack_require__(76).jfBillboard;

	angular.module("jfrog.ui.essentials.directives", [MODULE_DATA_LIST]).directive({
	    jfWizardElement: jfWizardElement,
	    jfWizard: jfWizard,
	    jfTabularDnd: jfTabularDnD,
	    jfDragDrop: jfDragDrop,
	    jfDragDropPagination: jfDragDropPagination,
	    jfActions: jfActions,
	    jfTooltip: jfTooltip,
	    jfHelpTooltip: jfHelpTooltip,
	    jfListMaker: jfListMaker,
	    jfCheckbox: jfCheckbox,
	    jfSwitch: jfSwitch,
	    jfGrid: jfGrid,
	    jfGridPagination: jfGridPagination,
	    jfGridBatchActions: jfGridBatchActions,
	    jfValidation: jfValidation,
	    jfField: jfField,
	    jfCodeMirror: jfCodeMirror,
	    jfGridFilter: jfGridFilter,
	    jfTabs: jfTabs,
	    jfTab: jfTab,
	    jfDrawer: jfDrawer,
	    jfPanel: jfPanel,
	    jfUiSelect: jfUiSelect,
	    jfRevealInput: jfRevealInput,
	    jfDisableNgAnimate: jfDisableNgAnimate,
	    jfIncludeReplace: jfIncludeReplace,
	    jfEnterPress: jfEnterPress,
	    jfTooltipOnOverflow: jfTooltipOnOverflow,
	    jfClipCopy: jfClipCopy,
	    jfSidebar: jfSidebar,
	    jfMultiDropdown: jfMultiDropdown,
	    jfWidgetsLayout: jfWidgetsLayout,
	    jfMarquee: jfMarquee,
	    jfPasswordStrength: jfPasswordStrength,
	    jfClearErrors: jfClearErrors,
	    jfFakeReadonly: jfFakeReadonly,
	    jfDatetimepicker: jfDatetimepicker,
	    jfDynamicTemplate: jfDynamicTemplate,
	    jfListSelection: jfListSelection,
	    jfMarkupEditor: jfMarkupEditor,
	    jfJsTreeWrap: jfJsTreeWrap,
	    jfAutoComplete: jfAutoComplete,
	    jfRadioButton: jfRadioButton,
	    jfDragAndDropTxt: jfDragAndDropTxt,
	    jfContextMenu: jfContextMenu,
	    jfVscroll: jfVScroll,
	    jfVscrollElement: jfVScrollElement,
	    jfToggler: jfToggler,
	    jfSwitchToggler: jfSwitchToggler,
	    jfOnOffSwitch: jfOnOffSwitch,
	    jfTextBox: jfTextBox,
	    jfReparent: jfReparent,
	    jfPendingData: jfPendingData,
	    jfBillboard: jfBillboard
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	       value: true
	});

	var jfDataListCompiledItem = _interopRequire(__webpack_require__(8));

	var jfDataListItem = _interopRequire(__webpack_require__(9));

	var jfDataList = _interopRequire(__webpack_require__(11));

	var MODULE_DATA_LIST = "jf.data.list";
	exports.MODULE_DATA_LIST = MODULE_DATA_LIST;
	angular.module(MODULE_DATA_LIST, []).directive("jfDataListCompiledItem", jfDataListCompiledItem).directive("jfDataListItem", jfDataListItem).directive("jfDataList", jfDataList);

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfDataListCompiledItem;

	function jfDataListCompiledItem() {
		var linkFn = function (scope, element, attrs) {
			var placeholder = element.find("div");
			var itemTemplate = "<div class=\"compiled-list-item\">" + scope.$ctrl.item.template + "</div>";
			var newScope = scope.$ctrl.$rootScope.$new();
			var itemScope = _.extend(newScope, { appScope: scope.$ctrl.item.scope });
			delete scope.$ctrl.item.scope; // Remove pointer to scope inside item
			itemScope.row = {};
			itemScope.row.entity = scope.$ctrl.item;
			var compiledElement = scope.$ctrl.$compile(itemTemplate)(itemScope);
			placeholder.after(compiledElement);
			placeholder.remove();
		};
		return {
			restrict: "E",
			scope: {
				item: "="
			},
			controller: jfDataListCompiledItemController,
			controllerAs: "$ctrl",
			bindToController: true,
			template: "<div></div>",
			link: linkFn
		};
	}

	var jfDataListCompiledItemController = function jfDataListCompiledItemController($element, $compile, $rootScope) {
		_classCallCheck(this, jfDataListCompiledItemController);

		this.$element = $element;
		this.$compile = $compile;
		this.$rootScope = $rootScope;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfDataListItem;

	function jfDataListItem() {

		return {
			restrict: "E",
			scope: {
				item: "=",
				index: "<"
			},
			templateUrl: "directives/jf_data_list/components/jf_data_list_item/jf_data_list_item.html",
			require: "^jfDataList",
			controller: jfDataListItemController,
			bindToController: true,
			controllerAs: "$ctrl"
		};
	}

	var jfDataListItemController = (function () {
		function jfDataListItemController($scope, JFrogModal, $rootScope, $element, JFrogUIUtils, $compile) {
			_classCallCheck(this, jfDataListItemController);

			this.$scope = $scope;
			this.JFrogModal = JFrogModal;
			this.$rootScope = $rootScope;
			this.$element = $element;
			this.JFrogUIUtils = JFrogUIUtils;
			this.$compile = $compile;
		}

		_createClass(jfDataListItemController, {
			htmlIsOverflowing: {

				/**
	    * htmlIsOverflowing(rowId)
	    * Get al the row's children.
	    * Then sum all the children's box model width (includes padding and margin) in a loop
	    * If the child already has the overflowing class => remove it
	    * When the sum gets > then the container's width => add the overflowing class to him
	    * After exiting the loop return the overflowing flag
	    * **/

				value: function htmlIsOverflowing(rowId) {
					var elem = this.$element.find(rowId);
					if (!elem || !elem.length) {
						return false;
					}var children = elem.children(".tag");
					var maxWidth = elem.closest(".data-list-item-value").outerWidth() - 60;
					var totalChildrenWidth = 0;
					children.each(function (i, child) {
						var childElem = $(child);
						totalChildrenWidth += childElem.outerWidth() + parseInt(childElem.css("margin-left")) + parseInt(childElem.css("margin-right"));

						if (totalChildrenWidth < maxWidth) {
							childElem.removeClass("overflowing-child");
						}
						if (totalChildrenWidth > maxWidth && !childElem.is(".overflowing-child")) {
							childElem.addClass("overflowing-child");
						}
					});
					return elem.children(".tag.overflowing-child").length > 0;
				}
			},
			showAll: {
				value: function showAll(model, rowName, objectName) {
					var _this = this;

					var modalScope = this.$rootScope.$new();
					modalScope.items = model;
					modalScope.rowName = rowName;
					modalScope.objectName = objectName;

					modalScope.filter = {};
					modalScope.filterItem = function (item) {
						if (modalScope.filter.text) {
							var escaped = _this.JFrogUIUtils.escapeForRegex(modalScope.filter.text);
							var regex = new RegExp(".*" + escaped.split("\\*").join(".*") + ".*", "i");
							return regex.test(item.label);
						} else {
							return true;
						}
					};

					modalScope.noResults = function () {
						var filteredResults = _.filter(modalScope.items, function (item) {
							return modalScope.filterItem(item);
						});
						return filteredResults.length === 0;
					};

					this.JFrogModal.launchModalWithTemplateMarkup(__webpack_require__(10), modalScope, "sm", true);
				}
			},
			isArray: {
				value: function isArray(o) {
					return Array.isArray(o);
				}
			},
			getItemValue: {
				value: function getItemValue(value) {
					return value || "&nbsp";
				}
			}
		});

		return jfDataListItemController;
	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div id=\"show-all-modal\">\n\t<div class=\"modal-header\">\n\t\t<button type=\"button\" class=\"close\" data-dismiss=\"close\" aria-label=\"Close\" ng-click=\"$dismiss()\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t<h4 class=\"modal-title\" id=\"popup-header\">{{items.length}} {{colName}} For {{objectName}} '{{rowName}}'</h4>\n\t</div>\n\t<div class=\"modal-body clearfix\">\n\t\t<input type=\"text\"\n\t\t       name=\"filter\"\n\t\t       class=\"input-text\"\n\t\t       ng-model=\"filter.text\"\n\t\t       placeholder=\"Filter\"/>\n\n\n\t\t<div class=\"group-list-wrapper\" ng-if=\"!noResults()\">\n\t\t\t<ul class=\"group-list\">\n\t\t\t\t<li class=\"group-list-item\"\n\t\t\t\t    jf-tooltip-on-overflow\n\t\t\t\t    ng-repeat=\"item in items track by $index\"\n\t\t\t\t    ng-if=\"filterItem(item)\">\n\t\t\t\t\t<div ng-if=\"!item.url\" ng-bind-html=\"item.label\"></div>\n\t\t\t\t\t<a ng-if=\"item.url\" class=\"jf-link\" ng-href=\"{{item.url}}\" ng-bind-html=\"item.label\" target=\"_blank\"></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div class=\"empty-filter-placeholder filter-no-results\" ng-if=\"noResults()\">\n\t\t\tCurrent filter has no results. <a href class=\"jf-link\" ng-click=\"filter.text = ''\">Clear filter</a>\n\t\t</div>\n\n\t</div>\n\t<div class=\"modal-footer\">\n\t\t<button class=\"btn btn-default\" ng-click=\"$dismiss()\" id=\"popup-cancel\">Close</button>\n\t</div>\n</div>";

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfDataList;

	var jfDataListController = function jfDataListController($scope) {
		var _this = this;

		_classCallCheck(this, jfDataListController);

		this.$scope = $scope;

		this.$scope.$watch("jfDataList.items", function (items) {
			if (items) {
				_this.formattedItems = _.filter(items, function (item) {
					return item.label != "";
				});
			}
		});
	};

	function jfDataList() {
		return {
			restrict: "E",
			scope: {
				items: "="
			},
			controller: jfDataListController,
			controllerAs: "jfDataList",
			bindToController: true,
			templateUrl: "directives/jf_data_list/jf_data_list.html"
		};
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfListMaker = jfListMaker;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfListMaker() {

	    return {
	        restrict: "E",
	        scope: {
	            values: "=",
	            label: "@",
	            helpTooltip: "=",
	            objectName: "@",
	            ngDisabled: "=",
	            noSort: "=?",
	            minLength: "@",
	            inputType: "@?",
	            predefinedValues: "=?",
	            placeholder: "@?",
	            listId: "@",
	            onAddValue: "&?",
	            onAfterAddValue: "&?",
	            onAfterDeleteValue: "&?",
	            hideAddNewFields: "@",
	            validationRegex: "@",
	            validationRegexMessage: "@",
	            caseInsensitive: "<?",
	            required: "=?ngRequired"
	        },
	        templateUrl: "directives/jf_list_maker/jf_list_maker.html",
	        controller: jfListMakerController,
	        controllerAs: "jfListMaker",
	        bindToController: true
	    };
	}

	/**
	 * API for the jfDragDrop directive
	 */

	var jfListMakerController = (function () {
	    /* @ngInject */

	    jfListMakerController.$inject = ["$attrs", "$scope"];
	    function jfListMakerController($attrs, $scope) {
	        _classCallCheck(this, jfListMakerController);

	        this.$attrs = $attrs;
	        this.$scope = $scope;
	    }

	    _createClass(jfListMakerController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.$scope.$watch("jfListMaker.values.length", function () {
	                    _this.validateIsRequired(_this.values);
	                });

	                this.noSort = this.noSort || this.$attrs.hasOwnProperty("noSort");
	                if (this.values && !this.noSort) this.values = _.sortBy(this.values);
	                this.minLength = this.minLength || 0;

	                var randomId = Math.floor(1000000000 * Math.random());
	                if (!this.listId) this.listId = "list-id-" + randomId;
	            }
	        },
	        addValue: {
	            value: function addValue() {

	                if (!this.values) this.values = [];

	                this.errorMessage = null;

	                if (_.isEmpty(this.newValue)) {
	                    this.errorMessage = "Must input value";
	                } else if (!this._isValueUnique(this.newValue)) {
	                    this.errorMessage = "Value already exists";
	                } else if (!_.isEmpty(this.validationRegex) && !new RegExp(this.validationRegex).test(this.newValue)) {
	                    this.errorMessage = _.isEmpty(this.validationRegexMessage) ? "Value not valid" : this.validationRegexMessage;
	                } else {
	                    if (this.onAddValue) {
	                        this.newValue = this.onAddValue({ newValue: this.newValue });
	                    }
	                    this.values.push(this.newValue);
	                    this.newValue = null;
	                    if (this.onAfterAddValue) {
	                        this.onAfterAddValue();
	                    }
	                }
	                if (!this.noSort) {
	                    this.values = _.sortBy(this.values);
	                }
	            }
	        },
	        removeValue: {
	            value: function removeValue(index) {
	                this.values.splice(index, 1);

	                if (this.onAfterDeleteValue && typeof this.onAfterDeleteValue === "function") {
	                    this.onAfterDeleteValue();
	                }
	            }
	        },
	        _isValueUnique: {
	            value: function _isValueUnique(text) {
	                if (this.caseInsensitive) {
	                    return !this.values || !_.find(this.values, function (val) {
	                        return val.toLowerCase() === text.toLowerCase();
	                    });
	                }
	                return !this.values || this.values.indexOf(text) == -1;
	            }
	        },
	        isRequired: {
	            value: function isRequired(valuesArray) {
	                return this.required && (_.isUndefined(valuesArray) || _.isEmpty(valuesArray));
	            }
	        },
	        validateIsRequired: {
	            value: function validateIsRequired(values) {
	                if (this.isRequired(values)) {
	                    if (this.listMakerForm && this.listMakerForm.newValueField) {
	                        this.listMakerForm.newValueField.$setValidity("mustAddValueTolist", false);
	                    } else {
	                        this.errorMessage = "You must add a value to list";
	                    }
	                } else {
	                    if (this.listMakerForm && this.listMakerForm.newValueField) {
	                        this.listMakerForm.newValueField.$setValidity("mustAddValueTolist", true);
	                    }
	                    this.errorMessage = null;
	                }
	            }
	        },
	        onNewValueFieldChange: {
	            value: function onNewValueFieldChange() {
	                this.validateIsRequired(this.values);
	            }
	        }
	    });

	    return jfListMakerController;
	})();

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	jfActions.$inject = ["$timeout"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfActions = jfActions;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfActionsController = (function () {
	    /* @ngInject */

	    jfActionsController.$inject = ["$scope", "$timeout"];
	    function jfActionsController($scope, $timeout) {
	        var _this = this;

	        _classCallCheck(this, jfActionsController);

	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.isDropdownOpen = false;
	        this.$scope.$watch("jfActions.hasSingleVisibleAction()", function (newVal, oldVal) {
	            if (newVal !== oldVal) {
	                _this._divideActions();
	            }
	        });
	    }

	    _createClass(jfActionsController, {
	        $onInit: {
	            value: function $onInit() {
	                if (!this.label) this.label = "Actions";

	                if (this.parentController && this.initMethod && this.parentController[this.initMethod]) {
	                    this.parentController[this.initMethod](this);
	                } else {
	                    console.error("jfActionsController: Missing parent-controller & init-method attributes");
	                }
	            }
	        },
	        setActionsHandler: {
	            value: function setActionsHandler(actionsHandler) {
	                this.actionsHandler = actionsHandler;
	            }
	        },
	        setCurrentEntity: {
	            value: function setCurrentEntity(entity) {
	                this.currentEntity = entity;
	            }
	        },
	        setActionsDictionary: {
	            value: function setActionsDictionary(actionsDictionary) {
	                this.actionsDictionary = actionsDictionary;
	            }
	        },
	        setActions: {
	            value: function setActions(actions) {
	                this.actions = actions || [];
	                this._transformActionsData();
	            }
	        },
	        doAction: {
	            value: function doAction(actionObj, e) {
	                if (actionObj.disabled || actionObj.disabledWhen && actionObj.disabledWhen()) {
	                    e.stopPropagation();
	                    e.preventDefault();
	                    return;
	                }
	                if (actionObj.name === "Download" && actionObj.xrayShouldValidate) {
	                    e.preventDefault();
	                }
	                if (this.actionsHandler) {
	                    this.actionsHandler.perform(actionObj, this.currentEntity);
	                } else if (actionObj.action) {
	                    actionObj.action(this.currentEntity);
	                }
	            }
	        },
	        getActiveActionsCount: {
	            value: function getActiveActionsCount() {
	                if (!this.actions || !this.actions.length) {
	                    return 0;
	                }return _.filter(this.actions, function (act) {
	                    return !act.visibleWhen || act.visibleWhen();
	                }).length;
	            }
	        },
	        _toggleDropdown: {
	            value: function _toggleDropdown(isOpen) {
	                var _this = this;

	                this.$timeout(function () {
	                    _this.isDropdownOpen = isOpen;
	                });
	            }
	        },
	        _transformActionsData: {

	            // Transform from server JSON to client representation

	            value: function _transformActionsData() {
	                var _this = this;

	                // extend action properties from ACTIONS dictionary
	                this.actions.forEach(function (actionObj) {
	                    if (!_this.actionsDictionary[actionObj.name]) {
	                        console.log("Unrecognized action", actionObj.name);
	                        return true;
	                    }
	                    angular.extend(actionObj, _this.actionsDictionary[actionObj.name]);
	                });
	                // Divide actions to fixed and dynamic (dropdown)
	                this._divideActions();
	            }
	        },
	        _divideActions: {
	            value: function _divideActions() {
	                var _this = this;

	                this.fixedActions = [];
	                this.dynamicActions = [];

	                if (this.hasSingleVisibleAction()) {
	                    this.fixedActions.push(this.actions.find(function (action) {
	                        return !action.visibleWhen || action.visibleWhen();
	                    }));
	                    return;
	                }

	                _.forEach(this.actions, function (actionObj) {
	                    if (_.contains(_this.fixedActionsNames, actionObj.name)) {
	                        _this.fixedActions.push(actionObj);
	                    } else {
	                        _this.dynamicActions.push(actionObj);
	                        if (actionObj.icon) {
	                            _this.anyActionHasAnIcon = true;
	                        }
	                    }
	                });
	                if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
	                    this.fixedActions.push(this.dynamicActions.pop());
	                }
	            }
	        },
	        hasSingleVisibleAction: {
	            value: function hasSingleVisibleAction() {
	                return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
	            }
	        }
	    });

	    return jfActionsController;
	})();

	function jfActions($timeout) {
	    "ngInject";
	    return {
	        scope: {
	            parentController: "=",
	            label: "@",
	            initMethod: "@",
	            fixedActionsNames: "=",
	            disableMouseOverEvents: "@?",
	            showDropDownForOneItem: "="
	        },
	        restrict: "EA",
	        controller: jfActionsController,
	        controllerAs: "jfActions",
	        templateUrl: "directives/jf_actions/jf_actions.html",
	        bindToController: true,
	        link: function link($scope, element, attr, jfActions) {
	            var dropdownOver = false;
	            var buttonOver = false;
	            var $dropdownElement = $(element).find(".actions-more");
	            var $buttonElement = $(element).find(".action-button");
	            var stayOpened = false;
	            var clicked = false;

	            jfActions.disableMouseOverEvents = jfActions.disableMouseOverEvents !== undefined;

	            if (!jfActions.disableMouseOverEvents) {
	                $dropdownElement.on("mouseup", function () {
	                    if (!stayOpened) {
	                        clicked = true;
	                    }
	                });
	                $dropdownElement.on("mouseenter", function () {
	                    buttonOver = true;
	                    jfActions._toggleDropdown(true);
	                });
	                $dropdownElement.on("mouseleave", function () {
	                    buttonOver = false;
	                    if (!stayOpened) {
	                        jfActions._toggleDropdown(dropdownOver);
	                    }
	                });
	                $buttonElement.on("mouseenter", function () {
	                    dropdownOver = true;
	                    jfActions._toggleDropdown(true);
	                });
	                $buttonElement.on("mouseleave", function () {
	                    dropdownOver = false;
	                    if (!stayOpened) {
	                        $timeout(function () {
	                            jfActions._toggleDropdown(buttonOver || dropdownOver);
	                        }, 200);
	                    }
	                });
	            }

	            var unwatch = $scope.$watch("jfActions.isDropdownOpen", function (newVal, oldVal) {
	                if (!newVal && clicked) {
	                    jfActions.isDropdownOpen = true;
	                    clicked = false;
	                    stayOpened = true;
	                } else if (!newVal && stayOpened) {
	                    stayOpened = false;
	                }
	            });

	            $scope.$on("$destroy", function () {
	                if (!jfActions.disableMouseOverEvents) {
	                    $dropdownElement.off("mouseup");
	                    $dropdownElement.off("mouseenter");
	                    $dropdownElement.off("mouseleave");
	                    $buttonElement.off("mouseenter");
	                    $buttonElement.off("mouseleave");
	                }
	                unwatch();
	            });

	            jfActions.showDropdown = function () {
	                stayOpened = true;
	                clicked = true;
	                buttonOver = true;
	                dropdownOver = true;
	                jfActions._toggleDropdown(true);
	            };

	            jfActions.hideDropdown = function () {
	                stayOpened = false;
	                clicked = false;
	                buttonOver = false;
	                dropdownOver = false;
	                jfActions._toggleDropdown(false);
	            };
	        }
	    };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfOnOffSwitch;

	var jfOnOffSwitchController = (function () {
		function jfOnOffSwitchController() {
			_classCallCheck(this, jfOnOffSwitchController);
		}

		_createClass(jfOnOffSwitchController, {
			$onInit: {
				value: function $onInit() {
					if (!this.options) throw "Must supply options";
					this.on = this.options[0];
					this.off = this.options[1];
					if (_.isEmpty(this.selected)) {
						this.selected = this.on;
					}
					this.isOn = this.selected === this.on;
				}
			},
			toggleSelection: {
				value: function toggleSelection() {
					this.selected = this.selected === this.on ? this.off : this.on;
				}
			}
		});

		return jfOnOffSwitchController;
	})();

	function jfOnOffSwitch() {
		return {
			restrict: "E",
			scope: {
				selected: "=",
				options: "<" },
			controller: jfOnOffSwitchController,
			controllerAs: "$ctrl",
			bindToController: true,
			templateUrl: "directives/jf_on_off_switch/jf_on_off_switch.html"
		};
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfSwitchToggler;

	var jfSwitchTogglerController = (function () {
		function jfSwitchTogglerController() {
			_classCallCheck(this, jfSwitchTogglerController);
		}

		_createClass(jfSwitchTogglerController, {
			$onInit: {
				value: function $onInit() {
					if (!this.options) throw "Must supply options";
					// Supports 2 methods of options:
					// array of strings
					// array of objects of type {'value': ..., 'text': ...}
					// The model is assigned the value, and the text is displayed

					this.setOptionObjects();
					if (_.isEmpty(this.model)) {
						this.model = this.leftOption.value;
					}
					this.isLeftOptionOn = this.model === this.leftOption.value;
				}
			},
			toggleSelection: {
				value: function toggleSelection() {
					this.model = this.model === this.leftOption.value ? this.rightOption.value : this.leftOption.value;
				}
			},
			setOptionObjects: {
				value: function setOptionObjects() {
					var optionObjects = this.options.map(function (option) {
						if (typeof option === "string") return { value: option, text: option };else {
							return option;
						}
					});

					this.leftOption = optionObjects[0];
					this.rightOption = optionObjects[1];
				}
			}
		});

		return jfSwitchTogglerController;
	})();

	function jfSwitchToggler() {
		return {
			restrict: "E",
			scope: {
				model: "=",
				options: "<" },
			controller: jfSwitchTogglerController,
			controllerAs: "$ctrl",
			bindToController: true,
			templateUrl: "directives/jf_switch_toggler/jf_switch_toggler.html"
		};
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTabularDnD = jfTabularDnD;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfTabularDnD() {

	    return {
	        restrict: "E",
	        scope: {
	            availableItems: "=",
	            selectedItems: "=",
	            itemClassAttr: "@?",
	            itemDraggableAttr: "@?",
	            columns: "=",
	            numberOfRows: "@?",
	            availableItemsColumns: "=?",
	            selectedItemsColumns: "=?",
	            onChange: "&?",
	            onRowClick: "&?",
	            entityName: "@?",
	            appScope: "=?",
	            disableWholeRowSelection: "=?",
	            disabled: "=ngDisabled"
	        },
	        templateUrl: "directives/jf_tabular_dnd/jf_tabular_dnd.html",
	        controller: jfTabularDnDController,
	        controllerAs: "jfTabularDnD",
	        bindToController: true };
	}

	var jfTabularDnDController = (function () {
	    /* @ngInject */

	    jfTabularDnDController.$inject = ["$element", "$scope", "JFrogTableViewOptions"];
	    function jfTabularDnDController($element, $scope, JFrogTableViewOptions) {
	        _classCallCheck(this, jfTabularDnDController);

	        this.$scope = $scope;
	        this.$element = $element;
	        this.JFrogTableViewOptions = JFrogTableViewOptions;
	    }

	    _createClass(jfTabularDnDController, {
	        $onInit: {
	            value: function $onInit() {
	                if (this.columns) {
	                    this.availableItemsColumns = _.cloneDeep(this.columns);
	                    this.selectedItemsColumns = _.cloneDeep(this.columns);
	                }
	                this.availableContainer = $(this.$element).find(".available-table");
	                this.selectedContainer = $(this.$element).find(".selected-table");

	                this.createTables();
	            }
	        },
	        createAutoColumns: {
	            value: function createAutoColumns() {
	                var _this = this;

	                ["availableItemsColumns", "selectedItemsColumns"].forEach(function (columnsArrayName) {
	                    var newColumnsArray = _.map(_this[columnsArrayName], function (column) {
	                        if (_.isObject(column)) return column;else if (_.isString(column)) return { field: column };
	                    });
	                    // Replacing the content of the array without changing the reference to it, to support setting Array literals on templates.
	                    Array.prototype.splice.apply(_this[columnsArrayName], [0, _this[columnsArrayName].length].concat(newColumnsArray));
	                });
	            }
	        },
	        createTables: {
	            value: function createTables() {
	                var _this = this;

	                this.createAutoColumns();

	                if (!this.numberOfRows) this.numberOfRows = 8;

	                this.availableItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
	                this.selectedItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);

	                var emptyPlaceholdersStyle = {
	                    height: 50 * this.numberOfRows + "px",
	                    "line-height": 50 * this.numberOfRows + "px"
	                };

	                this.availableItemsTableOptions._registerTabularDnd(this, "available", this.selectedItemsTableOptions, emptyPlaceholdersStyle);
	                this.selectedItemsTableOptions._registerTabularDnd(this, "selected", this.availableItemsTableOptions, emptyPlaceholdersStyle);

	                var _getObjectNames = this._getObjectNames();

	                var availableObjectName = _getObjectNames.availableObjectName;
	                var selectedObjectName = _getObjectNames.selectedObjectName;

	                this.availableItemsTableOptions.setColumns(this.availableItemsColumns).setSelection(this.availableItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.availableItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parseInt(this.numberOfRows)).setObjectName(availableObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
	                    return _this.disabled;
	                }).setEmptyTableText(!this.availableItems.length && !this.selectedItems.length ? "No data found" : "Drag row here");

	                this.selectedItemsTableOptions.setColumns(this.selectedItemsColumns).setSelection(this.selectedItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.selectedItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parseInt(this.numberOfRows)).setObjectName(selectedObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
	                    return _this.disabled;
	                }).setEmptyTableText("Drag row here");

	                this.selectedItemsTableOptions.isRowSelectable = this.availableItemsTableOptions.isRowSelectable = function (row) {
	                    return _this._isItemDraggable(row.entity);
	                };

	                if (!this.disableWholeRowSelection) {
	                    var toggleSelection = function (row) {
	                        if (_this.disabled || _this.itemDraggableAttr && (!row.entity.hasOwnProperty("" + _this.itemDraggableAttr) || !row.entity[_this.itemDraggableAttr])) return;
	                        row.entity.$selected = !row.entity.$selected;
	                    };
	                    this.availableItemsTableOptions.on("row.clicked", toggleSelection);
	                    this.selectedItemsTableOptions.on("row.clicked", toggleSelection);
	                }

	                if (this.onRowClick) {
	                    this.availableItemsTableOptions.on("row.clicked", function (row) {
	                        return _this.onRowClick({ row: row.entity, list: "available" });
	                    });
	                    this.selectedItemsTableOptions.on("row.clicked", function (row) {
	                        return _this.onRowClick({ row: row.entity, list: "selected" });
	                    });
	                }

	                this.availableItemsTableOptions.on("selection.change", function () {
	                    if (_this.disabled) _this.availableItemsTableOptions.clearSelection();
	                });
	                this.selectedItemsTableOptions.on("selection.change", function () {
	                    if (_this.disabled) _this.selectedItemsTableOptions.clearSelection();
	                });

	                this.$scope.$watch("jfTabularDnD.disabled", function () {
	                    if (_this.disabled) {
	                        _this.selectedItemsTableOptions.clearSelection();
	                        _this.availableItemsTableOptions.clearSelection();
	                    }
	                });

	                this.availableItemsTableOptions.setData(this.availableItems);
	                this.selectedItemsTableOptions.setData(this.selectedItems);
	            }
	        },
	        _getObjectNames: {
	            value: function _getObjectNames() {

	                var availableObjectName = undefined,
	                    selectedObjectName = undefined;

	                if (this.entityName) {
	                    if (this.entityName.indexOf("/") !== -1) {
	                        var _entityName$split = this.entityName.split("/");

	                        var _entityName$split2 = _slicedToArray(_entityName$split, 2);

	                        var single = _entityName$split2[0];
	                        var plural = _entityName$split2[1];

	                        availableObjectName = "Available " + single + "/" + "Available " + plural;
	                        selectedObjectName = "Included " + single + "/" + "Included " + plural;
	                    } else {
	                        availableObjectName = "Available " + this.entityName;
	                        selectedObjectName = "Included " + this.entityName;
	                    }
	                } else {
	                    availableObjectName = "Available Item";
	                    selectedObjectName = "Included Item";
	                }

	                return { availableObjectName: availableObjectName, selectedObjectName: selectedObjectName };
	            }
	        },
	        areAllRowsDisabled: {
	            value: function areAllRowsDisabled(allFilteredRows) {
	                var _this = this;

	                if (!allFilteredRows || !allFilteredRows.length) {
	                    return true;
	                }if (allFilteredRows.length && !this.itemDraggableAttr) {
	                    return false;
	                }var allDraggableRows = _.filter(allFilteredRows, function (rowEntity) {
	                    return rowEntity.hasOwnProperty("" + _this.itemDraggableAttr) ? rowEntity[_this.itemDraggableAttr] : true;
	                });
	                return !allDraggableRows || allDraggableRows.length === 0;
	            }
	        },
	        isIncludeListEmpty: {
	            value: function isIncludeListEmpty() {
	                if (!this.selectedItemsTableOptions.dirCtrl) {
	                    return true;
	                }return !this.selectedItemsTableOptions.getFilteredData().length;
	            }
	        },
	        isExcludeListEmpty: {
	            value: function isExcludeListEmpty() {
	                if (!this.availableItemsTableOptions.dirCtrl) {
	                    return true;
	                }return !this.availableItemsTableOptions.getFilteredData().length;
	            }
	        },
	        isIncludeListItemSelected: {
	            value: function isIncludeListItemSelected() {
	                if (!this.selectedItemsTableOptions.dirCtrl) {
	                    return false;
	                }var selected = this.selectedItemsTableOptions.getSelected();
	                var filtered = this.selectedItemsTableOptions.getFilteredData();
	                selected = _.filter(selected, function (item) {
	                    return _.includes(filtered, item);
	                });
	                return !!selected.length;
	            }
	        },
	        isExcludeListItemSelected: {
	            value: function isExcludeListItemSelected() {
	                if (!this.availableItemsTableOptions.dirCtrl) {
	                    return false;
	                }var selected = this.availableItemsTableOptions.getSelected();
	                var filtered = this.availableItemsTableOptions.getFilteredData();
	                selected = _.filter(selected, function (item) {
	                    return _.includes(filtered, item);
	                });
	                return !!selected.length;
	            }
	        },
	        isExcludeAllActionDisabled: {
	            value: function isExcludeAllActionDisabled() {
	                return this.isIncludeListEmpty() || this.areAllRowsDisabled(this.selectedItemsTableOptions.getFilteredData()) || this.disabled;
	            }
	        },
	        excludeAll: {
	            value: function excludeAll() {
	                if (this.isExcludeAllActionDisabled()) {
	                    return;
	                }var selected = this.selectedItemsTableOptions.getSelected();
	                selected.forEach(function (s) {
	                    return delete s.$selected;
	                });
	                this.selectedItemsTableOptions.dirCtrl.allSelected = false;
	                var filtered = this.selectedItemsTableOptions.getFilteredData();
	                filtered = this._getOnlyDraggables(filtered);
	                Array.prototype.splice.apply(this.availableItems, [this.availableItems.length, 0].concat(filtered));
	                _.remove(this.selectedItems, function (i) {
	                    return _.includes(filtered, i);
	                });
	                this._refreshBothTables();
	                this._fireOnChange();
	            }
	        },
	        isIncludeAllActionDisabled: {
	            value: function isIncludeAllActionDisabled() {
	                return this.isExcludeListEmpty() || this.areAllRowsDisabled(this.availableItemsTableOptions.getFilteredData()) || this.disabled;
	            }
	        },
	        includeAll: {
	            value: function includeAll() {
	                if (this.isIncludeAllActionDisabled()) {
	                    return;
	                }var selected = this.availableItemsTableOptions.getSelected();
	                selected.forEach(function (s) {
	                    return delete s.$selected;
	                });
	                this.availableItemsTableOptions.dirCtrl.allSelected = false;
	                var filtered = this.availableItemsTableOptions.getFilteredData();
	                filtered = this._getOnlyDraggables(filtered);
	                Array.prototype.splice.apply(this.selectedItems, [this.selectedItems.length, 0].concat(filtered));
	                _.remove(this.availableItems, function (i) {
	                    return _.includes(filtered, i);
	                });
	                this._refreshBothTables();
	                this._fireOnChange();
	            }
	        },
	        excludeSelected: {
	            value: function excludeSelected() {
	                if (!this.isIncludeListItemSelected() || this.disabled) {
	                    return;
	                }var selected = this.selectedItemsTableOptions.getSelected();
	                selected.forEach(function (s) {
	                    return delete s.$selected;
	                });
	                this.selectedItemsTableOptions.dirCtrl.allSelected = false;
	                var filtered = this.selectedItemsTableOptions.getFilteredData();
	                _.remove(selected, function (i) {
	                    return !_.includes(filtered, i);
	                });
	                selected = this._getOnlyDraggables(selected);
	                Array.prototype.splice.apply(this.availableItems, [this.availableItems.length, 0].concat(selected));
	                _.remove(this.selectedItems, function (item) {
	                    return _.includes(selected, item);
	                });
	                this._refreshBothTables();
	                this._fireOnChange();
	            }
	        },
	        includeSelected: {
	            value: function includeSelected() {
	                if (!this.isExcludeListItemSelected() || this.disabled) {
	                    return;
	                }var selected = this.availableItemsTableOptions.getSelected();
	                selected.forEach(function (s) {
	                    return delete s.$selected;
	                });
	                this.availableItemsTableOptions.dirCtrl.allSelected = false;
	                var filtered = this.availableItemsTableOptions.getFilteredData();
	                _.remove(selected, function (i) {
	                    return !_.includes(filtered, i);
	                });
	                selected = this._getOnlyDraggables(selected);
	                Array.prototype.splice.apply(this.selectedItems, [this.selectedItems.length, 0].concat(selected));
	                _.remove(this.availableItems, function (item) {
	                    return _.includes(selected, item);
	                });
	                this._refreshBothTables();
	                this._fireOnChange();
	            }
	        },
	        _getOnlyDraggables: {
	            value: function _getOnlyDraggables(array) {
	                var _this = this;

	                if (this.itemDraggableAttr) {
	                    return _.filter(array, function (item) {
	                        return _this._isItemDraggable(item);
	                    });
	                } else {
	                    return array;
	                }
	            }
	        },
	        _isItemDraggable: {
	            value: function _isItemDraggable(item) {
	                if (this.itemDraggableAttr) {
	                    return _.isUndefined(item[this.itemDraggableAttr]) || item[this.itemDraggableAttr];
	                } else {
	                    return true;
	                }
	            }
	        },
	        _refreshBothTables: {
	            value: function _refreshBothTables() {
	                [this.availableItemsTableOptions, this.selectedItemsTableOptions].forEach(function (tableOptions) {
	                    tableOptions.update();
	                    tableOptions.refreshFilter();
	                });
	            }
	        },
	        onDragTransfer: {
	            value: function onDragTransfer(draggedRows, originTableOptions) {
	                draggedRows.forEach(function (draggedRow) {
	                    return delete draggedRow.$selected;
	                });
	                originTableOptions.dirCtrl.allSelected = false;
	                this._fireOnChange();
	            }
	        },
	        _fireOnChange: {
	            value: function _fireOnChange() {
	                if (this.onChange) this.onChange();
	            }
	        }
	    });

	    return jfTabularDnDController;
	})();

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfDragDrop = jfDragDrop;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfDragDrop() {

	    return {
	        restrict: "E",
	        scope: {
	            includeList: "=",
	            excludeList: "=",
	            includeDisplayField: "@",
	            excludeDisplayField: "@",
	            includeListId: "@",
	            excludeListId: "@",
	            objectsName: "@",
	            headers: "=",
	            onChange: "&",
	            customTemplate: "=?",
	            customTemplateScope: "=?",
	            usePagination: "=?",
	            commObject: "=",
	            disabled: "=ngDisabled"
	        },
	        templateUrl: "directives/jf_drag_drop/jf_drag_drop.html",
	        controller: jfDragDropController,
	        controllerAs: "jfDragDrop",
	        bindToController: true,
	        link: function ($scope, $element) {
	            $($element).on("mouseenter", ".drag-item-text", function (e) {
	                var dragItem = $(e.target);

	                if (dragItem.hasClass("drag-item-text")) {
	                    if (dragItem[0].scrollWidth > dragItem.innerWidth()) {
	                        if (!dragItem.hasClass("tooltipstered")) {
	                            dragItem.tooltipster({
	                                animation: "fade",
	                                trigger: "hover",
	                                onlyOne: "true",
	                                interactive: "true",
	                                position: "bottom",
	                                theme: "tooltipster-default bottom",
	                                content: dragItem.text().trim()
	                            });
	                            dragItem.tooltipster("show");
	                        } else {
	                            dragItem.tooltipster("enable");
	                            if (dragItem.tooltipster("content") != dragItem.text().trim()) dragItem.tooltipster("content", dragItem.text().trim());
	                        }
	                    } else if (dragItem.hasClass("tooltipstered")) dragItem.tooltipster("disable");
	                }
	            });
	        }
	    };
	}

	/**
	 * API for the jfDragDrop directive
	 */

	var jfDragDropController = (function () {
	    /* @ngInject */

	    jfDragDropController.$inject = ["$attrs", "$interval", "$element", "$scope", "$timeout", "$compile"];
	    function jfDragDropController($attrs, $interval, $element, $scope, $timeout, $compile) {
	        _classCallCheck(this, jfDragDropController);

	        this.$element = $element;
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$timeout = $timeout;
	        this.$interval = $interval;
	        this.draggedObject = null;
	        this.PLACEHOLDER = { "@@@DNDPH@@@": "@@@DNDPH@@@" };
	        this.selectedItems = [];
	    }

	    _createClass(jfDragDropController, {
	        $onInit: {
	            value: function $onInit() {
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
	                if (!this.includeListId) this.includeListId = "include-list-" + randomId;
	                if (!this.excludeListId) this.excludeListId = "exclude-list-" + randomId;

	                if (this.commObject) {
	                    _.extend(this.commObject, {
	                        updateFilter: function () {
	                            return _this.updateFilter();
	                        },
	                        excludeAll: function () {
	                            return _this.excludeAll();
	                        },
	                        excludeSelected: function () {
	                            return _this.excludeSelected();
	                        },
	                        excludeSpecific: function (item) {
	                            return _this.excludeSelected(item);
	                        },
	                        includeAll: function () {
	                            return _this.includeAll();
	                        },
	                        includeSelected: function () {
	                            return _this.includeSelected();
	                        },
	                        includeSpecific: function (item) {
	                            return _this.includeSelected(item);
	                        }
	                    });
	                }

	                this._initWatchers();
	            }
	        },
	        _initWatchers: {
	            /**
	             * watch the original include and exclude lists
	             * and update the filtered lists when they change
	             */

	            value: function _initWatchers() {
	                var _this = this;

	                // we don't use this.updateFilter() for performance, we want to update only include list when original include list is update
	                this.$scope.$watch("jfDragDrop.includeList", function () {
	                    _this.filterIncludeCache = _.filter(_this.includeList, function (item) {
	                        return !_this._isExcludeFilteredOut(item);
	                    });
	                }, true);
	                this.$scope.$watch("jfDragDrop.excludeList", function () {
	                    _this.filterExcludeCache = _.filter(_this.excludeList, function (item) {
	                        return !_this._isIncludeFilteredOut(item);
	                    });
	                }, true);
	            }
	        },
	        excludeAll: {

	            /**
	             * move all the selected items to the exclude list.å
	             * clear those items from the included list
	             */

	            value: function excludeAll() {
	                var _this = this;

	                if (this.disabled || this.isIncludeListEmpty() || this.isIncludeListFixed()) {
	                    return;
	                }var filteredOut = [];
	                this.includeList.forEach(function (item) {
	                    if (_.isObject(item)) {
	                        item.__fixed__ = undefined;
	                    }

	                    if (_this.filterIncludeList) {
	                        if (_this._isExcludeFilteredOut(item)) {
	                            filteredOut.push(item);
	                        } else {
	                            _this.excludeList.push(item);
	                        }
	                    } else {
	                        _this.excludeList.push(item);
	                    }
	                });
	                this.includeList = filteredOut;

	                this._clearSelectedItems();
	                this.updateFilter();
	                this._updatePagination();
	                this.$timeout(function () {
	                    if (_this.onChange) _this.onChange();
	                });
	            }
	        },
	        excludeSelected: {

	            /**
	             * move the selected items to the exclude list.
	             * clear those items from the include list
	             */

	            value: function excludeSelected() {
	                var _this = this;

	                if (this.disabled || !this.isIncludeListItemSelected()) {
	                    return;
	                }this._filterSelection("inc");

	                this.selectedItems.forEach(function (item) {
	                    if (!_.isObject(item) || !item.__fixed__) {
	                        _this.includeList.splice(_this.includeList.indexOf(item), 1);

	                        if (_this.excludeList.indexOf(item) < 0) {
	                            _this.excludeList.push(item);
	                        }
	                    }
	                });
	                this._clearSelectedItems();
	                this.updateFilter();
	                this._updatePagination();
	                if (this.onChange) this.onChange();
	            }
	        },
	        excludeSpecific: {

	            /**
	             * remove the specific item from the list
	             * useful when clicking a per-item delete button
	             */

	            value: function excludeSpecific(item) {
	                if (this.disabled || item.__fixed__) {
	                    return;
	                }var picked;
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
	                if (this.onChange) this.onChange();
	            }
	        },
	        includeSpecific: {
	            value: function includeSpecific(item) {
	                if (this.disabled) {
	                    return;
	                }var picked;
	                for (var i = this.excludeList.length - 1; i >= 0; i--) {
	                    if (this.excludeList[i] == item) {
	                        picked = this.excludeList.splice(i, 1)[0];
	                        this._removeItemFromSelection(picked);
	                        break;
	                    }
	                }
	                if (picked) {
	                    if (_.isObject(picked)) {
	                        picked.__fixed__ = undefined;
	                    }
	                    this.includeList.push(picked);
	                }
	                this.updateFilter();
	                this._updatePagination();
	                if (this.onChange) this.onChange();
	            }
	        },
	        includeAll: {

	            /**
	             * move all the selected items to the include list.
	             * clear those items from the exclude list
	             */

	            value: function includeAll() {
	                var _this = this;

	                if (this.disabled || this.isExcludeListEmpty()) {
	                    return;
	                }var filteredOut = [];
	                this.excludeList.forEach(function (item) {
	                    if (_.isObject(item)) {
	                        item.__fixed__ = undefined;
	                    }
	                    if (_this.filterExcludeList) {
	                        if (_this._isIncludeFilteredOut(item)) {
	                            filteredOut.push(item);
	                        } else {
	                            _this.includeList.push(item);
	                        }
	                    } else {
	                        _this.includeList.push(item);
	                    }
	                });
	                this.excludeList = filteredOut;
	                this._clearSelectedItems();
	                this.updateFilter();
	                this._updatePagination();
	                this.$timeout(function () {
	                    if (_this.onChange) _this.onChange();
	                });
	            }
	        },
	        includeSelected: {

	            /**
	             * move the selected items to the include list.
	             * clear those items from the exclude list
	             */

	            value: function includeSelected() {
	                var _this = this;

	                if (this.disabled || !this.isExcludeListItemSelected()) {
	                    return;
	                }this._filterSelection("exc");

	                if (!this.includeList) {
	                    this.includeList = [];
	                }
	                if (this.excludeList.length) {
	                    this.selectedItems.forEach(function (item) {
	                        if (_.isObject(item)) {
	                            item.__fixed__ = undefined;
	                        }
	                        _this.excludeList.splice(_this.excludeList.indexOf(item), 1);

	                        if (_this.includeList.indexOf(item) < 0) {
	                            _this.includeList.push(item);
	                        }
	                    });
	                }
	                this._clearSelectedItems();
	                this.updateFilter();
	                this._updatePagination();
	                if (this.onChange) this.onChange();
	            }
	        },
	        toggleSelection: {

	            /**
	             * populate the selected items array
	             * @param item
	             */

	            value: function toggleSelection(item) {
	                if (this.disabled) {
	                    return;
	                }var index = this._inSelectedItems(item);

	                if (index > -1) {
	                    this.selectedItems.splice(index, 1);
	                } else {
	                    if (!_.isObject(item) || !item.__fixed__ || this.includeList.indexOf(item) < 0) {
	                        this.selectedItems.push(item);
	                    }
	                }

	                var scrollParent = $(this.$element[0].querySelector(".dnd-panel")).scrollParent();
	                var tempScrollTop = scrollParent.scrollTop();
	                this.$element[0].querySelector(".dnd-panel").focus();
	                scrollParent.scrollTop(tempScrollTop);
	            }
	        },
	        isIncludeListItemSelected: {

	            /**
	             * for ngDisabled, check if an item from the include list
	             * is present in the selected items array
	             *
	             * @returns {boolean}
	             */

	            value: function isIncludeListItemSelected() {

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
	            }
	        },
	        isExcludeListItemSelected: {

	            /**
	             *
	             * for ngDisabled, check if an item from the exclude list
	             * is present in the selected items array
	             *
	             * @returns {boolean}
	             */

	            value: function isExcludeListItemSelected() {

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
	            }
	        },
	        isExcludeListEmpty: {

	            /**
	             * returns true if the excludeList list contains elements
	             * @returns {boolean}
	             */

	            value: function isExcludeListEmpty() {
	                if (!this.excludeList || !this.excludeList.length) {
	                    return true;
	                } //        else if (!this.filterList) return false;

	                var empty = true;

	                for (var i in this.excludeList) {
	                    var item = this.excludeList[i];
	                    if (!this._isIncludeFilteredOut(item) && item !== this.PLACEHOLDER) {
	                        empty = false;
	                        break;
	                    }
	                }

	                return empty;
	            }
	        },
	        isIncludeListEmpty: {

	            /**
	             * returns true if the include list contains elements
	             * @returns {boolean}
	             */

	            value: function isIncludeListEmpty() {
	                if (!this.includeList || !this.includeList.length) {
	                    return true;
	                }var empty = true;

	                for (var i in this.includeList) {
	                    var item = this.includeList[i];
	                    if (!this._isExcludeFilteredOut(item) && item !== this.PLACEHOLDER) {
	                        empty = false;
	                        break;
	                    }
	                }

	                return empty;
	            }
	        },
	        isIncludeListFixed: {

	            /**
	             * returns true if the include list contains only fixed elements
	             * @returns {boolean}
	             */

	            value: function isIncludeListFixed() {
	                if (this.includeList) {
	                    var fixed = true;
	                    for (var i in this.includeList) {
	                        var item = this.includeList[i];
	                        if (!_.isObject(item) || !item.__fixed__) {
	                            fixed = false;
	                            break;
	                        }
	                    };
	                    //            return _.filter(this.includeList,{'__fixed__':undefined}).length === 0;
	                    return fixed;
	                }
	            }
	        },
	        isSelected: {

	            /**
	             * used by ngClass directive to apply
	             * the correct css class
	             *
	             * @param item
	             * @returns {boolean}
	             */

	            value: function isSelected(item) {
	                return this._inSelectedItems(item) > -1;
	            }
	        },
	        _removeItemFromSelection: {
	            value: function _removeItemFromSelection(item) {
	                var index = this.selectedItems.indexOf(item);
	                if (index >= 0) {
	                    this.selectedItems.splice(index, 1);
	                }
	            }
	        },
	        _inSelectedItems: {

	            /**
	             *
	             * check if an item is present on the selected
	             * items array
	             *
	             * @param item
	             * @returns {*|number|Number}
	             * @private
	             */

	            value: function _inSelectedItems(item) {
	                return this.selectedItems.indexOf(item);
	            }
	        },
	        _clearSelectedItems: {

	            /**
	             * assign an empty array to the selected items array
	             * @private
	             */

	            value: function _clearSelectedItems() {
	                this.selectedItems = [];
	            }
	        },
	        _isIncludeFilteredOut: {
	            value: function _isIncludeFilteredOut(item) {
	                if (!this.filterExcludeList || item === "" || item === this.PLACEHOLDER) {
	                    return false;
	                }var regex = new RegExp(".*" + this.filterExcludeList.split("*").join(".*") + ".*", "i");
	                return !regex.test(this.excludeDisplayField && item[this.excludeDisplayField] ? item[this.excludeDisplayField] : item);
	            }
	        },
	        _isExcludeFilteredOut: {
	            value: function _isExcludeFilteredOut(item) {
	                if (!this.filterIncludeList || item === "" || item === this.PLACEHOLDER) {
	                    return false;
	                }var regex = new RegExp(".*" + this.filterIncludeList.split("*").join(".*") + ".*", "i");
	                return !regex.test(this.includeDisplayField && item[this.includeDisplayField] ? item[this.includeDisplayField] : item);
	            }
	        },
	        updateExcludeFilter: {
	            value: function updateExcludeFilter() {
	                var _this = this;

	                var fromEdit = arguments[0] === undefined ? false : arguments[0];

	                this.filterExcludeCache = _.filter(this.excludeList, function (item) {
	                    return !_this._isIncludeFilteredOut(item);
	                });
	                if (fromEdit) this._updatePagination();
	            }
	        },
	        updateIncludeFilter: {
	            value: function updateIncludeFilter() {
	                var _this = this;

	                var fromEdit = arguments[0] === undefined ? false : arguments[0];

	                this.filterIncludeCache = _.filter(this.includeList, function (item) {
	                    return !_this._isExcludeFilteredOut(item);
	                });
	                if (fromEdit) this._updatePagination();
	            }
	        },
	        updateFilter: {
	            value: function updateFilter() {
	                var _this = this;

	                var fromEdit = arguments[0] === undefined ? false : arguments[0];

	                this.filterExcludeCache = _.filter(this.excludeList, function (item) {
	                    return !_this._isIncludeFilteredOut(item);
	                });
	                this.filterIncludeCache = _.filter(this.includeList, function (item) {
	                    return !_this._isExcludeFilteredOut(item);
	                });
	                if (fromEdit) this._updatePagination();
	            }
	        },
	        getFilteredExcludeList: {
	            value: function getFilteredExcludeList() {
	                var ret = this.filterExcludeCache || this.excludeList;
	                this.noExcludeMatches = this.excludeList && this.excludeList.length && !ret.length;
	                return ret;
	            }
	        },
	        getFilteredIncludeList: {
	            value: function getFilteredIncludeList() {
	                var ret = this.filterIncludeCache || this.includeList;
	                this.noIncludeMatches = this.includeList && this.includeList.length && !ret.length;
	                return ret;
	            }
	        },
	        _dragStart: {
	            value: function _dragStart(event, ui) {
	                var dragObj = this._objectFromElement(event.target);
	                if (this.disabled || dragObj.draggedFrom === this.includeList && _.isObject(dragObj.dataObject) && dragObj.dataObject.__fixed__) {
	                    event.preventDefault();
	                    return;
	                }
	                this._initDragObject(dragObj);

	                this._initDragHelper(ui.helper);

	                this._dragAdditionals();

	                this._insertPlaceHolder(this.draggedObject.draggedFrom, this.draggedObject.index);

	                this.updateFilter();
	                this.$scope.$apply();
	            }
	        },
	        _initDragObject: {
	            value: function _initDragObject(dragObj) {
	                this.draggedObject = dragObj;
	                dragObj.draggedFrom.splice(dragObj.index, 1);
	                this.$scope.$apply();
	            }
	        },
	        _initDragHelper: {
	            value: function _initDragHelper(helper) {
	                this.draggedObject.helper = helper;
	                helper.addClass("drag-helper");
	                var xicon = helper.find(".delete-drop-item");
	                if (xicon) xicon.remove();
	            }
	        },
	        _dragAdditionals: {
	            value: function _dragAdditionals() {
	                var _this = this;

	                if (this.selectedItems.length) {

	                    //remove dragged object from selection, leave only additionals
	                    if (this._inSelectedItems(this.draggedObject.dataObject) >= 0) this.toggleSelection(this.draggedObject.dataObject);

	                    this.draggedObject.additionals = [];

	                    //only add to additionals the selected items from the draggedFrom array, and not filtered out.
	                    this.selectedItems.forEach(function (selected) {
	                        var index = undefined;
	                        if (_this.draggedObject.draggedFrom === _this.excludeList) index = _this.getFilteredExcludeList().indexOf(selected);else index = _this.draggedObject.draggedFrom.indexOf(selected);

	                        if (index >= 0) {
	                            _this.draggedObject.additionals.push(selected);
	                        }
	                    });

	                    this._clearSelectedItems();

	                    this.$scope.$apply(function () {
	                        _this.draggedObject.additionals.forEach(function (selected) {
	                            _this.draggedObject.draggedFrom.splice(_this.draggedObject.draggedFrom.indexOf(selected), 1);
	                        });

	                        if (_this.draggedObject.additionals.length > 0) _this.draggedObject.helper.addClass("multiple").html("<span>&equiv;</span>" + (1 + _this.draggedObject.additionals.length) + " " + (_this.objectsName ? _this.objectsName : "Items"));
	                    });
	                }
	            }
	        },
	        _dragStop: {
	            value: function _dragStop(event, ui) {
	                var _this = this;

	                if (this.draggedObject) {
	                    var ph = this._removePlaceHolder();
	                    //console.log('mouseInExclude: '+this.mouseInExclude, 'mouseInInclude: '+this.mouseInInclude);
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
	                        this.draggedObject.dataObject.__fixed__ = undefined;
	                    }

	                    this._stopScrollInterval();

	                    this.$scope.$apply();

	                    this._undragAdditionals(ph.index + 1);

	                    this._initDragAndDropOnElement(this._elementFromObject(this.draggedObject.dataObject));

	                    this.draggedObject = null;

	                    this._clearSelectedItems();
	                    this.$timeout(function () {
	                        _this.updateFilter();
	                    });
	                    this._updatePagination();
	                    if (this.onChange) this.onChange();
	                }
	            }
	        },
	        _dragMove: {
	            value: function _dragMove(event, ui) {
	                var _this = this;

	                this.$scope.$apply(function () {
	                    var list_element = $(event.originalEvent.target);

	                    if (!list_element.hasClass("dnd-list-wrapper")) list_element = list_element.parents(".dnd-list-wrapper");

	                    if (list_element && list_element.hasClass("dnd-list-wrapper")) {
	                        var dragOffsetY = event.pageY - list_element.offset().top;

	                        if (list_element.scrollTop() > 0 && dragOffsetY > 0 && dragOffsetY < 20 && !_this.scrollInterval)
	                            //this.scrollInterval = this.$interval(() => {
	                            list_element.scrollTop(list_element.scrollTop() - 5);
	                            //}, 50);
	                        else if (dragOffsetY > list_element.outerHeight() - 20 && dragOffsetY < list_element.outerHeight() && !_this.scrollInterval)
	                            //this.scrollInterval = this.$interval(() => {
	                            list_element.scrollTop(list_element.scrollTop() + 5);
	                            //}, 50);
	                            //else
	                            //    this._stopScrollInterval();
	                    }
	                    //else
	                    //    this._stopScrollInterval();
	                });
	            }
	        },
	        _stopScrollInterval: {
	            value: function _stopScrollInterval() {
	                if (this.scrollInterval) {
	                    this.$interval.cancel(this.scrollInterval);
	                    this.scrollInterval = null;
	                }
	            }
	        },
	        _undragAdditionals: {
	            value: function _undragAdditionals(startIndex) {
	                var _this = this;

	                if (this.draggedObject.additionals) {
	                    (function () {
	                        var next = startIndex;
	                        _this.$scope.$apply(function () {
	                            _this.draggedObject.additionals.forEach(function (additional) {
	                                if (_this.mouseInInclude) {
	                                    _this.includeList.splice(next, 0, additional);
	                                } else if (_this.mouseInExclude) {
	                                    _this.excludeList.splice(next, 0, additional);
	                                } else {
	                                    _this.draggedObject.draggedFrom.splice(next, 0, additional);
	                                }

	                                if (_.isObject(additional)) {
	                                    additional.__fixed__ = undefined;
	                                }
	                                //                this.$scope.$apply();
	                                _this._initDragAndDropOnElement(_this._elementFromObject(additional));
	                                next++;
	                            });
	                        });
	                    })();
	                }
	            }
	        },
	        _initDragAndDropOnElement: {
	            value: function _initDragAndDropOnElement(elem) {
	                var _this = this;

	                if (!elem || elem.hasClass("drag-enabled")) {
	                    return;
	                }elem.draggable({
	                    helper: "clone",
	                    cursorAt: { left: -5, top: -5 },
	                    scroll: false,
	                    distance: 10,
	                    start: function (event, ui) {
	                        return _this._dragStart(event, ui);
	                    },
	                    stop: function (event, ui) {
	                        return _this._dragStop(event, ui);
	                    },
	                    drag: function (event, ui) {
	                        return _this._dragMove(event, ui);
	                    }
	                });
	                elem.addClass("drag-enabled");
	            }
	        },
	        _objectFromElement: {
	            value: function _objectFromElement(elem) {
	                var dataIndex = $(elem).attr("data-index");
	                var parsed = dataIndex.split("-");
	                var array = undefined;
	                if (parsed[0] === "inc") array = this.includeList;else if (parsed[0] === "exc") array = this.excludeList;

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
	            }
	        },
	        _elementFromObject: {
	            value: function _elementFromObject(obj) {

	                var iexc = this.getViewableExcludes().indexOf(obj);
	                var iinc = this.getViewableIncludes().indexOf(obj);
	                var array = iexc >= 0 ? "exc" : iinc >= 0 ? "inc" : "";
	                var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;

	                if (index < 0) {
	                    return null;
	                } else {
	                    return $(this.$element).find("li[data-index=" + array + "-" + index + "]");
	                }
	            }
	        },
	        mouseIsInInclude: {
	            value: function mouseIsInInclude(isIn) {
	                this.mouseInInclude = isIn;
	                if (this.mouseInInclude) this.mouseInExclude = false;
	                if (isIn && this.draggedObject && this.draggedObject.phArray !== this.includeList) {
	                    this._insertPlaceHolder(this.includeList, this.includeList.length);
	                }
	            }
	        },
	        mouseIsInExclude: {
	            value: function mouseIsInExclude(isIn) {
	                this.mouseInExclude = isIn;
	                if (this.mouseInExclude) this.mouseInInclude = false;
	                if (isIn && this.draggedObject && this.draggedObject.phArray !== this.excludeList) {
	                    this._insertPlaceHolder(this.excludeList, this.excludeList.length);

	                    //let list_element = $('#dnd-' + (iexc >= 0 ? 'exclude' : 'include'));
	                }
	            }
	        },
	        initDragElement: {
	            value: function initDragElement(item) {
	                var _this = this;

	                this.$timeout(function () {
	                    var elem = _this._elementFromObject(item);

	                    _this._initDragAndDropOnElement(elem);
	                });
	            }
	        },
	        mouseOver: {
	            value: function mouseOver(item) {
	                if (item != null && this.draggedObject) {

	                    var iexc = this.excludeList.indexOf(item);
	                    var iinc = this.includeList.indexOf(item);
	                    var array = iexc >= 0 ? this.excludeList : iinc >= 0 ? this.includeList : null;
	                    var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;

	                    if (array) this._insertPlaceHolder(array, index);
	                } else if (item != null) {
	                    this.initDragElement(item);
	                }
	            }
	        },
	        _insertPlaceHolder: {
	            value: function _insertPlaceHolder(array, index) {
	                this._removePlaceHolder();
	                array.splice(index, 0, this.PLACEHOLDER);
	                this.draggedObject.phIndex = index;
	                this.draggedObject.phArray = array;
	                this.updateFilter();
	            }
	        },
	        _findPlaceHolder: {
	            value: function _findPlaceHolder() {
	                var phIndexExc = this.excludeList.indexOf(this.PLACEHOLDER);
	                var phIndexInc = this.includeList.indexOf(this.PLACEHOLDER);

	                if (phIndexExc >= 0) {
	                    return { array: this.excludeList, index: phIndexExc };
	                } else if (phIndexInc >= 0) {
	                    return { array: this.includeList, index: phIndexInc };
	                } else {
	                    return null;
	                }
	            }
	        },
	        _removePlaceHolder: {
	            value: function _removePlaceHolder() {
	                var ph = this._findPlaceHolder();
	                if (ph) {
	                    ph.array.splice(ph.index, 1);
	                    this.draggedObject.phIndex = null;
	                }
	                return ph;
	            }
	        },
	        onKeyDown: {
	            value: function onKeyDown(e) {
	                if (e.shiftKey && e.ctrlKey && (e.which === 65 || e.which === 97)) {
	                    this._clearSelectedItems();
	                } else if (e.ctrlKey && (e.which === 65 || e.which === 97)) {
	                    e.preventDefault();
	                    if (this.mouseInExclude) this._selectAll(this.excludeList);else if (this.mouseInInclude) this._selectAll(this.includeList);
	                }
	            }
	        },
	        _selectAll: {
	            value: function _selectAll(array) {
	                var _this = this;

	                this._clearSelectedItems();
	                array.forEach(function (item) {
	                    _this.toggleSelection(item);
	                });
	            }
	        },
	        compileCustomTemplate: {
	            value: function compileCustomTemplate(item, type) {
	                var _this = this;

	                var displayField = undefined;
	                if (type === "exc") displayField = "excludeDisplayField";else if (type === "inc") displayField = "includeDisplayField";

	                var elem = this._elementFromObject(item);
	                if (elem) {
	                    var template = this.customTemplate;
	                    var newElem = $(template);

	                    var scope = this.$scope.$new();
	                    _.extend(scope, {
	                        getItemInfo: function () {
	                            var theItem = _this._objectFromElement(elem).dataObject;
	                            return {
	                                text: _this[displayField] && theItem && theItem[_this[displayField]] ? theItem[_this[displayField]] : theItem,
	                                item: theItem,
	                                included: type === "inc"
	                            };
	                        },
	                        userScope: this.customTemplateScope
	                    });

	                    this.$compile(newElem)(scope);
	                    var customElem = elem.find(".custom-template");
	                    customElem[0].innerHTML = "";
	                    customElem[0].appendChild(newElem[0]);
	                }
	            }
	        },
	        _initPagination: {
	            value: function _initPagination() {
	                this.itemsPerPage = _.isNaN(parseInt(this.usePagination)) ? 8 : parseInt(this.usePagination);
	                this.currExcludesPage = 0;
	                this.currIncludesPage = 0;

	                this.excludesPaginationApi = new PaginationApi(this, "exc");
	                this.includesPaginationApi = new PaginationApi(this, "inc");

	                //get item height and margin
	                var e = $("<div style=\"background-color: transparent\" class=\"drag-item\"><div class=\"drag-item-text\"></div></div>");
	                $(this.$element).find(".dnd-list")[0].appendChild(e[0]);
	                var height = e.outerHeight();
	                var margin = parseInt(e.css("margin-bottom"));
	                $(this.$element).find(".dnd-list")[0].removeChild(e[0]);

	                var listWrappers = $(this.$element).find(".dnd-list-wrapper");
	                var wrappersHeight = margin * 2 + (height + margin) * this.itemsPerPage;
	                listWrappers.css("height", wrappersHeight + "px");
	                listWrappers.css("overflow-y", "hidden");

	                var actions = $(this.$element).find(".dnd-actions");
	                var actionsHeight = parseInt(actions.css("height"));
	                actions.css("margin-top", (wrappersHeight - actionsHeight) / 2 + "px");
	            }
	        },
	        _updatePagination: {
	            value: function _updatePagination() {
	                if (this.usePagination) {
	                    this.excludesPaginationApi.update();
	                    this.includesPaginationApi.update();
	                }
	            }
	        },
	        getViewableExcludes: {
	            value: function getViewableExcludes() {
	                if (!this.usePagination) {
	                    return this.getFilteredExcludeList();
	                } else {
	                    var all = this.getFilteredExcludeList();
	                    return _.slice(all, this.currExcludesPage * this.itemsPerPage, (this.currExcludesPage + 1) * this.itemsPerPage);
	                }
	            }
	        },
	        getViewableIncludes: {
	            value: function getViewableIncludes() {
	                if (!this.usePagination) {
	                    return this.getFilteredIncludeList();
	                } else {
	                    var all = this.getFilteredIncludeList();
	                    return _.slice(all, this.currIncludesPage * this.itemsPerPage, (this.currIncludesPage + 1) * this.itemsPerPage);
	                }
	            }
	        },
	        _filterSelection: {
	            value: function _filterSelection(leave) {
	                var _this = this;

	                this.selectedItems = _.filter(this.selectedItems, function (item) {
	                    if (leave === "inc" && _this.includeList && _this.includeList.indexOf(item) >= 0) return true;else if (leave === "exc" && _this.excludeList && _this.excludeList.indexOf(item) >= 0) return true;else return false;
	                });
	            }
	        }
	    });

	    return jfDragDropController;
	})();

	var PaginationApi = (function () {
	    function PaginationApi(dndCtrl, listType) {
	        _classCallCheck(this, PaginationApi);

	        this.dndCtrl = dndCtrl;
	        this.listType = listType;
	    }

	    _createClass(PaginationApi, {
	        getTotalPages: {
	            value: function getTotalPages() {
	                if (!this.dndCtrl.usePagination) {
	                    return 0;
	                }if (this.listType === "exc") {
	                    return Math.ceil(this.dndCtrl.getFilteredExcludeList().length / this.dndCtrl.itemsPerPage);
	                } else if (this.listType === "inc") {
	                    return Math.ceil(this.dndCtrl.getFilteredIncludeList().length / this.dndCtrl.itemsPerPage);
	                }
	            }
	        },
	        getCurrentPage: {
	            value: function getCurrentPage() {
	                if (!this.dndCtrl.usePagination) {
	                    return 0;
	                }if (this.listType === "exc") {
	                    return this.dndCtrl.currExcludesPage + 1;
	                } else if (this.listType === "inc") {
	                    return this.dndCtrl.currIncludesPage + 1;
	                }
	            }
	        },
	        nextPage: {
	            value: function nextPage() {
	                if (this.getCurrentPage() === this.getTotalPages()) {
	                    return;
	                }if (this.listType === "exc") {
	                    this.dndCtrl.currExcludesPage++;
	                } else if (this.listType === "inc") {
	                    this.dndCtrl.currIncludesPage++;
	                }
	            }
	        },
	        prevPage: {
	            value: function prevPage() {
	                if (this.getCurrentPage() === 1) {
	                    return;
	                }if (this.listType === "exc") {
	                    this.dndCtrl.currExcludesPage--;
	                } else if (this.listType === "inc") {
	                    this.dndCtrl.currIncludesPage--;
	                }
	            }
	        },
	        setPage: {
	            value: function setPage(pageNum) {
	                if (pageNum < 1 || pageNum > this.getTotalPages) {
	                    return;
	                }if (this.listType === "exc") {
	                    this.dndCtrl.currExcludesPage = pageNum - 1;
	                } else if (this.listType === "inc") {
	                    this.dndCtrl.currIncludesPage = pageNum - 1;
	                }
	            }
	        },
	        update: {
	            value: function update() {
	                if (this.getCurrentPage() > this.getTotalPages()) {
	                    this.setPage(this.getTotalPages());
	                }
	                if (this.listener) this.listener(this.getCurrentPage());
	            }
	        },
	        registerChangeListener: {
	            value: function registerChangeListener(listener) {
	                this.listener = listener;
	            }
	        }
	    });

	    return PaginationApi;
	})();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfDragDropPagination = jfDragDropPagination;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var GENERAL_CONSTANTS = __webpack_require__(19).GENERAL_CONSTANTS;

	var jfDragDropPaginationController = (function () {
	    /* @ngInject */

	    function jfDragDropPaginationController() {
	        _classCallCheck(this, jfDragDropPaginationController);

	        this.CONSTANTS = GENERAL_CONSTANTS;
	    }

	    _createClass(jfDragDropPaginationController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.currentPage = 0;
	                this.pageViewModel = 1;

	                if (this.paginationApi) {
	                    this.currentPage = this.paginationApi.getCurrentPage();
	                    this.pageViewModel = this.currentPage;

	                    this.paginationApi.registerChangeListener(function (pageNum) {
	                        _this.currentPage = pageNum;
	                        _this.pageViewModel = _this.currentPage;
	                    });
	                }
	            }
	        },
	        onBlur: {
	            value: function onBlur() {
	                this.pageViewModel = parseInt(this.pageViewModel);
	                if (!this.pageViewModel) this.pageViewModel = this.currentPage;
	            }
	        },
	        pageChanged: {
	            value: function pageChanged() {
	                this.pageViewModel = parseInt(this.pageViewModel);
	                if (this.pageViewModel !== 0 && !this.pageViewModel) {
	                    return;
	                }this.currentPage = this.pageViewModel;
	                if (this.currentPage < 1) this.currentPage = 1;
	                if (this.currentPage > this.paginationApi.getTotalPages()) this.currentPage = this.paginationApi.getTotalPages();
	                this.pageViewModel = this.currentPage;
	                this.paginationApi.setPage(this.currentPage);
	            }
	        },
	        nextPage: {
	            value: function nextPage() {
	                this.paginationApi.nextPage();
	                this.currentPage = this.paginationApi.getCurrentPage();
	            }
	        },
	        prevPage: {
	            value: function prevPage() {
	                this.paginationApi.prevPage();
	                this.currentPage = this.paginationApi.getCurrentPage();
	            }
	        }
	    });

	    return jfDragDropPaginationController;
	})();

	function jfDragDropPagination() {
	    return {
	        scope: {
	            paginationApi: "="
	        },
	        controller: jfDragDropPaginationController,
	        controllerAs: "jfDragDropPagination",
	        bindToController: true,
	        templateUrl: "directives/jf_drag_drop_pagination/jf_drag_drop_pagination.html"
	    };
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var GENERAL_CONSTANTS = {
		PAGINATION_DIGIT_WIDTH_PX: 8
	};
	exports.GENERAL_CONSTANTS = GENERAL_CONSTANTS;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfToggler;

	var jfTogglerController = (function () {
		function jfTogglerController() {
			_classCallCheck(this, jfTogglerController);
		}

		_createClass(jfTogglerController, {
			$onInit: {
				value: function $onInit() {
					this.isToggledToLeft = !!this.isToggledToLeft;
				}
			},
			toggleSelection: {
				value: function toggleSelection() {
					this.isToggledToLeft = !this.isToggledToLeft;
					if (this.onToggle && typeof this.onToggle === "function") {
						this.onToggle();
					}
				}
			}
		});

		return jfTogglerController;
	})();

	function jfToggler() {
		return {
			restrict: "E",
			scope: {
				isToggledToLeft: "=",
				onToggle: "&?"
			},
			controller: jfTogglerController,
			controllerAs: "$ctrl",
			bindToController: true,
			templateUrl: "directives/jf_toggler/jf_toggler.html"
		};
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	exports.jfTooltip = jfTooltip;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfTooltip($sanitize) {
	    return {
	        restrict: "A",
	        link: function link($scope, $element, $attrs) {
	            var content = $attrs.jfTooltip === "" ? null : $sanitize($attrs.jfTooltip);
	            $($element).tooltipster({
	                animation: "fade",
	                contentAsHTML: "true",
	                trigger: "hover",
	                onlyOne: "true",
	                interactive: "true",
	                position: "bottom",
	                theme: "tooltipster-default bottom",
	                content: content
	            });

	            $attrs.$observe("jfTooltip", function (val) {
	                val = val === "" ? null : $sanitize(val);
	                $($element).tooltipster("content", val);
	            });
	        }
	    };
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	exports.jfHelpTooltip = jfHelpTooltip;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfHelpTooltip() {
	    return {
	        scope: {
	            placement: "@?",
	            text: "@?",
	            html: "=",
	            maxWidth: "@"
	        },
	        restrict: "E",
	        templateUrl: "directives/jf_help_tooltip/jf_help_tooltip.html",
	        transclude: true,
	        link: function link($scope, $element, $attrs, ctrl, $transclude) {
	            var content = $scope.text || $scope.html || $transclude().html();
	            if (!content) {
	                return;
	            }content = content.replace(/\n/g, "<br>");

	            $($element).find(".jf-tooltipster").tooltipster({
	                animation: "fade",
	                contentAsHTML: "true",
	                trigger: "hover",
	                onlyOne: "true",
	                interactive: "true",
	                interactiveTolerance: 500,
	                maxWidth: $scope.maxWidth || 600,
	                position: $element.placement,
	                theme: "tooltipster-default " + $element.placement,
	                content: content,
	                functionReady: function functionReady() {
	                    $($element).find(".jf-tooltipster").addClass("active");
	                },
	                functionAfter: function functionAfter() {
	                    $($element).find(".jf-tooltipster").removeClass("active");
	                }
	            });
	        }
	    };
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfCheckbox = jfCheckbox;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfCheckboxController = (function () {
	    /* @ngInject */

	    jfCheckboxController.$inject = ["$element", "$transclude"];
	    function jfCheckboxController($element, $transclude) {
	        _classCallCheck(this, jfCheckboxController);

	        this.$element = $element;
	        this.$transclude = $transclude;
	    }

	    _createClass(jfCheckboxController, {
	        $postLink: {
	            value: function $postLink() {
	                var _this = this;

	                this.$transclude(function (clone) {
	                    _this.$element.find("label").prepend(clone);
	                });
	            }
	        }
	    });

	    return jfCheckboxController;
	})();

	function jfCheckbox() {
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {
	            text: "@?"
	        },
	        controller: jfCheckboxController,
	        controllerAs: "jfCheckbox",
	        bindToController: true,
	        templateUrl: "directives/jf_checkbox/jf_checkbox.html"
	    };
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfSwitch = jfSwitch;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfSwitchController = (function () {
	    function jfSwitchController($scope) {
	        _classCallCheck(this, jfSwitchController);

	        this.$scope = $scope;
	    }

	    _createClass(jfSwitchController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                if (!this.options) throw "Must supply options";
	                // Supports 2 methods of options:
	                // array of strings
	                // array of objects of type {'value': ..., 'text': ...}
	                // The model is assigned the value, and the text is displayed

	                this.controller = this;

	                this.updateOptionObjects();

	                if (_.isEmpty(this.ngModel)) this.ngModel = this.optionObjects[0].value;

	                if (this.watchOptions) {
	                    this.$scope.$watch("jfSwitch.options.length", function () {
	                        _this.updateOptionObjects();
	                    });
	                }
	            }
	        },
	        updateOptionObjects: {
	            value: function updateOptionObjects() {
	                this.optionObjects = this.options.map(function (option) {
	                    if (typeof option === "string") return { value: option, text: option };else return option;
	                });
	            }
	        },
	        selectOption: {
	            value: function selectOption(option) {
	                if (this.disabled) {
	                    return;
	                }this.ngModelCtrl.$setViewValue(option.value);
	            }
	        },
	        isSelected: {
	            value: function isSelected(option) {
	                return this.ngModel === option.value;
	            }
	        }
	    });

	    return jfSwitchController;
	})();

	function jfSwitch() {
	    return {
	        restrict: "E",
	        require: "ngModel",
	        scope: {
	            jfSwitchTitle: "@",
	            options: "=",
	            ngModel: "=",
	            controller: "=?",
	            disabled: "=ngDisabled",
	            helpTooltip: "=",
	            jfSwitchClass: "@",
	            watchOptions: "<?"
	        },
	        link: function ($scope, attrs, $element, ngModelCtrl) {
	            $scope.jfSwitch.ngModelCtrl = ngModelCtrl;
	        },
	        controller: jfSwitchController,
	        controllerAs: "jfSwitch",
	        bindToController: true,
	        templateUrl: "directives/jf_switch/jf_switch.html"
	    };
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	jfGrid.$inject = ["$timeout", "$compile"];
	exports.jfGrid = jfGrid;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfGrid($timeout, $compile) {
	    "ngInject";

	    var isNoTooltip = function (cell) {
	        return cell[0] && cell[0].classList && cell[0].classList.contains("no-tooltip");
	    };

	    return {
	        scope: {
	            gridOptions: "=",
	            filterField: "@?",
	            filterField2: "@?",
	            filterOnChange: "@?",
	            autoFocus: "@",
	            objectName: "@"
	        },
	        templateUrl: "directives/jf_grid/jf_grid.html",
	        link: function ($scope, $element, $attrs) {

	            $scope.gridOptions.gridObjectName = $scope.objectName;

	            $scope.noCount = $attrs.hasOwnProperty("noCount");
	            $scope.noPagination = $attrs.hasOwnProperty("noPagination");

	            $($element).on("mouseenter", ".ui-grid-cell, .ui-grid-cell-contents, .btn-action", function (e) {
	                var cellItem = $(e.target);

	                cellItem.parents(".ui-grid-row").addClass("hovered");
	                $scope.$apply();

	                if (cellItem.hasClass("ui-grid-cell-contents")) {
	                    var cellItemContent = cellItem.text().trim();

	                    if (cellItemContent.length > 0 && cellItem[0].scrollWidth > cellItem.innerWidth()) {
	                        if (!cellItem.hasClass("tooltipstered") && !isNoTooltip(cellItem)) {
	                            cellItem.tooltipster({
	                                animation: "fade",
	                                trigger: "hover",
	                                onlyOne: "true",
	                                interactive: "true",
	                                position: "bottom",
	                                theme: "tooltipster-default bottom",
	                                content: cellItemContent
	                            });
	                            cellItem.tooltipster("show");
	                        } else if (!isNoTooltip(cellItem)) {
	                            cellItem.tooltipster("enable");

	                            if (cellItem.tooltipster("content") != cellItemContent) cellItem.tooltipster("content", cellItemContent);
	                        }
	                    } else if (cellItem.hasClass("tooltipstered")) cellItem.tooltipster("disable");
	                }
	            }).on("mouseleave", ".ui-grid-draggable-row, .ui-grid-cell, .ui-grid-cell-contents, .btn-action", function (e) {
	                var currentRowElement = $(e.currentTarget).parents(".ui-grid-row"),
	                    toRowElement = $(e.relatedTarget).parents(".ui-grid-row");

	                if (!toRowElement || !currentRowElement.is(toRowElement)) {
	                    currentRowElement.removeClass("hovered");
	                    $scope.$apply();
	                }
	            });
	            $scope.$on("$destroy", function () {
	                $($element).off("mouseenter");
	                $($element).off("mouseleave");
	                $scope.gridOptions.onDestroy();
	            });

	            $scope.getTotalRecords = function () {
	                var count = undefined;

	                if (!$scope.gridOptions.api) return 0;

	                var visRows = $scope.gridOptions.api.grid.getVisibleRows();
	                var totalRows = $scope.gridOptions.totalItems || $scope.gridOptions.api.grid.rows.length;
	                if (_.findWhere(visRows, { entity: { _emptyRow: true } })) count = totalRows - 1;else count = totalRows;

	                //Reduce rows that should not be counted
	                count -= _.filter($scope.gridOptions.api.grid.rows, { entity: { __doNotCount__: true } }).length;
	                count -= _.filter($scope.gridOptions.api.grid.rows, function (row) {
	                    return row.entity.$parentRow;
	                }).length;

	                var recordsName = undefined;

	                if ($scope.objectName) {
	                    if ($scope.objectName.indexOf("/") >= 0) {
	                        var splited = $scope.objectName.split("/");
	                        recordsName = count !== 1 ? splited[1] : splited[0];
	                    } else recordsName = count !== 1 ? $scope.objectName + "s" : $scope.objectName;
	                } else recordsName = count !== 1 ? "records" : "record";

	                return count + " " + _.startCase(recordsName);
	            };

	            $scope.getSelectedRecords = function () {

	                if (!$scope.gridOptions.multiSelect || !$scope.gridOptions.api || !$scope.gridOptions.api.selection) return "";

	                var count = $scope.gridOptions.api.selection.getSelectedRows().length;

	                return count;
	            };
	        }
	    };
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfGridPagination = jfGridPagination;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var GENERAL_CONSTANTS = __webpack_require__(19).GENERAL_CONSTANTS;

	var jfGridPaginationController = (function () {
	    /* @ngInject */

	    jfGridPaginationController.$inject = ["$scope", "$timeout", "JFrogEventBus"];
	    function jfGridPaginationController($scope, $timeout, JFrogEventBus) {
	        var _this = this;

	        _classCallCheck(this, jfGridPaginationController);

	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.pageViewModel = this.currentPage = 1;
	        this.CONSTANTS = GENERAL_CONSTANTS;

	        JFrogEventBus.registerOnScope($scope, JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, function () {
	            return _this.resetPagination();
	        });
	    }

	    _createClass(jfGridPaginationController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.gridApi = this.$scope.gridApi;
	                this.$timeout(function () {
	                    if (_this.gridApi.pagination) {
	                        _this.gridApi.pagination.on.paginationChanged(_this.$scope, function (pageNum) {
	                            _this.currentPage = pageNum;
	                            _this.pageViewModel = _this.currentPage;
	                        });
	                    }
	                });
	            }
	        },
	        onBlur: {
	            value: function onBlur() {
	                this.pageViewModel = parseInt(this.pageViewModel);
	                if (!this.pageViewModel) this.pageViewModel = this.currentPage;
	            }
	        },
	        pageChanged: {
	            value: function pageChanged() {
	                this.pageViewModel = parseInt(this.pageViewModel);
	                if (this.pageViewModel !== 0 && !this.pageViewModel) {
	                    return;
	                }this.currentPage = this.pageViewModel;
	                if (this.currentPage < 1) this.currentPage = 1;
	                if (this.currentPage > this.gridApi.pagination.getTotalPages()) this.currentPage = this.gridApi.pagination.getTotalPages();
	                this.pageViewModel = this.currentPage;
	                this.gridApi.pagination.seek(this.currentPage);
	            }
	        },
	        nextPage: {
	            value: function nextPage() {
	                if (this.currentPage === this.gridApi.pagination.getTotalPages()) {
	                    return;
	                }this.gridApi.pagination.nextPage();
	                this.currentPage = this.gridApi.pagination.getPage();
	            }
	        },
	        prevPage: {
	            value: function prevPage() {
	                this.gridApi.pagination.previousPage();
	                this.currentPage = this.gridApi.pagination.getPage();
	            }
	        },
	        getTotalPages: {
	            value: function getTotalPages() {
	                this.gridApi.pagination.seek(this.currentPage);
	                return this.gridApi.pagination.getTotalPages();
	            }
	        },
	        resetPagination: {
	            value: function resetPagination() {
	                this.gridApi.pagination.seek(1);
	                this.currentPage = 1;
	            }
	        }
	    });

	    return jfGridPaginationController;
	})();

	function jfGridPagination() {
	    return {
	        scope: {
	            gridApi: "="
	        },
	        controller: jfGridPaginationController,
	        controllerAs: "jfGridPagination",
	        bindToController: true,
	        templateUrl: "directives/jf_grid_pagination/jf_grid_pagination.html"
	    };
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfGridBatchActions = jfGridBatchActions;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// TODO: (Adam) improve performence by listening to the batch selection change on gridApi, other than using ng-class

	var jfGridBatchActionsController = (function () {
	    /* @ngInject */

	    jfGridBatchActionsController.$inject = ["$element", "$scope", "$timeout"];
	    function jfGridBatchActionsController($element, $scope, $timeout) {
	        var _this = this;

	        _classCallCheck(this, jfGridBatchActionsController);

	        this.$element = $element;
	        this.$timeout = $timeout;

	        this.MORE_ACTIONS = { "@@MORE_ACTIONS@@": "@@MORE_ACTIONS@@" };

	        $scope.$on("ui-layout.resize", function () {
	            $timeout(function () {
	                return _this.calcActionsVisibility();
	            });
	        });
	        $(window).on("resize", function () {
	            $timeout(function () {
	                return _this.calcActionsVisibility();
	            });
	        });

	        $scope.$watch("jfBatchActions.actions", function () {
	            return $timeout(function () {
	                return _this.calcActionsVisibility();
	            });
	        });
	        $scope.$watch("jfBatchActions.gridApi", function () {
	            if (!_this.gridApi) return;
	            _this.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
	                $timeout(function () {
	                    return _this.updateMoreActions();
	                });
	            });
	            _this.gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
	                $timeout(function () {
	                    return _this.updateMoreActions();
	                });
	            });
	        });
	        $timeout(function () {
	            return _this.calcActionsVisibility();
	        });
	    }

	    _createClass(jfGridBatchActionsController, {
	        perform: {
	            value: function perform(action) {
	                if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
	                    action.callback && action.callback(this.gridApi.selection.getSelectedRows());
	                }
	            }
	        },
	        anySelected: {
	            value: function anySelected() {
	                return this.gridApi && this.gridApi.selection.getSelectedRows().length > 0;
	            }
	        },
	        isDisabled: {
	            value: function isDisabled(action) {
	                return !this.anySelected() || action.disabledWhen && action.disabledWhen();
	            }
	        },
	        calcActionsVisibility: {
	            value: function calcActionsVisibility() {
	                var _this = this;

	                if (!this.actions) {
	                    return;
	                }var visible = [];
	                var inDropDown = [];

	                var moreDropdownWidth = 115;

	                var elems = $(this.$element).find(".grid-batch-action-wrapper:not(.more-actions)");

	                var containerWidth = $(this.$element).width();

	                var totalWidth = 0;

	                var addTo = visible;

	                var moreActionsNewIndex = -1;
	                var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

	                for (var i = 0; i < elems.length; i++) {
	                    var el = $(elems[i]);
	                    totalWidth += el.width();
	                    var id = el.attr("data-action-id");
	                    var act = _.find(this.actions, { name: id });
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
	                        return act !== _this.MORE_ACTIONS;
	                    });
	                    moreActionsNewIndex = -1;
	                }

	                var temp = { TEMP: "TEMP" };
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
	                    return _this.updateMoreActions();
	                });
	            }
	        },
	        initActions: {
	            value: function initActions(actionsController) {
	                this.moreActionsController = actionsController;
	                if (this.gridOptions) this.gridOptions.moreActionsController = actionsController;
	                this.updateMoreActions();
	            }
	        },
	        updateMoreActions: {
	            value: function updateMoreActions() {
	                var _this = this;

	                if (!this.moreActionsController) {
	                    return;
	                }var actionsCount = _.filter(this.actions, function (act) {
	                    return act !== _this.MORE_ACTIONS;
	                }).length;

	                if (this.moreActions.length < actionsCount) {
	                    this.moreActionsController.label = "More Actions";
	                } else if (this.moreActions.length === actionsCount) {
	                    this.moreActionsController.label = "Actions";
	                }

	                var dict = {};
	                this.moreActions.forEach(function (action) {
	                    dict[action.name] = {
	                        title: action.name,
	                        icon: "icon-" + action.icon,
	                        disabled: _this.isDisabled(action)
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

	    return jfGridBatchActionsController;
	})();

	function jfGridBatchActions() {
	    return {
	        scope: {
	            actions: "=",
	            gridApi: "=",
	            gridOptions: "="
	        },
	        templateUrl: "directives/jf_grid_batch_actions/jf_grid_batch_actions.html",
	        controller: jfGridBatchActionsController,
	        controllerAs: "jfBatchActions",
	        bindToController: true
	    };
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	jfField.$inject = ["$timeout", "JFrogEventBus", "$rootScope"];
	exports.jfField = jfField;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfField($timeout, JFrogEventBus, $rootScope) {
	    "ngInject";
	    return {
	        restrict: "E",
	        require: "^form",
	        scope: {
	            animated: "@",
	            validations: "@",
	            validationsParams: "=",
	            autofocus: "=",
	            invalidateOnSubmit: "@",
	            alwaysShowErrors: "@",
	            dontValidateDisabled: "@",
	            delayedInit: "=",
	            dontPushDownErrors: "="
	        },
	        transclude: true,
	        templateUrl: "directives/jf_field/jf_field.html",
	        link: function jfInputTextLink(scope, element, attrs, form) {

	            if (!scope.validations) scope.validations = "common";

	            var EVENTS = JFrogEventBus.getEventsDefinition();

	            var inputElement = undefined;
	            var inputName = undefined;
	            var init = function () {
	                inputElement = $(element.find("input")[0]);
	                if (!inputElement.length) {
	                    inputElement = $(element.find("textarea")[0]);
	                }
	                inputName = inputElement.attr("name");
	                scope.formField = form[inputName];
	                if (scope.formField) scope.formField.initialValue = true;
	                scope.form = form;
	                scope.$watch(function () {
	                    return scope.autofocus;
	                }, function () {
	                    return focusInput();
	                });
	                JFrogEventBus.registerOnScope(scope, EVENTS.FORM_SUBMITTED, _onFormSubmitted);
	                JFrogEventBus.registerOnScope(scope, EVENTS.FORM_CLEAR_FIELD_VALIDATION, function (force) {
	                    _onBlur(force);
	                    if (scope.formField) scope.formField.preventShowErrors = true;
	                });

	                scope.$on("$destroy", function () {
	                    inputElement.off("blur");
	                    inputElement.off("keyup");
	                    inputElement.off("keydown");
	                    inputElement.off("focus");
	                });

	                inputElement.on("keydown", function () {
	                    return _onKeyDown();
	                });

	                if (!scope.invalidateOnSubmit && scope.validations) {
	                    inputElement.on("blur", function () {
	                        return _onBlur();
	                    });
	                    inputElement.on("keyup", function () {
	                        return _onKeyUp();
	                    });
	                }
	                if (scope.invalidateOnSubmit || scope.validations) {
	                    inputElement.on("focus", function () {
	                        return _onFocus();
	                    });
	                }

	                if (scope.dontValidateDisabled) {
	                    $rootScope.$watch(function () {
	                        return inputElement[0].disabled;
	                    }, function () {
	                        return _onDisabledChanged(inputElement[0].disabled);
	                    });
	                }
	                focusInput();
	            };

	            if (scope.delayedInit) {
	                $timeout(function () {
	                    return init();
	                });
	            } else {
	                init();
	            }

	            function focusInput() {
	                if (scope.autofocus && scope.autofocus != "false") {
	                    if (scope.formField) {
	                        scope.formField.isAutoFocused = true;
	                        scope.formField.isAutoFocusedFlag = true;
	                    }
	                    $timeout(function () {
	                        if (inputElement.scrollParent && inputElement.scrollParent()) {
	                            var y = inputElement.scrollParent().scrollTop();
	                            inputElement.focus();
	                            inputElement.scrollParent().scrollTop(y);
	                        } else {
	                            inputElement.focus();
	                        }
	                    });
	                }
	            }
	            function _onDisabledChanged(disabled) {
	                if (disabled) {
	                    scope.formField.showErrors = false;
	                } else {
	                    scope.formField.showErrors = true;
	                }
	            }

	            function _onFormSubmitted(formName) {
	                if (!formName || scope.form.$name === formName && !scope.formField.$valid) {
	                    inputElement.addClass("invalid");
	                    if (scope.formField) scope.formField.showErrors = true;
	                } else {
	                    inputElement.removeClass("invalid");
	                    if (scope.formField) scope.formField.showErrors = false;
	                }
	            }

	            function _onBlur(force) {
	                $timeout(function () {
	                    if (scope.formField) {
	                        if (force) {
	                            scope.formField.showErrors = false;
	                        } else if (!scope.formField.preventShowErrors) {
	                            scope.formField.showErrors = true;
	                        }
	                    }
	                });

	                if (force || scope.formField && scope.formField.$valid || scope.formField && scope.formField.preventShowErrors) {
	                    inputElement.removeClass("invalid");
	                } else {
	                    if (scope.formField && !scope.formField.isAutoFocused) inputElement.addClass("invalid");
	                }

	                if (scope.formField && scope.formField.isAutoFocused) {
	                    if (!scope.formField.isAutoFocusedFlag) {
	                        scope.formField.isAutoFocused = false;
	                        scope.formField.showErrors = true;
	                        if (!scope.formField.isAutoFocused) inputElement.addClass("invalid");
	                    } else {
	                        scope.formField.isAutoFocusedFlag = false;
	                    }
	                }
	            }

	            function _onFocus() {
	                $timeout(function () {
	                    if (scope.formField) {
	                        scope.formField.showErrors = false;
	                        scope.formField.preventShowErrors = false;
	                        inputElement.removeClass("invalid");
	                    }

	                    scope.form.$setPristine();
	                });
	            }
	            function _onKeyDown() {
	                if (scope.formField) {
	                    scope.formField.initialValue = false;
	                    scope.formField.isAutoFocusedFlag = false;
	                }
	            }

	            function _onKeyUp() {
	                var value = inputElement.val();
	                if (value !== null && value !== undefined && value !== "") {
	                    inputElement.addClass("hascontent");
	                } else {
	                    inputElement.removeClass("hascontent");
	                }
	            }
	        }
	    };
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfCodeMirror = jfCodeMirror;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var search = __webpack_require__(30).search;

	function jfCodeMirror() {
	    return {
	        restrict: "E",
	        scope: {
	            mimeType: "@",
	            mode: "@",
	            model: "=",
	            allowEdit: "=",
	            height: "@?",
	            apiAccess: "=",
	            autofocus: "@",
	            matchBrackets: "<",
	            autoFormat: "<",
	            autoIndent: "<",
	            enableCopyToClipboard: "<?",
	            clipboardCopyModel: "<?",
	            clipboardCopyEntityName: "@?",
	            clipboardKeepTooltipLetterCase: "<?"
	        },
	        controller: jfCodeController,
	        controllerAs: "jfCodeMirror",
	        bindToController: true,
	        templateUrl: "directives/jf_codemirror/jf_codemirror.html"
	    };
	}

	var jfCodeController = (function () {
	    /* @ngInject */

	    jfCodeController.$inject = ["$scope", "$element", "$timeout", "JFrogUIUtils"];
	    function jfCodeController($scope, $element, $timeout, JFrogUIUtils) {
	        _classCallCheck(this, jfCodeController);

	        this.JFrogUIUtils = JFrogUIUtils;
	        this.$element = $element;
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.defineExtensions();
	    }

	    _createClass(jfCodeController, {
	        $onInit: {
	            value: function $onInit() {
	                this._formatModel();
	                this.autofocus = this.autofocus === "true";

	                this.editorOptions = {
	                    lineNumbers: true,
	                    readOnly: !this.allowEdit, // Don't use nocursor - it disables search
	                    lineWrapping: true,
	                    mode: this.mode || "links",
	                    viewportMargin: 65,
	                    autofocus: this.autofocus,
	                    mimeType: this.mimeType,
	                    matchBrackets: this.matchBrackets,
	                    onLoad: this._codeMirrorLoaded.bind(this)
	                };
	                // Hide cursor in readonly mode
	                if (!this.allowEdit) {
	                    this.editorOptions.cursorBlinkRate = -1;
	                }
	            }
	        },
	        _codeMirrorLoaded: {

	            // register click handlers on code mirror links

	            value: function _codeMirrorLoaded(_editor) {
	                var _this = this;

	                this.cmApi = _editor;
	                if (this.height) {
	                    var codeMirrorElement = $(this.$element).find(".CodeMirror");
	                    if (this.height === "flexible") {
	                        codeMirrorElement.css("top", 0);
	                        codeMirrorElement.css("bottom", 0);
	                        codeMirrorElement.css("left", 0);
	                        codeMirrorElement.css("right", 0);
	                        codeMirrorElement.css("position", "absolute");
	                    } else {
	                        codeMirrorElement.css("height", this.height);
	                    }
	                }
	                $(_editor.display.wrapper).on("click", ".cm-link", function (e) {
	                    var url = $(_this).text();
	                    if (url) {
	                        window.open(url, "_blank");
	                    }
	                });
	                this.$scope.$on("$destroy", function () {
	                    _this.$destroyed = true;
	                    $(_editor.display.wrapper).off("click");
	                });
	                if (this.apiAccess) {
	                    this.apiAccess.api = this.cmApi;
	                    if (this.apiAccess.onLoad) {
	                        this.apiAccess.onLoad();
	                    }
	                }
	            }
	        },
	        autoFormatText: {
	            value: function autoFormatText(indent) {
	                var last = this.cmApi.lineCount();
	                var start = { line: 0, ch: 0 },
	                    end = { line: last };
	                if (indent) {
	                    this.cmApi.autoIndentRange(start, end);
	                } else {
	                    this.cmApi.autoFormatRange(start, end);
	                }
	                this.cmApi.setCursor(start);
	            }
	        },
	        _isJSON: {
	            value: function _isJSON(str) {
	                try {
	                    JSON.parse(str);
	                } catch (e) {
	                    return false;
	                }
	                return true;
	            }
	        },
	        _formatModel: {
	            value: function _formatModel() {
	                var _this = this;

	                var format = function (content) {
	                    if (_this.autoFormat && (_this.mode === "javascript" || _this.mode === "htmlmixed")) {
	                        _this.$timeout(function () {
	                            if (_this.cmApi && _this.cmApi.getValue().length > 0) {
	                                _this.autoFormatText();
	                                _this.formattedModel = _this.cmApi.getValue();
	                                _this.cmApi.refresh();
	                            }
	                        });
	                    }
	                    if (_this._isJSON(content)) {
	                        _this.formattedModel = __webpack_require__(31).js_beautify(content);
	                    } else {
	                        _this.formattedModel = content;
	                    }
	                    _this.expectChange();
	                    _this.refreshUntilVisible();
	                };

	                if (!this.allowEdit) {
	                    format(this.model);
	                    this.$scope.$watch("jfCodeMirror.model", function (v) {
	                        format(v);
	                    });
	                } else {
	                    this.formattedModel = this.model;
	                    this.$scope.$watch("jfCodeMirror.model", function (v) {
	                        if (_this.formattedModel !== _this.model) {
	                            _this.formattedModel = _this.model;
	                            _this.expectChange();
	                            _this.refreshUntilVisible();
	                        }
	                    });
	                    this.$scope.$watch("jfCodeMirror.formattedModel", function (v) {
	                        _this.model = v;
	                    });
	                    this.expectChange();
	                    this.refreshUntilVisible();
	                }
	            }
	        },
	        refreshUntilVisible: {
	            value: function refreshUntilVisible() {
	                var _this = this;

	                if (this.cmApi) this.cmApi.refresh();
	                if (this.allowEdit) {
	                    return;
	                }this.$timeout(function () {
	                    var cmText = $(_this.$element).find(".CodeMirror-code").find("pre").text().replace(/\u200B/g, "");
	                    if (_this.expectingChange && cmText === _this.lastVal) {
	                        if (_this.cmApi) {
	                            _this.cmApi.refresh();
	                        }
	                        if (!_this.$destroyed) _this.refreshUntilVisible();
	                    } else if (_this.expectingChange) {
	                        _this.expectingChange = false;
	                        delete _this.lastVal;
	                    }
	                }, 100);
	            }
	        },
	        expectChange: {
	            value: function expectChange() {
	                var cmText = $(this.$element).find(".CodeMirror-code").find("pre").text().replace(/\u200B/g, "");
	                this.expectingChange = true;
	                this.lastVal = cmText;
	            }
	        },
	        defineExtensions: {
	            value: function defineExtensions() {
	                var _this = this;

	                CodeMirror.defineExtension("autoFormatRange", function (from, to) {
	                    var cm = _this.cmApi;
	                    var outer = cm.getMode(),
	                        text = cm.getRange(from, to).split("\n");
	                    var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
	                    var tabSize = cm.getOption("tabSize");

	                    var out = "",
	                        lines = 0,
	                        atSol = from.ch == 0;
	                    var newline = function () {
	                        out += "\n";
	                        atSol = true;
	                        ++lines;
	                    };

	                    for (var i = 0; i < text.length; ++i) {
	                        var stream = new CodeMirror.StringStream(text[i], tabSize);
	                        while (!stream.eol()) {
	                            var inner = CodeMirror.innerMode(outer, state);
	                            var style = outer.token(stream, state),
	                                cur = stream.current();
	                            stream.start = stream.pos;
	                            if (!atSol || /\S/.test(cur)) {
	                                out += cur;
	                                atSol = false;
	                            }
	                            if (!atSol && inner.mode.newlineAfterToken && inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state)) newline();
	                        }
	                        if (!stream.pos && outer.blankLine) outer.blankLine(state);
	                        if (!atSol) newline();
	                    }

	                    cm.operation(function () {
	                        cm.replaceRange(out, from, to);
	                        for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) {
	                            cm.indentLine(cur, "smart");
	                        }
	                    });
	                });

	                // Applies automatic mode-aware indentation to the specified range
	                CodeMirror.defineExtension("autoIndentRange", function (from, to) {
	                    var cmInstance = _this.cmApi;
	                    _this.cmApi.operation(function () {
	                        for (var i = from.line; i <= to.line; i++) {
	                            cmInstance.indentLine(i, "smart");
	                        }
	                    });
	                });
	            }
	        },
	        codeMirrorIsWithScroll: {
	            value: function codeMirrorIsWithScroll() {
	                var codemirrorScrollBar = this.$element.find(".CodeMirror .CodeMirror-vscrollbar:not(:hidden)");
	                return codemirrorScrollBar && codemirrorScrollBar.length > 0;
	            }
	        }
	    });

	    return jfCodeController;
	})();

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	exports.search = search;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	"use strict";
	function searchOverlay(query, caseInsensitive) {
	    if (typeof query == "string") {
	        query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" : "g");
	    } else if (!query.global) {
	        query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");
	    }

	    return {
	        token: function token(stream) {
	            query.lastIndex = stream.pos;
	            var match = query.exec(stream.string);
	            if (match && match.index == stream.pos) {
	                stream.pos += match[0].length;
	                return "searching";
	            } else if (match) {
	                stream.pos = match.index;
	            } else {
	                stream.skipToEnd();
	            }
	        }
	    };
	}

	function SearchState() {
	    this.posFrom = this.posTo = this.query = null;
	    this.overlay = null;
	}

	function getSearchState(cm) {
	    return cm.state.search || (cm.state.search = new SearchState());
	}

	function queryCaseInsensitive(query) {
	    return typeof query == "string" && query == query.toLowerCase();
	}

	function getSearchCursor(cm, query, pos) {
	    // Heuristic: if the query string is all lowercase, do a case insensitive search.
	    return cm.getSearchCursor(query, pos, queryCaseInsensitive(query));
	}

	function dialog(cm, text, shortText, deflt, f) {
	    if (cm.openDialog) {
	        cm.openDialog(text, f, { value: deflt, closeOnEnter: false });
	    } else {
	        f(prompt(shortText, deflt));
	    }
	}

	function confirmDialog(cm, text, shortText, fs) {
	    if (cm.openConfirm) {
	        cm.openConfirm(text, fs);
	    } else if (confirm(shortText)) {
	        fs[0]();
	    }
	}

	function parseQuery(query) {
	    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
	    if (isRE) {
	        try {
	            query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i");
	        } catch (e) {} // Not a regular expression after all, do a string search
	    }
	    if (typeof query == "string" ? query == "" : query.test("")) {
	        query = /x^/;
	    }
	    return query;
	}

	var queryDialog = "<label class=\"input-label-weight\">Search:</label> <input type=\"text\"  class=\"input-text\"/> ";

	function doSearch(cm, rev) {
	    var state = getSearchState(cm);
	    if (state.query) {
	        return findNext(cm, rev);
	    }
	    dialog(cm, queryDialog, "Search for:", cm.getSelection(), function (query) {
	        cm.operation(function () {
	            //if (!query || state.query) return;
	            var newQuery = parseQuery(query);
	            if (newQuery !== state.query) {
	                state.query = newQuery;
	                cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
	                state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
	                cm.addOverlay(state.overlay);
	                if (cm.showMatchesOnScrollbar) {
	                    if (state.annotate) {
	                        state.annotate.clear();
	                        state.annotate = null;
	                    }
	                    state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
	                }
	                state.posFrom = state.posTo = cm.getCursor();
	            }
	            findNext(cm, rev);
	        });
	    });
	}

	function findNext(cm, rev) {
	    cm.operation(function () {
	        var state = getSearchState(cm);
	        var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
	        if (!cursor.find(rev)) {
	            cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
	            if (!cursor.find(rev)) {
	                return;
	            }
	        }
	        cm.setSelection(cursor.from(), cursor.to());
	        cm.scrollIntoView({ from: cursor.from(), to: cursor.to() });
	        state.posFrom = cursor.from();
	        state.posTo = cursor.to();
	    });
	}

	function clearSearch(cm) {
	    cm.operation(function () {
	        var state = getSearchState(cm);
	        if (!state.query) {
	            return;
	        }
	        state.query = null;
	        cm.removeOverlay(state.overlay);
	        if (state.annotate) {
	            state.annotate.clear();
	            state.annotate = null;
	        }
	    });
	}

	var replaceQueryDialog = "Replace: <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/> <span style=\"color: #888\" class=\"CodeMirror-search-hint\">(Use /re/ syntax for regexp search)</span>";
	var replacementQueryDialog = "With: <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/>";
	var doReplaceConfirm = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";

	function replace(cm, all) {
	    if (cm.getOption("readOnly")) {
	        return;
	    }
	    dialog(cm, replaceQueryDialog, "Replace:", cm.getSelection(), function (query) {
	        if (!query) {
	            return;
	        }
	        query = parseQuery(query);
	        dialog(cm, replacementQueryDialog, "Replace with:", "", function (text) {
	            if (all) {
	                cm.operation(function () {
	                    for (var cursor = getSearchCursor(cm, query); cursor.findNext();) {
	                        if (typeof query != "string") {
	                            var match = cm.getRange(cursor.from(), cursor.to()).match(query);
	                            cursor.replace(text.replace(/\$(\d)/g, function (_, i) {
	                                return match[i];
	                            }));
	                        } else {
	                            cursor.replace(text);
	                        }
	                    }
	                });
	            } else {
	                clearSearch(cm);
	                var cursor = getSearchCursor(cm, query, cm.getCursor());
	                var advance = (function (_advance) {
	                    var _advanceWrapper = function advance() {
	                        return _advance.apply(this, arguments);
	                    };

	                    _advanceWrapper.toString = function () {
	                        return _advance.toString();
	                    };

	                    return _advanceWrapper;
	                })(function () {
	                    var start = cursor.from(),
	                        match;
	                    if (!(match = cursor.findNext())) {
	                        cursor = getSearchCursor(cm, query);
	                        if (!(match = cursor.findNext()) || start && cursor.from().line == start.line && cursor.from().ch == start.ch) {
	                            return;
	                        }
	                    }
	                    cm.setSelection(cursor.from(), cursor.to());
	                    cm.scrollIntoView({ from: cursor.from(), to: cursor.to() });
	                    confirmDialog(cm, doReplaceConfirm, "Replace?", [function () {
	                        doReplace(match);
	                    }, advance]);
	                });
	                var doReplace = function doReplace(match) {
	                    cursor.replace(typeof query == "string" ? text : text.replace(/\$(\d)/g, function (_, i) {
	                        return match[i];
	                    }));
	                    advance();
	                };
	                advance();
	            }
	        });
	    });
	}

	CodeMirror.commands.find = function (cm) {
	    clearSearch(cm);
	    doSearch(cm);
	};
	CodeMirror.commands.findNext = doSearch;
	CodeMirror.commands.findPrev = function (cm) {
	    doSearch(cm, true);
	};
	CodeMirror.commands.clearSearch = clearSearch;
	CodeMirror.commands.replace = replace;
	CodeMirror.commands.replaceAll = function (cm) {
	    replace(cm, true);
	};

	function search() {} //export nothing, prevent ide from marking import as error

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	  The MIT License (MIT)

	  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.

	*/

	/**
	The following batches are equivalent:

	var beautify_js = require('js-beautify');
	var beautify_js = require('js-beautify').js;
	var beautify_js = require('js-beautify').js_beautify;

	var beautify_css = require('js-beautify').css;
	var beautify_css = require('js-beautify').css_beautify;

	var beautify_html = require('js-beautify').html;
	var beautify_html = require('js-beautify').html_beautify;

	All methods returned accept two arguments, the source string and an options object.
	**/

	"use strict";

	function get_beautify(js_beautify, css_beautify, html_beautify) {
	    // the default is js
	    var beautify = function beautify(src, config) {
	        return js_beautify.js_beautify(src, config);
	    };

	    // short aliases
	    beautify.js = js_beautify.js_beautify;
	    beautify.css = css_beautify.css_beautify;
	    beautify.html = html_beautify.html_beautify;

	    // legacy aliases
	    beautify.js_beautify = js_beautify.js_beautify;
	    beautify.css_beautify = css_beautify.css_beautify;
	    beautify.html_beautify = html_beautify.html_beautify;

	    return beautify;
	}

	if (true) {
	    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32), __webpack_require__(33), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function (js_beautify, css_beautify, html_beautify) {
	        return get_beautify(js_beautify, css_beautify, html_beautify);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    (function (mod) {
	        var js_beautify = require("./lib/beautify");
	        var css_beautify = require("./lib/beautify-css");
	        var html_beautify = require("./lib/beautify-html");

	        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);
	    })(module);
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";if(!Object.values){Object.values = function(o){if(o !== Object(o)){throw new TypeError("Object.values called on a non-object");}var k=[], p;for(p in o) {if(Object.prototype.hasOwnProperty.call(o, p)){k.push(o[p]);}}return k;};}(function(){function mergeOpts(allOptions, targetType){var finalOpts={};var name;for(name in allOptions) {if(name !== targetType){finalOpts[name] = allOptions[name];}}if(targetType in allOptions){for(name in allOptions[targetType]) {finalOpts[name] = allOptions[targetType][name];}}return finalOpts;}function js_beautify(js_source_text, options){var acorn={};(function(exports){var nonASCIIwhitespace=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;var nonASCIIidentifierStartChars="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";var nonASCIIidentifierChars="̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";var nonASCIIidentifierStart=new RegExp("[" + nonASCIIidentifierStartChars + "]");var nonASCIIidentifier=new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");exports.newline = /[\n\r\u2028\u2029]/;exports.lineBreak = new RegExp("\r\n|" + exports.newline.source);exports.allLineBreaks = new RegExp(exports.lineBreak.source, "g");exports.isIdentifierStart = function(code){if(code < 65)return code === 36 || code === 64;if(code < 91)return true;if(code < 97)return code === 95;if(code < 123)return true;return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));};exports.isIdentifierChar = function(code){if(code < 48)return code === 36;if(code < 58)return true;if(code < 65)return false;if(code < 91)return true;if(code < 97)return code === 95;if(code < 123)return true;return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));};})(acorn);function in_array(what, arr){for(var i=0; i < arr.length; i += 1) {if(arr[i] === what){return true;}}return false;}function trim(s){return s.replace(/^\s+|\s+$/g, "");}function ltrim(s){return s.replace(/^\s+/g, "");}function sanitizeOperatorPosition(opPosition){opPosition = opPosition || OPERATOR_POSITION.before_newline;var validPositionValues=Object.values(OPERATOR_POSITION);if(!in_array(opPosition, validPositionValues)){throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" + validPositionValues + "\nYou passed in: '" + opPosition + "'");}return opPosition;}var OPERATOR_POSITION={before_newline:"before-newline", after_newline:"after-newline", preserve_newline:"preserve-newline"};var OPERATOR_POSITION_BEFORE_OR_PRESERVE=[OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];var MODE={BlockStatement:"BlockStatement", Statement:"Statement", ObjectLiteral:"ObjectLiteral", ArrayLiteral:"ArrayLiteral", ForInitializer:"ForInitializer", Conditional:"Conditional", Expression:"Expression"};function Beautifier(js_source_text, options){"use strict";var output;var tokens=[], token_pos;var Tokenizer;var current_token;var last_type, last_last_text, indent_string;var flags, previous_flags, flag_store;var prefix;var handlers, opt;var baseIndentString="";handlers = {TK_START_EXPR:handle_start_expr, TK_END_EXPR:handle_end_expr, TK_START_BLOCK:handle_start_block, TK_END_BLOCK:handle_end_block, TK_WORD:handle_word, TK_RESERVED:handle_word, TK_SEMICOLON:handle_semicolon, TK_STRING:handle_string, TK_EQUALS:handle_equals, TK_OPERATOR:handle_operator, TK_COMMA:handle_comma, TK_BLOCK_COMMENT:handle_block_comment, TK_COMMENT:handle_comment, TK_DOT:handle_dot, TK_UNKNOWN:handle_unknown, TK_EOF:handle_eof};function create_flags(flags_base, mode){var next_indent_level=0;if(flags_base){next_indent_level = flags_base.indentation_level;if(!output.just_added_newline() && flags_base.line_indent_level > next_indent_level){next_indent_level = flags_base.line_indent_level;}}var next_flags={mode:mode, parent:flags_base, last_text:flags_base?flags_base.last_text:"", last_word:flags_base?flags_base.last_word:"", declaration_statement:false, declaration_assignment:false, multiline_frame:false, inline_frame:false, if_block:false, else_block:false, do_block:false, do_while:false, import_block:false, in_case_statement:false, in_case:false, case_body:false, indentation_level:next_indent_level, line_indent_level:flags_base?flags_base.line_indent_level:next_indent_level, start_line_index:output.get_line_number(), ternary_depth:0};return next_flags;}options = options?options:{};options = mergeOpts(options, "js");opt = {};if(options.brace_style === "expand-strict"){options.brace_style = "expand";}else if(options.brace_style === "collapse-preserve-inline"){options.brace_style = "collapse,preserve-inline";}else if(options.braces_on_own_line !== undefined){options.brace_style = options.braces_on_own_line?"expand":"collapse";}else if(!options.brace_style){options.brace_style = "collapse";}var brace_style_split=options.brace_style.split(/[^a-zA-Z0-9_\-]+/);opt.brace_style = brace_style_split[0];opt.brace_preserve_inline = brace_style_split[1]?brace_style_split[1]:false;opt.indent_size = options.indent_size?parseInt(options.indent_size, 10):4;opt.indent_char = options.indent_char?options.indent_char:" ";opt.eol = options.eol?options.eol:"auto";opt.preserve_newlines = options.preserve_newlines === undefined?true:options.preserve_newlines;opt.break_chained_methods = options.break_chained_methods === undefined?false:options.break_chained_methods;opt.max_preserve_newlines = options.max_preserve_newlines === undefined?0:parseInt(options.max_preserve_newlines, 10);opt.space_in_paren = options.space_in_paren === undefined?false:options.space_in_paren;opt.space_in_empty_paren = options.space_in_empty_paren === undefined?false:options.space_in_empty_paren;opt.jslint_happy = options.jslint_happy === undefined?false:options.jslint_happy;opt.space_after_anon_function = options.space_after_anon_function === undefined?false:options.space_after_anon_function;opt.keep_array_indentation = options.keep_array_indentation === undefined?false:options.keep_array_indentation;opt.space_before_conditional = options.space_before_conditional === undefined?true:options.space_before_conditional;opt.unescape_strings = options.unescape_strings === undefined?false:options.unescape_strings;opt.wrap_line_length = options.wrap_line_length === undefined?0:parseInt(options.wrap_line_length, 10);opt.e4x = options.e4x === undefined?false:options.e4x;opt.end_with_newline = options.end_with_newline === undefined?false:options.end_with_newline;opt.comma_first = options.comma_first === undefined?false:options.comma_first;opt.operator_position = sanitizeOperatorPosition(options.operator_position);opt.test_output_raw = options.test_output_raw === undefined?false:options.test_output_raw;if(opt.jslint_happy){opt.space_after_anon_function = true;}if(options.indent_with_tabs){opt.indent_char = "\t";opt.indent_size = 1;}if(opt.eol === "auto"){opt.eol = "\n";if(js_source_text && acorn.lineBreak.test(js_source_text || "")){opt.eol = js_source_text.match(acorn.lineBreak)[0];}}opt.eol = opt.eol.replace(/\\r/, "\r").replace(/\\n/, "\n");indent_string = "";while(opt.indent_size > 0) {indent_string += opt.indent_char;opt.indent_size -= 1;}var preindent_index=0;if(js_source_text && js_source_text.length){while(js_source_text.charAt(preindent_index) === " " || js_source_text.charAt(preindent_index) === "\t") {baseIndentString += js_source_text.charAt(preindent_index);preindent_index += 1;}js_source_text = js_source_text.substring(preindent_index);}last_type = "TK_START_BLOCK";last_last_text = "";output = new Output(indent_string, baseIndentString);output.raw = opt.test_output_raw;flag_store = [];set_mode(MODE.BlockStatement);this.beautify = function(){var sweet_code;Tokenizer = new tokenizer(js_source_text, opt, indent_string);tokens = Tokenizer.tokenize();token_pos = 0;current_token = get_token();while(current_token) {handlers[current_token.type]();last_last_text = flags.last_text;last_type = current_token.type;flags.last_text = current_token.text;token_pos += 1;current_token = get_token();}sweet_code = output.get_code();if(opt.end_with_newline){sweet_code += "\n";}if(opt.eol !== "\n"){sweet_code = sweet_code.replace(/[\n]/g, opt.eol);}return sweet_code;};function handle_whitespace_and_comments(local_token, preserve_statement_flags){var newlines=local_token.newlines;var keep_whitespace=opt.keep_array_indentation && is_array(flags.mode);var temp_token=current_token;for(var h=0; h < local_token.comments_before.length; h++) {current_token = local_token.comments_before[h];handle_whitespace_and_comments(current_token, preserve_statement_flags);handlers[current_token.type](preserve_statement_flags);}current_token = temp_token;if(keep_whitespace){for(var i=0; i < newlines; i += 1) {print_newline(i > 0, preserve_statement_flags);}}else {if(opt.max_preserve_newlines && newlines > opt.max_preserve_newlines){newlines = opt.max_preserve_newlines;}if(opt.preserve_newlines){if(local_token.newlines > 1){print_newline(false, preserve_statement_flags);for(var j=1; j < newlines; j += 1) {print_newline(true, preserve_statement_flags);}}}}}function split_linebreaks(s){s = s.replace(acorn.allLineBreaks, "\n");var out=[], idx=s.indexOf("\n");while(idx !== -1) {out.push(s.substring(0, idx));s = s.substring(idx + 1);idx = s.indexOf("\n");}if(s.length){out.push(s);}return out;}var newline_restricted_tokens=["break", "continue", "return", "throw"];function allow_wrap_or_preserved_newline(force_linewrap){force_linewrap = force_linewrap === undefined?false:force_linewrap;if(output.just_added_newline()){return;}var shouldPreserveOrForce=opt.preserve_newlines && current_token.wanted_newline || force_linewrap;var operatorLogicApplies=in_array(flags.last_text, Tokenizer.positionable_operators) || in_array(current_token.text, Tokenizer.positionable_operators);if(operatorLogicApplies){var shouldPrintOperatorNewline=in_array(flags.last_text, Tokenizer.positionable_operators) && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array(current_token.text, Tokenizer.positionable_operators);shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;}if(shouldPreserveOrForce){print_newline(false, true);}else if(opt.wrap_line_length){if(last_type === "TK_RESERVED" && in_array(flags.last_text, newline_restricted_tokens)){return;}var proposed_line_length=output.current_line.get_character_count() + current_token.text.length + (output.space_before_token?1:0);if(proposed_line_length >= opt.wrap_line_length){print_newline(false, true);}}}function print_newline(force_newline, preserve_statement_flags){if(!preserve_statement_flags){if(flags.last_text !== ";" && flags.last_text !== "," && flags.last_text !== "=" && last_type !== "TK_OPERATOR"){var next_token=get_token(1);while(flags.mode === MODE.Statement && !(flags.if_block && next_token && next_token.type === "TK_RESERVED" && next_token.text === "else") && !flags.do_block) {restore_mode();}}}if(output.add_new_line(force_newline)){flags.multiline_frame = true;}}function print_token_line_indentation(){if(output.just_added_newline()){if(opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline){output.current_line.push(current_token.whitespace_before);output.space_before_token = false;}else if(output.set_indent(flags.indentation_level)){flags.line_indent_level = flags.indentation_level;}}}function print_token(printable_token){if(output.raw){output.add_raw_token(current_token);return;}if(opt.comma_first && last_type === "TK_COMMA" && output.just_added_newline()){if(output.previous_line.last() === ","){var popped=output.previous_line.pop();if(output.previous_line.is_empty()){output.previous_line.push(popped);output.trim(true);output.current_line.pop();output.trim();}print_token_line_indentation();output.add_token(",");output.space_before_token = true;}}printable_token = printable_token || current_token.text;print_token_line_indentation();output.add_token(printable_token);}function indent(){flags.indentation_level += 1;}function deindent(){if(flags.indentation_level > 0 && (!flags.parent || flags.indentation_level > flags.parent.indentation_level)){flags.indentation_level -= 1;}}function set_mode(mode){if(flags){flag_store.push(flags);previous_flags = flags;}else {previous_flags = create_flags(null, mode);}flags = create_flags(previous_flags, mode);}function is_array(mode){return mode === MODE.ArrayLiteral;}function is_expression(mode){return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);}function restore_mode(){if(flag_store.length > 0){previous_flags = flags;flags = flag_store.pop();if(previous_flags.mode === MODE.Statement){output.remove_redundant_indentation(previous_flags);}}}function start_of_object_property(){return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (flags.last_text === ":" && flags.ternary_depth === 0 || last_type === "TK_RESERVED" && in_array(flags.last_text, ["get", "set"]));}function start_of_statement(){if(last_type === "TK_RESERVED" && in_array(flags.last_text, ["var", "let", "const"]) && current_token.type === "TK_WORD" || last_type === "TK_RESERVED" && flags.last_text === "do" || last_type === "TK_RESERVED" && in_array(flags.last_text, ["return", "throw"]) && !current_token.wanted_newline || last_type === "TK_RESERVED" && flags.last_text === "else" && !(current_token.type === "TK_RESERVED" && current_token.text === "if" && !current_token.comments_before.length) || last_type === "TK_END_EXPR" && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional) || last_type === "TK_WORD" && flags.mode === MODE.BlockStatement && !flags.in_case && !(current_token.text === "--" || current_token.text === "++") && last_last_text !== "function" && current_token.type !== "TK_WORD" && current_token.type !== "TK_RESERVED" || flags.mode === MODE.ObjectLiteral && (flags.last_text === ":" && flags.ternary_depth === 0 || last_type === "TK_RESERVED" && in_array(flags.last_text, ["get", "set"]))){set_mode(MODE.Statement);indent();handle_whitespace_and_comments(current_token, true);if(!start_of_object_property()){allow_wrap_or_preserved_newline(current_token.type === "TK_RESERVED" && in_array(current_token.text, ["do", "for", "if", "while"]));}return true;}return false;}function all_lines_start_with(lines, c){for(var i=0; i < lines.length; i++) {var line=trim(lines[i]);if(line.charAt(0) !== c){return false;}}return true;}function each_line_matches_indent(lines, indent){var i=0, len=lines.length, line;for(; i < len; i++) {line = lines[i];if(line && line.indexOf(indent) !== 0){return false;}}return true;}function is_special_word(word){return in_array(word, ["case", "return", "do", "if", "throw", "else"]);}function get_token(offset){var index=token_pos + (offset || 0);return index < 0 || index >= tokens.length?null:tokens[index];}function handle_start_expr(){if(!start_of_statement()){handle_whitespace_and_comments(current_token);}var next_mode=MODE.Expression;if(current_token.text === "["){if(last_type === "TK_WORD" || flags.last_text === ")"){if(last_type === "TK_RESERVED" && in_array(flags.last_text, Tokenizer.line_starters)){output.space_before_token = true;}set_mode(next_mode);print_token();indent();if(opt.space_in_paren){output.space_before_token = true;}return;}next_mode = MODE.ArrayLiteral;if(is_array(flags.mode)){if(flags.last_text === "[" || flags.last_text === "," && (last_last_text === "]" || last_last_text === "}")){if(!opt.keep_array_indentation){print_newline();}}}}else {if(last_type === "TK_RESERVED" && flags.last_text === "for"){next_mode = MODE.ForInitializer;}else if(last_type === "TK_RESERVED" && in_array(flags.last_text, ["if", "while"])){next_mode = MODE.Conditional;}else {}}if(flags.last_text === ";" || last_type === "TK_START_BLOCK"){print_newline();}else if(last_type === "TK_END_EXPR" || last_type === "TK_START_EXPR" || last_type === "TK_END_BLOCK" || flags.last_text === "."){allow_wrap_or_preserved_newline(current_token.wanted_newline);}else if(!(last_type === "TK_RESERVED" && current_token.text === "(") && last_type !== "TK_WORD" && last_type !== "TK_OPERATOR"){output.space_before_token = true;}else if(last_type === "TK_RESERVED" && (flags.last_word === "function" || flags.last_word === "typeof") || flags.last_text === "*" && (in_array(last_last_text, ["function", "yield"]) || flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ["{", ","]))){if(opt.space_after_anon_function){output.space_before_token = true;}}else if(last_type === "TK_RESERVED" && (in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === "catch")){if(opt.space_before_conditional){output.space_before_token = true;}}if(current_token.text === "(" && last_type === "TK_RESERVED" && flags.last_word === "await"){output.space_before_token = true;}if(current_token.text === "("){if(last_type === "TK_EQUALS" || last_type === "TK_OPERATOR"){if(!start_of_object_property()){allow_wrap_or_preserved_newline();}}}if(current_token.text === "(" && last_type !== "TK_WORD" && last_type !== "TK_RESERVED"){allow_wrap_or_preserved_newline();}set_mode(next_mode);print_token();if(opt.space_in_paren){output.space_before_token = true;}indent();}function handle_end_expr(){while(flags.mode === MODE.Statement) {restore_mode();}handle_whitespace_and_comments(current_token);if(flags.multiline_frame){allow_wrap_or_preserved_newline(current_token.text === "]" && is_array(flags.mode) && !opt.keep_array_indentation);}if(opt.space_in_paren){if(last_type === "TK_START_EXPR" && !opt.space_in_empty_paren){output.trim();output.space_before_token = false;}else {output.space_before_token = true;}}if(current_token.text === "]" && opt.keep_array_indentation){print_token();restore_mode();}else {restore_mode();print_token();}output.remove_redundant_indentation(previous_flags);if(flags.do_while && previous_flags.mode === MODE.Conditional){previous_flags.mode = MODE.Expression;flags.do_block = false;flags.do_while = false;}}function handle_start_block(){handle_whitespace_and_comments(current_token);var next_token=get_token(1);var second_token=get_token(2);if(second_token && (in_array(second_token.text, [":", ","]) && in_array(next_token.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || in_array(next_token.text, ["get", "set", "..."]) && in_array(second_token.type, ["TK_WORD", "TK_RESERVED"]))){if(!in_array(last_last_text, ["class", "interface"])){set_mode(MODE.ObjectLiteral);}else {set_mode(MODE.BlockStatement);}}else if(last_type === "TK_OPERATOR" && flags.last_text === "=>"){set_mode(MODE.BlockStatement);}else if(in_array(last_type, ["TK_EQUALS", "TK_START_EXPR", "TK_COMMA", "TK_OPERATOR"]) || last_type === "TK_RESERVED" && in_array(flags.last_text, ["return", "throw", "import", "default"])){set_mode(MODE.ObjectLiteral);}else {set_mode(MODE.BlockStatement);}var empty_braces=!next_token.comments_before.length && next_token.text === "}";var empty_anonymous_function=empty_braces && flags.last_word === "function" && last_type === "TK_END_EXPR";if(opt.brace_preserve_inline){var index=0;var check_token=null;flags.inline_frame = true;do{index += 1;check_token = get_token(index);if(check_token.wanted_newline){flags.inline_frame = false;break;}}while(check_token.type !== "TK_EOF" && !(check_token.type === "TK_END_BLOCK" && check_token.opened === current_token));}if((opt.brace_style === "expand" || opt.brace_style === "none" && current_token.wanted_newline) && !flags.inline_frame){if(last_type !== "TK_OPERATOR" && (empty_anonymous_function || last_type === "TK_EQUALS" || last_type === "TK_RESERVED" && is_special_word(flags.last_text) && flags.last_text !== "else")){output.space_before_token = true;}else {print_newline(false, true);}}else {if(is_array(previous_flags.mode) && (last_type === "TK_START_EXPR" || last_type === "TK_COMMA")){if(last_type === "TK_COMMA" || opt.space_in_paren){output.space_before_token = true;}if(last_type === "TK_COMMA" || last_type === "TK_START_EXPR" && flags.inline_frame){allow_wrap_or_preserved_newline();previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;flags.multiline_frame = false;}}if(last_type !== "TK_OPERATOR" && last_type !== "TK_START_EXPR"){if(last_type === "TK_START_BLOCK" && !flags.inline_frame){print_newline();}else {output.space_before_token = true;}}}print_token();indent();}function handle_end_block(){handle_whitespace_and_comments(current_token);while(flags.mode === MODE.Statement) {restore_mode();}var empty_braces=last_type === "TK_START_BLOCK";if(flags.inline_frame && !empty_braces){output.space_before_token = true;}else if(opt.brace_style === "expand"){if(!empty_braces){print_newline();}}else {if(!empty_braces){if(is_array(flags.mode) && opt.keep_array_indentation){opt.keep_array_indentation = false;print_newline();opt.keep_array_indentation = true;}else {print_newline();}}}restore_mode();print_token();}function handle_word(){if(current_token.type === "TK_RESERVED"){if(in_array(current_token.text, ["set", "get"]) && flags.mode !== MODE.ObjectLiteral){current_token.type = "TK_WORD";}else if(in_array(current_token.text, ["as", "from"]) && !flags.import_block){current_token.type = "TK_WORD";}else if(flags.mode === MODE.ObjectLiteral){var next_token=get_token(1);if(next_token.text === ":"){current_token.type = "TK_WORD";}}}if(start_of_statement()){if(last_type === "TK_RESERVED" && in_array(flags.last_text, ["var", "let", "const"]) && current_token.type === "TK_WORD"){flags.declaration_statement = true;}}else if(current_token.wanted_newline && !is_expression(flags.mode) && (last_type !== "TK_OPERATOR" || (flags.last_text === "--" || flags.last_text === "++")) && last_type !== "TK_EQUALS" && (opt.preserve_newlines || !(last_type === "TK_RESERVED" && in_array(flags.last_text, ["var", "let", "const", "set", "get"])))){handle_whitespace_and_comments(current_token);print_newline();}else {handle_whitespace_and_comments(current_token);}if(flags.do_block && !flags.do_while){if(current_token.type === "TK_RESERVED" && current_token.text === "while"){output.space_before_token = true;print_token();output.space_before_token = true;flags.do_while = true;return;}else {print_newline();flags.do_block = false;}}if(flags.if_block){if(!flags.else_block && (current_token.type === "TK_RESERVED" && current_token.text === "else")){flags.else_block = true;}else {while(flags.mode === MODE.Statement) {restore_mode();}flags.if_block = false;flags.else_block = false;}}if(current_token.type === "TK_RESERVED" && (current_token.text === "case" || current_token.text === "default" && flags.in_case_statement)){print_newline();if(flags.case_body || opt.jslint_happy){deindent();flags.case_body = false;}print_token();flags.in_case = true;flags.in_case_statement = true;return;}if(last_type === "TK_COMMA" || last_type === "TK_START_EXPR" || last_type === "TK_EQUALS" || last_type === "TK_OPERATOR"){if(!start_of_object_property()){allow_wrap_or_preserved_newline();}}if(current_token.type === "TK_RESERVED" && current_token.text === "function"){if(in_array(flags.last_text, ["}", ";"]) || output.just_added_newline() && !(in_array(flags.last_text, ["(", "[", "{", ":", "=", ","]) || last_type === "TK_OPERATOR")){if(!output.just_added_blankline() && !current_token.comments_before.length){print_newline();print_newline(true);}}if(last_type === "TK_RESERVED" || last_type === "TK_WORD"){if(last_type === "TK_RESERVED" && in_array(flags.last_text, ["get", "set", "new", "return", "export", "async"])){output.space_before_token = true;}else if(last_type === "TK_RESERVED" && flags.last_text === "default" && last_last_text === "export"){output.space_before_token = true;}else {print_newline();}}else if(last_type === "TK_OPERATOR" || flags.last_text === "="){output.space_before_token = true;}else if(!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))){}else {print_newline();}print_token();flags.last_word = current_token.text;return;}prefix = "NONE";if(last_type === "TK_END_BLOCK"){if(previous_flags.inline_frame){prefix = "SPACE";}else if(!(current_token.type === "TK_RESERVED" && in_array(current_token.text, ["else", "catch", "finally", "from"]))){prefix = "NEWLINE";}else {if(opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "none" && current_token.wanted_newline){prefix = "NEWLINE";}else {prefix = "SPACE";output.space_before_token = true;}}}else if(last_type === "TK_SEMICOLON" && flags.mode === MODE.BlockStatement){prefix = "NEWLINE";}else if(last_type === "TK_SEMICOLON" && is_expression(flags.mode)){prefix = "SPACE";}else if(last_type === "TK_STRING"){prefix = "NEWLINE";}else if(last_type === "TK_RESERVED" || last_type === "TK_WORD" || flags.last_text === "*" && (in_array(last_last_text, ["function", "yield"]) || flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ["{", ","]))){prefix = "SPACE";}else if(last_type === "TK_START_BLOCK"){if(flags.inline_frame){prefix = "SPACE";}else {prefix = "NEWLINE";}}else if(last_type === "TK_END_EXPR"){output.space_before_token = true;prefix = "NEWLINE";}if(current_token.type === "TK_RESERVED" && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ")"){if(flags.inline_frame || flags.last_text === "else" || flags.last_text === "export"){prefix = "SPACE";}else {prefix = "NEWLINE";}}if(current_token.type === "TK_RESERVED" && in_array(current_token.text, ["else", "catch", "finally"])){if((!(last_type === "TK_END_BLOCK" && previous_flags.mode === MODE.BlockStatement) || opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "none" && current_token.wanted_newline) && !flags.inline_frame){print_newline();}else {output.trim(true);var line=output.current_line;if(line.last() !== "}"){print_newline();}output.space_before_token = true;}}else if(prefix === "NEWLINE"){if(last_type === "TK_RESERVED" && is_special_word(flags.last_text)){output.space_before_token = true;}else if(last_type !== "TK_END_EXPR"){if((last_type !== "TK_START_EXPR" || !(current_token.type === "TK_RESERVED" && in_array(current_token.text, ["var", "let", "const"]))) && flags.last_text !== ":"){if(current_token.type === "TK_RESERVED" && current_token.text === "if" && flags.last_text === "else"){output.space_before_token = true;}else {print_newline();}}}else if(current_token.type === "TK_RESERVED" && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ")"){print_newline();}}else if(flags.multiline_frame && is_array(flags.mode) && flags.last_text === "," && last_last_text === "}"){print_newline();}else if(prefix === "SPACE"){output.space_before_token = true;}print_token();flags.last_word = current_token.text;if(current_token.type === "TK_RESERVED"){if(current_token.text === "do"){flags.do_block = true;}else if(current_token.text === "if"){flags.if_block = true;}else if(current_token.text === "import"){flags.import_block = true;}else if(flags.import_block && current_token.type === "TK_RESERVED" && current_token.text === "from"){flags.import_block = false;}}}function handle_semicolon(){if(start_of_statement()){output.space_before_token = false;}else {handle_whitespace_and_comments(current_token);}var next_token=get_token(1);while(flags.mode === MODE.Statement && !(flags.if_block && next_token && next_token.type === "TK_RESERVED" && next_token.text === "else") && !flags.do_block) {restore_mode();}if(flags.import_block){flags.import_block = false;}print_token();}function handle_string(){if(start_of_statement()){output.space_before_token = true;}else {handle_whitespace_and_comments(current_token);if(last_type === "TK_RESERVED" || last_type === "TK_WORD" || flags.inline_frame){output.space_before_token = true;}else if(last_type === "TK_COMMA" || last_type === "TK_START_EXPR" || last_type === "TK_EQUALS" || last_type === "TK_OPERATOR"){if(!start_of_object_property()){allow_wrap_or_preserved_newline();}}else {print_newline();}}print_token();}function handle_equals(){if(start_of_statement()){}else {handle_whitespace_and_comments(current_token);}if(flags.declaration_statement){flags.declaration_assignment = true;}output.space_before_token = true;print_token();output.space_before_token = true;}function handle_comma(){handle_whitespace_and_comments(current_token, true);print_token();output.space_before_token = true;if(flags.declaration_statement){if(is_expression(flags.parent.mode)){flags.declaration_assignment = false;}if(flags.declaration_assignment){flags.declaration_assignment = false;print_newline(false, true);}else if(opt.comma_first){allow_wrap_or_preserved_newline();}}else if(flags.mode === MODE.ObjectLiteral || flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral){if(flags.mode === MODE.Statement){restore_mode();}if(!flags.inline_frame){print_newline();}}else if(opt.comma_first){allow_wrap_or_preserved_newline();}}function handle_operator(){var isGeneratorAsterisk=current_token.text === "*" && (last_type === "TK_RESERVED" && in_array(flags.last_text, ["function", "yield"]) || in_array(last_type, ["TK_START_BLOCK", "TK_COMMA", "TK_END_BLOCK", "TK_SEMICOLON"]));var isUnary=in_array(current_token.text, ["-", "+"]) && (in_array(last_type, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === ",");if(start_of_statement()){}else {var preserve_statement_flags=!isGeneratorAsterisk;handle_whitespace_and_comments(current_token, preserve_statement_flags);}if(last_type === "TK_RESERVED" && is_special_word(flags.last_text)){output.space_before_token = true;print_token();return;}if(current_token.text === "*" && last_type === "TK_DOT"){print_token();return;}if(current_token.text === "::"){print_token();return;}if(last_type === "TK_OPERATOR" && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)){allow_wrap_or_preserved_newline();}if(current_token.text === ":" && flags.in_case){flags.case_body = true;indent();print_token();print_newline();flags.in_case = false;return;}var space_before=true;var space_after=true;var in_ternary=false;if(current_token.text === ":"){if(flags.ternary_depth === 0){space_before = false;}else {flags.ternary_depth -= 1;in_ternary = true;}}else if(current_token.text === "?"){flags.ternary_depth += 1;}if(!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, Tokenizer.positionable_operators)){var isColon=current_token.text === ":";var isTernaryColon=isColon && in_ternary;var isOtherColon=isColon && !in_ternary;switch(opt.operator_position){case OPERATOR_POSITION.before_newline:output.space_before_token = !isOtherColon;print_token();if(!isColon || isTernaryColon){allow_wrap_or_preserved_newline();}output.space_before_token = true;return;case OPERATOR_POSITION.after_newline:output.space_before_token = true;if(!isColon || isTernaryColon){if(get_token(1).wanted_newline){print_newline(false, true);}else {allow_wrap_or_preserved_newline();}}else {output.space_before_token = false;}print_token();output.space_before_token = true;return;case OPERATOR_POSITION.preserve_newline:if(!isOtherColon){allow_wrap_or_preserved_newline();}space_before = !(output.just_added_newline() || isOtherColon);output.space_before_token = space_before;print_token();output.space_before_token = true;return;}}if(isGeneratorAsterisk){allow_wrap_or_preserved_newline();space_before = false;var next_token=get_token(1);space_after = next_token && in_array(next_token.type, ["TK_WORD", "TK_RESERVED"]);}else if(current_token.text === "..."){allow_wrap_or_preserved_newline();space_before = last_type === "TK_START_BLOCK";space_after = false;}else if(in_array(current_token.text, ["--", "++", "!", "~"]) || isUnary){space_before = false;space_after = false;if(current_token.wanted_newline && (current_token.text === "--" || current_token.text === "++")){print_newline(false, true);}if(flags.last_text === ";" && is_expression(flags.mode)){space_before = true;}if(last_type === "TK_RESERVED"){space_before = true;}else if(last_type === "TK_END_EXPR"){space_before = !(flags.last_text === "]" && (current_token.text === "--" || current_token.text === "++"));}else if(last_type === "TK_OPERATOR"){space_before = in_array(current_token.text, ["--", "-", "++", "+"]) && in_array(flags.last_text, ["--", "-", "++", "+"]);if(in_array(current_token.text, ["+", "-"]) && in_array(flags.last_text, ["--", "++"])){space_after = true;}}if((flags.mode === MODE.BlockStatement && !flags.inline_frame || flags.mode === MODE.Statement) && (flags.last_text === "{" || flags.last_text === ";")){print_newline();}}output.space_before_token = output.space_before_token || space_before;print_token();output.space_before_token = space_after;}function handle_block_comment(preserve_statement_flags){if(output.raw){output.add_raw_token(current_token);if(current_token.directives && current_token.directives.preserve === "end"){output.raw = opt.test_output_raw;}return;}if(current_token.directives){print_newline(false, preserve_statement_flags);print_token();if(current_token.directives.preserve === "start"){output.raw = true;}print_newline(false, true);return;}if(!acorn.newline.test(current_token.text) && !current_token.wanted_newline){output.space_before_token = true;print_token();output.space_before_token = true;return;}var lines=split_linebreaks(current_token.text);var j;var javadoc=false;var starless=false;var lastIndent=current_token.whitespace_before;var lastIndentLength=lastIndent.length;print_newline(false, preserve_statement_flags);if(lines.length > 1){javadoc = all_lines_start_with(lines.slice(1), "*");starless = each_line_matches_indent(lines.slice(1), lastIndent);}print_token(lines[0]);for(j = 1; j < lines.length; j++) {print_newline(false, true);if(javadoc){print_token(" " + ltrim(lines[j]));}else if(starless && lines[j].length > lastIndentLength){print_token(lines[j].substring(lastIndentLength));}else {output.add_token(lines[j]);}}print_newline(false, preserve_statement_flags);}function handle_comment(preserve_statement_flags){if(current_token.wanted_newline){print_newline(false, preserve_statement_flags);}else {output.trim(true);}output.space_before_token = true;print_token();print_newline(false, preserve_statement_flags);}function handle_dot(){if(start_of_statement()){}else {handle_whitespace_and_comments(current_token, true);}if(last_type === "TK_RESERVED" && is_special_word(flags.last_text)){output.space_before_token = true;}else {allow_wrap_or_preserved_newline(flags.last_text === ")" && opt.break_chained_methods);}print_token();}function handle_unknown(preserve_statement_flags){print_token();if(current_token.text[current_token.text.length - 1] === "\n"){print_newline(false, preserve_statement_flags);}}function handle_eof(){while(flags.mode === MODE.Statement) {restore_mode();}handle_whitespace_and_comments(current_token);}}function OutputLine(parent){var _character_count=0;var _indent_count=-1;var _items=[];var _empty=true;this.set_indent = function(level){_character_count = parent.baseIndentLength + level * parent.indent_length;_indent_count = level;};this.get_character_count = function(){return _character_count;};this.is_empty = function(){return _empty;};this.last = function(){if(!this._empty){return _items[_items.length - 1];}else {return null;}};this.push = function(input){_items.push(input);_character_count += input.length;_empty = false;};this.pop = function(){var item=null;if(!_empty){item = _items.pop();_character_count -= item.length;_empty = _items.length === 0;}return item;};this.remove_indent = function(){if(_indent_count > 0){_indent_count -= 1;_character_count -= parent.indent_length;}};this.trim = function(){while(this.last() === " ") {_items.pop();_character_count -= 1;}_empty = _items.length === 0;};this.toString = function(){var result="";if(!this._empty){if(_indent_count >= 0){result = parent.indent_cache[_indent_count];}result += _items.join("");}return result;};}function Output(indent_string, baseIndentString){baseIndentString = baseIndentString || "";this.indent_cache = [baseIndentString];this.baseIndentLength = baseIndentString.length;this.indent_length = indent_string.length;this.raw = false;var lines=[];this.baseIndentString = baseIndentString;this.indent_string = indent_string;this.previous_line = null;this.current_line = null;this.space_before_token = false;this.add_outputline = function(){this.previous_line = this.current_line;this.current_line = new OutputLine(this);lines.push(this.current_line);};this.add_outputline();this.get_line_number = function(){return lines.length;};this.add_new_line = function(force_newline){if(this.get_line_number() === 1 && this.just_added_newline()){return false;}if(force_newline || !this.just_added_newline()){if(!this.raw){this.add_outputline();}return true;}return false;};this.get_code = function(){var sweet_code=lines.join("\n").replace(/[\r\n\t ]+$/, "");return sweet_code;};this.set_indent = function(level){if(lines.length > 1){while(level >= this.indent_cache.length) {this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);}this.current_line.set_indent(level);return true;}this.current_line.set_indent(0);return false;};this.add_raw_token = function(token){for(var x=0; x < token.newlines; x++) {this.add_outputline();}this.current_line.push(token.whitespace_before);this.current_line.push(token.text);this.space_before_token = false;};this.add_token = function(printable_token){this.add_space_before_token();this.current_line.push(printable_token);};this.add_space_before_token = function(){if(this.space_before_token && !this.just_added_newline()){this.current_line.push(" ");}this.space_before_token = false;};this.remove_redundant_indentation = function(frame){if(frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional){return;}var index=frame.start_line_index;var output_length=lines.length;while(index < output_length) {lines[index].remove_indent();index++;}};this.trim = function(eat_newlines){eat_newlines = eat_newlines === undefined?false:eat_newlines;this.current_line.trim(indent_string, baseIndentString);while(eat_newlines && lines.length > 1 && this.current_line.is_empty()) {lines.pop();this.current_line = lines[lines.length - 1];this.current_line.trim();}this.previous_line = lines.length > 1?lines[lines.length - 2]:null;};this.just_added_newline = function(){return this.current_line.is_empty();};this.just_added_blankline = function(){if(this.just_added_newline()){if(lines.length === 1){return true;}var line=lines[lines.length - 2];return line.is_empty();}return false;};}var InputScanner=function InputScanner(input){var _input=input;var _input_length=_input.length;var _position=0;this.back = function(){_position -= 1;};this.hasNext = function(){return _position < _input_length;};this.next = function(){var val=null;if(this.hasNext()){val = _input.charAt(_position);_position += 1;}return val;};this.peek = function(index){var val=null;index = index || 0;index += _position;if(index >= 0 && index < _input_length){val = _input.charAt(index);}return val;};this.peekCharCode = function(index){var val=0;index = index || 0;index += _position;if(index >= 0 && index < _input_length){val = _input.charCodeAt(index);}return val;};this.test = function(pattern, index){index = index || 0;pattern.lastIndex = _position + index;return pattern.test(_input);};this.testChar = function(pattern, index){var val=this.peek(index);return val !== null && pattern.test(val);};this.match = function(pattern){pattern.lastIndex = _position;var pattern_match=pattern.exec(_input);if(pattern_match && pattern_match.index === _position){_position += pattern_match[0].length;}else {pattern_match = null;}return pattern_match;};};var Token=function Token(type, text, newlines, whitespace_before, parent){this.type = type;this.text = text;this.comments_before = [];this.comments_after = [];this.newlines = newlines || 0;this.wanted_newline = newlines > 0;this.whitespace_before = whitespace_before || "";this.parent = parent || null;this.opened = null;this.directives = null;};function tokenizer(input_string, opts){var whitespace="\n\r\t ".split("");var digit=/[0-9]/;var digit_bin=/[01]/;var digit_oct=/[01234567]/;var digit_hex=/[0123456789abcdefABCDEF]/;this.positionable_operators = "!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||".split(" ");var punct=this.positionable_operators.concat("! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...".split(" "));this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var reserved_words=this.line_starters.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as"]);var block_comment_pattern=/([\s\S]*?)((?:\*\/)|$)/g;var comment_pattern=/([^\n\r\u2028\u2029]*)/g;var directives_block_pattern=/\/\* beautify( \w+[:]\w+)+ \*\//g;var directive_pattern=/ (\w+)[:](\w+)/g;var directives_end_ignore_pattern=/([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;var template_pattern=/((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;var n_newlines, whitespace_before_token, in_html_comment, tokens;var input;this.tokenize = function(){input = new InputScanner(input_string);in_html_comment = false;tokens = [];var next, last;var token_values;var open=null;var open_stack=[];var comments=[];while(!(last && last.type === "TK_EOF")) {token_values = tokenize_next();next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);while(next.type === "TK_COMMENT" || next.type === "TK_BLOCK_COMMENT" || next.type === "TK_UNKNOWN") {if(next.type === "TK_BLOCK_COMMENT"){next.directives = token_values[2];}comments.push(next);token_values = tokenize_next();next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);}if(comments.length){next.comments_before = comments;comments = [];}if(next.type === "TK_START_BLOCK" || next.type === "TK_START_EXPR"){next.parent = last;open_stack.push(open);open = next;}else if((next.type === "TK_END_BLOCK" || next.type === "TK_END_EXPR") && (open && (next.text === "]" && open.text === "[" || next.text === ")" && open.text === "(" || next.text === "}" && open.text === "{"))){next.parent = open.parent;next.opened = open;open = open_stack.pop();}tokens.push(next);last = next;}return tokens;};function get_directives(text){if(!text.match(directives_block_pattern)){return null;}var directives={};directive_pattern.lastIndex = 0;var directive_match=directive_pattern.exec(text);while(directive_match) {directives[directive_match[1]] = directive_match[2];directive_match = directive_pattern.exec(text);}return directives;}function tokenize_next(){var resulting_string;var whitespace_on_this_line=[];n_newlines = 0;whitespace_before_token = "";var c=input.next();if(c === null){return ["", "TK_EOF"];}var last_token;if(tokens.length){last_token = tokens[tokens.length - 1];}else {last_token = new Token("TK_START_BLOCK", "{");}while(in_array(c, whitespace)) {if(acorn.newline.test(c)){if(!(c === "\n" && input.peek(-2) === "\r")){n_newlines += 1;whitespace_on_this_line = [];}}else {whitespace_on_this_line.push(c);}c = input.next();if(c === null){return ["", "TK_EOF"];}}if(whitespace_on_this_line.length){whitespace_before_token = whitespace_on_this_line.join("");}if(digit.test(c) || c === "." && input.testChar(digit)){var allow_decimal=true;var allow_e=true;var local_digit=digit;if(c === "0" && input.testChar(/[XxOoBb]/)){allow_decimal = false;allow_e = false;if(input.testChar(/[Bb]/)){local_digit = digit_bin;}else if(input.testChar(/[Oo]/)){local_digit = digit_oct;}else {local_digit = digit_hex;}c += input.next();}else if(c === "."){allow_decimal = false;}else {c = "";input.back();}while(input.testChar(local_digit)) {c += input.next();if(allow_decimal && input.peek() === "."){c += input.next();allow_decimal = false;}if(allow_e && input.testChar(/[Ee]/)){c += input.next();if(input.testChar(/[+-]/)){c += input.next();}allow_e = false;allow_decimal = false;}}return [c, "TK_WORD"];}if(acorn.isIdentifierStart(input.peekCharCode(-1))){if(input.hasNext()){while(acorn.isIdentifierChar(input.peekCharCode())) {c += input.next();if(!input.hasNext()){break;}}}if(!(last_token.type === "TK_DOT" || last_token.type === "TK_RESERVED" && in_array(last_token.text, ["set", "get"])) && in_array(c, reserved_words)){if(c === "in" || c === "of"){return [c, "TK_OPERATOR"];}return [c, "TK_RESERVED"];}return [c, "TK_WORD"];}if(c === "(" || c === "["){return [c, "TK_START_EXPR"];}if(c === ")" || c === "]"){return [c, "TK_END_EXPR"];}if(c === "{"){return [c, "TK_START_BLOCK"];}if(c === "}"){return [c, "TK_END_BLOCK"];}if(c === ";"){return [c, "TK_SEMICOLON"];}if(c === "/"){var comment="";var comment_match;if(input.peek() === "*"){input.next();comment_match = input.match(block_comment_pattern);comment = "/*" + comment_match[0];var directives=get_directives(comment);if(directives && directives.ignore === "start"){comment_match = input.match(directives_end_ignore_pattern);comment += comment_match[0];}comment = comment.replace(acorn.allLineBreaks, "\n");return [comment, "TK_BLOCK_COMMENT", directives];}if(input.peek() === "/"){input.next();comment_match = input.match(comment_pattern);comment = "//" + comment_match[0];return [comment, "TK_COMMENT"];}}var startXmlRegExp=/<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;if(c === "`" || c === "'" || c === "\"" || (c === "/" || opts.e4x && c === "<" && input.test(startXmlRegExp, -1)) && (last_token.type === "TK_RESERVED" && in_array(last_token.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || last_token.type === "TK_END_EXPR" && last_token.text === ")" && last_token.parent && last_token.parent.type === "TK_RESERVED" && in_array(last_token.parent.text, ["if", "while", "for"]) || in_array(last_token.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))){var sep=c, esc=false, has_char_escapes=false;resulting_string = c;if(sep === "/"){var in_char_class=false;while(input.hasNext() && ((esc || in_char_class || input.peek() !== sep) && !input.testChar(acorn.newline))) {resulting_string += input.peek();if(!esc){esc = input.peek() === "\\";if(input.peek() === "["){in_char_class = true;}else if(input.peek() === "]"){in_char_class = false;}}else {esc = false;}input.next();}}else if(opts.e4x && sep === "<"){var xmlRegExp=/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;input.back();var xmlStr="";var match=input.match(startXmlRegExp);if(match){var rootTag=match[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}");var isCurlyRoot=rootTag.indexOf("{") === 0;var depth=0;while(match) {var isEndTag=!!match[1];var tagName=match[2];var isSingletonTag=!!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";if(!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, "{").replace(/\s+}$/, "}"))){if(isEndTag){--depth;}else {++depth;}}xmlStr += match[0];if(depth <= 0){break;}match = input.match(xmlRegExp);}if(!match){xmlStr += input.match(/[\s\S]*/g)[0];}xmlStr = xmlStr.replace(acorn.allLineBreaks, "\n");return [xmlStr, "TK_STRING"];}}else {var parse_string=(function(_parse_string){var _parse_stringWrapper=function parse_string(_x, _x2, _x3){return _parse_string.apply(this, arguments);};_parse_stringWrapper.toString = function(){return _parse_string.toString();};return _parse_stringWrapper;})(function(delimiter, allow_unescaped_newlines, start_sub){var current_char;while(input.hasNext()) {current_char = input.peek();if(!(esc || current_char !== delimiter && (allow_unescaped_newlines || !acorn.newline.test(current_char)))){break;}if((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)){if(current_char === "\r" && input.peek(1) === "\n"){input.next();current_char = input.peek();}resulting_string += "\n";}else {resulting_string += current_char;}if(esc){if(current_char === "x" || current_char === "u"){has_char_escapes = true;}esc = false;}else {esc = current_char === "\\";}input.next();if(start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1){if(delimiter === "`"){parse_string("}", allow_unescaped_newlines, "`");}else {parse_string("`", allow_unescaped_newlines, "${");}if(input.hasNext()){resulting_string += input.next();}}}});if(sep === "`"){parse_string("`", true, "${");}else {parse_string(sep);}}if(has_char_escapes && opts.unescape_strings){resulting_string = unescape_string(resulting_string);}if(input.peek() === sep){resulting_string += sep;input.next();if(sep === "/"){while(input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {resulting_string += input.next();}}}return [resulting_string, "TK_STRING"];}if(c === "#"){if(tokens.length === 0 && input.peek() === "!"){resulting_string = c;while(input.hasNext() && c !== "\n") {c = input.next();resulting_string += c;}return [trim(resulting_string) + "\n", "TK_UNKNOWN"];}var sharp="#";if(input.hasNext() && input.testChar(digit)){do{c = input.next();sharp += c;}while(input.hasNext() && c !== "#" && c !== "=");if(c === "#"){}else if(input.peek() === "[" && input.peek(1) === "]"){sharp += "[]";input.next();input.next();}else if(input.peek() === "{" && input.peek(1) === "}"){sharp += "{}";input.next();input.next();}return [sharp, "TK_WORD"];}}if(c === "<" && (input.peek() === "?" || input.peek() === "%")){input.back();var template_match=input.match(template_pattern);if(template_match){c = template_match[0];c = c.replace(acorn.allLineBreaks, "\n");return [c, "TK_STRING"];}}if(c === "<" && input.match(/\!--/g)){c = "<!--";while(input.hasNext() && !input.testChar(acorn.newline)) {c += input.next();}in_html_comment = true;return [c, "TK_COMMENT"];}if(c === "-" && in_html_comment && input.match(/->/g)){in_html_comment = false;return ["-->", "TK_COMMENT"];}if(c === "."){if(input.peek() === "." && input.peek(1) === "."){c += input.next() + input.next();return [c, "TK_OPERATOR"];}return [c, "TK_DOT"];}if(in_array(c, punct)){while(input.hasNext() && in_array(c + input.peek(), punct)) {c += input.next();if(!input.hasNext()){break;}}if(c === ","){return [c, "TK_COMMA"];}else if(c === "="){return [c, "TK_EQUALS"];}else {return [c, "TK_OPERATOR"];}}return [c, "TK_UNKNOWN"];}function unescape_string(s){var out="", escaped=0;var input_scan=new InputScanner(s);var matched=null;while(input_scan.hasNext()) {matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);if(matched){out += matched[0];}if(input_scan.peek() === "\\"){input_scan.next();if(input_scan.peek() === "x"){matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);}else if(input_scan.peek() === "u"){matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);}else {out += "\\";if(input_scan.hasNext()){out += input_scan.next();}continue;}if(!matched){return s;}escaped = parseInt(matched[1], 16);if(escaped > 126 && escaped <= 255 && matched[0].indexOf("x") === 0){return s;}else if(escaped >= 0 && escaped < 32){out += "\\" + matched[0];continue;}else if(escaped === 34 || escaped === 39 || escaped === 92){out += "\\" + String.fromCharCode(escaped);}else {out += String.fromCharCode(escaped);}}}return out;}}var beautifier=new Beautifier(js_source_text, options);return beautifier.beautify();}if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return {js_beautify:js_beautify};}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports !== "undefined"){exports.js_beautify = js_beautify;}else if(typeof window !== "undefined"){window.js_beautify = js_beautify;}else if(typeof global !== "undefined"){global.js_beautify = js_beautify;}})();

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 CSS Beautifier
	---------------

	    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

	    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	        http://jsbeautifier.org/

	    Usage:
	        css_beautify(source_text);
	        css_beautify(source_text, options);

	    The options are (default in brackets):
	        indent_size (4)                         — indentation size,
	        indent_char (space)                     — character to indent with,
	        selector_separator_newline (true)       - separate selectors with newline or
	                                                  not (e.g. "a,\nbr" or "a, br")
	        end_with_newline (false)                - end with a newline
	        newline_between_rules (true)            - add a new line after every css rule
	        space_around_selector_separator (false) - ensure space around selector separators:
	                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
	    e.g

	    css_beautify(css_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t',
	      'selector_separator': ' ',
	      'end_with_newline': false,
	      'newline_between_rules': true,
	      'space_around_selector_separator': true
	    });
	*/

	// http://www.w3.org/TR/CSS21/syndata.html#tokenization
	// http://www.w3.org/TR/css3-syntax/

	"use strict";

	(function () {

	    function mergeOpts(allOptions, targetType) {
	        var finalOpts = {};
	        var name;

	        for (name in allOptions) {
	            if (name !== targetType) {
	                finalOpts[name] = allOptions[name];
	            }
	        }

	        //merge in the per type settings for the targetType
	        if (targetType in allOptions) {
	            for (name in allOptions[targetType]) {
	                finalOpts[name] = allOptions[targetType][name];
	            }
	        }
	        return finalOpts;
	    }

	    var lineBreak = /\r\n|[\n\r\u2028\u2029]/;
	    var allLineBreaks = new RegExp(lineBreak.source, "g");

	    function css_beautify(source_text, options) {
	        options = options || {};

	        // Allow the setting of language/file-type specific options
	        // with inheritance of overall settings
	        options = mergeOpts(options, "css");

	        source_text = source_text || "";

	        var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
	        var indentCharacter = options.indent_char || " ";
	        var selectorSeparatorNewline = options.selector_separator_newline === undefined ? true : options.selector_separator_newline;
	        var end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
	        var newline_between_rules = options.newline_between_rules === undefined ? true : options.newline_between_rules;
	        var space_around_combinator = options.space_around_combinator === undefined ? false : options.space_around_combinator;
	        space_around_combinator = space_around_combinator || (options.space_around_selector_separator === undefined ? false : options.space_around_selector_separator);
	        var eol = options.eol ? options.eol : "auto";

	        if (options.indent_with_tabs) {
	            indentCharacter = "\t";
	            indentSize = 1;
	        }

	        if (eol === "auto") {
	            eol = "\n";
	            if (source_text && lineBreak.test(source_text || "")) {
	                eol = source_text.match(lineBreak)[0];
	            }
	        }

	        eol = eol.replace(/\\r/, "\r").replace(/\\n/, "\n");

	        // HACK: newline parsing inconsistent. This brute force normalizes the input.
	        source_text = source_text.replace(allLineBreaks, "\n");

	        // tokenizer
	        var whiteRe = /^\s+$/;

	        var pos = -1,
	            ch;
	        var parenLevel = 0;

	        function next() {
	            ch = source_text.charAt(++pos);
	            return ch || "";
	        }

	        function peek(skipWhitespace) {
	            var result = "";
	            var prev_pos = pos;
	            if (skipWhitespace) {
	                eatWhitespace();
	            }
	            result = source_text.charAt(pos + 1) || "";
	            pos = prev_pos - 1;
	            next();
	            return result;
	        }

	        function eatString(endChars) {
	            var start = pos;
	            while (next()) {
	                if (ch === "\\") {
	                    next();
	                } else if (endChars.indexOf(ch) !== -1) {
	                    break;
	                } else if (ch === "\n") {
	                    break;
	                }
	            }
	            return source_text.substring(start, pos + 1);
	        }

	        function peekString(endChar) {
	            var prev_pos = pos;
	            var str = eatString(endChar);
	            pos = prev_pos - 1;
	            next();
	            return str;
	        }

	        function eatWhitespace() {
	            var result = "";
	            while (whiteRe.test(peek())) {
	                next();
	                result += ch;
	            }
	            return result;
	        }

	        function skipWhitespace() {
	            var result = "";
	            if (ch && whiteRe.test(ch)) {
	                result = ch;
	            }
	            while (whiteRe.test(next())) {
	                result += ch;
	            }
	            return result;
	        }

	        function eatComment(singleLine) {
	            var start = pos;
	            singleLine = peek() === "/";
	            next();
	            while (next()) {
	                if (!singleLine && ch === "*" && peek() === "/") {
	                    next();
	                    break;
	                } else if (singleLine && ch === "\n") {
	                    return source_text.substring(start, pos);
	                }
	            }

	            return source_text.substring(start, pos) + ch;
	        }

	        function lookBack(str) {
	            return source_text.substring(pos - str.length, pos).toLowerCase() === str;
	        }

	        // Nested pseudo-class if we are insideRule
	        // and the next special character found opens
	        // a new block
	        function foundNestedPseudoClass() {
	            var openParen = 0;
	            for (var i = pos + 1; i < source_text.length; i++) {
	                var ch = source_text.charAt(i);
	                if (ch === "{") {
	                    return true;
	                } else if (ch === "(") {
	                    // pseudoclasses can contain ()
	                    openParen += 1;
	                } else if (ch === ")") {
	                    if (openParen === 0) {
	                        return false;
	                    }
	                    openParen -= 1;
	                } else if (ch === ";" || ch === "}") {
	                    return false;
	                }
	            }
	            return false;
	        }

	        // printer
	        var basebaseIndentString = source_text.match(/^[\t ]*/)[0];
	        var singleIndent = new Array(indentSize + 1).join(indentCharacter);
	        var indentLevel = 0;
	        var nestedLevel = 0;

	        function indent() {
	            indentLevel++;
	            basebaseIndentString += singleIndent;
	        }

	        function outdent() {
	            indentLevel--;
	            basebaseIndentString = basebaseIndentString.slice(0, -indentSize);
	        }

	        var print = {};
	        print["{"] = function (ch) {
	            print.singleSpace();
	            output.push(ch);
	            print.newLine();
	        };
	        print["}"] = function (ch) {
	            print.newLine();
	            output.push(ch);
	            print.newLine();
	        };

	        print._lastCharWhitespace = function () {
	            return whiteRe.test(output[output.length - 1]);
	        };

	        print.newLine = function (keepWhitespace) {
	            if (output.length) {
	                if (!keepWhitespace && output[output.length - 1] !== "\n") {
	                    print.trim();
	                }

	                output.push("\n");

	                if (basebaseIndentString) {
	                    output.push(basebaseIndentString);
	                }
	            }
	        };
	        print.singleSpace = function () {
	            if (output.length && !print._lastCharWhitespace()) {
	                output.push(" ");
	            }
	        };

	        print.preserveSingleSpace = function () {
	            if (isAfterSpace) {
	                print.singleSpace();
	            }
	        };

	        print.trim = function () {
	            while (print._lastCharWhitespace()) {
	                output.pop();
	            }
	        };

	        var output = [];
	        /*_____________________--------------------_____________________*/

	        var insideRule = false;
	        var insidePropertyValue = false;
	        var enteringConditionalGroup = false;
	        var top_ch = "";
	        var last_top_ch = "";

	        while (true) {
	            var whitespace = skipWhitespace();
	            var isAfterSpace = whitespace !== "";
	            var isAfterNewline = whitespace.indexOf("\n") !== -1;
	            last_top_ch = top_ch;
	            top_ch = ch;

	            if (!ch) {
	                break;
	            } else if (ch === "/" && peek() === "*") {
	                /* css comment */
	                var header = indentLevel === 0;

	                if (isAfterNewline || header) {
	                    print.newLine();
	                }

	                output.push(eatComment());
	                print.newLine();
	                if (header) {
	                    print.newLine(true);
	                }
	            } else if (ch === "/" && peek() === "/") {
	                // single line comment
	                if (!isAfterNewline && last_top_ch !== "{") {
	                    print.trim();
	                }
	                print.singleSpace();
	                output.push(eatComment());
	                print.newLine();
	            } else if (ch === "@") {
	                print.preserveSingleSpace();

	                // deal with less propery mixins @{...}
	                if (peek() === "{") {
	                    output.push(eatString("}"));
	                } else {
	                    output.push(ch);

	                    // strip trailing space, if present, for hash property checks
	                    var variableOrRule = peekString(": ,;{}()[]/='\"");

	                    if (variableOrRule.match(/[ :]$/)) {
	                        // we have a variable or pseudo-class, add it and insert one space before continuing
	                        next();
	                        variableOrRule = eatString(": ").replace(/\s$/, "");
	                        output.push(variableOrRule);
	                        print.singleSpace();
	                    }

	                    variableOrRule = variableOrRule.replace(/\s$/, "");

	                    // might be a nesting at-rule
	                    if (variableOrRule in css_beautify.NESTED_AT_RULE) {
	                        nestedLevel += 1;
	                        if (variableOrRule in css_beautify.CONDITIONAL_GROUP_RULE) {
	                            enteringConditionalGroup = true;
	                        }
	                    }
	                }
	            } else if (ch === "#" && peek() === "{") {
	                print.preserveSingleSpace();
	                output.push(eatString("}"));
	            } else if (ch === "{") {
	                if (peek(true) === "}") {
	                    eatWhitespace();
	                    next();
	                    print.singleSpace();
	                    output.push("{}");
	                    print.newLine();
	                    if (newline_between_rules && indentLevel === 0) {
	                        print.newLine(true);
	                    }
	                } else {
	                    indent();
	                    print["{"](ch);
	                    // when entering conditional groups, only rulesets are allowed
	                    if (enteringConditionalGroup) {
	                        enteringConditionalGroup = false;
	                        insideRule = indentLevel > nestedLevel;
	                    } else {
	                        // otherwise, declarations are also allowed
	                        insideRule = indentLevel >= nestedLevel;
	                    }
	                }
	            } else if (ch === "}") {
	                outdent();
	                print["}"](ch);
	                insideRule = false;
	                insidePropertyValue = false;
	                if (nestedLevel) {
	                    nestedLevel--;
	                }
	                if (newline_between_rules && indentLevel === 0) {
	                    print.newLine(true);
	                }
	            } else if (ch === ":") {
	                eatWhitespace();
	                if ((insideRule || enteringConditionalGroup) && !(lookBack("&") || foundNestedPseudoClass()) && !lookBack("(")) {
	                    // 'property: value' delimiter
	                    // which could be in a conditional group query
	                    output.push(":");
	                    if (!insidePropertyValue) {
	                        insidePropertyValue = true;
	                        print.singleSpace();
	                    }
	                } else {
	                    // sass/less parent reference don't use a space
	                    // sass nested pseudo-class don't use a space

	                    // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
	                    if (lookBack(" ") && output[output.length - 1] !== " ") {
	                        output.push(" ");
	                    }
	                    if (peek() === ":") {
	                        // pseudo-element
	                        next();
	                        output.push("::");
	                    } else {
	                        // pseudo-class
	                        output.push(":");
	                    }
	                }
	            } else if (ch === "\"" || ch === "'") {
	                print.preserveSingleSpace();
	                output.push(eatString(ch));
	            } else if (ch === ";") {
	                insidePropertyValue = false;
	                output.push(ch);
	                print.newLine();
	            } else if (ch === "(") {
	                // may be a url
	                if (lookBack("url")) {
	                    output.push(ch);
	                    eatWhitespace();
	                    if (next()) {
	                        if (ch !== ")" && ch !== "\"" && ch !== "'") {
	                            output.push(eatString(")"));
	                        } else {
	                            pos--;
	                        }
	                    }
	                } else {
	                    parenLevel++;
	                    print.preserveSingleSpace();
	                    output.push(ch);
	                    eatWhitespace();
	                }
	            } else if (ch === ")") {
	                output.push(ch);
	                parenLevel--;
	            } else if (ch === ",") {
	                output.push(ch);
	                eatWhitespace();
	                if (selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
	                    print.newLine();
	                } else {
	                    print.singleSpace();
	                }
	            } else if ((ch === ">" || ch === "+" || ch === "~") && !insidePropertyValue && parenLevel < 1) {
	                //handle combinator spacing
	                if (space_around_combinator) {
	                    print.singleSpace();
	                    output.push(ch);
	                    print.singleSpace();
	                } else {
	                    output.push(ch);
	                    eatWhitespace();
	                    // squash extra whitespace
	                    if (ch && whiteRe.test(ch)) {
	                        ch = "";
	                    }
	                }
	            } else if (ch === "]") {
	                output.push(ch);
	            } else if (ch === "[") {
	                print.preserveSingleSpace();
	                output.push(ch);
	            } else if (ch === "=") {
	                // no whitespace before or after
	                eatWhitespace();
	                ch = "=";
	                output.push(ch);
	            } else {
	                print.preserveSingleSpace();
	                output.push(ch);
	            }
	        }

	        var sweetCode = "";
	        if (basebaseIndentString) {
	            sweetCode += basebaseIndentString;
	        }

	        sweetCode += output.join("").replace(/[\r\n\t ]+$/, "");

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweetCode += "\n";
	        }

	        if (eol !== "\n") {
	            sweetCode = sweetCode.replace(/[\n]/g, eol);
	        }

	        return sweetCode;
	    }

	    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
	    css_beautify.NESTED_AT_RULE = {
	        "@page": true,
	        "@font-face": true,
	        "@keyframes": true,
	        // also in CONDITIONAL_GROUP_RULE below
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };
	    css_beautify.CONDITIONAL_GROUP_RULE = {
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };

	    /*global define */
	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return {
	                css_beautify: css_beautify
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        exports.css_beautify = css_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.css_beautify = css_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.css_beautify = css_beautify;
	    }
	})();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 Style HTML
	---------------

	  Written by Nochum Sossonko, (nsossonko@hotmail.com)

	  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	    http://jsbeautifier.org/

	  Usage:
	    style_html(html_source);

	    style_html(html_source, options);

	  The options are:
	    indent_inner_html (default false)  — indent <head> and <body> sections,
	    indent_size (default 4)          — indentation size,
	    indent_char (default space)      — character to indent with,
	    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
	    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
	    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
	    content_unformatted (defaults to pre tag) - list of tags, that its content shouldn't be reformatted
	    indent_scripts (default normal)  - "keep"|"separate"|"normal"
	    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
	                                        Only works before elements, not inside tags or for text.
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
	    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
	    end_with_newline (false)          - end with a newline
	    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

	    e.g.

	    style_html(html_source, {
	      'indent_inner_html': false,
	      'indent_size': 2,
	      'indent_char': ' ',
	      'wrap_line_length': 78,
	      'brace_style': 'expand',
	      'preserve_newlines': true,
	      'max_preserve_newlines': 5,
	      'indent_handlebars': false,
	      'extra_liners': ['/html']
	    });
	*/

	"use strict";

	(function () {

	    // function trim(s) {
	    //     return s.replace(/^\s+|\s+$/g, '');
	    // }

	    function ltrim(s) {
	        return s.replace(/^\s+/g, "");
	    }

	    function rtrim(s) {
	        return s.replace(/\s+$/g, "");
	    }

	    function mergeOpts(allOptions, targetType) {
	        var finalOpts = {};
	        var name;

	        for (name in allOptions) {
	            if (name !== targetType) {
	                finalOpts[name] = allOptions[name];
	            }
	        }

	        //merge in the per type settings for the targetType
	        if (targetType in allOptions) {
	            for (name in allOptions[targetType]) {
	                finalOpts[name] = allOptions[targetType][name];
	            }
	        }
	        return finalOpts;
	    }

	    var lineBreak = /\r\n|[\n\r\u2028\u2029]/;
	    var allLineBreaks = new RegExp(lineBreak.source, "g");

	    function style_html(html_source, options, js_beautify, css_beautify) {
	        //Wrapper function to invoke all the necessary constructors and deal with the output.

	        var multi_parser, indent_inner_html, indent_body_inner_html, indent_head_inner_html, indent_size, indent_character, wrap_line_length, brace_style, unformatted, content_unformatted, preserve_newlines, max_preserve_newlines, indent_handlebars, wrap_attributes, wrap_attributes_indent_size, is_wrap_attributes_force, is_wrap_attributes_force_expand_multiline, is_wrap_attributes_force_aligned, end_with_newline, extra_liners, eol;

	        options = options || {};

	        // Allow the setting of language/file-type specific options
	        // with inheritance of overall settings
	        options = mergeOpts(options, "html");

	        // backwards compatibility to 1.3.4
	        if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) && (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
	            options.wrap_line_length = options.max_char;
	        }

	        indent_inner_html = options.indent_inner_html === undefined ? false : options.indent_inner_html;
	        indent_body_inner_html = options.indent_body_inner_html === undefined ? true : options.indent_body_inner_html;
	        indent_head_inner_html = options.indent_head_inner_html === undefined ? true : options.indent_head_inner_html;
	        indent_size = options.indent_size === undefined ? 4 : parseInt(options.indent_size, 10);
	        indent_character = options.indent_char === undefined ? " " : options.indent_char;
	        brace_style = options.brace_style === undefined ? "collapse" : options.brace_style;
	        wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
	        unformatted = options.unformatted || [
	        // https://www.w3.org/TR/html5/dom.html#phrasing-content
	        "a", "abbr", "area", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "s", "samp", /* 'script', */"select", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "var", "video", "wbr", "text",
	        // prexisting - not sure of full effect of removing, leaving in
	        "acronym", "address", "big", "dt", "ins", "strike", "tt"];
	        content_unformatted = options.content_unformatted || ["pre"];
	        preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
	        max_preserve_newlines = preserve_newlines ? isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10) : 0;
	        indent_handlebars = options.indent_handlebars === undefined ? false : options.indent_handlebars;
	        wrap_attributes = options.wrap_attributes === undefined ? "auto" : options.wrap_attributes;
	        wrap_attributes_indent_size = isNaN(parseInt(options.wrap_attributes_indent_size, 10)) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
	        is_wrap_attributes_force = wrap_attributes.substr(0, "force".length) === "force";
	        is_wrap_attributes_force_expand_multiline = wrap_attributes === "force-expand-multiline";
	        is_wrap_attributes_force_aligned = wrap_attributes === "force-aligned";
	        end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
	        extra_liners = typeof options.extra_liners === "object" && options.extra_liners ? options.extra_liners.concat() : typeof options.extra_liners === "string" ? options.extra_liners.split(",") : "head,body,/html".split(",");
	        eol = options.eol ? options.eol : "auto";

	        if (options.indent_with_tabs) {
	            indent_character = "\t";
	            indent_size = 1;
	        }

	        if (eol === "auto") {
	            eol = "\n";
	            if (html_source && lineBreak.test(html_source || "")) {
	                eol = html_source.match(lineBreak)[0];
	            }
	        }

	        eol = eol.replace(/\\r/, "\r").replace(/\\n/, "\n");

	        // HACK: newline parsing inconsistent. This brute force normalizes the input.
	        html_source = html_source.replace(allLineBreaks, "\n");

	        function Parser() {

	            this.pos = 0; //Parser position
	            this.token = "";
	            this.current_mode = "CONTENT"; //reflects the current Parser mode: TAG/CONTENT
	            this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
	                parent: "parent1",
	                parentcount: 1,
	                parent1: ""
	            };
	            this.tag_type = "";
	            this.token_text = this.last_token = this.last_text = this.token_type = "";
	            this.newlines = 0;
	            this.indent_content = indent_inner_html;
	            this.indent_body_inner_html = indent_body_inner_html;
	            this.indent_head_inner_html = indent_head_inner_html;

	            this.Utils = { //Uilities made available to the various functions
	                whitespace: "\n\r\t ".split(""),

	                single_token: [
	                // HTLM void elements - aka self-closing tags - aka singletons
	                // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	                "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr",
	                // NOTE: Optional tags - are not understood.
	                // https://www.w3.org/TR/html5/syntax.html#optional-tags
	                // The rules for optional tags are too complex for a simple list
	                // Also, the content of these tags should still be indented in many cases.
	                // 'li' is a good exmple.

	                // Doctype and xml elements
	                "!doctype", "?xml",
	                // ?php tag
	                "?php",
	                // other tags that were in this list, keeping just in case
	                "basefont", "isindex"],
	                extra_liners: extra_liners, //for tags that need a line of whitespace before them
	                in_array: function in_array(what, arr) {
	                    for (var i = 0; i < arr.length; i++) {
	                        if (what === arr[i]) {
	                            return true;
	                        }
	                    }
	                    return false;
	                }
	            };

	            // Return true if the given text is composed entirely of whitespace.
	            this.is_whitespace = function (text) {
	                for (var n = 0; n < text.length; n++) {
	                    if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
	                        return false;
	                    }
	                }
	                return true;
	            };

	            this.traverse_whitespace = function () {
	                var input_char = "";

	                input_char = this.input.charAt(this.pos);
	                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                    this.newlines = 0;
	                    while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (preserve_newlines && input_char === "\n" && this.newlines <= max_preserve_newlines) {
	                            this.newlines += 1;
	                        }

	                        this.pos++;
	                        input_char = this.input.charAt(this.pos);
	                    }
	                    return true;
	                }
	                return false;
	            };

	            // Append a space to the given content (string array) or, if we are
	            // at the wrap_line_length, append a newline/indentation.
	            // return true if a newline was added, false if a space was added
	            this.space_or_wrap = function (content) {
	                if (this.line_char_count >= this.wrap_line_length) {
	                    //insert a line when the wrap_line_length is reached
	                    this.print_newline(false, content);
	                    this.print_indentation(content);
	                    return true;
	                } else {
	                    this.line_char_count++;
	                    content.push(" ");
	                    return false;
	                }
	            };

	            this.get_content = function () {
	                //function to capture regular content between tags
	                var input_char = "",
	                    content = [],
	                    handlebarsStarted = 0;

	                while (this.input.charAt(this.pos) !== "<" || handlebarsStarted === 2) {
	                    if (this.pos >= this.input.length) {
	                        return content.length ? content.join("") : ["", "TK_EOF"];
	                    }

	                    if (handlebarsStarted < 2 && this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                        continue;
	                    }

	                    input_char = this.input.charAt(this.pos);

	                    if (indent_handlebars) {
	                        if (input_char === "{") {
	                            handlebarsStarted += 1;
	                        } else if (handlebarsStarted < 2) {
	                            handlebarsStarted = 0;
	                        }

	                        if (input_char === "}" && handlebarsStarted > 0) {
	                            if (handlebarsStarted-- === 0) {
	                                break;
	                            }
	                        }
	                        // Handlebars parsing is complicated.
	                        // {{#foo}} and {{/foo}} are formatted tags.
	                        // {{something}} should get treated as content, except:
	                        // {{else}} specifically behaves like {{#if}} and {{/if}}
	                        var peek3 = this.input.substr(this.pos, 3);
	                        if (peek3 === "{{#" || peek3 === "{{/") {
	                            // These are tags and not content.
	                            break;
	                        } else if (peek3 === "{{!") {
	                            return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"];
	                        } else if (this.input.substr(this.pos, 2) === "{{") {
	                            if (this.get_tag(true) === "{{else}}") {
	                                break;
	                            }
	                        }
	                    }

	                    this.pos++;
	                    this.line_char_count++;
	                    content.push(input_char); //letter at-a-time (or string) inserted to an array
	                }
	                return content.length ? content.join("") : "";
	            };

	            this.get_contents_to = function (name) {
	                //get the full content of a script or style to pass to js_beautify
	                if (this.pos === this.input.length) {
	                    return ["", "TK_EOF"];
	                }
	                var content = "";
	                var reg_match = new RegExp("</" + name + "\\s*>", "igm");
	                reg_match.lastIndex = this.pos;
	                var reg_array = reg_match.exec(this.input);
	                var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
	                if (this.pos < end_script) {
	                    //get everything in between the script tags
	                    content = this.input.substring(this.pos, end_script);
	                    this.pos = end_script;
	                }
	                return content;
	            };

	            this.record_tag = function (tag) {
	                //function to record a tag and its parent in this.tags Object
	                if (this.tags[tag + "count"]) {
	                    //check for the existence of this tag type
	                    this.tags[tag + "count"]++;
	                    this.tags[tag + this.tags[tag + "count"]] = this.indent_level; //and record the present indent level
	                } else {
	                    //otherwise initialize this tag type
	                    this.tags[tag + "count"] = 1;
	                    this.tags[tag + this.tags[tag + "count"]] = this.indent_level; //and record the present indent level
	                }
	                this.tags[tag + this.tags[tag + "count"] + "parent"] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
	                this.tags.parent = tag + this.tags[tag + "count"]; //and make this the current parent (i.e. in the case of a div 'div1')
	            };

	            this.retrieve_tag = function (tag) {
	                //function to retrieve the opening tag to the corresponding closer
	                if (this.tags[tag + "count"]) {
	                    //if the openener is not in the Object we ignore it
	                    var temp_parent = this.tags.parent; //check to see if it's a closable tag.
	                    while (temp_parent) {
	                        //till we reach '' (the initial value);
	                        if (tag + this.tags[tag + "count"] === temp_parent) {
	                            //if this is it use it
	                            break;
	                        }
	                        temp_parent = this.tags[temp_parent + "parent"]; //otherwise keep on climbing up the DOM Tree
	                    }
	                    if (temp_parent) {
	                        //if we caught something
	                        this.indent_level = this.tags[tag + this.tags[tag + "count"]]; //set the indent_level accordingly
	                        this.tags.parent = this.tags[temp_parent + "parent"]; //and set the current parent
	                    }
	                    delete this.tags[tag + this.tags[tag + "count"] + "parent"]; //delete the closed tags parent reference...
	                    delete this.tags[tag + this.tags[tag + "count"]]; //...and the tag itself
	                    if (this.tags[tag + "count"] === 1) {
	                        delete this.tags[tag + "count"];
	                    } else {
	                        this.tags[tag + "count"]--;
	                    }
	                }
	            };

	            this.indent_to_tag = function (tag) {
	                // Match the indentation level to the last use of this tag, but don't remove it.
	                if (!this.tags[tag + "count"]) {
	                    return;
	                }
	                var temp_parent = this.tags.parent;
	                while (temp_parent) {
	                    if (tag + this.tags[tag + "count"] === temp_parent) {
	                        break;
	                    }
	                    temp_parent = this.tags[temp_parent + "parent"];
	                }
	                if (temp_parent) {
	                    this.indent_level = this.tags[tag + this.tags[tag + "count"]];
	                }
	            };

	            this.get_tag = function (peek) {
	                //function to get a full tag and parse its type
	                var input_char = "",
	                    content = [],
	                    comment = "",
	                    space = false,
	                    first_attr = true,
	                    has_wrapped_attrs = false,
	                    tag_start,
	                    tag_end,
	                    tag_start_char,
	                    orig_pos = this.pos,
	                    orig_line_char_count = this.line_char_count,
	                    is_tag_closed = false,
	                    tail;

	                peek = peek !== undefined ? peek : false;

	                do {
	                    if (this.pos >= this.input.length) {
	                        if (peek) {
	                            this.pos = orig_pos;
	                            this.line_char_count = orig_line_char_count;
	                        }
	                        return content.length ? content.join("") : ["", "TK_EOF"];
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        //don't want to insert unnecessary space
	                        space = true;
	                        continue;
	                    }

	                    if (input_char === "'" || input_char === "\"") {
	                        input_char += this.get_unformatted(input_char);
	                        space = true;
	                    }

	                    if (input_char === "=") {
	                        //no space before =
	                        space = false;
	                    }
	                    tail = this.input.substr(this.pos - 1);
	                    if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === ">" || input_char === "/")) {
	                        if (tail.match(/^\/?\s*>/)) {
	                            space = false;
	                            is_tag_closed = true;
	                            this.print_newline(false, content);
	                            this.print_indentation(content);
	                        }
	                    }
	                    if (content.length && content[content.length - 1] !== "=" && input_char !== ">" && space) {
	                        //no space after = or before >
	                        var wrapped = this.space_or_wrap(content);
	                        var indentAttrs = wrapped && input_char !== "/" && !is_wrap_attributes_force;
	                        space = false;

	                        if (is_wrap_attributes_force && input_char !== "/") {
	                            var force_first_attr_wrap = false;
	                            if (is_wrap_attributes_force_expand_multiline && first_attr) {
	                                var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
	                                force_first_attr_wrap = !is_only_attribute;
	                            }
	                            if (!first_attr || force_first_attr_wrap) {
	                                this.print_newline(false, content);
	                                this.print_indentation(content);
	                                indentAttrs = true;
	                            }
	                        }
	                        if (indentAttrs) {
	                            has_wrapped_attrs = true;

	                            //indent attributes an auto, forced, or forced-align line-wrap
	                            var alignment_size = wrap_attributes_indent_size;
	                            if (is_wrap_attributes_force_aligned) {
	                                alignment_size = content.indexOf(" ") + 1;
	                            }

	                            for (var count = 0; count < alignment_size; count++) {
	                                // only ever further indent with spaces since we're trying to align characters
	                                content.push(" ");
	                            }
	                        }
	                        if (first_attr) {
	                            for (var i = 0; i < content.length; i++) {
	                                if (content[i] === " ") {
	                                    first_attr = false;
	                                    break;
	                                }
	                            }
	                        }
	                    }

	                    if (indent_handlebars && tag_start_char === "<") {
	                        // When inside an angle-bracket tag, put spaces around
	                        // handlebars not inside of strings.
	                        if (input_char + this.input.charAt(this.pos) === "{{") {
	                            input_char += this.get_unformatted("}}");
	                            if (content.length && content[content.length - 1] !== " " && content[content.length - 1] !== "<") {
	                                input_char = " " + input_char;
	                            }
	                            space = true;
	                        }
	                    }

	                    if (input_char === "<" && !tag_start_char) {
	                        tag_start = this.pos - 1;
	                        tag_start_char = "<";
	                    }

	                    if (indent_handlebars && !tag_start_char) {
	                        if (content.length >= 2 && content[content.length - 1] === "{" && content[content.length - 2] === "{") {
	                            if (input_char === "#" || input_char === "/" || input_char === "!") {
	                                tag_start = this.pos - 3;
	                            } else {
	                                tag_start = this.pos - 2;
	                            }
	                            tag_start_char = "{";
	                        }
	                    }

	                    this.line_char_count++;
	                    content.push(input_char); //inserts character at-a-time (or string)

	                    if (content[1] && (content[1] === "!" || content[1] === "?" || content[1] === "%")) {
	                        //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && content[1] && content[1] === "{" && content[2] && content[2] === "!") {
	                        //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && tag_start_char === "{" && content.length > 2 && content[content.length - 2] === "}" && content[content.length - 1] === "}") {
	                        break;
	                    }
	                } while (input_char !== ">");

	                var tag_complete = content.join("");
	                var tag_index;
	                var tag_offset;

	                // must check for space first otherwise the tag could have the first attribute included, and
	                // then not un-indent correctly
	                if (tag_complete.indexOf(" ") !== -1) {
	                    //if there's whitespace, thats where the tag name ends
	                    tag_index = tag_complete.indexOf(" ");
	                } else if (tag_complete.indexOf("\n") !== -1) {
	                    //if there's a line break, thats where the tag name ends
	                    tag_index = tag_complete.indexOf("\n");
	                } else if (tag_complete.charAt(0) === "{") {
	                    tag_index = tag_complete.indexOf("}");
	                } else {
	                    //otherwise go with the tag ending
	                    tag_index = tag_complete.indexOf(">");
	                }
	                if (tag_complete.charAt(0) === "<" || !indent_handlebars) {
	                    tag_offset = 1;
	                } else {
	                    tag_offset = tag_complete.charAt(2) === "#" ? 3 : 2;
	                }
	                var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
	                if (tag_complete.charAt(tag_complete.length - 2) === "/" || this.Utils.in_array(tag_check, this.Utils.single_token)) {
	                    //if this tag name is a single tag type (either in the list or has a closing /)
	                    if (!peek) {
	                        this.tag_type = "SINGLE";
	                    }
	                } else if (indent_handlebars && tag_complete.charAt(0) === "{" && tag_check === "else") {
	                    if (!peek) {
	                        this.indent_to_tag("if");
	                        this.tag_type = "HANDLEBARS_ELSE";
	                        this.indent_content = true;
	                        this.traverse_whitespace();
	                    }
	                } else if (this.is_unformatted(tag_check, unformatted) || this.is_unformatted(tag_check, content_unformatted)) {
	                    // do not reformat the "unformatted" or "content_unformatted" tags
	                    comment = this.get_unformatted("</" + tag_check + ">", tag_complete); //...delegate to get_unformatted function
	                    content.push(comment);
	                    tag_end = this.pos - 1;
	                    this.tag_type = "SINGLE";
	                } else if (tag_check === "script" && (tag_complete.search("type") === -1 || tag_complete.search("type") > -1 && tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1)) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = "SCRIPT";
	                    }
	                } else if (tag_check === "style" && (tag_complete.search("type") === -1 || tag_complete.search("type") > -1 && tag_complete.search("text/css") > -1)) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = "STYLE";
	                    }
	                } else if (tag_check.charAt(0) === "!") {
	                    //peek for <! comment
	                    // for comments content is already correct.
	                    if (!peek) {
	                        this.tag_type = "SINGLE";
	                        this.traverse_whitespace();
	                    }
	                } else if (!peek) {
	                    if (tag_check.charAt(0) === "/") {
	                        //this tag is a double tag so check for tag-ending
	                        this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
	                        this.tag_type = "END";
	                    } else {
	                        //otherwise it's a start-tag
	                        this.record_tag(tag_check); //push it on the tag stack
	                        if (tag_check.toLowerCase() !== "html") {
	                            this.indent_content = true;
	                        }
	                        this.tag_type = "START";
	                    }

	                    // Allow preserving of newlines after a start or end tag
	                    if (this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                    }

	                    if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
	                        //check if this double needs an extra line
	                        this.print_newline(false, this.output);
	                        if (this.output.length && this.output[this.output.length - 2] !== "\n") {
	                            this.print_newline(true, this.output);
	                        }
	                    }
	                }

	                if (peek) {
	                    this.pos = orig_pos;
	                    this.line_char_count = orig_line_char_count;
	                }

	                return content.join(""); //returns fully formatted tag
	            };

	            this.get_comment = function (start_pos) {
	                //function to return comment content in its entirety
	                // this is will have very poor perf, but will work for now.
	                var comment = "",
	                    delimiter = ">",
	                    matched = false;

	                this.pos = start_pos;
	                var input_char = this.input.charAt(this.pos);
	                this.pos++;

	                while (this.pos <= this.input.length) {
	                    comment += input_char;

	                    // only need to check for the delimiter if the last chars match
	                    if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) && comment.indexOf(delimiter) !== -1) {
	                        break;
	                    }

	                    // only need to search for custom delimiter for the first few characters
	                    if (!matched && comment.length < 10) {
	                        if (comment.indexOf("<![if") === 0) {
	                            //peek for <![if conditional comment
	                            delimiter = "<![endif]>";
	                            matched = true;
	                        } else if (comment.indexOf("<![cdata[") === 0) {
	                            //if it's a <[cdata[ comment...
	                            delimiter = "]]>";
	                            matched = true;
	                        } else if (comment.indexOf("<![") === 0) {
	                            // some other ![ comment? ...
	                            delimiter = "]>";
	                            matched = true;
	                        } else if (comment.indexOf("<!--") === 0) {
	                            // <!-- comment ...
	                            delimiter = "-->";
	                            matched = true;
	                        } else if (comment.indexOf("{{!--") === 0) {
	                            // {{!-- handlebars comment
	                            delimiter = "--}}";
	                            matched = true;
	                        } else if (comment.indexOf("{{!") === 0) {
	                            // {{! handlebars comment
	                            if (comment.length === 5 && comment.indexOf("{{!--") === -1) {
	                                delimiter = "}}";
	                                matched = true;
	                            }
	                        } else if (comment.indexOf("<?") === 0) {
	                            // {{! handlebars comment
	                            delimiter = "?>";
	                            matched = true;
	                        } else if (comment.indexOf("<%") === 0) {
	                            // {{! handlebars comment
	                            delimiter = "%>";
	                            matched = true;
	                        }
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;
	                }

	                return comment;
	            };

	            function tokenMatcher(delimiter) {
	                var token = "";

	                var add = function add(str) {
	                    var newToken = token + str.toLowerCase();
	                    token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
	                };

	                var doesNotMatch = function doesNotMatch() {
	                    return token.indexOf(delimiter) === -1;
	                };

	                return {
	                    add: add,
	                    doesNotMatch: doesNotMatch
	                };
	            }

	            this.get_unformatted = function (delimiter, orig_tag) {
	                //function to return unformatted content in its entirety
	                if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
	                    return "";
	                }
	                var input_char = "";
	                var content = "";
	                var space = true;

	                var delimiterMatcher = tokenMatcher(delimiter);

	                do {

	                    if (this.pos >= this.input.length) {
	                        return content;
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (!space) {
	                            this.line_char_count--;
	                            continue;
	                        }
	                        if (input_char === "\n" || input_char === "\r") {
	                            content += "\n";
	                            /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
	                            for (var i=0; i<this.indent_level; i++) {
	                            content += this.indent_string;
	                            }
	                            space = false; //...and make sure other indentation is erased
	                            */
	                            this.line_char_count = 0;
	                            continue;
	                        }
	                    }
	                    content += input_char;
	                    delimiterMatcher.add(input_char);
	                    this.line_char_count++;
	                    space = true;

	                    if (indent_handlebars && input_char === "{" && content.length && content.charAt(content.length - 2) === "{") {
	                        // Handlebars expressions in strings should also be unformatted.
	                        content += this.get_unformatted("}}");
	                        // Don't consider when stopping for delimiters.
	                    }
	                } while (delimiterMatcher.doesNotMatch());

	                return content;
	            };

	            this.get_token = function () {
	                //initial handler for token-retrieval
	                var token;

	                if (this.last_token === "TK_TAG_SCRIPT" || this.last_token === "TK_TAG_STYLE") {
	                    //check if we need to format javascript
	                    var type = this.last_token.substr(7);
	                    token = this.get_contents_to(type);
	                    if (typeof token !== "string") {
	                        return token;
	                    }
	                    return [token, "TK_" + type];
	                }
	                if (this.current_mode === "CONTENT") {
	                    token = this.get_content();
	                    if (typeof token !== "string") {
	                        return token;
	                    } else {
	                        return [token, "TK_CONTENT"];
	                    }
	                }

	                if (this.current_mode === "TAG") {
	                    token = this.get_tag();
	                    if (typeof token !== "string") {
	                        return token;
	                    } else {
	                        var tag_name_type = "TK_TAG_" + this.tag_type;
	                        return [token, tag_name_type];
	                    }
	                }
	            };

	            this.get_full_indent = function (level) {
	                level = this.indent_level + level || 0;
	                if (level < 1) {
	                    return "";
	                }

	                return Array(level + 1).join(this.indent_string);
	            };

	            this.is_unformatted = function (tag_check, unformatted) {
	                //is this an HTML5 block-level link?
	                if (!this.Utils.in_array(tag_check, unformatted)) {
	                    return false;
	                }

	                if (tag_check.toLowerCase() !== "a" || !this.Utils.in_array("a", unformatted)) {
	                    return true;
	                }

	                //at this point we have an  tag; is its first child something we want to remain
	                //unformatted?
	                var next_tag = this.get_tag(true /* peek. */);

	                // test next_tag to see if it is just html tag (no external content)
	                var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

	                // if next_tag comes back but is not an isolated tag, then
	                // let's treat the 'a' tag as having content
	                // and respect the unformatted option
	                if (!tag || this.Utils.in_array(tag, unformatted)) {
	                    return true;
	                } else {
	                    return false;
	                }
	            };

	            this.printer = function (js_source, indent_character, indent_size, wrap_line_length, brace_style) {
	                //handles input/output and some other printing functions

	                this.input = js_source || ""; //gets the input for the Parser

	                // HACK: newline parsing inconsistent. This brute force normalizes the input.
	                this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, "\n");

	                this.output = [];
	                this.indent_character = indent_character;
	                this.indent_string = "";
	                this.indent_size = indent_size;
	                this.brace_style = brace_style;
	                this.indent_level = 0;
	                this.wrap_line_length = wrap_line_length;
	                this.line_char_count = 0; //count to see if wrap_line_length was exceeded

	                for (var i = 0; i < this.indent_size; i++) {
	                    this.indent_string += this.indent_character;
	                }

	                this.print_newline = function (force, arr) {
	                    this.line_char_count = 0;
	                    if (!arr || !arr.length) {
	                        return;
	                    }
	                    if (force || arr[arr.length - 1] !== "\n") {
	                        //we might want the extra line
	                        if (arr[arr.length - 1] !== "\n") {
	                            arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
	                        }
	                        arr.push("\n");
	                    }
	                };

	                this.print_indentation = function (arr) {
	                    for (var i = 0; i < this.indent_level; i++) {
	                        arr.push(this.indent_string);
	                        this.line_char_count += this.indent_string.length;
	                    }
	                };

	                this.print_token = function (text) {
	                    // Avoid printing initial whitespace.
	                    if (this.is_whitespace(text) && !this.output.length) {
	                        return;
	                    }
	                    if (text || text !== "") {
	                        if (this.output.length && this.output[this.output.length - 1] === "\n") {
	                            this.print_indentation(this.output);
	                            text = ltrim(text);
	                        }
	                    }
	                    this.print_token_raw(text);
	                };

	                this.print_token_raw = function (text) {
	                    // If we are going to print newlines, truncate trailing
	                    // whitespace, as the newlines will represent the space.
	                    if (this.newlines > 0) {
	                        text = rtrim(text);
	                    }

	                    if (text && text !== "") {
	                        if (text.length > 1 && text.charAt(text.length - 1) === "\n") {
	                            // unformatted tags can grab newlines as their last character
	                            this.output.push(text.slice(0, -1));
	                            this.print_newline(false, this.output);
	                        } else {
	                            this.output.push(text);
	                        }
	                    }

	                    for (var n = 0; n < this.newlines; n++) {
	                        this.print_newline(n > 0, this.output);
	                    }
	                    this.newlines = 0;
	                };

	                this.indent = function () {
	                    this.indent_level++;
	                };

	                this.unindent = function () {
	                    if (this.indent_level > 0) {
	                        this.indent_level--;
	                    }
	                };
	            };
	            return this;
	        }

	        /*_____________________--------------------_____________________*/

	        multi_parser = new Parser(); //wrapping functions Parser
	        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values

	        while (true) {
	            var t = multi_parser.get_token();
	            multi_parser.token_text = t[0];
	            multi_parser.token_type = t[1];

	            if (multi_parser.token_type === "TK_EOF") {
	                break;
	            }

	            switch (multi_parser.token_type) {
	                case "TK_TAG_START":
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) && (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

	                            multi_parser.indent();
	                        }

	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = "CONTENT";
	                    break;
	                case "TK_TAG_STYLE":
	                case "TK_TAG_SCRIPT":
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = "CONTENT";
	                    break;
	                case "TK_TAG_END":
	                    //Print new line only if the tag has no content and has child
	                    if (multi_parser.last_token === "TK_CONTENT" && multi_parser.last_text === "") {
	                        var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
	                        var tag_extracted_from_last_output = null;
	                        if (multi_parser.output.length) {
	                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
	                        }
	                        if (tag_extracted_from_last_output === null || tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted)) {
	                            multi_parser.print_newline(false, multi_parser.output);
	                        }
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = "CONTENT";
	                    break;
	                case "TK_TAG_SINGLE":
	                    // Don't add a newline before elements that should remain unformatted.
	                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
	                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = "CONTENT";
	                    break;
	                case "TK_TAG_HANDLEBARS_ELSE":
	                    // Don't add a newline if opening {{#if}} tag is on the current line
	                    var foundIfOnCurrentLine = false;
	                    for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
	                        if (multi_parser.output[lastCheckedOutput] === "\n") {
	                            break;
	                        } else {
	                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
	                                foundIfOnCurrentLine = true;
	                                break;
	                            }
	                        }
	                    }
	                    if (!foundIfOnCurrentLine) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        multi_parser.indent();
	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = "CONTENT";
	                    break;
	                case "TK_TAG_HANDLEBARS_COMMENT":
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = "TAG";
	                    break;
	                case "TK_CONTENT":
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = "TAG";
	                    break;
	                case "TK_STYLE":
	                case "TK_SCRIPT":
	                    if (multi_parser.token_text !== "") {
	                        multi_parser.print_newline(false, multi_parser.output);
	                        var text = multi_parser.token_text,
	                            _beautifier,
	                            script_indent_level = 1;
	                        if (multi_parser.token_type === "TK_SCRIPT") {
	                            _beautifier = typeof js_beautify === "function" && js_beautify;
	                        } else if (multi_parser.token_type === "TK_STYLE") {
	                            _beautifier = typeof css_beautify === "function" && css_beautify;
	                        }

	                        if (options.indent_scripts === "keep") {
	                            script_indent_level = 0;
	                        } else if (options.indent_scripts === "separate") {
	                            script_indent_level = -multi_parser.indent_level;
	                        }

	                        var indentation = multi_parser.get_full_indent(script_indent_level);
	                        if (_beautifier) {

	                            // call the Beautifier if avaliable
	                            var Child_options = function Child_options() {
	                                this.eol = "\n";
	                            };
	                            Child_options.prototype = options;
	                            var child_options = new Child_options();
	                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
	                        } else {
	                            // simply indent the string otherwise
	                            var white = text.match(/^\s*/)[0];
	                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
	                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
	                            text = text.replace(/^\s*/, indentation).replace(/\r\n|\r|\n/g, "\n" + reindent).replace(/\s+$/, "");
	                        }
	                        if (text) {
	                            multi_parser.print_token_raw(text);
	                            multi_parser.print_newline(true, multi_parser.output);
	                        }
	                    }
	                    multi_parser.current_mode = "TAG";
	                    break;
	                default:
	                    // We should not be getting here but we don't want to drop input on the floor
	                    // Just output the text and move on
	                    if (multi_parser.token_text !== "") {
	                        multi_parser.print_token(multi_parser.token_text);
	                    }
	                    break;
	            }
	            multi_parser.last_token = multi_parser.token_type;
	            multi_parser.last_text = multi_parser.token_text;
	        }
	        var sweet_code = multi_parser.output.join("").replace(/[\r\n\t ]+$/, "");

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweet_code += "\n";
	        }

	        if (eol !== "\n") {
	            sweet_code = sweet_code.replace(/[\n]/g, eol);
	        }

	        return sweet_code;
	    }

	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(32), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function (requireamd) {
	            var js_beautify = __webpack_require__(32);
	            var css_beautify = __webpack_require__(33);

	            return {
	                html_beautify: function html_beautify(html_source, options) {
	                    return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	                }
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        var js_beautify = require("./beautify.js");
	        var css_beautify = require("./beautify-css.js");

	        exports.html_beautify = function (html_source, options) {
	            return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	        };
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.html_beautify = function (html_source, options) {
	            return style_html(html_source, options, window.js_beautify, window.css_beautify);
	        };
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.html_beautify = function (html_source, options) {
	            return style_html(html_source, options, global.js_beautify, global.css_beautify);
	        };
	    }
	})();

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfGridFilter = jfGridFilter;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	 USAGE EXAMPLE:

	 <jf-grid-filter
	 filter-grid="gridOptions"  //the name of the grid (grid options)
	 filter-field="fieldName"        //the name of the field that should be filtered
	 filter-on-change>          //optional - don't use a button for filtering, filter on every change
	 </jf-grid-filter>

	 */

	var jfGridFilterController = (function () {
	    /* @ngInject */

	    jfGridFilterController.$inject = ["$scope", "$timeout"];
	    function jfGridFilterController($scope, $timeout) {
	        _classCallCheck(this, jfGridFilterController);

	        this.$timeout = $timeout;
	        this.$scope = $scope;
	        this.gridFilter = "";
	    }

	    _createClass(jfGridFilterController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.grid.enableFiltering = true;

	                this.grid.setFilter = function (filterString) {
	                    _this.gridFilter = filterString;
	                    _this.doFilter();
	                };

	                if (this.filterField.indexOf(".") !== -1) {
	                    var splitted = this.filterField.split(".");
	                    this.filterField = splitted[0];
	                    this.filterSubField = splitted[1];
	                }
	                if (this.filterField2.indexOf(".") !== -1) {
	                    var splitted = this.filterField2.split(".");
	                    this.filterField2 = splitted[0];
	                    this.filterSubField2 = splitted[1];
	                }

	                this.attachColumns();

	                this.$scope.$on("$destroy", function () {
	                    return _this.onDestroy();
	                });
	            }
	        },
	        attachColumns: {
	            value: function attachColumns() {
	                this.cols = this.grid.columnDefs;
	                this.column = _.find(this.cols, _.matchesProperty("field", this.filterField)) || this.cols[0];
	                if (this.filterField2) this.column2 = _.find(this.cols, _.matchesProperty("field", this.filterField2));
	            }
	        },
	        shouldFilterOnChange: {
	            value: function shouldFilterOnChange() {
	                return this.filterOnChange !== "false";
	            }
	        },
	        doFilter: {
	            value: function doFilter() {
	                var _this = this;

	                if (this.cols !== this.grid.columnDefs) this.attachColumns();

	                if (!this.column) {
	                    return;
	                }if (!this.column2) {
	                    //            this.column.filter = {term: '*' + this.gridFilter + '*'};
	                    this.column.filter = {
	                        term: "*" + this.gridFilter + "*",
	                        condition: function (searchTerm, cellValue, row, column) {
	                            cellValue = cellValue !== undefined ? cellValue : "";
	                            var regex = new RegExp(".*" + searchTerm.split("\\*").join(".*") + ".*", "i");
	                            var subsVisible = _this._isSubVisible(cellValue, column, regex);
	                            if (cellValue && cellValue.$value) cellValue = cellValue.$value;
	                            return regex.test(_this.filterSubField ? cellValue[_this.filterSubField] : cellValue) || row.entity._emptyRow || row.entity._specialRow || subsVisible;
	                        }
	                    };
	                } else {
	                    this.column.filter = {
	                        term: "*" + this.gridFilter + "*",
	                        condition: function (searchTerm, cellValue, row, column) {
	                            cellValue = cellValue !== undefined ? cellValue : "";
	                            var regex = new RegExp(".*" + searchTerm.split("\\*").join(".*") + ".*", "i");
	                            var cell2Value = row.entity[_this.column2.field];
	                            cell2Value = cell2Value !== undefined ? cell2Value : "";
	                            var subsVisible = _this._isSubVisible(cellValue, column, regex) || _this._isSubVisible(cell2Value, _this.column2, regex);
	                            if (cellValue && cellValue.$value) cellValue = cellValue.$value;
	                            if (cell2Value && cell2Value.$value) cell2Value = cell2Value.$value;
	                            return regex.test(_this.filterSubField ? cellValue[_this.filterSubField] : cellValue) || regex.test(_this.filterSubField2 ? cell2Value[_this.filterSubField2] : cell2Value) || row.entity._emptyRow || row.entity._specialRow || subsVisible;
	                        }
	                    };
	                }
	                this.grid.refreshGridAfterFiltering(this);
	            }
	        },
	        _isSubVisible: {
	            value: function _isSubVisible(cellValue, column, regex) {
	                var subsVisible = false;
	                if (cellValue && cellValue.$row && cellValue.$row.$expandable) {
	                    for (var i = 0; i < cellValue.$row.$subRows.length; i++) {
	                        if (regex.test(cellValue.$row.$subRows[i][column.field].$value)) {
	                            subsVisible = true;
	                            break;
	                        }
	                    }
	                }
	                return subsVisible;
	            }
	        },
	        onChange: {
	            value: function onChange() {
	                if (this.shouldFilterOnChange()) this.doFilter();
	            }
	        },
	        onDestroy: {
	            value: function onDestroy() {
	                this.gridFilter = "";
	                this.doFilter();
	            }
	        },
	        getPlaceHolder: {
	            value: function getPlaceHolder() {
	                if (this.column2) {
	                    return "Filter by " + (this.column.displayName || this.column.name) + " or " + (this.column2.displayName || this.column2.name);
	                } else if (this.column) {
	                    return "Filter by " + (this.column.displayName || this.column.name);
	                } else {
	                    return "FILTER UNAVAILABLE";
	                }
	            }
	        }
	    });

	    return jfGridFilterController;
	})();

	function jfGridFilter() {

	    return {
	        restrict: "E",
	        scope: {
	            disableButton: "=",
	            filterField: "@",
	            filterField2: "@",
	            grid: "=filterGrid",
	            filterOnChange: "@",
	            autoFocus: "@"
	        },
	        controller: jfGridFilterController,
	        controllerAs: "jfGridFilter",
	        templateUrl: "directives/jf_grid_filter/jf_grid_filter.html",
	        bindToController: true
	    };
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTabs = jfTabs;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//import EVENTS from '../../constants/artifacts_events.constants';

	var jfTabsController = (function () {
	    /* @ngInject */

	    jfTabsController.$inject = ["$scope", "$state", "$timeout", "$element", "$stateParams", "JFrogEventBus", "$rootScope"];
	    function jfTabsController($scope, $state, $timeout, $element, $stateParams, JFrogEventBus, $rootScope) {
	        _classCallCheck(this, jfTabsController);

	        this.$scope = $scope;
	        this.$element = $element;
	        this.stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.state = $state;
	        this.tabsCollapsed = [];
	        this.JFrogEventBus = JFrogEventBus;
	        this.$rootScope = $rootScope;

	        this.EVENTS = JFrogEventBus.getEventsDefinition();

	        this.currentTab = {
	            name: this.stateParams.tab
	        };
	    }

	    _createClass(jfTabsController, {
	        $onInit: {
	            value: function $onInit() {
	                this._registerEvents();
	                this.initTabs();
	            }
	        },
	        initTabs: {
	            value: function initTabs() {
	                var _this = this;

	                // wait for the element to render and calculate how many tabs should display
	                this.$timeout(function () {
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
	            }
	        },
	        _calculateTabsSize: {
	            value: function _calculateTabsSize() {
	                // wait for the element to render and calculate how many tabs should display
	                var visibleTabs = _.filter(this.tabs, function (tab) {
	                    return tab.isVisible !== false;
	                });
	                var container = $(this.$element).children().eq(0);
	                var containerWidth = container.width();
	                var tabWidth = this.getTabWidthForStyle().endsWith("px") ? parseInt(this.tabWidth) : containerWidth * parseInt(this.tabWidth) / 100;
	                var containerMargin = parseInt(this.containerMargin);

	                var expanderWidth = $(".action-expand").eq(0).outerWidth(true);
	                var tabsToTake = Math.floor((containerWidth - expanderWidth - containerMargin) / tabWidth);

	                this.tabsCollapsed = _.takeRight(visibleTabs, visibleTabs.length - tabsToTake);
	                this.tabsVisible = _.take(visibleTabs, tabsToTake);
	            }
	        },
	        _registerEvents: {
	            value: function _registerEvents() {
	                var _this = this;

	                this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABS_REFRESH, function () {
	                    return _this.initTabs();
	                });
	                // URL changed (like back button / forward button / someone input a URL)
	                this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABS_URL_CHANGED, function (stateParams) {
	                    _this.currentTab = { name: stateParams.tab };
	                });

	                var unwatch = this.$scope.$watch("jfTabs.tabs", function (newVal, oldVal) {
	                    _this._calculateTabsSize();
	                }, true);

	                var stateChangeListner = this.$rootScope.$on("$stateChangeSuccess", function (e, toState, toParams, fromState, fromParams) {
	                    toState.tabChange = false;
	                });

	                $(window).on("resize.tabs", function () {
	                    _this.initTabs();
	                    _this.$scope.$digest();
	                });
	                this.$scope.$on("$destroy", function () {
	                    $(window).off("resize.tabs");
	                    unwatch();
	                    stateChangeListner();
	                });
	            }
	        },
	        onClickTab: {
	            value: function onClickTab(tab, tabChange) {
	                // if the tab is in the more section replace it
	                // with the last tab in the main tabs.
	                if (this.onTabChange({ tab: tab }) === false || tab.isDisabled) {
	                    return;
	                }
	                this._ensureTabVisible(tab);
	                this.state.go(this.state.current, { tab: tab.name }, { notify: false });
	                this.currentTab.name = tab.name;

	                this.state.current.tabChange = tabChange;
	            }
	        },
	        _ensureTabVisible: {
	            value: function _ensureTabVisible(tab) {
	                var collapsedTab = this._getCollapsedTab(tab);
	                if (!collapsedTab) {
	                    return;
	                } // Replace between collapsedTabs & visibleTabs:
	                var collapsedTabIndex = this.tabsCollapsed.indexOf(collapsedTab);
	                var tabToReplace = this.tabsVisible[this.tabsVisible.length - 1];

	                if (!tabToReplace) {
	                    return;
	                }this.tabsCollapsed[collapsedTabIndex] = tabToReplace;
	                this.tabsVisible[this.tabsVisible.length - 1] = collapsedTab;
	            }
	        },
	        isActiveTab: {
	            value: function isActiveTab(tab) {
	                return tab.name === this.currentTab.name;
	            }
	        },
	        _getTab: {
	            value: function _getTab(tab) {
	                var currentTab = _.findWhere(this.tabs, { name: tab.name });
	                return currentTab;
	            }
	        },
	        _getCollapsedTab: {
	            value: function _getCollapsedTab(tab) {
	                return _.findWhere(this.tabsCollapsed, { name: tab.name });
	            }
	        },
	        getTabWidthForStyle: {
	            value: function getTabWidthForStyle() {
	                return this.tabWidth.endsWith("%") ? this.tabWidth : this.tabWidth.endsWith("px") ? this.tabWidth : this.tabWidth + "px";
	            }
	        },
	        hasClass: {
	            value: function hasClass(obj) {
	                if (obj && obj["class"]) {
	                    return true;
	                }
	            }
	        }
	    });

	    return jfTabsController;
	})();

	function jfTabs() {
	    return {
	        scope: {
	            tabs: "=",
	            dictionary: "=",
	            onTabChange: "&",
	            tabWidth: "@",
	            containerMargin: "@"
	        },
	        transclude: true,
	        controller: jfTabsController,
	        controllerAs: "jfTabs",
	        templateUrl: "directives/jf_tabs/jf_tabs.html",
	        bindToController: true
	    };
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	exports.jfTab = jfTab;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfTab() {
	    return {
	        scope: {
	            name: "@"
	        },
	        require: "^jfTabs",
	        templateUrl: "directives/jf_tabs/jf_tab.html",
	        transclude: true,
	        link: function link(scope, element, attrs, ctrl) {
	            scope.getCurrentTabName = function () {
	                return ctrl.currentTab && ctrl.currentTab.name;
	            };
	        }
	    };
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfDrawer = jfDrawer;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfDrawerController = (function () {
	    function jfDrawerController(JFrogUIUtils, $timeout) {
	        _classCallCheck(this, jfDrawerController);

	        this.opened = false;
	        this.utils = JFrogUIUtils;
	    }

	    _createClass(jfDrawerController, {
	        $onInit: {
	            value: function $onInit() {
	                if (this.openFirst === "0") {
	                    this.opened = true;
	                }
	            }
	        },
	        onClickHeader: {
	            value: function onClickHeader() {
	                this.opened = !this.opened;
	                if (this.opened) this.utils.fireResizeEvent();
	            }
	        }
	    });

	    return jfDrawerController;
	})();

	function jfDrawer() {
	    return {
	        scope: {
	            header: "@",
	            description: "@",
	            openFirst: "@?"
	        },
	        require: "^jfDrawers",
	        templateUrl: "directives/jf_drawers/jf_drawer.html",
	        transclude: true,
	        controller: jfDrawerController,
	        controllerAs: "jfDrawer",
	        bindToController: true
	    };
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfPanel = jfPanel;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfPanelController = (function () {
	    function jfPanelController($element) {
	        _classCallCheck(this, jfPanelController);

	        this.$element = $element;
	    }

	    _createClass(jfPanelController, {
	        hasNestedJfPanel: {
	            value: function hasNestedJfPanel() {
	                return this.$element.has("jf-panel").length > 0;
	            }
	        }
	    });

	    return jfPanelController;
	})();

	function jfPanel() {
	    return {
	        scope: {
	            jfPanelHeading: "@",
	            jfPanelHelpTooltip: "@",
	            jfPanelClasses: "@",
	            bordered: "=?"
	        },
	        templateUrl: "directives/jf_panel/jf_panel.html",
	        transclude: true,
	        controller: jfPanelController,
	        controllerAs: "$ctrl" };
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfUiSelect = jfUiSelect;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfUiSelectController = (function () {
	    /* @ngInject */

	    function jfUiSelectController() {
	        _classCallCheck(this, jfUiSelectController);
	    }

	    _createClass(jfUiSelectController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.displayLabel = function (item) {
	                    if (item === null || item === undefined) return null;
	                    if (_this.isMorePlaceholder(item)) return _this.jfSelectLoadMoreLabel || "More Options...";
	                    if (item[_this.jfSelectDisabled]) return null;
	                    if (_this.jfSelectDisplayAttr) {
	                        return item[_this.jfSelectDisplayAttr];
	                    } else if (_this.jfSelectDisplayFunc) {
	                        return _this.jfSelectDisplayFunc({ $item: item });
	                    } else {
	                        return item;
	                    }
	                };

	                if (this.jfSelectLoadChunks === undefined) {} else if (this.jfSelectLoadChunks === "") {
	                    this.chunkSize = 10;
	                    this.jfSelectOptionsView = [];
	                } else {
	                    this.chunkSize = parseInt(this.jfSelectLoadChunks) < 4 ? 4 : parseInt(this.jfSelectLoadChunks);
	                    this.jfSelectOptionsView = [];
	                }
	            }
	        },
	        onSelect: {
	            value: function onSelect($item, $model) {
	                if (this.jfSelectChange) this.jfSelectChange();
	                if (this.jfSelectOptionsView) this.jfSelectOptionsView = [];
	            }
	        },
	        onClick: {
	            value: function onClick(item, $event) {
	                if (this.jfSelectOptionsView && this.isMorePlaceholder(item)) {
	                    var newLoads = this[this.filtered ? "filtered" : "jfSelectOptions"].slice(this.loaded, this.loaded + this.chunkSize);
	                    this.jfSelectOptionsView = this.jfSelectOptionsView.slice(0, this.loaded).concat(newLoads);
	                    if (this[this.filtered ? "filtered" : "jfSelectOptions"].length > this.jfSelectOptionsView.length) {
	                        this.jfSelectOptionsView.push(this.createMorePlaceholder());
	                    }
	                    this.loaded += this.chunkSize;
	                    $event.preventDefault();
	                    $event.stopPropagation();
	                }
	            }
	        },
	        onOpenList: {
	            value: function onOpenList() {
	                if (this.jfSelectOptionsView) {
	                    this.filter = "";
	                    this.filtered = null;
	                    this.loaded = this.chunkSize;
	                    this.jfSelectOptionsView = this.jfSelectOptions.slice(0, this.loaded);
	                    if (this.jfSelectOptions.length > this.jfSelectOptionsView.length) {
	                        this.jfSelectOptionsView.push(this.createMorePlaceholder());
	                    }
	                }
	            }
	        },
	        refresh: {
	            value: function refresh(search) {
	                var _this = this;

	                if (!this.jfSelectOptionsView) {
	                    return;
	                }if (!search.trim()) {
	                    this.onOpenList();
	                    return;
	                }

	                this.filter = search;

	                this.filtered = _.filter(this.jfSelectOptions, function (option) {
	                    if (!_this.jfSelectFilterAttr) {
	                        return _this.displayLabel(option).toLowerCase().indexOf(search.toLowerCase()) !== -1;
	                    } else {
	                        return option[_this.jfSelectFilterAttr].toLowerCase().indexOf(search.toLowerCase()) !== -1;
	                    }
	                });

	                this.loaded = this.chunkSize;
	                this.jfSelectOptionsView = this.filtered.slice(0, this.loaded);
	                if (this.filtered.length > this.jfSelectOptionsView.length) {
	                    this.jfSelectOptionsView.push(this.createMorePlaceholder());
	                }
	            }
	        },
	        createMorePlaceholder: {
	            value: function createMorePlaceholder() {
	                var _this = this;

	                var ph = {
	                    $$specialItem: "more",
	                    toString: function (s) {
	                        return _this.filter;
	                    }
	                };
	                if (this.jfSelectFilterAttr) ph[this.jfSelectFilterAttr] = this.filter;
	                return ph;
	            }
	        },
	        isMorePlaceholder: {
	            value: function isMorePlaceholder(item) {
	                return _.isObject(item) && item.$$specialItem === "more";
	            }
	        }
	    });

	    return jfUiSelectController;
	})();

	function jfUiSelect() {
	    return {
	        controller: jfUiSelectController,
	        controllerAs: "jfUiSelect",
	        bindToController: true,
	        scope: {
	            jfSelectModel: "=",
	            jfSelectOptions: "=",
	            jfSelectDisabled: "=",
	            jfSelectDisableMarquee: "=",
	            jfSelectMultiple: "@?",
	            jfSelectChange: "&?",
	            jfSelectDisplayAttr: "@",
	            jfSelectDisplayFunc: "&?",
	            jfSelectFilterAttr: "@",
	            jfSelectPlaceholder: "@",
	            jfSelectLoadChunks: "@?",
	            jfSelectLoadMoreLabel: "@?",
	            jfSelectHelpTooltips: "&?"
	        },
	        compile: function compile(tElement, tAttrs, transclude) {
	            if (_.has(tAttrs, "jfSelectMultiple")) {
	                $(tElement).find("ui-select").attr("multiple", "");
	            }
	        },
	        templateUrl: "directives/jf_ui_select/jf_ui_select.html"
	    };
	}

	// 3 methods are allowed for passing the options:
	// Passing an array of objects, and the attribute to display
	// Passing an array (of anything), and a function that returns the label to display
	// Passing an array of strings (and then the string is displayed)

	//NO CHUNKS!

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfRevealInput = jfRevealInput;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfRevealInputController = (function () {
		/* @ngInject */

		jfRevealInputController.$inject = ["$element"];
		function jfRevealInputController($element) {
			_classCallCheck(this, jfRevealInputController);

			this.$elementIcon = $element.find("i");
		}

		_createClass(jfRevealInputController, {
			$onInit: {
				value: function $onInit() {
					this.tooltipText = "Show " + this.objectName;
				}
			},
			updateInput: {
				value: function updateInput() {
					var input = $("#" + this.inputId);
					var type = input.attr("type");
					if (type === "text") {
						input.attr("type", "password");
						this.$elementIcon.removeClass("icon-unview").addClass("icon-view");
						this.tooltipText = this.tooltipText.replace("Hide", "Show");
					} else {
						input.attr("type", "text");
						this.$elementIcon.removeClass("icon-view").addClass("icon-unview");
						this.tooltipText = this.tooltipText.replace("Show", "Hide");
					}
				}
			},
			hasData: {
				value: function hasData() {
					var input = $("#" + this.inputId);
					return !!input.val();
				}
			}
		});

		return jfRevealInputController;
	})();

	function jfRevealInput() {
		return {
			restrict: "A",
			template: "<i class=\"icon icon-view jf-reveal-input\"\n\t\t\t\t\t  jf-tooltip=\"{{jfRevealInput.tooltipText}}\"\n\t\t\t\t\t  ng-if=\"jfRevealInput.hasData()\"\n\t\t   \t\t\t  ng-click=\"jfRevealInput.updateInput()\"></i>",
			controller: jfRevealInputController,
			controllerAs: "jfRevealInput",
			bindToController: true,
			scope: {
				inputId: "@jfRevealInput",
				objectName: "@"
			}
		};
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfDisableNgAnimate = jfDisableNgAnimate;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfDisableNgAnimateController =
	/* @ngInject */
	["$element", "$animate", function jfDisableNgAnimateController($element, $animate) {
		_classCallCheck(this, jfDisableNgAnimateController);

		$animate.enabled($element, false);
	}];

	function jfDisableNgAnimate() {
		return {
			restrict: "A",
			scope: false,
			controller: jfDisableNgAnimateController
		};
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	exports.jfIncludeReplace = jfIncludeReplace;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function jfIncludeReplace() {
		return {
			require: "ngInclude",
			restrict: "A",
			link: function link(scope, el, attrs) {
				el.replaceWith(el.children());
			}
		};
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfEnterPress = jfEnterPress;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var KEYS = _interopRequire(__webpack_require__(45));

	var jfEnterPressController = (function () {
		/* @ngInject */

		jfEnterPressController.$inject = ["$element", "$scope"];
		function jfEnterPressController($element, $scope) {
			var _this = this;

			_classCallCheck(this, jfEnterPressController);

			this.$scope = $scope;
			$element.on("keypress", function (e) {
				return _this._onKeyPress(e);
			});
			this.$scope.$on("$destroy", function () {
				return $element.off("keypress");
			});
		}

		_createClass(jfEnterPressController, {
			_onKeyPress: {
				value: function _onKeyPress(e) {
					if (e.keyCode != KEYS.ENTER) {
						return;
					}e.preventDefault();
					this.callback();
					if (!this.$scope.$$phase) this.$scope.$apply();
				}
			}
		});

		return jfEnterPressController;
	})();

	function jfEnterPress() {
		return {
			scope: {
				callback: "&jfEnterPress"
			},
			controllerAs: "jfEnterPress",
			bindToController: true,
			controller: jfEnterPressController
		};
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    ENTER: 13,
	    ESC: 27,
	    SPACE: 32,
	    UP_ARROW: 38,
	    DOWN_ARROW: 40,
	    HOTKEYS: {
	        ALPHANUMERIC: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_"
	    },
	    PROPERTY_TYPE: {
	        MULTI_SELECT: null,
	        SINGLE_SELECT: 1,
	        ANY_VALUE: 0
	    }
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	/*
	 USAGE EXAMPLE:

	 <jf-grid-filter
	 filter-grid="gridOptions"  //the name of the grid (grid options)
	 filter-field="fieldName"        //the name of the field that should be filtered
	 filter-on-change>          //optional - don't use a button for filtering, filter on every change
	 </jf-grid-filter>

	 */

	"use strict";

	exports.jfTooltipOnOverflow = jfTooltipOnOverflow;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function jfTooltipOnOverflow($sanitize) {

		return {
			scope: {
				trustTooltipText: "<?"
			},
			restrict: "A",
			link: function ($scope, $element) {
				$($element).on("mouseenter", function (e) {
					var targets = [$($element), $(e.target)];
					var tooltipShown = false;
					var isNoTooltip = function (cell) {
						return cell[0] && cell[0].classList && cell[0].classList.contains("no-tooltip");
					};

					for (var i = 0; !tooltipShown && i < targets.length; i++) {
						var target = targets[i];

						var targetContent = target.children(":not(:visible)").length ? target.children(":visible").text().trim() : target.text().trim();
						targetContent = targetContent === "" ? null : $sanitize(targetContent);
						if (!isNoTooltip(target) && target[0].scrollWidth > Math.round(target.innerWidth())) {
							if (!!targetContent && !target.hasClass("tooltipstered")) {
								var options = {
									animation: "fade",
									contentAsHTML: "true",
									trigger: "hover",
									onlyOne: "true",
									interactive: "true",
									position: "bottom",
									theme: "tooltipster-default bottom",
									content: targetContent
								};
								if ($scope.trustTooltipText) {
									options.contentAsHTML = "true";
								}
								target.tooltipster(options);
								target.tooltipster("show");
							} else if (!!targetContent) {
								target.tooltipster("enable");

								if (target.tooltipster("content") != targetContent) target.tooltipster("content", targetContent);
							}
						} else if (target.hasClass("tooltipstered")) target.tooltipster("disable");
					}
				});
				$scope.$on("$destroy", function () {
					$($element).off("mouseenter");
					$($element).off("mouseleave");
				});
			}
		};
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	jfClipCopy.$inject = ["$compile"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfClipCopy = jfClipCopy;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfClipCopyController = (function () {
	    /* @ngInject */

	    jfClipCopyController.$inject = ["$timeout", "$scope", "$element"];
	    function jfClipCopyController($timeout, $scope, $element) {
	        var _this = this;

	        _classCallCheck(this, jfClipCopyController);

	        this.FEEDBACK_DELAY = 4000;

	        this.$timeout = $timeout;

	        this.timeoutPromise = null;

	        this.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;

	        if (!this.isSafari) {
	            //initialize Clipboard.js
	            var target = $element.find("a")[0];
	            this.clipboard = new Clipboard(target);
	            this.clipboard.on("success", function (e) {
	                _this.onSuccessfulCopy();
	                $scope.$apply();
	            });

	            this.clipboard.on("error", function (e) {});

	            $scope.$on("$destroy", function () {
	                _this.clipboard.destroy();
	            });
	        }
	    }

	    _createClass(jfClipCopyController, {
	        $onInit: {
	            value: function $onInit() {
	                if (this.objectName) {
	                    this.origTooltip = this.tooltipText = "Copy " + (this.keepTooltipLetterCase ? this.objectName : this.objectName.toLowerCase()) + " to clipboard";
	                } else {
	                    this.origTooltip = this.tooltipText = "Copy to clipboard";
	                }
	            }
	        },
	        onSuccessfulCopy: {
	            value: function onSuccessfulCopy() {
	                var _this = this;

	                if (!this.textToCopy) {
	                    return;
	                }if (this.timeoutPromise) {
	                    this.$timeout.cancel(this.timeoutPromise);
	                    this.timeoutPromise = null;
	                }

	                var objectNameText = this.keepTooltipLetterCase ? this.objectName : this.objectName.charAt(0).toUpperCase() + this.objectName.substr(1);
	                this.tooltipText = "" + (this.objectName ? objectNameText : "Value") + " copied to clipboard";
	                this.timeoutPromise = this.$timeout(function () {
	                    _this.tooltipText = _this.origTooltip;
	                }, this.FEEDBACK_DELAY);
	            }
	        }
	    });

	    return jfClipCopyController;
	})();

	function jfClipCopy($compile) {
	    "ngInject";
	    return {
	        restrict: "E",
	        scope: {
	            textToCopy: "=",
	            objectName: "@",
	            keepTooltipLetterCase: "<?"
	        },
	        controller: jfClipCopyController,
	        controllerAs: "jfClipCopy",
	        bindToController: true,
	        templateUrl: "directives/jf_clip_copy/jf_clip_copy.html",
	        link: function ($scope, $element, $attrs) {
	            var classList = $element[0].classList;
	            var outer = angular.element($element[0]);
	            var inner = angular.element($($element[0]).find("a"));

	            for (var i = classList.length - 1; i >= 0; i--) {
	                var cls = classList[i];
	                if (!cls.startsWith("ng-")) {
	                    outer.removeClass(cls);
	                    inner.addClass(cls);
	                }
	            }
	        }
	    };
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfValidation = jfValidation;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var VALIDATION_MESSAGES = _interopRequire(__webpack_require__(49));

	function jfValidation() {
	    return {
	        scope: {
	            field: "=",
	            dictionary: "@",
	            validationsParams: "=",
	            dontPushDown: "="
	        },
	        controller: jfValidation,
	        controllerAs: "jfValidation",
	        bindToController: true,
	        templateUrl: "directives/jf_validation/jf_validation.html"
	    };
	}

	var jfValidation = (function () {
	    /* @ngInject */

	    jfValidation.$inject = ["JFrogUILibConfig"];
	    function jfValidation(JFrogUILibConfig) {
	        _classCallCheck(this, jfValidation);

	        this.JFrogUILibConfig = JFrogUILibConfig;
	    }

	    _createClass(jfValidation, {
	        $onInit: {
	            value: function $onInit() {
	                this.messages = VALIDATION_MESSAGES(this.dictionary, this.JFrogUILibConfig);
	            }
	        },
	        applyParams: {
	            value: function applyParams(msg) {

	                if (!this.validationsParams) {
	                    return msg;
	                }var regex = /\@\{(.*?)\}/g;

	                var matches = msg.match(regex);

	                for (var i = 0; matches && i < matches.length; i++) {
	                    var match = matches[i];
	                    var exec = regex.exec(match);
	                    var param = exec[1];
	                    var value = this.validationsParams[param];
	                    if (value) msg = msg.replace(match, value);
	                }

	                return msg;
	            }
	        }
	    });

	    return jfValidation;
	})();

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (name, JFrogUILibConfig) {
	    var customMessages = JFrogUILibConfig.getConfig().customValidationMessages;
	    if (customMessages) return angular.extend(angular.copy(commonMessages), customMessages[name]);else return commonMessages;
	};

	var commonMessages = {
	    required: "You must fill in this field",
	    unique: "This value must be unique",
	    validator: "This value is invalid",
	    email: "Please enter a valid email",
	    url: "Please enter a valid url",
	    number: "Please enter an Integer",
	    min: "Value too low",
	    max: "Value too high",
	    minlength: "Value too short",
	    maxlength: "Value too long",
	    invalidCron: "The cron expression is invalid",
	    pastCron: "The next run time is in the past",
	    uniqueId: "Key is already used",
	    name: "Name cannot be blank or contain /\\:|?*\"<>",
	    xmlName: "Name cannot be blank or contain spaces & special characters",
	    integerValue: "Value must be an integer number",
	    mustAddValueTolist: "You must add a value to list"
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfSidebar = jfSidebar;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfSidebarController = (function () {
		/* @ngInject */

		jfSidebarController.$inject = ["$scope", "$state", "$timeout", "$interval", "$window", "$rootScope", "JFrogEventBus"];
		function jfSidebarController($scope, $state, $timeout, $interval, $window, $rootScope, JFrogEventBus) {
			_classCallCheck(this, jfSidebarController);

			$rootScope.jfSidebar = this;

			this.trim = _.trim;

			this.currentTab = "Home";
			this.$state = $state;
			this.$timeout = $timeout;
			this.$interval = $interval;
			this.$window = $window;
			this.JFrogEventBus = JFrogEventBus;
			this.EVENTS = JFrogEventBus.getEventsDefinition();
			this.pinMenuStatus = JSON.parse(localStorage.pinMenu || "false");

			this.currentFocus = $(":focus");
			this.skip = false;

			this.menu = {
				"transition-duration": ".3s"
			};

			$scope.$on("$destroy", function () {
				$("body").off("keydown");
			});
		}

		_createClass(jfSidebarController, {
			$onInit: {
				value: function $onInit() {
					var _this = this;

					this.subMenuWidth = this.defaultSubMenuWidth || this.openAdminSize || "900px";
					this.defaultSubWidth = this.subMenuWidth;

					this.defaultSubMenuId = this.defaultSubMenuId || "admin";

					if (!this.driver) {
						console.error("jf-sidebar: No driver is provided");
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

					this._init();
				}
			},
			_init: {
				value: function _init() {
					var _this = this;

					this.pinMenuStatus ? this.menu.width = "200px" : this.menu.width = "55px";
					this.pinMenuStatus ? this.menu.transitionDelay = ".2s" : this.menu.transitionDelay = ".3s";

					this.$timeout(function () {
						return _this._trackResize();
					});

					$("body").on("keydown", function (e) {

						if (_this.driver.onKeyDown) {
							_this.driver.onKeyDown(e);
						}

						// Ctrl + right arrow to open the default sub menu
						if (e.keyCode === 39 && e.ctrlKey && e.altKey && $(".sub-menu").length) {
							_this.$timeout(function () {
								var defaultItem = _.find(_this.menuItems, { id: _this.defaultSubMenuId });
								if (defaultItem) {
									_this._setExtendedMenu(defaultItem);
								}
								_this.openSubMenu();
							});
							e.preventDefault();
						}

						// ESC click or Ctrl+left to close default sub menu
						if ((e.keyCode === 27 || e.keyCode === 37 && e.ctrlKey && e.altKey) && _this.menu.width === _this.subMenuWidth && $(".sub-menu").length > 0) {
							_this.$timeout(function () {
								_this.menuSearchQuery = "";
								$("#menuSearchQuery").blur();
								_this.menu.width = _this.defaultWidth();
								_this._updateTabIndex();
							});
							e.preventDefault();
						}
					});
				}
			},
			isCollapsed: {
				value: function isCollapsed() {
					return this.menu.width === "55px";
				}
			},
			mouseOverMenu: {
				value: function mouseOverMenu() {
					var _this = this;

					if (this.mouseIsOver) {
						return;
					}
					this.mouseIsOver = true;

					if (this.menu.width === this.subMenuWidth && $(".menu-item:hover").length && $("a.menu-item.extended-item:hover").length < 1) {
						if (!angular.isDefined(this.closeSubMenuDelay) && !$(".sub-menu:hover").length) {
							this.closeSubMenuDelay = this.$timeout(function () {
								_this.closeSubMenu();
								delete _this.closeSubMenuDelay;
							}, 300);
						}
					} else if (this.menu.width != "200px" && !$(".pin-menu:hover").length && $(".sub-menu:hover").length < 1) {
						// if menu isn't open
						if (!angular.isDefined(this.openMenu)) {
							this.openMenu = this.$timeout(function () {
								var widthToOpen = $(".sub-menu").length > 0 && $("a.menu-item.extended-item:hover").length ? _this.subMenuWidth : "200px";
								if (($(".sub-menu:hover").length || $(".menu-item.extended-item:hover").length) && angular.isDefined(_this.openMenu)) {
									_this.$timeout.cancel(_this.openMenu);
									delete _this.openMenu;
									return;
								}
								_this._updateMenuObject(widthToOpen, ".3s", "0s");
							}, 2000);
						}
					}
				}
			},
			mouseLeaveMenu: {
				value: function mouseLeaveMenu(e) {
					if (e && e.toElement) {
						if ($(e.toElement).hasClass("tooltipster-content") || $(e.toElement.parentElement).hasClass("tooltipster-arrow")) {

							return;
						}
					}

					this.mouseIsOver = false;
					if (this.menu.width != this.subMenuWidth) {
						// if sub menu menu isn't open
						this._updateMenuObject(this.defaultWidth(), ".3s");
					}
					this.closeSubMenu();
					this._openMenuStop();
					this._subMenuDelayStop();
				}
			},
			subMenuOver: {
				value: function subMenuOver() {
					if (angular.isDefined(this.subMenuItemDelayTimer)) {
						this.$timeout.cancel(this.subMenuItemDelayTimer);
						delete this.subMenuItemDelayTimer;
					}

					if (angular.isDefined(this.closeSubMenuDelay)) {
						this.$timeout.cancel(this.closeSubMenuDelay);
						delete this.closeSubMenuDelay;
					}
				}
			},
			_updateMenuObject: {
				value: function _updateMenuObject(width) {
					var duration = arguments[1] === undefined ? "0s" : arguments[1];
					var delay = arguments[2] === undefined ? "0s" : arguments[2];

					this.menu = {
						width: width,
						"transition-duration": duration,
						"transition-delay": delay
					};
				}
			},
			isCurrentTab: {
				value: function isCurrentTab(tab) {
					return this.currentTab === tab.label;
				}
			},
			setCurrentTab: {
				value: function setCurrentTab(tab) {
					this.currentTab === tab.label ? this.currentTab = "" : this.currentTab = tab.label;
				}
			},
			refreshMenu: {
				value: function refreshMenu() {
					this.menuItems = this._getMenuItems();
					this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
				}
			},
			goToState: {
				value: function goToState(item) {
					if (this.driver.onBeforeStateSwitch) {
						this.driver.onBeforeStateSwitch(item);
					}

					this.$state.go(item.state, item.stateParams);
				}
			},
			_getMenuItems: {
				value: function _getMenuItems() {
					return this.driver.getMenuItems ? this.driver.getMenuItems() : [];
				}
			},
			defaultWidth: {
				value: function defaultWidth() {
					return this.pinMenuStatus ? "200px" : "55px";
				}
			},
			pinMenu: {
				value: function pinMenu() {
					this.pinMenuStatus = !this.pinMenuStatus;
					localStorage.pinMenu = this.pinMenuStatus;
					if (angular.isDefined(this.openMenu)) {
						this._openMenuStop();
					}
					this.menu.transitionDelay = "0s";
					this.menu.width = this.defaultWidth();
					//if (!this.pinMenuStatus) {
					//    // close menu - [block screen?]
					//}
					this._trackResize();
				}
			},
			_trackResize: {
				value: function _trackResize() {
					var _this = this;

					if (this.trackResizeInterval) {
						this.$interval.cancel(this.trackResizeInterval);
					}
					var origWidth = parseInt($("#jf-content").css("width"));
					var lastWidth = origWidth;
					var noChangeLoops = 0;
					var resizeEvent = document.createEvent("Event");
					resizeEvent.initEvent("resize", false, true);
					this.trackResizeInterval = this.$interval(function () {
						var currWidth = parseInt($("#jf-content").css("width"));
						if (currWidth === lastWidth) {
							noChangeLoops++;
						} else {
							noChangeLoops = 0;
						}
						if (noChangeLoops >= 20) {
							_this.$interval.cancel(_this.trackResizeInterval);
							delete _this.trackResizeInterval;
						}

						lastWidth = currWidth;

						_this.$timeout(function () {
							try {
								window.dispatchEvent(new Event("resize"));
							} catch (e) {
								window.dispatchEvent(resizeEvent);
							}
							_this.JFrogEventBus.dispatch(_this.EVENTS.SIDEBAR_SIZE_CHANGE);
						});
					}, 1);
				}
			},
			itemClick: {
				value: function itemClick(item) {
					var _this = this;

					if (this.subMenuCloseDelay) {
						this.$timeout.cancel(this.subMenuCloseDelay);
						delete this.subMenuCloseDelay;
					}

					if (!item.children) {
						//            delete this.openSub;
						this.closeSubMenu(0, true);
						if (this.menu.width === "55px" || this.menu.width === "200px") {
							this._openMenuStop();
							this._subMenuDelayStop();
						}
						if (!item.isDisabled) {
							this.$timeout(function () {
								return _this.goToState(item);
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
									_this.itemClick(item);
								}, 500);
							}
						}
					}
				}
			},
			_setExtendedMenu: {
				value: function _setExtendedMenu(item) {
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
				}
			},
			openSubMenu: {
				value: function openSubMenu() {
					var _this = this;

					var delay = arguments[0] === undefined ? false : arguments[0];

					if (this.subMenuCloseDelay) {
						this.$timeout.cancel(this.subMenuCloseDelay);
						delete this.subMenuCloseDelay;
					}

					if ($(".sub-menu").length > 0) {
						this._openMenuStop();
						this._subMenuDelayStop();

						if ($(":focus").length && $(":focus")[0].id != "admin" && $(":focus")[0].id != "menuSearchQuery") {
							this.currentFocus = $(":focus");
						}

						if (delay && !angular.isDefined(this.subMenuDelay)) {
							this.subMenuDelay = this.$timeout(function () {
								_this.openSubMenu();
								_this._setSubMenuFocus();
								_this._subMenuDelayStop();
								return;
							}, 2000);
						} else {
							if (!this.skip && this.menu.width !== this.subMenuWidth) {
								this._updateMenuObject(this.subMenuWidth, "0.3s", "0s");
								this.$timeout(function () {
									return _this._setSubMenuFocus();
								});
								if (angular.isDefined(this.subMenuDelay)) {
									this._subMenuDelayStop();
								}
							}
						}
						this._updateTabIndex();
					}
				}
			},
			onMouseOverSimpleItem: {
				value: function onMouseOverSimpleItem(item) {
					this.closeSubMenu(1800, true, true);
				}
			},
			onMouseOverExtendedItem: {
				value: function onMouseOverExtendedItem(item) {
					var _this = this;

					var delay = arguments[1] === undefined ? true : arguments[1];

					if (!this.isSubMenuOpen()) {
						this._setExtendedMenu(item);
						this.openSubMenu(delay);
					} else {
						if (this.openSub !== item) {
							this.closeSubMenu(0, true, true);
							this._subMenuDelayStop();
							this.$timeout(function () {
								_this.onMouseOverExtendedItem(item, false);
							}, 500);
						} else {
							this.openSubMenu(true);
						}
					}
				}
			},
			onMouseLeaveExtendedItem: {
				value: function onMouseLeaveExtendedItem(e) {
					this._subMenuDelayStop();
					this.subMenuItemDelay = true;
					this.closeSubMenu(1800, true, true);
				}
			},
			isSubMenuOpen: {
				value: function isSubMenuOpen() {
					return $("#jf-main-nav").css("width") === this.subMenuWidth;
				}
			},
			clickOffMenu: {
				value: function clickOffMenu() {
					if ($(".sub-menu").length > 0 && !$(".menu-item:hover").length && (this.menu.width != "55px" || !this.pinMenuStatus && this.menu.width != "200px")) {
						// TODO: Fix this rule. shuldn't happen if menu is 55px or 200 with pinned on
						if (this.menu.width != "55px" && !$(".sub-menu:hover").length) {
							this._updateMenuObject(this.defaultWidth(), ".3s");
							this.menuSearchQuery = "";
							this._updateTabIndex();
						}
					}
				}
			},
			closeSubMenu: {
				value: function closeSubMenu(delay) {
					var _this = this;

					var force = arguments[1] === undefined ? false : arguments[1];
					var expand = arguments[2] === undefined ? false : arguments[2];

					if (delay) {
						if (this.subMenuCloseDelay) {
							this.$timeout.cancel(this.subMenuCloseDelay);
							delete this.subMenuCloseDelay;
						}
						this.subMenuCloseDelay = this.$timeout(function () {
							if (_this.subMenuCloseDelay) {
								_this.$timeout.cancel(_this.subMenuCloseDelay);
								delete _this.subMenuCloseDelay;
							}
							_this.closeSubMenu(0, force, expand);
						}, delay);
						return;
					}

					if (!force && ($(".sub-menu:hover").length || $(".menu-item.extended-item:hover").length || ($(".sub-menu").find("a").is(":focus") || $("#menuSearchQuery").is(":focus") && $("#menuSearchQuery").val().length > 0))) {

						return;
					} else if (this.subMenuItemDelay) {
						this.subMenuItemDelayTimer = this.$timeout(function () {
							_this.subMenuItemDelay = false;
							delete _this.subMenuItemDelayTimer;
							if (!$(".sub-menu:hover").length && !$(".tooltipster-content:hover").length && !$(".tooltipster-arrow:hover").length) {
								_this.closeSubMenu(delay, force, expand);
							}
						}, 100);
						return;
					} else {
						if (expand && $("#jf-main-nav:hover").length) {
							this.menu.width = "200px";
						} else {
							this.menu.width = this.defaultWidth();
						}

						if (this.currentFocus.length) {
							this.currentFocus[0].focus();
						}
						$("#menuSearchQuery").blur();
						$(".masonry").scrollTop(0);
						this.menuSearchQuery = "";
						this._updateTabIndex();
					}
				}
			},
			_openMenuStop: {
				value: function _openMenuStop() {
					this.$timeout.cancel(this.openMenu);
					delete this.openMenu;
				}
			},
			_subMenuDelayStop: {
				value: function _subMenuDelayStop() {
					this.$timeout.cancel(this.subMenuDelay);
					delete this.subMenuDelay;
				}
			},
			_setSubMenuFocus: {
				value: function _setSubMenuFocus() {
					if (!$(".sub-menu:hover").length) {
						$("#menuSearchQuery").focus();
						$("#jf-main-nav").scrollLeft(0);
					}
				}
			},
			_updateTabIndex: {
				value: function _updateTabIndex() {
					if (this.menu.width != this.subMenuWidth) {
						$(".sub-menu").find("a,input").attr("tabindex", -1);
						$(".sub-menu").find("a,input").blur();
					} else {
						var highlighted = $(".sub-menu").find("a.highlight");
						if (highlighted.length) {
							$(".sub-menu").find("input").removeAttr("tabindex");
							$(".sub-menu").find("a.highlight").removeAttr("tabindex");
							$(".sub-menu").find("a:not(.highlight)").attr("tabindex", -1);
						} else {
							$(".sub-menu").find("a,input").removeAttr("tabindex");
						}
					}
					$("#jf-main-nav").scrollLeft(0);
				}
			},
			searchHighlightCheck: {
				value: function searchHighlightCheck(menuItem) {
					if (this.menuSearchQuery) {
						var string = menuItem.toLowerCase().replace(/ /g, "");
						var searchstring = this.menuSearchQuery.toLowerCase().replace(/ /g, "");

						if (_.includes(string, searchstring)) {
							return true;
						} else {
							return false;
						}
					}
				}
			},
			checkForSingleChoice: {
				value: function checkForSingleChoice() {
					$("#jf-main-nav").scrollLeft(0);
					this.$timeout(function () {
						$(".single-choice").removeClass("single-choice");
						var elem = $(".masonry").find(".highlight");
						if (elem.length == 1) {
							elem.addClass("single-choice");
						}
					}, 50);
				}
			},
			chooseSingleChoice: {
				value: function chooseSingleChoice() {
					var elem = $(".single-choice");
					if (elem.length) {
						if (this.driver.onBeforeStateSwitch) {
							this.driver.onBeforeStateSwitch({ state: elem.data("state"), stateParams: elem.data("params") });
						}
						this.$state.go(elem.data("state"), elem.data("params"));
						this.menuSearchQuery = "";
						this._updateMenuObject(this.defaultWidth(), ".3s");
						this._updateTabIndex();
					} else {
						return false;
					}
				}
			},
			subMenuItemClick: {
				value: function subMenuItemClick(subItem) {
					var _this = this;

					this.menuSearchQuery = "";
					this._updateMenuObject(this.defaultWidth(), ".3s");
					this._updateTabIndex();
					this.skip = true;
					this.$timeout(function () {
						_this.skip = false;
					}, 400);

					if (this.driver.onBeforeStateSwitch) {
						this.driver.onBeforeStateSwitch(subItem);
					}
					this.$state.go(subItem.state, subItem.stateParams);
				}
			},
			navigateInMenu: {
				value: function navigateInMenu(e) {
					var key = e.keyCode;
					var $allHighlighted = $(".sub-menu").find(".highlight");
					var $allFocusableItems = $(".sub-menu").find("a:focusable");

					switch (key) {
						case 38:
							// UP
							if ($(e.currentTarget).is(":input")) {
								return;
							}
							if (!$(".highlight").length) {
								if (!$allFocusableItems.length) {
									// if no available choices at all (not-active) return
									return;
								} else {
									$allFocusableItems.eq($.inArray($(":focus")[0], $allFocusableItems) - 1).focus();
								}
							} else {
								// if highlighted
								$allHighlighted.eq($.inArray($(".highlight:focus")[0], $allHighlighted) - 1).focus();
							}
							break;
						case 40:
							// DOWN
							if ($(e.currentTarget).is(":input")) {
								if ($allHighlighted.length) {
									$allHighlighted[0].focus();
								} else {
									$(".sub-menu").find("a").first(":focusable").focus();
								}
							} else {
								if (!$(".highlight").length) {
									if (!$allFocusableItems.length) {
										// if no available choices at all (not-active) return
										return;
									} else if ($.inArray($(":focus")[0], $allFocusableItems) === $allFocusableItems.length - 1) {
										// if last item go to first item
										$allFocusableItems[0].focus();
									} else {
										$allFocusableItems.eq($.inArray($(":focus")[0], $allFocusableItems) + 1).focus();
									}
								} else {
									// if highlighted
									if ($.inArray($(".highlight:focus")[0], $allHighlighted) === $allHighlighted.length - 1) {
										$allHighlighted[0].focus();
									} else {
										$allHighlighted.eq($.inArray($(".highlight:focus")[0], $allHighlighted) + 1).focus();
									}
								}
							}
							break;
						case 8:
							//Backspace
							if (this.focusedElement && !$("#menuSearchQuery").is(":focus")) {
								e.preventDefault();
								return;
							}
							break;
					}
				}
			},
			isCurrentItem: {
				value: function isCurrentItem(subItem) {
					var result = _.contains(this.$state.current.name, subItem.state);
					if (result && subItem.stateParams) {
						var relevantParams = _.pick(this.$state.params, Object.keys(subItem.stateParams));
						result = angular.equals(relevantParams, subItem.stateParams);
					}
					return result;
				}
			},
			highLightOnState: {
				value: function highLightOnState(statesArr) {
					if (!statesArr) {
						return false;
					}
					var currentStateName = this.$state.current.name;

					return statesArr.indexOf(currentStateName) > -1;
				}
			}
		});

		return jfSidebarController;
	})();

	function jfSidebar() {
		return {
			scope: {
				driver: "=",
				footerTemplate: "@",
				footerTemplateHtml: "@",
				openAdminSize: "@?", //left here for backward compatibility, use defaultSubMenuWidth
				defaultSubMenuWidth: "@?",
				noSearchBox: "@?",
				defaultSubMenuId: "@"
			},
			controller: jfSidebarController,
			bindToController: true,
			controllerAs: "jfSidebar",
			templateUrl: "directives/jf_sidebar/jf_sidebar.html"
		};
	}

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfMultiDropdown = jfMultiDropdown;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfMultiDropdownController = (function () {
		/* @ngInject */

		jfMultiDropdownController.$inject = ["$scope", "$filter", "$element"];
		function jfMultiDropdownController($scope, $filter, $element) {
			var _this = this;

			_classCallCheck(this, jfMultiDropdownController);

			this.$scope = $scope;
			this.$element = $element;

			this.filter = $filter("filter");
			this.opened = false;

			this.singleSelectionIndex = -1;

			this.handleOutsideClick();

			this.$scope.$watch("jfMultiDropdown.items", function (newVal, oldVal) {
				if (newVal) {
					_this.sortItems();
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

			this.$scope.$watch("jfMultiDropdown.dropdownOpened", function (val) {
				if (val === true) {
					if (!_this.items) {
						return;
					}
					_this.opened = true;
					_this.filterText = "";
				} else if (val === false) {
					_this.opened = false;
					_this.filterText = "";
				} else {}
			});
		}

		_createClass(jfMultiDropdownController, {
			sendOpenStateChange: {
				value: function sendOpenStateChange() {
					if (this.onOpenStateChange) {
						this.onOpenStateChange({ opened: this.opened });
					}
				}
			},
			handleOutsideClick: {
				value: function handleOutsideClick() {
					var _this = this;

					var handler = function (e) {
						var outside = !$(e.target).parents(".jf-multi-dropdown").length || $(e.target).parents(".jf-multi-dropdown")[0] !== $(_this.$element).find(".jf-multi-dropdown")[0];
						if (outside) {
							_this.opened = false;
							_this.sendOpenStateChange();
							_this.sortItems();
						}
						_this.$scope.$apply();
					};
					$(document).on("click", handler);
					this.$scope.$on("$destroy", function () {
						$(document).off("click", handler);
					});
				}
			},
			getSelectedForTitle: {
				value: function getSelectedForTitle() {
					var selected = _.filter(this.items, function (item) {
						return item.isSelected;
					});
					selected = _.map(selected, function (s) {
						return s.selectedText || s.text;
					});
					return selected.join(", ");
				}
			},
			onClick: {
				value: function onClick() {
					if (this.disabled !== true) {
						if (!this.items) {
							return;
						}
						this.opened = !this.opened;
						this.sendOpenStateChange();
						if (!this.opened) {
							this.sortItems();
						}
						this.filterText = "";
					}
				}
			},
			onSingleSelection: {
				value: function onSingleSelection() {
					var _this = this;

					this.items.forEach(function (item) {
						if (!item.disabled) {
							item.isSelected = false;
						}
					});
					var selected = _.find(this.items, function (item) {
						return item.$id == _this.singleSelectionIndex;
					});
					selected.isSelected = true;
					this.applyChanges();
				}
			},
			getSelectedCount: {
				value: function getSelectedCount() {
					var selected = _.filter(this.items, function (item) {
						return item.isSelected && !item.isAllToggleCheckbox;
					});
					return selected.length;
				}
			},
			applyChanges: {
				value: function applyChanges() {
					if (this.onChange) {
						this.onChange();
					}
				}
			},
			selectedItems: {
				value: function selectedItems() {
					var selected = _.filter(this.items, function (item) {
						return item.isSelected;
					});
					selected = _.map(selected, "text");
					return selected;
				}
			},
			sortItems: {
				value: function sortItems() {
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
					}), "text");
					var unSelected = this.noSort ? _.filter(this.items, function (item) {
						return !item.isSelected;
					}) : _.sortBy(_.filter(this.items, function (item) {
						return !item.isSelected;
					}), "text");
					this.lastSelectedIndex = selected.length - 1;
					var combined = selected.concat(unSelected);
					this.items.splice.apply(this.items, [0, this.items.length].concat(combined));
				}
			},
			selectAll: {
				value: function selectAll() {
					if (this.disabled) {
						return;
					}this.filter(this.items, this.filterText).forEach(function (item) {
						if (!item.disabled) {
							item.isSelected = true;
						}
					});
					this.applyChanges();
				}
			},
			unSelectAll: {
				value: function unSelectAll() {
					if (this.disabled) {
						return;
					}this.filter(this.items, this.filterText).forEach(function (item) {
						if (!item.disabled) {
							item.isSelected = false;
						}
					});
					this.applyChanges();
					this.singleSelectionIndex = -1;
				}
			},
			onSelection: {
				value: function onSelection() {
					this.applyChanges();
				}
			},
			clearSelection: {
				value: function clearSelection() {
					if (this.disabled) {
						return;
					}if (this.textInputs) {
						_.forEach(this.items, function (item) {
							item.inputTextValue = "";
						});
					}
					this.unSelectAll();
				}
			}
		});

		return jfMultiDropdownController;
	})();

	function jfMultiDropdown() {
		return {
			controller: jfMultiDropdownController,
			controllerAs: "jfMultiDropdown",
			bindToController: true,
			scope: {
				title: "@",
				label: "@",
				filterPlaceholder: "@",
				noItemsMessage: "@",
				items: "=",
				disabled: "=?",
				onChange: "&?",
				noSort: "=?",
				onOpenStateChange: "&?",
				dropdownOpened: "=",
				showSelected: "@",
				showLabelCounter: "@",
				noFilter: "=?",
				noSelectedFirst: "=?",
				singleSelection: "=?",
				textInputs: "<?",
				borderless: "<?"
			},
			templateUrl: "directives/jf_multi_dropdown/jf_multi_dropdown.html"
		};
	}

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfRadioButton = jfRadioButton;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfRadioButtonController = function jfRadioButtonController($element, $transclude, $timeout, $scope) {
	    _classCallCheck(this, jfRadioButtonController);

	    $transclude(function (clone) {
	        $timeout(function () {
	            $element.find("label").prepend(clone);
	        }, 0, false);
	    });

	    $scope.onClickTemplate = function () {
	        $timeout(function () {
	            $($element).parent().find("input[type=radio]").prop("checked", false);
	            $($element).find("input[type=radio]").prop("checked", true);
	        });
	    };
	};

	function jfRadioButton() {
	    return {
	        restrict: "E",
	        transclude: {
	            template: "?radioTemplate"
	        },
	        scope: {
	            text: "@?",
	            helper: "@?"
	        },
	        controller: jfRadioButtonController,
	        templateUrl: "directives/jf_radio_button/jf_radio_button.html"
	    };
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	jfWidgetsLayout.$inject = ["recursiveDirective"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfWidgetsLayout = jfWidgetsLayout;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MILLISECONDS_MULTI = 1000;
	var ANIMATION_DELAY = 1;

	function jfWidgetsLayout(recursiveDirective) {
	    "ngInject";
	    return {
	        controller: jfWidgetsLayoutController,
	        controllerAs: "jfWidgetsLayout",
	        bindToController: true,
	        scope: {
	            widgets: "=",
	            layout: "=",
	            options: "=",
	            parentCell: "=?",
	            footerText: "="
	        },
	        templateUrl: "directives/jf_widgets_layout/jf_widgets_layout.html",
	        compile: function (element) {
	            return recursiveDirective.compile(element);
	        }
	    };
	}

	var jfWidgetsLayoutController = (function () {
	    /* @ngInject */

	    jfWidgetsLayoutController.$inject = ["$scope", "$rootScope", "$compile", "$timeout", "$q", "$templateRequest", "$sce", "$injector", "$element"];
	    function jfWidgetsLayoutController($scope, $rootScope, $compile, $timeout, $q, $templateRequest, $sce, $injector, $element) {
	        _classCallCheck(this, jfWidgetsLayoutController);

	        this.$q = $q;
	        this.$sce = $sce;
	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.$element = $element;
	        this.$injector = $injector;
	        this.$timeout = $timeout;
	        this.$compile = $compile;
	        this.$templateRequest = $templateRequest;
	        this.ANIM_DURATION = 0.5;
	    }

	    _createClass(jfWidgetsLayoutController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.setDefaultOptions();

	                var onChange = function (newval, oldval) {
	                    if (!newval) return;
	                    _this.transformLayout();
	                    _this.updateFlatCells();
	                    _this.updateCss();
	                    _this.updateDragLines();
	                    if (_this.recompile) {
	                        _this.recompile = false;
	                        Object.keys(_this.widgets).forEach(function (id) {
	                            return delete _this.widgets[id].$compiled;
	                        });
	                        _this.templatesLoadStarted = false;
	                        _this.templatesLoaded = false;
	                        _this.$timeout(function () {
	                            return _this.compileElements();
	                        });
	                    } else if (!_this.templatesLoadStarted || _this.templatesLoaded) {
	                        Object.keys(_this.widgets).forEach(function (id) {
	                            if (_this._isWidgetInUse(id)) delete _this.widgets[id].$compiled;
	                        });
	                        _this.loadTemplates().then(function () {
	                            _this.$timeout(function () {
	                                return _this.compileElements();
	                            });
	                        });
	                    }
	                };
	                this.$scope.$watch("jfWidgetsLayout.options.editMode", function (editMode) {
	                    _this.editMode = editMode === undefined ? false : editMode;
	                    _this.subOptions.editMode = _this.editMode;

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

	                this.$scope.$watch("jfWidgetsLayout.layout", onChange);

	                this.$scope.$watch("jfWidgetsLayout.widgets", function (widgets) {
	                    if (widgets) {
	                        _this.widgetKeys = Object.keys(widgets);
	                    }
	                });

	                if (this.options.parent && this.parentCell) {
	                    this.parentCell.$$childLayout = this;
	                }

	                this.$scope.$on("$destroy", function () {
	                    if (_this.scopes) _this.scopes.forEach(function (s) {
	                        return s.$destroy();
	                    });
	                });
	            }
	        },
	        setDefaultOptions: {
	            value: function setDefaultOptions() {
	                if (!this.options) this.options = {};
	                if (!this.options.padding) this.options.padding = 10;
	                if (!this.options.minHeight) this.options.minHeight = "initial";
	                if (!this.options.backColor) this.options.backColor = "transparent";
	                if (this.options.allowResize === undefined) this.options.allowResize = false;
	                if (this.options.outerPadding === undefined) this.options.outerPadding = true;
	                if (this.options.editMode === undefined) this.options.editMode = false;

	                this.subOptions = _.cloneDeep(this.options);
	                this.subOptions.minHeight = "initial";
	                this.subOptions.isSub = true;
	                this.subOptions.parent = this;
	            }
	        },
	        transformLayout: {
	            value: function transformLayout() {
	                var _this = this;

	                var _getSizeFromCell = function (cell) {
	                    var i1 = cell.indexOf("%");
	                    var i2 = cell.indexOf("px");
	                    if (i1 !== -1) return cell.substr(0, i1);
	                    if (i2 !== -1) return cell.substr(0, i2);
	                };
	                var _getWidgetNameFromCell = function (cell) {
	                    var i = cell.indexOf("@");
	                    if (i !== -1) return cell.substr(i + 1);
	                };
	                var _getSubLayoutFromCell = function (cell) {
	                    var i = cell.indexOf("#");
	                    if (i !== -1) return cell.substr(i + 1);
	                };

	                this.transformedLayout = [];

	                var theLayout = this.layout.main || this.layout;

	                if (theLayout.rows) {
	                    this.mainAxis = "rows";
	                } else if (theLayout.columns) {
	                    this.mainAxis = "columns";
	                } else {
	                    console.log("Layout Format Error! Must have rows or columns.");
	                    return;
	                }

	                theLayout[this.mainAxis].forEach(function (rowOrColumn) {
	                    var tRowOrColumn = [];
	                    rowOrColumn.cells.forEach(function (cell) {
	                        var height = _this.mainAxis === "rows" ? rowOrColumn.size : _getSizeFromCell(cell);
	                        var width = _this.mainAxis === "columns" ? rowOrColumn.size : _getSizeFromCell(cell);
	                        var subLayoutName = _getSubLayoutFromCell(cell);
	                        var tCell = {
	                            widget: _getWidgetNameFromCell(cell),
	                            subLayout: subLayoutName ? _this.layout[subLayoutName] : undefined,
	                            percentWidth: parseInt(width),
	                            percentHeight: parseInt(height)
	                        };
	                        if (rowOrColumn["new"]) {
	                            _this.$timeout(function () {
	                                _this.splitCell(tCell, _this.mainAxis === "columns" ? "v" : "h");
	                            });
	                        }
	                        tRowOrColumn.push(tCell);
	                    });
	                    _this.transformedLayout.push(tRowOrColumn);
	                });

	                this.normalizeSizes();
	            }
	        },
	        updateFlatCells: {
	            value: function updateFlatCells() {
	                var _this = this;

	                this.flatCells = [];
	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    rowOrColumn.forEach(function (cell) {
	                        _this.flatCells.push(cell);
	                    });
	                });
	            }
	        },
	        loadTemplates: {
	            value: function loadTemplates() {
	                var _this = this;

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
	                        var widget = _this.widgets[layoutDef.widget];
	                        if (widget) {
	                            if (widget.templateUrl && !widget.template) {
	                                fired++;
	                                _this.$templateRequest(widget.templateUrl).then(function (template) {
	                                    if (!widget.$templateLoaded) {
	                                        widget.template = _this.$sce.trustAsHtml(template);
	                                        widget.$templateLoaded = true;
	                                    }
	                                })["finally"](function () {
	                                    completed++;
	                                    //                            console.log('completed ' + completed + ' out of ' + fired);
	                                    if (fired === completed) {
	                                        _this.templatesLoaded = true;
	                                        defer.resolve();
	                                    }
	                                });
	                            } else if (widget.template) {
	                                if (!widget.$templateLoaded) {
	                                    widget.template = _this.$sce.trustAsHtml(widget.template);
	                                    widget.$templateLoaded = true;
	                                }
	                            }
	                        }
	                    });
	                });

	                if (!fired) defer.resolve();
	                return defer.promise;
	            }
	        },
	        updateCss: {
	            value: function updateCss() {
	                var _this = this;

	                var oldRules = _.cloneDeep(this.cssRules);
	                this.cssRules = {};

	                var currentX = 0,
	                    currentY = 0;
	                var cssRunningId = 0;

	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    if (_this.mainAxis === "rows") currentX = 0;else if (_this.mainAxis === "columns") currentY = 0;
	                    var topSize = 0;
	                    rowOrColumn.forEach(function (layoutDef) {
	                        var widget = _this.widgets[layoutDef.widget];
	                        layoutDef.cssId = cssRunningId;
	                        if (!widget) {
	                            layoutDef.widget = "$$widget" + cssRunningId;
	                        }
	                        cssRunningId++;

	                        _this.cssRules[layoutDef.cssId] = {
	                            top: currentY + "%",
	                            left: currentX + "%",
	                            bottom: 100 - (currentY + layoutDef.percentHeight) + "%",
	                            right: 100 - (currentX + layoutDef.percentWidth) + "%",
	                            padding: _this.options.padding / 2 + "px",
	                            opacity: oldRules && oldRules[layoutDef.cssId] && oldRules[layoutDef.cssId].opacity !== undefined ? oldRules[layoutDef.cssId].opacity : 1
	                        };

	                        if (_this.mainAxis === "rows") {
	                            currentX += layoutDef.percentWidth;
	                            if (layoutDef.percentHeight > topSize) topSize = layoutDef.percentHeight;
	                        } else if (_this.mainAxis === "columns") {
	                            currentY += layoutDef.percentHeight;
	                            if (layoutDef.percentWidth > topSize) topSize = layoutDef.percentWidth;
	                        }
	                    });
	                    if (_this.mainAxis === "rows") currentY += topSize;else if (_this.mainAxis === "columns") currentX += topSize;
	                });

	                var pad = this.options.isSub ? 0 : this.options.outerPadding ? this.options.padding / 2 : -this.options.padding / 2;
	                this.padderCss = {
	                    top: pad + "px",
	                    left: pad + "px",
	                    bottom: pad + "px",
	                    right: pad + "px"
	                };

	                this.containerCss = {
	                    "min-height": this.options.minHeight + "px",
	                    "background-color": this.options.backColor,
	                    overflow: this.options.isSub && this.editMode ? "visible" : "hidden"
	                };

	                if (this.options.parent) this.options.parent.updateCss();
	            }
	        },
	        updateDragLines: {
	            value: function updateDragLines() {
	                this.dragLines = [];
	                for (var key in this.cssRules) {
	                    var rules = this.cssRules[key];
	                    var _top = parseFloat(rules.top);
	                    var bottom = parseFloat(rules.bottom);
	                    var left = parseFloat(rules.left);
	                    var right = parseFloat(rules.right);
	                    var cell = _.find(this.flatCells, { cssId: parseInt(key) });
	                    this.addLinesFromRect({
	                        x1: left,
	                        y1: _top,
	                        x2: 100 - right,
	                        y2: 100 - bottom,
	                        cssRules: rules,
	                        widget: cell.widget
	                    });
	                    cell.percentWidth = 100 - right - left;
	                    cell.percentHeight = 100 - bottom - _top;
	                }
	            }
	        },
	        compileElements: {
	            value: function compileElements() {
	                var _this = this;

	                var elems = $(".compile-children");
	                if (this.scopes) this.scopes.forEach(function (s) {
	                    return s.$destroy();
	                });
	                this.scopes = [];
	                for (var i = 0; i < elems.length; i++) {
	                    var elem = $(elems[i]);
	                    var widgetId = elem.prop("id");
	                    if (this._isWidgetInUse(widgetId)) {
	                        (function () {
	                            var widget = _this._getWidgetById(widgetId);
	                            var scope = _this.$rootScope.$new();

	                            _this.scopes.push(scope);

	                            var children = elem.children();

	                            if (widget.model) {
	                                _.extend(scope, widget.model);
	                            }
	                            if (_this.options.sharedModel) {
	                                _.extend(scope, _this.options.sharedModel);
	                            }
	                            if (!widget.controller) {
	                                widget.controller = function Ctrl() {
	                                    _classCallCheck(this, Ctrl);
	                                };
	                            }

	                            widget.controller.prototype.$widgetLayoutManager = _this;

	                            var controllerInstance = _this.$injector.instantiate(widget.controller);

	                            controllerInstance.$element = children[0];
	                            controllerInstance.$layoutObject = _this._getLayoutByWidget(elem.prop("id"));
	                            controllerInstance.$scope = scope;
	                            controllerInstance.$widgetObject = widget;

	                            var controllerObject = {};
	                            controllerObject[widget.controllerAs || "ctrl"] = controllerInstance;

	                            _.extend(scope, controllerObject);

	                            if (controllerInstance.$onInit) controllerInstance.$onInit();

	                            //We compile only first child, templates should have only one root element!
	                            var rootChild = $(children[0]);
	                            if (!rootChild.prop("compiled")) {
	                                _this.$compile(rootChild)(scope);
	                                rootChild.prop("compiled", true);
	                            }

	                            _this.$timeout(function () {
	                                widget.$compiled = true;
	                            });
	                        })();
	                    }
	                }
	            }
	        },
	        _getWidgetById: {
	            value: function _getWidgetById(id) {
	                var widget = this.widgets[id];
	                return widget;
	            }
	        },
	        _getLayoutByWidget: {
	            value: function _getLayoutByWidget(id) {
	                var layout = undefined;

	                for (var i in this.transformedLayout) {
	                    var rowOrColumn = this.transformedLayout[i];
	                    layout = _.find(rowOrColumn, { widget: id });
	                    if (layout) break;
	                }

	                return layout;
	            }
	        },
	        _isWidgetInUse: {
	            value: function _isWidgetInUse(widgetId) {
	                return !!_.find(this.flatCells, { widget: widgetId });
	            }
	        },
	        _getPrecPoint: {
	            value: function _getPrecPoint(e) {
	                var container = $(this.$element).find(".jf-widgets-layout-container");

	                var containerWidth = container.innerWidth();
	                var containerHeight = container.innerHeight();

	                var mouseX = e.pageX - container.offset().left;
	                var mouseY = e.pageY - container.offset().top;

	                var xprec = Math.round(mouseX / containerWidth * 100);
	                var yprec = Math.round(mouseY / containerHeight * 100);

	                return { x: xprec, y: yprec };
	            }
	        },
	        onMouseMove: {
	            value: function onMouseMove(e) {

	                if (!this.options.allowResize && !this.editMode) {
	                    return;
	                }if (this.draggingLines) {
	                    this.onDrag(e);
	                    e.preventDefault();
	                } else {

	                    var container = $(this.$element).find(".jf-widgets-layout-container");

	                    var prec = this._getPrecPoint(e);
	                    this.closestLines = this.getClosestLines(prec.x, prec.y);
	                    if (this.closestLines.length) {
	                        var directions = _.map(this.closestLines, "cssRelevantRule");

	                        var cursor = undefined;
	                        if (_.includes(directions, "right") && _.includes(directions, "left") && _.includes(directions, "top") && _.includes(directions, "bottom")) {
	                            cursor = "all-scroll";
	                            this.setSubIsOnEdge(true);
	                        } else if (_.includes(directions, "top") && _.includes(directions, "bottom")) {
	                            cursor = "row-resize";
	                            this.setSubIsOnEdge(true);
	                        } else if (_.includes(directions, "right") && _.includes(directions, "left")) {
	                            cursor = "col-resize";
	                            this.setSubIsOnEdge(true);
	                        } else {
	                            cursor = "default";
	                            this.setSubIsOnEdge(false);
	                        }
	                        container.css("cursor", cursor);
	                    } else {
	                        if (!this.subIsOnEdge) {
	                            container.css("cursor", "default");
	                            this.setSubIsOnEdge(false);
	                        }
	                    }
	                }
	            }
	        },
	        onMouseLeave: {
	            value: function onMouseLeave(e) {
	                if (!this.options.allowResize && !this.editMode) {
	                    return;
	                }this.onMouseUp();
	                this.setSubIsOnEdge(false);
	            }
	        },
	        onDrag: {
	            value: function onDrag(e) {

	                var perc = this._getPrecPoint(e);

	                var xDiff = perc.x - this.dragStartPt.x;
	                var yDiff = perc.y - this.dragStartPt.y;

	                var okToDrag = true;

	                for (var i in this.closestLines) {
	                    var line = this.closestLines[i];
	                    var origLine = this.dragStartLines[i];
	                    var _top = parseFloat(origLine.cssRules.top);
	                    var bottom = parseFloat(origLine.cssRules.bottom);
	                    var left = parseFloat(origLine.cssRules.left);
	                    var right = parseFloat(origLine.cssRules.right);
	                    var originalHeight = this._getLayoutByWidget(line.widget).percentHeight;
	                    var originalWidth = this._getLayoutByWidget(line.widget).percentWidth;
	                    if (line.cssRelevantRule === "top") {
	                        var newTop = _top + yDiff;
	                        var newHeight = 100 - bottom - newTop;
	                        if (newHeight < 0.2 * originalHeight) {
	                            okToDrag = false;
	                            break;
	                        }
	                    } else if (line.cssRelevantRule === "bottom") {
	                        var newBottom = bottom - yDiff;
	                        var newHeight = 100 - newBottom - _top;
	                        if (newHeight < 0.2 * originalHeight) {
	                            okToDrag = false;
	                            break;
	                        }
	                    } else if (line.cssRelevantRule === "left") {
	                        var newLeft = left + xDiff;
	                        var newWidth = 100 - right - newLeft;
	                        if (newWidth < 0.2 * originalWidth) {
	                            okToDrag = false;
	                            break;
	                        }
	                    } else if (line.cssRelevantRule === "right") {
	                        var newRight = right - xDiff;
	                        var newWidth = 100 - newRight - left;
	                        if (newWidth < 0.2 * originalWidth) {
	                            okToDrag = false;
	                            break;
	                        }
	                    }
	                }

	                if (okToDrag) {
	                    for (var i in this.closestLines) {
	                        var line = this.closestLines[i];

	                        if (!this.ensureCSSRulesSync(line, e)) break;

	                        var origLine = this.dragStartLines[i];
	                        if (line.cssRelevantRule === "top") {
	                            var _top2 = parseFloat(origLine.cssRules.top);
	                            line.cssRules.top = _top2 + yDiff + "%";
	                        } else if (line.cssRelevantRule === "bottom") {
	                            var bottom = parseFloat(origLine.cssRules.bottom);
	                            line.cssRules.bottom = bottom - yDiff + "%";
	                        } else if (line.cssRelevantRule === "left") {
	                            var left = parseFloat(origLine.cssRules.left);
	                            line.cssRules.left = left + xDiff + "%";
	                        } else if (line.cssRelevantRule === "right") {
	                            var right = parseFloat(origLine.cssRules.right);
	                            line.cssRules.right = right - xDiff + "%";
	                        }
	                    }
	                }
	            }
	        },
	        ensureCSSRulesSync: {
	            value: function ensureCSSRulesSync(line, e) {

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
	            }
	        },
	        onMouseDown: {
	            value: function onMouseDown(e) {

	                if (!this.options.allowResize && !this.editMode) {
	                    return;
	                }if (this.closestLines && this.closestLines.length) {
	                    this.draggingLines = true;
	                    this.dragStartPt = _.cloneDeep(this._getPrecPoint(e));
	                    this.dragStartLines = _.cloneDeep(this.closestLines);
	                    this._setTransitions(false);
	                    e.preventDefault();
	                    e.stopPropagation();
	                }
	            }
	        },
	        onMouseUp: {
	            value: function onMouseUp(e) {
	                if (!this.options.allowResize && !this.editMode) {
	                    return;
	                }this.updateDragLines();
	                this.closestLines = null;
	                this.draggingLines = false;
	                this.dragStartPt = null;
	                this.dragStartLines = null;

	                if (e) this._setTransitions(true);
	            }
	        },
	        onWidgetMouseMove: {
	            value: function onWidgetMouseMove(e) {
	                if (!this.options.allowResize && !this.editMode) {
	                    return;
	                }if (this.draggingLines || this.isParentDragging()) {
	                    return;
	                }var container = $(this.$element).find(".jf-widgets-layout-container");
	                if (!this.subIsOnEdge) {
	                    container.css("cursor", "default");
	                    this.setSubIsOnEdge(false);
	                }
	                e.stopPropagation();
	            }
	        },
	        addLinesFromRect: {
	            value: function addLinesFromRect(rect) {
	                this.dragLines.push({ x1: rect.x1, y1: rect.y1, x2: rect.x2, y2: rect.y1, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: "top" });
	                this.dragLines.push({ x1: rect.x2, y1: rect.y1, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: "right" });
	                this.dragLines.push({ x1: rect.x1, y1: rect.y2, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: "bottom" });
	                this.dragLines.push({ x1: rect.x1, y1: rect.y1, x2: rect.x1, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: "left" });
	            }
	        },
	        getClosestLines: {
	            value: function getClosestLines(x, y) {
	                var _this = this;

	                var closest = [];

	                this.dragLines.forEach(function (line) {

	                    var infinite = (line.cssRelevantRule === "bottom" || line.cssRelevantRule === "top") && _this.mainAxis === "rows" || (line.cssRelevantRule === "right" || line.cssRelevantRule === "left") && _this.mainAxis === "columns";
	                    var dist = _this.getPointDistToLine({ x: x, y: y }, line, infinite);
	                    if (dist <= 1) closest.push(line);
	                });

	                var filtered = [];

	                var top = _.filter(closest, { cssRelevantRule: "top" });
	                var bottom = _.filter(closest, { cssRelevantRule: "bottom" });
	                var left = _.filter(closest, { cssRelevantRule: "left" });
	                var right = _.filter(closest, { cssRelevantRule: "right" });

	                top.forEach(function (line) {
	                    var matches = _this.mainAxis === "rows" ? _.filter(bottom, { y1: line.y1 }) : _.filter(bottom, { x1: line.x1, x2: line.x2 });

	                    if (matches.length) {
	                        filtered.push(line);
	                        matches.forEach(function (match) {
	                            return filtered.push(match);
	                        });
	                    }
	                });
	                left.forEach(function (line) {
	                    var matches = _this.mainAxis === "columns" ? _.filter(right, { x1: line.x1 }) : _.filter(right, { y1: line.y1, y2: line.y2 });

	                    if (matches.length) {
	                        filtered.push(line);
	                        matches.forEach(function (match) {
	                            return filtered.push(match);
	                        });
	                    }
	                });

	                return filtered;
	            }
	        },
	        getPointDistToLine: {
	            value: function getPointDistToLine(pt, line, infiniteLine) {
	                if (line.x1 === line.x2) {
	                    if (infiniteLine) {
	                        return Math.abs(pt.x - line.x1);
	                    } else if (pt.y < line.y1) {
	                        return this.getPointDistToPoint(pt, { x: line.x1, y: line.y1 });
	                    } else if (pt.y > line.y2) {
	                        return this.getPointDistToPoint(pt, { x: line.x2, y: line.y2 });
	                    } else {
	                        return Math.abs(pt.x - line.x1);
	                    }
	                } else if (line.y1 === line.y2) {
	                    if (infiniteLine) {
	                        return Math.abs(pt.y - line.y1);
	                    }if (pt.x < line.x1) {
	                        return this.getPointDistToPoint(pt, { x: line.x1, y: line.y1 });
	                    } else if (pt.x > line.x2) {
	                        return this.getPointDistToPoint(pt, { x: line.x2, y: line.y2 });
	                    } else {
	                        return Math.abs(pt.y - line.y1);
	                    }
	                }
	            }
	        },
	        getPointDistToPoint: {
	            value: function getPointDistToPoint(pt1, pt2) {
	                return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
	            }
	        },
	        setSubIsOnEdge: {
	            value: function setSubIsOnEdge(onEdge) {
	                var parent = this.options.parent;
	                while (parent) {
	                    parent.subIsOnEdge = onEdge;
	                    parent = parent.options.parent;
	                }
	            }
	        },
	        isParentDragging: {
	            value: function isParentDragging() {
	                var recurse = arguments[0] === undefined ? false : arguments[0];

	                var parent = this.options.parent;
	                if (parent) {
	                    return parent.draggingLines || parent.isParentDragging(true);
	                } else {
	                    return recurse ? this.draggingLines : false;
	                }
	            }
	        },
	        removeWidget: {
	            value: function removeWidget(layoutObj) {
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
	                        var parentLayoutObj = _.find(this.options.parent.flatCells, { subLayout: this.layout });
	                        this.options.parent.removeWidget(parentLayoutObj);
	                    }
	                }
	                this.megaRefresh();
	            }
	        },
	        normalizeSizes: {
	            value: function normalizeSizes() {
	                var _this = this;

	                var totalSizeMajor = 0;
	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    var totalSizeMinor = 0;
	                    var totalSizeMajorAdd = 0;
	                    rowOrColumn.forEach(function (cell) {
	                        totalSizeMinor += _this.mainAxis === "columns" ? cell.percentHeight : cell.percentWidth;
	                        var major = _this.mainAxis === "columns" ? cell.percentWidth : cell.percentHeight;
	                        totalSizeMajorAdd = major > totalSizeMajorAdd ? major : totalSizeMajorAdd;
	                    });
	                    totalSizeMajor += totalSizeMajorAdd;
	                    if (totalSizeMinor !== 100) {
	                        rowOrColumn.forEach(function (cell) {
	                            if (_this.mainAxis === "columns") {
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
	                            if (_this.mainAxis === "columns") {
	                                cell.percentWidth = 100 * cell.percentWidth / totalSizeMajor;
	                            } else {
	                                cell.percentHeight = 100 * cell.percentHeight / totalSizeMajor;
	                            }
	                        });
	                    });
	                }
	            }
	        },
	        splitCell: {
	            value: function splitCell(layoutObj, orientation) {
	                var _this = this;

	                this._setTransitions(true);
	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    var index = _.indexOf(rowOrColumn, layoutObj);
	                    if (index !== -1) {
	                        var clone = angular.copy(layoutObj);
	                        if (orientation === "h" && _this.mainAxis === "rows" || orientation === "v" && _this.mainAxis === "columns") {
	                            var attr = orientation === "h" ? "percentWidth" : "percentHeight";
	                            layoutObj[attr] /= 2;
	                            clone[attr] /= 2;
	                            rowOrColumn.splice(index + 1, 0, clone);
	                            clone.selectWidgetMode = true;
	                        } else {
	                            delete layoutObj.widget;
	                            layoutObj.subLayout = {};
	                            var axis = _this.mainAxis === "columns" ? "rows" : "columns";
	                            layoutObj.subLayout[axis] = [{
	                                size: "100%",
	                                cells: ["100% @" + clone.widget],
	                                "new": true
	                            }];
	                        }
	                    }
	                });

	                this.megaRefresh();
	            }
	        },
	        megaRefresh: {
	            value: function megaRefresh() {
	                var _this = this;

	                this.updateFlatCells();
	                this.normalizeSizes();
	                this.updateCss();
	                this.updateDragLines();
	                this.loadTemplates().then(function () {
	                    _this.$timeout(function () {
	                        return _this.compileElements();
	                    });
	                });
	            }
	        },
	        changeWidget: {
	            value: function changeWidget(layoutObj) {
	                layoutObj.selectWidgetMode = !layoutObj.selectWidgetMode;
	                this.updateCss();
	            }
	        },
	        onWidgetChange: {
	            value: function onWidgetChange(layoutObj) {
	                layoutObj.selectWidgetMode = false;
	                this.templatesLoaded = false;
	                this.megaRefresh();
	            }
	        },
	        getWidgetName: {
	            value: function getWidgetName(key) {
	                return this.widgets[key] ? this.widgets[key].name || key : "";
	            }
	        },
	        updateLayoutJSON: {
	            value: function updateLayoutJSON() {
	                var _this = this;

	                if (!this.transformedLayout) {
	                    return;
	                }this.layoutJSON = {};
	                this.layoutJSON.main = {};
	                this.layoutJSON.main[this.mainAxis] = [];
	                var subLayoutCounter = 0;

	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    var rowOrColumnObject = {};
	                    rowOrColumn.forEach(function (cell) {
	                        if (!rowOrColumnObject.size) rowOrColumnObject.size = cell[_this.mainAxis === "columns" ? "percentWidth" : "percentHeight"] + "%";
	                        if (!rowOrColumnObject.cells) rowOrColumnObject.cells = [];

	                        var cellString = "";
	                        cellString += cell[_this.mainAxis === "columns" ? "percentHeight" : "percentWidth"] + "%";
	                        if (cell.widget && !cell.widget.startsWith("$$")) cellString += " @" + cell.widget;

	                        if (cell.$$childLayout) {
	                            cell.$$childLayout.updateLayoutJSON();

	                            var subName = "sub" + subLayoutCounter;
	                            subLayoutCounter++;

	                            _this.layoutJSON[subName] = cell.$$childLayout.layoutJSON;
	                            cellString += " #" + subName;
	                        }

	                        rowOrColumnObject.cells.push(cellString);
	                    });

	                    _this.layoutJSON.main[_this.mainAxis].push(rowOrColumnObject);
	                });
	            }
	        },
	        getWidgetsCount: {
	            value: function getWidgetsCount() {
	                return $(".widget-container").length;
	            }
	        },
	        _setTransitions: {
	            value: function _setTransitions(active) {
	                if (active) {
	                    $(".widgets-padder .widget-wrapper").css("transition", "all " + this.ANIM_DURATION + "s ease-out");
	                } else {
	                    $(".widgets-padder .widget-wrapper").css("transition", "none");
	                }
	            }
	        },
	        _getRootDirective: {
	            value: function _getRootDirective() {
	                if (!this.options.parent) {
	                    return this;
	                } else {
	                    return this.options.parent._getRootDirective();
	                }
	            }
	        },
	        cleanLayout: {
	            value: function cleanLayout() {
	                if (!this.transformedLayout) {
	                    return;
	                } // Remove empty layout directives from parent
	                if (!this.transformedLayout.length && this.options.parent) {
	                    var parentLayoutObj = _.find(this.options.parent.flatCells, { subLayout: this.layout });
	                    this.options.parent.removeWidget(parentLayoutObj);
	                }

	                // In case this directive is a sub and only has one widget in one cell, we move the widget to parent
	                else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.options.parent) {

	                    var parentLayoutObj = _.find(this.options.parent.flatCells, { subLayout: this.layout });
	                    var axis = Object.keys(parentLayoutObj.subLayout)[0];
	                    if (!parentLayoutObj.subLayout[axis][0] || parentLayoutObj.subLayout[axis][0] && !parentLayoutObj.subLayout[axis][0]["new"]) {
	                        if (this.transformedLayout[0][0].widget) {
	                            parentLayoutObj.widget = this.transformedLayout[0][0].widget;
	                            delete parentLayoutObj.subLayout;
	                            delete parentLayoutObj.$$childLayout;
	                        } else if (this.transformedLayout[0][0].subLayout) {
	                            parentLayoutObj.subLayout = this.transformedLayout[0][0].subLayout;
	                            delete parentLayoutObj.widget;
	                        }
	                    }
	                }

	                // In case this directive is the root and only has one sub in one cell, we move the sub data to this
	                else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.transformedLayout[0][0].subLayout && !this.options.parent) {

	                    console.log("pre", JSON.stringify(this.layout));
	                    var theSub = this.transformedLayout[0][0].subLayout;
	                    this.layout = theSub;
	                    console.log("post", JSON.stringify(this.layout));
	                    this.transformLayout();
	                    this.cleanLayout();
	                }
	            }
	        },
	        expandPane: {
	            value: function expandPane(layoutObj) {
	                var _this = this;

	                var expanding = this.$expanded = !this.$expanded ? layoutObj : null;
	                this.transformedLayout.forEach(function (rowOrColumn) {
	                    rowOrColumn.forEach(function (cell) {
	                        if (expanding) {
	                            cell.dimBeforeExpansion = { width: cell.percentWidth, height: cell.percentHeight };
	                            if (cell === layoutObj) {
	                                cell.percentWidth = cell.percentHeight = 100;
	                            } else {
	                                _this.cssRules[cell.cssId].opacity = 0;
	                                var onTheSameRowOrColumn = rowOrColumn.indexOf(layoutObj) !== -1;
	                                if (onTheSameRowOrColumn) {
	                                    cell[_this.mainAxis === "columns" ? "percentHeight" : "percentWidth"] = 0;
	                                    cell[_this.mainAxis === "rows" ? "percentHeight" : "percentWidth"] = 100;
	                                } else {
	                                    cell[_this.mainAxis === "rows" ? "percentHeight" : "percentWidth"] = 0;
	                                    cell[_this.mainAxis === "columns" ? "percentHeight" : "percentWidth"] = 100;
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
	                        _this.updateCss();
	                    }, this.ANIM_DURATION * MILLISECONDS_MULTI);
	                } else {
	                    this.updateCss();
	                    this.$timeout(function () {
	                        _this.transformedLayout.forEach(function (rowOrColumn) {
	                            rowOrColumn.forEach(function (cell) {
	                                _this.cssRules[cell.cssId].opacity = 1;
	                            });
	                        });
	                    }, this.ANIM_DURATION * MILLISECONDS_MULTI);
	                }

	                this.$timeout(function () {
	                    $(document).trigger("resize");
	                }, this.ANIM_DURATION + ANIMATION_DELAY * MILLISECONDS_MULTI);

	                if (this.options.parent && this.parentCell) {
	                    this.options.parent.expandPane(this.parentCell);
	                }

	                layoutObj.expanded = !layoutObj.expanded;
	            }
	        }
	    });

	    return jfWidgetsLayoutController;
	})();

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfMarquee = jfMarquee;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfMarqueeController = (function () {
	    /* @ngInject */

	    jfMarqueeController.$inject = ["$element", "$timeout", "$interval", "$scope", "$transclude"];
	    function jfMarqueeController($element, $timeout, $interval, $scope, $transclude) {
	        var _this = this;

	        _classCallCheck(this, jfMarqueeController);

	        this.$timeout = $timeout;
	        this.$transclude = $transclude;
	        this.container = $($element).find(".jf-marquee-container");
	        this.content = $($element).find(".jf-marquee-container span");

	        this.container.on("mouseenter", function () {
	            return _this.onMouseEnter();
	        });
	        this.container.on("mouseleave", function () {
	            return _this.onMouseLeave();
	        });
	    }

	    _createClass(jfMarqueeController, {
	        onMouseEnter: {
	            value: function onMouseEnter() {
	                if (this.disabled) {
	                    return;
	                }this.checkOverflow();
	                if (this.overflowing) {
	                    this.animPeriod = this.content.innerWidth() * 0.01;
	                    this.startAnimation(1000);
	                }
	            }
	        },
	        onMouseLeave: {
	            value: function onMouseLeave() {
	                if (this.disabled) {
	                    return;
	                }if (this.overflowing) {
	                    this.content.css("transition", "none");
	                    this.content.css("left", "0");
	                    this.container.removeClass("animating");
	                    if (this.startAnimTimeout) this.$timeout.cancel(this.startAnimTimeout);
	                    if (this.loopAnimTimeout) this.$timeout.cancel(this.loopAnimTimeout);
	                }
	            }
	        },
	        startAnimation: {
	            value: function startAnimation() {
	                var _this = this;

	                var delay = arguments[0] === undefined ? 0 : arguments[0];

	                this.container.addClass("animating");
	                this.content.css("transition", "left " + this.animPeriod + "s linear");
	                this.content.css("left", "0");
	                this.startAnimTimeout = this.$timeout(function () {
	                    _this.content.css("left", -_this.content.innerWidth() + "px");
	                    _this.loopAnimTimeout = _this.$timeout(function () {
	                        _this.content.css("transition", "none");
	                        _this.content.css("left", _this.container.innerWidth() + "px");
	                        _this.animPeriod = (_this.container.innerWidth() + _this.content.innerWidth()) * 0.01;

	                        _this.$timeout(function () {
	                            return _this.startAnimation();
	                        }, 10);
	                    }, _this.animPeriod * 1000);
	                }, delay);
	            }
	        },
	        checkOverflow: {
	            value: function checkOverflow() {
	                if (Math.round(this.container.innerWidth()) < Math.round(this.container[0].scrollWidth)) {
	                    this.container.addClass("overflowing");
	                    this.overflowing = true;
	                } else {
	                    this.container.removeClass("overflowing");
	                    this.overflowing = false;
	                }
	            }
	        }
	    });

	    return jfMarqueeController;
	})();

	function jfMarquee() {
	    return {
	        restrict: "E",
	        transclude: {
	            innerHtml: "?innerHtml" },
	        scope: {
	            disabled: "=?"
	        },
	        controller: jfMarqueeController,
	        controllerAs: "jfMarquee",
	        bindToController: true,
	        templateUrl: "directives/jf_marquee/jf_marquee.html"
	    };
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfPasswordStrength = jfPasswordStrength;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var passrank = __webpack_require__(56).passrank;

	var jfPasswordStrengthController = (function () {
	    /* @ngInject */

	    jfPasswordStrengthController.$inject = ["$scope"];
	    function jfPasswordStrengthController($scope) {
	        var _this = this;

	        _classCallCheck(this, jfPasswordStrengthController);

	        $scope.$watch("jfPS.password", function (pass) {
	            _this.passLength = pass ? pass.length : 0;
	            _this.rank = passrank(pass);
	        });
	    }

	    _createClass(jfPasswordStrengthController, {
	        getStrength: {
	            value: function getStrength() {
	                if (this.rank === 0 && this.passLength === 0) {
	                    return { label: "", "class": "blank", sections: 0 };
	                } else if (this.rank < 20) {
	                    return { label: "Too short", "class": "short", sections: 1 };
	                } else if (this.rank < 40) {
	                    return { label: "Weak", "class": "week", sections: 2 };
	                } else if (this.rank < 60) {
	                    return { label: "Medium", "class": "medium", sections: 3 };
	                } else if (this.rank < 80) {
	                    return { label: "Good", "class": "good", sections: 4 };
	                } else {
	                    return { label: "Strong", "class": "strong", sections: 5 };
	                }
	            }
	        }
	    });

	    return jfPasswordStrengthController;
	})();

	function jfPasswordStrength() {

	    return {
	        restrict: "E",
	        scope: {
	            password: "=",
	            rank: "="
	        },
	        controller: jfPasswordStrengthController,
	        controllerAs: "jfPS",
	        templateUrl: "directives/jf_password_strength/jf_password_strength.html",
	        bindToController: true
	    };
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.passrank = passrank;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var TRIVIAL_PASSWORDS = __webpack_require__(57).TRIVIAL_PASSWORDS;

	function checkRule(pass, rule) {
	    var regex = new RegExp(rule, "g");
	    var matches = pass.match(regex);
	    if (matches) {
	        return {
	            pass: true,
	            n: matches.length
	        };
	    } else {
	        return {
	            pass: false,
	            n: 0
	        };
	    }
	}

	function getUniqueCount(str) {
	    if (!str || !str.length) {
	        return 0;
	    }var found = [];
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
	        var matches = pass.match(new RegExp(word, "g"));
	        if (matches) {
	            count += matches.length;
	            len += word.length * matches.length;
	        }
	    });
	    return { count: count, len: len };
	}

	function passrank(pass) {
	    if (!pass || !pass.length) {
	        return 0;
	    }var rules = {
	        CONTAINS_LOWER_CASE: "[a-z]",
	        CONTAINS_UPPER_CASE: "[A-Z]",
	        CONTAINS_NUMBERS: "[0-9]",
	        CONTAINS_SYMBOLS: "[^A-Za-z0-9]",

	        MIXES_CASING: "((?=[a-z][A-Z]+|[A-Z][a-z]+))",
	        MIXES_LETTERS_NUMBERS: "((?=[a-zA-Z][0-9]+|[0-9][a-zA-Z]+))",
	        MIXES_SIGNS: "((?=[a-zA-Z0-9][^A-Za-z0-9]+|[^A-Za-z0-9][a-zA-Z0-9]+))" };

	    var checks = {};

	    for (var rule in rules) {
	        checks[rule] = checkRule(pass, rules[rule]);
	    }

	    var rank = 0;

	    var uniques = getUniqueCount(pass);

	    ////////////////////////////

	    var mixBonus = checks.MIXES_CASING.n + checks.MIXES_LETTERS_NUMBERS.n + checks.MIXES_SIGNS.n;

	    var debugStr = "";

	    if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {

	        debugStr += "N+S+L+U";

	        rank += Math.pow(uniques, 4) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 2);
	    } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass && (checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass)) {

	        debugStr += "N+S+(L|U)";

	        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 2.5);
	    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_SYMBOLS.pass) {

	        debugStr += "S+L+U";

	        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 4) * Math.pow(pass.length, 3);
	    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass && checks.CONTAINS_NUMBERS.pass) {

	        debugStr += "N+L+U";

	        rank += Math.pow(uniques, 3) * Math.pow(Math.max(1, mixBonus), 3) * Math.pow(pass.length, 3);
	    } else if (checks.CONTAINS_NUMBERS.pass && checks.CONTAINS_SYMBOLS.pass) {

	        debugStr += "N+S";

	        rank += Math.pow(uniques, 2) * Math.pow(Math.max(1, mixBonus), 2) * Math.pow(pass.length, 2);
	    } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_SYMBOLS.pass) {

	        debugStr += "S+(L|U)";

	        rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.5);
	    } else if ((checks.CONTAINS_LOWER_CASE.pass || checks.CONTAINS_UPPER_CASE.pass) && checks.CONTAINS_NUMBERS.pass) {

	        debugStr += "N+(L|U)";

	        rank += Math.pow(uniques, 1.5) * Math.pow(Math.max(1, mixBonus), 1.5) * Math.pow(pass.length, 1.2);
	    } else if (checks.CONTAINS_LOWER_CASE.pass && checks.CONTAINS_UPPER_CASE.pass) {

	        debugStr += "L+U";

	        rank += Math.pow(uniques, 1.25) * Math.pow(Math.max(1, mixBonus), 1.25) * Math.pow(pass.length, 1.1);
	    } else {
	        debugStr += "0000";

	        rank += Math.pow(uniques, 1.1) * Math.pow(Math.max(1, mixBonus), 1.1) * Math.pow(pass.length, 0.5);
	    }

	    debugStr += " * " + ("u: " + uniques + " mb: " + mixBonus + " l: " + pass.length + " *");

	    ////////////////////////////

	    //Length and Uniqueness bonus
	    if (mixBonus >= 1) rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.5)));else rank = rank * Math.pow(pass.length, Math.log(Math.pow(pass.length * uniques, 1.2)));
	    //log
	    rank = Math.round(Math.log(rank));

	    debugStr += " r: " + rank;

	    //Normalize
	    if (rank >= 38) rank = 100;else rank = Math.round(rank / 38 * 100);

	    debugStr += " rN: " + rank;

	    //    console.log(debugStr);

	    return Math.round(rank);
	}

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TRIVIAL_PASSWORDS = "123456,password,12345678,qwerty,123456789,12345,1234,111111,1234567,123123,abc123,696969,666666,qwertyuiop,123321,1234567890,654321,1qaz2wsx,7777777,123qwe,000000,zxcvbnm,112233,zxcvbn,11111111,131313,159753,6969,secret,hello,1234qwer,gfhjkm,q1w2e3r4t5,qwer1234,ncc1701,q1w2e3r4,123654,1q2w3e4r,asdfasdf,thx1138,12344321,8675309,qwerty123,passw0rd,abcd1234,123abc,123456a,159357,789456,asdf,qwertyui,q1w2e3,1q2w3e4r5t,123456q,12345a,1qazxsw2,2112,asdasd,01012011,102030,11223344,315475,qwerty1,asdf1234,007007,lol123,147258369,qwertyu,asd123,qweasdzxc,hello1,12345q,111222,147258,zaq12wsx,010203,a123456,123456789a,1232323q,qwerty12,qwe123,12345qwert,asdfg,test123,password123,hello123".split(",");
	exports.TRIVIAL_PASSWORDS = TRIVIAL_PASSWORDS;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfClearErrors = jfClearErrors;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfClearErrorsController = (function () {
	    /* @ngInject */

	    jfClearErrorsController.$inject = ["$scope", "$element", "$attrs", "JFrogEventBus"];
	    function jfClearErrorsController($scope, $element, $attrs, JFrogEventBus) {
	        var _this = this;

	        _classCallCheck(this, jfClearErrorsController);

	        this.JFrogEventBus = JFrogEventBus;
	        this.EVENTS = JFrogEventBus.getEventsDefinition();

	        angular.element($element).on("mousedown", function () {
	            _this.clearFieldValidations();
	        });
	    }

	    _createClass(jfClearErrorsController, {
	        clearFieldValidations: {
	            value: function clearFieldValidations() {
	                this.JFrogEventBus.dispatch(this.EVENTS.FORM_CLEAR_FIELD_VALIDATION, true);
	            }
	        }
	    });

	    return jfClearErrorsController;
	})();

	function jfClearErrors() {

	    return {
	        restrict: "A",
	        controller: jfClearErrorsController
	    };
	}

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfFakeReadonly = jfFakeReadonly;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfFakeReadonlyController =
	/* @ngInject */
	["$element", function jfFakeReadonlyController($element) {
	    _classCallCheck(this, jfFakeReadonlyController);

	    $($element).attr("readonly", true);

	    var removeAttr = function () {
	        $($element).attr("readonly", false);
	        $($element).off("focus", removeAttr);
	    };

	    $($element).on("focus", removeAttr);
	}];

	function jfFakeReadonly() {

	    return {
	        restrict: "A",
	        controller: jfFakeReadonlyController
	    };
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfMarkupEditor = jfMarkupEditor;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(61);

	var PREVIEW_MODE = "Preview";
	var EDIT_MODE = "Edit";

	var jfMarkupEditorController = (function () {
	    /* @ngInject */

	    jfMarkupEditorController.$inject = ["$timeout", "$scope", "JFrogUIWebWorker"];
	    function jfMarkupEditorController($timeout, $scope, JFrogUIWebWorker) {
	        _classCallCheck(this, jfMarkupEditorController);

	        this.$timeout = $timeout;
	        this.$scope = $scope;
	        this.EDIT_MODE = EDIT_MODE;
	        this.PREVIEW_MODE = PREVIEW_MODE;
	        this.instanceId = Math.floor(Math.random() * 10000000000);

	        this.JFrogUIWebWorker = new JFrogUIWebWorker();
	    }

	    _createClass(jfMarkupEditorController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.checkPreviewers();
	                if (this.previewersCount === 2) {
	                    this.init();
	                } else {
	                    this.JFrogUIWebWorker.check().then(function () {

	                        _this.JFrogUIWebWorker.open();

	                        _this.webworkerOk = true;
	                        _this.init();
	                    })["catch"](function () {
	                        console.error("jf-code-mirror: Error: No preview render callback defined and WebWorker is not available.");
	                    });
	                }

	                this.$scope.$on("$destroy", function () {
	                    if (_this.webworkerOk) _this.JFrogUIWebWorker.close();
	                });
	            }
	        },
	        init: {
	            value: function init() {
	                var _this = this;

	                this.mode = this.mode || EDIT_MODE;
	                this.markup = this.markup || "";
	                this.markupBackup = this.markup;
	                this.language = this.language || "Markdown";
	                this.languageBackup = this.language;
	                if (this.editable === undefined) this.editable = true;
	                this.modeOptions = [EDIT_MODE, PREVIEW_MODE];

	                this.updatePreviewButton();

	                this.$scope.$watch("jfMarkup.markup", function () {
	                    if (_this.canRenderPreview()) {
	                        _this.renderPreview();
	                    }
	                });
	            }
	        },
	        setPreview: {
	            value: function setPreview(preview) {
	                this.preview = preview;
	            }
	        },
	        currentLanguageHasPreviewRenderer: {
	            value: function currentLanguageHasPreviewRenderer() {
	                return this.previewRenderers && this.previewRenderers[this.language.toLowerCase()];
	            }
	        },
	        canRenderPreview: {
	            value: function canRenderPreview() {
	                return this.webworkerOk && !this.currentLanguageHasPreviewRenderer();
	            }
	        },
	        renderPreview: {
	            value: function renderPreview() {
	                var _this = this;

	                if (this.language.toLowerCase() === "plain text") {
	                    this.setPreview(this.markup.replace(/\n/g, "<br>"));
	                } else if (this.currentLanguageHasPreviewRenderer()) {
	                    this.previewRenderers[this.language.toLowerCase()](this.markup, function (preview) {
	                        return _this.setPreview(preview);
	                    });
	                } else if ((this.webworkerOk, this.language, this.language.toLowerCase(), this.instanceId)) {
	                    this.JFrogUIWebWorker.markupPreview(this.language.toLowerCase(), this.markup, this.instanceId).then(function (html) {
	                        return _this.setPreview(html);
	                    });
	                }
	            }
	        },
	        updatePreviewButton: {
	            value: function updatePreviewButton() {
	                this.modeOptions = [EDIT_MODE, PREVIEW_MODE];
	            }
	        },
	        onLanguageChange: {
	            value: function onLanguageChange() {
	                var _this = this;

	                this.updatePreviewButton();
	                this.preview = "";
	                if (this.canRenderPreview()) {
	                    this.renderPreview();
	                }
	                this.$timeout(function () {
	                    return _this.switchController.updateOptionObjects();
	                });
	            }
	        },
	        onChangeModeInternal: {
	            value: function onChangeModeInternal() {
	                if (this.mode === PREVIEW_MODE) this.renderPreview();
	                if (this.onModeChange) this.onModeChange({ mode: this.mode });
	            }
	        },
	        checkPreviewers: {
	            value: function checkPreviewers() {

	                if (!this.previewRenderers) {
	                    this.previewRenderers = {};
	                    this.previewersCount = 0;
	                } else {
	                    if (this.previewRenderers.markdown && this.previewRenderers.asciidoc) {
	                        this.previewersCount = 2;
	                    } else if (this.previewRenderers.markdown || this.previewRenderers.asciidoc) {
	                        this.previewersCount = 1;
	                    }
	                }
	            }
	        },
	        onCancel: {
	            value: function onCancel() {
	                var _this = this;

	                this.$timeout(function () {
	                    _this.language = _this.languageBackup;
	                    _this.markup = _this.markupBackup;
	                    _this.preview = "";
	                    _this.renderPreview();
	                    _this.mode = PREVIEW_MODE;
	                    _this.showControls = false;
	                });
	            }
	        },
	        onSaveClick: {
	            value: function onSaveClick() {
	                var _this = this;

	                this.$timeout(function () {
	                    if (_this.onSave && typeof _this.onSave === "function") {
	                        _this.languageBackup = _this.language;
	                        _this.markupBackup = _this.markup;
	                        _this.onSave();
	                        _this.showControls = false;
	                    }
	                });
	            }
	        },
	        activateEditor: {
	            value: function activateEditor() {
	                this.mode = EDIT_MODE;
	                this.showControls = true;
	            }
	        },
	        isInEditMode: {
	            value: function isInEditMode() {
	                return this.showControls && this.mode === this.EDIT_MODE;
	            }
	        }
	    });

	    return jfMarkupEditorController;
	})();

	function jfMarkupEditor() {

	    return {
	        restrict: "E",
	        scope: {
	            markup: "=?",
	            previewRenderers: "=?",
	            language: "=?",
	            mode: "=?",
	            onSave: "&?",
	            onModeChange: "&?",
	            editable: "=?",
	            showControls: "=?",
	            hideCancelButton: "<?",
	            editorLabel: "@",
	            preventAutoFocus: "=?"
	        },
	        controller: jfMarkupEditorController,
	        controllerAs: "jfMarkup",
	        bindToController: true,
	        templateUrl: "directives/jf_markup_editor/jf_markup_editor.html"
	    };
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	///
	/// This is a third party code: https://github.com/asciidoctor/codemirror-asciidoc
	///

	"use strict";

	CodeMirror.defineMode("asciidoc", function (config, parserConfig) {

	    // Ace highlight rules function imported below.
	    var HighlightRules = function HighlightRules() {
	        var identifierRe = "[a-zA-Z¡-￿]+\\b";

	        this.$rules = {
	            start: [{ token: "empty", regex: /$/ }, { token: "literal", regex: /^\.{4,}\s*$/, next: "listingBlock" }, { token: "literal", regex: /^-{4,}\s*$/, next: "literalBlock" }, { token: "literal", regex: /^\+{4,}\s*$/, next: "passthroughBlock" }, { token: "keyword", regex: /^={4,}\s*$/ }, { token: "text", regex: /^\s*$/ },
	            // immediately return to the start mode without matching anything
	            { token: "empty", regex: "", next: "dissallowDelimitedBlock" }],

	            dissallowDelimitedBlock: [{ include: "paragraphEnd" }, { token: "comment", regex: "^//.+$" }, { token: "keyword", regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s" }, { include: "listStart" }, { token: "literal", regex: /^\s+.+$/, next: "indentedBlock" }, { token: "empty", regex: "", next: "text" }],

	            paragraphEnd: [{ token: "doc.comment", regex: /^\/{4,}\s*$/, next: "commentBlock" }, { token: "tableBlock", regex: /^\s*[|!]=+\s*$/, next: "tableBlock" },
	            // open block, ruler
	            { token: "keyword", regex: /^(?:--|''')\s*$/, next: "start" }, { token: "option", regex: /^\[.*\]\s*$/, next: "start" }, { token: "pageBreak", regex: /^>{3,}$/, next: "start" }, { token: "literal", regex: /^\.{4,}\s*$/, next: "listingBlock" }, { token: "titleUnderline", regex: /^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/, next: "start" }, { token: "singleLineTitle", regex: /^={1,6}\s+\S.*$/, next: "start" }, { token: "otherBlock", regex: /^(?:\*{2,}|_{2,})\s*$/, next: "start" },
	            // .optional title
	            { token: "optionalTitle", regex: /^\.[^.\s].+$/, next: "start" }],

	            listStart: [{
	                token: "keyword",
	                regex: /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,
	                next: "listText"
	            }, { token: "meta.tag", regex: /^.+(?::{2,4}|;;)(?: |$)/, next: "listText" },
	            // continuation
	            { token: "keyword", regex: /^\+\s*$/, next: "start" }],

	            text: [{
	                token: ["link", "link"],
	                regex: /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/
	            }, { token: ["link", "link"], regex: /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/ }, { token: "link", regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/ }, { include: "macros" }, { include: "paragraphEnd" }, { token: "literal", regex: /\+{3,}/, next: "smallPassthrough" }, {
	                token: "escape",
	                regex: /\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/
	            }, { token: "escape", regex: /\\[_*'`+#]|\\{2}[_*'`+#]{2}/ }, { token: "keyword", regex: /\s\+$/ },
	            // any word
	            { token: "text", regex: identifierRe }, {
	                token: ["keyword", "string", "keyword"],
	                regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/
	            }, { token: "keyword", regex: /<<[\w\d\-$]+,?|>>/ }, { token: "constant.character", regex: /\({2,3}.*?\){2,3}/ },
	            // List of callouts
	            { token: "support.function.list.callout", regex: /^(?:<\d+>|\d+>|>) /, next: "text" },
	            // Anchor
	            { token: "keyword", regex: /\[\[.+?\]\]/ },
	            // bibliography
	            { token: "support", regex: /^\[{3}[\w\d =\-]+\]{3}/ }, { include: "quotes" },
	            // text block end
	            { token: "empty", regex: /^\s*$/, next: "start" }],

	            listText: [{ include: "listStart" }, { include: "text" }],

	            indentedBlock: [{ token: "literal", regex: /^[\s\w].+$/, next: "indentedBlock" }, { token: "literal", regex: "", next: "start" }],

	            listingBlock: [{ token: "literal", regex: /^\.{4,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "constant.numeric", regex: "<\\d+>" }, { token: "literal", regex: "[^<]+" }, { token: "literal", regex: "<" }],
	            literalBlock: [{ token: "literal", regex: /^-{4,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "constant.numeric", regex: "<\\d+>" }, { token: "literal", regex: "[^<]+" }, { token: "literal", regex: "<" }],
	            passthroughBlock: [{ token: "literal", regex: /^\+{4,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "literal", regex: identifierRe + "|\\d+" }, { include: "macros" }, { token: "literal", regex: "." }],

	            smallPassthrough: [{ token: "literal", regex: /[+]{3,}/, next: "dissallowDelimitedBlock" }, { token: "literal", regex: /^\s*$/, next: "dissallowDelimitedBlock" }, { token: "literal", regex: identifierRe + "|\\d+" }, { include: "macros" }],

	            commentBlock: [{ token: "doc.comment", regex: /^\/{4,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "doc.comment", regex: "^.*$" }],
	            tableBlock: [{ token: "tableBlock", regex: /^\s*\|={3,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "innerTableBlock" }, { token: "tableBlock", regex: /\|/ }, { include: "text", noEscape: true }],
	            innerTableBlock: [{ token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "tableBlock" }, { token: "tableBlock", regex: /^\s*|={3,}\s*$/, next: "dissallowDelimitedBlock" }, { token: "tableBlock", regex: /\!/ }],
	            macros: [{ token: "macro", regex: /{[\w\-$]+}/ }, {
	                token: ["text", "string", "text", "constant.character", "text"],
	                regex: /({)([\w\-$]+)(:)?(.+)?(})/
	            }, {
	                token: ["text", "markup.list.macro", "keyword", "string"],
	                regex: /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/
	            }, {
	                token: ["markup.list.macro", "keyword", "string"],
	                regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/
	            }, { token: ["markup.list.macro", "keyword"], regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/ }, { token: "keyword", regex: /^:.+?:(?= |$)/ }],

	            quotes: [{ token: "string.italic", regex: /__[^_\s].*?__/ }, { token: "string.italic", regex: quoteRule("_") }, { token: "keyword.bold", regex: /\*\*[^*\s].*?\*\*/ }, { token: "keyword.bold", regex: quoteRule("\\*") }, { token: "literal", regex: /\+\+[^+\s].*?\+\+/ }, { token: "literal", regex: quoteRule("\\+") }, { token: "literal", regex: /\$\$.+?\$\$/ }, { token: "literal", regex: quoteRule("\\$") }, { token: "literal", regex: /``[^`\s].*?``/ }, { token: "literal", regex: quoteRule("`") }, { token: "keyword", regex: /\^[^\^].*?\^/ }, { token: "keyword", regex: quoteRule("\\^") }, { token: "keyword", regex: /~[^~].*?~/ }, { token: "keyword", regex: quoteRule("~") }, { token: "keyword", regex: /##?/ }, { token: "keyword", regex: /(?:\B|^)``|\b''/ }]

	        };

	        function quoteRule(ch) {
	            var prefix = /\w/.test(ch) ? "\\b" : "(?:\\B|^)";
	            return prefix + ch + "[^" + ch + "].*?" + ch + "(?![\\w*])";
	        }

	        //addQuoteBlock("text")

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
	    };

	    // Ace's Syntax Tokenizer.

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
	            var mapping = this.matchMappings[key] = { defaultToken: "text" };
	            var flag = "g";

	            var splitterRurles = [];
	            for (var i = 0; i < state.length; i++) {
	                var rule = state[i];
	                if (rule.defaultToken) mapping.defaultToken = rule.defaultToken;
	                if (rule.caseInsensitive) flag = "gi";
	                if (rule.regex == null) continue;

	                if (rule.regex instanceof RegExp) rule.regex = rule.regex.toString().slice(1, -1);

	                // Count number of matching groups. 2 extra groups from the full match
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

	                ruleRegExps.push(adjustedregex);

	                // makes property access faster
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
	            var types = this.token.apply(this, values);

	            // required for compatibility with old modes
	            if (typeof types === "string") return [{ type: types, value: str }];

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

	            var token = { type: null, value: "" };

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
	                        token = { type: type, value: skipped };
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
	                            token = { type: type, value: value };
	                        }
	                    } else if (type) {
	                        if (token.type) tokens.push(token);
	                        token = { type: null, value: "" };
	                        for (var i = 0; i < type.length; i++) tokens.push(type[i]);
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
	    }).call(Tokenizer.prototype);

	    // Token conversion.
	    // See <https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode#common-tokens>
	    // This is not an exact match nor the best match that can be made.
	    var tokenFromAceToken = {
	        empty: null,
	        text: null,

	        // Keyword
	        keyword: "keyword",
	        control: "keyword",
	        operator: "operator",

	        // Constants
	        constant: "atom",
	        numeric: "number",
	        character: "atom",
	        escape: "atom",

	        // Variables
	        variable: "variable",
	        parameter: "variable-3",
	        language: "variable-2", // Python's `self` uses that.

	        // Comments
	        comment: "comment",
	        line: "comment",
	        "double-slash": "comment",
	        "double-dash": "comment",
	        "number-sign": "comment",
	        percentage: "comment",
	        block: "comment",
	        doc: "comment",

	        // String
	        string: "string",
	        quoted: "string",
	        single: "string",
	        double: "string",
	        triple: "string",
	        unquoted: "string",
	        interpolated: "string",
	        regexp: "string-2",

	        meta: "keyword",
	        literal: "qualifier",
	        support: "builtin",

	        // Markup
	        markup: "tag",
	        underline: "link",
	        link: "link",
	        strong: "strong",
	        heading: "header",
	        em: "em",
	        list: "variable-2",
	        numbered: "variable-2",
	        unnumbered: "variable-2",
	        quote: "quote",
	        raw: "variable-2", // Markdown's raw block uses that.

	        // Invalid
	        invalid: "error",
	        illegal: "invalidchar",
	        deprecated: "error"
	    };

	    // Takes a list of Ace tokens, returns a (string) CodeMirror token.
	    var cmTokenFromAceTokens = function cmTokenFromAceTokens(tokens) {
	        var token = null;
	        for (var i = 0; i < tokens.length; i++) {
	            // Find the most specific token.
	            if (tokenFromAceToken[tokens[i]] !== undefined) {
	                token = tokenFromAceToken[tokens[i]];
	            }
	        }
	        return token;
	    };

	    // Consume a token from plannedTokens.
	    var consumeToken = function consumeToken(stream, state) {
	        var plannedToken = state.plannedTokens.shift();
	        if (plannedToken === undefined) {
	            return null;
	        }
	        stream.match(plannedToken.value);
	        var tokens = plannedToken.type.split(".");
	        return cmTokenFromAceTokens(tokens);
	    };

	    var matchToken = function matchToken(stream, state) {
	        // Anormal start: we already have planned tokens to consume.
	        if (state.plannedTokens.length > 0) {
	            return consumeToken(stream, state);
	        }

	        // Normal start.
	        var currentState = state.current;
	        var currentLine = stream.match(/.*$/, false)[0];
	        var tokenized = tokenizer.getLineTokens(currentLine, currentState);
	        // We got a {tokens, state} object.
	        // Each token is a {value, type} object.
	        state.plannedTokens = tokenized.tokens;
	        state.current = tokenized.state;

	        // Consume a token.
	        return consumeToken(stream, state);
	    };

	    // Initialize all state.
	    var aceHighlightRules = new HighlightRules();
	    var tokenizer = new Tokenizer(aceHighlightRules.$rules);

	    return {
	        startState: function startState() {
	            return {
	                current: "start",
	                // List of {value, type}, with type being an Ace token string.
	                plannedTokens: []
	            };
	        },
	        blankLine: function blankLine(state) {
	            matchToken("", state);
	        },
	        token: matchToken
	    };
	});

	CodeMirror.defineMIME("text/x-asciidoc", "asciidoc");

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfJsTreeWrap = jfJsTreeWrap;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfJsTreeWrapController = (function () {
	    /* @ngInject */

	    jfJsTreeWrapController.$inject = ["$scope", "$q", "$element", "$timeout"];
	    function jfJsTreeWrapController($scope, $q, $element, $timeout) {
	        var _this = this;

	        _classCallCheck(this, jfJsTreeWrapController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	        this.$q = $q;

	        $scope.$watch("jfJsTreeWrap.treeData", function (data) {
	            if (data && !_this.built) _this.initTree();
	        });
	    }

	    _createClass(jfJsTreeWrapController, {
	        treeConfig: {
	            value: function treeConfig() {
	                return {
	                    core: {
	                        data: {}
	                    },
	                    checkbox: {
	                        keep_selected_style: false,
	                        three_state: true,
	                        tie_selection: false,
	                        whole_node: false
	                    },
	                    plugins: this.checkboxes === true || this.checkboxes === undefined ? ["wholerow", "checkbox"] : []
	                };
	            }
	        },
	        initTree: {
	            value: function initTree() {
	                var _this = this;

	                this.buildTree().then(function () {
	                    _this.registerTreeEvents();
	                    if (_this.onReady) _this.onReady({ jstree: _this.jstree() });
	                    _this.built = true;
	                });
	            }
	        },
	        registerTreeEvents: {
	            value: function registerTreeEvents() {
	                var _this = this;

	                $(this.treeElement).on("select_node.jstree", function (e, args) {});
	                $(this.treeElement).on("check_node.jstree", function (e, args) {
	                    if (_this.onStateChange) _this.$timeout(function () {
	                        return _this.onStateChange();
	                    });
	                });
	                $(this.treeElement).on("uncheck_node.jstree", function (e, args) {
	                    if (_this.onStateChange) _this.$timeout(function () {
	                        return _this.onStateChange();
	                    });
	                });
	            }
	        },
	        buildTree: {
	            value: function buildTree() {
	                var _this = this;

	                this.transformedData = this.transformData(this.treeData);
	                var TreeConfig = this.treeConfig();

	                TreeConfig.core.data = function (obj, cb) {
	                    if (obj.id === "#") cb(_this.transformedData);else {
	                        var children = _this.getChildrenFunc({ node: obj.data.originalObject() });
	                        if (children.then) {
	                            children.then(function (data) {
	                                return cb(_this.transformData(data));
	                            });
	                        } else {
	                            cb(children ? _this.transformData(children) : []);
	                        }
	                    }
	                };
	                this.treeElement = $(this.$element).find(".tree-element");
	                $(this.treeElement).jstree(TreeConfig);

	                var defer = this.$q.defer();
	                $(this.treeElement).on("ready.jstree", function (e) {
	                    defer.resolve();
	                });
	                return defer.promise;
	            }
	        },
	        jstree: {
	            value: function jstree() {
	                return $(this.treeElement).jstree();
	            }
	        },
	        transformData: {
	            value: function transformData(origData) {
	                var _this = this;

	                if (!origData || !origData.length) {
	                    return;
	                }return _.map(origData, function (origItem) {
	                    var item = {};
	                    item.data = { originalObject: function () {
	                            return origItem;
	                        } };
	                    var children = _this.getChildrenFunc({ node: origItem });
	                    item.children = children && (children.length || children.then) ? true : [];
	                    item.text = _this.getTextFunc({ node: origItem }) || "";
	                    item.icon = "jf-tree-no-icon";
	                    item.state = _this.getInitialStateFunc ? _this.getInitialStateFunc({ node: origItem }) : { opened: false, disabled: false, selected: false, checked: false };

	                    _this.setItemMethods(origItem);

	                    return item;
	                });
	            }
	        },
	        setItemMethods: {
	            value: function setItemMethods(item) {
	                var _this = this;

	                item.$isChecked = function () {
	                    var node = _this.getTreeNodeByOrigItem(item);
	                    return node ? _this.jstree().is_checked(node) : false;
	                };
	                item.$isOpened = function () {
	                    var node = _this.getTreeNodeByOrigItem(item);
	                    return node ? _this.jstree().is_open(node) : false;
	                };
	                item.$setChecked = function () {
	                    var checked = arguments[0] === undefined ? true : arguments[0];

	                    var node = _this.getTreeNodeByOrigItem(item);
	                    if (node) {
	                        if (checked) _this.jstree().check_node(node);else _this.jstree().uncheck_node(node);
	                    }
	                };
	                item.$setOpened = function () {
	                    var opened = arguments[0] === undefined ? true : arguments[0];

	                    var node = _this.getTreeNodeByOrigItem(item);
	                    if (node) {
	                        if (opened) _this.jstree().open_node(node, null, false);else _this.jstree().close_node(node, null, false);
	                    }
	                };
	            }
	        },
	        getTreeNodeByOrigItem: {
	            value: function getTreeNodeByOrigItem(origItem) {
	                var treeJSON = this.jstree().get_json();
	                var found = undefined;
	                var recursiveFind = function (arr) {
	                    for (var i = 0; i < arr.length; i++) {
	                        if (arr[i].data.originalObject() === origItem) {
	                            found = arr[i];
	                            break;
	                        }
	                    }
	                    if (!found) {
	                        for (var i = 0; i < arr.length; i++) {
	                            if (arr[i].children && arr[i].children.length) {
	                                found = recursiveFind(arr[i].children);
	                                if (found) break;
	                            }
	                        }
	                    }
	                    return found;
	                };
	                recursiveFind(treeJSON);
	                return found;
	            }
	        },
	        hasData: {
	            value: function hasData() {
	                return this.treeData && this.treeData.length;
	            }
	        }
	    });

	    return jfJsTreeWrapController;
	})();

	function jfJsTreeWrap() {
	    return {
	        restrict: "E",
	        scope: {
	            treeData: "=",
	            treeHeader: "=",
	            checkboxes: "=",
	            getTextFunc: "&",
	            getChildrenFunc: "&",
	            getInitialStateFunc: "&?",
	            onStateChange: "&?",
	            onReady: "&?"
	        },
	        controller: jfJsTreeWrapController,
	        controllerAs: "jfJsTreeWrap",
	        templateUrl: "directives/jf_js_tree_wrap/jf_js_tree_wrap.html",
	        bindToController: true
	    };
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfAutoComplete = jfAutoComplete;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by tomere on 29/06/2017.
	 */

	var jfAutoCompleteController = (function () {
		/* @ngInject */

		jfAutoCompleteController.$inject = ["$scope", "$element", "$attrs", "$timeout"];
		function jfAutoCompleteController($scope, $element, $attrs, $timeout) {
			var _this = this;

			_classCallCheck(this, jfAutoCompleteController);

			this.$element = $element;

			$($element).autocomplete({
				source: $scope.uiItems,
				select: function (event, ui) {
					if ($scope.onSelect) {
						$scope.onSelect({ selection: ui.item.value });
					}
				}
			});
			var widget = $($element).autocomplete("widget");
			widget.css("z-index", "9999999999");
			widget.css("max-height", "400px");
			widget.css("overflow-y", "auto");
			widget.css("overflow-x", "hidden");

			$scope.$watch("uiItems", function (newVal, oldVal) {
				_this.updateSource(newVal);
			});
		}

		_createClass(jfAutoCompleteController, {
			updateSource: {
				value: function updateSource(list) {
					$(this.$element).autocomplete({
						source: list
					});
				}
			}
		});

		return jfAutoCompleteController;
	})();

	function jfAutoComplete() {

		return {
			restrict: "A",
			scope: {
				uiItems: "=",
				onSelect: "&"
			},
			controller: jfAutoCompleteController
		};
	}

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	// More information regarding options could be found at: http://eonasdan.github.io/bootstrap-datetimepicker/Options/
	exports.jfDatetimepicker = jfDatetimepicker;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by tomere on 17/09/2017.
	 */

	var jfDatetimepickerController = (function () {
		/* @ngInject */

		jfDatetimepickerController.$inject = ["$timeout"];
		function jfDatetimepickerController($timeout) {
			_classCallCheck(this, jfDatetimepickerController);

			this.$timeout = $timeout;
		}

		_createClass(jfDatetimepickerController, {
			$onInit: {
				value: function $onInit() {
					this.dpOpitons = {
						allowInputToggle: true,
						toolbarPlacement: "top" };
					this.setDatepickerOptions();
				}
			},
			setDatepickerOptions: {
				value: function setDatepickerOptions() {
					if (this.options) {
						this.dpOpitons = _.assign({}, this.options, this.dpOpitons);
					}
				}
			},
			onUpdate: {
				value: function onUpdate() {
					var _this = this;

					this.$timeout(function () {
						if (_this.onChange && typeof _this.onChange === "function") {
							_this.onChange();
						}
						_this.setDatepickerOptions();
					}, 100);
				}
			},
			onBlur: {
				value: function onBlur() {
					this.isDatepickerOpen = false;
				}
			},
			onFocus: {
				value: function onFocus() {
					this.isDatepickerOpen = true;
				}
			}
		});

		return jfDatetimepickerController;
	})();

	function jfDatetimepicker() {
		return {
			restrict: "E",
			scope: {
				isDatepickerOpen: "=?",
				isRequired: "<",
				model: "=",
				options: "<?",
				attrId: "=",
				onChange: "&?",
				isEnabled: "="
			},
			controller: jfDatetimepickerController,
			controllerAs: "jfDatetimepicker",
			bindToController: true,
			templateUrl: "directives/jf_datetimepicker/jf_datetimepicker.html"
		};
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";

	exports.jfDynamicTemplate = jfDynamicTemplate;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function jfDynamicTemplate($compile) {
		return {
			restrict: "A",
			replace: true,
			link: function ($scope, ele, attrs) {
				$scope.$watch(attrs.jfDynamicTemplate, function (html) {
					ele.html(html);
					$compile(ele.contents())($scope);
				});
			}
		};
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfListSelection = jfListSelection;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfListSelectionController = (function () {
		function jfListSelectionController($timeout, $filter, $element) {
			_classCallCheck(this, jfListSelectionController);

			this.paginationApi = new PaginationApi(this);
			this.currentPage = 1;

			this.filter = $filter("filter");

			this.$timeout = $timeout;
			this.$element = $element;
			this.setItemsPerPage();
		}

		_createClass(jfListSelectionController, {
			setItemsPerPage: {
				value: function setItemsPerPage() {
					var _this = this;

					this.$timeout(function () {
						var containerHeight = _this.$element.find(".group-list-wrapper").innerHeight();
						var itemHeight = _this.$element.find(".group-list-item").outerHeight();
						_this.itemsPerPage = Math.floor(containerHeight / itemHeight);
					});
				}
			},
			getPageItems: {
				value: function getPageItems() {
					if (!this.usePagination) {
						return this.filter(this.items, this.filterList);
					}

					var start = (this.currentPage - 1) * this.itemsPerPage;
					var slice = this.filter(this.items, this.filterList).slice(start, start + this.itemsPerPage);
					return slice;
				}
			},
			onFilterChange: {
				value: function onFilterChange() {
					this.paginationApi.setPage(1);
					this.paginationApi.update();
				}
			},
			onItemSelection: {
				value: function onItemSelection(item) {
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
				}
			},
			onItemClick: {
				value: function onItemClick(item) {
					if (this.onSelect && typeof this.onSelect === "function") {
						this.onSelect({ item: item });
						this.paginationApi.update();
					}
				}
			}
		});

		return jfListSelectionController;
	})();

	function jfListSelection() {
		return {
			restrict: "E",
			scope: {
				items: "=",
				onSelect: "&",
				usePagination: "=?",
				highlightSelected: "<",
				allowSingleClick: "<?"
			},
			controller: jfListSelectionController,
			controllerAs: "jfListSelection",
			bindToController: true,
			templateUrl: "directives/jf_list_selection/jf_list_selection.html"
		};
	}

	var PaginationApi = (function () {
		function PaginationApi(ctrl) {
			_classCallCheck(this, PaginationApi);

			this.ctrl = ctrl;
		}

		_createClass(PaginationApi, {
			getTotalPages: {
				value: function getTotalPages() {
					if (!this.ctrl.usePagination) {
						return 0;
					}
					return Math.ceil(this.ctrl.filter(this.ctrl.items, this.ctrl.filterList).length / this.ctrl.itemsPerPage);
				}
			},
			getCurrentPage: {
				value: function getCurrentPage() {
					if (this.ctrl.currentPage > this.getTotalPages()) {
						this.ctrl.currentPage = this.getTotalPages();
					}
					if (this.ctrl.currentPage < 1) {
						this.ctrl.currentPage = 1;
					}
					return this.ctrl.currentPage;
				}
			},
			nextPage: {
				value: function nextPage() {
					if (this.ctrl.currentPage < this.getTotalPages()) {
						this.ctrl.currentPage++;
					}
				}
			},
			prevPage: {
				value: function prevPage() {
					if (this.ctrl.currentPage > 1) {
						this.ctrl.currentPage--;
					}
				}
			},
			setPage: {
				value: function setPage(pageNum) {
					if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
						this.ctrl.currentPage = pageNum;
					}
				}
			},
			update: {
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
			},
			registerChangeListener: {
				value: function registerChangeListener(listener) {
					this.listener = listener;
				}
			}
		});

		return PaginationApi;
	})();

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfDragAndDropTxt = jfDragAndDropTxt;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by tomere on 1/5/2017.
	 *
	 * @jf_drag_and_drop_txt
	 * A textarea with drag and drop ability
	 *
	 */

	var jfDragAndDropTxtController = (function () {

	    /**
	     * Constructor
	    * */

	    function jfDragAndDropTxtController($scope, $element, $attrs, JFrogNotifications) {
	        _classCallCheck(this, jfDragAndDropTxtController);

	        this.$scope = $scope;
	        this.$element = $element;
	        this.JFrogNotifications = JFrogNotifications;

	        // Binding dragenter,dragleave,drop to <jf_drang_and_drop_text> element
	        // since these events are not natively supported by Angular
	        this.$element.bind("dragover", this.handleDragEnter.bind(this));
	        this.$element.bind("dragleave", this.handleDragLeave.bind(this));
	        this.$element.bind("drop", this.handleDropEvent.bind(this));
	        this.draggedFileSizeLimit = 400; // limit file size (in KB)
	        this.entered = false;
	    }

	    _createClass(jfDragAndDropTxtController, {
	        $onInit: {
	            value: function $onInit() {
	                this.dndAutoFocus = this.dndAutoFocus === undefined ? true : this.dndAutoFocus;

	                this.dndCallToAction = this.dndCallToAction || "Copy your text or <b>drop a file</b>";
	            }
	        },
	        shouldDisplayUploadIcon: {
	            value: function shouldDisplayUploadIcon() {
	                return $(this.$element).find("textarea").val() === "" && !$(this.$element).is(".over");
	            }
	        },
	        onFileLoadSuccess: {

	            /**
	            *  File Reader event handlers
	            * */

	            value: function onFileLoadSuccess(event) {
	                this.dndContent = event.target.result;
	                $(this.$element).find("textarea").focus();
	                if (this.dndChange && this.dndChange !== null) this.dndChange();
	            }
	        },
	        onFileLoadFailure: {
	            value: function onFileLoadFailure(event) {
	                var errorMessage = "Unable to access license file.";
	                if (event.target.error.name === "SecurityError") {
	                    errorMessage += "<br> The file is either unsafe or being used by another application.";
	                }

	                if (this.dndOnError !== null) {
	                    this.dndOnError({ msg: errorMessage });
	                } else {
	                    this.JFrogNotifications.create({
	                        error: errorMessage
	                    });
	                }
	            }
	        },
	        handleDropEvent: {

	            /**
	            *  Drag event handlers
	            * */

	            value: function handleDropEvent(event) {
	                var _this = this;

	                this.entered = false;
	                this.toggleDragEffect();
	                event.preventDefault();
	                event.stopPropagation();

	                // Initialize a file reader and get file path
	                var reader = new FileReader();
	                var file = event.originalEvent.dataTransfer.files[0];

	                // Bind to reader events
	                reader.onload = function (event) {
	                    _this.onFileLoadSuccess(event);
	                };
	                reader.onerror = function (event) {
	                    _this.onFileLoadFailure(event);
	                };

	                // Limit the read file size
	                var fileSize = Math.round(file.size / 1000);
	                if (fileSize > this.draggedFileSizeLimit) {
	                    var errorMessage = "File exceeds the maximum size of " + this.draggedFileSizeLimit + " KB";

	                    if (this.dndOnError !== null) {
	                        this.dndOnError({ msg: errorMessage });
	                    } else {
	                        this.JFrogNotifications.create({
	                            error: errorMessage
	                        });
	                    }

	                    return false;
	                }

	                // Read the file if not exceeds size limit
	                reader.readAsText(file);
	            }
	        },
	        callingCodeShouldEnd: {
	            value: function callingCodeShouldEnd(event) {
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
	            }
	        },
	        handleDragEnter: {
	            value: function handleDragEnter(event) {
	                event.preventDefault();
	                event.stopPropagation(); // cancel the event on FF

	                if (this.callingCodeShouldEnd(event)) {
	                    return;
	                }

	                if (!this.entered) {
	                    this.entered = true;
	                    this.toggleDragEffect();
	                    event.originalEvent.dataTransfer.effectAllowed = "copy";
	                    return false;
	                }
	            }
	        },
	        handleDragLeave: {
	            value: function handleDragLeave(event) {
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
	            }
	        },
	        toggleDragEffect: {

	            /**
	            * Toggle the drag effect
	            * */

	            value: function toggleDragEffect() {
	                var dndWrapper = $(this.$element).find(".drag-and-drop-txt-wrapper");
	                // dndWrapper.removeClass('icon-upload');
	                dndWrapper.toggleClass("over");
	            }
	        }
	    });

	    return jfDragAndDropTxtController;
	})();

	function jfDragAndDropTxt() {
	    return {
	        restrict: "E",
	        scope: {
	            dndContent: "=",
	            dndHeadingHtml: "=?",
	            dndStyle: "=?",
	            dndChange: "&?",
	            dndRequired: "=?",
	            dndOnError: "&?",
	            dndCallToAction: "=?",
	            dndAutoFocus: "=?"
	        },
	        controller: jfDragAndDropTxtController,
	        controllerAs: "jfDragAndDropTxt",
	        templateUrl: "directives/jf_drag_and_drop_txt/jf_drag_and_drop_txt.html",
	        bindToController: true
	    };
	}

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfContextMenu = jfContextMenu;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by tomere on 25/10/2017.
	 * jfContextMenu - A component of context menu
	 */
	var CONTEXT_MENU_WIDTH = 190;
	var CONTEXT_MENU_ROW_HEIGHT = 40;
	var ERROR_MARGIN = 15;

	var jfContextMenuController = (function () {
		/* @ngInject */

		jfContextMenuController.$inject = ["$scope", "$timeout", "JFrogEventBus"];
		function jfContextMenuController($scope, $timeout, JFrogEventBus) {
			_classCallCheck(this, jfContextMenuController);

			this.$timeout = $timeout;
			this.$scope = $scope;
			this.JFrogEventBus = JFrogEventBus;
			this.EVENTS = JFrogEventBus.getEventsDefinition();
		}

		_createClass(jfContextMenuController, {
			$onInit: {
				value: function $onInit() {
					this.actions = [];
					this.isOpen = false;
					this._registerToEvents();
					this._handleDocumentClick();
				}
			},
			_registerToEvents: {
				/***
	    * _registerToEvents - Register events
	    **/

				value: function _registerToEvents() {
					var _this = this;

					this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.CONTEXT_MENU_OPEN, function (options) {
						_this.actions = options.actions;
						_this.clickedItemData = options.clickedItemData;
						_this._setContextMenuPosition(options.actions.length || Object.keys(options.actions).length, options.event.pageX, options.event.pageY);
						_this.isOpen = true;
					});
				}
			},
			_setContextMenuPosition: {

				/***
	    * _setContextMenuPosition - Set a new position to the context menu , according to the click position ,
	    * while making sure it is contained in the screen bounds
	    * @private
	    * @param numberOfActions
	    * @param pageX
	    * @param pageY
	    * */

				value: function _setContextMenuPosition(numberOfActions, pageX, pageY) {
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
						left: left,
						top: top
					};
				}
			},
			_onActionClick: {

				/***
	    * onActionClick - close the context menu and fire the action callback
	    * @private
	    * @param $event - the action click event
	    * @param action - the action to fire
	    * */

				value: function _onActionClick($event, action) {
					$event.stopPropagation();
					this.isOpen = false;
					if (action.callback) {
						action.callback(this.clickedItemData);
					}
					if (this.onAnyActionFired && typeof this.onAnyActionFired === "function") {
						this.onAnyActionFired();
					}
				}
			},
			_handleDocumentClick: {

				/***
	    * _handleDocumentClick - listen to all clicks on document and closes the context menu as response
	    * @private
	    * */

				value: function _handleDocumentClick() {
					var _this = this;

					var handler = function (e) {
						var target = $(e.target);
						var insideContextMenu = !!target.parents(".jf-context-menu").length;
						if (!insideContextMenu) {
							_this.$timeout(function () {
								_this.isOpen = false;
							});
						}
					};
					$(document).on("mousedown", handler);
					this.$scope.$on("$destroy", function () {
						$(document).off("mousedown", handler);
					});
				}
			}
		});

		return jfContextMenuController;
	})();

	function jfContextMenu() {
		return {
			restrict: "E",
			scope: {},
			controller: jfContextMenuController,
			controllerAs: "contextMenu",
			bindToController: true,
			templateUrl: "directives/jf_context_menu/jf_context_menu.view.html"
		};
	}

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfVScroll = jfVScroll;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfVScroll($timeout, $rootScope) {
	    return {
	        restrict: "E",
	        scope: {
	            itemVariableName: "@withEach",
	            origArray: "&in",
	            api: "="
	        },
	        templateUrl: "directives/jf_vscroll/jf_vscroll.html",
	        controller: jfVScrollController,
	        controllerAs: "jfVScroll",
	        bindToController: true,
	        transclude: true,
	        link: function link(scope, element, attrs, directiveCtrl, transcludeFn) {
	            transcludeFn(function (clone) {
	                var html = "";
	                for (var i = 0; i < clone.length; i++) {
	                    html += clone[i].outerHTML || "";
	                }
	                html = html.replace("ng-non-bindable=\"\"", "");
	                directiveCtrl.transcludedContent = html;
	            });
	        }
	    };
	}

	var jfVScrollController = (function () {
	    function jfVScrollController($scope, $timeout, $element, $q) {
	        var _this = this;

	        _classCallCheck(this, jfVScrollController);

	        this.$timeout = $timeout;
	        this.$scope = $scope;
	        this.$element = $element;
	        this.maxFakeScrollHeight = 1000000;

	        this.virtualScrollIndex = 0;
	        this.virtScrollDisplacement = 0;
	        this.scrollTimeout = undefined;

	        this.itemsPerPage = 1;
	        this.itemHeight = undefined;

	        this.ready = false;
	        var whenReadyDefer = $q.defer();
	        this.whenReady = whenReadyDefer.promise;
	        $scope.$watch("jfVScroll.ready", function () {
	            if (_this.ready) whenReadyDefer.resolve();
	        });

	        $scope.$watch("jfVScroll.containerHeight", function () {
	            _this._setAutoItemsPerPage();
	        });
	    }

	    _createClass(jfVScrollController, {
	        $onInit: {
	            value: function $onInit() {
	                this._initApi();
	            }
	        },
	        containerHeight: {
	            get: function () {
	                return $(this.$element).parent().height();
	            }
	        },
	        setItemHeight: {
	            value: function setItemHeight(itemHeight) {
	                if (this.itemHeight !== undefined && this.itemHeight !== itemHeight && !this.inequalHeightsWarned) {
	                    this.inequalHeightsWarned = true;
	                    console.error("Virtual scroll will not work correctly if items are not all the same height");
	                }
	                if (this.itemHeight === undefined) {
	                    this.itemHeight = itemHeight;
	                    this._setAutoItemsPerPage();
	                    this.ready = true;
	                    if (this.api.onInit) this.api.onInit();
	                }
	            }
	        },
	        _setAutoItemsPerPage: {
	            value: function _setAutoItemsPerPage() {
	                if (!this.itemHeight) {
	                    return;
	                }this.itemsPerPage = Math.floor(this.containerHeight / this.itemHeight);
	            }
	        },
	        initScrollFaker: {
	            value: function initScrollFaker() {
	                var _this = this;

	                var scrollParent = $(this.$element).find(".scroll-faker-container");
	                scrollParent.on("scroll", function (e) {
	                    _this.$scope.$apply(function () {
	                        if (_this.$$settingScroll) {
	                            delete _this.$$settingScroll;
	                            return;
	                        }
	                        if (_this.scrollTimeout) {
	                            _this.$timeout.cancel(_this.scrollTimeout);
	                            delete _this.scrollTimeout;
	                        }
	                        var len = _this.origArray().length;
	                        if (len) {
	                            var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
	                            var relativePosition = scrollParent.scrollTop() / maxScrollTop;
	                            if (_.isNaN(relativePosition)) {
	                                relativePosition = 1;
	                            }
	                            var newScrollIndex = relativePosition * (len - _this.itemsPerPage);
	                            if (newScrollIndex < 0) newScrollIndex = 0;
	                            _this.virtualScrollIndex = Math.floor(newScrollIndex);
	                            _this.virtScrollDisplacement = newScrollIndex - _this.virtualScrollIndex;
	                        } else {
	                            _this.virtualScrollIndex = 0;
	                            _this.virtScrollDisplacement = 0;
	                        }
	                    });
	                });
	            }
	        },
	        syncFakeScroller: {
	            value: function syncFakeScroller() {
	                var _this = this;

	                var delay = arguments[0] === undefined ? true : arguments[0];

	                var len = this.origArray().length;
	                var scrollParent = $(this.$element).find(".scroll-faker-container");
	                var relativePosition = this._getCurrentScrollPos() / (len - this.itemsPerPage);

	                var sync = function () {
	                    var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
	                    var scrollTop = Math.floor(maxScrollTop * relativePosition);
	                    _this.$$settingScroll = true;
	                    scrollParent.scrollTop(scrollTop);
	                };
	                if (delay) this.$timeout(sync);else sync();
	            }
	        },
	        getPage: {
	            value: function getPage() {
	                var vScrollIndex = this.virtualScrollIndex;
	                var additionals = vScrollIndex + this.itemsPerPage + 2 <= this.origArray().length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= this.origArray().length ? 1 : 0;
	                return this.origArray().slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
	            }
	        },
	        getTranslate: {
	            value: function getTranslate() {
	                var displacement = this.virtScrollDisplacement;
	                if (!displacement) {
	                    return 0;
	                } else {
	                    var pixels = displacement * this.itemHeight;
	                    return pixels;
	                }
	            }
	        },
	        getPageHeight: {
	            value: function getPageHeight() {
	                if (this.containerHeight) {
	                    return this.containerHeight;
	                } else {
	                    var len = this.origArray().length;
	                    if (len < this.itemsPerPage) {
	                        return len * this.itemHeight;
	                    } else {
	                        return this.itemsPerPage * this.itemHeight;
	                    }
	                }
	            }
	        },
	        getTotalScrollHeight: {
	            value: function getTotalScrollHeight() {
	                return this.origArray().length * this.itemHeight;
	            }
	        },
	        onMouseWheel: {
	            value: function onMouseWheel($event, $delta, $deltaX, $deltaY) {
	                if (this.scrollTimeout) {
	                    this.$timeout.cancel(this.scrollTimeout);
	                    delete this.scrollTimeout;
	                }

	                var normalDelta = this._normalizeWheelEvent($event.originalEvent).pixelY;
	                var xDelta = this._normalizeWheelEvent($event.originalEvent).pixelX;

	                if (Math.abs(normalDelta) < Math.abs(xDelta)) {
	                    $event.stopPropagation();
	                    return;
	                }

	                var scrollAmount = 0.02 * Math.abs(normalDelta);
	                var scrollPosBefore = this._getCurrentScrollPos();
	                if ($deltaY < 0) {
	                    // scrollUp
	                    this._scrollTo(scrollPosBefore + scrollAmount);
	                } else if ($deltaY > 0) {
	                    // scrollDown
	                    this._scrollTo(scrollPosBefore - scrollAmount);
	                }

	                if (scrollPosBefore !== this._getCurrentScrollPos()) $event.preventDefault();
	                //        this.syncFakeScroller(false);
	            }
	        },
	        _getCurrentScrollPos: {
	            value: function _getCurrentScrollPos() {
	                return this.virtualScrollIndex + this.virtScrollDisplacement;
	            }
	        },
	        scrollTo: {
	            value: function scrollTo(scrollPos) {
	                var duration = arguments[1] === undefined ? 500 : arguments[1];

	                var dist = scrollPos - this._getCurrentScrollPos();
	                this.scroll(dist, duration);
	            }
	        },
	        _scrollTo: {
	            value: function _scrollTo(scrollPos) {
	                var dist = scrollPos - this._getCurrentScrollPos();
	                this._scroll(dist);
	            }
	        },
	        scroll: {
	            value: function scroll(numOfRows) {
	                var _this = this;

	                var duration = arguments[1] === undefined ? 500 : arguments[1];

	                if (duration === 0) {
	                    this._scroll(numOfRows);
	                    return;
	                }

	                if (this.scrollTimeout) {
	                    this.$timeout.cancel(this.scrollTimeout);
	                    delete this.scrollTimeout;
	                }
	                var quadraticEase = function (k) {
	                    return k * (2 - k);
	                };

	                var interval = 40;
	                var currentScrollPos = this._getCurrentScrollPos();

	                var steps = Math.ceil(duration / interval);
	                var currentStep = 1;

	                var cycle = function () {
	                    var progress = currentStep / steps;
	                    _this._scrollTo(currentScrollPos + quadraticEase(progress) * numOfRows);
	                    currentStep++;
	                    if (currentStep <= steps) {
	                        _this.scrollTimeout = _this.$timeout(function () {
	                            return cycle();
	                        }, interval);
	                    } else delete _this.scrollTimeout;
	                };
	                cycle();
	            }
	        },
	        _scroll: {
	            value: function _scroll(numOfRows) {
	                if (!numOfRows) {
	                    return;
	                }var abs = Math.abs(numOfRows);
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
	                if (this.virtualScrollIndex + this.itemsPerPage >= this.origArray().length) {
	                    this.virtualScrollIndex = this.origArray().length - this.itemsPerPage;
	                    this.virtScrollDisplacement = 0;
	                }

	                if (this.virtualScrollIndex < 0) this.virtualScrollIndex = 0;

	                this.syncFakeScroller(false);
	            }
	        },
	        _normalizeWheelEvent: {
	            value: function _normalizeWheelEvent(event) {
	                var PIXEL_STEP = 10;
	                var LINE_HEIGHT = 40;
	                var PAGE_HEIGHT = 800;

	                var sX = 0,
	                    sY = 0,
	                    pX = 0,
	                    pY = 0;

	                if ("detail" in event) {
	                    sY = event.detail;
	                }
	                if ("wheelDelta" in event) {
	                    sY = -event.wheelDelta / 120;
	                }
	                if ("wheelDeltaY" in event) {
	                    sY = -event.wheelDeltaY / 120;
	                }
	                if ("wheelDeltaX" in event) {
	                    sX = -event.wheelDeltaX / 120;
	                }

	                // side scrolling on FF with DOMMouseScroll
	                if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
	                    sX = sY;
	                    sY = 0;
	                }

	                pX = sX * PIXEL_STEP;
	                pY = sY * PIXEL_STEP;

	                if ("deltaY" in event) {
	                    pY = event.deltaY;
	                }
	                if ("deltaX" in event) {
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

	                return { spinX: sX,
	                    spinY: sY,
	                    pixelX: pX,
	                    pixelY: pY };
	            }
	        },
	        resetScroll: {
	            value: function resetScroll() {
	                this.virtualScrollIndex = 0;
	                this.virtScrollDisplacement = 0;
	                this.syncFakeScroller(false);
	            }
	        },
	        centerOnItem: {
	            value: function centerOnItem(item) {
	                var _this = this;

	                if (!this.ready) {
	                    this.whenReady.then(function () {
	                        _this.centerOnItem(item);
	                    });
	                    return;
	                }

	                var prePaged = this.origArray();
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
	            }
	        },
	        bringItemToView: {
	            value: function bringItemToView(item) {
	                var jump = arguments[1] === undefined ? true : arguments[1];

	                var prePaged = this.origArray();
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
	            }
	        },
	        _hasHorizontalScrollbar: {
	            value: function _hasHorizontalScrollbar() {
	                var hScrollWrapper = $(this.$element).find(".h-scroll-wrapper");
	                return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
	            }
	        },
	        _getHorizontalScrollbarHeight: {
	            value: function _getHorizontalScrollbarHeight() {
	                var hScrollWrapper = $(this.$element).find(".h-scroll-wrapper");
	                return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
	            }
	        },
	        _freezeVScroll: {
	            value: function _freezeVScroll() {
	                this.$freezedVScrollIndex = this.virtualScrollIndex;
	                this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
	            }
	        },
	        _unFreezeVScroll: {
	            value: function _unFreezeVScroll() {
	                delete this.$freezedVScrollIndex;
	                delete this.$freezedVScrollDisplacement;
	            }
	        },
	        registerScrollListener: {
	            value: function registerScrollListener(listener) {
	                var _this = this;

	                if (!this.scrollListener) {
	                    this.scrollListener = listener;
	                    this.$scope.$watch("jfVScroll.virtualScrollIndex + jfVScroll.virtScrollDisplacement", function () {
	                        _this.scrollListener(_this._getCurrentScrollPos());
	                    });
	                }
	            }
	        },
	        _initApi: {
	            value: function _initApi() {
	                var _this = this;

	                if (this.api) {
	                    this.api.getPageData = function () {
	                        return _this.getPage();
	                    };
	                    this.api.reset = function (item) {
	                        return _this.resetScroll();
	                    };
	                    this.api.centerOnItem = function (item) {
	                        return _this.centerOnItem(item);
	                    };
	                    this.api.bringItemToView = function (item) {
	                        var jump = arguments[1] === undefined ? true : arguments[1];
	                        return _this.bringItemToView(item, jump);
	                    };
	                    this.api.freezeScroll = function () {
	                        return _this._freezeVScroll();
	                    };
	                    this.api.unFreezeScroll = function () {
	                        return _this._unFreezeVScroll();
	                    };
	                    this.api.sync = function () {
	                        return _this.syncFakeScroller(false);
	                    };
	                    this.api.scroll = function (numOfRows) {
	                        var duration = arguments[1] === undefined ? 500 : arguments[1];
	                        return _this.scroll(numOfRows, duration);
	                    };
	                    this.api.scrollTo = function (scrollPos) {
	                        var duration = arguments[1] === undefined ? 500 : arguments[1];
	                        return _this.scrollTo(scrollPos, duration);
	                    };
	                    this.api.registerScrollListener = function (listener) {
	                        return _this.registerScrollListener(listener);
	                    };
	                }
	            }
	        }
	    });

	    return jfVScrollController;
	})();

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfVScrollElement = jfVScrollElement;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfVScrollElement($compile) {
	    return {
	        restrict: "E",
	        scope: {
	            data: "=",
	            template: "=",
	            variable: "=",
	            index: "=",
	            vscroll: "="
	        },
	        template: "<div class=\"compile-placeholder\"></div>",
	        controller: jfVScrollElementController,
	        controllerAs: "jfVScrollElement",
	        bindToController: true,
	        link: function link(scope, element, attrs, directiveCtrl) {

	            var elementScope = scope.$parent.$parent.$parent.$new();
	            var target = $(element).find(".compile-placeholder");

	            elementScope[directiveCtrl.variable] = directiveCtrl.data;
	            elementScope.$index = directiveCtrl.index;

	            directiveCtrl.elementScope = elementScope;
	            var compiled = $compile($("<div>" + directiveCtrl.template + "</div>"))(elementScope);
	            target.replaceWith(compiled);
	        }
	    };
	}

	var jfVScrollElementController = (function () {
	    function jfVScrollElementController($scope, $element, $timeout) {
	        var _this = this;

	        _classCallCheck(this, jfVScrollElementController);

	        this.$element = $element;

	        var unwatchHeight = $scope.$watch("jfVScrollElement.childrenHeight", function () {
	            if (_this.childrenHeight && _this.childrenHeight > 1) {
	                _this.vscroll.setItemHeight(_this.childrenHeight);
	                unwatchHeight();
	            }
	        });

	        $scope.$watch("jfVScrollElement.data", function () {
	            _this.elementScope[_this.variable] = _this.data;
	        });
	    }

	    _createClass(jfVScrollElementController, {
	        childrenHeight: {
	            get: function () {
	                return $(this.$element).children().height();
	            }
	        }
	    });

	    return jfVScrollElementController;
	})();

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfPendingData = jfPendingData;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfPendingData() {
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {
	            waitFor: "=",
	            delaySpinner: "@?"
	        },
	        controller: jfTinySpinnerController,
	        controllerAs: "$ctrl",
	        bindToController: true,
	        template: "\n            <div class=\"spinner-msg-local\" ng-if=\"$ctrl.waitFor === undefined && (!$ctrl.delaySpinner || $ctrl.showSpinner)\">\n                <div class=\"icon-hourglass-local\"></div>\n            </div>\n            <ng-transclude ng-if=\"$ctrl.waitFor !== undefined\"></ng-transclude>\n        " };
	}

	var jfTinySpinnerController = (function () {
	    function jfTinySpinnerController($timeout) {
	        _classCallCheck(this, jfTinySpinnerController);

	        this.$timeout = $timeout;
	    }

	    _createClass(jfTinySpinnerController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                if (this.delaySpinner) {
	                    this.$timeout(function () {
	                        _this.showSpinner = true;
	                    }, !_.isNaN(parseInt(this.delaySpinner)) ? this.delaySpinner : 400);
	                }
	            }
	        }
	    });

	    return jfTinySpinnerController;
	})();

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTextBox = jfTextBox;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTextBoxController = (function () {
	    /* @ngInject */

	    jfTextBoxController.$inject = ["$scope", "$element", "$timeout", "$interval", "$compile", "$q", "JfFullTextService"];
	    function jfTextBoxController($scope, $element, $timeout, $interval, $compile, $q, JfFullTextService) {
	        _classCallCheck(this, jfTextBoxController);

	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$timeout = $timeout;
	        this.$interval = $interval;
	        this.$element = $element;
	        this.fullTextModal = JfFullTextService;
	        this.$q = $q;
	    }

	    _createClass(jfTextBoxController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.seeAllText = this.seeAllText || "(Show All ...)";

	                this.fullTextElement.text(this.text);
	                this.registerResize();
	                this.$timeout(function () {
	                    return _this.refreshText();
	                });

	                this.$scope.$on("$destroy", function () {
	                    _this.deregisterResize();
	                });
	            }
	        },
	        registerResize: {
	            value: function registerResize() {
	                var _this = this;

	                var appliedRefresh = function () {
	                    _this.$scope.$apply(function () {
	                        _this.refreshText();
	                    });
	                };
	                var debouncedRefresh = _.debounce(appliedRefresh, 0, { leading: true });
	                //        let throttledRefresh = _.throttle(appliedRefresh, 150, {/*leading: false*/})

	                this.onResize = debouncedRefresh;

	                $(window).on("resize", this.onResize);
	            }
	        },
	        deregisterResize: {
	            value: function deregisterResize() {
	                $(window).off("resize", this.onResize);
	            }
	        },
	        containerElement: {
	            get: function () {
	                if (!this.cachedContainerElement) {
	                    this.cachedContainerElement = $(this.$element).find(".jf-text-box-container");
	                }
	                return this.cachedContainerElement;
	            }
	        },
	        fullTextElement: {
	            get: function () {
	                if (!this.cachedFullTextElement) {
	                    this.cachedFullTextElement = $(this.$element).find(".jf-text-box-content-full");
	                }
	                return this.cachedFullTextElement;
	            }
	        },
	        currentTextElement: {
	            get: function () {
	                if (!this.cachedCurrentTextElement) {
	                    this.cachedCurrentTextElement = $(this.$element).find(".jf-text-box-content-current");
	                }
	                return this.cachedCurrentTextElement;
	            }
	        },
	        stageElement: {
	            get: function () {
	                if (!this.cachedStageElement) {
	                    this.cachedStageElement = $(this.$element).find(".jf-text-box-content-stage");
	                }
	                return this.cachedStageElement;
	            }
	        },
	        containerHeight: {
	            get: function () {
	                return this.containerElement.height();
	            }
	        },
	        containerWidth: {
	            get: function () {
	                return this.containerElement.width();
	            }
	        },
	        numOfWholeRows: {
	            get: function () {
	                var auto = Math.floor(this.containerHeight / this.lineHeight + 0.1);
	                return this.maxLines ? Math.min(parseInt(this.maxLines), auto) : auto;
	            }
	        },
	        numOfActualRows: {
	            get: function () {
	                var contentHeight = this.fullTextElement.height();
	                return Math.ceil(contentHeight / this.lineHeight - 0.1);
	            }
	        },
	        numOfVisibleRows: {
	            get: function () {
	                var contentHeight = this.currentTextElement.height();
	                return Math.ceil(contentHeight / this.lineHeight - 0.1);
	            }
	        },
	        numOfStageRows: {
	            get: function () {
	                var contentHeight = this.stageElement.height();
	                return Math.ceil(contentHeight / this.lineHeight - 0.1);
	            }
	        },
	        isOverflowing: {
	            get: function () {
	                return this.numOfActualRows > this.numOfWholeRows;
	            }
	        },
	        setStageText: {
	            value: function setStageText(text) {
	                this.stageElement.text(text);
	            }
	        },
	        refreshText: {
	            value: function refreshText() {
	                var _this = this;

	                this.measureLineHeight();

	                if (!this.isOverflowing) {
	                    this.content = this.text;
	                } else {
	                    (function () {
	                        _this.stageElement.html("");
	                        var words = _this.splitText(_this.text);
	                        var i = 1;
	                        var getNumOfLinesUntil = function (index) {
	                            var withSeeAll = arguments[1] === undefined ? true : arguments[1];

	                            _this.setStageText(_.trimRight(words.slice(0, index).join("")) + (withSeeAll ? " " : ""));
	                            if (withSeeAll) _this.stageElement.append($("  <div class=\"jf-text-box-show-all\">" + _this.seeAllText + "</div>"));
	                            return _this.numOfStageRows;
	                        };
	                        while (getNumOfLinesUntil(i) <= _this.numOfWholeRows && i <= words.length) {
	                            i++;
	                        }

	                        if (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i)) {
	                            _this.wrapSeeAll = true;
	                        } else _this.wrapSeeAll = false;
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

	                        _this.setStageText(_.trimRight(fit.join("")) + (_this.isOverflowing ? " " : ""));
	                        if (_this.isOverflowing) _this.stageElement.append($("<div class=\"jf-text-box-show-all\">" + _this.seeAllText + "</div>"));

	                        var m = 0;
	                        while (_this.numOfStageRows > _this.numOfWholeRows && i > m) {
	                            m++;

	                            fit = words.slice(0, i - m);
	                            _this.setStageText(_.trimRight(fit.join("")) + (_this.isOverflowing ? " " : ""));
	                            if (_this.isOverflowing) _this.stageElement.append($("<div class=\"jf-text-box-show-all\">" + _this.seeAllText + "</div>"));
	                        }
	                        _this.content = _.trimRight(fit.join(""));
	                    })();
	                }
	                this.ready = true;
	            }
	        },
	        splitText: {
	            value: function splitText(text) {

	                if (this.splitCache) {
	                    return this.splitCache;
	                } else {
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
	                        if (part.length > 16) return part.split("");else return part;
	                    });

	                    parts = _.flatten(parts);

	                    this.splitCache = parts;
	                    return parts;
	                }
	            }
	        },
	        measureLineHeight: {
	            value: function measureLineHeight() {
	                this.stageElement.text("*");
	                this.lineHeight = this.stageElement.height();
	                if (this.maxLines) {
	                    this.containerElement.height(parseInt(this.maxLines) * this.lineHeight);
	                }
	            }
	        },
	        seeAll: {
	            value: function seeAll() {
	                var _this = this;

	                if (this.noAction) {
	                    return;
	                }var text = this.text;
	                if (this.customAction) {
	                    this.customAction({ text: text });
	                } else {
	                    this.fullTextModal.showFullTextModal(text, this.modalTitle || "Full Text", 500, false, null, "text-box-show-all-modal");
	                    this.deregisterResize();
	                    this.fullTextModal.modalInstance.result["finally"](function () {
	                        _this.$timeout(function () {
	                            return _this.registerResize();
	                        });
	                    });
	                }
	            }
	        }
	    });

	    return jfTextBoxController;
	})();

	function jfTextBox() {
	    return {
	        restrict: "E",
	        scope: {
	            text: "=",
	            numOfLines: "@",
	            modalTitle: "@?",
	            seeAllText: "@?",
	            maxLines: "@?",
	            customAction: "&?",
	            noAction: "@?"
	        },
	        controller: jfTextBoxController,
	        controllerAs: "jfTextBox",
	        bindToController: true,
	        templateUrl: "directives/jf_text_box/jf_text_box.html"
	    };
	}

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfReparent = jfReparent;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by tomere on 29/06/2017.
	 */

	var jfReparentController = (function () {
	    /* @ngInject */

	    jfReparentController.$inject = ["$element", "$timeout"];
	    function jfReparentController($element, $timeout) {
	        _classCallCheck(this, jfReparentController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	    }

	    _createClass(jfReparentController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.$timeout(function () {
	                    var target = _this.target ? $(_this.target) : $(document.body);
	                    var offset = _this.getOffset(_this.$element[0]);
	                    var targetOffset = _this.getOffset(target[0]);
	                    _this.$timeout(function () {
	                        target.append(_this.$element);
	                        _this.$element.css("position", "absolute");
	                        _this.$element.css("left", offset.left - targetOffset.left + "px");
	                        _this.$element.css("top", offset.top - targetOffset.top + "px");
	                        var width = _this.$element.width();
	                        var height = _this.$element.height();
	                        _this.$element.css("width", width + "px");
	                        _this.$element.css("height", height + "px");
	                    });
	                });
	            }
	        },
	        getOffset: {
	            value: function getOffset(el) {
	                var rect = el.getBoundingClientRect(),
	                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	                return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	            }
	        }
	    });

	    return jfReparentController;
	})();

	function jfReparent() {

	    return {
	        restrict: "A",
	        scope: {
	            target: "=jfReparent"
	        },
	        bindToController: true,
	        controller: jfReparentController
	    };
	}

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	// config object description
	// enableNgShow - (default false) enable tab switch with ngShow
	// --

	module.exports = jfWizard;

	function jfWizard() {

		return {
			restrict: "E",
			scope: {
				onTabSwitch: "&?",
				config: "<"
			},
			templateUrl: "directives/jf_wizard/jf.wizard.view.html",
			controller: jfWizardController,
			controllerAs: "$ctrl",
			transclude: true,
			link: function ($scope, element, attrs) {}
		};
	}

	var jfWizardController = (function () {
		function jfWizardController($scope, JFrogEventBus, $element, JFrogUIUtils) {
			var _this = this;

			_classCallCheck(this, jfWizardController);

			JFrogEventBus.registerOnScope($scope, JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, function (tab) {
				_this["switch"](tab);
			});
			this.$scope = $scope;
			this.$element = $element;
			this.JFrogUIUtils = JFrogUIUtils;
			this.onTabSwitch = $scope.onTabSwitch;
			this.config = $scope.config;
			this.init = true;
			this.tabs = [];
		}

		_createClass(jfWizardController, {
			registerTab: {
				value: function registerTab(tab) {
					if (this.init || tab.isSelectedTab) {
						this.active = tab;
						this.init = false;
					}
					this.tabs.push(tab);
				}
			},
			"switch": {
				value: function _switch(tab) {
					this.$element.find(".wizard-content").scrollTop(0);
					this.active = typeof tab === "string" ? _.find(this.tabs, function (t) {
						return t.title === tab;
					}) : tab;
					if (this.onTabSwitch) {
						this.onTabSwitch({ tab: this.active.title });
					}
					this.JFrogUIUtils.fireResizeEvent();
				}
			},
			isVisible: {
				value: function isVisible(tab) {
					return !tab.isVisibleTab || typeof tab.isVisibleTab === "function" && tab.isVisibleTab();
				}
			}
		});

		return jfWizardController;
	})();

/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = jfWizardElement;

	function jfWizardElement() {

	    return {
	        restrict: "E",
	        scope: {
	            title: "@",
	            isVisibleTab: "&?",
	            isSelectedTab: "<?"
	        },
	        templateUrl: "directives/jf_wizard/jf_wizard_element/jf.wizard.element.view.html",
	        require: "^jfWizard",
	        transclude: true,
	        link: function ($scope, element, attrs, jfWizardCtl) {
	            jfWizardCtl.registerTab({
	                title: attrs.title,
	                isSelectedTab: $scope.$ctrl.isSelectedTab,
	                isVisibleTab: $scope.$ctrl.isVisibleTab
	            });
	            $scope.$ctrl.jfWizardCtl = jfWizardCtl;
	            $scope.$ctrl.title = attrs.title;
	            $scope.$ctrl.config = $scope.$ctrl.jfWizardCtl.config;
	        },
	        controller: jfWizardElementController,
	        bindToController: true,
	        controllerAs: "$ctrl"
	    };
	}

	var jfWizardElementController = function jfWizardElementController($scope) {
	    _classCallCheck(this, jfWizardElementController);
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfBillboard = jfBillboard;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfBillboardController = (function () {
	    function jfBillboardController($element, $timeout, $window, $scope) {
	        _classCallCheck(this, jfBillboardController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	        this.$window = $window;
	        this.$scope = $scope;
	    }

	    _createClass(jfBillboardController, {
	        $onInit: {
	            value: function $onInit() {}
	        },
	        _generate: {
	            value: function _generate() {
	                var _this = this;

	                if (this.chart) {
	                    this.chart.destroy();
	                }

	                this.$timeout(function () {
	                    // timeout ensures element is sized in DOM before initializing bb
	                    /* Polyfill for IE 11 which doesnt support Object.assign */
	                    if (typeof Object.assign != "function") {
	                        // Must be writable: true, enumerable: false, configurable: true
	                        Object.defineProperty(Object, "assign", {
	                            value: function assign(target, varArgs) {
	                                // .length of function is 2
	                                "use strict";
	                                if (target == null) {
	                                    // TypeError if undefined or null
	                                    throw new TypeError("Cannot convert undefined or null to object");
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

	                    _this.chart = bb.generate(Object.assign({ bindto: _this.$element[0] }, _this.options));
	                });

	                this.$window.addEventListener("onorientationchange", function () {
	                    _this.chart.resize();
	                });
	            }
	        },
	        $onChanges: {
	            value: function $onChanges(changes) {
	                if (changes.options && this.chart) {
	                    this._generate();
	                }
	            }
	        },
	        $postLink: {
	            value: function $postLink() {
	                this._generate();
	            }
	        },
	        $onDestroy: {
	            value: function $onDestroy() {
	                if (this.chart) {
	                    this.chart.destroy();
	                }
	            }
	        }
	    });

	    return jfBillboardController;
	})();

	function jfBillboard() {
	    return {
	        scope: {
	            hideSearch: "@",
	            options: "<"
	        },
	        controller: jfBillboardController,
	        controllerAs: "jfBillboard",
	        bindToController: true
	    };
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	config.$inject = ["$urlMatcherFactoryProvider"];
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JFrogEventBus = __webpack_require__(78).JFrogEventBus;

	var JFrogNotifications = __webpack_require__(80).JFrogNotifications;

	var JFrogUILibConfig = __webpack_require__(81).JFrogUILibConfig;

	var JFrogDownload = __webpack_require__(82).JFrogDownload;

	var JFrogIFrameDownload = __webpack_require__(83).JFrogIFrameDownload;

	var JFrogUIModelSaverFactory = __webpack_require__(84).JFrogUIModelSaverFactory;

	var JFrogUIUtils = __webpack_require__(85).JFrogUIUtils;

	var WebWorkersPool = __webpack_require__(86).WebWorkersPool;

	var JFrogUIWebWorker = __webpack_require__(87).JFrogUIWebWorker;

	var recursiveDirective = __webpack_require__(88).recursiveDirective;

	var AdvancedStringMatch = __webpack_require__(89).AdvancedStringMatch;

	var ContextMenuService = __webpack_require__(90).ContextMenuService;

	var JfFullTextService = _interopRequire(__webpack_require__(91));

	var JFrogSubRouter = __webpack_require__(92).JFrogSubRouter;

	angular.module("jfrog.ui.essentials.services", ["ui.router", "jfrog.ui_components", "toaster"]).config(config).provider("JFrogUILibConfig", JFrogUILibConfig).service("JFrogEventBus", JFrogEventBus).factory("JFrogDownload", JFrogDownload).factory("JFrogIFrameDownload", JFrogIFrameDownload).factory("WebWorkersPool", WebWorkersPool).factory("recursiveDirective", recursiveDirective).service("JFrogNotifications", JFrogNotifications).service("JFrogUIUtils", JFrogUIUtils).factory("JFrogUIWebWorker", JFrogUIWebWorker).service("AdvancedStringMatch", AdvancedStringMatch).service("ContextMenuService", ContextMenuService).service("JfFullTextService", JfFullTextService).service("JFrogSubRouter", JFrogSubRouter).factory("JFrogUIModelSaverFactory", JFrogUIModelSaverFactory);

	function config($urlMatcherFactoryProvider) {
	    $urlMatcherFactoryProvider.type("JFrogSubRouterPath", {
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

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var LIBRARY_EVENTS = _interopRequire(__webpack_require__(79));

	/**
	 * Service for components communication
	 */

	var JFrogEventBus = exports.JFrogEventBus = (function () {

	    /**
	     * init an empty map
	     */
	    /* @ngInject */

	    JFrogEventBus.$inject = ["JFrogUILibConfig", "$timeout"];
	    function JFrogEventBus(JFrogUILibConfig, $timeout) {
	        _classCallCheck(this, JFrogEventBus);

	        this._listeners = Object.create(null);
	        this.JFrogUILibConfig = JFrogUILibConfig;

	        var events = LIBRARY_EVENTS;
	        _.extend(events, JFrogUILibConfig.getConfig().customEventsDefinition);
	        this.eventDef = events;

	        var eventNames = {};
	        Object.keys(events).forEach(function (key) {
	            return eventNames[events[key]] = key;
	        });

	        this.EVENTS = eventNames;
	    }

	    _createClass(JFrogEventBus, {
	        getEventsDefinition: {
	            value: function getEventsDefinition() {
	                return this.eventDef;
	            }
	        },
	        _randomId: {
	            value: function _randomId() {
	                return Math.floor(Math.random() * 100000000000 + 1);
	            }
	        },
	        register: {

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
	        },
	        _registerSingleEvent: {
	            value: function _registerSingleEvent(eventName, callback) {
	                var _this = this;

	                this._verifyEventExists(eventName);
	                this._listeners[eventName] = this._listeners[eventName] || [];
	                var listener = {
	                    _callback: callback,
	                    _id: this._randomId()
	                };
	                this._listeners[eventName].push(listener);

	                return function () {
	                    _this._remove(eventName, listener._id);
	                };
	            }
	        },
	        registerOnScope: {

	            /**
	             * Registers a callback and makes sure that it deregisters on scope destroy
	             */

	            value: function registerOnScope(scope, eventNames, callback) {
	                var deregisters = this.register(eventNames, callback);
	                if (!_.isArray(deregisters)) deregisters = [deregisters];
	                scope.$on("$destroy", function () {
	                    deregisters.forEach(function (deregister) {
	                        return deregister();
	                    });
	                });
	            }
	        },
	        dispatch: {

	            /**
	             *
	             * invoke all the callbacks in the array under the
	             * event key. throw an error if the event key doesn't
	             * exist
	             *
	             * @param {string} eventName
	             */

	            value: function dispatch(eventName, payload) {
	                this._verifyEventExists(eventName);
	                if (this._listeners[eventName]) {
	                    this._listeners[eventName].forEach(function (listener) {
	                        return listener._callback(payload);
	                    });
	                }
	            }
	        },
	        _verifyEventExists: {
	            value: function _verifyEventExists(eventName) {
	                if (!this.EVENTS || !this.EVENTS[eventName]) throw new Error("There are no events registered under the name " + eventName);
	            }
	        },
	        _remove: {

	            /**
	             *
	             * remove the callback from the array under the
	             * event name key if exist.
	             * throw an error if the event key doesn't exist
	             *
	             * @param {string} eventName
	             * @param {Number} index
	             */

	            value: function _remove(eventName, id) {
	                if (this._listeners[eventName] == "undefined") {
	                    throw new Error("This event does not exist");
	                }
	                if (!_.findWhere(this._listeners[eventName], { _id: id })) {
	                    throw new Error("This callback is not registered under this event name");
	                }

	                _.remove(this._listeners[eventName], function (listener) {
	                    return listener._id == id;
	                });
	            }
	        }
	    });

	    return JFrogEventBus;
	})();

/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";

	var events = {
		TABS_REFRESH: "tabs:refresh",
		TABS_URL_CHANGED: "tabs:url:changed",

		FORM_CLEAR_FIELD_VALIDATION: "form:clear:field",
		FORM_SUBMITTED: "form:submitted",

		CLOSE_MODAL: "modal:close",

		CLOSE_NOTIFICATIONS: "notifications:close",

		SIDEBAR_SIZE_CHANGE: "sidebar:size:change",

		RESET_GRID_PAGINATION: "reset:grid:pagination",

		TABLEVIEW_HIDE_ACTIONS_DROPDOWN: "tableview:hide:actions:dropdown",

		CONTEXT_MENU_OPEN: "context:menu:open",

		WIZARD_TAB_CHANGE: "wizard:tab:change"
	};

	module.exports = events;

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * wrapper around the ngToast service
	 * @url http://tamerayd.in/ngToast/#
	 */

	var JFrogNotifications = exports.JFrogNotifications = (function () {
	    /* @ngInject */

	    JFrogNotifications.$inject = ["toaster", "$timeout", "$rootScope", "JFrogEventBus"];
	    function JFrogNotifications(toaster, $timeout, $rootScope, JFrogEventBus) {
	        _classCallCheck(this, JFrogNotifications);

	        this.toast = toaster;
	        this.$timeout = $timeout;
	        this.lastNotification = null;
	        this.JFrogEventBus = JFrogEventBus;
	        this.$rootScope = $rootScope;
	        this.EVENTS = JFrogEventBus.getEventsDefinition();

	        this.errors = [];
	        this.MIN_ERROR_TIME = 6000;

	        this.registerEvents();
	    }

	    _createClass(JFrogNotifications, {
	        registerEvents: {
	            value: function registerEvents() {
	                var _this = this;

	                this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_NOTIFICATIONS, function () {
	                    _this.errors.forEach(function (error) {
	                        if (!error.closing) {
	                            error.closing = true;
	                            var now = new Date().getTime();
	                            var delay = now - error.time > _this.MIN_ERROR_TIME ? 0 : _this.MIN_ERROR_TIME - (now - error.time);
	                            _this.$timeout(function () {
	                                _this.toast.clear(error.instance);
	                                var i = _this.errors.indexOf(error);
	                                _this.errors.splice(i, 1);
	                            }, delay);
	                        }
	                    });
	                });
	            }
	        },
	        create: {
	            value: function create(message) {
	                var _this = this;

	                var allowHtml = arguments[1] === undefined ? false : arguments[1];

	                if (message.info) {
	                    if (this.lastNotification == message.info) {
	                        return false;
	                    }
	                    this.toast.pop({
	                        type: "success",
	                        timeout: message.timeout || 5000,
	                        body: message.info,
	                        showCloseButton: true,
	                        bodyOutputType: allowHtml ? "trustedHtml" : undefined,
	                        clickHandler: this.notifClickHandle });
	                    this.lastNotification = message.info;
	                    this.$timeout(function () {
	                        _this.lastNotification = null;
	                    }, message.timeout || 5000);
	                    //this.toast.create({animation:'fade',content:message.info});
	                }

	                if (message.error) {
	                    if (this.lastNotification == message.error) {
	                        return false;
	                    }
	                    var instance = this.toast.pop({
	                        type: "error",
	                        timeout: message.timeout || 0,
	                        body: message.error,
	                        showCloseButton: true,
	                        bodyOutputType: allowHtml ? "trustedHtml" : undefined,
	                        clickHandler: this.notifClickHandle
	                    });
	                    this.errors.push({ time: new Date().getTime(), instance: instance });
	                    this.lastNotification = message.error;
	                    this.$timeout(function () {
	                        _this.lastNotification = null;
	                    }, message.timeout || 0);
	                    //this.toast.danger({animation:'fade',content:message.error});
	                }
	                if (message.warn) {
	                    if (this.lastNotification == message.warn) {
	                        return false;
	                    }
	                    this.toast.pop({
	                        type: "warning",
	                        timeout: message.timeout || 5000,
	                        body: message.warn,
	                        showCloseButton: true,
	                        bodyOutputType: allowHtml ? "trustedHtml" : undefined,
	                        clickHandler: this.notifClickHandle
	                    });
	                    this.lastNotification = message.warn;
	                    this.$timeout(function () {
	                        _this.lastNotification = null;
	                    }, message.timeout || 0);
	                }
	            }
	        },
	        notifClickHandle: {
	            value: function notifClickHandle(toast, isCloseButton) {
	                return isCloseButton;
	            }
	        },
	        createMessageWithHtml: {

	            /**
	             * Show toast with HTML content
	             *
	             * @param message {{type: string, body: string}}
	             */

	            value: function createMessageWithHtml(message) {
	                this.toast.pop({
	                    type: message.type,
	                    body: message.body,
	                    bodyOutputType: "trustedHtml",
	                    timeout: message.timeout,
	                    showCloseButton: true,
	                    clickHandler: this.notifClickHandle
	                });
	            }
	        },
	        clear: {
	            value: function clear() {
	                this.toast.clear();
	            }
	        }
	    });

	    return JFrogNotifications;
	})();

/***/ },
/* 81 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//import bowerJSON     from '../../bower.json';

	var JFrogUILibConfig = exports.JFrogUILibConfig = (function () {
	    function JFrogUILibConfig() {
	        _classCallCheck(this, JFrogUILibConfig);

	        var buildNumber = "/* @echo BUILD_NUMBER */";
	        var buildVersion = "/* @echo BUILD_VERSION */";
	        var buildDev = "/* @echo BUILD_DEV */";

	        buildNumber = buildNumber === "undefined" ? undefined : buildNumber;
	        buildVersion = buildVersion === "undefined" ? undefined : buildVersion;
	        buildDev = buildDev === "undefined" ? undefined : buildDev;

	        //        this.version = buildNumber ? (buildDev ? (buildVersion+'-dev.'+buildNumber) : buildVersion) : 'UNKNOWN.VERSION';
	        this.version = buildVersion ? buildVersion : "UNKNOWN.VERSION";
	        this.buildNumber = buildNumber || "N/A";
	        this.config = {};

	        if (this.version === "UNKNOWN.VERSION") console.log("%cRunning with unknown version of jfrog-ui-essentials!", "color: #ff0000;");
	    }

	    _createClass(JFrogUILibConfig, {
	        $get: {
	            value: function $get() {
	                return this;
	            }
	        },
	        setConfig: {
	            value: function setConfig(config) {
	                _.extend(this.config, config);
	            }
	        },
	        getConfig: {
	            value: function getConfig() {
	                return this.config;
	            }
	        }
	    });

	    return JFrogUILibConfig;
	})();

/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";

	exports.JFrogDownload = JFrogDownload;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function JFrogDownload() {
	    return function (url) {
	        document.location = url;
	    };
	}

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	JFrogIFrameDownload.$inject = ["JFrogNotifications", "$timeout"];
	exports.JFrogIFrameDownload = JFrogIFrameDownload;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function JFrogIFrameDownload(JFrogNotifications, $timeout) {
	    "ngInject";
	    return function (url, defaultErrorMessage) {
	        var iframe = $("<iframe style=\"display: none\">");
	        iframe.on("load", function (event) {
	            var responseObjStr = undefined,
	                response = undefined,
	                defaultMessage = undefined;
	            try {
	                responseObjStr = $(event.target).contents().find("pre").text();
	            } catch (e) {
	                //workaround for ie .contents() ACCESS DENIED error
	                defaultMessage = defaultErrorMessage || "Something went wrong.";
	            }

	            if (responseObjStr) {
	                try {
	                    response = JSON.parse(JSON.parse(responseObjStr).errors[0].message).error;
	                } catch (e) {}
	            }

	            if (defaultMessage || response) {
	                (function () {
	                    var message = defaultMessage || response;
	                    $timeout(function () {
	                        JFrogNotifications.create({ error: message });
	                        if (iframe.parent().length) iframe.remove();
	                    });
	                })();
	            }
	        });

	        iframe.ready(function () {
	            $timeout(function () {
	                if (iframe.parent().length) iframe.remove();
	            }, 15000);
	        });

	        iframe.attr("src", url).appendTo("body");
	    };
	}

	//Do nothing

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.JFrogUIModelSaverFactory = JFrogUIModelSaverFactory;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var JFrogUIModelSaver = (function () {
		function JFrogUIModelSaver(controller, modelObjects, excludePaths, $timeout, JFrogModal, $q) {
			var _this = this;

			_classCallCheck(this, JFrogUIModelSaver);

			this.JFrogModal = JFrogModal;
			this.$q = $q;

			this.controller = controller;
			this.controller._$modelSaver$_ = this;
			this.confirmOnLeave = true;
			this.modelObjects = modelObjects;
			this.excludePaths = excludePaths;
			this.savedModels = {};
			this.saved = false;

			$timeout(function () {
				if (!_this.saved) {
					_this.save();
				}
			});
		}

		_createClass(JFrogUIModelSaver, {
			save: {
				value: function save(objectName) {
					var _this = this;

					this.modelObjects.forEach(function (objName) {
						if (!objectName || objectName === objName) {
							_this.savedModels[objName] = _.cloneDeep(_this.controller[objName]);
						}
					});
					this.saved = true;
				}
			},
			isModelSaved: {
				value: function isModelSaved() {
					var isSaved = true;
					for (var objectNameI in this.modelObjects) {
						var objectName = this.modelObjects[objectNameI];
						if (!angular.equals(this.savedModels[objectName], this.controller[objectName])) {
							var deefObj = DeepDiff(this.savedModels[objectName], this.controller[objectName]);
							if (this._isDiffReal(deefObj, this.excludePaths[objectNameI])) {
								isSaved = false;
								break;
							}
						}
					}
					return isSaved;
				}
			},
			_isDiffReal: {
				value: function _isDiffReal(deefObj, excludePaths) {

					var excludes = excludePaths ? excludePaths.split(";") : [];

					var isReal = false;

					for (var key in deefObj) {
						var deef = deefObj[key];

						if (deef.path && deef.path.length && (!_.isString(deef.path[deef.path.length - 1]) || deef.path[deef.path.length - 1].startsWith("$$") || this._isExcluded(deef.path, excludes))) {
							continue;
						}

						if (deef.lhs === undefined && deef.rhs === "" || deef.lhs === "" && deef.rhs === undefined || deef.lhs === undefined && _.isArray(deef.rhs) && deef.rhs.length === 0 || deef.lhs === undefined && _.isObject(deef.rhs) && Object.keys(deef.rhs).length === 0) {} else {
							//real
							isReal = true;
							break;
						}
					}

					return isReal;
				}
			},
			_isExcluded: {
				value: function _isExcluded(path, excludes) {
					if (!excludes.length) {
						return false;
					}
					var excluded = false;
					for (var i in excludes) {
						var exclude = excludes[i];
						var exPath = exclude.split(".");
						var match = true;
						for (var pI in exPath) {
							if (exPath[pI] !== "*" && exPath[pI] !== path[pI] || (exPath[pI] === "*" && path[pI]) === undefined) {
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
			},
			ask: {
				value: function ask() {
					var defer = this.$q.defer();
					if (!this.isModelSaved()) {
						JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = true;
						this.JFrogModal.confirm("You have unsaved changes. Leaving this page will discard changes.", "Discard Changes", { confirm: "Discard" }).then(function () {
							defer.resolve();
						})["finally"](function () {
							JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;
						});
					} else {
						defer.resolve();
					}
					return defer.promise;
				}
			}
		});

		return JFrogUIModelSaver;
	})();

	function JFrogUIModelSaverFactory($timeout, JFrogModal, $q) {
		return Object.defineProperties({
			createInstance: function (controller, modelObjects, excludePaths) {
				excludePaths = excludePaths || [];
				return new JFrogUIModelSaver(controller, modelObjects, excludePaths, $timeout, JFrogModal, $q);
			},
			checkDiscardConfirmation: function ($q, e) {
				var defer = $q.defer();
				var forms = $("form");
				var changeDiscovered = false;
				for (var i = 0; i < forms.length; i++) {
					var _ret = (function (i) {
						var form = forms[i];
						var controller = angular.element(form).controller() || angular.element(form).scope().$ctrl;

						if (controller && controller._$modelSaver$_ && controller._$modelSaver$_.confirmOnLeave && !controller._$modelSaver$_.isModelSaved()) {
							changeDiscovered = true;

							controller._$modelSaver$_.ask().then(function () {
								controller._$modelSaver$_.confirmOnLeave = false;
								defer.resolve();
							});

							return "break";
						}
					})(i);

					if (_ret === "break") break;
				}

				if (!changeDiscovered && !e) {
					defer.resolve();
				} else if (changeDiscovered && e) {
					e.preventDefault();
				}

				return defer.promise;
			}

		}, {
			confirmDiscardModalOpen: {
				get: function () {
					return JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen;
				},
				configurable: true,
				enumerable: true
			}
		});
	}

	JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;

	// not real

/***/ },
/* 85 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var JFrogUIUtils = exports.JFrogUIUtils = (function () {
		function JFrogUIUtils($timeout) {
			_classCallCheck(this, JFrogUIUtils);

			this.$timeout = $timeout;
		}

		_createClass(JFrogUIUtils, {
			getCapitalizedKeys: {
				value: function getCapitalizedKeys(object, dictionary) {

					var getCapitalized = function (str) {
						str = str.split("_").join(" ");
						str = str.split(" ").map(function (word) {
							return _.capitalize(word);
						}).join(" ");
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
			},
			getSafeHtml: {
				value: function getSafeHtml(unsafeHtml) {
					if (!unsafeHtml) {
						return unsafeHtml;
					}var decoded = _.unescape(unsafeHtml);
					var safe = _.escape(decoded);
					return safe;
				}
			},
			fireResizeEvent: {
				value: function fireResizeEvent() {
					var resizeEvent = document.createEvent("Event");
					resizeEvent.initEvent("resize", false, true);
					this.$timeout(function () {
						try {
							window.dispatchEvent(new Event("resize"));
						} catch (e) {
							window.dispatchEvent(resizeEvent);
						}
					});
				}
			},
			stringifyData: {
				value: function stringifyData(value, separator) {
					if (_.isEmpty(value)) {
						return "";
					}

					if (_.isArray(value)) {
						var resultArray = _.map(value, function (item) {
							if (item.name) {
								return item.name;
							}
							return item;
						});
						if (separator && typeof separator === "string") {
							return resultArray.join(separator);
						}
						return resultArray.join(", ");
					}

					return value;
				}
			},
			formatHtmlList: {
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
			},
			capitalizeFirstLetter: {
				value: function capitalizeFirstLetter(string) {
					return string.charAt(0).toUpperCase() + string.slice(1);
				}
			},
			saveTextAsFile: {
				value: function saveTextAsFile(text, fileName) {
					var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
					    ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
					    ieEDGE = navigator.userAgent.match(/Edge/g),
					    ieVer = ie ? ie[1] : ie11 ? 11 : ieEDGE ? 12 : -1;

					if (ie && ieVer < 10) {
						console.log("No blobs on IE ver<10");
						return;
					}

					var textFileAsBlob = new Blob([text], { type: "text/plain" });

					if (ieVer > -1) {
						window.navigator.msSaveBlob(textFileAsBlob, fileName);
						return;
					}

					var downloadLink = document.createElement("a");
					downloadLink.download = fileName;
					downloadLink.innerHTML = "Download File";
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
							console.log("oh my blob");
						};
						downloadLink.style.display = "none";
						document.body.appendChild(downloadLink);
						console.log(downloadLink);
					}

					downloadLink.click();
				}
			},
			compareVersions: {
				value: function compareVersions(aText, bText) {
					var splitters = /\-|\.|_/;
					var aArr = aText.split(splitters);
					var bArr = bText.split(splitters);
					var minLength = Math.min(aArr.length, bArr.length);

					var first = undefined;
					for (var i = 0; i < minLength; i++) {
						var aNum = parseInt(aArr[i]);
						var bNum = parseInt(bArr[i]);
						var aIsNum = !_.isNaN(aNum);
						var bIsNum = !_.isNaN(bNum);
						if (aIsNum && bIsNum && aNum < bNum) {
							first = "a";
							break;
						} else if (aIsNum && bIsNum && aNum > bNum) {
							first = "b";
							break;
						} else if (!aIsNum || !bIsNum || aNum === bNum) {
							if (aArr[i] < bArr[i]) {
								first = "a";
								break;
							} else if (aArr[i] > bArr[i]) {
								first = "b";
								break;
							}
						}
					}

					if (!first) {
						if (aArr.length > 3 && bArr.length > 3) {
							if (aArr.length > bArr.length) first = "b";else if (aArr.length < bArr.length) first = "a";
						} else {
							if (aArr.length > bArr.length) first = "a";else if (aArr.length < bArr.length) first = "b";
						}
					}
					return first === "a" ? -1 : first === "b" ? 1 : 0;
				}
			},
			sortData: {
				value: function sortData(aText, bText) {

					aText = aText.toLowerCase();
					bText = bText.toLowerCase();
					var aScore = 0,
					    bScore = 0;
					var aHasNumVal = !_.isNaN(parseInt(aText));
					var bHasNumVal = !_.isNaN(parseInt(bText));

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

								var addTo = this.compareVersions(aFromNum, bFromNum);

								if (addTo === -1) aScore += 100;
								if (addTo === 1) bScore += 100;
							}
						}

						if (aText < bText) aScore++;
						if (aText > bText) bScore++;
					}
					return aScore < bScore ? 1 : -1;
				}
			},
			b64EncodeUnicode: {
				value: function b64EncodeUnicode(str) {
					return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
						return String.fromCharCode("0x" + p1);
					}));
				}
			},
			escapeForRegex: {
				value: function escapeForRegex(string) {
					return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
				}
			}
		});

		return JFrogUIUtils;
	})();

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	WebWorkersPool.$inject = ["$q"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.WebWorkersPool = WebWorkersPool;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function WebWorkersPool($q) {
	    "ngInject";
	    return (function () {
	        function WebWorkersPool(webworkerPath) {
	            var poolSize = arguments[1] === undefined ? 10 : arguments[1];

	            _classCallCheck(this, WebWorkersPool);

	            this.webworkerPath = webworkerPath;
	            this.poolSize = poolSize;
	            //           this.debug();
	        }

	        _createClass(WebWorkersPool, {
	            debug: {
	                value: function debug() {
	                    var _this = this;

	                    this.debugEnabled = true;
	                    setInterval(function () {
	                        if (!_this.pool) return;
	                        var size = _this.pool.length;
	                        var free = _.filter(_this.pool, { busy: false }).length;
	                        console.log("Pool size: " + size + "   |   Free workers: " + free);
	                    }, 200);
	                }
	            },
	            open: {
	                value: function open(poolSize) {
	                    poolSize = poolSize || this.poolSize;
	                    this.pool = [];
	                    for (var i = 0; i < poolSize; i++) {
	                        this.addWorker();
	                    }
	                }
	            },
	            isOpened: {
	                value: function isOpened() {
	                    return !!this.pool;
	                }
	            },
	            close: {
	                value: function close() {
	                    if (!this.pool) {
	                        return;
	                    }this.pool.forEach(function (spot) {
	                        spot.worker.terminate();
	                    });
	                    this.pool = null;
	                }
	            },
	            kill: {
	                value: function kill() {
	                    var _this = this;

	                    var msgMatch = arguments[0] === undefined ? {} : arguments[0];

	                    var busySpots = _.filter(this.pool, { busy: true });
	                    var matchedSpots = _.filter(busySpots, _.isEmpty(msgMatch) ? {} : { msg: msgMatch });
	                    matchedSpots.forEach(function (spot) {
	                        if (_this.debugEnabled) console.log("Terminating worker: #" + _this.pool.indexOf(spot));
	                        spot.worker.terminate();
	                        spot.worker = new Worker(_this.webworkerPath);
	                        spot.busy = false;
	                        spot.msg = null;
	                    });
	                    this.normalizePool();
	                }
	            },
	            normalizePool: {
	                value: function normalizePool() {
	                    while (this.pool.length > this.poolSize) {
	                        var freeSpot = _.find(this.pool, { busy: false });
	                        if (freeSpot) this.pool.splice(this.pool.indexOf(freeSpot), 1);else break;
	                    }
	                }
	            },
	            addWorker: {
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
	            },
	            send: {
	                value: function send(msg) {
	                    var _this = this;

	                    if (!this.pool) {
	                        console.error("WebWorkersPool: Must call open() before sending.");
	                        return;
	                    }

	                    var defer = $q.defer();

	                    var freeSpot = _.find(this.pool, { busy: false });

	                    if (!freeSpot) {
	                        freeSpot = this.addWorker();
	                    }

	                    freeSpot.worker.onmessage = function (e) {
	                        defer.resolve(e.data);
	                        freeSpot.busy = false;
	                        _this.normalizePool();
	                    };
	                    freeSpot.worker.onerror = function (e) {
	                        defer.reject(e);
	                        freeSpot.busy = false;
	                        _this.normalizePool();
	                    };

	                    freeSpot.busy = true;
	                    freeSpot.msg = msg;
	                    freeSpot.worker.postMessage(msg);

	                    return defer.promise;
	                }
	            }
	        });

	        return WebWorkersPool;
	    })();
	}

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	JFrogUIWebWorker.$inject = ["$q", "JFrogUILibConfig", "WebWorkersPool"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.JFrogUIWebWorker = JFrogUIWebWorker;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function JFrogUIWebWorker($q, JFrogUILibConfig, WebWorkersPool) {
		"ngInject";
		return (function () {
			function JFrogUIWebWorker() {
				_classCallCheck(this, JFrogUIWebWorker);

				this.$q = $q;
				this.JFrogUILibConfig = JFrogUILibConfig;
				this.wwPool = new WebWorkersPool(this.getPathToWebWorker(), 1);
			}

			_createClass(JFrogUIWebWorker, {
				getPathToWebWorker: {
					value: function getPathToWebWorker() {
						return (this.JFrogUILibConfig.config.webworkersPath || "") + "/jfrog-ui-essentials.webworker.js";
					}
				},
				check: {
					value: function check() {
						var _this = this;

						var defer = this.$q.defer();

						if (this.checking) {
							if (!this.pendingCheckDefers) this.pendingCheckDefers = [];
							this.pendingCheckDefers.push(defer);
						} else {
							this.wwPool.open();

							this.checking = true;
							this.wwPool.send({ cmd: "testWorker" }).then(function (response) {
								_this.checking = false;
								if (response === "OK") {
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
							})["catch"](function (e) {
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
				},
				open: {
					value: function open(poolSize) {
						this.wwPool.open(poolSize);
					}
				},
				close: {
					value: function close() {
						this.wwPool.close();
					}
				},
				markupPreview: {
					value: function markupPreview(type, markup) {
						var instanceId = arguments[2] === undefined ? 0 : arguments[2];

						if (!this.wwPool.isOpened()) this.open();

						var defer = this.$q.defer();

						this.wwPool.kill({ cmd: "convertMarkup", instanceId: instanceId });
						this.wwPool.send({ cmd: "convertMarkup", instanceId: instanceId, type: type, markup: markup }).then(function (response) {
							if (response.html !== undefined) {
								defer.resolve(response.html);
							} else defer.reject();
						})["catch"](function (e) {
							defer.reject();
						});

						return defer.promise;
					}
				},
				runFunction: {
					value: function runFunction(func) {
						for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							params[_key - 1] = arguments[_key];
						}

						if (!this.wwPool.isOpened()) this.open();

						var defer = this.$q.defer();

						this.wwPool.send({ cmd: "runFunction", "function": func.toString(), params: params }).then(function (response) {
							defer.resolve(response.response);
						})["catch"](function (e) {
							defer.reject();
						});

						return defer.promise;
					}
				}
			});

			return JFrogUIWebWorker;
		})();
	}

/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";

	exports.recursiveDirective = recursiveDirective;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function recursiveDirective($compile) {
		var _arguments = arguments;

		"ngInject";
		return {
			compile: function (elem, link) {
				link = _.isFunction(link) ? { post: link } : link;
				var origContents = elem.contents().remove();
				var compileFunction;
				return {
					pre: link && link.pre ? link.pre : null,
					post: function (scope, elem) {
						compileFunction = !compileFunction ? $compile(origContents) : compileFunction;
						compileFunction(scope, function (clone) {
							return elem.append(clone);
						});
						if (link && link.post) link.post.apply(null, _arguments);
					}
				};
			}
		};
	}

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var AdvancedStringMatch = exports.AdvancedStringMatch = (function () {
		function AdvancedStringMatch($sanitize) {
			var _this = this;

			_classCallCheck(this, AdvancedStringMatch);

			this.$sanitize = $sanitize;
			this.match = function (str, match) {
				return _this.doMatch(str, match);
			};
			this.highlight = function (elem, segments, hlElemType, hlClass) {
				return _this.doHighlight(elem, segments, hlElemType, hlClass);
			};
		}

		_createClass(AdvancedStringMatch, {
			getMatchCount: {
				value: function getMatchCount(str, match) {
					var searchInside = arguments[2] === undefined ? false : arguments[2];

					var i = 0;
					while (str[i] && match[i] && str[i] === match[i]) i++;

					var result = undefined;

					if (i === 0 && searchInside) {
						var len = match.length;
						var start = str.indexOf(match.substr(0, len));
						while (start === -1 && len > 0) {
							len--;
							start = str.indexOf(match.substr(0, len));
						}

						if (start !== -1 && len > 1) {
							i = start;
							while (str[i] && match[i - start] && str[i] === match[i - start]) i++;
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
			},
			doMatch: {
				value: function doMatch(str, match) {
					if (!str) {
						return;
					}str = str.toLowerCase();
					match = match.toLowerCase();
					if (!match || !str) {
						return {
							matched: false,
							segments: []
						};
					}var index = str.indexOf(match);
					if (index !== -1) {
						return {
							matched: true,
							segments: [{ start: index, length: match.length }]
						};
					} else {
						var regexp = /\_|\-|\.|\/| /;
						var regexp_no_dot = /\_|\-|\/| /;
						var parts = match.indexOf(".") !== -1 ? str.split(regexp_no_dot) : str.split(regexp);
						if (match.indexOf(".") !== -1) {
							(function () {
								var tempParts = [];
								parts.forEach(function (part) {
									if (part.indexOf(".") === -1) {
										tempParts.push(part);
									} else {
										var innerParts = part.split(".");
										innerParts = _.map(innerParts, function (part) {
											return "." + part;
										});
										innerParts[0] = innerParts[0].substr(1); // we don't want '.' before the first entry
										tempParts = tempParts.concat(innerParts);
									}
								});
								parts = tempParts;
							})();
						}

						match = match.split(regexp_no_dot).join("");
						var gotMatch = false;
						var pos = 0;
						var segments = [];
						var searchInside = false;
						if (match[0] === "*") {
							while (match[0] === "*") match = match.substr(1);
						}
						for (var i = 0; i < parts.length; i++) {
							var matchCount = this.getMatchCount(parts[i], match, !gotMatch || searchInside);
							if (matchCount.length !== 0) {
								if (parts[i].startsWith(".")) pos--;
								segments.push({
									start: pos + matchCount.start,
									length: matchCount.length
								});
								gotMatch = true;
							}
							match = match.substr(matchCount.length);

							if (match[0] === "*") {
								searchInside = true;
								while (match[0] === "*") match = match.substr(1);
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
			},
			getHighlighted: {
				value: function getHighlighted(text, segments, hlElemType, hlClass) {
					if (!segments.length || !text) {
						return text;
					} else {
						var last = 0;
						var highlighted = "";
						for (var i in segments) {
							if (text.substr(segments[i].start, segments[i].length)) {
								highlighted += this.$sanitize(text.substr(last, segments[i].start - last));
								highlighted += "<" + hlElemType + " class=\"" + hlClass + "\">";
								highlighted += this.$sanitize(text.substr(segments[i].start, segments[i].length));
								highlighted += "</" + hlElemType + ">";
								last = segments[i].start + segments[i].length;
							}
						}
						highlighted += this.$sanitize(text.substr(last, text.length - last));

						return highlighted;
					}
				}
			},
			doHighlight: {
				value: function doHighlight(elem, segments) {
					var hlElemType = arguments[2] === undefined ? "span" : arguments[2];
					var hlClass = arguments[3] === undefined ? "highlight" : arguments[3];

					var contents = elem.contents();
					var textNode = _.findWhere(contents, { nodeType: 3 });
					if (!textNode) {
						for (var i = 0; i < contents.length; i++) {
							textNode = _.findWhere(contents[i].childNodes, { nodeType: 3 });
							if (textNode) break;
						}
					}
					if (textNode) {
						var highlighted = this.getHighlighted(textNode.nodeValue, segments, hlElemType, hlClass);
						$(textNode).replaceWith(highlighted);
					}
				}
			}
		});

		return AdvancedStringMatch;
	})();

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by tomere on 25/10/2017.
	 * ContextMenuService - A service that creates a context menu for an html element
	 */

	var ContextMenuService = exports.ContextMenuService = (function () {
		/* @ngInject */

		ContextMenuService.$inject = ["$timeout", "$document", "JFrogEventBus", "$compile", "$rootScope"];
		function ContextMenuService($timeout, $document, JFrogEventBus, $compile, $rootScope) {
			_classCallCheck(this, ContextMenuService);

			this.$timeout = $timeout;
			this.$compile = $compile;
			this.$rootScope = $rootScope;
			this.$document = $document;
			this.JFrogEventBus = JFrogEventBus;
			this.EVENTS = JFrogEventBus.getEventsDefinition();
			this._compileContextMenu();
		}

		_createClass(ContextMenuService, {
			_getDirectiveForCompile: {

				/***
	    * _getDirectiveForCompile - positions and displays the context menu
	    * @private
	    * @param directiveName - a directive's name
	    * @returns An angular element
	    * */

				value: function _getDirectiveForCompile(directiveName) {
					var directiveElementName = _.kebabCase(directiveName);
					var directiveElement = document.createElement(directiveElementName);
					return angular.element(directiveElement.outerHTML);
				}
			},
			_compileContextMenu: {

				/***
	    * _compileContextMenu - Copmile the context menu once and apend to body
	    * @private
	    * */

				value: function _compileContextMenu() {
					this.$body = $(this.$document).find("body:eq(0)");
					if (!this.$body.find("jf-context-menu").length) {
						this.$scope = this.$rootScope.$new();
						var markup = this._getDirectiveForCompile("jfContextMenu");
						var elem = this.$compile(markup)(this.$scope);
						this.$body.append(elem);
					}
				}
			},
			_openContextMenu: {

				/***
	    * openContextMenu - fires the display event , listened by the context menu component
	    * @private
	    * @param actionsCallback - returns an array of action objects, each heaving name, icon, href, callback , or
	    *  either a $promise.
	    * @param clickedItem - a $element that represents the clicked element.
	    * @param event - the click event passed by using code
	    * */

				value: function _openContextMenu(actionsCallback, clickedItemData, clickEvent, trigger) {
					var _this = this;

					var _launchContextMenuEvent = function (actions) {
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
			},
			contextMenu: {

				/***
	    * contextMenu - sets a context menu for an element
	    * @public
	    * @param settings - gets a settings object consisted of
	    * */

				value: function contextMenu(settings) {
					var _this = this;

					$(document).contextmenu(function (e) {
						var target = $(e.target);
						var closest = target.closest(settings.selector);
						if (closest.length) {
							e.preventDefault();
							e.stopPropagation();
							_this.$timeout(function () {
								if (settings.build && typeof settings.build === "function") {
									_this._openContextMenu(settings.build, settings.data, e, closest);
								}
							});
							return false;
						}
					});
				}
			}
		});

		return ContextMenuService;
	})();

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	/**
	 * Created by tomere on 10/01/2018.
	 */

	var JfFullTextService = (function () {
		function JfFullTextService($rootScope, JFrogModal) {
			_classCallCheck(this, JfFullTextService);

			this.$rootScope = $rootScope;
			this.modal = JFrogModal;
		}

		_createClass(JfFullTextService, {
			showFullTextModal: {
				value: function showFullTextModal(text, textSubject, modalWidth) {
					var _this = this;

					var showAsList = arguments[3] === undefined ? false : arguments[3];
					var listItemClickCB = arguments[4] === undefined ? null : arguments[4];
					var windowClass = arguments[5] === undefined ? "" : arguments[5];

					if (!text || !text.length) {
						return;
					}
					this.modalScope = this.$rootScope.$new();
					this.modalScope.modalTitle = textSubject;

					this.modalScope.closeModal = function () {
						return _this.modalInstance.close();
					};

					if (!showAsList) this.modalScope.text = this.toHtmlRows(text);else {
						this.modalScope.list = text;
						this.modalScope.onItemClick = function (item) {
							_this.modalInstance.close();
							if (listItemClickCB) listItemClickCB(item);
						};
					}

					this.modalInstance = this.modal.launchModal("@full.text.modal", this.modalScope, modalWidth, true, { windowClass: "full-text-modal" + (windowClass ? " " + windowClass : "") });
				}
			},
			toHtmlRows: {
				value: function toHtmlRows(text) {
					if (typeof text === "string") {
						return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
					} else if (Array.isArray(text)) {
						return text.join("<br />");
					}
				}
			}
		});

		return JfFullTextService;
	})();

	module.exports = JfFullTextService;

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var JFrogSubRouter = exports.JFrogSubRouter = (function () {
	    function JFrogSubRouter($state, $location, $rootScope, $timeout) {
	        _classCallCheck(this, JFrogSubRouter);

	        this.$masterScope = $rootScope.$new();
	        this.$rootScope = $rootScope;
	        this.$state = $state;
	        this.$timeout = $timeout;
	        this.$location = $location;
	        this.$listeners = {};

	        this.supportedEvents = ["state.change", "params.change"];
	    }

	    _createClass(JFrogSubRouter, {
	        createLocalRouter: {
	            value: function createLocalRouter(config) {
	                var _this = this;

	                this._watchStateChanges();
	                this._watchLocationChanges();

	                if (this.$config) {
	                    this._exitState();
	                }

	                this.$config = _.cloneDeep(config);
	                this.$config.parentScope = config.parentScope;

	                this.$config.baseStateName = this.$state.current.name;
	                this.$config.basePath = _.trim(this._sharedStartOfString([this.$state.current.url, this.$location.path()]), "/");
	                if (this.$state.current.url.indexOf("JFrogSubRouterPath") === -1) {
	                    console.warn("In order for JFrogSubRouter to work properly, you must define the sub path in your ui-router state, as being of type 'JFrogSubRouterPath'. In your ui-router state definition, set the 'url' field as '/YOUR/BASE/PATH/{anySubRouteParamName:JFrogSubRouterPath}' ");
	                }

	                this._initParams();

	                this._mapPathToParams();

	                this._createScope();

	                this._createApiOnConfig();

	                this.$config.parentScope.$on("$destroy", function () {
	                    _this._exitState();
	                    _this.unwatchUIRouterState();
	                    _this.unwatchUrl();
	                });

	                return this.$config.$api;
	            }
	        },
	        getActiveRouter: {
	            value: function getActiveRouter() {
	                return this.$config.$api;
	            }
	        },
	        _createApiOnConfig: {
	            value: function _createApiOnConfig() {
	                var THIS = this;

	                this.$config.$api = Object.defineProperties({
	                    updateUrl: function updateUrl() {
	                        var force = arguments[0] === undefined ? false : arguments[0];

	                        if (!force && THIS.$config.hotSyncUrl) {
	                            return;
	                        } else THIS._mapParamsToPath();
	                    },
	                    goto: function goto(stateName, params) {
	                        THIS._gotoState(stateName, params);
	                    },
	                    listenForChanges: function listenForChanges(watchedParams, states, listener) {
	                        var _this = this;

	                        var scope = arguments[3] === undefined ? undefined : arguments[3];

	                        watchedParams = !_.isArray(watchedParams) ? [watchedParams] : watchedParams;
	                        states = !_.isArray(states) ? states ? [states] : [] : states;
	                        this.on("params.change", function (oldParams, newParams) {
	                            if (!states.length || _.includes(states, _this.state)) {
	                                var match = watchedParams.reduce(function (acc, curr) {
	                                    return acc || oldParams[curr] !== newParams[curr];
	                                }, false);
	                                if (match) listener(oldParams, newParams, _this.state);
	                            }
	                        }, scope);
	                    },
	                    on: function on(event, listener, scope) {
	                        var _this = this;

	                        if (!_.includes(THIS.supportedEvents, event)) {
	                            console.error("JFrogSubRouter: Unsupported Event: " + event);
	                            return;
	                        }
	                        if (!THIS.$listeners[event]) THIS.$listeners[event] = [];
	                        THIS.$listeners[event].push(listener);
	                        if (scope) {
	                            scope.$on("$destroy", function () {
	                                _this.off(event, listener);
	                            });
	                        }
	                    },
	                    off: function off(event, listener) {
	                        if (!_.includes(THIS.supportedEvents, event)) {
	                            console.error("JFrogSubRouter: Unsupported Event: " + event);
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
	                        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                            params[_key - 1] = arguments[_key];
	                        }

	                        if (THIS.$listeners[event]) {
	                            THIS.$listeners[event].forEach(function (listener) {
	                                return listener.apply(undefined, params);
	                            });
	                        }
	                    }

	                }, {
	                    params: {
	                        get: function () {
	                            return THIS.$config.$params;
	                        },
	                        set: function (params) {
	                            THIS.$config.$params = params;
	                            THIS._mapParamsToPath();
	                        },
	                        configurable: true,
	                        enumerable: true
	                    },
	                    state: {
	                        get: function () {
	                            return THIS._getCurrentState();
	                        },
	                        configurable: true,
	                        enumerable: true
	                    },
	                    config: {
	                        get: function () {
	                            return THIS.$config;
	                        },
	                        configurable: true,
	                        enumerable: true
	                    }
	                });
	            }
	        },
	        _sharedStartOfString: {
	            value: function _sharedStartOfString(array) {
	                var A = array.concat().sort(),
	                    a1 = A[0],
	                    a2 = A[A.length - 1],
	                    L = a1.length,
	                    i = 0;
	                while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
	                return a1.substring(0, i);
	            }
	        },
	        _createScope: {
	            value: function _createScope() {
	                var _this = this;

	                this.$config.$scope = this.$rootScope.$new();
	                this.$config.$scope.config = this.$config;

	                this.$config.$scope.unwatchParams = this.$config.$scope.$watch("config.$params", function (newVal, oldVal) {
	                    if (!_this.$config.$params || _this.$config.baseStateName !== _this.$state.current.name || _.isEqual(newVal, oldVal) && _.isEqual(_this._getPathAsParams(), _this.$config.$params)) {
	                        return;
	                    }
	                    if (_this.$config.hotSyncUrl) _this._mapParamsToPath();
	                }, true);
	                this.$config.$scope.unwatchState = this.$config.$scope.$watch("config.$api.state", function (newVal, oldVal) {
	                    if (newVal !== oldVal) {
	                        if (newVal === null) {
	                            if (_this.$config.onInvalidState) {
	                                _this.$config.onInvalidState(oldVal, _this.$config.$params);
	                            }
	                        } else {
	                            if (_this.$config.onStateChange) {
	                                _this.$config.onStateChange(oldVal, newVal);
	                                if (_this.$config) _this.$config.$api.fire("state.change", oldVal, newVal);
	                            }
	                        }
	                    }
	                });
	            }
	        },
	        _destroyScope: {
	            value: function _destroyScope() {
	                this.$config.$scope.unwatchParams();
	                this.$config.$scope.unwatchState();
	                this.$config.$scope.$destroy();
	            }
	        },
	        _exitState: {
	            value: function _exitState() {
	                this.$config.$destroyed = true;
	                this._destroyScope();
	                this.$config = null;
	            }
	        },
	        _getCurrentState: {
	            value: function _getCurrentState() {
	                var _this = this;

	                var state = null;
	                if (this.$config.states && this.$config.$initialized) {
	                    for (var i = 0; i < this.$config.states.length; i++) {
	                        var stateDef = this.$config.states[i];

	                        var mandatoriesCheck = stateDef.params.mandatory ? stateDef.params.mandatory.reduce(function (acc, curr) {
	                            return acc && !!_this.$config.$params[curr];
	                        }, true) : true;
	                        var nullifiedCheck = stateDef.params.nullify ? stateDef.params.nullify.reduce(function (acc, curr) {
	                            return acc && _this.$config.$params[curr] === null;
	                        }, true) : true;

	                        if (mandatoriesCheck && nullifiedCheck) {
	                            state = stateDef.name;
	                            break;
	                        }
	                    }
	                }
	                return state;
	            }
	        },
	        _gotoState: {
	            value: function _gotoState(stateName, params) {
	                var _this = this;

	                if (!this.$config.states) {
	                    console.error("Trying to go to state " + stateName + ", but no states were defined");
	                } else {
	                    var stateDef = _.find(this.$config.states, { name: stateName });
	                    if (!stateDef) {
	                        console.error("Trying to go to state " + stateName + ", but no such state were defined");
	                    } else {

	                        if (params) _.extend(this.$config.$params, params);

	                        if (stateDef.params.mandatory) {
	                            stateDef.params.mandatory.forEach(function (mandatoryParam) {
	                                if (!_this.$config.$params[mandatoryParam]) {
	                                    console.error("State change error: Missing mandatory param: " + mandatoryParam);
	                                }
	                            });
	                        }
	                        if (stateDef.params.nullify) {
	                            stateDef.params.nullify.forEach(function (nullifiedParam) {
	                                if (params && params[nullifiedParam]) {
	                                    console.error("State change error: Unsupported param: " + nullifiedParam);
	                                }
	                                _this.$config.$params[nullifiedParam] = null;
	                            });
	                        }
	                        if (stateDef.params.defaults) {
	                            for (var key in stateDef.params.defaults) {
	                                var value = stateDef.params.defaults[key];
	                                if (this.$config.$params[key] === null) {
	                                    this.$config.$params[key] = value;
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        },
	        _watchLocationChanges: {
	            value: function _watchLocationChanges() {
	                var _this = this;

	                if (!this.$masterScope.$location) this.$masterScope.$location = this.$location;
	                this.unwatchUrl = this.$masterScope.$watch("$location.absUrl()", function (newVal, oldVal) {
	                    if (_this.$config) {
	                        var beforeParams = _.cloneDeep(_this.$config.$params);
	                        _this._mapPathToParams();
	                        if (!_this.$config.$initialized) {
	                            _this.$config.$initialized = true;
	                            if (_this.$config.onInit) {
	                                _this.$config.onInit();
	                                beforeParams = _.cloneDeep(_this.$config.$params);
	                            }
	                        }
	                        if (!_.isEqual(beforeParams, _this.$config.$params)) {
	                            if (_this.$config.onChangeFromUrl) _this.$config.onChangeFromUrl(beforeParams, _this.$config.$params);
	                            if (_this.$config) _this.$config.$api.fire("params.change", beforeParams, _this.$config.$params);
	                        }
	                    }
	                });
	            }
	        },
	        _watchStateChanges: {
	            value: function _watchStateChanges() {
	                var _this = this;

	                var onStateChange = function (e, toState, toParams, fromState, fromParams) {
	                    if (_this.$config) {
	                        if (toState.name === _this.$config.baseStateName && fromState.name === _this.$config.baseStateName) {
	                            (function () {
	                                var search = _this.$location.search();
	                                _this.$state.go(toState.name, toParams, { notify: false, reload: false, location: "replace", inherit: true });
	                                _this.unwatchUrl();
	                                _this.$timeout(function () {
	                                    _this.$location.search(search).replace();
	                                    _this._watchLocationChanges();
	                                });
	                                e.preventDefault();
	                            })();
	                        }
	                    }
	                };
	                this.unwatchUIRouterState = this.$rootScope.$on("$stateChangeStart", onStateChange);
	            }
	        },
	        _getParametersFromConfig: {
	            value: function _getParametersFromConfig() {
	                var urlStructure = this.$config.urlStructure;

	                var _urlStructure$split = urlStructure.split("?");

	                var _urlStructure$split2 = _slicedToArray(_urlStructure$split, 2);

	                var pathParams = _urlStructure$split2[0];
	                var searchParams = _urlStructure$split2[1];

	                pathParams = _.without(pathParams.split("/"), "");
	                searchParams = searchParams.split("&");
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
	        },
	        _getPathAsParams: {
	            value: function _getPathAsParams() {
	                var _this = this;

	                var params = {};
	                var configParams = this._getParametersFromConfig();

	                var path = this.$location.path();
	                var search = this._decodeSearchParams(this.$location.search());

	                var basePathParts = this.$config.basePath.split("/");
	                var pathParts = _.filter(path.split("/"), function (part) {
	                    return part !== "" && !_.includes(basePathParts, part);
	                });

	                configParams.all.forEach(function (param) {
	                    if (params[param]) {
	                        params[param] = null;
	                    }
	                });

	                pathParts.forEach(function (part, index) {
	                    var param = configParams.path[index];
	                    if (param) params[param] = _this._customPathPartDecode(part);
	                });

	                configParams.search.forEach(function (searchParam) {
	                    if (search[searchParam]) {
	                        params[searchParam] = search[searchParam];
	                    }
	                });

	                return params;
	            }
	        },
	        _initParams: {
	            value: function _initParams() {
	                var _this = this;

	                this.$config.$params = {};
	                var configParams = this._getParametersFromConfig();
	                configParams.all.forEach(function (param) {
	                    _this.$config.$params[param] = null;
	                });
	            }
	        },
	        _mapPathToParams: {
	            value: function _mapPathToParams() {
	                var _this = this;

	                if (!this.$config) {
	                    return;
	                }var currentUrlParams = this._getPathAsParams();
	                _.extend(this.$config.$params, currentUrlParams);

	                var configParams = this._getParametersFromConfig();
	                var remove = false;
	                configParams.path.forEach(function (pathParam) {
	                    if (!currentUrlParams[pathParam]) remove = true;
	                    if (remove) _this.$config.$params[pathParam] = null;
	                });
	                var search = this._decodeSearchParams(this.$location.search());

	                configParams.search.forEach(function (queryParam) {
	                    if (!search[queryParam]) {
	                        _this.$config.$params[queryParam] = null;
	                    }
	                });
	            }
	        },
	        _mapParamsToPath: {
	            value: function _mapParamsToPath() {
	                var _this = this;

	                if (!this.$config) {
	                    return;
	                }var configParams = this._getParametersFromConfig();

	                var pathParts = [""].concat(this.$config.basePath.split("/"));
	                var stop = false;
	                configParams.path.forEach(function (param) {
	                    if (!stop) {
	                        var val = _this.$config.$params[param];
	                        if (val === null) {
	                            stop = true;
	                        } else {
	                            pathParts.push(_this._customPathPartEncode(val));
	                        }
	                    }
	                });

	                var searchParams = {};
	                configParams.search.forEach(function (param) {
	                    var val = _this.$config.$params[param];
	                    if (val !== null) {
	                        searchParams[param] = val;
	                    }
	                });

	                this.$location.search(this._encodeSearchParams(searchParams));
	                this.$location.path(pathParts.join("/") + "/");
	            }
	        },
	        _encodeSearchParams: {
	            value: function _encodeSearchParams(searchParams) {
	                var _this = this;

	                var isEmptyObject = function (obj) {
	                    return Object.keys(obj).reduce(function (acc, curr) {
	                        return acc && (obj[curr] === null || obj[curr] === undefined);
	                    }, true);
	                };

	                if (this.$config.encodeSearchParamsAsBase64 === true) {
	                    return isEmptyObject(searchParams) ? {} : { state: btoa(JSON.stringify(searchParams)) };
	                } else if (_.isString(this.$config.encodeSearchParamsAsBase64)) {
	                    return isEmptyObject(searchParams) ? {} : _defineProperty({}, this.$config.encodeSearchParamsAsBase64, btoa(JSON.stringify(searchParams)));
	                } else if (_.isObject(this.$config.encodeSearchParamsAsBase64)) {
	                    var _ret = (function () {
	                        var result = _.cloneDeep(searchParams);
	                        for (var key in _this.$config.encodeSearchParamsAsBase64) {
	                            (function (key) {
	                                var params = _this.$config.encodeSearchParamsAsBase64[key];
	                                var toEncode = {};
	                                params.forEach(function (param) {
	                                    delete result[param];
	                                    toEncode[param] = searchParams[param];
	                                });
	                                if (!isEmptyObject(toEncode)) result[key] = btoa(JSON.stringify(toEncode));
	                            })(key);
	                        }
	                        return {
	                            v: result
	                        };
	                    })();

	                    if (typeof _ret === "object") {
	                        return _ret.v;
	                    }
	                } else {
	                    return searchParams;
	                }
	            }
	        },
	        _decodeSearchParams: {
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
	        },
	        _customPathPartEncode: {
	            value: function _customPathPartEncode(pathPart) {
	                if (!pathPart) {
	                    return pathPart;
	                }return encodeURIComponent(pathPart).replace(/%2F/g, "~2F");
	            }
	        },
	        _customPathPartDecode: {
	            value: function _customPathPartDecode(pathPart) {
	                if (!pathPart) {
	                    return pathPart;
	                }return decodeURIComponent(pathPart.replace(/~2F/g, "%2F"));
	            }
	        }
	    });

	    return JFrogSubRouter;
	})();

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var FileSize = __webpack_require__(94).FileSize;

	var FormatedNumber = __webpack_require__(95).FormatedNumber;

	var SplitWords = __webpack_require__(96).SplitWords;

	module.exports = angular.module("jfrog.ui.essentials.filters", []).filter("filesize", FileSize).filter("formatedNumber", FormatedNumber).filter("splitWords", SplitWords);

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	exports.FileSize = FileSize;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function FileSize() {

	    return function (bytes, precision) {
	        if (bytes === 0) return "empty file";
	        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return "-";
	        if (typeof precision === "undefined") precision = 1;
	        var units = ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
	            number = Math.floor(Math.log(bytes) / Math.log(1024));
	        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + " " + units[number];
	    };
	}

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";

	exports.FormatedNumber = FormatedNumber;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function FormatedNumber() {

	    return function (value) {
	        var newValue = value;
	        if (value >= 1000) {
	            var suffixes = ["", "k", "m", "b", "t"];
	            var suffixNum = Math.floor(("" + value).length / 3);
	            var shortValue = "";
	            for (var precision = 2; precision >= 1; precision--) {
	                shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision));
	                var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
	                if (dotLessShortValue.length <= 2) {
	                    break;
	                }
	            }
	            if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
	            newValue = shortValue + suffixes[suffixNum];
	        }
	        return newValue;
	    };

	    /*return function(bytes, precision) {
	        if (bytes===0) return 'empty file'
	        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
	        if (typeof precision === 'undefined') precision = 1;
	        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            number = Math.floor(Math.log(bytes) / Math.log(1024));
	        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	    }*/
	}

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	exports.SplitWords = SplitWords;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function SplitWords() {

	    return function (string) {
	        return splitWords(string);
	    };
	}

	/** Splits a camel-case or Pascal-case variable name into individual words.
	 * @param {string} s
	 * @returns {string[]}
	 */
	function splitWords(str) {
	    return str
	    // insert a space between lower & upper
	    .replace(/([a-z])([A-Z])/g, "$1 $2")
	    // space before last upper in a sequence followed by lower
	    .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
	    // uppercase the first character
	    .replace(/^./, function (str) {
	        return str.toUpperCase();
	    });
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JfDivider = _interopRequire(__webpack_require__(98));

	var Grid = _interopRequire(__webpack_require__(101));

	var Modal = _interopRequire(__webpack_require__(105));

	var Uploader = _interopRequire(__webpack_require__(107));

	var JFTableView = _interopRequire(__webpack_require__(110));

	var JFTree = _interopRequire(__webpack_require__(119));

	var SummaryRow = _interopRequire(__webpack_require__(126));

	angular.module("jfrog.ui_components", [Grid.name, Modal.name, Uploader.name, JFTableView.name, JFTree.name, SummaryRow.name, JfDivider.name]);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JfDivider = _interopRequire(__webpack_require__(99));

	module.exports = angular.module("jf.divider", []).component("jfDivider", new JfDivider());

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var JfDivider = function JfDivider() {
		_classCallCheck(this, JfDivider);

		this.template = __webpack_require__(100);
		this.controller = JfDividerController;
		this.bindings = {
			text: "@"
		};
	};

	module.exports = JfDivider;

	var JfDividerController = function JfDividerController() {
		_classCallCheck(this, JfDividerController);
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "<div class=\"jf-divider-container\">\n\t<div class=\"jf-divider-header\">{{$ctrl.text}}</div>\n\t<div class=\"jf-divider-line\"></div>\n</div>\n";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JFrogGridFactory = __webpack_require__(102).JFrogGridFactory;

	module.exports = angular.module("jfrog_grid", ["ui.grid", "ui.grid.autoResize", "ui.grid.edit", "ui.grid.selection", "ui.grid.pagination", "ui.grid.grouping", "ui.grid.resizeColumns"]).service("JFrogGridFactory", JFrogGridFactory);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TEMPLATES_FOLDER = "ui_components/jfrog_grid/templates/",
	    MIN_COLUMN_WIDTH = 50;
	var headerCellTemplate = __webpack_require__(103);
	var groupHeaderCellTemplate = __webpack_require__(104);
	var globals = {};

	var COMMON_ACTIONS = {
	    "delete": {
	        icon: "icon icon-clear",
	        tooltip: "Delete"
	    },
	    download: {
	        icon: "icon icon-download",
	        href: function (row) {
	            return row.downloadLink;
	        },
	        tooltip: "Download"
	    }
	};

	var JFrogGrid = (function () {
	    /* @ngInject */

	    JFrogGrid.$inject = ["scope", "uiGridConstants"];
	    function JFrogGrid(scope, uiGridConstants) {
	        var _this = this;

	        _classCallCheck(this, JFrogGrid);

	        this.scope = scope;

	        if (scope) {
	            this.appScopeProvider = scope;
	        }
	        this.enableRowSelection = true;
	        this.enableRowHeaderSelection = false;
	        this.modifierKeysToMultiSelect = false;
	        this.multiSelect = false;
	        this.noUnselect = false;
	        this.enableColumnMenus = false;
	        this.rowHeight = 50;
	        this.headerRowHeight = 51;
	        this.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
	        this.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
	        this.groupingShowCounts = false;
	        this._afterRegister = [];

	        // pagination
	        this.paginationCallback = null;
	        this.enablePagination = true;
	        this.enablePaginationControls = false;
	        this.paginationPageSize = 25;
	        this.resetPagination();
	        this._handleColumnResize();

	        this.scope.$on("$destroy", function () {
	            return _this.onDestroy();
	        });
	    }

	    _createClass(JFrogGrid, {
	        resetPagination: {
	            value: function resetPagination() {
	                globals.JFrogEventBus.dispatch(globals.JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION);
	                if (this.paginationCurrentPage === 1) {
	                    this.getPage();
	                } else {
	                    this.paginationCurrentPage = 1;
	                }
	            }
	        },
	        getPagination: {
	            value: function getPagination() {
	                var pagination = {
	                    page_num: this.paginationCurrentPage,
	                    num_of_rows: this.paginationPageSize
	                };
	                var sortColumn = this.getSortColumn();
	                if (sortColumn) {
	                    pagination.direction = sortColumn.sort.direction;
	                    pagination.order_by = sortColumn.field || sortColumn.name;
	                } else {
	                    pagination.direction = "asc";
	                    pagination.order_by = this.columnDefs[0].field;
	                }
	                return pagination;
	            }
	        },
	        getSortColumn: {
	            value: function getSortColumn() {
	                if (_.isEmpty(this.api.grid.columns)) {
	                    return _.findWhere(this.columnDefs, { sort: {} });
	                } else {
	                    return this.api.grid.getColumnSorting()[0];
	                }
	            }
	        },
	        setExternalPagination: {
	            value: function setExternalPagination(callback) {
	                var _this = this;

	                // set external pagination params
	                this.useExternalPagination = true;
	                this.useExternalSorting = true;
	                this.paginationCallback = callback;
	                // register on sort and on page change callbacks
	                this.afterRegister(function (gridApi) {
	                    gridApi.core.on.sortChanged(_this.scope, function (grid, sortColumns) {
	                        _this.getPage();
	                    });
	                    gridApi.pagination.on.paginationChanged(_this.scope, function (pageNumber, pageSize) {
	                        _this.getPage();
	                    });
	                    // get initial page
	                    _this.getPage();
	                });
	                return this;
	            }
	        },
	        getPage: {
	            value: function getPage() {
	                var _this = this;

	                if (!this.paginationCallback) {
	                    return;
	                }
	                this.paginationCallback(this.getPagination()).then(function (pagedResponse) {
	                    _this.totalItems = pagedResponse.total_count;
	                    _this.setGridData(pagedResponse.data);
	                });
	            }
	        },
	        afterRegister: {
	            value: function afterRegister(callback) {
	                // If api is already registered - invoke the callback
	                if (this.api) {
	                    callback(this.api);
	                }

	                // Add it to array anyway (for cases when grid element is removed and added to DOM with ng-if)
	                this._afterRegister.push(callback);
	            }
	        },
	        fixGroupingUndefinedValues: {
	            value: function fixGroupingUndefinedValues() {
	                var _this = this;

	                if (this.api.grouping) {
	                    (function () {
	                        var origFunc = _this.api.grouping.groupColumn;
	                        _this.api.grouping.groupColumn = function (columnName) {
	                            var column = _.findWhere(_this.api.grid.columns, { displayName: columnName });
	                            var field = column.field;
	                            _this.api.grid.rows.forEach(function (row) {
	                                if (row.entity[field] === undefined) {
	                                    row.entity[field] = "";
	                                }
	                            });
	                            origFunc(columnName);
	                        };
	                    })();
	                }
	            }
	        },
	        _normalizeColumnWidths: {
	            value: function _normalizeColumnWidths(columnDefs) {
	                var totalSize = columnDefs.reduce(function (acc, curr) {
	                    var w = parseInt(curr.width);
	                    if (!_.isNaN(w)) return acc + w;else return acc;
	                }, 0);
	                var average = totalSize / columnDefs.length;
	                if (average === 0) average = 100;
	                columnDefs.forEach(function (column) {
	                    if (!column.width) {
	                        column.width = average + "%";
	                        totalSize += average;
	                    }
	                });
	                if (totalSize !== 100) {
	                    (function () {
	                        var ratio = 100 / totalSize;
	                        columnDefs.forEach(function (column) {
	                            var w = parseInt(column.width);
	                            if (!_.isNaN(w)) {
	                                column.width = ratio * w + "%";
	                            }
	                        });
	                    })();
	                }
	            }
	        },
	        refreshColumns: {
	            value: function refreshColumns() {
	                if (this.origColumnDefs) {
	                    this.setColumns(_.cloneDeep(this.origColumnDefs));
	                    this.firstRenderedIteration = false;
	                }
	            }
	        },
	        filterColumns: {
	            value: function filterColumns(columns) {
	                var _this = this;

	                return _.filter(columns, function (col) {
	                    return (!col.isVisible || col.isVisible()) && (!_this.visibleFields || _this.visibleFields.indexOf(col.field) !== -1);
	                });
	            }
	        },
	        setColumns: {
	            value: function setColumns(columnDefs) {
	                var _this = this;

	                if (!this.origColumnDefs) this.origColumnDefs = _.cloneDeep(columnDefs);
	                if (this.columnsCustomization && !this.availableColumns) {
	                    this.loadCustomizedColumnsState();
	                    this.createAvailableColumnsArray();
	                    this.updateCustomizedColumns(false);
	                }
	                columnDefs = this.filterColumns(columnDefs);
	                this._normalizeColumnWidths(columnDefs);
	                this.columnDefs = columnDefs;

	                this.columnDefs.forEach(function (item, index) {
	                    if (!item.headerCellTemplate) {
	                        if (item.allowGrouping) item.headerCellTemplate = groupHeaderCellTemplate;else item.headerCellTemplate = headerCellTemplate;
	                    }

	                    if (_this.subRowsEnabled) {
	                        if (item.sortingAlgorithm) {
	                            item.customSortingAlgorithm = item.sortingAlgorithm;
	                        }
	                        item.sortingAlgorithm = _this._defaultSortingAlgorithm.bind(_this, item);
	                        if (!item.cellTemplate) item.cellTemplate = "<div class=\"ui-grid-cell-contents\">{{row.entity." + item.field + ".$value}}</div>";
	                    }

	                    // enableCellEdit is by default true. If not defined - we want it to be false
	                    if (!item.enableCellEdit) {
	                        item.enableCellEdit = false;
	                    }
	                    // If given default actions, fetch their data from the default actions dictionary and add to the actions array
	                    if (item.actions) {
	                        item.customActions = item.customActions || [];
	                        _.forEach(item.actions, function (callback, key) {
	                            var action = undefined;
	                            if (callback.visibleWhen) {
	                                action = _this._getCommonAction(key, callback.callback, callback.visibleWhen);
	                            } else {
	                                action = _this._getCommonAction(key, callback.callback || callback);
	                            }
	                            item.customActions.push(action);
	                        });
	                    }
	                    if (!item.minWidth) item.minWidth = MIN_COLUMN_WIDTH;
	                });
	                return this;
	            }
	        },
	        _getCommonAction: {

	            // Get default action by key and append the callback

	            value: function _getCommonAction(key, callback, visibleWhen) {
	                var action = COMMON_ACTIONS[key];
	                action = angular.extend({ callback: callback }, action);
	                if (visibleWhen) {
	                    action = angular.extend({ visibleWhen: visibleWhen }, action);
	                }
	                return action;
	            }
	        },
	        _isElementVisible: {
	            value: function _isElementVisible(e) {
	                if (!e.length || e.css("display") === "none") {
	                    return false;
	                } else if (e.parent()[0] !== document) {
	                    return this._isElementVisible(e.parent());
	                } else {
	                    return true;
	                }
	            }
	        },
	        _calculateColumnsWidthByPercent: {

	            // Recalculates and sets the width of every column when the window resizes

	            value: function _calculateColumnsWidthByPercent(gridApi) {
	                if (!this._isElementVisible($(gridApi.grid.element[0]))) {
	                    return;
	                }var gridSize = $(gridApi.grid.element[0]).width(),
	                    resizedColumns = [],
	                    fieldColumnCounter = 0,
	                    columnWidthCounter = 0;

	                // Resize the columns with percentage width
	                gridApi.grid.columns.forEach(function (item, index) {
	                    if (item.visible) {
	                        if (item.colDef.field) {
	                            if (item.originalWidth && item.originalWidth.indexOf && item.originalWidth.indexOf("%") != -1) {
	                                var newColSize = Math.floor(gridSize * (item.originalWidth.replace("%", "") / 100));

	                                if (gridApi.grid.columns[index].colDef.minWidth && parseInt(gridApi.grid.columns[index].colDef.minWidth) > newColSize) newColSize = parseInt(gridApi.grid.columns[index].colDef.minWidth);

	                                gridApi.grid.columns[index].width = gridApi.grid.columns[index].colDef.width = newColSize;

	                                columnWidthCounter = columnWidthCounter + gridApi.grid.columns[index].width;
	                                resizedColumns.push(index);
	                            }

	                            fieldColumnCounter++;
	                        } else gridSize = gridSize - item.width;
	                    }
	                });

	                // Resize the columns that weren't set with percentage width with the remaining space
	                if (resizedColumns.length < fieldColumnCounter) {
	                    (function () {
	                        var columnWidthDiff = Math.floor((gridSize - columnWidthCounter) / (fieldColumnCounter - resizedColumns.length));

	                        gridApi.grid.columns.forEach(function (item, index) {
	                            if (item.visible && item.colDef.field && resizedColumns.indexOf(index) == -1) gridApi.grid.columns[index].width = gridApi.grid.columns[index].colDef.width = columnWidthDiff;
	                        });
	                    })();
	                } else if (columnWidthCounter > gridSize) {
	                    var columnWidthDiff = columnWidthCounter - gridSize,
	                        indexIterate = 0;

	                    while (columnWidthDiff > 0) {
	                        if (indexIterate == gridApi.grid.columns.length) indexIterate = 0;

	                        if (gridApi.grid.columns[indexIterate].visible && gridApi.grid.columns[indexIterate].colDef.field) {
	                            gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = gridApi.grid.columns[indexIterate].width - 1;
	                            columnWidthDiff = columnWidthDiff - 1;
	                        }

	                        indexIterate++;
	                    }
	                }

	                gridApi.grid.refreshCanvas(true);
	                gridApi.core.handleWindowResize();
	            }
	        },
	        _fixColumnsWidthFromPercentToPixel: {

	            // Set the columns width to a fixed pixel size, only on load, so the ui-grid itself won't resize them on window resize

	            value: function _fixColumnsWidthFromPercentToPixel(gridApi) {
	                var _this = this;

	                if (!this.firstRenderedIteration) {
	                    (function () {
	                        var firstRun = false;

	                        gridApi.grid.columns.forEach(function (item) {
	                            if (item.colDef.field && item.drawnWidth) {
	                                item.originalWidth = item.colDef.width;
	                                item.colDef.width = item.width;

	                                firstRun = true;
	                            }
	                        });

	                        if (firstRun) {
	                            _this._calculateColumnsWidthByPercent(gridApi);
	                            _this.firstRenderedIteration = true;
	                        }
	                    })();
	                }
	            }
	        },
	        _calculateColumnsWidthOnResize: {

	            // Resize the columns based on one column that is resized

	            value: function _calculateColumnsWidthOnResize(gridApi, colDef, deltaChange) {
	                var indexChanged = -1,
	                    indexIterate = undefined,
	                    pixelsToDivide = undefined,
	                    totalColumnWidth = 0;

	                // Check what column was actually resized
	                gridApi.grid.columns.forEach(function (item, index) {
	                    if (item.colDef === colDef) indexChanged = index;

	                    if (item.visible) totalColumnWidth = totalColumnWidth + parseInt(item.width);
	                });

	                indexIterate = indexChanged + 1;
	                pixelsToDivide = $(gridApi.grid.element[0]).width() - totalColumnWidth;

	                gridApi.grid.columns[indexChanged].colDef.width = gridApi.grid.columns[indexChanged].width;

	                // Resize the columns that follow the resized column
	                while (pixelsToDivide != 0 && indexIterate < gridApi.grid.columns.length) {
	                    if (indexIterate == gridApi.grid.columns.length) indexIterate = 0;
	                    while (!gridApi.grid.columns[indexIterate].colDef.field) indexIterate++;

	                    if (gridApi.grid.columns[indexIterate].width + pixelsToDivide < MIN_COLUMN_WIDTH) {
	                        pixelsToDivide = pixelsToDivide + (gridApi.grid.columns[indexIterate].width - MIN_COLUMN_WIDTH);
	                        gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = MIN_COLUMN_WIDTH;
	                    } else {
	                        gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = parseInt(gridApi.grid.columns[indexIterate].width) + pixelsToDivide;
	                        pixelsToDivide = 0;
	                    }

	                    indexIterate++;
	                }

	                // If the column was resized too much, shorten it so the grid won't overflow
	                if (pixelsToDivide != 0) {
	                    gridApi.grid.columns[indexChanged].width = gridApi.grid.columns[indexChanged].colDef.width = parseInt(gridApi.grid.columns[indexChanged].width) + pixelsToDivide;
	                }

	                gridApi.grid.refreshCanvas(true);
	            }
	        },
	        _handleColumnResize: {
	            value: function _handleColumnResize() {
	                var _this = this;

	                this.afterRegister(function (gridApi) {
	                    _this.calculateFn = function () {
	                        return _this._calculateColumnsWidthByPercent(gridApi);
	                    };

	                    $(globals.$window).resize(_this.calculateFn);
	                    if (_this.scope) _this.scope.$on("ui-layout.resize", _this.calculateFn);

	                    gridApi.core.on.rowsRendered(_this.scope, function () {
	                        return _this._fixColumnsWidthFromPercentToPixel(gridApi);
	                    });
	                    if (gridApi.colResizable) gridApi.colResizable.on.columnSizeChanged(_this.scope, function (colDef, deltaChange) {
	                        return _this._calculateColumnsWidthOnResize(gridApi, colDef, deltaChange);
	                    });
	                });
	            }
	        },
	        setButtons: {
	            value: function setButtons(buttons) {
	                if (!this.scope) {
	                    throw "Must set scope to use buttons";
	                }
	                this.buttons = buttons;
	                return this;
	            }
	        },
	        setBatchActions: {
	            value: function setBatchActions(batchActions) {
	                this.batchActions = batchActions;
	                this.setMultiSelect();
	                return this;
	            }
	        },
	        setGridData: {
	            value: function setGridData(data) {
	                var _this = this;

	                var transform = arguments[1] === undefined ? true : arguments[1];
	                var autoExpand = arguments[2] === undefined ? true : arguments[2];

	                if (transform && this.subRowsEnabled) {
	                    this.data = this._transformDataForSubRowsSupport(data, autoExpand);
	                } else {
	                    this.data = data;
	                }

	                this.afterRegister(function (gridApi) {
	                    gridApi.grid.element.css("visibility", "visible");
	                    _this.fixGroupingUndefinedValues();
	                });

	                if (!this.data || !this.data.length) {
	                    // if the grid is empty push an empty object
	                    this.data = [{ _emptyRow: true }];
	                    // Also disable select all in header
	                    this.enableSelectAll = false;
	                } else {
	                    // In case select all was chosen, re-enable it after data was added
	                    this.enableSelectAll = this._allowMultiSelect;
	                }

	                this._resize();

	                return this;
	            }
	        },
	        setKey: {
	            value: function setKey(key) {
	                var _this = this;

	                if (typeof key === "function") {
	                    this.keyFn = function (row) {
	                        return key(_this._complex2Simple(row));
	                    };
	                } else {
	                    this.keyFn = function (row) {
	                        return row[key] && row[key].$value ? row[key].$value : row[key];
	                    };
	                }
	                return this;
	            }
	        },
	        _complex2Simple: {
	            value: function _complex2Simple(row) {
	                var changeObject = arguments[1] === undefined ? false : arguments[1];

	                var simple = {};
	                for (var key in row) {
	                    if (!key.startsWith("$") && !key.startsWith("_")) {
	                        if (!changeObject) simple[key] = row[key] && row[key].$value !== undefined ? row[key].$value : row[key];else row[key] = row[key] && row[key].$value !== undefined ? row[key].$value : row[key];
	                    } else {
	                        if (!changeObject) simple[key] = row[key];
	                    }
	                }
	                return changeObject ? row : simple;
	            }
	        },
	        _simple2Complex: {
	            value: function _simple2Complex(row) {
	                var changeObject = arguments[1] === undefined ? false : arguments[1];

	                var complex = {};
	                for (var key in row) {
	                    if (!key.startsWith("$") && !key.startsWith("_")) {
	                        if (!changeObject) complex[key] = { $value: row[key] && row[key].$value !== undefined ? row[key].$value : row[key], $row: complex };else row[key] = { $value: row[key] && row[key].$value !== undefined ? row[key].$value : row[key], $row: row };
	                    } else {
	                        if (!changeObject) complex[key] = row[key];
	                    }
	                }
	                return changeObject ? row : complex;
	            }
	        },
	        updateGridData: {
	            value: function updateGridData(data) {
	                var _this = this;

	                if (!this.data || !this.data.length || !this.api) {
	                    return this.setGridData(data);
	                } else if (!this.keyFn) throw new Error("Cannot update data, no key was defined. (use setKey(key|keyFn))");else {
	                    data.forEach(function (row) {
	                        var exists = _.find(_this.api.grid.rows, function (r) {
	                            return _this.keyFn(r.entity) === _this.keyFn(row);
	                        });
	                        if (exists) {
	                            for (var key in exists.entity) {
	                                if (!key.startsWith("$")) {
	                                    if (exists.entity[key] && exists.entity[key].$row) exists.entity[key].$value = row[key];else exists.entity[key] = row[key];
	                                }
	                            }
	                            if (row.$subRows) {
	                                row.$subRows.forEach(function (subRow) {
	                                    var existsSub = _.find(exists.entity.$subRows, function (r) {
	                                        return _this.keyFn(r) === _this.keyFn(subRow);
	                                    });
	                                    if (existsSub) {
	                                        for (var subKey in existsSub) {
	                                            if (!subKey.startsWith("$")) {
	                                                if (existsSub[subKey] && existsSub[subKey].$row) existsSub[subKey].$value = subRow[subKey];else existsSub[subKey] = subRow[subKey];
	                                            }
	                                        }
	                                    }
	                                });
	                            }
	                        }
	                    });
	                }
	            }
	        },
	        setHeaderHeight: {
	            value: function setHeaderHeight(height) {
	                var _this = this;

	                this.headerRowHeight = height + 1;
	                globals.$timeout(function () {
	                    $(_this.api.grid.element).find(".ui-grid-header-cell-wrapper, .ui-grid-header-canvas").css("height", height + "px");
	                    $(_this.api.grid.element).find(".ui-grid-header-cell .ui-grid-cell-contents").css("height", height + "px");
	                });
	                return this;
	            }
	        },
	        setRowsPerPage: {
	            value: function setRowsPerPage(rowsPerPage) {
	                this.paginationPageSize = rowsPerPage;
	                return this;
	            }
	        },
	        enableSubRows: {
	            value: function enableSubRows() {
	                this.subRowsEnabled = true;
	                return this;
	            }
	        },
	        _resize: {
	            value: function _resize() {
	                var dataLen = this.api ? this.api.core.getVisibleRows().length : this.data.length;
	                // at least 1 row
	                this.minRowsToShow = Math.max(1, dataLen);

	                // if grid is already displayed - recalculate its height. ui-grid doesn't have an API call for this
	                if (this.api) {
	                    var grid = this.api.grid;
	                    var height = this.minRowsToShow * grid.options.rowHeight + grid.options.headerRowHeight;

	                    // (Adam) This is instead of ui-grid-auto-resize which has a 250ms interval that causes the grid to flicker
	                    grid.element.css("height", height + "px");
	                    grid.element.find(".ui-grid-viewport").css("height", height - this.headerRowHeight + "px");
	                    grid.gridHeight = height;
	                }
	            }
	        },
	        onRegisterApi: {
	            value: function onRegisterApi(gridApi) {
	                var _this = this;

	                this.api = gridApi;

	                if (this.scope === undefined) {
	                    this.scope = null;
	                }

	                this.api.core.on.rowsRendered(this.scope, function () {
	                    _this._resize();
	                });

	                if (this.onSelectionChange && this.api.selection) {
	                    this.api.selection.on.rowSelectionChanged(this.scope, this.onSelectionChange);
	                }
	                if (this.onSelectionChangeBatch && this.api.selection) {
	                    this.api.selection.on.rowSelectionChangedBatch(this.scope, this.onSelectionChangeBatch);
	                }

	                if (this.scope) {
	                    if (!this.scope.grids) {
	                        this.scope.grids = {};
	                    }
	                    this.scope.grids[gridApi.grid.id] = { buttons: this.buttons };
	                }

	                this._afterRegister.forEach(function (callback) {
	                    callback(gridApi);
	                });
	                return this;
	            }
	        },
	        setRowTemplate: {
	            value: function setRowTemplate(fileName) {
	                if (fileName) {
	                    this.rowTemplate = TEMPLATES_FOLDER + fileName + ".html";
	                }
	                return this;
	            }
	        },
	        setDraggable: {
	            value: function setDraggable(callbackFunc) {
	                var _this = this;

	                this.setRowTemplate("drag_rows");
	                this.draggablefunc = callbackFunc;
	                this.afterRegister(function (gridApi) {
	                    gridApi.draggableRows.on.rowDropped(_this.scope, function (info, dropTarget) {
	                        _this.draggablefunc(info, dropTarget);
	                    });
	                });
	                return this;
	            }
	        },
	        setMultiSelect: {
	            value: function setMultiSelect() {
	                this.enableRowHeaderSelection = true;

	                this.multiSelect = true;
	                this.enableSelectAll = true;
	                this._allowMultiSelect = true;
	                this.selectionRowHeaderWidth = 40;
	                return this;
	            }
	        },
	        setSingleSelect: {
	            value: function setSingleSelect() {
	                this.enableRowHeaderSelection = true;
	                this.multiSelect = false;
	                this.enableSelectAll = true;
	                this._allowMultiSelect = false;
	                this.selectionRowHeaderWidth = 40;
	                this.allowSingleSelect = true;
	                return this;
	            }
	        },
	        setMinRowsToShow: {
	            value: function setMinRowsToShow(number) {
	                this.minRowsToShow = number;
	                return this;
	            }
	        },
	        selectItem: {
	            value: function selectItem(item) {
	                var _this = this;

	                globals.$timeout(function () {
	                    return _this.api.selection.selectRow(item);
	                });
	            }
	        },
	        onDestroy: {
	            value: function onDestroy() {
	                $(globals.$window).off("resize", this.calculateFn);
	            }
	        },
	        isOverflowing: {
	            value: function isOverflowing(cellId) {

	                var elem = $("#" + cellId);
	                var text = elem.children(".gridcell-content-text");
	                var showAll = elem.children(".gridcell-showall");
	                var cellItemContent = elem.text().trim();
	                var width = 0;
	                if (showAll.length) {
	                    width = showAll.outerWidth();
	                }
	                //        showAll.css('background-color',elem.parent().css('background-color'));
	                if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth()) {
	                    //            elem.css('padding-right',width+'px');
	                    elem.addClass("overflow");
	                    return true;
	                } else {
	                    elem.removeClass("overflow");
	                    //            elem.css('padding-right','5px');
	                    return false;
	                }
	            }
	        },
	        htmlIsOverflowing: {

	            /**
	             * htmlIsOverflowing(cellId)
	             * Get al the cell's children.
	             * Then sum all the children's box model width (includes padding and margin) in a loop
	             * If the child already has the overflowing class => remove it
	             * When the sum gets > then the container's width => add the overflowing class to him
	             * After exiting the loop return the overflowing flag
	             * **/

	            value: function htmlIsOverflowing(cellId) {
	                var elem = $("#" + cellId);
	                var children = elem.children(".item");
	                var actionButtonsBar = elem.closest(".ui-grid-row").find(".grid-action-bar:eq(0)");
	                var actionButtonsWidth = actionButtonsBar.outerWidth();
	                var maxWidth = elem.outerWidth() - 60 - actionButtonsWidth;
	                var totalChildrenWidth = 0;
	                children.each(function (i, child) {
	                    var childElem = $(child);
	                    totalChildrenWidth += childElem.outerWidth() + parseInt(childElem.css("margin-left")) + parseInt(childElem.css("margin-right"));

	                    if (totalChildrenWidth < maxWidth) {
	                        childElem.removeClass("overflowing-child");
	                    }
	                    if (totalChildrenWidth > maxWidth && !childElem.is(".overflowing-child")) {
	                        childElem.addClass("overflowing-child");
	                    }
	                });
	                return elem.children(".item.overflowing-child").length > 0;
	            }
	        },
	        lastHtmlElementOverflowing: {
	            value: function lastHtmlElementOverflowing(cellId) {
	                return $("#" + cellId).children(".item:not(.overflowing-child)").length == 0;
	            }
	        },
	        showAll: {
	            value: function showAll(model, rowName, col) {

	                var objectName = _.startCase(this.gridObjectName.indexOf("/") >= 0 ? this.gridObjectName.split("/")[0] : this.gridObjectName);

	                var modalScope = globals.$rootScope.$new();

	                modalScope.items = model;
	                modalScope.colName = col.displayName || col.name;
	                modalScope.rowName = rowName;
	                modalScope.objectName = objectName;

	                modalScope.filter = {};
	                modalScope.filterItem = function (item) {
	                    if (modalScope.filter.text) {
	                        var escaped = globals.utils.escapeForRegex(modalScope.filter.text);
	                        var regex = new RegExp(".*" + escaped.split("\\*").join(".*") + ".*", "i");
	                        return regex.test(item);
	                    } else return true;
	                };

	                modalScope.noResults = function () {
	                    var filteredResults = _.filter(modalScope.items, function (item) {
	                        return modalScope.filterItem(item);
	                    });
	                    return filteredResults.length === 0;
	                };

	                globals.$modal.open({
	                    scope: modalScope,
	                    templateUrl: "ui_components/jfrog_grid/show_all_modal.html",
	                    backdrop: true,
	                    size: "sm"
	                });
	            }
	        },
	        asyncShowAll: {
	            value: function asyncShowAll(rowName, col) {
	                var _this = this;

	                if (col.colDef && col.colDef.asyncDataCallback) {
	                    col.colDef.asyncDataCallback(rowName).then(function (dataList) {
	                        _this.showAll(dataList, rowName, col);
	                    });
	                }
	            }
	        },
	        _transformDataForSubRowsSupport: {
	            value: function _transformDataForSubRowsSupport(data, autoExpand) {
	                var _this = this;

	                var transformed = [];

	                data.forEach(function (row) {
	                    var complexRow = _this._simple2Complex(row);
	                    transformed.push(complexRow);
	                    if (row.$subRows && row.$subRows.length) {
	                        complexRow.$subRows = [];
	                        complexRow.$expandable = true;
	                        row.$subRows.forEach(function (sub) {
	                            var complexSub = _this._simple2Complex(sub);
	                            complexSub.$parentRow = complexRow;
	                            if (autoExpand && row.$expanded) {
	                                transformed.push(complexSub);
	                            }
	                            complexRow.$subRows.push(complexSub);
	                        });
	                    }
	                });

	                return transformed;
	            }
	        },
	        callActionCallback: {
	            value: function callActionCallback(action, row) {
	                if (this.subRowsEnabled) {
	                    var simpleRow = this._complex2Simple(row.entity, true);
	                    action.callback(simpleRow, row);
	                    row.entity = this._simple2Complex(simpleRow, true);
	                } else {
	                    action.callback(row.entity, row);
	                }
	            }
	        },
	        checkVisibleWhen: {
	            value: function checkVisibleWhen(action, row) {
	                if (this.subRowsEnabled) {
	                    var simpleRow = this._complex2Simple(row.entity);
	                    return action.visibleWhen(simpleRow);
	                } else {
	                    return action.visibleWhen(row.entity);
	                }
	            }
	        },
	        getActionHref: {
	            value: function getActionHref(action, row) {
	                if (!action.href) {
	                    return;
	                }if (this.subRowsEnabled) {
	                    var simpleRow = this._complex2Simple(row.entity);
	                    return action.href(simpleRow);
	                } else {
	                    return action.href(row.entity);
	                }
	            }
	        },
	        refreshGridAfterFiltering: {
	            value: function refreshGridAfterFiltering(gridFilter) {
	                var _this = this;

	                this.gridFilter = gridFilter;
	                gridFilter.column.name += " ";
	                if (gridFilter.column2) gridFilter.column2.name += " ";
	                var data = [];
	                if (this.data.length) {
	                    data[0] = _.cloneDeep(this.data[0]);
	                    data = data.concat(this.data.slice(1));
	                }

	                this.setGridData(data, false);
	                globals.$timeout(function () {
	                    if (_this.api.grid.getVisibleRows().length === 0) {
	                        _this.setGridData(data.concat([{ _emptyRow: true }]), false);
	                        gridFilter.noMatches = true;
	                    } else if (_this.api.grid.getVisibleRows().length > 1) {
	                        _this.setGridData(_.filter(data, function (row) {
	                            return !row._emptyRow;
	                        }), false);
	                        gridFilter.noMatches = false;
	                    }
	                    globals.$timeout(function () {
	                        _this.api.core.refresh();
	                    });
	                });
	            }
	        },
	        toggleExpansion: {
	            value: function toggleExpansion(row) {
	                if (row.$expandable) {
	                    row.$expanded = !row.$expanded;
	                    if (row.$expanded) this._addSubRows(row);else this._removeSubRows(row);
	                } else if (row.$parentRow) {
	                    this.toggleExpansion(row.$parentRow);
	                }
	            }
	        },
	        _addSubRows: {
	            value: function _addSubRows(row) {
	                var _this = this;

	                var rows = _.pluck(this.api.grid.rows, "entity");
	                var index = _.indexOf(rows, row) + 1;
	                var newSubRows = _.filter(row.$subRows, function (subRow) {
	                    return _this.data.indexOf(subRow) === -1;
	                });
	                Array.prototype.splice.apply(this.data, [index, 0].concat(newSubRows));
	            }
	        },
	        _removeSubRows: {
	            value: function _removeSubRows(row) {
	                this.data = _.without.apply(_, [this.data].concat(row.$subRows));
	            }
	        },
	        resyncSubRows: {
	            value: function resyncSubRows() {}
	        },
	        _defaultSortingAlgorithm: {
	            value: function _defaultSortingAlgorithm(colRef, a, b) {

	                var dir = _.findWhere(this.api.grid.columns, { field: colRef.field }).sort.direction;

	                if (a.$row.$parentRow && a.$row.$parentRow === b.$row) {
	                    return dir === "asc" ? 1 : -1;
	                } else if (b.$row.$parentRow && b.$row.$parentRow === a.$row) {
	                    return dir === "asc" ? -1 : 1;
	                } else if (a.$row.$parentRow && !b.$row.$parentRow) {
	                    return this._defaultSortingAlgorithm(colRef, a.$row.$parentRow[colRef.field], b);
	                } else if (b.$row.$parentRow && !a.$row.$parentRow) {
	                    return this._defaultSortingAlgorithm(colRef, a, b.$row.$parentRow[colRef.field]);
	                } else if (a.$row.$parentRow && b.$row.$parentRow && a.$row.$parentRow !== b.$row.$parentRow) {
	                    return this._defaultSortingAlgorithm(colRef, a.$row.$parentRow[colRef.field], b.$row.$parentRow[colRef.field]);
	                } else {
	                    if (a.$value > b.$value) {
	                        return 1;
	                    } else if (b.$value > a.$value) {
	                        return -1;
	                    } else {
	                        return 0;
	                    }
	                }
	            }
	        },
	        isRowExpanded: {
	            value: function isRowExpanded(row) {
	                var _this = this;

	                if (!this.keyFn) throw new Error("No key was defined. (use setKey(key|keyFn))");
	                var key = this.keyFn(row);
	                var found = _.find(this.data, function (r) {
	                    return _this.keyFn(r) === key;
	                });
	                if (found) {
	                    return found.$expanded === true;
	                } else {
	                    return false;
	                }
	            }
	        },
	        allowColumnsCustomization: {
	            value: function allowColumnsCustomization() {
	                this.columnsCustomization = true;
	                this.loadCustomizedColumnsState();
	                this.createAvailableColumnsArray();
	                this.updateCustomizedColumns();
	                return this;
	            }
	        },
	        createAvailableColumnsArray: {
	            value: function createAvailableColumnsArray() {
	                var _this = this;

	                if (!this.origColumnDefs) {
	                    return;
	                }this.availableColumns = [];
	                this.origColumnDefs.forEach(function (colDef) {
	                    var item = {
	                        id: colDef.field,
	                        text: colDef.displayName || colDef.name,
	                        isSelected: !_this.visibleFields && !colDef.optional || _this.visibleFields && _this.visibleFields.indexOf(colDef.field) !== -1
	                    };
	                    _this.availableColumns.push(item);
	                });
	            }
	        },
	        updateCustomizedColumns: {
	            value: function updateCustomizedColumns() {
	                var refresh = arguments[0] === undefined ? true : arguments[0];

	                if (!this.availableColumns) {
	                    return;
	                }this.visibleFields = _.map(_.filter(this.availableColumns, function (col) {
	                    return col.isSelected;
	                }), "id");
	                this.saveCustomizedColumnsState();
	                if (refresh) this.refreshColumns();
	                if (this.gridFilter) this.gridFilter.doFilter();
	            }
	        },
	        setGridSettingsId: {
	            value: function setGridSettingsId(id) {
	                this.gridSettingsId = id;
	                return this;
	            }
	        },
	        saveCustomizedColumnsState: {
	            value: function saveCustomizedColumnsState() {
	                if (!this.gridSettingsId) {
	                    return;
	                }if (!localStorage.jfGridSettings) {
	                    localStorage.jfGridSettings = JSON.stringify(_defineProperty({}, this.gridSettingsId, this.visibleFields));
	                } else {
	                    var settings = JSON.parse(localStorage.jfGridSettings);
	                    settings[this.gridSettingsId] = this.visibleFields;
	                    localStorage.jfGridSettings = JSON.stringify(settings);
	                }
	            }
	        },
	        loadCustomizedColumnsState: {
	            value: function loadCustomizedColumnsState() {
	                if (!this.gridSettingsId) {
	                    return;
	                }var settings = localStorage.jfGridSettings;
	                if (settings) {
	                    settings = JSON.parse(settings);
	                    var mySetting = settings[this.gridSettingsId];
	                    this.visibleFields = mySetting;
	                }
	            }
	        }
	    });

	    return JFrogGrid;
	})();

	var JFrogGridFactory = exports.JFrogGridFactory = (function () {
	    /* @ngInject */

	    JFrogGridFactory.$inject = ["uiGridConstants", "$timeout", "$window", "$state", "$modal", "$rootScope", "JFrogDownload", "JFrogEventBus", "JFrogUIUtils"];
	    function JFrogGridFactory(uiGridConstants, $timeout, $window, $state, $modal, $rootScope, JFrogDownload, JFrogEventBus, JFrogUIUtils) {
	        _classCallCheck(this, JFrogGridFactory);

	        globals.$timeout = $timeout;
	        globals.$window = $window;
	        globals.$state = $state;
	        globals.$modal = $modal;
	        globals.download = JFrogDownload;
	        globals.$rootScope = $rootScope;
	        globals.JFrogEventBus = JFrogEventBus;
	        globals.utils = JFrogUIUtils;

	        this.uiGridConstants = uiGridConstants;
	        this._createContextMenu();
	    }

	    _createClass(JFrogGridFactory, {
	        getGridInstance: {
	            value: function getGridInstance(scope) {
	                return new JFrogGrid(scope, this.uiGridConstants);
	            }
	        },
	        getDefaultCellTemplate: {
	            value: function getDefaultCellTemplate() {
	                return headerCellTemplate;
	            }
	        },
	        _createContextMenu: {
	            value: function _createContextMenu() {
	                var _this = this;

	                $.contextMenu({
	                    selector: ".grid-container .ui-grid-cell-contents, .grid-container .grid-cell-checkbox",
	                    build: function ($trigger, e) {

	                        var row = angular.element($trigger[0]).scope().row;
	                        var uiGrid = angular.element($trigger[0]).controller("uiGrid");
	                        if (!uiGrid) return;
	                        var grid = uiGrid.grid;
	                        var rowActions = grid.appScope.grids[grid.id].buttons;
	                        var customActionsRaw = _.pluck(grid.columns, "colDef.customActions");
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
	                                cmItems["*edit*"] = {
	                                    name: "Edit",
	                                    icon: "artifactory-edit"
	                                };
	                            }

	                            var getIconName = function (classdef) {
	                                var iconName = undefined;
	                                var classes = classdef.split(" ");
	                                classes.forEach(function (cls) {
	                                    if (cls.startsWith("icon-")) {
	                                        iconName = cls.substr(5);
	                                    }
	                                });
	                                return iconName;
	                            };

	                            if (additionalActions) {
	                                for (var i in additionalActions) {
	                                    var action = additionalActions[i];
	                                    cmItems["@" + action.name] = {
	                                        name: action.name,
	                                        icon: getIconName(action.icon)
	                                    };
	                                }
	                            }

	                            for (var actI in allActions) {
	                                var act = allActions[actI];
	                                act.key = act.tooltip.split(" ").join("").toLowerCase();
	                                cmItems[act.key] = {
	                                    name: act.tooltip,
	                                    icon: getIconName(act.icon)
	                                };
	                            }

	                            globals.$timeout(function () {
	                                $(".context-menu-item").on("click", function (e) {
	                                    if (_this.actionToDo) {
	                                        $(e.target).trigger("contextmenu:hide");
	                                        globals.$timeout(function () {
	                                            _this.actionToDo();
	                                            delete _this.actionToDo;
	                                        }, 100);
	                                    }
	                                });
	                            });

	                            return {
	                                callback: function (key, options) {
	                                    _this.actionToDo = function () {
	                                        if (key === "*edit*") {
	                                            editAction["do"]();
	                                        } else if (key.startsWith("@")) {
	                                            var actionName = key.substr(1);
	                                            var action = _.findWhere(additionalActions, { name: actionName });
	                                            action["do"]();
	                                        } else {
	                                            var act = _.findWhere(allActions, { key: key });
	                                            grid.options.callActionCallback(act, row);
	                                            if (act.href) {
	                                                var url = grid.options.getActionHref(act, row);
	                                                if (url) globals.download(url);
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
	        },
	        _getEditAction: {
	            value: function _getEditAction($trigger, row, grid) {
	                var objScope = { row: row, grid: grid };
	                var editState = $trigger.parent().parent().find("[ui-sref]:not(.no-cm-action)").length ? $trigger.parent().parent().find("[ui-sref]:not(.no-cm-action)")[0].attributes["ui-sref"].textContent : null;
	                if (editState) {
	                    var _ret = (function () {
	                        var parenthesesOpenIndex = editState.indexOf("(");
	                        var state = editState.substr(0, parenthesesOpenIndex);
	                        var paramsString = editState.substr(parenthesesOpenIndex);
	                        var openBraceIndex = paramsString.indexOf("{");
	                        var closeBraceIndex = paramsString.lastIndexOf("}");
	                        paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);

	                        var paramsObj = {};

	                        var paramsSplit = paramsString.split(",");

	                        paramsSplit.forEach(function (param) {
	                            var keyVal = param.split(":");
	                            var key = keyVal[0].trim();
	                            var val = keyVal[1].trim();
	                            if (val.startsWith("row.") || val.startsWith("grid.")) val = _.get(objScope, val);else if (val.startsWith("!row.") || val.startsWith("!grid.")) val = !_.get(objScope, val);else if (val.startsWith("'")) val = val.split("'").join("");else if (val.startsWith("\"")) val = val.split("\"").join("");
	                            paramsObj[key] = val;
	                        });

	                        return {
	                            v: {
	                                "do": function () {
	                                    globals.$state.go(state, paramsObj);
	                                }
	                            }
	                        };
	                    })();

	                    if (typeof _ret === "object") {
	                        return _ret.v;
	                    }
	                } else {
	                    var ngClicks = $trigger.parent().parent().find("[ng-click]:not(.no-cm-action)");
	                    var clickCommand = undefined;
	                    for (var i in ngClicks) {
	                        var ngClick = ngClicks[i];
	                        if (ngClick.attributes && ngClick.attributes["ng-click"] && ngClick.attributes["ng-click"].textContent.startsWith("grid.appScope")) {
	                            clickCommand = ngClick.attributes["ng-click"].textContent;
	                            break;
	                        }
	                    }

	                    if (clickCommand) {
	                        var _ret2 = (function () {
	                            var parenthesesOpenIndex = clickCommand.indexOf("(");
	                            var funcName = clickCommand.substr(0, parenthesesOpenIndex);
	                            var paramsString = clickCommand.substr(parenthesesOpenIndex).split("(").join("").split(")").join("").trim();
	                            var param = _.get(objScope, paramsString);

	                            var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf(".")));
	                            var func = _.get(objScope, funcName).bind(funcThis);

	                            return {
	                                v: {
	                                    "do": function () {
	                                        func(param);
	                                    }
	                                }
	                            };
	                        })();

	                        if (typeof _ret2 === "object") {
	                            return _ret2.v;
	                        }
	                    } else {
	                        return null;
	                    }
	                }
	            }
	        },
	        _getAdditionalActions: {
	            value: function _getAdditionalActions($trigger, row, grid) {
	                var objScope = { row: row, grid: grid };
	                var additionalCommands = [];
	                var additionalElems = $trigger.parent().parent().find("[cm-aditional-action]");
	                for (var i = 0; i < additionalElems.length; i++) {
	                    var elem = additionalElems[i];
	                    var clickCommand = elem.attributes["ng-click"].textContent;
	                    var icon = elem.attributes["class"].textContent;
	                    var commandName = elem.attributes["cm-aditional-action"].textContent;

	                    if (clickCommand) {
	                        (function () {
	                            var parenthesesOpenIndex = clickCommand.indexOf("(");
	                            var funcName = clickCommand.substr(0, parenthesesOpenIndex);
	                            var paramsString = clickCommand.substr(parenthesesOpenIndex).split("(").join("").split(")").join("").trim();
	                            var param = _.get(objScope, paramsString);

	                            var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf(".")));
	                            var func = _.get(objScope, funcName).bind(funcThis);

	                            additionalCommands.push({
	                                name: commandName,
	                                icon: icon,
	                                "do": function () {
	                                    func(param);
	                                }
	                            });
	                        })();
	                    }
	                }

	                return additionalCommands;
	            }
	        }
	    });

	    return JFrogGridFactory;
	})();

	//        let parents = _.filter(this.api.grid.rows, (row) => row.entity.$subRows && )

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = "<div ng-class=\"{ 'sortable': sortable, 'sorting-active': col.sort.direction }\">\n    <!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> -->\n    <div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\">\n        <span>{{ col.displayName CUSTOM_FILTERS }}</span>\n\n    <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">\n      &nbsp;\n    </span>\n    </div>\n\n    <div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\">\n        <i class=\"ui-grid-icon-angle-down\">&nbsp;</i>\n    </div>\n\n    <div ui-grid-filter></div>\n</div>";

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "<div ng-class=\"{ 'sortable': sortable, 'sorting-active': col.sort.direction }\">\n    <!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> -->\n    <div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\">\n        <!--<span>{{ col.displayName CUSTOM_FILTERS }}</span>-->\n        <span>{{ col.displayName}}</span>\n        <div class=\"group-button icon-grouping-off\"\n             jf-tooltip=\"Group By\"\n             ng-click=\"grid.api.grouping.clearGrouping(); grid.api.grouping.groupColumn(col.displayName)\"\n             ng-if=\"!grid.options.subRowsEnabled && grid.api.grid.rows.length > 0 && grid.api.grid.rows[0].entity._emptyRow === undefined &&\n             (!grid.api.grouping.getGrouping().grouping.length || grid.api.grouping.getGrouping().grouping[0].colName != col.displayName)\"></div>\n        <div class=\"group-button icon-grouping-on\"\n             jf-tooltip=\"Ungroup\"\n             ng-click=\"grid.api.grouping.clearGrouping()\"\n             ng-if=\"!grid.options.subRowsEnabled && grid.api.grid.rows.length>0 && grid.api.grid.rows[0].entity._emptyRow === undefined && grid.api.grouping.getGrouping().grouping.length\n             && grid.api.grouping.getGrouping().grouping[0].colName==col.displayName\"></div>\n        <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">\n          &nbsp;\n        </span>\n    </div>\n\n    <!--<div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\">-->\n    <!--<i class=\"ui-grid-icon-angle-down\">&nbsp;</i>-->\n    <!--</div>-->\n\n    <div ui-grid-filter></div>\n</div>";

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JFrogModal = __webpack_require__(106).JFrogModal;

	module.exports = angular.module("jfrog_modal", ["ui.bootstrap"]).service("JFrogModal", JFrogModal);

/***/ },
/* 106 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	//import EVENTS     from '../../constants/artifacts_events.constants';

	/**
	 * @desc wrapper around the $modal service
	 * @url http://angular-ui.github.io/bootstrap/#/modal
	 */

	var JFrogModal = exports.JFrogModal = (function () {
	    /* @ngInject */

	    JFrogModal.$inject = ["$modal", "$rootScope", "$injector", "$q", "$sce", "$timeout", "JFrogEventBus", "JFrogUILibConfig", "JFrogUIUtils"];
	    function JFrogModal($modal, $rootScope, $injector, $q, $sce, $timeout, JFrogEventBus, JFrogUILibConfig, JFrogUIUtils) {
	        _classCallCheck(this, JFrogModal);

	        this.modal = $modal;
	        this.$rootScope = $rootScope;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.$sce = $sce;
	        this.templatesBaseUrl = "ui_components/jfrog_modal/templates/";
	        this.JFrogUILibConfig = JFrogUILibConfig;
	        this.JFrogEventBus = JFrogEventBus;
	        this.JFrogUIUtils = JFrogUIUtils;
	        this.$injector = $injector;
	        this.EVENTS = JFrogEventBus.getEventsDefinition();
	    }

	    _createClass(JFrogModal, {
	        launchModal: {

	            /**
	             * build the path to the template location
	             * and delegate to the $modal service
	             * return the modal instance
	             *
	             * @param templateUri
	             * @param scope
	             * @returns {{Modal instance}}
	             */

	            value: function launchModal(templateUri, scope, size, _x, options) {
	                var cancelable = arguments[3] === undefined ? true : arguments[3];

	                if (!size) size = "lg";

	                var customTemplate = true;
	                if (templateUri.startsWith("@")) {
	                    customTemplate = false;
	                    templateUri = templateUri.substr(1);
	                }

	                var customTemplatesBaseUrl = this.JFrogUILibConfig.getConfig().customModalTemplatesPath;
	                if (customTemplatesBaseUrl && !customTemplatesBaseUrl.endsWith("/")) customTemplatesBaseUrl += "/";

	                var templateUrl = (customTemplate ? customTemplatesBaseUrl : this.templatesBaseUrl) + templateUri + ".html";

	                var modalObj = {
	                    templateUrl: templateUrl,
	                    scope: scope,
	                    size: size
	                };

	                return this._launch(modalObj, scope, size, cancelable, options);
	            }
	        },
	        launchModalWithTemplateMarkup: {

	            /**
	             * Use template markup
	             * and delegate to the $modal service
	             * return the modal instance
	             *
	             * @param templateMarkup
	             * @param scope
	             * @returns {{Modal instance}}
	             */

	            value: function launchModalWithTemplateMarkup(templateMarkup, scope, size, _x, options) {
	                var cancelable = arguments[3] === undefined ? true : arguments[3];

	                if (!size) size = "lg";

	                var modalObj = {
	                    template: templateMarkup,
	                    scope: scope,
	                    size: size
	                };

	                return this._launch(modalObj, scope, size, cancelable, options);
	            }
	        },
	        _launch: {
	            value: function _launch(modalObj, scope, size, cancelable, options) {
	                var _this = this;

	                if (!cancelable) {
	                    modalObj.backdrop = "static";
	                    modalObj.keyboard = false;
	                }
	                if (options && _.isObject(options)) _.extend(modalObj, options);

	                var focused = $(":focus");
	                if (focused.length) focused.blur();

	                var modalInstance = this.modal.open(modalObj);
	                this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, function () {
	                    modalInstance.dismiss();
	                });

	                if (typeof size == "number") {
	                    this.$timeout(function () {
	                        $(".modal-dialog").css("max-width", size);
	                    });
	                }
	                this._calculateMaxHeight();

	                var keyDownBinded = this._onKeyDown.bind(this);

	                if (modalInstance.result) {
	                    // Modal close event handler is registered as result.then(errorCallback)
	                    // In some cases the modal close event is caught by result.finally()
	                    modalInstance.result.then(function () {}, function () {
	                        _this.modalIsClosing = true;
	                    })["finally"](function () {
	                        _this.modalIsClosing = true;
	                        $(window).off("resize", _this._calculateMaxHeight());
	                        $(document).off("keydown", keyDownBinded);
	                    });
	                }

	                $(window).resize(function () {
	                    _this._calculateMaxHeight();
	                });

	                $(document).on("keydown", keyDownBinded);

	                return modalInstance;
	            }
	        },
	        _onKeyDown: {
	            value: function _onKeyDown(event) {
	                var target = $(event.target);
	                if (event.keyCode === 13) {
	                    if (target.attr("jf-enter-press") === undefined) {
	                        if ($(".wizard-modal").length) {
	                            this._clickFirstFoundButton([".wizard-modal button#wizard-popup-next", ".wizard-modal button#wizard-popup-next-custom", ".wizard-modal button#wizard-popup-finish"]);
	                        } else {
	                            this._clickFirstFoundButton([".modal-dialog button.btn-primary:not(.ignore-enter)"]);
	                        }
	                        event.preventDefault();
	                    }
	                }
	            }
	        },
	        _clickFirstFoundButton: {
	            value: function _clickFirstFoundButton(selectorsArray) {
	                for (var i in selectorsArray) {
	                    var selector = selectorsArray[i];
	                    if ($(selector).length) {
	                        if (!$(selector).is("[disabled]")) {
	                            $(selector).click();
	                        }
	                        break;
	                    }
	                }
	            }
	        },
	        _calculateMaxHeight: {

	            /**
	             * Calculate and set the max-height attribute of a modal's body
	             * */

	            value: function _calculateMaxHeight(isWizardStep) {
	                // return this.oldResize();
	                if (this.modalIsClosing) {
	                    this.modalIsClosing = false;
	                    return;
	                }
	                // Try to hide the wizard modal body in this digest cycle before calculating height in the next digest cycle.
	                // This is very important for cases that the modal has more then one step - such as onboarding wizard (and
	                // applies to every step but the first)
	                if (isWizardStep) $(".modal-body").hide();

	                // Calculate and set modal body height in the next digest cycle
	                // After the resizing is done - the modal body is shown again.
	                this.resizeModalBodyInNextCycle();
	            }
	        },
	        resizeModalBodyInNextCycle: {
	            value: function resizeModalBodyInNextCycle() {
	                var _this = this;

	                this.$timeout(function () {
	                    // Hide modal body before perfroming calculations
	                    var modal = $(".modal-content");
	                    var modalBody = modal.find(".modal-body");

	                    // Calculate and show content
	                    var wizardModalContainer = modal.find(".wizard-modal");
	                    if (wizardModalContainer.length > 0) {
	                        modalBody.hide();
	                        _this.resizeWizardModalBody(modal, wizardModalContainer, modalBody);
	                        modalBody.show();
	                    } else {
	                        _this.resizeAnyModalBody(modal, modalBody);
	                    }
	                });
	            }
	        },
	        resizeAnyModalBody: {
	            value: function resizeAnyModalBody(modal, modalBody) {
	                var modalOffsetTop = 110,
	                    //Modal offset top
	                viewPortHeight = window.innerHeight,
	                    // View port height
	                modalHeight = viewPortHeight - 2 * modalOffsetTop;
	                this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
	            }
	        },
	        resizeWizardModalBody: {
	            value: function resizeWizardModalBody(modal, wizardContainer, modalBody) {
	                var modalHeight = wizardContainer.height();
	                this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
	            }
	        },
	        setModalBodyMaxHeight: {
	            value: function setModalBodyMaxHeight(modal, modalBody, modalHeight) {
	                var headerHeight = modal.find(".modal-header").outerHeight() || 0,
	                    // Header height
	                footerHeight = modal.find(".modal-footer").outerHeight() || 0,
	                    // Footer height
	                maxHeight = modalHeight - headerHeight - footerHeight;
	                modalBody.css("max-height", maxHeight);
	            }
	        },
	        oldResize: {
	            value: function oldResize() {
	                this.$timeout(function () {
	                    if ($(".wizard-modal").length > 0) {

	                        // modal height - header - footer
	                        var MH = $(".wizard-modal").height(),
	                            // Modal height
	                        _HH = $(".modal-header").outerHeight() || 0,
	                            // Header height
	                        _FH = $(".modal-footer").outerHeight() || 0; // Footer height

	                        var _maxHeight = MH - _HH - _FH;
	                        $(".modal-body").css("max-height", _maxHeight);
	                        return;
	                    }

	                    var VPH = window.innerHeight,
	                        // View port height
	                    MOT = 110,
	                        //Modal offset top
	                    HH = $(".modal-header").outerHeight() || 0,
	                        // Header height
	                    FH = $(".modal-footer").outerHeight() || 0; // Footer height

	                    // Calculate: MPH - (MOT*2) - HH - FH = maxHeight
	                    var maxHeight = VPH - MOT * 2 - HH - FH;

	                    $(".modal-body").css("max-height", maxHeight);
	                }, 100);
	            }
	        },
	        launchCodeModal: {

	            /**
	             * launch a modal that shows content in a codemirror container
	             *
	             * @param title - title of the modal
	             * @param content - content for the code mirror container
	             * @param mode - mode for code mirror editor options (usually {name: <mimetype>}
	             * @param beforeMessage - message to insert before the codemirror element
	             * @returns {{Modal instance}}
	             */

	            value: function launchCodeModal(title, content, mode) {
	                var beforeMessage = arguments[3] === undefined ? undefined : arguments[3];
	                var objectName = arguments[4] === undefined ? undefined : arguments[4];

	                var modalInstance = undefined;
	                var modalScope = this.$rootScope.$new();
	                modalScope.closeModal = function () {
	                    return modalInstance.close();
	                };
	                modalScope.content = content;
	                modalScope.mode = mode;
	                modalScope.title = title; //this.$sce.trustAsHtml(title);
	                modalScope.beforeMessage = beforeMessage;
	                modalScope.objectName = objectName;
	                return modalInstance = this.launchModal("@code_modal", modalScope);
	            }
	        },
	        confirm: {

	            /**
	             * launch a modal that shows a confirmation box, and returns a promise
	             *
	             * @param title - title of the confirmation box
	             * @param content - HTML content of the confirmation box
	             * @param buttons - button text (Object(confirm: String, cancel: String))
	             * @returns promise - resolved if the user confirmed, rejected otherwise
	             */

	            value: function confirm(content, title, buttons, checkboxLabel, checkBoxChangeListener) {

	                buttons = buttons || {};
	                buttons.confirm = buttons.confirm || "Confirm";
	                buttons.cancel = buttons.cancel || "Cancel";
	                title = title || "Are you sure?";

	                var modalInstance = undefined;
	                var modalScope = this.$rootScope.$new();

	                modalScope.buttons = buttons;
	                modalScope.content = content; //this.$sce.trustAsHtml(content);
	                modalScope.title = title; //this.$sce.trustAsHtml(title);
	                modalScope.checkboxLabel = checkboxLabel;
	                modalScope.checkbox = { checked: false };
	                modalScope.onCheckboxStateChange = function (state) {
	                    if (checkBoxChangeListener) checkBoxChangeListener(state, modalScope);
	                };

	                return this.launchModal("@confirm_modal", modalScope, "sm").result;
	            }
	        },
	        launchWizard: {
	            value: function launchWizard(wizardDefinitionObject) {

	                var wizardModalScope = this.$rootScope.$new();

	                wizardModalScope.$wizardDef = wizardDefinitionObject;
	                WizardController.prototype.JFrogModal = this;
	                wizardModalScope.$wizardCtrl = new WizardController(wizardDefinitionObject);

	                wizardDefinitionObject.controller.prototype.$wizardCtrl = wizardModalScope.$wizardCtrl;

	                var controllerInstance = this.$injector.instantiate(wizardDefinitionObject.controller);

	                var controllerObject = {};
	                controllerObject[wizardDefinitionObject.controllerAs || "ctrl"] = controllerInstance;

	                _.extend(wizardModalScope, controllerObject);

	                wizardModalScope.$wizardCtrl.$userCtrl = controllerInstance;

	                var modalInstance = this.launchModal("@wizard_modal", wizardModalScope, wizardDefinitionObject.size || "lg", wizardDefinitionObject.cancelable && wizardDefinitionObject.backdropCancelable, wizardDefinitionObject.modalOptions);

	                wizardModalScope.$wizardCtrl.$modalInstance = modalInstance;

	                modalInstance.result["catch"](function (reason) {
	                    if (reason) wizardModalScope.$wizardCtrl.cancel();
	                });

	                return modalInstance.result;
	            }
	        }
	    });

	    return JFrogModal;
	})();

	var WizardController = (function () {
	    function WizardController(wizardDefinitionObject, modalInstance) {
	        _classCallCheck(this, WizardController);

	        this.currentStep = 1;
	        this.wizardDefinitionObject = wizardDefinitionObject;
	        this.totalSteps = wizardDefinitionObject.steps.length;
	        if (this.wizardDefinitionObject.initialStep) {
	            var index = _.findIndex(wizardDefinitionObject.steps, { id: this.wizardDefinitionObject.initialStep });
	            this.currentStep = index + 1;
	        }
	        // doNotShowWizardAgain object consists of:
	        // 'label' for the checkbox
	        // 'globalFlagName' for the flag to be set inlocal storage
	        this.doNotShowWizardAgain = this.wizardDefinitionObject.doNotShowWizardAgain;
	    }

	    _createClass(WizardController, {
	        cancel: {
	            value: function cancel() {
	                if (this.$userCtrl.onCancel) this.$userCtrl.onCancel();
	                this.$modalInstance.dismiss();
	            }
	        },
	        titleInit: {
	            value: function titleInit() {
	                if (this.$userCtrl.onWizardShow) this.$userCtrl.onWizardShow(this.wizardDefinitionObject.steps[this.currentStep - 1]);
	            }
	        },
	        nextStep: {
	            value: function nextStep(skip) {
	                var _this = this;

	                if (this.$userCtrl.onStepChange) {
	                    var response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep], this.wizardDefinitionObject.steps[this.currentStep - 1], skip ? "skip" : "next");
	                    if (response && response.then) {
	                        this.pending = true;
	                        response.then(function (pRes) {
	                            if (pRes !== false) _this.currentStep++;
	                            if (_this.$userCtrl.afterStepChange) _this.$userCtrl.afterStepChange(_this.wizardDefinitionObject.steps[_this.currentStep - 1], _this.wizardDefinitionObject.steps[_this.currentStep - 2], skip ? "skip" : "next");
	                            _this.pending = false;
	                        })["catch"](function () {
	                            _this.pending = false;
	                        });
	                    } else if (response !== false) {
	                        this.currentStep++;
	                        if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep - 2], skip ? "skip" : "next");
	                    }
	                } else {
	                    this.currentStep++;
	                }
	                this.JFrogModal._calculateMaxHeight(true);
	            }
	        },
	        prevStep: {
	            value: function prevStep() {
	                var _this = this;

	                if (this.$userCtrl.onStepChange) {
	                    var response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep - 2], this.wizardDefinitionObject.steps[this.currentStep - 1], "prev");
	                    if (response && response.then) {
	                        this.pending = true;
	                        response.then(function (pRes) {
	                            if (pRes !== false) _this.currentStep--;
	                            if (_this.$userCtrl.afterStepChange) _this.$userCtrl.afterStepChange(_this.wizardDefinitionObject.steps[_this.currentStep - 1], _this.wizardDefinitionObject.steps[_this.currentStep], "prev");
	                            _this.pending = false;
	                        })["catch"](function () {
	                            _this.pending = false;
	                        });
	                    } else if (response !== false) {
	                        this.currentStep--;
	                        if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep], "prev");
	                    }
	                } else {
	                    this.currentStep--;
	                }
	                this.JFrogModal._calculateMaxHeight(true);
	            }
	        },
	        finish: {
	            value: function finish() {
	                if (this.$userCtrl.onComplete) this.$userCtrl.onComplete();
	                this.$modalInstance.close();
	            }
	        },
	        isFunction: {
	            value: function isFunction(val) {
	                return _.isFunction(val);
	            }
	        },
	        preventShowingWizardAgain: {
	            value: function preventShowingWizardAgain() {
	                if (this.doNotShowWizardAgain && this.doNotShowWizardAgain.globalFlagName) {
	                    localStorage[this.doNotShowWizardAgain.globalFlagName] = true;
	                    this.finish();
	                }
	            }
	        }
	    });

	    return WizardController;
	})();

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JFrogUploaderFactory = __webpack_require__(108).JFrogUploaderFactory;

	var jfFileDrop = __webpack_require__(109).jfFileDrop;

	module.exports = angular.module("jfrog.uploader", ["angularFileUpload"]).service("JFrogUploaderFactory", JFrogUploaderFactory).directive("jfFileDrop", jfFileDrop);

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by idannaim on 8/4/15.
	 */
	var controller = undefined;

	var JFrogUploader = (function () {
	    /* @ngInject */

	    JFrogUploader.$inject = ["FileUploader", "_controller_"];
	    function JFrogUploader(FileUploader, _controller_) {
	        _classCallCheck(this, JFrogUploader);

	        controller = _controller_;
	        this.fileUploader = new FileUploader();
	    }

	    _createClass(JFrogUploader, {
	        setUrl: {

	            /**
	             * Path on the server to upload files
	             * @param path
	             * @returns {JFrogUploader}
	             */

	            value: function setUrl(path) {
	                this.fileUploader.url = path;
	                return this;
	            }
	        },
	        getUploader: {

	            /**
	             *
	             * @returns {the uploader instance}
	             */

	            value: function getUploader() {
	                return this.fileUploader;
	            }
	        },
	        setOnAfterAddingFile: {

	            /**
	             *  Fires after adding a single file to the queue.
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnAfterAddingFile(func) {
	                this.fileUploader.onAfterAddingFile = func.bind(controller);
	                return this;
	            }
	        },
	        setOnWhenAddingFileFailed: {

	            /**
	             * When adding a file failed.
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnWhenAddingFileFailed(func) {
	                this.fileUploader.onWhenAddingFileFailed = func.bind(this);
	                return this;
	            }
	        },
	        setOnAfterAddingAll: {

	            /**
	             * Fires after adding all the dragged or selected files to the queue.
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnAfterAddingAll(func) {
	                this.fileUploader.onAfterAddingAll = func.bind(controller);
	                return this;
	            }
	        },
	        setOnBeforeUploadItem: {

	            /**
	             * Fires before uploading an item.
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnBeforeUploadItem(func) {
	                this.fileUploader.onBeforeUploadItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnProgressItem: {

	            /**
	             *  On file upload progress
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnProgressItem(func) {
	                this.fileUploader.onProgressItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnSuccessItem: {

	            /**
	             * On file successfully uploaded
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnSuccessItem(func) {
	                this.fileUploader.onSuccessItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnErrorItem: {

	            /**
	             *  On upload error
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnErrorItem(func) {
	                this.fileUploader.onErrorItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnCancelItem: {

	            /**
	             * On cancel uploading
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnCancelItem(func) {
	                this.fileUploader.onCancelItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnCompleteItem: {

	            /**
	             * On file upload complete (independently of the success of the operation)
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnCompleteItem(func) {
	                this.fileUploader.onCompleteItem = func.bind(controller);
	                return this;
	            }
	        },
	        setOnProgressAll: {

	            /**
	             * On upload queue progress
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnProgressAll(func) {
	                this.fileUploader.onProgressAll = func.bind(controller);
	                return this;
	            }
	        },
	        setOnCompleteAll: {

	            /**
	             *  On all loaded when uploading an entire queue, or on file loaded when uploading a single independent file
	             * @param func
	             * @returns {JFrogUploader}
	             */

	            value: function setOnCompleteAll(func) {
	                this.fileUploader.onCompleteAll = func.bind(controller);
	                return this;
	            }
	        },
	        getQueue: {

	            /**
	             *
	             * @returns { files queue}
	             */

	            value: function getQueue() {
	                return this.fileUploader.queue || [];
	            }
	        },
	        clearQueue: {

	            /**
	             * clear all files from queue
	             */

	            value: function clearQueue() {
	                this.fileUploader.queue = [];
	            }
	        },
	        uploadAll: {

	            /**
	             * upload all files in queue
	             */

	            value: function uploadAll() {
	                this.fileUploader.uploadAll();
	            }
	        },
	        removeFileFromQueue: {

	            /**
	             * remove file from queue
	             * @param fileItem
	             * @returns {queue}
	             */

	            value: function removeFileFromQueue(fileItem) {
	                this.fileUploader.removeFromQueue(fileItem);
	                return this.fileUploader.queue;
	            }
	        }
	    });

	    return JFrogUploader;
	})();

	var JFrogUploaderFactory = exports.JFrogUploaderFactory = (function () {
	    function JFrogUploaderFactory(FileUploader) {
	        _classCallCheck(this, JFrogUploaderFactory);

	        this.fileUploader = FileUploader;
	    }

	    _createClass(JFrogUploaderFactory, {
	        getUploaderInstance: {
	            value: function getUploaderInstance(controller) {
	                return new JFrogUploader(this.fileUploader, controller);
	            }
	        }
	    });

	    return JFrogUploaderFactory;
	})();

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	exports.jfFileDrop = jfFileDrop;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfFileDrop($timeout) {
	    var _this = this;

	    return {
	        scope: {
	            jfFileUploader: "=",
	            jfFileDisabled: "=ngDisabled",
	            addCallback: "&jfAddingFileCallback",
	            showProgressBar: "=",
	            showFileSize: "=?",
	            multiple: "=?",
	            onFileRemove: "&",
	            checkboxesName: "=?"
	        },
	        restrict: "E",
	        templateUrl: "ui_components/jfrog_uploader/jf_file_drop.html",
	        link: function ($scope, $element) {
	            if ($scope.multiple) {
	                $timeout(function () {
	                    var el = $($element).find("input[nv-file-select]");
	                    el.attr("multiple", true);
	                });
	            }
	            $scope.jfFileUploader.onAfterAddingFile = function (fileItem) {
	                if (!$scope.multiple) {
	                    $scope.jfFileUploader.queue = [fileItem];
	                }
	                $scope.addCallback({ fileItem: fileItem });
	            };

	            $scope.jfFileUploader.multiUploadItemRemoved = function () {
	                if (!_this.jfFileUploader.queue.length) {
	                    _this.uploadCompleted = false;
	                }
	            };

	            $scope.jfFileUploader.anyFileUploadInProgress = function () {
	                return _.findWhere(_this.jfFileUploader.queue, function (item) {
	                    return item.progress === true;
	                });
	            };

	            $scope.removeItemCallback = function (fileItem) {
	                $scope.onFileRemove({ fileItem: fileItem });
	            };
	        }
	    };
	}

	jfFileDrop.$inject = ["$timeout"];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JFrogTableViewOptions = __webpack_require__(111).JFrogTableViewOptions;

	var jfTableView = __webpack_require__(114).jfTableView;

	var jfTableRow = __webpack_require__(115).jfTableRow;

	var jfTableViewBatchActions = __webpack_require__(116).jfTableViewBatchActions;

	var jfTableCompiledCell = __webpack_require__(117).jfTableCompiledCell;

	var jfTableTop = __webpack_require__(118).jfTableTop;

	module.exports = angular.module("jfrog_table_view", []).directive("jfTableView", jfTableView).directive("jfTableRow", jfTableRow).directive("jfTableViewBatchActions", jfTableViewBatchActions).directive("jfTableCompiledCell", jfTableCompiledCell).directive("jfTableTop", jfTableTop).factory("JFrogTableViewOptions", JFrogTableViewOptions);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	JFrogTableViewOptions.$inject = ["$timeout", "$rootScope", "$modal", "$state", "JFrogDownload", "JFrogModal", "JFrogUIUtils"];
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.JFrogTableViewOptions = JFrogTableViewOptions;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var cellTemplateGenerators = _interopRequire(__webpack_require__(112));

	var COMMON_ACTIONS = {
		"delete": {
			icon: "icon icon-clear",
			tooltip: "Delete"
		},
		download: {
			icon: "icon icon-download",
			href: function (row) {
				return row.downloadLink;
			},
			tooltip: "Download"
		}
	};

	var defaultAppOptions = undefined;

	function JFrogTableViewOptions($timeout, $rootScope, $modal, $state, JFrogDownload, JFrogModal, JFrogUIUtils) {
		"ngInject";
		createContextMenu();

		var JFrogTableViewOptionsClass = (function () {
			/* @ngInject */

			JFrogTableViewOptionsClass.$inject = ["appScope"];
			function JFrogTableViewOptionsClass(appScope) {
				_classCallCheck(this, JFrogTableViewOptionsClass);

				this.data = [];
				this.actions = [];
				this.columns = [];
				this.listeners = {};
				this.supportedEvents = ["pagination.change", "selection.change", "row.clicked", "row.dragged", "row.in.view"];
				this.appScope = appScope;

				// selection types
				this.NO_SELECTION = 0;
				this.SINGLE_SELECTION = 1;
				this.MULTI_SELECTION = 2;

				// pagination mode
				this.PAGINATION = 0;
				this.VIRTUAL_SCROLL = 1;
				this.EXTERNAL_PAGINATION = 2;
				this.INFINITE_SCROLL = 3;

				this._setDefaults();
			}

			_createClass(JFrogTableViewOptionsClass, {
				_setDefaults: {
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
							this.objectName = "Item";
							this.rowHeight = "50px";
							this.headerRowHeight = "50px";
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
						}
					}
				},
				on: {
					value: function on(event, listener) {
						if (!_.includes(this.supportedEvents, event)) {
							console.error("jf-table-view: Unsupported Event: " + event);
							return;
						}
						if (!this.listeners[event]) this.listeners[event] = [];
						this.listeners[event].push(listener);
					}
				},
				off: {
					value: function off(event, listener) {
						if (!_.includes(this.supportedEvents, event)) {
							console.error("jf-table-view: Unsupported Event: " + event);
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
				},
				hasListenersFor: {
					value: function hasListenersFor(event) {
						return !!this.listeners[event];
					}
				},
				fire: {
					value: function fire(event) {
						for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							params[_key - 1] = arguments[_key];
						}

						if (this.listeners[event]) {
							this.listeners[event].forEach(function (listener) {
								return listener.apply(undefined, params);
							});
						}

						// This is for backward compatibility with old grid
						if (event === "selection.change") {
							if (this.onSelectionChange) this.onSelectionChange();
							if (this.onSelectionChangeBatch) this.onSelectionChangeBatch();
						}
					}
				},
				setData: {
					value: function setData(data, internalCall) {

						if (this.paginationMode === this.EXTERNAL_PAGINATION && internalCall !== "$$internal$$") {
							console.error("When using external pagination, you should not call setData directly !");
						} else if (this.paginationMode === this.INFINITE_SCROLL && internalCall !== "$$internal$$") {
							console.error("When using infinite scroll, you should not call setData directly !");
						} else {
							this.origData = _.sortBy(data, "");
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

						return this;
					}
				},
				_transformDataForSubRowsSupport: {
					value: function _transformDataForSubRowsSupport(data, autoExpand) {
						var _this = this;

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
									(function () {
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
												return _this._addSubRows(row, data);
											});
										}
									})();
								}
							}
						});

						if (autoExpand) rowsToExpand.forEach(function (row) {
							return _this._addSubRows(row, data);
						});

						return data;
					}
				},
				toggleExpansion: {
					value: function toggleExpansion(row) {
						var _this = this;

						if (_.isFunction(row.$subRows)) {
							row.$subRows().then(function () {
								return _this.toggleExpansion(row);
							});
						} else {
							if (row.$expandable) {
								row.$expanded = !row.$expanded;
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
				},
				_addSubRows: {
					value: function _addSubRows(row) {
						var addTo = arguments[1] === undefined ? null : arguments[1];

						addTo = addTo || this.data;
						var index = _.indexOf(addTo, row) + 1;
						var newSubRows = _.filter(row.$subRows, function (subRow) {
							return addTo.indexOf(subRow) === -1;
						});
						Array.prototype.splice.apply(addTo, [index, 0].concat(newSubRows));
						this.refreshFilter();
						this.update();
					}
				},
				_removeSubRows: {
					value: function _removeSubRows(row) {
						var _this = this;

						if (row.$subRows) {
							row.$subRows.forEach(function (subRow) {
								var index = _this.data.indexOf(subRow);
								if (index >= 0) {
									_this.data.splice(index, 1);
								}
							});
						}
						this.refreshFilter();
						this.update();
					}
				},
				showCounter: {
					value: function showCounter() {
						var show = arguments[0] === undefined ? true : arguments[0];

						this.noCount = !show;
						return this;
					}
				},
				showFilter: {
					value: function showFilter() {
						var show = arguments[0] === undefined ? true : arguments[0];

						this.filterVisible = show;
						return this;
					}
				},
				showPagination: {
					value: function showPagination() {
						var show = arguments[0] === undefined ? true : arguments[0];

						this.paginationVisible = show;
						return this;
					}
				},
				setRowsPerPage: {
					value: function setRowsPerPage(rpp) {
						this.rowsPerPage = rpp;
						return this;
					}
				},
				enableColumnsResize: {
					value: function enableColumnsResize() {
						var enabled = arguments[0] === undefined ? true : arguments[0];

						this.resizableColumns = enabled;
						return this;
					}
				},
				enableSubRows: {
					value: function enableSubRows() {
						this.subRowsEnabled = true;
						return this;
					}
				},
				update: {
					value: function update() {
						var noSort = arguments[0] === undefined ? false : arguments[0];
						var noGrouping = arguments[1] === undefined ? false : arguments[1];

						//            console.log('update',noSort,noGrouping)
						if (this.dirCtrl) {
							if (!noGrouping) {
								this.refreshGrouping();
							}
							this.origData = _.sortBy(this.data, "");
							if (!noSort) {
								this.sortBy(this.sortByField, true);
							} else {
								this.dirCtrl.refresh();
							}
							this._normalizeWidths();

							//This is for updating header cell templates
							var temp = _.cloneDeep(this.headersRow);
							this.headersRow = temp;

							this.refreshFilter(true);
						}
					}
				},
				setObjectName: {
					value: function setObjectName(objectName) {
						var useAn = arguments[1] === undefined ? false : arguments[1];

						this.objectName = objectName;
						this.useAnWithObjectName = useAn;
						return this;
					}
				},
				setRowClassAttr: {
					value: function setRowClassAttr(rowClassAttr) {
						this.rowClassAttr = rowClassAttr;
						return this;
					}
				},
				setRowInViewDebounceTime: {
					value: function setRowInViewDebounceTime(debounceTime) {
						this.rowInViewDebounceTime = debounceTime;
						return this;
					}
				},
				setNewEntityAction: {
					value: function setNewEntityAction(newEntityCallback) {
						this.newEntityCallback = newEntityCallback;
						return this;
					}
				},
				filterColumns: {
					value: function filterColumns(columns) {
						var _this = this;

						return _.filter(columns, function (col) {
							return (!col.isVisible || col.isVisible()) && (!_this.visibleFields || _this.visibleFields.indexOf(col.field) !== -1);
						});
					}
				},
				setNoFilterResultsMessage: {
					value: function setNoFilterResultsMessage(message) {
						this.noFilterResultsText = message;
					}
				},
				setColumns: {
					value: function setColumns(columns) {
						var _this = this;

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
									var action = undefined;
									if (callback.visibleWhen) {
										action = _this._getCommonAction(key, callback.callback, callback.visibleWhen);
									} else {
										action = _this._getCommonAction(key, callback.callback || callback);
									}
									col.customActions.push(action);
								});
							}
							if (col.customActions && col.customActions.length) {
								actions = actions.concat(col.customActions);
							}
							if (col.sortable === undefined) col.sortable = true;
						});
						if (actions.length && !this.actionsAggregated) {
							this.actionsAggregated = true;
							this.setActions(this.actions.length ? this.actions.concat(actions) : actions);
						}
						this._sortableFields = _.map(_.filter(this.columns, function (c) {
							return angular.isDefined(c.header);
						}), "field");
						if (this.sortable && !this.sortByField) {
							this.sortByField = this._sortableFields ? this._sortableFields[0] : undefined;
						}
						this._normalizeWidths();

						this._checkGroupingSupport();

						this.showHeaders(this.headersVisible);

						return this;
					}
				},
				_checkGroupingSupport: {
					value: function _checkGroupingSupport() {
						var groupables = _.filter(this.columns, function (c) {
							return !!c.allowGrouping;
						});
						if (this.subRowsEnabled && groupables.length) {
							console.error("jf-table-view: Grouping is not supported with sub rows !");
							groupables.forEach(function (c) {
								return c.allowGrouping = false;
							});
						} else if (this.paginationMode === this.INFINITE_SCROLL && groupables.length) {
							console.error("jf-table-view: Grouping is not supported with infinite scroll !");
							groupables.forEach(function (c) {
								return c.allowGrouping = false;
							});
						}
					}
				},
				setRowHeight: {
					value: function setRowHeight(height, headerHeight) {
						this.rowHeight = height;
						this.headerRowHeight = headerHeight || height;
						return this;
					}
				},
				showHeaders: {
					value: function showHeaders() {
						var _this = this;

						var show = arguments[0] === undefined ? true : arguments[0];

						this.headersVisible = show;
						this.headersRow = {};
						this.columns.forEach(function (column) {
							if (column.header) {
								_.set(_this.headersRow, column.field, column.header);
							}
						});
						return this;
					}
				},
				setSelection: {
					value: function setSelection(selectionMode) {
						this.selectionMode = selectionMode;
						this._normalizeWidths();
						return this;
					}
				},
				setPaginationMode: {
					value: function setPaginationMode(pagiMode, paginationCallback) {
						var _this = this;

						this.paginationMode = pagiMode;
						if (this.paginationMode === this.EXTERNAL_PAGINATION) {
							if (!paginationCallback || typeof paginationCallback !== "function") {
								console.error("Setting pagination mode to EXTERNAL_PAGINATION require pagination callback function as the second parameter of setPaginationMode");
								this.paginationMode = this.PAGINATION;
							} else {
								this.externalPaginationCallback = paginationCallback;
								this.pendingExternalPaging = true;
								if (this.dirCtrl && !this.initialExternalPaginationSent) {
									$timeout(function () {
										return _this.sendExternalPageRequest();
									});
								}
							}
						} else if (this.paginationMode === this.INFINITE_SCROLL) {
							if (!paginationCallback || typeof paginationCallback !== "function") {
								console.error("Setting pagination mode to INFINITE_SCROLL require pagination callback function as the second parameter of setPaginationMode");
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
									$timeout(function () {
										return _this.sendInfiniteScrollRequest();
									});
								}
							}
						}

						this._checkGroupingSupport();

						return this;
					}
				},
				hasSelection: {
					value: function hasSelection() {
						return _.includes([this.SINGLE_SELECTION, this.MULTI_SELECTION], this.selectionMode);
					}
				},
				getSelected: {
					value: function getSelected() {
						return _.filter(this.data, { $selected: true });
					}
				},
				getSelectedCount: {
					value: function getSelectedCount() {
						return this.getSelected().length;
					}
				},
				sortBy: {
					value: function sortBy(field) {
						var resort = arguments[1] === undefined ? false : arguments[1];

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
							this.externalSortCallback(field, this.revSort ? "desc" : "asc");
							return;
						}

						if (this.paginationMode === this.EXTERNAL_PAGINATION && sendExternal) {
							this.sendExternalPageRequest();
						}

						this.refreshSorting();

						return this;
					}
				},
				reverseSortingDir: {
					value: function reverseSortingDir() {
						this.sortBy(this.sortByField);
						return this;
					}
				},
				setSortable: {
					value: function setSortable() {
						var sortable = arguments[0] === undefined ? true : arguments[0];

						if (sortable && this.draggableRows && !this.registeredTabularDnd) {
							return;
						}this.sortable = sortable;
						if (sortable && !this.sortByField) {
							this.sortBy(this._sortableFields ? this._sortableFields[0] : undefined);
						} else if (!sortable) {
							this.sortBy(undefined);
						}
						return this;
					}
				},
				setDraggable: {
					value: function setDraggable(callback) {
						this.draggableRows = true;
						this.setSortable(false);
						if (callback) this.on("row.dragged", callback);
						return this;
					}
				},
				setActions: {
					value: function setActions(actions) {
						this.actions = actions;
						this._normalizeWidths();
						return this;
					}
				},
				setAutoFocusFilter: {
					value: function setAutoFocusFilter() {
						var autoFocus = arguments[0] === undefined ? true : arguments[0];

						this.autoFocusFilter = autoFocus;
						return this;
					}
				},
				setBatchActions: {
					value: function setBatchActions(batchActions) {
						this.batchActions = batchActions;
						this.setSelection(this.MULTI_SELECTION);
						return this;
					}
				},
				_setDirectiveController: {
					value: function _setDirectiveController(ctrl) {
						var _this = this;

						this.dirCtrl = ctrl;
						this.update();
						if (this.paginationMode === this.EXTERNAL_PAGINATION) {
							$timeout(function () {
								return _this.sendExternalPageRequest();
							});
							this.initialExternalPaginationSent = true;
						} else if (this.paginationMode === this.INFINITE_SCROLL) {
							this._initInfiniteScroll();
							$timeout(function () {
								if (!_this.infiniteScrollChunkSize && _this.rowsPerPage) _this.infiniteScrollChunkSize = _this.rowsPerPage;
								_this.sendInfiniteScrollRequest();
								_this.initialInfiniteScrollRequestSent = true;
							});
						}

						this.dirCtrl._fireDebouncedRowsInView();
					}
				},
				_initInfiniteScroll: {
					value: function _initInfiniteScroll() {
						var _this = this;

						var scrollParent = $(this.dirCtrl.$element).scrollParent();

						var EDGE = 50;

						scrollParent.on("scroll", function (e) {
							if (!_this.infiniteScrollHasMore || _this.pendingInfiniteScroll) return;
							_this.dirCtrl.$scope.$apply(function () {
								var bottomReached = false;
								if (scrollParent[0] === document) {
									if ($(window).scrollTop() + $(window).height() >= $(document).height() - EDGE) {
										bottomReached = true;
									}
								} else {
									if (scrollParent[0].scrollHeight - scrollParent.scrollTop() <= scrollParent[0].clientHeight + EDGE) {
										bottomReached = true;
									}
								}
								if (bottomReached) {
									e.preventDefault();
									_this.infiniteScrollOffset += _this.infiniteScrollChunkSize;
									_this.rowsPerPage += _this.infiniteScrollChunkSize;
									_this.sendInfiniteScrollRequest();
								}
							});
						});
					}
				},
				getActionsContainerWidthInPixels: {
					value: function getActionsContainerWidthInPixels() {
						return this.actionButtonSize * (this.actions.length <= 3 || this.isRowActionGroupingDisabled ? this.actions.length : 1);
					}
				},
				_normalizeWidths: {
					value: function _normalizeWidths() {
						var _this = this;

						var delay = arguments[0] === undefined ? true : arguments[0];
						var recurse = arguments[1] === undefined ? false : arguments[1];

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
							if (width && width.trim().endsWith("%")) {
								if (col.underWidthThresholde) {
									percsOfUnderThresholdColumns += parseFloat(width);
								} else {
									totalPerc += parseFloat(width);
								}
							} else if (width && width.trim().endsWith("px")) {
								totalAbs += parseFloat(width);
							} else if (width === undefined) {
								col.origWidth = col.width = 100 / _this.columns.length + "%";
								totalPerc += parseFloat(col.width);
							}
						});

						var setNormalWidths = function () {
							var containerWidth = undefined;
							if (_this.data.length) {
								containerWidth = $(_this.dirCtrl.$element).find(".jf-table-row").innerWidth();
							} else {
								containerWidth = $(_this.dirCtrl.$element).find(".jf-table-view-container").width();
							}

							var percSpace = containerWidth - totalAbs;
							//                let absPerc = (totalAbs/containerWidth)*100;
							var normalizer = 100 / totalPerc;
							var totalFinalPerc = (actionsWidth + selectionWidth) / containerWidth * 100;
							var shouldReCalc = false;
							_this.columns.forEach(function (col) {
								var width = col.origWidth;
								if (width && width.trim().endsWith("%")) {
									var origVal = parseFloat(width);
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
										col.width = newPerc + "%";
										totalFinalPerc += newPerc;
									} else if (col.underWidthThresholde && col.pixelWidthThreshold && newValIgnoringThreshold < col.pixelWidthThreshold) {
										col.width = 0;
									}
								} else if (width) {
									totalFinalPerc += 100 * parseFloat(width) / containerWidth;
								}
							});
							//                console.log(totalFinalPerc);
							if (shouldReCalc && !recurse) {
								_this._normalizeWidths(false, true);
							} else {
								_this.ready = true;
							}
						};

						if (delay) $timeout(function () {
							return setNormalWidths();
						});else setNormalWidths();
					}
				},
				getDisplayNameForField: {
					value: function getDisplayNameForField(field) {
						var col = _.find(this.columns, { field: field });
						if (col) {
							return col.header;
						}
					}
				},
				setEmptyTableText: {
					value: function setEmptyTableText(text) {
						this.emptyTableText = text;
						return this;
					}
				},
				setEmptyTableAction: {
					value: function setEmptyTableAction(cb) {
						this.emptyTableAction = cb;
						return this;
					}
				},
				setEmptyTableCallToAction: {
					value: function setEmptyTableCallToAction(text) {
						this.emptyTableCallActionText = text;
						return this;
					}
				},
				disableFilterTooltip: {
					value: function disableFilterTooltip() {
						this.tooltipFilterDisabled = true;
						return this;
					}
				},
				getSelectedRows: {
					value: function getSelectedRows() {
						return _.filter(this.data, { $selected: true });
					}
				},
				clearSelection: {
					value: function clearSelection() {
						if (this.dirCtrl) this.dirCtrl.clearSelection();
					}
				},
				groupBy: {
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
				},
				refreshGrouping: {
					value: function refreshGrouping() {
						if (this.groupedData) {
							this.openedGroupHeaders = _.filter(this.groupedData, { $groupHeader: { $expanded: true } });
						}
						delete this.groupedData;
						this.refreshSorting();
					}
				},
				refreshFilter: {
					value: function refreshFilter() {
						var noGroupsRefresh = arguments[0] === undefined ? false : arguments[0];

						delete this.filterCache;
						if (this.paginationMode === this.EXTERNAL_PAGINATION) {
							this.sendExternalPageRequest();
						}
						if (!noGroupsRefresh) this.refreshGrouping();
					}
				},
				refreshSorting: {
					value: function refreshSorting() {
						delete this.sortedData;
					}
				},
				refresh: {
					value: function refresh() {
						this.refreshFilter();
					}
				},
				updateGroupExpansionState: {
					value: function updateGroupExpansionState(groupHeaderRow) {
						var field = groupHeaderRow.$groupHeader.field;
						var value = groupHeaderRow.$groupHeader.value;
						var toRemove = _.filter(this.groupedData, function (row) {
							return !row.$groupHeader && _.get(row, field) == value;
						});
						this.groupedData = _.difference(this.groupedData, toRemove);

						if (groupHeaderRow.$groupHeader.$expanded) {
							var index = _.indexOf(this.groupedData, groupHeaderRow);
							Array.prototype.splice.apply(this.groupedData, [index + 1, 0].concat(this.fullGroupedData[value]));
						}
						this.update(false, true);
					}
				},
				setFirstColumn: {
					value: function setFirstColumn(field) {
						this.restoreColumnOrder();
						var column = _.find(this.columns, { field: field });
						var index = this.columns.indexOf(column);
						column.$originalIndex = index;
						this.columns.splice(index, 1);
						this.columns.splice(0, 0, column);
					}
				},
				restoreColumnOrder: {
					value: function restoreColumnOrder() {
						var originalIndex = this.columns[0] && this.columns[0].$originalIndex;
						if (originalIndex) {
							var temp = this.columns[0];
							this.columns.splice(0, 1);
							this.columns.splice(originalIndex, 0, temp);
						}
					}
				},
				getPageData: {
					value: function getPageData() {
						if (this.paginationMode === this.PAGINATION) {
							return this.getPrePagedData().slice(this.dirCtrl.currentPage * this.rowsPerPage, this.dirCtrl.currentPage * this.rowsPerPage + this.rowsPerPage);
						} else if (this.paginationMode === this.VIRTUAL_SCROLL) {
							return this.dirCtrl.vsApi.getPageData();
						} else if (this.paginationMode === this.EXTERNAL_PAGINATION || this.paginationMode === this.INFINITE_SCROLL) {
							return this.getRawData();
						}
					}
				},
				sendExternalPageRequest: {
					value: function sendExternalPageRequest() {
						var _this = this;

						if (!this.dirCtrl || _.isUndefined(this.dirCtrl.currentPage)) {
							return;
						}
						var paginationParams = {
							pageNum: this.dirCtrl.currentPage,
							numOfRows: this.rowsPerPage,
							direction: !this.sortByField ? null : this.revSort ? "desc" : "asc",
							orderBy: this.sortByField,
							filter: this.dirCtrl.tableFilter || null,
							filterBy: _.map(this.getFilterables(), "field")
						};
						if (_.isEqual(this.lastPaginationParams, paginationParams)) {
							return;
						}
						this.lastPaginationParams = paginationParams;

						var promise = this.externalPaginationCallback(paginationParams);
						if (!promise || !promise.then) {
							console.error("External pagination callback should return promise");
						} else {
							this.pendingExternalPaging = true;
							promise.then(function (pagedData) {
								_this.setData(pagedData.data, "$$internal$$");
								_this.externalTotalCount = { total: pagedData.totalCount, filtered: pagedData.filteredCount };
								_this.pendingExternalPaging = false;
								_this.dirCtrl.noFilterResults = _this.externalTotalCount.filtered === 0 && _this.externalTotalCount.total > 0;
							});
						}
					}
				},
				sendInfiniteScrollRequest: {
					value: function sendInfiniteScrollRequest() {
						var _this = this;

						if (!this.dirCtrl || this.pendingInfiniteScroll) {
							return;
						}
						var promise = this.infiniteScrollCallback({
							offset: this.infiniteScrollOffset,
							numOfRows: this.infiniteScrollChunkSize
						});
						if (!promise || !promise.then) {
							console.error("Infinite scroll callback should return promise");
						} else {
							this.pendingInfiniteScroll = true;
							return promise.then(function (moreData) {
								_this.setData(_this.data.concat(moreData.data), "$$internal$$");
								_this.infiniteScrollHasMore = moreData.hasMore;
								_this.pendingInfiniteScroll = false;
							});
						}
					}
				},
				getTotalLengthOfData: {
					value: function getTotalLengthOfData() {
						if (this.paginationMode === this.EXTERNAL_PAGINATION) {
							return this.externalTotalCount ? this.externalTotalCount.filtered || 0 : 0;
						} else {
							return this.getPrePagedData().length;
						}
					}
				},
				getFilterables: {
					value: function getFilterables() {
						var filterables = undefined;
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
				},
				getFilterTooltip: {
					value: function getFilterTooltip() {
						if (!this.columns || !this.columns.length) {
							return "";
						} else {
							var filterables = this.getFilterables();
							if (filterables.length === this.columns.length && this.columns.length > 1) {
								return "Filter by any column";
							} else {
								return "Filter by " + _.map(filterables, function (c) {
									return c.header || _.startCase(c.field);
								}).join(", ");
							}
						}
					}
				},
				_reorderStickies: {
					value: function _reorderStickies(data) {
						var stickies = _.filter(data, function (i) {
							return i.$sticky;
						});
						stickies.forEach(function (sticky) {
							data.splice(data.indexOf(sticky), 1);
						});
						Array.prototype.splice.apply(data, [0, 0].concat(stickies));
					}
				},
				_saveAndRemoveSubRows: {
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
				},
				_reInsertSubRows: {
					value: function _reInsertSubRows(data) {
						var _this = this;

						if (!this.subRowsEnabled) {
							return data;
						}
						var newData = [].concat(data);
						if (this.savedSubRowsParents) {
							this.savedSubRowsParents.forEach(function (parent) {
								_this._addSubRows(parent, newData);
							});
						}
						return newData;
					}
				},
				getPrePagedData: {
					value: function getPrePagedData() {
						return this.getSortedData(this.getGroupedData(this.getFilteredData(this.getRawData())));
					}
				},
				getSortedData: {
					value: function getSortedData(sourceData) {
						var _this = this;

						if (this.paginationMode === this.EXTERNAL_PAGINATION || this.externalSortCallback || !this.sortByField) {
							return sourceData;
						} else {
							if (!this.sortedData) {
								(function () {
									sourceData = _this._saveAndRemoveSubRows(sourceData);
									var colObj = _.find(_this.columns, { field: _this.sortByField });
									if (colObj) {
										if (colObj.sortingAlgorithm) {
											if (_this.groupedData) {
												if (_this.groupedBy === _this.sortByField) {
													_this.sortedData = sourceData.sort(function (a, b) {
														if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === _this.sortByField && a.$groupHeader.value === _.get(b, _this.sortByField)) {
															return -1;
														} else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === _this.sortByField && b.$groupHeader.value === _.get(a, _this.sortByField)) {
															return 1;
														} else {
															var valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, _this.sortByField);
															var valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, _this.sortByField);
															return (_this.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
														}
													});
												} else {
													for (var key in _this.fullGroupedData) {
														var groupData = _this.fullGroupedData[key];
														groupData.sort(function (a, b) {
															var valA = _.get(a, _this.sortByField);
															var valB = _.get(b, _this.sortByField);
															return (_this.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
														});
													}
													_this.groupedData.forEach(function (row) {
														if (row.$groupHeader) {
															_this.updateGroupExpansionState(row);
														}
													});
													_this.sortedData = sourceData;
												}
											} else {
												_this.sortedData = sourceData.sort(function (a, b) {
													return (_this.revSort ? -1 : 1) * colObj.sortingAlgorithm(_.get(a, _this.sortByField), _.get(b, _this.sortByField), a, b, colObj);
												});
											}
										} else {
											if (colObj.sortBy) {
												if (_this.groupedData) {
													if (_this.groupedBy === _this.sortByField) {
														_this.sortedData = _.sortBy(sourceData, function (row) {
															return (_this.revSort ? -1 : 1) * colObj.sortBy(row.$groupHeader.value, row);
														});
													} else {
														for (var key in _this.fullGroupedData) {
															_this.fullGroupedData[key] = _.sortBy(_this.fullGroupedData[key], function (row) {
																return (_this.revSort ? -1 : 1) * colObj.sortBy(_.get(row, _this.sortByField), row);
															});
														}
														_this.groupedData.forEach(function (row) {
															if (row.$groupHeader) {
																_this.updateGroupExpansionState(row);
															}
														});
														_this.sortedData = sourceData;
													}
												} else {
													_this.sortedData = _.sortBy(sourceData, function (row) {
														return (_this.revSort ? -1 : 1) * colObj.sortBy(_.get(row, _this.sortByField), row);
													});
												}
											} else {
												if (_this.groupedData) {
													if (_this.groupedBy === _this.sortByField) {
														_this.sortedData = sourceData.sort(function (a, b) {
															if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === _this.sortByField && a.$groupHeader.value === _.get(b, _this.sortByField)) {
																return -1;
															} else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === _this.sortByField && b.$groupHeader.value === _.get(a, _this.sortByField)) {
																return 1;
															} else {
																var valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, _this.sortByField);
																var valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, _this.sortByField);
																return (_this.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
															}
														});
													} else {
														for (var key in _this.fullGroupedData) {
															var groupData = _this.fullGroupedData[key];
															groupData.sort(function (a, b) {
																var valA = _.get(a, _this.sortByField);
																var valB = _.get(b, _this.sortByField);
																return (_this.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
															});
														}
														_this.groupedData.forEach(function (row) {
															if (row.$groupHeader) {
																_this.updateGroupExpansionState(row);
															}
														});
														_this.sortedData = sourceData;
													}
												} else {
													_this.sortedData = _.sortByOrder(sourceData, function (item) {
														var val = _.get(item, _this.sortByField);
														return _.isString(val) ? val.toLowerCase() : _.isArray(val) ? val.length : val;
													}, !_this.revSort);
												}
											}
										}
										_this.sortedData = _this._reInsertSubRows(_this.sortedData);
										_this._reorderStickies(_this.sortedData);
									} else {
										_this.sortedData = [].concat(sourceData);
									}
								})();
							}
							return this.sortedData;
						}
					}
				},
				getGroupedData: {
					value: function getGroupedData(sourceData) {
						var _this = this;

						if (this.paginationMode === this.EXTERNAL_PAGINATION || !this.groupedBy) {
							return sourceData;
						} else {
							if (!this.groupedData) {
								this.setFirstColumn(this.groupedBy);
								this.fullGroupedData = _.groupBy(sourceData, this.groupedBy);
								var tempData = [];
								var column = _.find(this.columns, { field: this.groupedBy });
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
								this.groupedData = tempData;

								// reopen previously opened group headers
								this.openedGroupHeaders.forEach(function (wasOpened) {
									var toBeOpened = _.find(_this.groupedData, { $groupHeader: { value: wasOpened.$groupHeader.value } });
									if (toBeOpened) {
										toBeOpened.$groupHeader.$expanded = true;
										_this.updateGroupExpansionState(toBeOpened);
									}
								});
							}
							return this.groupedData;
						}
					}
				},
				getFilteredData: {
					value: function getFilteredData(sourceData) {
						var _this = this;

						sourceData = sourceData || this.getRawData();

						if (this.paginationMode === this.EXTERNAL_PAGINATION) {
							return sourceData || [];
						}

						if (!this.dirCtrl.tableFilter) {
							this.dirCtrl.noFilterResults = false;
							return sourceData || [];
						}
						if (!this.filterCache) {
							this.filterCache = _.filter(sourceData, function (row) {
								for (var i in _this.columns) {
									var col = _this.columns[i];
									if (_this.defaultFilterByAll && col.filterable !== false || !_this.defaultFilterByAll && col.filterable === true) {
										if (row.$sticky && !row.$stickyFilterable || _this._isSubVisible(row, col) || row.$groupHeader || _.get(row, col.field) && _.contains(_.get(row, col.field).toString().toLowerCase(), _this.dirCtrl.tableFilter.toLowerCase())) {
											return true;
										}
									}
								}
								return false;
							});
						}
						this.dirCtrl.noFilterResults = !!(!this.filterCache.length && sourceData.length);
						return this.filterCache;
					}
				},
				_isSubVisible: {
					value: function _isSubVisible(row, col) {
						if (!this.subRowsEnabled) {
							return false;
						}
						var subsVisible = false;
						if (row.$expandable) {
							for (var i = 0; i < row.$subRows.length; i++) {
								var subRow = row.$subRows[i];
								if (this.defaultFilterByAll && col.filterable !== false || !this.defaultFilterByAll && col.filterable === true) {
									if (_.get(subRow, col.field) && _.contains(_.get(subRow, col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase())) {
										subsVisible = true;
										break;
									}
								}
							}
						}
						return subsVisible;
					}
				},
				getRawData: {
					value: function getRawData() {
						return this.data || [];
					}
				},
				allowColumnsCustomization: {
					value: function allowColumnsCustomization() {
						this.columnsCustomization = true;
						this.loadCustomizedColumnsState();
						this.createAvailableColumnsArray();
						this.updateCustomizedColumns();
						return this;
					}
				},
				createAvailableColumnsArray: {
					value: function createAvailableColumnsArray() {
						var _this = this;

						if (!this.origColumnDefs) {
							return;
						}
						this.availableColumns = [];
						this.origColumnDefs.forEach(function (colDef) {
							var item = {
								id: colDef.field,
								text: colDef.header || _.startCase(colDef.field),
								isSelected: !_this.visibleFields && !colDef.optional || _this.visibleFields && _this.visibleFields.indexOf(colDef.field) !== -1
							};
							_this.availableColumns.push(item);
						});
					}
				},
				refreshColumns: {
					value: function refreshColumns() {
						if (this.origColumnDefs) {
							this.setColumns(_.cloneDeep(this.origColumnDefs));
						}
					}
				},
				updateCustomizedColumns: {
					value: function updateCustomizedColumns() {
						var refresh = arguments[0] === undefined ? true : arguments[0];

						if (!this.availableColumns) {
							return;
						}
						this.visibleFields = _.map(_.filter(this.availableColumns, function (col) {
							return col.isSelected;
						}), "id");
						this.saveCustomizedColumnsState();
						if (refresh) {
							this.refreshColumns();
						}
					}
				},
				setId: {
					value: function setId(id) {
						this.tableId = id;
						return this;
					}
				},
				saveCustomizedColumnsState: {
					value: function saveCustomizedColumnsState() {
						if (!this.tableId) {
							return;
						}
						if (!localStorage.jfTableViewSettings) {
							localStorage.jfTableViewSettings = JSON.stringify(_defineProperty({}, this.tableId, this.visibleFields));
						} else {
							var settings = JSON.parse(localStorage.jfTableViewSettings);
							settings[this.tableId] = this.visibleFields;
							localStorage.jfTableViewSettings = JSON.stringify(settings);
						}
					}
				},
				loadCustomizedColumnsState: {
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
				},
				setKey: {
					value: function setKey(key) {
						if (typeof key === "function") {
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
				},
				updateData: {
					value: function updateData(data, _x, maxRowsLen) {
						var _this = this;

						var removeIfMissing = arguments[1] === undefined ? false : arguments[1];

						if (!this.data || !this.data.length) {
							this.setData(data);
						} else if (!this.keyFn) {
							throw new Error("Cannot update data, no key was defined. (use setKey(key|keyFn))");
						} else {
							(function () {
								var existingRows = [];
								var doUpdate = false;
								data.forEach(function (row) {
									var exists = _.find(_this.data, function (r) {
										return _this.keyFn(r) === _this.keyFn(row);
									});
									if (exists) {
										existingRows.push(exists);
										for (var key in exists) {
											if (!key.startsWith("$")) {
												exists[key] = row[key];
											}
										}
										if (row.$subRows) {
											(function () {
												var subRowsToSave = [];
												row.$subRows.forEach(function (subRow) {
													var existsSub = _.find(exists.$subRows, function (r) {
														return _this.keyFn(r) === _this.keyFn(subRow);
													});
													if (existsSub) {
														subRowsToSave.push(existsSub);
														for (var subKey in existsSub) {
															if (!subKey.startsWith("$")) {
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
													(function () {
														var removed = _.difference(exists.$subRows, subRowsToSave);
														if (removed.length) {
															doUpdate = true;
															_.remove(exists.$subRows, function (sr) {
																return _.includes(removed, sr);
															});
														}
													})();
												}
											})();
										}
									} else {
										_this.data.push(row);
										existingRows.push(row);
										doUpdate = true;
									}
								});
								if (removeIfMissing) {
									(function () {
										var removed = _.difference(_this.data, existingRows);
										if (removed.length) {
											doUpdate = true;
											_.remove(_this.data, function (row) {
												return _.includes(removed, row);
											});
										}
									})();
								}
								if (doUpdate) _this.update();
							})();
						}
					}
				},
				isOverflowing: {
					value: function isOverflowing(cellId) {

						var elem = $(this.dirCtrl.$element).find("#" + cellId);
						var text = elem.children(".gridcell-content-text");
						var showAll = elem.children(".gridcell-showall");
						var cellItemContent = elem.text().trim();
						var width = 0;
						if (showAll.length) {
							width = showAll.outerWidth();
						}
						//        showAll.css('background-color',elem.parent().css('background-color'));
						if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth()) {
							//            elem.css('padding-right',width+'px');
							elem.addClass("overflow");
							return true;
						} else {
							elem.removeClass("overflow");
							//            elem.css('padding-right','5px');
							return false;
						}
					}
				},
				showAll: {
					value: function showAll(model, rowName, col) {
						var objectName = _.startCase(this.objectName.indexOf("/") >= 0 ? this.objectName.split("/")[0] : this.objectName);

						var modalScope = $rootScope.$new();

						modalScope.items = model;
						modalScope.colName = col.header;
						modalScope.rowName = rowName;
						modalScope.objectName = objectName;

						modalScope.filter = {};
						modalScope.filterItem = function (item) {
							if (modalScope.filter.text) {
								var escaped = JFrogUIUtils.escapeForRegex(modalScope.filter.text);
								var regex = new RegExp(".*" + escaped.split("\\*").join(".*") + ".*", "i");
								return regex.test(item);
							} else {
								return true;
							}
						};

						modalScope.noResults = function () {
							var filteredResults = _.filter(modalScope.items, function (item) {
								return modalScope.filterItem(item);
							});
							return filteredResults.length === 0;
						};

						JFrogModal.launchModalWithTemplateMarkup(__webpack_require__(113), modalScope, "sm", true);
					}
				},
				asyncShowAll: {
					value: function asyncShowAll(rowName, col) {
						var _this = this;

						if (col && col.asyncDataCallback) {
							col.asyncDataCallback(rowName).then(function (dataList) {
								_this.showAll(dataList, rowName, col);
							});
						}
					}
				},
				_getCommonAction: {
					value: function _getCommonAction(key, callback, visibleWhen) {
						var action = COMMON_ACTIONS[key];
						action = angular.extend({ callback: callback }, action);
						if (visibleWhen) {
							action = angular.extend({ visibleWhen: visibleWhen }, action);
						}
						return action;
					}
				},
				toggleColumnsCustomizationDropdown: {
					value: function toggleColumnsCustomizationDropdown() {
						var _this = this;

						var opened = $(this.dirCtrl.$element).find(".drop-down-container").length;
						if (!opened) $timeout(function () {
							$(_this.dirCtrl.$element).find(".main-box").click();
						});
					}
				},
				hasVisibleActionsFor: {
					value: function hasVisibleActionsFor(rowData) {
						var visible = _.filter(this.actions, function (act) {
							return !act.visibleWhen || act.visibleWhen(rowData);
						});
						return !!visible.length;
					}
				},
				dragRow: {
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
				},
				startMultiDrag: {
					value: function startMultiDrag() {
						var _this = this;

						var selected = this.getSelectedRows();
						var filtered = this.getFilteredData();
						selected = _.filter(selected, function (item) {
							return _.includes(filtered, item);
						});

						this.draggedRows = _.map(selected, function (selectedRow) {
							return {
								row: selectedRow,
								index: _.findIndex(_this.data, function (r) {
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
				},
				dropDraggedRow: {
					value: function dropDraggedRow(targetRow) {
						var draggedRow = arguments[1] === undefined ? null : arguments[1];
						var tabularDndDrag = arguments[2] === undefined ? false : arguments[2];

						if (this.registeredTabularDnd && (this.draggedRows || _.isArray(draggedRow))) {
							this.dropDraggedRows(targetRow, draggedRow, tabularDndDrag);
							return;
						}

						if (this.markedDropTarget) {
							this.markedDropTarget.removeClass("drop-target-mark");
						}

						var targetIndex = undefined;
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

						this.fire("row.dragged", this.data);
					}
				},
				dropDraggedRows: {
					value: function dropDraggedRows(targetRow) {
						var _this = this;

						var draggedRows = arguments[1] === undefined ? null : arguments[1];
						var tabularDndDrag = arguments[2] === undefined ? false : arguments[2];

						if (this.markedDropTarget) {
							this.markedDropTarget.removeClass("drop-target-mark");
						}

						(draggedRows || this.draggedRows).forEach(function (draggedRow, i) {
							var targetIndex = undefined;
							if (!targetRow) {
								targetIndex = tabularDndDrag ? _this.data.length : draggedRow.index;
							} else {
								targetIndex = _.findIndex(_this.data, function (r) {
									return r === targetRow;
								});
								if (targetIndex === -1) targetIndex = draggedRow.index;
							}

							_this.data.splice(targetIndex, 0, draggedRow.row);
						});
						this.draggedRows = null;
						this.update();
						this.refreshFilter();

						this.fire("row.dragged", this.data);
					}
				},
				markDropTarget: {
					value: function markDropTarget(rowElem) {
						if (this.markedDropTarget) {
							this.markedDropTarget.removeClass("drop-target-mark");
						}
						if (rowElem && !rowElem.is(".headers")) {
							rowElem.addClass("drop-target-mark");
							this.markedDropTarget = rowElem;
						}
					}
				},
				_registerTabularDnd: {
					value: function _registerTabularDnd(tabularDndController, role, otherTableOptions) {
						var emptyTableStyle = arguments[3] === undefined ? {} : arguments[3];

						this.registeredTabularDnd = {
							dndCtrl: tabularDndController,
							dndRole: role,
							dndOther: otherTableOptions,
							emptyTableStyle: emptyTableStyle
						};
					}
				},
				useExternalSortCallback: {
					value: function useExternalSortCallback(externalSortCallback) {
						this.externalSortCallback = externalSortCallback;
						return this;
					}
				},
				alwaysShowSortingArrows: {
					value: function alwaysShowSortingArrows() {
						this.showSortingArrowsAlways = true;
						return this;
					}
				},
				disableFilterWhen: {
					value: function disableFilterWhen(isFilterDisabledCallback) {
						this.isFilterDisabledCallback = isFilterDisabledCallback;
						return this;
					}
				},
				disableRowActionGrouping: {
					value: function disableRowActionGrouping() {
						this.isRowActionGroupingDisabled = true;
						return this;
					}
				}
			});

			return JFrogTableViewOptionsClass;
		})();

		JFrogTableViewOptionsClass.cellTemplateGenerators = cellTemplateGenerators;

		JFrogTableViewOptionsClass.setAppDefaults = function (defaultsSetter) {
			defaultAppOptions = new JFrogTableViewOptionsClass();
			defaultsSetter(defaultAppOptions);
		};

		return JFrogTableViewOptionsClass;

		function createContextMenu() {
			$.contextMenu({
				selector: ".jf-table-view .jf-table-row:not(.headers)",
				build: function ($trigger, e) {

					var rowCtrl = angular.element($trigger[0]).controller("jfTableRow");
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
							cmItems["*edit*"] = {
								name: "Edit",
								icon: "artifactory-edit"
							};
						}

						var getIconName = function (classdef) {
							if (classdef === undefined) return "";
							var iconName = undefined;
							var classes = classdef.split(" ");
							classes.forEach(function (cls) {
								if (cls.startsWith("icon-")) {
									iconName = cls.substr(5);
								}
							});
							return iconName;
						};

						if (additionalActions) {
							for (var i in additionalActions) {
								var action = additionalActions[i];
								cmItems["@" + action.name] = {
									name: action.name,
									icon: getIconName(action.icon)
								};
							}
						}

						for (var actI in allActions) {
							var act = allActions[actI];
							act.key = act.tooltip.split(" ").join("").toLowerCase();
							cmItems[act.key] = {
								name: act.tooltip,
								icon: getIconName(act.icon)
							};
						}

						$timeout(function () {
							$(".context-menu-item").on("click", function (e) {
								if (tableOptions.actionToDo) {
									$(e.target).trigger("contextmenu:hide");
									$timeout(function () {
										tableOptions.actionToDo();
										delete tableOptions.actionToDo;
									}, 100);
								}
							});
						});

						return {
							callback: function (key, options) {
								tableOptions.actionToDo = function () {
									if (key === "*edit*") {
										editAction["do"]();
									} else if (key.startsWith("@")) {
										var actionName = key.substr(1);
										var action = _.findWhere(additionalActions, { name: actionName });
										action["do"]();
									} else {
										var act = _.findWhere(allActions, { key: key });
										act.callback(row);
										if (act.href) {
											var url = grid.options.getActionHref(act, row);
											if (url) {
												JFrogDownload(url);
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
			var objScope = { row: { entity: row }, grid: tableOptions, appScope: tableOptions.appScope };
			var editState = $trigger.find("[ui-sref]:not(.no-cm-action):not([cm-additional-action])").length ? $trigger.parent().parent().find("[ui-sref]:not(.no-cm-action):not([cm-additional-action])")[0].attributes["ui-sref"].textContent : null;
			if (editState) {
				var _ret = (function () {
					var stateAndParams = _getStateAndParamsFromUISrefString(editState, objScope);

					return {
						v: {
							"do": function () {
								$state.go(stateAndParams.state, stateAndParams.stateParams);
							}
						}
					};
				})();

				if (typeof _ret === "object") {
					return _ret.v;
				}
			} else {
				var ngClicks = $trigger.find("[ng-click]:not(.no-cm-action):not([cm-additional-action])");
				var clickCommand = undefined;
				for (var i in ngClicks) {
					var ngClick = ngClicks[i];
					if (ngClick.attributes && ngClick.attributes["ng-click"] && (ngClick.attributes["ng-click"].textContent.startsWith("grid.appScope.") || ngClick.attributes["ng-click"].textContent.startsWith("appScope."))) {
						clickCommand = ngClick.attributes["ng-click"].textContent;
						break;
					}
				}

				if (clickCommand) {
					var _ret2 = (function () {
						var parenthesesOpenIndex = clickCommand.indexOf("(");
						var funcName = clickCommand.substr(0, parenthesesOpenIndex);
						var paramsString = clickCommand.substr(parenthesesOpenIndex).split("(").join("").split(")").join("").trim();

						var params = _.map(paramsString.split(","), function (paramString) {
							return _.get(objScope, _.trim(paramString));
						});

						var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf(".")));
						var func = _.get(objScope, funcName).bind(funcThis);

						return {
							v: {
								"do": function () {
									func.apply(null, params);
								}
							}
						};
					})();

					if (typeof _ret2 === "object") {
						return _ret2.v;
					}
				} else {
					return null;
				}
			}
		}

		function getAdditionalActions($trigger, row, tableOptions) {
			var objScope = { row: { entity: row }, grid: tableOptions, appScope: tableOptions.appScope };
			var additionalCommands = [];
			var additionalElems = $trigger.find("[cm-additional-action]");

			for (var i = 0; i < additionalElems.length; i++) {
				var elem = additionalElems[i];
				var clickCommand = elem.attributes["ng-click"] ? elem.attributes["ng-click"].textContent : undefined;
				var srefLink = elem.attributes["ui-sref"] ? elem.attributes["ui-sref"].textContent : undefined;
				var icon = elem.attributes["cm-additional-action-icon"] ? elem.attributes["cm-additional-action-icon"].textContent : undefined;
				var commandName = elem.attributes["cm-additional-action"].textContent;

				if (commandName && clickCommand) {
					(function () {
						var parenthesesOpenIndex = clickCommand.indexOf("(");
						var funcName = clickCommand.substr(0, parenthesesOpenIndex);
						var paramsString = clickCommand.substr(parenthesesOpenIndex).split("(").join("").split(")").join("").trim();

						var params = _.map(paramsString.split(","), function (paramString) {
							return _.get(objScope, _.trim(paramString));
						});

						var funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf(".")));
						var func = _.get(objScope, funcName).bind(funcThis);

						additionalCommands.push({
							name: commandName,
							icon: icon,
							"do": function () {
								func.apply(null, params);
							}
						});
					})();
				} else if (commandName && srefLink) {
					(function () {
						var stateAndParams = _getStateAndParamsFromUISrefString(srefLink, objScope);
						var func = function () {
							$state.go(stateAndParams.state, stateAndParams.stateParams);
						};
						additionalCommands.push({
							name: commandName,
							icon: icon,
							"do": function () {
								func();
							}
						});
					})();
				}
			}

			return additionalCommands;
		}

		function _getStateAndParamsFromUISrefString(uiSrefContent, objScope) {
			var parenthesesOpenIndex = uiSrefContent.indexOf("(");
			var state = uiSrefContent.substr(0, parenthesesOpenIndex !== -1 ? parenthesesOpenIndex : undefined);
			var paramsString = uiSrefContent.substr(parenthesesOpenIndex);
			var openBraceIndex = paramsString.indexOf("{");
			var closeBraceIndex = paramsString.lastIndexOf("}");

			var paramsObj = {};

			if (openBraceIndex !== -1 && closeBraceIndex !== -1) {

				paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);

				var paramsSplit = paramsString.split(",");

				paramsSplit.forEach(function (param) {
					var keyVal = param.split(":");
					var key = keyVal[0].trim();
					var val = keyVal[1].trim();
					if (val.startsWith("row.") || val.startsWith("grid.")) val = _.get(objScope, val);else if (val.startsWith("!row.") || val.startsWith("grid.")) val = !_.get(objScope, val);else if (val.startsWith("'")) val = val.split("'").join("");else if (val.startsWith("\"")) val = val.split("\"").join("");
					paramsObj[key] = val;
				});
			}
			return {
				state: state,
				stateParams: paramsObj
			};
		}
	}

/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict";

	var nextId = 0;
	var cellTemplateGenerators = {
	    artifactoryRepoPathColumn: function artifactoryRepoPathColumn(specialClass) {
	        return "<div><div ng-if=\"row.entity.repoKey\" class=\"ui-grid-cell-contents " + specialClass + "\">{{row.entity.repoKey}}/{{row.entity.path}}</div>" + "<div ng-if=\"!row.entity.repoKey\" class=\"ui-grid-cell-contents " + specialClass + "\">{{row.entity.path}}</div></div>";
	    },

	    downloadableColumn: function downloadableColumn(specialClass) {
	        return "<div><div ng-if=\"row.entity.downloadLink\" class=\"jf-link ui-grid-cell-contents " + specialClass + "\">{{row.entity.name}}</div>" + "<div ng-if=\"!row.entity.downloadLink\" class=\"ui-grid-cell-contents " + specialClass + "\">{{row.entity.name}}</div></div>";
	    },

	    booleanColumn: function booleanColumn(model) {
	        return "<div class=\"grid-checkbox\"><input ng-model=\"" + model + "\" type=\"checkbox\" disabled/><span class=\"icon icon-v\"></span></div>";
	    },
	    checkboxColumn: function checkboxColumn(model, click, disabled) {
	        return "<div><div class=\"grid-cell-checkbox\"><jf-checkbox><input ng-model=\"" + model + "\"" + (click && click.length ? " ng-change=\"" + click + "\"" : "") + (disabled && disabled.length ? " ng-disabled=\"" + disabled + "\"" : "") + " type=\"checkbox\"/></jf-checkbox></div></div>";
	    },
	    listableColumn: function listableColumn(listModel, rowNameModel, displayModel, alwaysShow, _x, showAsyncData, externalCountModel) {
	        var testIdPrefix = arguments[4] === undefined ? null : arguments[4];

	        testIdPrefix = testIdPrefix ? testIdPrefix + "-" : "";

	        displayModel = displayModel ? "{{" + listModel + ".length}} | {{" + displayModel + "}}" : "{{" + externalCountModel + " ? " + externalCountModel + " : " + listModel + ".length}} | {{" + listModel + ".join(', ')}}{{" + externalCountModel + " && " + externalCountModel + " > " + listModel + ".length ? ',...' : ''}}";

	        var id = "" + testIdPrefix + "{{row.uid}}_" + nextId;

	        var template = "<div><div ng-if=\"" + listModel + ".length\" \n                                   ng-class=\"{'always-show': " + showAsyncData + " || " + alwaysShow + " }\" \n                                   class=\"ui-grid-cell-contents no-tooltip\" id=\"" + id + "\">\n                                <span class=\"gridcell-content-text\">" + displayModel + "</span>\n                                 <a class=\"jf-link gridcell-showall\" ng-if=\"!(" + showAsyncData + ") && (table.options.isOverflowing('" + testIdPrefix + "'+row.uid+'_'+" + nextId + ") || " + alwaysShow + ")\" href ng-click=\"table.options.showAll(" + listModel + "," + rowNameModel + ",col);$event.stopPropagation()\"> (See All)</a>\n                                 <a class=\"jf-link gridcell-showall\" ng-if=\"" + showAsyncData + "\" href ng-click=\"table.options.asyncShowAll(" + rowNameModel + ",col)\"> (See All)</a>\n                             </div>\n                             <div ng-if=\"!" + listModel + ".length\" class=\"ui-grid-cell-contents no-tooltip\" id=\"" + id + "\">-</div></div>";

	        nextId++;
	        return template;
	    },
	    iconColumn: function iconColumn(cellText, cellIcon, iconClass) {
	        return "<div id=\"type\"><i class=\"icon icon-{{" + cellIcon + "}}" + (iconClass ? " " + iconClass : "") + "\"></i>{{" + cellText + "}}</div>";
	    },
	    ajaxColumn: function ajaxColumn() {
	        return "<div class=\"ui-grid-cell-contents status-grid\"><div class=\"icon-hourglass\" ng-if=\"!row.entity.status\"></div>{{row.entity.status}}</div>";
	    }
	};

	module.exports = cellTemplateGenerators;

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = "<div id=\"show-all-modal\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"close\" aria-label=\"Close\" ng-click=\"$dismiss()\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"popup-header\">{{items.length}} {{colName}} For {{objectName}} '{{rowName}}'</h4>\n    </div>\n    <div class=\"modal-body clearfix\">\n        <input type=\"text\"\n               name=\"filter\"\n               class=\"input-text\"\n               ng-model=\"filter.text\"\n               placeholder=\"Filter\"/>\n\n\n        <div class=\"group-list-wrapper\" ng-if=\"!noResults()\">\n            <ul class=\"group-list\">\n                <li class=\"group-list-item\"\n                    jf-tooltip-on-overflow\n                    ng-repeat=\"item in items track by $index\"\n                    ng-if=\"filterItem(item)\">\n                    {{item}}\n                </li>\n            </ul>\n        </div>\n\n        <div class=\"empty-filter-placeholder filter-no-results\" ng-if=\"noResults()\">\n            Current filter has no results. <a href class=\"jf-link\" ng-click=\"filter.text = ''\">Clear filter</a>\n        </div>\n\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-default\" ng-click=\"$dismiss()\" id=\"popup-cancel\">Close</button>\n    </div>\n</div>";

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTableView = jfTableView;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfTableView() {
	    return {
	        controller: jfTableViewController,
	        controllerAs: "jfTableView",
	        bindToController: true,
	        scope: {
	            options: "=",
	            objectName: "@"
	        },
	        templateUrl: "ui_components/jf_table_view/jf_table_view.html"
	    };
	}

	var jfTableViewController = (function () {
	    /* @ngInject */

	    jfTableViewController.$inject = ["$scope", "$element", "$timeout", "$compile", "$rootScope", "JFrogEventBus"];
	    function jfTableViewController($scope, $element, $timeout, $compile, $rootScope, JFrogEventBus) {
	        var _this = this;

	        _classCallCheck(this, jfTableViewController);

	        this.$element = $element;
	        this.$containerElement = $element.find(".jf-table-view");
	        this.$timeout = $timeout;
	        this.$compile = $compile;
	        this.$scope = $scope;
	        this.JFrogEventBus = JFrogEventBus;
	        this.EVENTS = JFrogEventBus.getEventsDefinition();
	        this.$rootScope = $rootScope;
	        this.cellScopes = [];

	        this.vsApi = {
	            onInit: function () {
	                _this.vsApi.registerScrollListener(function (scrollPos) {
	                    return _this.onVScroll(scrollPos);
	                });
	            }
	        };

	        $scope.$watch("jfTableView.options", function (options) {
	            if (_this.options) {
	                _this.options._setDirectiveController(_this);
	            }
	            if (_this.options && !_this.paginationApi) {
	                _this.paginationApi = new PaginationApi(_this);

	                _this.paginationApi.registerChangeListener(function () {
	                    _this.$timeout(function () {
	                        _this.refresh(false);
	                        _this._fireDebouncedRowsInView();
	                    });
	                });

	                _this.currentPage = 0;
	            }
	        });

	        var on_resize = function () {
	            _this.options._normalizeWidths();
	            _this._fireDebouncedRowsInView();
	        };

	        $(window).on("resize", on_resize);
	        $scope.$on("$destroy", function () {
	            _this.cellScopes.forEach(function (s) {
	                return s.$destroy();
	            });
	            $(window).off("resize", on_resize);
	        });

	        this._handleDocumentClick();
	    }

	    _createClass(jfTableViewController, {
	        clearFilter: {
	            value: function clearFilter() {
	                this.tableFilter = "";
	                this.onUpdateFilter();
	            }
	        },
	        getActualPageHeight: {
	            value: function getActualPageHeight() {
	                if (this.options.rowsPerPage === "auto") {
	                    return Math.min($(this.$element).parent().height() - $(this.$element).find(".table-rows-container").position().top, parseFloat(this.options.rowHeight) * this.options.getPrePagedData().length);
	                } else {
	                    return parseFloat(this.options.rowHeight) * Math.min(this.options.rowsPerPage, this.options.getPrePagedData().length) + 2;
	                }
	            }
	        },
	        compileTemplate: {
	            value: function compileTemplate(elem, field, rowId) {
	                var column = field;
	                var row = rowId;
	                var columnObj = _.find(this.options.columns, { field: column });
	                var rowObj = row !== "headers" ? this.options.getPageData()[row] : this.options.headersRow;

	                if (!rowObj) {
	                    return;
	                }if (rowObj.$groupHeader) {
	                    var groupRowObj = {};
	                    _.set(groupRowObj, rowObj.$groupHeader.field, rowObj.$groupHeader.value);
	                    rowObj = groupRowObj;
	                }

	                var existingScope = _.find(this.cellScopes, function (s) {
	                    return s.row.entity === rowObj && s.col === columnObj;
	                });

	                var rowScope = undefined;
	                if (!existingScope) {
	                    rowScope = this.$rootScope.$new();

	                    this.cellScopes.push(rowScope);

	                    _.extend(rowScope, {
	                        row: { entity: rowObj, uid: rowId },
	                        col: columnObj,
	                        MODEL_COL_FIELD: _.get(rowObj, field),
	                        COL_FIELD: _.get(rowObj, field),
	                        appScope: this.options.appScope,
	                        grid: { appScope: this.options.appScope }, //Backward compatibility with old grid
	                        table: {
	                            options: this.options
	                        }
	                    });
	                } else {
	                    existingScope.row.uid = rowId;
	                    rowScope = existingScope;
	                }

	                var template = row !== "headers" ? columnObj.cellTemplate : columnObj.headerCellTemplate;
	                var templateElem = $(template);
	                this._autoAddEllipsisClass(templateElem);
	                this.$compile(templateElem)(rowScope);
	                elem.empty();
	                elem.append(templateElem);
	            }
	        },
	        _autoAddEllipsisClass: {
	            value: function _autoAddEllipsisClass(templateRoot) {
	                var allText = templateRoot.text();
	                var elementToAddTo = null;
	                var recursiveAdd = function (root) {
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
	                    if (!elementToAddTo.is("[disable-tooltip-on-overflow]")) {
	                        elementToAddTo.attr("jf-tooltip-on-overflow", true);
	                    }
	                    elementToAddTo.addClass("overflow-ellipsis");
	                }
	            }
	        },
	        onUpdateFilter: {
	            value: function onUpdateFilter() {
	                var resetPagination = arguments[0] === undefined ? true : arguments[0];

	                this.options.refreshFilter();
	                this.refresh();
	                if (resetPagination) {
	                    this.paginationApi.setPage(1, true);
	                    this.paginationApi.update();
	                }
	            }
	        },
	        refresh: {
	            value: function refresh() {
	                var _this = this;

	                var updatePagination = arguments[0] === undefined ? true : arguments[0];

	                var unusedScopes = _.filter(this.cellScopes, function (scope) {
	                    return _this.options.getPageData().indexOf(scope.row.entity) === -1;
	                });
	                unusedScopes.forEach(function (s) {
	                    _this.cellScopes.splice(_this.cellScopes.indexOf(s), 1);
	                    s.$destroy();
	                });
	                if (this.paginationApi && updatePagination) this.paginationApi.update();
	            }
	        },
	        clearSelection: {
	            value: function clearSelection() {
	                this.options.getRawData().forEach(function (row) {
	                    return delete row.$selected;
	                });
	                this.allSelected = false;
	            }
	        },
	        toggleSelectAll: {
	            value: function toggleSelectAll() {
	                var _this = this;

	                this.allSelected = !this.allSelected;
	                this.options.getPrePagedData().forEach(function (row) {
	                    if (_this.options.isRowSelectable && !_this.options.isRowSelectable({ entity: row })) {
	                        row.$selected = false;
	                    } else {
	                        row.$selected = _this.allSelected;
	                    }
	                });
	                if (this.options.groupedBy) {
	                    this.options.getFilteredData().forEach(function (row) {
	                        if (_this.options.isRowSelectable && !_this.options.isRowSelectable({ entity: row })) {
	                            row.$selected = false;
	                        } else {
	                            row.$selected = _this.allSelected;
	                        }
	                    });
	                }
	            }
	        },
	        onVScroll: {
	            value: function onVScroll(scrollPos) {
	                var virtualScrollIndex = Math.floor(scrollPos);
	                var virtualScrollDisplacement = scrollPos - virtualScrollIndex;
	                this.currentPage = Math.floor((virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
	                this.paginationApi.update();

	                this._fireDebouncedRowsInView();
	            }
	        },
	        _fireDebouncedRowsInView: {
	            value: function _fireDebouncedRowsInView() {
	                var _this = this;

	                if (!this.options.hasListenersFor("row.in.view")) {
	                    return;
	                }var debounceCall = function (debouncedFunc, debounceTime) {
	                    if (_this.debounceTimeout) _this.$timeout.cancel(_this.debounceTimeout);
	                    _this.debounceTimeout = _this.$timeout(function () {
	                        debouncedFunc();
	                    }, debounceTime);
	                };

	                debounceCall(function () {
	                    var pageData = _this.options.paginationMode === _this.options.VIRTUAL_SCROLL ? _this.vsApi.getPageData() : _this.options.getPageData();
	                    var lriv = _this.lastRowsInView || [];
	                    _this.lastRowsInView = pageData;
	                    pageData = _.filter(pageData, function (row) {
	                        return !_.includes(lriv, row);
	                    });
	                    pageData.forEach(function (row) {
	                        return _this.options.fire("row.in.view", row);
	                    });
	                }, this.options.rowInViewDebounceTime);
	            }
	        },
	        getTotalScrollHeight: {
	            value: function getTotalScrollHeight() {
	                return this.options.getPrePagedData().length * parseFloat(this.options.rowHeight) + "px";
	            }
	        },
	        getScrollWidth: {
	            value: function getScrollWidth() {
	                var el = $(this.$element).find(".scroll-faker-container")[0];
	                return el.offsetWidth - el.clientWidth;
	            }
	        },
	        createNewEntity: {
	            value: function createNewEntity() {
	                var _this = this;

	                this.options.newEntityCallback();
	                this.$timeout(function () {
	                    return _this.onUpdateFilter();
	                });
	            }
	        },
	        groupSelection: {
	            value: function groupSelection(groupHeader) {
	                var query = {};
	                _.set(query, groupHeader.$groupHeader.field, groupHeader.$groupHeader.value);
	                var group = _.filter(this.options.getFilteredData(), query);
	                group.forEach(function (row) {
	                    return row.$selected = groupHeader.$selected;
	                });
	            }
	        },
	        initFilter: {
	            value: function initFilter() {
	                var _this = this;

	                this.$timeout(function () {
	                    if (_this.options && _this.options.autoFocusFilter) {
	                        var filterInput = $(_this.$element).find(".jf-table-filter input");
	                        filterInput.focus();
	                    }
	                });
	            }
	        },
	        getTotalRecords: {
	            value: function getTotalRecords() {
	                if (!this.options) {
	                    return;
	                }var count = 0;

	                if (this.options.paginationMode === this.options.EXTERNAL_PAGINATION) {
	                    count = this.options.getTotalLengthOfData();
	                } else {
	                    count = _.filter(this.options.getFilteredData(), function (record) {
	                        return !record.$parentRow;
	                    }).length;
	                }
	                return count + " " + this.getObjectNameByCount(count);
	            }
	        },
	        getObjectNameByCount: {
	            value: function getObjectNameByCount(count, objectName) {
	                objectName = objectName || this.options.objectName;
	                var recordsName = undefined;

	                if (objectName) {
	                    if (objectName.indexOf("/") >= 0) {
	                        var splited = objectName.split("/");
	                        recordsName = count !== 1 ? splited[1] : splited[0];
	                    } else {
	                        recordsName = count !== 1 ? objectName + "s" : objectName;
	                    }
	                } else {
	                    recordsName = count !== 1 ? "records" : "record";
	                }

	                return _.startCase(recordsName);
	            }
	        },
	        getSelectedRecords: {
	            value: function getSelectedRecords() {

	                if (!this.options) {
	                    return 0;
	                }var count = this.options.getSelectedRows().length;

	                return count;
	            }
	        },
	        _handleDocumentClick: {
	            value: function _handleDocumentClick() {
	                var _this = this;

	                var handler = function (e) {
	                    _this.$timeout(function () {
	                        var shouldCloseDropdown = !$(e.target).parents(".jf-table-cell.actions").length || $(e.target).parents(".jf-table-view")[0] !== $(_this.$element).find(".jf-table-view")[0];
	                        if (shouldCloseDropdown) _this.JFrogEventBus.dispatch(_this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, _this);
	                    });
	                };
	                $(document).on("click", handler);
	                this.$scope.$on("$destroy", function () {
	                    $(document).off("click", handler);
	                });
	            }
	        }
	    });

	    return jfTableViewController;
	})();

	jfTableViewController.$inject = ["$scope", "$element", "$timeout", "$compile", "$rootScope", "JFrogEventBus"];

	var PaginationApi = (function () {
	    function PaginationApi(tableCtrl) {
	        _classCallCheck(this, PaginationApi);

	        this.tableCtrl = tableCtrl;
	    }

	    _createClass(PaginationApi, {
	        getTotalPages: {
	            value: function getTotalPages() {
	                return Math.ceil(this.tableCtrl.options.getTotalLengthOfData() / this.tableCtrl.options.rowsPerPage);
	            }
	        },
	        getCurrentPage: {
	            value: function getCurrentPage() {
	                return this.tableCtrl.currentPage + 1;
	            }
	        },
	        nextPage: {
	            value: function nextPage() {
	                if (this.getCurrentPage() === this.getTotalPages()) {
	                    return;
	                }this.tableCtrl.currentPage++;
	                this.syncVirtualScroll();
	                this.update();
	                this.sendExternalPageRequest();
	                this.tableCtrl.options.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        prevPage: {
	            value: function prevPage() {
	                if (this.getCurrentPage() === 1) {
	                    return;
	                }this.tableCtrl.currentPage--;
	                this.syncVirtualScroll();
	                this.update();
	                this.sendExternalPageRequest();
	                this.tableCtrl.options.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        sendExternalPageRequest: {
	            value: function sendExternalPageRequest() {
	                if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.EXTERNAL_PAGINATION) {
	                    this.tableCtrl.options.sendExternalPageRequest();
	                }
	            }
	        },
	        setPage: {
	            value: function setPage(pageNum) {
	                var jump = arguments[1] === undefined ? false : arguments[1];

	                if (pageNum < 1 || pageNum > this.getTotalPages()) {
	                    return;
	                }this.tableCtrl.currentPage = pageNum - 1;

	                this.syncVirtualScroll(jump);
	                this.update();
	                this.sendExternalPageRequest();
	                this.tableCtrl.options.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        update: {
	            value: function update() {
	                var _this = this;

	                if (this.getCurrentPage() > this.getTotalPages()) {
	                    this.setPage(1, true);
	                }

	                if (this.listeners) this.listeners.forEach(function (listener) {
	                    return listener(_this.getCurrentPage());
	                });
	            }
	        },
	        registerChangeListener: {
	            value: function registerChangeListener(listener) {
	                if (!this.listeners) this.listeners = [];
	                this.listeners.push(listener);
	            }
	        },
	        syncVirtualScroll: {
	            value: function syncVirtualScroll() {
	                var jump = arguments[0] === undefined ? false : arguments[0];

	                if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
	                    this.tableCtrl.vsApi.scrollTo(this.tableCtrl.currentPage * this.tableCtrl.options.rowsPerPage, jump ? 0 : 500);
	                }
	            }
	        }
	    });

	    return PaginationApi;
	})();

/***/ },
/* 115 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTableRow = jfTableRow;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTableRowController = (function () {
	    /* @ngInject */

	    jfTableRowController.$inject = ["$scope", "$element", "$timeout", "JFrogEventBus"];
	    function jfTableRowController($scope, $element, $timeout, JFrogEventBus) {
	        _classCallCheck(this, jfTableRowController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	        this.$scope = $scope;
	        this.JFrogEventBus = JFrogEventBus;
	        this.EVENTS = JFrogEventBus.getEventsDefinition();

	        $(this.$element).prop("ctrl", this);
	    }

	    _createClass(jfTableRowController, {
	        $onInit: {
	            value: function $onInit() {
	                var _this = this;

	                this.templatesCount = _.filter(this.tableView.options.columns, function (col) {
	                    return !!col.cellTemplate;
	                }).length;

	                this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, function (tableView) {
	                    if (tableView === _this.tableView) _this.actionsDropdownOpen = false;
	                });
	                if (this.tableView.options.draggableRows) this.$timeout(function () {
	                    return _this.initDragAndDrop();
	                });
	            }
	        },
	        getField: {
	            value: function getField(field) {
	                return _.get(this.data, field);
	            }
	        },
	        kebab: {
	            value: function kebab(str) {
	                return _.kebabCase(str);
	            }
	        },
	        toggleSelection: {
	            value: function toggleSelection(all) {
	                if (this.tableView.options.isRowSelectable && !this.tableView.options.isRowSelectable({ entity: this.data })) {
	                    return;
	                }if (!all) {
	                    if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
	                        this.data.$selected = !this.data.$selected;
	                        if (!this.data.$selected) {
	                            this.tableView.allSelected = false;
	                            if (this.tableView.options.groupedBy) {
	                                var groupHeader = _.find(this.tableView.options.getPrePagedData(), { $groupHeader: { value: _.get(this.data, this.tableView.options.groupedBy) } });
	                                if (groupHeader) groupHeader.$selected = false;
	                            }
	                        }
	                        if (this.data.$groupHeader) this.tableView.groupSelection(this.data);
	                    } else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
	                        this.tableView.clearSelection();
	                        this.data.$selected = true;
	                    }
	                } else {
	                    this.tableView.toggleSelectAll();
	                }
	                this.tableView.options.fire("selection.change", this.tableView.options.getSelectedRows());
	            }
	        },
	        toggleGroupExpansion: {
	            value: function toggleGroupExpansion() {
	                this.data.$groupHeader.$expanded = !this.data.$groupHeader.$expanded;
	                this.tableView.options.updateGroupExpansionState(this.data);
	            }
	        },
	        fireAction: {
	            value: function fireAction(action) {
	                action.callback(this.data);
	                this.tableView.onUpdateFilter(false);
	            }
	        },
	        onMouseMove: {
	            value: function onMouseMove(e) {
	                if (!this.resizingColumns) {
	                    if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
	                    if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
	                    this.hoveringResize = this._getHoveringResizePoint(e);
	                } else {
	                    this.dragColumnResize(e);
	                }
	            }
	        },
	        dragColumnResize: {
	            value: function dragColumnResize(e) {
	                var MIN_WIDTH = 5; //percent
	                var container = this._getTableContainer();
	                var containerWidth = container.innerWidth();
	                var mouseX = e.pageX - container.offset().left;
	                var mouseXPerc = Math.round(mouseX / containerWidth * 100);
	                var offset = mouseXPerc - this.resizeDragStart;

	                var newLeftWidth = undefined,
	                    newRightWidth = undefined;
	                if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith("%")) {
	                    newLeftWidth = parseFloat(this.hoveringResize.origLeftWidth) + offset + "%";
	                } else if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith("px")) {
	                    var perc = parseFloat(this.hoveringResize.origLeftWidth) / containerWidth * 100;
	                    newLeftWidth = perc + offset + "%";
	                }
	                if (this.hoveringResize.right) {
	                    if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith("%")) {
	                        newRightWidth = parseFloat(this.hoveringResize.origRightWidth) - offset + "%";
	                    } else if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith("px")) {
	                        var perc = parseFloat(this.hoveringResize.origRightWidth) / containerWidth * 100;
	                        newRightWidth = perc - offset + "%";
	                    }
	                }

	                if (parseFloat(newLeftWidth) > MIN_WIDTH && (!newRightWidth || parseFloat(newRightWidth) > MIN_WIDTH)) {
	                    this.hoveringResize.left.width = this.hoveringResize.left.origWidth = newLeftWidth;
	                    if (this.hoveringResize.right) this.hoveringResize.right.width = this.hoveringResize.right.origWidth = newRightWidth;
	                }
	            }
	        },
	        onMouseDown: {
	            value: function onMouseDown(e) {
	                if (this.hoveringResize) {
	                    var container = this._getTableContainer();
	                    var containerWidth = container.innerWidth();
	                    var mouseX = e.pageX - container.offset().left;
	                    var mouseXPerc = Math.round(mouseX / containerWidth * 100);

	                    this.resizingColumns = true;
	                    this.resizeDragStart = mouseXPerc;

	                    this.hoveringResize.left.$dragRightBorder = true;
	                    if (this.hoveringResize.right) this.hoveringResize.right.$dragLeftBorder = true;
	                }
	            }
	        },
	        onMouseUp: {
	            value: function onMouseUp(e) {
	                if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
	                if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
	                this.resizingColumns = false;
	                delete this.resizeDragStart;
	            }
	        },
	        _getHoveringResizePoint: {
	            value: function _getHoveringResizePoint(e) {
	                var columns = this.tableView.options.columns;

	                var container = this._getTableContainer();
	                var containerWidth = container.innerWidth();
	                var mouseX = e.pageX - container.offset().left;
	                var mouseXPerc = Math.round(mouseX / containerWidth * 100);

	                var percCount = this.tableView.options.hasSelection() ? this.tableView.options.selectionColumnWidth / containerWidth * 100 : 0;

	                var hovering = false;

	                for (var colI = 0; colI < columns.length; colI++) {
	                    var col = columns[colI];
	                    if (_.isString(col.width) && col.width.endsWith("%")) {
	                        percCount += parseFloat(col.width);
	                    } else if (_.isString(col.width) && col.width.endsWith("px")) {
	                        var perc = parseFloat(col.width) / containerWidth * 100;
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
	            }
	        },
	        _getTableContainer: {
	            value: function _getTableContainer() {
	                return $(this.tableView.$element).find(".jf-table-view-container");
	            }
	        },
	        onClickCell: {
	            value: function onClickCell(col, event) {
	                //        event.stopPropagation();
	                if (this.rowId === "headers" && col.header && this.tableView.options.sortable && !this.hoveringResize && col.sortable) {
	                    this.tableView.options.sortBy(col.field);
	                }
	            }
	        },
	        onRowClick: {
	            value: function onRowClick($event) {
	                if (this.data.$groupHeader) {
	                    this.toggleGroupExpansion();
	                } else {
	                    if (this.rowId !== "headers") this.tableView.options.fire("row.clicked", { entity: this.data, event: $event });
	                }
	            }
	        },
	        toggleExpansion: {
	            value: function toggleExpansion($event) {
	                $event.stopPropagation();
	                this.tableView.options.toggleExpansion(this.data);
	            }
	        },
	        toggleActionsDropdown: {
	            value: function toggleActionsDropdown(e) {
	                e.stopPropagation();
	                var origState = this.actionsDropdownOpen;
	                this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this.tableView);
	                this.actionsDropdownOpen = !origState;
	            }
	        },
	        initDragAndDrop: {
	            value: function initDragAndDrop() {
	                var _this = this;

	                if (this.rowId === "headers") {
	                    return;
	                }$(this.$element).draggable({
	                    helper: "clone",
	                    scroll: true,
	                    distance: 10,
	                    appendTo: $(this.tableView.$element).find(".jf-table-view-container"),
	                    start: function (event, ui) {
	                        return _this.$scope.$apply(function () {
	                            return _this.dragStart(event, ui);
	                        });
	                    },
	                    stop: function (event, ui) {
	                        return _this.$scope.$apply(function () {
	                            return _this.dragStop(event, ui);
	                        });
	                    },
	                    drag: function (event, ui) {
	                        return _this.$scope.$apply(function () {
	                            return _this.dragMove(event, ui);
	                        });
	                    }
	                });
	                $(this.$element).addClass("drag-enabled");
	            }
	        },
	        dragStart: {
	            value: function dragStart(event, ui) {
	                if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.disabled) {
	                    event.preventDefault();
	                    return;
	                }

	                if (!this.isRowDraggable()) {

	                    event.preventDefault();
	                    return;
	                }

	                $("body").addClass("grabbing");
	                this.tableView.options.dragRow(this.data);
	                this.initDragHelper(ui.helper);
	            }
	        },
	        isRowDraggable: {
	            value: function isRowDraggable() {
	                if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr && !_.isUndefined(this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) && !this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) {

	                    return false;
	                } else {
	                    return true;
	                }
	            }
	        },
	        initDragHelper: {
	            value: function initDragHelper(helper) {
	                helper.addClass("row-drag-helper");
	                if (this.tableView.options.registeredTabularDnd) {
	                    var numOfDraggedRows = this.tableView.options.draggedRows ? this.tableView.options.draggedRows.length : 1;
	                    if (numOfDraggedRows > 1) {
	                        helper.addClass("multiple").html("<span>&equiv;</span>" + numOfDraggedRows + " " + this.tableView.getObjectNameByCount(numOfDraggedRows, this.tableView.options.registeredTabularDnd.dndCtrl.entityName || "Item"));
	                    }
	                }
	            }
	        },
	        dragStop: {
	            value: function dragStop(event, ui) {
	                var _this = this;

	                var draggedRowsArrayForDndEvent = this.tableView.options.draggedRow ? [this.tableView.options.draggedRow] : _.map(this.tableView.options.draggedRows, "row");
	                var target = $(event.originalEvent.target);
	                target = target.is(".jf-table-row") ? target[0] : target.parents(".jf-table-row")[0];

	                $("body").removeClass("grabbing");

	                var handleForeignDrop = function (targetRow) {
	                    _this.tableView.options.registeredTabularDnd.dndOther.dropDraggedRow(targetRow, _this.tableView.options.draggedRow || _this.tableView.options.draggedRows, true);
	                    _this.tableView.options.markDropTarget(null);
	                    _this.tableView.options.registeredTabularDnd.dndCtrl.onDragTransfer(draggedRowsArrayForDndEvent, _this.tableView.options);
	                    delete _this.tableView.options.draggedRow;
	                    delete _this.tableView.options.draggedRows;
	                };
	                if (target) {
	                    if (this.isForeignDrop(target)) {
	                        handleForeignDrop($(target).prop("ctrl").data);
	                    } else {
	                        this.tableView.options.dropDraggedRow($(target).prop("ctrl").data);
	                    }
	                } else {
	                    if (this.tableView.options.registeredTabularDnd) {
	                        if ($(event.originalEvent.target).is(".empty-table-placeholder") && $(event.originalEvent.target).parents(".jf-table-view")[0] !== $(this.tableView.$element).find(".jf-table-view")[0]) {

	                            handleForeignDrop(null);
	                        } else {
	                            var container = $(event.originalEvent.target).is(".tabular-dnd-table-container") ? $(event.originalEvent.target) : $(event.originalEvent.target).parents(".tabular-dnd-table-container");
	                            var myRole = this.tableView.options.registeredTabularDnd.dndRole;

	                            if (container && (container.is(".available-table") && myRole === "selected" || container.is(".selected-table") && myRole === "available")) {
	                                handleForeignDrop(null);
	                            } else {
	                                this.tableView.options.dropDraggedRow();
	                            }
	                        }
	                    } else {
	                        this.tableView.options.dropDraggedRow();
	                    }
	                }
	            }
	        },
	        handleScrollOnDrag: {
	            value: function handleScrollOnDrag(target, event) {
	                if (this.tableView.options.paginationMode === this.tableView.options.VIRTUAL_SCROLL) {

	                    var tableView = this.tableView;

	                    if (this.tableView.options.registeredTabularDnd && target) {
	                        var rowCtrl = $(target).prop("ctrl");
	                        tableView = rowCtrl.tableView;
	                    }

	                    var container = $(tableView.$element).find(".table-rows-container");
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
	            }
	        },
	        dragMove: {
	            value: function dragMove(event, ui) {

	                var target = $(event.originalEvent.target);
	                target = target.is(".jf-table-row") ? target[0] : target.parents(".jf-table-row")[0];

	                this.handleScrollOnDrag(target, event);

	                if (!target && $(event.originalEvent.target).is(".empty-table-placeholder")) target = event.originalEvent.target;

	                if (target) {
	                    this.tableView.options.markDropTarget($(target));
	                } else {
	                    this.tableView.options.markDropTarget(null);
	                }
	            }
	        },
	        isForeignDrop: {
	            value: function isForeignDrop(dropTarget) {
	                if (!this.tableView.options.registeredTabularDnd) {
	                    return false;
	                } else {
	                    var targetTableView = $(dropTarget).prop("ctrl") ? $(dropTarget).prop("ctrl").tableView : null;
	                    if (targetTableView && targetTableView.options === this.tableView.options.registeredTabularDnd.dndOther) {
	                        return true;
	                    } else {
	                        return false;
	                    }
	                }
	            }
	        },
	        _getRowActionsWidth: {
	            value: function _getRowActionsWidth() {
	                return this.tableView.options.getActionsContainerWidthInPixels() + "px";
	            }
	        }
	    });

	    return jfTableRowController;
	})();

	function jfTableRow() {
	    return {
	        controller: jfTableRowController,
	        controllerAs: "jfTableRow",
	        bindToController: true,
	        replace: true,
	        scope: {
	            data: "=",
	            rowId: "=",
	            tableView: "="
	        },
	        templateUrl: "ui_components/jf_table_view/jf_table_row.html"
	    };
	}

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTableViewBatchActions = jfTableViewBatchActions;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfTableViewBatchActionsController = (function () {
		/* @ngInject */

		jfTableViewBatchActionsController.$inject = ["$element", "$scope", "$timeout"];
		function jfTableViewBatchActionsController($element, $scope, $timeout) {
			var _this = this;

			_classCallCheck(this, jfTableViewBatchActionsController);

			this.$element = $element;
			this.$timeout = $timeout;

			this.MORE_ACTIONS = { "@@MORE_ACTIONS@@": "@@MORE_ACTIONS@@" };

			$scope.$on("ui-layout.resize", function () {
				$timeout(function () {
					return _this.calcActionsVisibility();
				});
			});
			$(window).on("resize", function () {
				$timeout(function () {
					return _this.calcActionsVisibility();
				});
			});

			$scope.$watch("jfTableViewBatchActions.actions", function () {
				return $timeout(function () {
					return _this.calcActionsVisibility();
				});
			});
			$scope.$watch("jfTableViewBatchActions.tableOptions", function () {
				if (!_this.tableOptions) return;
				_this.tableOptions.on("selection.change", function () {
					$timeout(function () {
						return _this.updateMoreActions();
					});
				});
			});
			$timeout(function () {
				return _this.calcActionsVisibility();
			});
		}

		_createClass(jfTableViewBatchActionsController, {
			perform: {
				value: function perform(action) {
					if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
						action.callback && action.callback(this.tableOptions.getSelectedRows());
					}
				}
			},
			anySelected: {
				value: function anySelected() {
					return this.tableOptions && this.tableOptions.getSelectedRows().length > 0;
				}
			},
			isDisabled: {
				value: function isDisabled(action) {
					return !this.anySelected() || action.disabledWhen && action.disabledWhen();
				}
			},
			calcActionsVisibility: {
				value: function calcActionsVisibility() {
					var _this = this;

					if (!this.actions) {
						return;
					}var visible = [];
					var inDropDown = [];

					var moreDropdownWidth = 125;

					var elems = $(this.$element).find(".grid-batch-action-wrapper:not(.more-actions)");

					var containerWidth = $(this.$element).children().width();

					var totalWidth = 0;

					var addTo = visible;

					var moreActionsNewIndex = -1;
					var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

					for (var i = 0; i < elems.length; i++) {
						var el = $(elems[i]);
						totalWidth += el.width();
						var id = el.attr("data-action-id");
						var act = _.find(this.actions, { name: id });
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
							return act !== _this.MORE_ACTIONS;
						});
						moreActionsNewIndex = -1;
					}

					var temp = { TEMP: "TEMP" };
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
						return _this.updateMoreActions();
					});
				}
			},
			initActions: {
				value: function initActions(actionsController) {
					this.moreActionsController = actionsController;
					if (this.gridOptions) this.gridOptions.moreActionsController = actionsController;
					this.updateMoreActions();
				}
			},
			updateMoreActions: {
				value: function updateMoreActions() {
					var _this = this;

					if (!this.moreActionsController) {
						return;
					}var actionsCount = _.filter(this.actions, function (act) {
						return act !== _this.MORE_ACTIONS;
					}).length;

					if (this.moreActions.length < actionsCount) {
						this.moreActionsController.label = "More Actions";
					} else if (this.moreActions.length === actionsCount) {
						this.moreActionsController.label = "Actions";
					}

					var dict = {};
					this.moreActions.forEach(function (action) {
						dict[action.name] = {
							title: action.name,
							icon: "icon-" + action.icon,
							disabled: _this.isDisabled(action)
						};
					});

					this.moreActionsController.setActionsDictionary(dict);
					this.moreActionsController.setActions(_.map(this.moreActions, function (action) {
						return {
							name: action.name,
							visibleWhen: action.visibleWhen,
							action: function () {
								return _this.perform(action);
							}
						};
					}));
				}
			}
		});

		return jfTableViewBatchActionsController;
	})();

	function jfTableViewBatchActions() {
		return {
			scope: {
				actions: "=",
				tableOptions: "="
			},
			templateUrl: "ui_components/jf_table_view/jf_table_view_batch_actions.html",
			controller: jfTableViewBatchActionsController,
			controllerAs: "jfTableViewBatchActions",
			bindToController: true
		};
	}

/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTableCompiledCell = jfTableCompiledCell;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTableCompiledCellController = (function () {
	    /* @ngInject */

	    jfTableCompiledCellController.$inject = ["$element", "$timeout", "$scope"];
	    function jfTableCompiledCellController($element, $timeout, $scope) {
	        var _this = this;

	        _classCallCheck(this, jfTableCompiledCellController);

	        this.$element = $element;
	        this.$timeout = $timeout;

	        $scope.$watch("compiledCell.tableRow.data", function () {
	            _this.compile();
	        });
	    }

	    _createClass(jfTableCompiledCellController, {
	        compile: {
	            value: function compile() {
	                var elem = $(this.$element).find(".compile-this");
	                this.tableRow.tableView.compileTemplate(elem, this.field, this.rowId);
	            }
	        }
	    });

	    return jfTableCompiledCellController;
	})();

	function jfTableCompiledCell() {
	    return {
	        controller: jfTableCompiledCellController,
	        controllerAs: "compiledCell",
	        bindToController: true,
	        scope: {
	            field: "=",
	            rowId: "=",
	            tableRow: "=" },
	        template: "<div class=\"compile-this\"></div>"
	    };
	}

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTableTop = jfTableTop;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var jfTableTopController = (function () {
		/* @ngInject */

		function jfTableTopController() {
			_classCallCheck(this, jfTableTopController);
		}

		_createClass(jfTableTopController, {
			isFilterDisabled: {
				value: function isFilterDisabled() {
					return !(this.tableView.options && (this.tableView.options.getRawData().length || this.tableView.options.externalTotalCount && this.tableView.options.externalTotalCount.total > 0)) || this.tableView.options.isFilterDisabledCallback && this.tableView.options.isFilterDisabledCallback();
				}
			}
		});

		return jfTableTopController;
	})();

	function jfTableTop() {
		return {
			controller: jfTableTopController,
			controllerAs: "jfTableTop",
			bindToController: true,
			scope: {
				tableView: "="
			},
			templateUrl: "ui_components/jf_table_view/jf_table_top.html"
		};
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JFTreeApi = __webpack_require__(120).JFTreeApi;

	var jfTree = __webpack_require__(122).jfTree;

	var jfTreeItem = __webpack_require__(123).jfTreeItem;

	var jfTreeCompiledCell = __webpack_require__(124).jfTreeCompiledCell;

	var jfTreeIndentation = __webpack_require__(125).jfTreeIndentation;

	module.exports = angular.module("jf_tree", []).directive("jfTree", jfTree).directive("jfTreeItem", jfTreeItem).directive("jfTreeCompiledCell", jfTreeCompiledCell).directive("jfTreeIndentation", jfTreeIndentation).factory("JFTreeApi", JFTreeApi);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	JFTreeApi.$inject = ["$q", "$timeout", "AdvancedStringMatch", "ContextMenuService", "JFrogEventBus"];
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.JFTreeApi = JFTreeApi;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var TreeViewPane = __webpack_require__(121).TreeViewPane;

	function JFTreeApi($q, $timeout, AdvancedStringMatch, ContextMenuService, JFrogEventBus) {
	    "ngInject";

	    var JFTreeApiClass = (function () {
	        /* @ngInject */

	        JFTreeApiClass.$inject = ["appScope"];
	        function JFTreeApiClass(appScope) {
	            _classCallCheck(this, JFTreeApiClass);

	            this.$timeout = $timeout;
	            this.$q = $q;
	            this.AdvancedStringMatch = AdvancedStringMatch;
	            this.JFrogEventBus = JFrogEventBus;
	            this.$root = [];
	            this.$viewPanes = [];
	            this.$openedNodes = [];
	            this.ContextMenuService = ContextMenuService;
	            this.actions = [];
	            this.listeners = {};
	            this.supportedEvents = ["ready", "pagination.change", "item.clicked", "item.dblClicked", "item.selected", "item.before.open", "keydown"];
	            this.appScope = appScope;
	            this.objectName = "Item";
	            this.GO_UP_NODE = { $specialNode: "GO_UP" };

	            this.paneSelector = function () {
	                return "default";
	            };
	        }

	        _createClass(JFTreeApiClass, {
	            setNodeTemplate: {
	                value: function setNodeTemplate(nodeTemplate) {
	                    this.nodeTemplate = nodeTemplate;
	                    return this;
	                }
	            },
	            setTreeData: {
	                value: function setTreeData(rootData) {
	                    var _this = this;

	                    this.dataWasSet = true;
	                    this.$root = rootData;
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp._buildFlatItems();
	                    });
	                    if (!this.$isReady) {
	                        this.$isReady = true;
	                        this.$timeout(function () {
	                            return _this.fire("ready");
	                        });
	                    }
	                }
	            },
	            setDrillDownMode: {
	                value: function setDrillDownMode() {
	                    var _this = this;

	                    var drillDownMode = arguments[0] === undefined ? true : arguments[0];

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
	            },
	            _refreshIndentations: {
	                value: function _refreshIndentations() {
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp._refreshIndentations();
	                    });
	                }
	            },
	            setSortingFunction: {
	                value: function setSortingFunction(sortingFunction) {
	                    this.sortingFunction = sortingFunction;
	                    return this;
	                }
	            },
	            setDataDriver: {
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
	            },
	            _getRoot: {
	                value: function _getRoot() {
	                    var _this = this;

	                    var defer = $q.defer();
	                    this.getChildren(null).then(function (rootData) {
	                        if (rootData && _.isArray(rootData)) {
	                            _this.setTreeData(rootData);
	                            defer.resolve();
	                        }
	                    });
	                    return defer.promise;
	                }
	            },
	            setFilterCallback: {
	                value: function setFilterCallback(filterCallback) {
	                    var _this = this;

	                    this.filterCallback = function (node) {
	                        if (node === _this.GO_UP_NODE) return true;
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
	            },
	            isNodeFiltered: {
	                value: function isNodeFiltered(node) {
	                    return this.filterCallback ? this.filterCallback(node) : true;
	                }
	            },
	            quickFind: {
	                value: function quickFind(quickFindTerm) {
	                    this.quickFindTerm = quickFindTerm;
	                    this.quickFindMatches = this._getQuickFindFlatMatches();
	                    delete this.quickFindIndex;
	                    this._selectNextSearchResult();
	                    return this;
	                }
	            },
	            _getQuickFindFlatMatches: {
	                value: function _getQuickFindFlatMatches() {
	                    var matches = [];
	                    this.$viewPanes.forEach(function (vp) {
	                        return matches = matches.concat(vp.getQuickFindMatches());
	                    });
	                    return matches;
	                }
	            },
	            getQuickFindMatches: {
	                value: function getQuickFindMatches() {
	                    return _.map(this._getQuickFindFlatMatches(), "data");
	                }
	            },
	            _getViewPaneForNode: {
	                value: function _getViewPaneForNode(node) {
	                    var viewPane = _.find(this.$viewPanes, function (vp) {
	                        return vp.findNode(function (n) {
	                            return n === node;
	                        });
	                    });
	                    return viewPane;
	                }
	            },
	            centerOnNode: {
	                value: function centerOnNode(node) {
	                    var viewPane = this._getViewPaneForNode(node);
	                    if (viewPane) viewPane.centerOnNode(node);
	                }
	            },
	            centerOnSelected: {
	                value: function centerOnSelected() {
	                    var selected = this.getSelectedNode(true);
	                    if (selected) {
	                        var flat = this._flatFromNode(selected);
	                        if (flat) flat.pane.centerOnItem(flat);
	                    }
	                }
	            },
	            refreshNode: {
	                value: function refreshNode(node) {
	                    var viewPane = this._getViewPaneForNode(node);
	                    if (viewPane) {
	                        return viewPane.refreshNode(node);
	                    } else {
	                        return this.$q.when();
	                    }
	                }
	            },
	            _freeze: {
	                value: function _freeze() {
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp._freeze();
	                    });
	                }
	            },
	            _unFreeze: {
	                value: function _unFreeze() {
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp._unFreeze();
	                    });
	                }
	            },
	            freeze: {
	                value: function freeze() {
	                    if (this.$masterFreeze) {
	                        return;
	                    }this._freeze();
	                    this.$masterFreeze = true;
	                }
	            },
	            unFreeze: {
	                value: function unFreeze() {
	                    if (!this.$masterFreeze) {
	                        return;
	                    }this.$masterFreeze = false;
	                    this._unFreeze();
	                }
	            },
	            refreshNodeContextMenu: {
	                value: function refreshNodeContextMenu(node) {
	                    var viewPane = this._getViewPaneForNode(node);
	                    if (viewPane) viewPane.refreshNodeContextMenu(node);
	                }
	            },
	            refreshTree: {
	                value: function refreshTree() {
	                    var _this = this;

	                    var deleteCache = arguments[0] === undefined ? true : arguments[0];
	                    var resetOpenedNodes = arguments[1] === undefined ? true : arguments[1];

	                    var defer = $q.defer();
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
	                        var fi = _this._flatFromNode(node);
	                        return !!fi;
	                    });
	                    return defer.promise;
	                }
	            },
	            isNodeOpen: {
	                value: function isNodeOpen(node) {
	                    var ignoreFreeze = arguments[1] === undefined ? false : arguments[1];

	                    return !!_.find(this.$viewPanes, function (vp) {
	                        return vp.isNodeOpen(node, ignoreFreeze);
	                    });
	                }
	            },
	            findNode: {
	                value: function findNode(findFunction) {
	                    var viewPane = _.find(this.$viewPanes, function (vp) {
	                        return !!vp.findNode(findFunction);
	                    });

	                    if (viewPane) {
	                        return viewPane.findNode(findFunction);
	                    }
	                }
	            },
	            findNodeByUniqueId: {
	                value: function findNodeByUniqueId(uniqueId) {
	                    var viewPane = _.find(this.$viewPanes, function (vp) {
	                        return !!vp.findNodeByUniqueId(uniqueId);
	                    });

	                    if (viewPane) {
	                        return viewPane.findNodeByUniqueId(uniqueId);
	                    }
	                }
	            },
	            selectNode: {
	                value: function selectNode(node) {
	                    var fireEvent = arguments[1] === undefined ? true : arguments[1];

	                    var flat = this._flatFromNode(node);
	                    if (flat) this._setSelected(flat, fireEvent);
	                }
	            },
	            preSelectNode: {
	                value: function preSelectNode(node) {
	                    var flat = this._flatFromNode(node);
	                    if (flat) this._preSelect(flat);
	                }
	            },
	            _onArrowKey: {
	                value: function _onArrowKey(down, viewPane) {
	                    var _this = this;

	                    var items = viewPane._getFilteredData();
	                    if (!items.length) {
	                        return;
	                    }if (!this.$preSelectedNode) this.$preSelectedNode = this.$selectedNode;

	                    if (this.quickFindTerm) {
	                        if (down) this._selectNextSearchResult();else this._selectPreviousSearchResult();
	                    } else {
	                        var selectedItem = undefined;

	                        if (this.$preSelectedNode === undefined) {
	                            selectedItem = items[down ? 0 : items.length - 1];
	                        } else {
	                            var currIndex = _.findIndex(items, function (fi) {
	                                return fi.data === _this.$preSelectedNode;
	                            });
	                            if (down && items[currIndex + 1] || !down && currIndex - 1 >= 0) {
	                                selectedItem = items[currIndex + (down ? 1 : -1)];
	                            } else {
	                                selectedItem = items[down ? 0 : items.length - 1];
	                            }
	                        }
	                        //                this._setSelected(selectedItem);
	                        //                viewPane.centerOnItem(selectedItem);
	                        this._preSelect(selectedItem);
	                    }
	                }
	            },
	            _selectNextSearchResult: {
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
	            },
	            _selectPreviousSearchResult: {
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
	            },
	            _gotoCurrentSearchResult: {
	                value: function _gotoCurrentSearchResult() {
	                    if (this.quickFindIndex !== undefined && this.quickFindMatches[this.quickFindIndex]) {
	                        var item = this.quickFindMatches[this.quickFindIndex];
	                        //                item.pane.centerOnItem(item);
	                        this._preSelect(item);
	                    }
	                }
	            },
	            handleKeyEvent: {
	                value: function handleKeyEvent(e) {
	                    if (_.includes(["ArrowDown", "Down", "ArrowUp", "Up"], e.key)) {
	                        var keydown = $.Event("keydown", {
	                            keyCode: e.keyCode,
	                            which: e.which,
	                            key: e.key
	                        });
	                        var dirCtrl = this.$viewPanes[0].dirCtrl;
	                        $(dirCtrl.$element).find(".jf-tree").trigger(keydown);
	                        e.preventDefault();
	                    }
	                }
	            },
	            _flatFromNode: {
	                value: function _flatFromNode(node) {
	                    var pane = _.find(this.$viewPanes, function (vp) {
	                        return !!vp._flatFromNode(node);
	                    });
	                    if (pane) {
	                        return pane._flatFromNode(node);
	                    }
	                }
	            },
	            openSelected: {
	                value: function openSelected() {
	                    var scrollUpIfNeeded = arguments[0] === undefined ? false : arguments[0];

	                    this.openNode(this.$selectedNode, scrollUpIfNeeded);
	                }
	            },
	            openPreSelected: {
	                value: function openPreSelected() {
	                    var scrollUpIfNeeded = arguments[0] === undefined ? false : arguments[0];

	                    this.openNode(this.$preSelectedNode || this.$selectedNode, scrollUpIfNeeded);
	                }
	            },
	            closeSelected: {
	                value: function closeSelected() {
	                    this.closeNode(this.$selectedNode);
	                }
	            },
	            toggleSelected: {
	                value: function toggleSelected(scrollUpIfNeeded) {
	                    if (this.isNodeOpen(this.$selectedNode)) {
	                        this.closeSelected();
	                    } else {
	                        this.openSelected(scrollUpIfNeeded);
	                    }
	                }
	            },
	            openNode: {
	                value: function openNode(node) {
	                    var _this = this;

	                    var scrollUpIfNeeded = arguments[1] === undefined ? false : arguments[1];
	                    var drillDown = arguments[2] === undefined ? true : arguments[2];
	                    var preSelect = arguments[3] === undefined ? true : arguments[3];

	                    if (!node) {
	                        return;
	                    }if (this.fire("item.before.open", node) === false) {
	                        return $q.when();
	                    }var defer = $q.defer();

	                    var flat = this._flatFromNode(node);

	                    if (flat && flat.hasChildren !== false && !flat.data.$noChildren && !flat.$pending) {
	                        if (!_.includes(this.$openedNodes, node)) {
	                            this.$openedNodes.push(node);
	                            flat.$pending = true;
	                            this.getChildren(node).then(function (children) {
	                                if (!children.length) node.$noChildren = true;else flat.hasChildren = true;

	                                var reDrill = false;
	                                if (_this.$drillDownMode && _this.$currParentFlat) {
	                                    if (flat.data !== _this.GO_UP_NODE && _this.uniqueIdGetter(flat.data) === _this.uniqueIdGetter(_this.$currParentFlat.data)) {
	                                        reDrill = true;
	                                    }
	                                }

	                                if (_this.$drillDownMode && (reDrill || drillDown)) {
	                                    _this.drillDown(flat);
	                                } else {

	                                    if (preSelect) _this._preSelect(flat);

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
	                                _this.openNode(node, scrollUpIfNeeded).then(function () {
	                                    defer.resolve();
	                                });
	                            }, 100);
	                        } else {
	                            defer.resolve();
	                        }
	                    }

	                    return defer.promise;
	                }
	            },
	            closeNode: {
	                value: function closeNode(node) {
	                    if (_.includes(this.$openedNodes, node)) {
	                        _.remove(this.$openedNodes, function (n) {
	                            return n === node;
	                        });
	                        var flat = this._flatFromNode(node);
	                        if (flat) flat.pane._removeChildren(flat);
	                    }
	                }
	            },
	            toggleExpansion: {
	                value: function toggleExpansion(node) {
	                    var flat = this._flatFromNode(node);
	                    if (flat && flat.pane.isNodeOpen(node)) {
	                        this.closeNode(node);
	                    } else {
	                        this.openNode(node, true);
	                    }
	                }
	            },
	            deleteNode: {
	                value: function deleteNode(node) {
	                    var flat = this._flatFromNode(node);
	                    flat.pane._deleteItem(flat);
	                }
	            },
	            drillUp: {
	                value: function drillUp() {
	                    if (!this.$drillDownMode) {
	                        return;
	                    }this.closeNode(this.$currParentFlat.$origFlat.data);
	                    var parent = this.$currParentFlat.$origFlat.parent;
	                    if (parent && parent.data !== this.GO_UP_NODE) {
	                        this.drillDown(parent);
	                    } else {
	                        this.drillUpToRoot();
	                    }
	                    this._refreshIndentations();
	                }
	            },
	            drillDown: {
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
	            },
	            drillUpToRoot: {
	                value: function drillUpToRoot() {
	                    if (!this.$currParentFlat) {
	                        return;
	                    }this.$openedNodes = [];
	                    this.$currParentFlat.$origFlat.pane.dirCtrl.resetScroll();
	                    this.setTreeData(this.$rootCache);
	                    delete this.$currParentFlat;
	                    this._refreshIndentations();
	                    this.centerOnSelected();
	                }
	            },
	            getCurrentParent: {
	                value: function getCurrentParent() {
	                    return this.$currParentFlat ? this.$currParentFlat.data : null;
	                }
	            },
	            openDeepNodeByUniqueId: {
	                value: function openDeepNodeByUniqueId(uniqueId) {
	                    var _this = this;

	                    var defer = $q.defer();

	                    this.nodeByIdGetter(uniqueId).then(function (node) {
	                        _this.openDeepNode(node).then(function () {
	                            defer.resolve();
	                        });
	                    });

	                    return defer.promise;
	                }
	            },
	            openDeepNode: {
	                value: function openDeepNode(node) {
	                    var _this = this;

	                    if (!node) {
	                        console.error("openDeepNode was called with undefined node");
	                        return;
	                    }

	                    if (this.$drillDownMode) {
	                        this.drillUpToRoot();
	                    }

	                    var defer = $q.defer();

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
	                    var handleNext = function () {
	                        var nextId = _this.uniqueIdGetter(nodesToOpen[index]);
	                        var nextNode = _this.findNode(function (n) {
	                            return _this.uniqueIdGetter(n) === nextId;
	                        });

	                        if (index + 1 < nodesToOpen.length) {
	                            if (nextNode) _this.openNode(nextNode).then(function () {
	                                index++;
	                                handleNext();
	                            });else {
	                                defer.resolve();
	                            }
	                        } else {
	                            $timeout(function () {
	                                if (nextNode) {
	                                    var flat = _this._flatFromNode(nextNode);
	                                    if (flat) _this.selectNode(nextNode);else {
	                                        _this.selectFirst();
	                                    }
	                                    //                        this.treeApi.openNode(nodeToSelect)
	                                } else {
	                                    _this.selectFirst();
	                                }
	                                defer.resolve();
	                            });
	                        }
	                    };

	                    handleNext();

	                    return defer.promise;
	                }
	            },
	            getChildren: {
	                value: function getChildren(node) {
	                    var _this = this;

	                    var defer = $q.defer();

	                    if (this.childrenGetter) {
	                        if (node && node.$childrenCache) {
	                            defer.resolve(node.$childrenCache);
	                        } else if (!node && this.$rootCache) {
	                            defer.resolve(this.$rootCache);
	                        } else {
	                            var childrenOrPromise = this.childrenGetter(node);
	                            if (childrenOrPromise && childrenOrPromise.then) {
	                                childrenOrPromise.then(function (children) {
	                                    if (children && _this.sortingFunction) {
	                                        children = children.sort(_this.sortingFunction);
	                                    }
	                                    if (node) node.$childrenCache = children;else _this.$rootCache = children;
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
	            },
	            _setSelected: {
	                value: function _setSelected(item) {
	                    var fireEvent = arguments[1] === undefined ? true : arguments[1];

	                    if (fireEvent && item.data !== this.GO_UP_NODE && this.$selectedNode !== this.GO_UP_NODE) {
	                        var entityChange = !this.uniqueIdGetter || item.data && this.$selectedNode && this.uniqueIdGetter(item.data) !== this.uniqueIdGetter(this.$selectedNode) || !this.$selectedNode && item.data || this.$selectedNode && !item.data;
	                        this.$selectedNode = item.data;
	                        if (entityChange) {
	                            this.fire("item.selected", item.data);
	                        }
	                    } else {
	                        this.$selectedNode = item.data;
	                    }
	                    this.$preSelectedNode = null;
	                }
	            },
	            _preSelect: {
	                value: function _preSelect(item) {
	                    this.$preSelectedNode = item.data;
	                    item.pane.bringItemToView(item);
	                }
	            },
	            selectPreSelected: {
	                value: function selectPreSelected() {
	                    if (this.$preSelectedNode) {
	                        this._setSelected(this._flatFromNode(this.$preSelectedNode));
	                    }
	                }
	            },
	            _isSelected: {
	                value: function _isSelected(item) {
	                    return this.$freezedSelected ? this.$freezedSelected === item.data : this.$selectedNode === item.data;
	                }
	            },
	            _isPreSelected: {
	                value: function _isPreSelected(item) {
	                    return this.$freezedPreSelected ? this.$freezedPreSelected === item.data : this.$preSelectedNode === item.data;
	                }
	            },
	            _freezeSelected: {
	                value: function _freezeSelected() {
	                    this.$freezedSelected = this.$selectedNode;
	                    this.$freezedPreSelected = this.$preSelectedNode;
	                }
	            },
	            _unFreezeSelected: {
	                value: function _unFreezeSelected() {
	                    delete this.$freezedSelected;
	                    delete this.$freezedPreSelected;
	                }
	            },
	            selectFirst: {
	                value: function selectFirst() {
	                    if (this.$viewPanes[0]) this.$viewPanes[0].selectFirst();
	                }
	            },
	            getSelectedNode: {
	                value: function getSelectedNode() {
	                    var ignoreFreeze = arguments[0] === undefined ? false : arguments[0];

	                    return !ignoreFreeze ? this.$freezedSelected || this.$selectedNode : this.$selectedNode || null;
	                }
	            },
	            getPreSelectedNode: {
	                value: function getPreSelectedNode() {
	                    var ignoreFreeze = arguments[0] === undefined ? false : arguments[0];

	                    return !ignoreFreeze ? this.$freezedPreSelected || this.$preSelectedNode : this.$preSelectedNode || null;
	                }
	            },
	            on: {
	                value: function on(event, listener) {
	                    if (!_.includes(this.supportedEvents, event)) {
	                        console.error("jf-tree: Unsupported Event: " + event);
	                        return;
	                    }
	                    if (!this.listeners[event]) this.listeners[event] = [];
	                    this.listeners[event].push(listener);
	                    return this;
	                }
	            },
	            off: {
	                value: function off(event, listener) {
	                    if (!_.includes(this.supportedEvents, event)) {
	                        console.error("jf-tree: Unsupported Event: " + event);
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
	            },
	            fire: {
	                value: function fire(event) {
	                    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                        params[_key - 1] = arguments[_key];
	                    }

	                    var stopped = false;
	                    if (this.listeners[event]) {
	                        this.listeners[event].forEach(function (listener) {
	                            if (stopped) return;
	                            if (listener.apply(undefined, params) === false) stopped = true;
	                        });
	                    }
	                    return !stopped;
	                }
	            },
	            setObjectName: {
	                value: function setObjectName(objectName) {
	                    var useAn = arguments[1] === undefined ? false : arguments[1];

	                    this.objectName = objectName;
	                    this.useAnWithObjectName = useAn;
	                    return this;
	                }
	            },
	            sortBy: {
	                value: function sortBy() {
	                    return this;
	                }
	            },
	            setActions: {
	                value: function setActions(actions) {
	                    this.actions = actions;
	                    return this;
	                }
	            },
	            createViewPane: {
	                value: function createViewPane(viewPaneName) {
	                    viewPaneName = viewPaneName || "default";
	                    var exists = this.getViewPane(viewPaneName);
	                    if (exists) {
	                        return exists;
	                    } else {
	                        var viewPane = new TreeViewPane(viewPaneName, this);
	                        this.$viewPanes.push(viewPane);
	                        return viewPane;
	                    }
	                }
	            },
	            getViewPane: {
	                value: function getViewPane(viewPaneName) {
	                    viewPaneName = viewPaneName || "default";
	                    return _.find(this.$viewPanes, function (vp) {
	                        return vp.viewPaneName === viewPaneName;
	                    });
	                }
	            },
	            _setDirectiveController: {
	                value: function _setDirectiveController(ctrl) {
	                    var pane = this.getViewPane(ctrl.viewPaneName);
	                    if (!pane) console.error("Missing view pane '" + ctrl.viewPaneName + "'. Forgot to create it?");else pane._setDirectiveController(ctrl);
	                }
	            },
	            setEmptyTreeText: {
	                value: function setEmptyTreeText(text) {
	                    this.emptyTreeText = text;
	                    return this;
	                }
	            },
	            refreshFilter: {
	                value: function refreshFilter() {
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp.refreshFilter(true);
	                    });
	                }
	            },
	            focus: {
	                value: function focus() {
	                    if (this.$viewPanes[0]) this.$viewPanes[0].focus();
	                }
	            },
	            onViewUpdate: {
	                value: function onViewUpdate(originView) {
	                    this.$viewPanes.forEach(function (vp) {
	                        if (vp !== originView) vp.update(false);
	                    });
	                }
	            },
	            refreshPaneSelection: {
	                value: function refreshPaneSelection() {
	                    this.$viewPanes.forEach(function (vp) {
	                        return vp._buildFlatItems();
	                    });
	                }
	            },
	            getParentNode: {
	                value: function getParentNode(node) {
	                    var flat = this._flatFromNode(node);
	                    var parent = flat.parent;
	                    if (parent) {
	                        return parent.data;
	                    }
	                }
	            },
	            _createContextMenu: {
	                value: function _createContextMenu() {
	                    var _this = this;

	                    this.ContextMenuService.contextMenu({
	                        selector: ".jf-tree .jf-tree-item",
	                        build: function ($trigger) {
	                            var defer = _this.$q.defer();
	                            var rowCtrl = angular.element($trigger[0]).controller("jfTreeItem");
	                            var items = rowCtrl.data.data.$cachedCMItems;
	                            if (items) {
	                                defer.resolve(items);
	                            } else {
	                                _this.contextMenuItemsGetter(rowCtrl.data.data, function (items) {
	                                    rowCtrl.data.data.$cachedCMItems = items;
	                                    defer.resolve(items);
	                                });
	                            }
	                            return defer.promise;
	                        }
	                    });
	                }
	            },
	            getNodesCount: {
	                value: function getNodesCount() {
	                    var count = 0;
	                    this.$viewPanes.forEach(function (vp) {
	                        count += vp.getNodesCount();
	                    });
	                    return count;
	                }
	            },
	            getFilteredNodesCount: {
	                value: function getFilteredNodesCount() {
	                    var count = 0;
	                    this.$viewPanes.forEach(function (vp) {
	                        count += vp.getFilteredNodesCount();
	                    });
	                    return count;
	                }
	            },
	            showLines: {
	                value: function showLines() {
	                    this.linesVisible = true;
	                    this._refreshIndentations();
	                    return this;
	                }
	            },
	            hideLines: {
	                value: function hideLines() {
	                    this.linesVisible = false;
	                    this._refreshIndentations();
	                }
	            },
	            bringNodeToView: {
	                value: function bringNodeToView(node) {
	                    var doScroll = arguments[1] === undefined ? false : arguments[1];

	                    var fi = this._flatFromNode(node);
	                    if (fi) {
	                        fi.pane.bringItemToView(fi, !doScroll);
	                    }
	                }
	            },
	            registerEventOnNode: {
	                value: function registerEventOnNode(event, callback) {
	                    if (!this.eventsToRegisterOnNode) this.eventsToRegisterOnNode = [];
	                    this.eventsToRegisterOnNode.push({ event: event, callback: callback });
	                }
	            }
	        });

	        return JFTreeApiClass;
	    })();

	    return JFTreeApiClass;
	}

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var TreeViewPane = exports.TreeViewPane = (function () {
	    function TreeViewPane(viewPaneName, treeApi) {
	        _classCallCheck(this, TreeViewPane);

	        this.viewPaneName = viewPaneName;
	        this.treeApi = treeApi;
	        this.$flatItems = [];

	        this.itemHeight = "50px";
	        this.itemsPerPage = 25;

	        this._renderLinesBackgrounds();
	    }

	    _createClass(TreeViewPane, {
	        setItemsPerPage: {
	            value: function setItemsPerPage(ipp) {
	                this.itemsPerPage = ipp;
	                this._renderLinesBackgrounds();
	                return this;
	            }
	        },
	        setItemHeight: {
	            value: function setItemHeight(height) {
	                this.itemHeight = height;
	                return this;
	            }
	        },
	        update: {
	            value: function update() {
	                var notifyTree = arguments[0] === undefined ? true : arguments[0];

	                this.refreshFilter();
	                if (this.dirCtrl) {
	                    this.dirCtrl.refresh();
	                }

	                if (this.autoHeight) this._setAutoItemsPerPage();
	                if (notifyTree) this.treeApi.onViewUpdate(this);
	            }
	        },
	        _getCurrentScrollPos: {
	            value: function _getCurrentScrollPos() {
	                return this.dirCtrl.virtualScrollIndex + this.dirCtrl.virtScrollDisplacement;
	            }
	        },
	        scrollTo: {
	            value: function scrollTo(scrollPos) {
	                var duration = arguments[1] === undefined ? 500 : arguments[1];

	                var dist = scrollPos - this._getCurrentScrollPos();
	                this.scroll(dist, duration);
	            }
	        },
	        _scrollTo: {
	            value: function _scrollTo(scrollPos) {
	                var dist = scrollPos - this._getCurrentScrollPos();
	                this._scroll(dist);
	            }
	        },
	        scroll: {
	            value: function scroll(numOfRows) {
	                var _this = this;

	                var duration = arguments[1] === undefined ? 500 : arguments[1];

	                if (duration === 0) {
	                    this._scroll(numOfRows);
	                    return;
	                }

	                var $timeout = this.treeApi.$timeout;
	                if (this.scrollTimeout) {
	                    $timeout.cancel(this.scrollTimeout);
	                    delete this.scrollTimeout;
	                }
	                var quadraticEase = function (k) {
	                    return k * (2 - k);
	                };

	                var interval = 40;
	                var currentScrollPos = this._getCurrentScrollPos();

	                var steps = Math.ceil(duration / interval);
	                var currentStep = 1;

	                var cycle = function () {
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
	        },
	        _scroll: {
	            value: function _scroll(numOfRows) {
	                if (!numOfRows) {
	                    return;
	                }var abs = Math.abs(numOfRows);
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
	            }
	        },
	        _setDirectiveController: {
	            value: function _setDirectiveController(directiveController) {
	                this.dirCtrl = directiveController;
	                this.dirCtrl.viewPane = this;

	                if (this.itemsPerPage === "auto") {
	                    this.autoHeight = true;
	                    this._setAutoItemsPerPage();
	                }
	            }
	        },
	        _setAutoItemsPerPage: {
	            value: function _setAutoItemsPerPage() {
	                var _this = this;

	                this.treeApi.$timeout(function () {
	                    var containerHeight = $(_this.dirCtrl.$element).parent().height();
	                    _this.containerHeight = containerHeight;
	                    _this.setItemsPerPage(Math.floor(containerHeight / parseFloat(_this.itemHeight)));
	                });
	            }
	        },
	        _hasHorizontalScrollbar: {
	            value: function _hasHorizontalScrollbar() {
	                var hScrollWrapper = $(this.dirCtrl.$element).find(".h-scroll-wrapper");
	                return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
	            }
	        },
	        _getHorizontalScrollbarHeight: {
	            value: function _getHorizontalScrollbarHeight() {
	                var hScrollWrapper = $(this.dirCtrl.$element).find(".h-scroll-wrapper");
	                return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
	            }
	        },
	        _getPageData: {
	            value: function _getPageData() {
	                var prePage = this._getPrePagedData();
	                var vScrollIndex = this.dirCtrl.$freezedVScrollIndex !== undefined ? this.dirCtrl.$freezedVScrollIndex : this.dirCtrl.virtualScrollIndex;
	                var additionals = vScrollIndex + this.itemsPerPage + 2 <= prePage.length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= prePage.length ? 1 : 0;
	                return prePage.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
	            }
	        },
	        _getPrePagedData: {
	            value: function _getPrePagedData() {
	                var ignoreFreeze = arguments[0] === undefined ? false : arguments[0];

	                return this._getSortedData(this._getFilteredData(this._getRawData(ignoreFreeze), ignoreFreeze));
	            }
	        },
	        _getSortedData: {
	            value: function _getSortedData(sourceData) {
	                return sourceData;
	            }
	        },
	        _getFilteredData: {
	            value: function _getFilteredData(sourceData) {
	                var _this = this;

	                var ignoreCache = arguments[1] === undefined ? false : arguments[1];

	                sourceData = sourceData || this._getRawData(ignoreCache);
	                if (this.treeApi.filterCallback && sourceData.length) {
	                    var filterCache = undefined;
	                    if (!this.filterCache || ignoreCache) {
	                        filterCache = _.filter(sourceData, function (item) {
	                            var parentIsFilteredOut = false;
	                            var curr = item;
	                            while (curr.parent) {
	                                curr = curr.parent;
	                            }
	                            if (curr.data !== _this.treeApi.GO_UP_NODE && !_this.treeApi.filterCallback(curr.data)) {
	                                parentIsFilteredOut = true;
	                            }

	                            return item.data === _this.treeApi.GO_UP_NODE || !parentIsFilteredOut && _this.treeApi.filterCallback(item.data);
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
	        },
	        refreshFilter: {
	            value: function refreshFilter() {
	                var full = arguments[0] === undefined ? false : arguments[0];

	                if (full) this.$flatItems.forEach(function (fi) {
	                    if (fi.data && fi.data.$$$filterResultCache !== undefined) {
	                        delete fi.data.$$$filterResultCache;
	                    }
	                });
	                delete this.filterCache;
	            }
	        },
	        _getRawData: {
	            value: function _getRawData() {
	                var ignoreFreeze = arguments[0] === undefined ? false : arguments[0];

	                return (!ignoreFreeze ? this.$freezedItems : null) || this.$flatItems || [];
	            }
	        },
	        _freeze: {
	            value: function _freeze() {
	                if (this.treeApi.$masterFreeze) {
	                    return;
	                }this.$freezedItems = [].concat(this.$flatItems);
	                this.$freezedOpened = [].concat(this.treeApi.$openedNodes);
	                this.treeApi._freezeSelected();
	                if (this.dirCtrl) this.dirCtrl._freezeVScroll();
	                this.$freezed = true;
	            }
	        },
	        _unFreeze: {
	            value: function _unFreeze() {
	                if (this.treeApi.$masterFreeze) {
	                    return;
	                }delete this.$freezedItems;
	                delete this.$freezedOpened;
	                this.treeApi._unFreezeSelected();
	                if (this.dirCtrl) this.dirCtrl._unFreezeVScroll();
	                this.$freezed = false;

	                this.refreshFilter();
	                if (this.dirCtrl) this.dirCtrl.syncFakeScroller();
	            }
	        },
	        _addChildren: {
	            value: function _addChildren(children) {
	                var _this = this;

	                var level = arguments[1] === undefined ? 0 : arguments[1];
	                var parent = arguments[2] === undefined ? null : arguments[2];

	                var parentIndex = this.$flatItems.indexOf(parent);
	                var added = [];
	                children.forEach(function (node) {
	                    var flatItem = _this._createFlatItem(node, level, parent);
	                    added.push(flatItem);
	                    if (_this.treeApi.isNodeOpen(node, true)) {
	                        _this.treeApi.getChildren(node).then(function (_children) {
	                            if (_children && _children.length) {
	                                _this._addChildren(_children, level + 1, flatItem);
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
	        },
	        _removeChildren: {
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
	        },
	        _normalizeScroll: {
	            value: function _normalizeScroll() {
	                var _this = this;

	                this.treeApi.$timeout(function () {
	                    if (!_this.dirCtrl) return;
	                    if (_this.dirCtrl.virtualScrollIndex + _this.itemsPerPage > _this.$flatItems.length) {
	                        _this._scrollTo(_this.$flatItems.length - _this.itemsPerPage + 1.999);
	                    }
	                    if (_this.$flatItems.length < _this.itemsPerPage) {
	                        _this.dirCtrl.resetScroll();
	                    }
	                });
	            }
	        },
	        _deleteItem: {
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
	        },
	        _buildFlatItems: {
	            value: function _buildFlatItems() {
	                var _this = this;

	                this.$flatItems = [];
	                var paneRoot = _.filter(this.treeApi.$root, function (node) {
	                    return _this.treeApi.paneSelector(node) === _this.viewPaneName;
	                });
	                this._addChildren(paneRoot);
	            }
	        },
	        _createFlatItem: {
	            value: function _createFlatItem(node) {
	                var level = arguments[1] === undefined ? 0 : arguments[1];
	                var parent = arguments[2] === undefined ? null : arguments[2];

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
	        },
	        _refreshFlatChildrenCheck: {
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
	        },
	        _recursiveOpenRestore: {
	            value: function _recursiveOpenRestore(node) {
	                var _this = this;

	                var restoreIfClosed = arguments[1] === undefined ? true : arguments[1];

	                var defer = this.treeApi.$q.defer();

	                var openRestoreNode = function (node) {

	                    _this.treeApi.openNode(node, false, false, false).then(function () {
	                        var children = node.$childrenCache;
	                        if (!children || !children.length) defer.resolve();else {
	                            (function () {
	                                node.children = true;
	                                var pendingPromises = children.length;
	                                children.forEach(function (child) {
	                                    _this._recursiveOpenRestore(child, false).then(function () {
	                                        pendingPromises--;
	                                        if (pendingPromises === 0) {
	                                            defer.resolve();
	                                        }
	                                    });
	                                });
	                            })();
	                        }
	                    });
	                };

	                var id = this.treeApi.uniqueIdGetter(node);
	                var opened = _.find(this.treeApi.$openedNodes, function (n) {
	                    return _this.treeApi.uniqueIdGetter(n) === id;
	                });
	                if (opened) {
	                    _.remove(this.treeApi.$openedNodes, function (n) {
	                        return n === opened;
	                    });
	                    openRestoreNode(node);
	                } else {
	                    if (restoreIfClosed) {
	                        (function () {
	                            var closedRoot = _.find(_this.$flatItems, function (fi) {
	                                return fi.data && fi.data !== _this.treeApi.GO_UP_NODE && !_.includes(_this.treeApi.$openedNodes, fi.data) && _this.treeApi.uniqueIdGetter(fi.data) === id;
	                            });
	                            if (closedRoot) {
	                                defer.promise.then(function () {
	                                    _this.treeApi.closeNode(closedRoot.data);
	                                });
	                                openRestoreNode(closedRoot.data);
	                            } else {
	                                defer.resolve();
	                            }
	                        })();
	                    } else {
	                        defer.resolve();
	                    }
	                }

	                return defer.promise;
	            }
	        },
	        refreshNode: {
	            value: function refreshNode(node) {
	                var _this = this;

	                var defer = this.treeApi.$q.defer();
	                var flat = this._flatFromNode(node);
	                if (flat) {
	                    (function () {
	                        _this._freeze();
	                        _this._removeChildren(flat);

	                        delete flat.data.$childrenCache;
	                        delete flat.data.$noChildren;
	                        delete flat.hasChildren;

	                        var doRefresh = function () {
	                            _this.refreshNodeContextMenu(flat.data);
	                            _this._recursiveOpenRestore(flat.data).then(function () {
	                                _this._refreshFlatChildrenCheck(flat);
	                                _this._unFreeze();
	                                defer.resolve();
	                            });
	                        };
	                        if (_.find(_this.treeApi.$root, function (node) {
	                            return node === flat.data;
	                        })) {
	                            delete _this.treeApi.$rootCache;
	                            _this.treeApi.getChildren().then(function () {
	                                return doRefresh();
	                            });
	                        } else doRefresh();
	                    })();
	                }
	                return defer.promise;
	            }
	        },
	        refreshNodeContextMenu: {
	            value: function refreshNodeContextMenu(node) {
	                delete node.$cachedCMItems;
	            }
	        },
	        refreshView: {
	            value: function refreshView() {
	                var _this = this;

	                var mainDefer = this.treeApi.$q.defer();

	                this._freeze();
	                this.treeApi._getRoot().then(function () {
	                    if (_this.treeApi.uniqueIdGetter) {
	                        (function () {
	                            var resolveCount = 0;
	                            var itemsCount = _this.$flatItems.length;
	                            if (!_this.$flatItems.length) {
	                                _this._unFreeze();
	                                mainDefer.resolve();
	                            }
	                            _this.$flatItems.forEach(function (fi, ind) {
	                                _this._recursiveOpenRestore(fi.data, false).then(function () {
	                                    resolveCount++;
	                                    if (resolveCount === itemsCount) {
	                                        (function () {
	                                            var selectedId = _this.treeApi.$selectedNode && _this.treeApi.$selectedNode !== _this.treeApi.GO_UP_NODE ? _this.treeApi.uniqueIdGetter(_this.treeApi.$selectedNode) : null;
	                                            var newSelected = selectedId !== null ? _.find(_this.$flatItems, function (fi) {
	                                                return fi.data !== _this.treeApi.GO_UP_NODE && _this.treeApi.uniqueIdGetter(fi.data) === selectedId;
	                                            }) : null;
	                                            if (_this.treeApi.$selectedNode === _this.treeApi.GO_UP_NODE) newSelected = _.find(_this.$flatItems, function (fi) {
	                                                return fi.data === _this.treeApi.GO_UP_NODE;
	                                            });
	                                            if (newSelected) {
	                                                _this.treeApi._setSelected(newSelected);
	                                                _this._unFreeze();
	                                                mainDefer.resolve();
	                                            } else if (selectedId) {
	                                                _this.treeApi.nodeByIdGetter(selectedId).then(function (node) {
	                                                    _this._unFreeze();
	                                                    _this.treeApi.openDeepNode(node).then(function () {
	                                                        mainDefer.resolve();
	                                                    });
	                                                })["catch"](function () {
	                                                    _this.selectFirst();
	                                                    _this._unFreeze();
	                                                    mainDefer.resolve();
	                                                });
	                                            } else {
	                                                _this._unFreeze();
	                                                mainDefer.resolve();
	                                            }
	                                        })();
	                                    }
	                                });
	                            });
	                        })();
	                    } else {
	                        _this._unFreeze();
	                        mainDefer.resolve();
	                    }
	                });

	                return mainDefer.promise;
	            }
	        },
	        selectFirst: {
	            value: function selectFirst() {
	                if (this._getPrePagedData().length) this.treeApi._setSelected(this._getPrePagedData()[0]);
	            }
	        },
	        getQuickFindMatches: {
	            value: function getQuickFindMatches() {
	                var _this = this;

	                if (!this.treeApi.quickFindTerm) {
	                    return [];
	                } else {
	                    var matches = _.filter(this.$flatItems, function (fi, ind) {
	                        var text = _this.treeApi.textGetter(fi.data);
	                        var matchObj = _this.treeApi.AdvancedStringMatch.match(text, _this.treeApi.quickFindTerm);
	                        var matched = matchObj ? matchObj.matched : null;
	                        if (matched) fi.$$index = ind;
	                        return matched;
	                    });

	                    if (this.treeApi.$selectedNode) {
	                        (function () {
	                            var selectedIndex = _.findIndex(_this.$flatItems, function (fi) {
	                                return fi.data === _this.treeApi.$selectedNode;
	                            });
	                            var matchesAfterSelection = _.filter(matches, function (match) {
	                                return match.$$index >= selectedIndex;
	                            });
	                            var matchesBeforeSelection = _.difference(matches, matchesAfterSelection);

	                            matches = matchesAfterSelection.concat(matchesBeforeSelection);
	                        })();
	                    }

	                    return matches;
	                }
	            }
	        },
	        centerOnNode: {
	            value: function centerOnNode(node) {
	                var flat = this._flatFromNode(node);
	                if (flat) this.centerOnItem(flat);
	            }
	        },
	        _flatFromNode: {
	            value: function _flatFromNode(node) {
	                var _this = this;

	                if (node === this.treeApi.GO_UP_NODE) {
	                    return _.find(this.$flatItems, { $specialNode: "GO_UP" });
	                }var refMatch = _.find(this.$flatItems, function (flat) {
	                    return flat.data === node;
	                });
	                if (!refMatch) {
	                    var _ret = (function () {
	                        var nodeId = _this.treeApi.uniqueIdGetter(node);
	                        var idMatch = _.find(_this.$flatItems, function (flat) {
	                            if (flat.data === _this.treeApi.GO_UP_NODE) return false;else {
	                                var flatId = _this.treeApi.uniqueIdGetter(flat.data);
	                                return flatId === nodeId;
	                            }
	                        });
	                        return {
	                            v: idMatch
	                        };
	                    })();

	                    if (typeof _ret === "object") {
	                        return _ret.v;
	                    }
	                }
	                return refMatch;
	            }
	        },
	        bringItemToView: {
	            value: function bringItemToView(item) {
	                var jump = arguments[1] === undefined ? true : arguments[1];

	                var prePaged = this._getPrePagedData(true);
	                var index = prePaged.indexOf(item);

	                if (index - 1 < this.dirCtrl.virtualScrollIndex) {
	                    this.scrollTo(index, jump ? 0 : undefined);
	                } else if (index + 1 > this.dirCtrl.virtualScrollIndex + this.itemsPerPage) {
	                    var fullItems = this.containerHeight ? Math.floor(this.containerHeight / parseFloat(this.itemHeight)) : this.itemsPerPage;
	                    var scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
	                    var displace = this.containerHeight ? 1 - (this.containerHeight / parseFloat(this.itemHeight) - fullItems) : 1;
	                    var hScrollFactor = 0;
	                    if (this._hasHorizontalScrollbar()) {
	                        var pixelFactor = this._getHorizontalScrollbarHeight();
	                        hScrollFactor = pixelFactor / parseFloat(this.itemHeight);
	                    }
	                    this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
	                }
	                this.dirCtrl.syncFakeScroller(false);
	            }
	        },
	        centerOnItem: {
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
	        },
	        focus: {
	            value: function focus() {
	                if (this.dirCtrl) $(this.dirCtrl.$element).find(".jf-tree").focus();
	            }
	        },
	        findNode: {
	            value: function findNode(findFunction) {
	                var _this = this;

	                var item = _.find(this.$flatItems, function (fi) {
	                    return fi.data !== _this.treeApi.GO_UP_NODE && findFunction(fi.data);
	                });
	                if (item) {
	                    return item.data;
	                }
	            }
	        },
	        findNodeByUniqueId: {
	            value: function findNodeByUniqueId(uniqueId) {
	                var _this = this;

	                var item = _.find(this.$flatItems, function (fi) {
	                    return fi.data !== _this.treeApi.GO_UP_NODE && _this.treeApi.uniqueIdGetter(fi.data) === uniqueId;
	                });
	                if (item) {
	                    return item.data;
	                }
	            }
	        },
	        isNodeOpen: {
	            value: function isNodeOpen(node) {
	                var ignoreFreeze = arguments[1] === undefined ? false : arguments[1];

	                return !ignoreFreeze && this.$freezedOpened && _.includes(this.$freezedOpened, node) || !this.$freezedOpened && _.includes(this.treeApi.$openedNodes, node);
	            }
	        },
	        getNodesCount: {
	            value: function getNodesCount() {
	                return this._getRawData(true).length;
	            }
	        },
	        getFilteredNodesCount: {
	            value: function getFilteredNodesCount() {
	                var _this = this;

	                return _.filter(this._getFilteredData(null, true), function (fi) {
	                    return fi.data !== _this.treeApi.GO_UP_NODE;
	                }).length;
	            }
	        },
	        _refreshIndentations: {
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
	        },
	        _renderLinesBackgrounds: {
	            value: function _renderLinesBackgrounds() {
	                var height = parseFloat(this.itemHeight);
	                var canvas = $("<canvas width=\"26\" height=\"" + height + "\"></canvas>")[0];
	                var ctx = canvas.getContext("2d");
	                ctx.strokeStyle = "#aaaaaa";

	                ctx.beginPath();
	                ctx.moveTo(13, 0);
	                ctx.lineTo(13, height);
	                ctx.stroke();
	                var verticalLine = canvas.toDataURL("image/png", 1);

	                ctx.clearRect(0, 0, 26, height);
	                ctx.beginPath();
	                ctx.moveTo(0, height / 2);
	                ctx.lineTo(26, height / 2);
	                ctx.stroke();
	                var horizontalLine = canvas.toDataURL("image/png", 1);

	                ctx.clearRect(0, 0, 26, height);
	                ctx.beginPath();
	                ctx.moveTo(13, 0);
	                ctx.lineTo(13, height);
	                ctx.moveTo(13, height / 2);
	                ctx.lineTo(26, height / 2);
	                ctx.stroke();
	                var connectionPoint = canvas.toDataURL("image/png", 1);

	                ctx.clearRect(0, 0, 26, height);
	                ctx.beginPath();
	                ctx.moveTo(13, 0);
	                ctx.lineTo(13, height / 2);
	                ctx.lineTo(26, height / 2);
	                ctx.stroke();
	                var lastConnectionPoint = canvas.toDataURL("image/png", 1);

	                this.linesBackgrounds = {
	                    "vertical-line": verticalLine,
	                    "horizontal-line": horizontalLine,
	                    "connection-point": connectionPoint,
	                    "last-connection-point": lastConnectionPoint
	                };
	            }
	        }
	    });

	    return TreeViewPane;
	})();

/***/ },
/* 122 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTree = jfTree;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function jfTree() {
	    return {
	        controller: jfTreeController,
	        controllerAs: "jfTree",
	        bindToController: true,
	        scope: {
	            api: "=",
	            viewPaneName: "@?"
	        },
	        templateUrl: "ui_components/jf_tree/jf_tree.html"
	    };
	}

	var jfTreeController = (function () {
	    /* @ngInject */

	    jfTreeController.$inject = ["$scope", "$element", "$timeout", "$compile", "$rootScope"];
	    function jfTreeController($scope, $element, $timeout, $compile, $rootScope) {
	        var _this = this;

	        _classCallCheck(this, jfTreeController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	        this.$compile = $compile;
	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.cellScopes = [];
	        this.maxFakeScrollHeight = 1000000;

	        $scope.$watch("jfTree.api", function (api) {
	            if (_this.api) {
	                _this.api._setDirectiveController(_this);
	            }
	            if (_this.api && !_this.paginationApi) {
	                _this.paginationApi = new PaginationApi(_this);

	                _this.paginationApi.registerChangeListener(function () {
	                    _this.$timeout(function () {
	                        return _this.refresh(false);
	                    });
	                });

	                _this.currentPage = 0;
	                _this.virtualScrollIndex = 0;
	                _this.virtScrollDisplacement = 0;
	            }
	        });

	        $scope.$on("$destroy", function () {
	            _this.cellScopes.forEach(function (s) {
	                return s.$destroy();
	            });
	        });

	        $(window).on("resize", function () {
	            if (_this.viewPane.autoHeight) _this.viewPane._setAutoItemsPerPage();
	        });

	        $(this.$element).find(".jf-tree").keydown(function (e) {
	            _this.$timeout(function () {
	                switch (e.key) {
	                    case "Down":
	                    case "ArrowDown":
	                        e.preventDefault();
	                        _this.api._onArrowKey(true, _this.viewPane);
	                        break;
	                    case "Up":
	                    case "ArrowUp":
	                        e.preventDefault();
	                        _this.api._onArrowKey(false, _this.viewPane);
	                        break;
	                    case "Enter":
	                        e.preventDefault();
	                        if (_this.api.getPreSelectedNode() === _this.api.GO_UP_NODE) {
	                            _this.api.drillUp();
	                        } else {
	                            _this.api.selectPreSelected();
	                            _this.api.toggleSelected(true);
	                        }
	                        break;
	                    case "Right":
	                    case "ArrowRight":
	                        {
	                            e.preventDefault();
	                            var relevant = _this.api.getPreSelectedNode() || _this.api.getSelectedNode();
	                            if (relevant) {
	                                if (!_this.api.isNodeOpen(relevant)) _this.api.openNode(relevant, true);else {
	                                    if (relevant.$childrenCache && relevant.$childrenCache.length) {
	                                        _this.api.preSelectNode(relevant.$childrenCache[0]);
	                                    }
	                                }
	                            }
	                            break;
	                        }
	                    case "Left":
	                    case "ArrowLeft":
	                        {
	                            e.preventDefault();
	                            var relevant = _this.api.getPreSelectedNode() || _this.api.getSelectedNode();
	                            if (relevant) {
	                                if (_this.api.isNodeOpen(relevant)) _this.api.closeNode(relevant);else {
	                                    var _parent = _this.api.getParentNode(relevant);
	                                    if (_parent) _this.api.preSelectNode(_parent);
	                                }
	                            }
	                            break;
	                        }
	                    default:
	                        if (!e.ctrlKey && !e.shiftKey && !e.metaKey && e.key.toLowerCase() === String.fromCharCode(e.which).toLowerCase()) {
	                            _this.api.fire("keydown", e);
	                        }
	                }
	            });
	        });
	    }

	    _createClass(jfTreeController, {
	        $onInit: {
	            value: function $onInit() {
	                this.viewPaneName = this.viewPaneName || "default";
	            }
	        },
	        clearFilter: {
	            value: function clearFilter() {
	                this.treeFilter = "";
	                this.onUpdateFilter();
	            }
	        },
	        compileTemplate: {
	            value: function compileTemplate(elem, itemId) {
	                var node = this.viewPane._getPageData()[itemId];

	                if (!node) {
	                    return;
	                }var existingScope = _.find(this.cellScopes, function (s) {
	                    return s.node === node.data;
	                });
	                var itemScope = undefined;
	                if (!existingScope) {
	                    itemScope = this.$rootScope.$new();

	                    this.cellScopes.push(itemScope);

	                    _.extend(itemScope, {
	                        node: node.data,
	                        appScope: this.api.appScope,
	                        tree: {
	                            api: this.api
	                        }
	                    });
	                } else itemScope = existingScope;

	                var template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node.data) : this.api.nodeTemplate;

	                var templateElem = $(template);
	                this.$compile(templateElem)(itemScope);
	                elem.empty();
	                elem.append(templateElem);
	            }
	        },
	        _normalizeWheelEvent: {
	            value: function _normalizeWheelEvent(event) {
	                var PIXEL_STEP = 10;
	                var LINE_HEIGHT = 40;
	                var PAGE_HEIGHT = 800;

	                var sX = 0,
	                    sY = 0,
	                    pX = 0,
	                    pY = 0;

	                if ("detail" in event) {
	                    sY = event.detail;
	                }
	                if ("wheelDelta" in event) {
	                    sY = -event.wheelDelta / 120;
	                }
	                if ("wheelDeltaY" in event) {
	                    sY = -event.wheelDeltaY / 120;
	                }
	                if ("wheelDeltaX" in event) {
	                    sX = -event.wheelDeltaX / 120;
	                }

	                // side scrolling on FF with DOMMouseScroll
	                if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
	                    sX = sY;
	                    sY = 0;
	                }

	                pX = sX * PIXEL_STEP;
	                pY = sY * PIXEL_STEP;

	                if ("deltaY" in event) {
	                    pY = event.deltaY;
	                }
	                if ("deltaX" in event) {
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

	                return { spinX: sX,
	                    spinY: sY,
	                    pixelX: pX,
	                    pixelY: pY };
	            }
	        },
	        onMouseWheel: {
	            value: function onMouseWheel($event, $delta, $deltaX, $deltaY) {

	                if (this.viewPane.scrollTimeout) {
	                    this.$timeout.cancel(this.viewPane.scrollTimeout);
	                    delete this.viewPane.scrollTimeout;
	                }

	                var normalDelta = this._normalizeWheelEvent($event.originalEvent).pixelY;
	                var xDelta = this._normalizeWheelEvent($event.originalEvent).pixelX;

	                if (Math.abs(normalDelta) < Math.abs(xDelta)) {
	                    $event.stopPropagation();
	                    return;
	                }

	                var scrollAmount = 0.02 * Math.abs(normalDelta);
	                var scrollPosBefore = this.viewPane._getCurrentScrollPos();
	                if ($deltaY < 0) {
	                    // scrollUp
	                    this.viewPane._scrollTo(scrollPosBefore + scrollAmount);
	                } else if ($deltaY > 0) {
	                    // scrollDown
	                    this.viewPane._scrollTo(scrollPosBefore - scrollAmount);
	                }

	                this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
	                if (scrollPosBefore !== this.viewPane._getCurrentScrollPos()) $event.preventDefault();
	                this.syncFakeScroller(false);

	                this.viewPane.focus();
	            }
	        },
	        resetScroll: {
	            value: function resetScroll() {

	                this.virtualScrollIndex = 0;
	                this.virtScrollDisplacement = 0;
	                this.currentPage = 1;
	                this.syncFakeScroller(false);
	            }
	        },
	        getTotalScrollHeight: {
	            value: function getTotalScrollHeight() {
	                return this.viewPane._getPrePagedData().length * parseFloat(this.viewPane.itemHeight);
	            }
	        },
	        getPageHeight: {
	            value: function getPageHeight() {

	                if (this.viewPane.containerHeight) {
	                    return this.viewPane.containerHeight;
	                } else {
	                    var len = this.viewPane._getPrePagedData().length;
	                    if (len < this.viewPane.itemsPerPage) {
	                        return len * parseFloat(this.viewPane.itemHeight);
	                    } else {
	                        return this.viewPane.itemsPerPage * parseFloat(this.viewPane.itemHeight);
	                    }
	                }
	            }
	        },
	        initScrollFaker: {
	            value: function initScrollFaker() {
	                var _this = this;

	                var scrollParent = $(this.$element).find(".scroll-faker-container");
	                scrollParent.on("scroll", function (e) {
	                    _this.$scope.$apply(function () {
	                        if (_this.$$settingScroll) {
	                            delete _this.$$settingScroll;
	                            return;
	                        }
	                        if (_this.viewPane.scrollTimeout) {
	                            _this.$timeout.cancel(_this.viewPane.scrollTimeout);
	                            delete _this.viewPane.scrollTimeout;
	                        }
	                        var len = _this.viewPane._getPrePagedData().length;
	                        if (len) {
	                            var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
	                            var relativePosition = scrollParent.scrollTop() / maxScrollTop;
	                            if (_.isNaN(relativePosition)) {
	                                relativePosition = 1;
	                            }
	                            var newScrollIndex = relativePosition * (len - _this.viewPane.itemsPerPage);
	                            if (newScrollIndex < 0) newScrollIndex = 0;
	                            _this.virtualScrollIndex = Math.floor(newScrollIndex);
	                            _this.virtScrollDisplacement = newScrollIndex - _this.virtualScrollIndex;
	                            _this.currentPage = Math.floor((_this.virtualScrollIndex + _this.viewPane.itemsPerPage - 1) / _this.viewPane.itemsPerPage);
	                        } else {
	                            _this.virtualScrollIndex = 0;
	                            _this.virtScrollDisplacement = 0;
	                            _this.currentPage = 0;
	                        }
	                        _this.api.fire("pagination.change", _this.paginationApi.getCurrentPage());
	                    });
	                });
	            }
	        },
	        getTranslate: {
	            value: function getTranslate() {
	                var displacement = this.$freezedVScrollDisplacement !== undefined ? this.$freezedVScrollDisplacement : this.virtScrollDisplacement;
	                if (!displacement) {
	                    return 0;
	                } else {
	                    var pixels = displacement * parseFloat(this.viewPane.itemHeight);
	                    return pixels;
	                }
	            }
	        },
	        syncFakeScroller: {
	            value: function syncFakeScroller() {
	                var _this = this;

	                var delay = arguments[0] === undefined ? true : arguments[0];

	                var len = this.viewPane._getPrePagedData(true).length;
	                var scrollParent = $(this.$element).find(".scroll-faker-container");
	                var relativePosition = this.viewPane._getCurrentScrollPos() / (len - this.viewPane.itemsPerPage);

	                var sync = function () {
	                    var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
	                    var scrollTop = Math.floor(maxScrollTop * relativePosition);
	                    _this.$$settingScroll = true;
	                    scrollParent.scrollTop(scrollTop);
	                };
	                if (delay) this.$timeout(sync);else sync();
	            }
	        },
	        getScrollWidth: {
	            value: function getScrollWidth() {
	                var el = $(this.$element).find(".scroll-faker-container")[0];
	                return el.offsetWidth - el.clientWidth;
	            }
	        },
	        refresh: {
	            value: function refresh() {}
	        },
	        isEmpty: {
	            value: function isEmpty() {
	                return !!(this.api.dataWasSet && !this.viewPane._getRawData().length && !this.viewPane.$freezed);
	            }
	        },
	        _freezeVScroll: {
	            value: function _freezeVScroll() {
	                this.$freezedVScrollIndex = this.virtualScrollIndex;
	                this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
	            }
	        },
	        _unFreezeVScroll: {
	            value: function _unFreezeVScroll() {
	                delete this.$freezedVScrollIndex;
	                delete this.$freezedVScrollDisplacement;
	            }
	        }
	    });

	    return jfTreeController;
	})();

	jfTreeController.$inject = ["$scope", "$element", "$timeout", "$compile", "$rootScope"];

	var PaginationApi = (function () {
	    function PaginationApi(treeCtrl) {
	        _classCallCheck(this, PaginationApi);

	        this.treeCtrl = treeCtrl;
	    }

	    _createClass(PaginationApi, {
	        getTotalPages: {
	            value: function getTotalPages() {
	                return Math.ceil(this.treeCtrl.viewPane.getTotalLengthOfData() / this.treeCtrl.viewPane.itemsPerPage);
	            }
	        },
	        getCurrentPage: {
	            value: function getCurrentPage() {
	                return this.treeCtrl.currentPage + 1;
	            }
	        },
	        nextPage: {
	            value: function nextPage() {
	                if (this.getCurrentPage() === this.getTotalPages()) {
	                    return;
	                }this.treeCtrl.currentPage++;
	                this.syncVirtualScroll();
	                this.update();
	                this.treeCtrl.api.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        prevPage: {
	            value: function prevPage() {
	                if (this.getCurrentPage() === 1) {
	                    return;
	                }this.treeCtrl.currentPage--;
	                this.syncVirtualScroll();
	                this.update();
	                this.treeCtrl.api.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        setPage: {
	            value: function setPage(pageNum) {
	                if (pageNum < 1 || pageNum > this.getTotalPages()) {
	                    return;
	                }this.treeCtrl.currentPage = pageNum - 1;

	                this.syncVirtualScroll();
	                this.update();
	                this.treeCtrl.api.fire("pagination.change", this.getCurrentPage());
	            }
	        },
	        update: {
	            value: function update() {
	                var _this = this;

	                if (this.getCurrentPage() > this.getTotalPages()) {
	                    this.setPage(this.getTotalPages());
	                }

	                if (this.listeners) this.listeners.forEach(function (listener) {
	                    return listener(_this.getCurrentPage());
	                });
	            }
	        },
	        registerChangeListener: {
	            value: function registerChangeListener(listener) {
	                if (!this.listeners) this.listeners = [];
	                this.listeners.push(listener);
	            }
	        },
	        syncVirtualScroll: {
	            value: function syncVirtualScroll() {
	                this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage * this.treeCtrl.viewPane.itemsPerPage;
	                this.treeCtrl.syncFakeScroller();
	            }
	        }
	    });

	    return PaginationApi;
	})();

	/*
	        let unusedScopes = _.filter(this.cellScopes, scope => this.api._getPageData().indexOf(scope.node) === -1);
	        unusedScopes.forEach(s => {
	            this.cellScopes.splice(this.cellScopes.indexOf(s),1);
	            s.$destroy()
	        });
	        if (this.paginationApi && updatePagination) this.paginationApi.update();
	*/

/***/ },
/* 123 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTreeItem = jfTreeItem;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTreeItemController = (function () {
	    /* @ngInject */

	    jfTreeItemController.$inject = ["$scope", "$element", "$timeout", "AdvancedStringMatch"];
	    function jfTreeItemController($scope, $element, $timeout, AdvancedStringMatch) {
	        _classCallCheck(this, jfTreeItemController);

	        this.$element = $element;
	        this.$timeout = $timeout;
	        this.$scope = $scope;
	        this.asm = AdvancedStringMatch;

	        $(this.$element).prop("ctrl", this);
	    }

	    _createClass(jfTreeItemController, {
	        $onInit: {
	            value: function $onInit() {
	                this._watchSelection();
	                this._watchExpansion();

	                this._registerEvents();
	            }
	        },
	        _registerEvents: {
	            value: function _registerEvents() {
	                var _this = this;

	                if (this.tree.api.eventsToRegisterOnNode) {
	                    this.tree.api.eventsToRegisterOnNode.forEach(function (registeredEvent) {
	                        _this.tree.api.JFrogEventBus.registerOnScope(_this.$scope, registeredEvent.event, function () {
	                            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                                params[_key] = arguments[_key];
	                            }

	                            registeredEvent.callback(_this.data.data, params);
	                        });
	                    });
	                }
	            }
	        },
	        initExpander: {
	            value: function initExpander() {
	                this._syncExpansionClass(this.isExpanded());
	            }
	        },
	        _syncExpansionClass: {
	            value: function _syncExpansionClass(expanded) {
	                var iconElem = $(this.$element).find(".node-expander");
	                if (expanded) {
	                    iconElem.addClass("expanded");
	                } else {
	                    iconElem.removeClass("expanded");
	                }
	            }
	        },
	        _watchExpansion: {
	            value: function _watchExpansion() {
	                var _this = this;

	                this.$scope.$watch("jfTreeItem.isExpanded()", function (expanded) {
	                    return _this._syncExpansionClass(expanded);
	                });

	                this.$scope.$watch("jfTreeItem.data", function () {
	                    return _this._syncExpansionClass(_this.isExpanded());
	                });
	            }
	        },
	        _watchSelection: {
	            value: function _watchSelection() {
	                var _this = this;

	                //This is instead of using ng-class, which not working smoothly in safari
	                var toggleClass = function (add, className) {
	                    if (add) {
	                        $(_this.$element).addClass(className);
	                    } else {
	                        $(_this.$element).removeClass(className);
	                    }
	                };

	                this.$scope.$watch("jfTreeItem.tree.api.$freezedSelected || jfTreeItem.tree.api.$selectedNode", function (selected) {
	                    var iAmSelected = selected === _this.data.data;
	                    toggleClass(iAmSelected, "selected");
	                });
	                this.$scope.$watch("jfTreeItem.tree.api.$freezedPreSelected || jfTreeItem.tree.api.$preSelectedNode", function (preSelected) {
	                    var iAmPreSelected = preSelected === _this.data.data;
	                    toggleClass(iAmPreSelected, "pre-selected");
	                });
	                this.$scope.$watch("jfTreeItem.data", function () {
	                    var iAmPreSelected = (_this.tree.api.$freezedPreSelected || _this.tree.api.$preSelectedNode) === _this.data.data;
	                    var iAmSelected = (_this.tree.api.$freezedSelected || _this.tree.api.$selectedNode) === _this.data.data;
	                    toggleClass(iAmSelected, "selected");
	                    toggleClass(iAmPreSelected, "pre-selected");
	                });
	            }
	        },
	        _getTreeContainer: {
	            value: function _getTreeContainer() {
	                return $(this.tree.$element).find(".jf-tree-container");
	            }
	        },
	        isSelected: {
	            value: function isSelected() {
	                return this.tree.api._isSelected(this.data);
	            }
	        },
	        isPreSelected: {
	            value: function isPreSelected() {
	                return this.tree.api._isPreSelected(this.data);
	            }
	        },
	        onItemClick: {
	            value: function onItemClick(e) {
	                if (e.type === "click") {
	                    if (this.data.data === this.tree.api.GO_UP_NODE) {
	                        this.tree.api.drillUp();
	                    } else {
	                        this.tree.api._setSelected(this.data);
	                        this.tree.api.fire("item.clicked", this.data.data);
	                    }
	                }
	            }
	        },
	        onItemDoubleClick: {
	            value: function onItemDoubleClick() {
	                this.tree.api.fire("item.dblClicked", this.data.data);
	            }
	        },
	        isExpanded: {
	            value: function isExpanded() {
	                return this.tree.viewPane.isNodeOpen(this.data.data);
	            }
	        },
	        toggleExpansion: {
	            value: function toggleExpansion() {
	                this.tree.api.toggleExpansion(this.data.data);
	            }
	        },
	        isQuickFindMatch: {
	            value: function isQuickFindMatch() {
	                var elem = $(this.$element).find(".jf-tree-item-content .node-text");
	                if (elem.length) {
	                    var text = elem.text();
	                    elem.unhighlight();
	                    if (text && this.tree.api.quickFindTerm) {
	                        var asmResponse = this.asm.match(text, this.tree.api.quickFindTerm);
	                        if (asmResponse.matched) {
	                            this.asm.highlight(elem, asmResponse.segments);
	                        }
	                        return asmResponse.matched;
	                    } else {
	                        return false;
	                    }
	                }
	            }
	        },
	        getClasses: {
	            value: function getClasses() {
	                var classes = [];
	                if (this.isQuickFindMatch()) classes.push("quick-find-match");
	                return classes;
	            }
	        },
	        getCustomClasses: {
	            value: function getCustomClasses() {
	                if (!this.data.data || this.data.data === this.tree.api.GO_UP_NODE || !this.tree.api.classGetter) {
	                    return [];
	                } else {
	                    var classes = this.tree.api.classGetter(this.data.data);
	                    if (!classes) classes = [];else if (!_.isArray(classes)) classes = [classes];
	                    return classes;
	                }
	            }
	        },
	        shouldShowExpander: {
	            value: function shouldShowExpander() {
	                return this.data.hasChildren && !this.data.data.$noChildren && !this.data.$pending;
	            }
	        },
	        getIndentation: {
	            value: function getIndentation() {
	                if (!this.data.data.$indentation) {
	                    this.createIndentation();
	                }
	                return this.data.data.$indentation;
	            }
	        },
	        createIndentation: {
	            value: function createIndentation() {
	                if (!this.tree.api.linesVisible) {
	                    this.data.data.$indentation = _.map(new Array(this.data.level), function (i) {
	                        return {};
	                    });
	                    return;
	                }

	                var flats = this.data.pane.$flatItems;
	                var isLastChild = function (item) {
	                    if (item.$isLastChild === undefined) {
	                        var _parent = item.parent;
	                        var children = _.filter(flats, { parent: _parent });
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
	                        background: i === this.data.level - 1 ? isLast ? "last-connection-point" : "connection-point" : isLast ? "" : "vertical-line"
	                    };
	                    indentation.push(unit);
	                    relevantItem = relevantItem.parent;
	                }
	                this.data.data.$indentation = indentation.reverse();
	            }
	        }
	    });

	    return jfTreeItemController;
	})();

	function jfTreeItem() {
	    return {
	        controller: jfTreeItemController,
	        controllerAs: "jfTreeItem",
	        bindToController: true,
	        replace: true,
	        scope: {
	            data: "=",
	            itemId: "=",
	            tree: "="
	        },
	        templateUrl: "ui_components/jf_tree/jf_tree_item.html"
	    };
	}

/***/ },
/* 124 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTreeCompiledCell = jfTreeCompiledCell;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTreeCompiledCellController = (function () {
	    /* @ngInject */

	    jfTreeCompiledCellController.$inject = ["$element", "$timeout", "$scope"];
	    function jfTreeCompiledCellController($element, $timeout, $scope) {
	        var _this = this;

	        _classCallCheck(this, jfTreeCompiledCellController);

	        this.$element = $element;
	        this.$timeout = $timeout;

	        $scope.$watch("compiledCell.treeItem.data", function () {
	            _this.compile();
	        });
	    }

	    _createClass(jfTreeCompiledCellController, {
	        compile: {
	            value: function compile() {
	                var elem = $(this.$element).find(".compile-this");
	                this.treeItem.tree.compileTemplate(elem, this.itemId);
	            }
	        }
	    });

	    return jfTreeCompiledCellController;
	})();

	function jfTreeCompiledCell() {
	    return {
	        controller: jfTreeCompiledCellController,
	        controllerAs: "compiledCell",
	        bindToController: true,
	        scope: {
	            itemId: "=",
	            treeItem: "=" },
	        template: "<div class=\"compile-this\"></div>"
	    };
	}

/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	exports.jfTreeIndentation = jfTreeIndentation;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var jfTreeIndentationController = function jfTreeIndentationController($scope, $sce) {
	    var _this = this;

	    _classCallCheck(this, jfTreeIndentationController);

	    $scope.$watch("jfTreeIndentation.indentation", function () {
	        // Build the inner html for the units here in js, it is much faster than using ng-repeat
	        var indentationHtml = "";
	        var htmlForIndentation = function (indentation) {
	            if (_this.linesBackgrounds[indentation.background]) {
	                return "<div class=\"indentation-unit\" style=\"height: " + _this.height + "; background-image: url('" + _this.linesBackgrounds[indentation.background] + "')\"></div>";
	            } else {
	                return "<div class=\"indentation-unit\" style=\"height: " + _this.height + ";\"></div>";
	            }
	        };
	        _this.indentation.forEach(function (indentation) {
	            indentationHtml += htmlForIndentation(indentation);
	        });
	        _this.indentationHtml = $sce.trustAsHtml(indentationHtml);
	    });
	};

	function jfTreeIndentation() {
	    return {
	        controller: jfTreeIndentationController,
	        controllerAs: "jfTreeIndentation",
	        bindToController: true,
	        scope: {
	            indentation: "=",
	            height: "=",
	            visible: "=",
	            linesBackgrounds: "="
	        },
	        templateUrl: "ui_components/jf_tree/jf_tree_indentation.html"
	    };
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JfSummaryRow = _interopRequire(__webpack_require__(127));

	var JfSummaryRowItem = _interopRequire(__webpack_require__(128));

	module.exports = angular.module("summary.row", []).component("jfSummaryRow", new JfSummaryRow()).component("jfSummaryRowItem", new JfSummaryRowItem());

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var JfSummaryRow = function JfSummaryRow() {
		_classCallCheck(this, JfSummaryRow);

		this.templateUrl = "ui_components/jf_summary_row/summary.row.template.html";
		this.controller = JfSummaryRowController;
		this.bindings = {
			columns: "<",
			parentScope: "<"
		};
	};

	module.exports = JfSummaryRow;

	var JfSummaryRowController = (function () {
		function JfSummaryRowController() {
			_classCallCheck(this, JfSummaryRowController);
		}

		_createClass(JfSummaryRowController, {
			$onInit: {
				value: function $onInit() {
					this.filterOutUnactiveColumns();
					this.setColumnsLayout();
				}
			},
			filterOutUnactiveColumns: {
				value: function filterOutUnactiveColumns() {
					this.columnsToShow = _.filter(this.columns, function (col) {
						return col.isActive;
					});
				}
			},
			setColumnsLayout: {
				value: function setColumnsLayout() {
					var layout = "";
					_.forEach(this.columnsToShow, function (col) {
						if (!col.width) {
							col.width = "1fr";
						}
						layout += "" + col.width + " ";
					});
					this.inlineStyle = {
						gridTemplateColumns: layout,
						"-ms-grid-columns": layout
					};
				}
			}
		});

		return JfSummaryRowController;
	})();

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var JfSummaryRowItem = function JfSummaryRowItem() {
		_classCallCheck(this, JfSummaryRowItem);

		this.template = "<div></div>";
		this.controller = JfSummaryRowItemController;
		this.bindings = {
			colTemplate: "<",
			colScope: "<",
			noWrap: "<" };
	};

	module.exports = JfSummaryRowItem;

	var JfSummaryRowItemController = (function () {
		function JfSummaryRowItemController($element, $compile) {
			_classCallCheck(this, JfSummaryRowItemController);

			this.$element = $element;
			this.$compile = $compile;
		}

		_createClass(JfSummaryRowItemController, {
			$onInit: {
				value: function $onInit() {
					var placeholder = this.$element.find("div");
					var col = $(this.noWrap ? "" + this.colTemplate : "<span>" + this.colTemplate + "</span>");
					var e = this.$compile(col)(this.colScope);
					placeholder.after(e);
					placeholder.remove();
				}
			}
		});

		return JfSummaryRowItemController;
	})();

/***/ }
/******/ ]);