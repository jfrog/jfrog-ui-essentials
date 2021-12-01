import { install as installJfDynamicTemplateDirective } from './directives/JfDynamicTemplateDirective.js';
import { install as installJfIncludeReplaceDirective } from'./directives/JfIncludeReplaceDirective.js';
import { install as installJfTooltipDirective } from'./directives/JfTooltipDirective.js';
import { install as installJfClearErrorsDirective } from'./directives/JfClearErrorsDirective.js';
import { install as installJfFakeReadonlyDirective } from'./directives/JfFakeReadonlyDirective.js';
import { install as installJfTooltipOnOverflowDirective } from'./directives/JfTooltipOnOverflowDirective.js';
import { install as installJfRevealInputDirective } from'./directives/JfRevealInputDirective.js';
import { install as installJfResizeDirective } from'./directives/JfResizeDirective.js';

export const installDirectives = () => {
    installJfDynamicTemplateDirective();
    installJfIncludeReplaceDirective();
    installJfTooltipDirective();
    installJfClearErrorsDirective();
    installJfFakeReadonlyDirective();
    installJfTooltipOnOverflowDirective();
    installJfRevealInputDirective();
    installJfResizeDirective();
}
