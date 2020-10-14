const { merge } = require('webpack-merge'),
    Common = require('./webpack.common'),
    { join } = require('path')

module.exports = merge(Common, {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: '../dev',
        hot: true
    },

    entry: { app: './index.js' },

    output: {
        filename: '[name].bundle.js',
        path: join(__dirname, 'dev')
    }
})
