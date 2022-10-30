import './set-public-path';

import { servicesRegistration } from './servicesRegistration';
import { installDirectives } from './importDirectives';
import { installFilters } from './importFilters';
import { registerGlobalComponents } from './registerGlobalComponents';

import 'bootstrap/dist/css/bootstrap.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import './assets/stylesheets/main.less';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import $ from 'jquery';
import 'jquery-contextmenu';
import JFrogUI from './plugins/JFrogUI';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import vClickOutside from 'v-click-outside';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import { VueFactory } from "./services/VueFactory";

window.$ = $;
window.jQuery = $;

require('./misc/jquery.highlight');

export default {
    install(Vue, options) {
        VueFactory.getInstance().register(Vue)

        installDirectives();
        installFilters();
        registerGlobalComponents();

        if (options && options.config) {
            window.$$$$jfuieConfig = options.config;
        }

        servicesRegistration.registerAll();
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
        Vue.use(Toasted);
        fixToasted();
        Vue.use(vClickOutside);
    }
};

const fixToasted = function () {
    // Fix for toasted library. It is injecting its css to the end of the head tag, which makes it difficult to override.
    // This will move the library styling to the beginning of the head tag
    let xpath = '//style[contains(text(),\'.toasted.rounded\')]';
    let toastedLibraryStyleElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    let head = document.getElementsByTagName('head')[0];
    head.removeChild(toastedLibraryStyleElement);
    head.prepend(toastedLibraryStyleElement);
};

export {JFrogUI};
