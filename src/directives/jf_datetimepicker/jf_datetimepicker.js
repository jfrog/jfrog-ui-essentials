/**
 * Created by tomere on 17/09/2017.
 */

class jfDatetimepickerController {
	/* @ngInject */
	constructor($timeout) {
		this.$timeout = $timeout;
	}
	$onInit(){
		this.dpOpitons = {
			allowInputToggle : true,
			toolbarPlacement : 'top',
		};
		this.setDatepickerOptions();
	}
	setDatepickerOptions(){
		if(this.options){
			this.dpOpitons = _.assign({}, this.options , this.dpOpitons);
		}
	}
	onUpdate() {
		this.$timeout(()=>{
			if(this.onChange && typeof this.onChange === 'function'){
				this.onChange();
			}
			this.setDatepickerOptions();
		},100);
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
			options         : '<?',
			attrId          : '=',
			onChange        : '&?',
			isEnabled       : '='
		},
		controller : jfDatetimepickerController,
		controllerAs: 'jfDatetimepicker',
		bindToController: true,
		templateUrl: 'directives/jf_datetimepicker/jf_datetimepicker.html'
	}
}
