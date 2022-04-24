import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/search.js';

import { servicesRegistration } from './servicesRegistration';
import { installDirectives } from './importDirectives';
import { installFilters } from './importFilters';
import { registerGlobalComponents } from './registerGlobalComponents';

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import './assets/stylesheets/main.less';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import '../node_modules/jf-tooltipster/css/tooltipster.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import $ from 'jquery';
import 'jquery-contextmenu';
import 'components-jqueryui';
import moment from 'moment';
import JFrogUI from './plugins/JFrogUI';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import vClickOutside from 'v-click-outside';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import { VueFactory } from "./services/VueFactory";

window.$ = $;
window.moment = moment;
window.jQuery = $;
// const importBootstrapVue = () => import('bootstrap-vue');
// const importJquery = () => import(/* webpackChunkName: "jquery" */'jquery');
// const importJqueryCtxMenu = () => import(/* webpackChunkName: "jquery" */'jquery-contextmenu');
// const importJqueryUi = () => import(/* webpackChunkName: "jquery" */'components-jqueryui');
// const importMoment = () => import(/* webpackChunkName: "jquery" */'moment');

require('./misc/jquery.highlight');

require('../node_modules/jf-tooltipster/js/jquery.tooltipster');
require('billboard.js/dist/billboard.min.css');

window.CodeMirror = require('codemirror');

const VueCodemirror = require('vue-codemirror');


export default {
    install(Vue, options) {
        VueFactory.getInstance().register(Vue)

        installDirectives();
        installFilters();
        registerGlobalComponents();
        // const BootstrapVue = await importBootstrapVue();
        // const $ = await importJquery();
        // await importJqueryCtxMenu();
        // await importJqueryUi();
        // const moment = await importMoment();
        // window.$ = $;
        // window.moment = moment;
        // window.jQuery = $;

        if (options && options.config) {
            window.$$$$jfuieConfig = options.config;
        }

        servicesRegistration.registerAll();
        Vue.use(BootstrapVue);
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
        Vue.use(Toasted);
        Vue.use(VueCodemirror);
        Vue.use(vClickOutside);
    }
};

// Fix for toasted library. It is injecting its css to the end of the head tag, which makes it difficult to override.
// This will move the library styling to the beginning of the head tag
(function () {
    let xpath = '//style[contains(text(),\'.toasted.rounded\')]';
    let toastedLibraryStyleElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    let head = document.getElementsByTagName('head')[0];
    head.removeChild(toastedLibraryStyleElement);
    head.prepend(toastedLibraryStyleElement);
})();

export {JFrogUI};
