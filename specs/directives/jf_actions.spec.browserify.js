'use strict';
fdescribe('unit test: jf_actions', function () {

	var $scope;

	function flushAndApply() {
		try {
			$timeout.flush();
		}
		catch (e) {
		}

		$scope.$apply();
	}

	function compileDirective(attr) {
		$scope = window.compileDirective('jf-actions', attr);
	}

	beforeEach(m('jfrog.ui.essentials'));

	beforeEach(() => {

		var ACTIONS = {
			'act1': {title: 'Action #1', icon: 'icon-view'},
			'act2': {title: 'Action #2', icon: 'icon-download',disabled: true},
			'act3': {title: 'Action #3', icon: 'icon-go'},
			'act4': {title: 'Action #4', icon: 'icon-clear'}
		};


		var initActions = function (actionsController) {
			actionsController.setActionsDictionary(ACTIONS);
			actionsController.setActions([
				{
					name:'act1',
					visibleWhen: function() {return true},
					action: function() {
						$('body').append($('body').append('<div id="xxx"></div>'));
					}
				},
				{
					name:'act2',
					visibleWhen: function() {return true},
					action: function() {$log.log('Executing Action 2')}
				},
				{
					name:'act3',
					visibleWhen: function() {return true},
					action: function() {$log.log('Executing Action 3')}
				},
				{
					name:'act4',
					visibleWhen: function() {return true},
					action: function() {$log.log('Executing Action 4')}
				}
			])

		};

		compileDirective({
			fixedActionsNames: ['act2'],
			parentController: {
				initMethod: initActions,
			},
			'@initMethod': 'initMethod'
		});
	});

	it('should render directive and display actions', () => {

		flushAndApply();

		expect($('jf-actions').length).toEqual(1);

		$('.dropdown').trigger("mouseenter");

		expect($('span.action-name')[0].outerHTML).toContain("Action #1");
		expect($('span.action-name')[1].outerHTML).toContain("Action #3");
		expect($('span.action-name')[2].outerHTML).toContain("Action #4");
	});

	it('should trigger an action', () => {

			flushAndApply();

			$('.dropdown').trigger("mouseenter");
			$('li.action-item:first').find('a').click();

			expect($('#xxx').length).toEqual(1);
	});
});