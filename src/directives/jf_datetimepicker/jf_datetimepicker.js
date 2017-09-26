/**
 * Created by tomere on 17/09/2017.
 */

class jfDatetimepickerController {
	/* @ngInject */
	constructor() {}
	$onInit(){
		this.dpOpitons = {
			allowInputToggle : true,
			toolbarPlacement : 'top',
		};
		if(this.options){
			this.dpOpitons = _.assign({}, this.options , this.dpOpitons);
		}
	}
	onBlur(){
		this.isDatepickerOpen = false;
	}
	onFocus(){
		this.isDatepickerOpen = true;
	}
}
// More information regarding options could be found at: http://eonasdan.github.io/bootstrap-datetimepicker/Options/
export function jfDatetimepicker() {
	return {
		restrict   : 'E',
		scope      : {
			isDatepickerOpen: '=?',
			isRequired      : '<',
			model           : '=',
			options         : '<?'
		},
		controller : jfDatetimepickerController,
		controllerAs: 'jfDatetimepicker',
		bindToController: true,
		templateUrl: 'directives/jf_datetimepicker/jf_datetimepicker.html'
	}
}
