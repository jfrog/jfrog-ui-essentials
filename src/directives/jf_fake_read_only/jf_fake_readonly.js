class jfFakeReadonlyController {
	/* @ngInject */
    constructor($element) {
        $($element).attr('readonly', true);

        let removeAttr = () => {
            $($element).attr('readonly', false);
            $($element).off('focus', removeAttr);
        }

        $($element).on('focus', removeAttr);
    }

}

export function jfFakeReadonly() {

    return {
        restrict: 'A',
        controller: jfFakeReadonlyController
    };
}
