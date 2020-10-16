const { mergeWithCustomize, customizeArray } = require('webpack-merge'),
    Common = require('./webpack.common'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { resolve } = require('path')

module.exports = mergeWithCustomize({ customizeArray: customizeArray({ '*': 'append' }) })(Common, {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        http2: true,
        contentBase: resolve(__dirname, '../dist'),
        hot: true
    },

    entry: { app: resolve(__dirname, '../src/index.js') },

    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '组件开发服务器',
            template: resolve(__dirname, '../dev/index.html')
        })
    ]
})
