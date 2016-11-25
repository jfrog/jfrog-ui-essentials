var webpack = require('webpack');
var CONFIG = require('./jfrog-ui-essentials.config');

module.exports = {

    context: __dirname + '/src',
    entry: {
        'jfrog-ui-essentials': ['./main.js', './directives/jfrog.directives.module.js', './services/jfrog.services.module.js', './filters/jfrog.filters.module.js', './ui_components/ui_components.module.js'
            , /*'./ng2/main.ts'*/]
    },
    output: {
        path: CONFIG.DESTINATIONS.TARGET,
        filename: '[name].js'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts", ""]
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel'},
//            {test: /\.ts$/, loader: 'babel!ts-loader'},
            {test: /src\/ng2\/.*\.html$/, loader: 'html-loader'},
            { test: /\.json$/, loader: 'json' }
        ]
    }
};