import { VueFactory } from "./services/VueFactory";
import { lazyDirective } from './services/factories/LazyDirectiveLoader';

const JfDynamicTemplateDirective = lazyDirective(() => import(/* webpackChunkName: "JfDynamicTemplateDirective" */'./directives/JfDynamicTemplateDirective.js'));
const JfIncludeReplaceDirective = lazyDirective(() => import(/* webpackChunkName: "JfIncludeReplaceDirective" */'./directives/JfIncludeReplaceDirective.js'));
const JfTooltipDirective = lazyDirective(() => import(/* webpackChunkName: "JfTooltipDirective" */'./directives/JfTooltipDirective.js'));
const JfClearErrorsDirective = lazyDirective(() => import(/* webpackChunkName: "JfClearErrorsDirective" */'./directives/JfClearErrorsDirective.js'));
const JfFakeReadonlyDirective = lazyDirective(() => import(/* webpackChunkName: "JfFakeReadonlyDirective" */'./directives/JfFakeReadonlyDirective.js'));
const JfTooltipOnOverflowDirective = lazyDirective(() => import(/* webpackChunkName: "JfTooltipOnOverflowDirective" */'./directives/JfTooltipOnOverflowDirective.js'));
const JfRevealInputDirective = lazyDirective(() => import(/* webpackChunkName: "JfRevealInputDirective" */'./directives/JfRevealInputDirective.js'));
const JfResizeDirective = lazyDirective(() => import(/* webpackChunkName: "JfResizeDirective" */'./directives/JfResizeDirective.js'));

export const installDirectives = () => {
    const { Vue } = VueFactory.getInstance();
    Vue.directive('jf-dynamic-template', JfDynamicTemplateDirective)
    Vue.directive('jf-include-replace', JfIncludeReplaceDirective)
    Vue.directive('jf-tooltip', JfTooltipDirective);
    Vue.directive('jf-clear-errors', JfClearErrorsDirective);
    Vue.directive('jf-fake-readonly', JfFakeReadonlyDirective);
    Vue.directive('jf-tooltip-on-overflow', JfTooltipOnOverflowDirective);
    Vue.directive('jf-reveal-input', JfRevealInputDirective);
    Vue.directive('jf-resize', JfResizeDirective);
};
