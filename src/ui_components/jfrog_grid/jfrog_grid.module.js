import {JFrogGridFactory} from './jfrog_grid';

export default angular.module('jfrog_grid', [
		'ui.grid',
		'ui.grid.autoResize',
	    'ui.grid.edit',
	    'ui.grid.selection',
	    'ui.grid.pagination',
	    'ui.grid.grouping',
		'ui.grid.resizeColumns'
	])
    .service('JFrogGridFactory', JFrogGridFactory);
