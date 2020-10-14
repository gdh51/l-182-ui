const { merge } = require('webpack-merge'),
    Common = require('./webpack.common'),
    Components = require('./shared-config'),
    { resolve } = require('path')

module.exports = merge(Common, {
    entry: Components,
    output: {
        path: resolve('../lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    stats: 'none'
})
