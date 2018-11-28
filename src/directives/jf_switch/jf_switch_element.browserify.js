/**
 * Created by idannaim on 8/12/15.
 */
export class JfSwitchElement {

    getItem(index) {
        return $($('.jf-switch-options li')[index]).find('a');
    }

    isActive(index) {
        return this.getItem(index).hasClass('active');
    }
}