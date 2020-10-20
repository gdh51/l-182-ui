const {
        mergeWithCustomize, customizeArray, customizeObject
    } = require('webpack-merge'),
    Common = require('./webpack.common'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { resolve } = require('path'),
    finalConfig = mergeWithCustomize({
        customizeArray: customizeArray({ '*': 'append' }),
        customizeObject: customizeObject({ output: 'replace' })
    })(Common, {
        mode: 'development',
        devtool: 'inline-source-map',

        devServer: {
            contentBase: resolve(__dirname, '../dist'),
            hot: true,
            stats: 'errors-only'
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

delete finalConfig.externals

module.exports = finalConfig
