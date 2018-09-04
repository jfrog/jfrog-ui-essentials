/**
 * Created by tomere on 29/06/2017.
 */
class jfReparentController {
    /* @ngInject */
    constructor($element, $timeout) {

        this.$element = $element;
        this.$timeout = $timeout;

    }

    $onInit() {

        this.$timeout(() => {
            let target = this.target ? $(this.target) : $(document.body);
            let offset = this.getOffset(this.$element[0]);
            let targetOffset = this.getOffset(target[0]);
            this.$timeout(() => {
                target.append(this.$element);
                this.$element.css('position', 'absolute');
                this.$element.css('left', (offset.left - targetOffset.left) + 'px');
                this.$element.css('top', (offset.top - targetOffset.top) + 'px');
                let width = this.$element.width();
                let height = this.$element.height();
                this.$element.css('width', width + 'px');
                this.$element.css('height', height + 'px');
            })
        })
    }

    getOffset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

}

export function jfReparent() {

    return {
        restrict: 'A',
        scope: {
            target: '=jfReparent'
        },
        bindToController: true,
        controller: jfReparentController
    };
}
