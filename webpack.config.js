const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',

    entry: {
        app: './index.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        hot: true
    },

    resolve: {
        extensions: ['.js', '.vue', '.json']
    },

    module: {
        rules: [

            // 处理.vue单组件文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            // 处理stylus预处理器
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },

            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'several demos',
            hash: true,
            template: './src/index.html'
        }),

        new CleanWebpackPlugin(),

        new VueLoaderPlugin()
    ]
}