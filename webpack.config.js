var webpack = require('webpack');
var CONFIG = require('./jfrog-ui-essentials.config');

module.exports = {

    context: __dirname + '/src',
    entry: {
        'jfrog-ui-essentials': ['./main.js', './directives/jfrog.directives.module.js', './services/jfrog.services.module.js', './filters/jfrog.filters.module.js', './ui_components/ui_components.module.js']
    },
    output: {
        path: CONFIG.DESTINATIONS.TARGET,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel'},
            { test: /\.json$/, loader: 'json' }
        ]
    }
};