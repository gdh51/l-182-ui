const { merge } = require('webpack-merge'),
    Common = require('./webpack.common'),
    { resolve } = require('path'),
    TerserPlugin = require('terser-webpack-plugin')

// 全部打包入口
module.exports = merge(Common, {
    output: {
        path: resolve('../lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        library: 'Lazybones',
        umdNamedDefine: true,
        globalObject: 'globalThis'
    },
    stats: 'none',
    optimization: {
        minimizer: [
            new TerserPlugin({ terserOptions: { output: { comments: false } } })
        ]
    }
})
