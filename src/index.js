import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/addon/mode/overlay.js'
import 'codemirror/addon/edit/matchbrackets.js'

import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/search.js'
//import 'codemirror/theme/monokai.css'
//import 'codemirror/addon/selection/active-line.js'
//import 'codemirror/addon/hint/show-hint.js'
//import 'codemirror/addon/hint/show-hint.css'
//import 'codemirror/addon/hint/javascript-hint.js'
//import 'codemirror/addon/scroll/annotatescrollbar.js'
//import 'codemirror/addon/search/matchesonscrollbar.js'
//import 'codemirror/addon/search/match-highlighter.js'
//import 'codemirror/mode/clike/clike.js'
//import 'codemirror/addon/comment/comment.js'
//import 'codemirror/keymap/sublime.js'
//import'codemirror/addon/fold/foldgutter.css'
//import'codemirror/addon/fold/brace-fold.js'
//import'codemirror/addon/fold/comment-fold.js'
//import'codemirror/addon/fold/foldcode.js'
//import'codemirror/addon/fold/foldgutter.js'
//import'codemirror/addon/fold/indent-fold.js'
//import'codemirror/addon/fold/markdown-fold.js'
//import'codemirror/addon/fold/xml-fold.js'

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
import moment from 'moment';
import JFrogUI from './plugins/JFrogUI';
import 'jquery-contextmenu';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import vClickOutside from 'v-click-outside';
// date-time picker TODO use a different date time picker
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';


window.$ = $;
window.moment = moment;
window.jQuery = $;

require('../node_modules/jf-tooltipster/js/jquery.tooltipster');
require('billboard.js/dist/billboard.min.css');

window.CodeMirror = require('codemirror');

const VueCodemirror = require('vue-codemirror');
const VueMoment = require('vue-moment');

export default {
    install(Vue, options) {
        servicesRegistration.registerAll();
        Vue.use(BootstrapVue);
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
        Vue.use(Toasted);
        Vue.use(VueCodemirror);
        Vue.use(vClickOutside);
        Vue.use(VueMoment);
    }
}

// date-time picker TODO use a different date time picker
$.extend(true, $.fn.datetimepicker.defaults, {
    icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'far fa-trash-alt',
        close: 'far fa-times-circle'
    }
});

export {JFrogUI}
