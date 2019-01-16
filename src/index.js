import 'codemirror/lib/codemirror.css'
// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
// theme css
import 'codemirror/theme/monokai.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
// foldGutter
import'codemirror/addon/fold/foldgutter.css'
import'codemirror/addon/fold/brace-fold.js'
import'codemirror/addon/fold/comment-fold.js'
import'codemirror/addon/fold/foldcode.js'
import'codemirror/addon/fold/foldgutter.js'
import'codemirror/addon/fold/indent-fold.js'
import'codemirror/addon/fold/markdown-fold.js'
import'codemirror/addon/fold/xml-fold.js'

import {servicesRegistration} from './servicesRegistration';
import './importDirectives';
import './importFilters';
import './registerGlobalComponents';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import './assets/stylesheets/main.less';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import '../node_modules/jf-tooltipster/css/tooltipster.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import $ from 'jquery';
import JFrogUI from './plugins/JFrogUI';
import 'jquery-contextmenu';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';

window.$ = $;
window.jQuery = $;

require('../node_modules/jf-tooltipster/js/jquery.tooltipster');

window.CodeMirror = require('codemirror');

const VueCodemirror = require('vue-codemirror');

export default {
    install(Vue, options) {
        Vue.use(VueCodemirror);
        servicesRegistration.registerAll();
        Vue.use(BootstrapVue);
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
        Vue.use(VueCodemirror);
        Vue.use(Toasted);
    }
}

export {JFrogUI}
