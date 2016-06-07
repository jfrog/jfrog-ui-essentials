import KEYS from '../../constants/keys.constants';

class jfEnterPressController {
	constructor($element, $scope) {
		this.$scope = $scope;
		$element.on('keypress', (e) => this._onKeyPress(e));
		this.$scope.$on('$destroy', () => $element.off('keypress'))
	}
	_onKeyPress(e) {
        if (e.keyCode != KEYS.ENTER) return ;
        e.preventDefault();
        this.callback();
        if (!this.$scope.$$phase) this.$scope.$apply();
	}
}

export function jfEnterPress() {
	return {
		scope: {
			callback: '&jfEnterPress'
		},
		controllerAs: 'jfEnterPress',
		bindToController: true,
		controller: jfEnterPressController
	}
}
