const IS_DEV = process.argv.includes('dev');

const config = {
    runtimeCompiler: true,
    configureWebpack: {
        module: {
            rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }]
        }
    }
};

if (IS_DEV) {
    config.chainWebpack = config => {
        config.devtool(false);
        config.plugins.delete('hash-module-ids');
        config.plugins.delete('optimize-css');
        config.optimization.minimize(false);
        config.optimization.splitChunks(false);
    }
}


module.exports = config;
