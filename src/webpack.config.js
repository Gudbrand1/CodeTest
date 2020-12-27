const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "app": './index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.worker\.js$/,
            use: ['worker-loader']
        }]
    },
    plugins: [
        // Ignore require() calls in vs/language/typescript/lib/typescriptServices.js
        new webpack.IgnorePlugin(
            /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
            /vs\/language\/typescript\/lib/
        )
    ]
}