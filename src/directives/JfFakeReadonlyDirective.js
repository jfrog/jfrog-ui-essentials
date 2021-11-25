import {VueFactory} from "../services/VueFactory";

export const install = () => {
    const { Vue } = VueFactory.getInstance();

    Vue.directive('jf-fake-readonly', {
        bind: function(el) {
            $(el).attr('readonly', true);

            let removeAttr = () => {
                $(el).attr('readonly', false);
                $(el).off('focus', removeAttr);
            }

            $(el).on('focus', removeAttr);
        }
    })

}
