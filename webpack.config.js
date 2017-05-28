const webpack = require('webpack');
const CONFIG = require('./jfrog-ui-essentials.config');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {

	context: __dirname + '/src',
	entry  : {
		'jfrog-ui-essentials': ['./main.js',
		                        './directives/jfrog.directives.module.js',
		                        './services/jfrog.services.module.js',
		                        './filters/jfrog.filters.module.js',
		                        './ui_components/ui_components.module.js']
	},
	output : {
		path    : CONFIG.DESTINATIONS.TARGET,
		filename: '[name].js'
	},
	plugins: [
		new ngAnnotatePlugin({
			remove: true,
			add   : true
		})
	],
	module : {
		loaders: [
			{test: /\.js$/, loader: 'babel'},
			{test: /\.json$/, loader: 'json'}
		]
	}
};