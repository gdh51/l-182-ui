const { merge } = require('webpack-merge'),
    Common = require('./webpack.common'),
    Components = require('./components-manifest.json'),
    { resolve } = require('path')

// 统一入口路径
Reflect.ownKeys(Components).forEach(key => Components[key] = resolve(__dirname, Components[key]))

console.log(Components)

module.exports = merge(Common, {
    entry: Components,
    output: {
        path: resolve(__dirname, '../lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    stats: 'none'
})
