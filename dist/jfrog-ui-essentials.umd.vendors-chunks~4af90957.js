((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[120],{

/***/ "ec79":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f353":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown v-select",class:_vm.dropdownClasses,attrs:{"dir":_vm.dir}},[_c('div',{ref:"toggle",staticClass:"dropdown-toggle",on:{"mousedown":function($event){$event.preventDefault();return _vm.toggleDropdown($event)}}},[_c('div',{ref:"selectedOptions",staticClass:"vs__selected-options"},[_vm._l((_vm.valueAsArray),function(option){
var _obj, _obj$1;
return _vm._t("selected-option-container",[_c('span',{key:option.index,staticClass:"selected-tag"},[_vm._t("selected-option",[_vm._v("\n            "+_vm._s(_vm.getOptionLabel(option))+"\n          ")],null,(typeof option === 'object')?option:( _obj = {}, _obj[_vm.label] = option, _obj )),(_vm.multiple)?_c('button',{staticClass:"close",attrs:{"disabled":_vm.disabled,"type":"button","aria-label":"Remove option"},on:{"click":function($event){return _vm.deselect(option)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e()],2)],{"option":(typeof option === 'object')?option:( _obj$1 = {}, _obj$1[_vm.label] = option, _obj$1 ),"deselect":_vm.deselect,"multiple":_vm.multiple,"disabled":_vm.disabled})}),_c('input',{ref:"search",staticClass:"form-control",attrs:{"type":"search","autocomplete":_vm.autocomplete,"disabled":_vm.disabled,"placeholder":_vm.searchPlaceholder,"tabindex":_vm.tabindex,"readonly":!_vm.searchable,"id":_vm.inputId,"role":"combobox","aria-expanded":_vm.dropdownOpen,"aria-label":"Search for option"},domProps:{"value":_vm.search},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.maybeDeleteValue($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.typeAheadUp($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.typeAheadDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.typeAheadSelect($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onTab($event)}],"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.onEscape($event)},"blur":_vm.onSearchBlur,"focus":_vm.onSearchFocus,"input":function($event){_vm.search = $event.target.value}}})],2),_c('div',{staticClass:"vs__actions"},[_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showClearButton),expression:"showClearButton"}],staticClass:"clear",attrs:{"disabled":_vm.disabled,"type":"button","title":"Clear selection"},on:{"click":_vm.clearSelection}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),(!_vm.noDrop)?_c('i',{ref:"openIndicator",staticClass:"open-indicator",attrs:{"role":"presentation"}}):_vm._e(),_vm._t("spinner",[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.mutableLoading),expression:"mutableLoading"}],staticClass:"spinner"},[_vm._v("Loading...")])])],2)]),_c('transition',{attrs:{"name":_vm.transition}},[(_vm.dropdownOpen)?_c('ul',{ref:"dropdownMenu",staticClass:"dropdown-menu",style:({ 'max-height': _vm.maxHeight }),attrs:{"role":"listbox"},on:{"mousedown":_vm.onMousedown,"mouseup":_vm.onMouseup}},[_vm._l((_vm.filteredOptions),function(option,index){
var _obj;
return _c('li',{key:index,class:{ active: _vm.isOptionSelected(option), highlight: index === _vm.typeAheadPointer },attrs:{"role":"option"},on:{"mouseover":function($event){_vm.typeAheadPointer = index}}},[_c('a',{on:{"mousedown":function($event){$event.preventDefault();$event.stopPropagation();return _vm.select(option)}}},[_vm._t("option",[_vm._v("\n          "+_vm._s(_vm.getOptionLabel(option))+"\n        ")],null,(typeof option === 'object')?option:( _obj = {}, _obj[_vm.label] = option, _obj ))],2)])}),(!_vm.filteredOptions.length)?_c('li',{staticClass:"no-options",on:{"mousedown":function($event){$event.stopPropagation();}}},[_vm._t("no-options",[_vm._v("Sorry, no matching options.")])],2):_vm._e()],2):_vm._e()])],1)}
var staticRenderFns = []



/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~4af90957.js.map