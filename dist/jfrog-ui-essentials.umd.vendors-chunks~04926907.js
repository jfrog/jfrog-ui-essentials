((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[7],{

/***/ "852e":
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__("5804");
var DomHandler = __webpack_require__("36cc");

function defineProp(name, value) {
    delete module.exports[name];
    module.exports[name] = value;
    return value;
}

module.exports = {
    Parser: Parser,
    Tokenizer: __webpack_require__("6fbd"),
    ElementType: __webpack_require__("4d1e"),
    DomHandler: DomHandler,
    get FeedHandler() {
        return defineProp("FeedHandler", __webpack_require__("5307"));
    },
    get Stream() {
        return defineProp("Stream", __webpack_require__("d1e8"));
    },
    get WritableStream() {
        return defineProp("WritableStream", __webpack_require__("8769"));
    },
    get ProxyHandler() {
        return defineProp("ProxyHandler", __webpack_require__("bd7d"));
    },
    get DomUtils() {
        return defineProp("DomUtils", __webpack_require__("0f94"));
    },
    get CollectingHandler() {
        return defineProp(
            "CollectingHandler",
            __webpack_require__("d1f1")
        );
    },
    // For legacy support
    DefaultHandler: DomHandler,
    get RssHandler() {
        return defineProp("RssHandler", this.FeedHandler);
    },
    //helper methods
    parseDOM: function(data, options) {
        var handler = new DomHandler(options);
        new Parser(handler, options).end(data);
        return handler.dom;
    },
    parseFeed: function(feed, options) {
        var handler = new module.exports.FeedHandler(options);
        new Parser(handler, options).end(feed);
        return handler.dom;
    },
    createDomStream: function(cb, options, elementCb) {
        var handler = new DomHandler(cb, options, elementCb);
        return new Parser(handler, options);
    },
    // List of all events that the parser emits
    EVENTS: {
        /* Format: eventname: number of arguments */
        attribute: 2,
        cdatastart: 0,
        cdataend: 0,
        text: 1,
        processinginstruction: 2,
        comment: 1,
        commentend: 0,
        closetag: 1,
        opentag: 2,
        opentagname: 1,
        error: 1,
        end: 0
    }
};


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~04926907.js.map