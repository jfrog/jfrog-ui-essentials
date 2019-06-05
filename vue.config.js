const IS_DEV = process.argv.includes('dev');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        },
        plugins: [
            new BundleAnalyzerPlugin({analyzerPort: 8024}),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors-chunks',
                        chunks: 'all',
                        minSize: 0,
                        maxSize: 10000,
                        minChunks: 1,
                    },
                }
            }
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
