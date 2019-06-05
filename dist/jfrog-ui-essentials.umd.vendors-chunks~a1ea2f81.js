((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[264],{

/***/ "8769":
/***/ (function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__("5804");
var WritableStream = __webpack_require__(0).Writable;
var StringDecoder = __webpack_require__("7d72").StringDecoder;
var Buffer = __webpack_require__("b639").Buffer;

function Stream(cbs, options) {
    var parser = (this._parser = new Parser(cbs, options));
    var decoder = (this._decoder = new StringDecoder());

    WritableStream.call(this, { decodeStrings: false });

    this.once("finish", function() {
        parser.end(decoder.end());
    });
}

__webpack_require__("3fb5")(Stream, WritableStream);

Stream.prototype._write = function(chunk, encoding, cb) {
    if (chunk instanceof Buffer) chunk = this._decoder.write(chunk);
    this._parser.write(chunk);
    cb();
};


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~a1ea2f81.js.map