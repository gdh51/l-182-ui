const { resolve } = require('path'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'production',
    entry: { app: [ '../src/index.js' ] }
}
