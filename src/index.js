import {servicesRegistration} from './servicesRegistration';
import './importDirectives';
import './importFilters';
import './registerGlobalComponents';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import $ from 'jquery';
import JFrogUI from './plugins/JFrogUI';
window.$ = $;
window.jQuery = $;
import 'jquery-contextmenu';
import VueClipboard from 'vue-clipboard2'

import('./assets/stylesheets/main.less');
import('../node_modules/jf-tooltipster/css/tooltipster.css');
require('../node_modules/jf-tooltipster/js/jquery.tooltipster');

export default {
    install(Vue, options) {
        servicesRegistration.registerAll();
        Vue.use(BootstrapVue);
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
    }
}

export {JFrogUI}
