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
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import $ from 'jquery';
import JFrogUI from './plugins/JFrogUI';
import 'jquery-contextmenu';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';

window.$ = $;
window.jQuery = $;

require('../node_modules/jf-tooltipster/js/jquery.tooltipster');

export default {
    install(Vue, options) {
        servicesRegistration.registerAll();
        Vue.use(BootstrapVue);
        Vue.use(VueVirtualScroller);
        Vue.use(VueClipboard);
        Vue.use(VueCodemirror);
        Vue.use(Toasted);
    }
};

export {JFrogUI};
