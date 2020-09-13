const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        hot: true,
        proxy: {
            '/upload': 'http://localhost:3000/upload'
        }
    },

    resolve: {
        extensions: [ '.js', '.vue', '.json' ],
        alias: {
            '@': path.join(__dirname, './src'),
            '@theme': path.join(__dirname, './packages/theme/src')
        }
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
                    'stylus-loader',
                    {
                        loader: 'stylus-resources-loader',
                        options: {
                            resources: './packages/theme/eva-theme.styl'
                        }
                    }
                ]
            },

            // 处理CSS文件
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            {
                test: /\.js?$/,
                loader: [ 'babel-loader', 'eslint-loader' ],
                exclude: file =>
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'several demos',
            hash: true,
            template: './src/index.html',
            meta: {
                viewport:
                    'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
            }
        }),

        new CleanWebpackPlugin(),

        new VueLoaderPlugin()
    ]
}
