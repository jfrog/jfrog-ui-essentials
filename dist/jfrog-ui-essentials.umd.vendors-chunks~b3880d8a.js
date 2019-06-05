((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[294],{

/***/ "d1e8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__("8769");

function Stream(options) {
    Parser.call(this, new Cbs(this), options);
}

__webpack_require__("3fb5")(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope) {
    this.scope = scope;
}

var EVENTS = __webpack_require__("852e").EVENTS;

Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        Cbs.prototype["on" + name] = function() {
            this.scope.emit(name);
        };
    } else if (EVENTS[name] === 1) {
        Cbs.prototype["on" + name] = function(a) {
            this.scope.emit(name, a);
        };
    } else if (EVENTS[name] === 2) {
        Cbs.prototype["on" + name] = function(a, b) {
            this.scope.emit(name, a, b);
        };
    } else {
        throw Error("wrong number of arguments!");
    }
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~b3880d8a.js.map