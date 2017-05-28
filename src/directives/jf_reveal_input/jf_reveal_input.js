class jfRevealInputController {
	/* @ngInject */
	constructor($element) {
		this.$elementIcon = $element.find('i');
		this.tooltipText = 'Show ' + this.objectName;
	}
	
	updateInput() {
		let input = $(`#${this.inputId}`);
		let type = input.attr('type');
		if (type === 'text') {
			input.attr('type', 'password');
			this.$elementIcon.removeClass('icon-unview').addClass('icon-view');
			this.tooltipText = this.tooltipText.replace('Hide', 'Show');
		}
		else {
			input.attr('type', 'text');
			this.$elementIcon.removeClass('icon-view').addClass('icon-unview');
			this.tooltipText = this.tooltipText.replace('Show', 'Hide');
		}

	}

	hasData() {
		let input = $(`#${this.inputId}`);
		return !!input.val();
	}
}

export function jfRevealInput() {
    return {
    	restrict: 'A',
		template: `<i class="icon icon-view jf-reveal-input"
					  jf-tooltip="{{jfRevealInput.tooltipText}}"
					  ng-if="jfRevealInput.hasData()"
		   			  ng-click="jfRevealInput.updateInput()"></i>`,
		controller: jfRevealInputController,
		controllerAs: 'jfRevealInput',
		bindToController: true,
		scope: {
			inputId: '@jfRevealInput',
			objectName: '@'
		}
    }
}