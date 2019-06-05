((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[176],{

/***/ "a2df":
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():undefined}(this,function(){var e="undefined"!=typeof window&&("ontouchstart"in window||navigator.msMaxTouchPoints>0)?["touchstart","click"]:["click"],n=[];function t(n){var t="function"==typeof n;if(!t&&"object"!=typeof n)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:t?n:n.handler,middleware:n.middleware||function(e){return e},events:n.events||e}}function r(e){var n=e.el,t=e.event,r=e.handler,i=e.middleware;t.target!==n&&!n.contains(t.target)&&i(t,n)&&r(t,n)}var i={bind:function(e,i){var d=t(i.value),o=d.handler,a=d.middleware,u={el:e,eventHandlers:d.events.map(function(n){return{event:n,handler:function(n){return r({event:n,el:e,handler:o,middleware:a})}}})};u.eventHandlers.forEach(function(e){return document.addEventListener(e.event,e.handler)}),n.push(u)},update:function(e,i){var d=t(i.value),o=d.handler,a=d.middleware,u=d.events,c=n.find(function(n){return n.el===e});c.eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}),c.eventHandlers=u.map(function(n){return{event:n,handler:function(n){return r({event:n,el:e,handler:o,middleware:a})}}}),c.eventHandlers.forEach(function(e){return document.addEventListener(e.event,e.handler)})},unbind:function(e){n.find(function(n){return n.el===e}).eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)})},instances:n};return{install:function(e){e.directive("click-outside",i)},directive:i}});
//# sourceMappingURL=v-click-outside.min.min.umd.js.map


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~6f413f27.js.map