/**
 * Created by tomere on 17/09/2017.
 */

class jfDatetimepickerController {
	/* @ngInject */
	constructor() {}
	$onInit(){
		this.dpOpitons = {allowInputToggle : true};
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

export function jfDatetimepicker() {
	return {
		restrict   : 'E',
		scope      : {
			isDatepickerOpen: '=?',
			model           : '=',
			options         : '<?' // Options are detailed in: http://eonasdan.github.io/bootstrap-datetimepicker/Options/
		},
		controller : jfDatetimepickerController,
		controllerAs: 'jfDatetimepicker',
		bindToController: true,
		templateUrl: 'directives/jf_datetimepicker/jf_datetimepicker.html'
	}
}
