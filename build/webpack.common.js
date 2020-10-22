const {
        resolve,
        posix: { join }
    } = require('path'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    {
        alias, jsexclude, vue
    } = require('./shared-config')

module.exports = {
    mode: 'production',
    entry: { app: [ './src/index.js' ] },
    output: {
        path: resolve(process.cwd(), './lib'),

        // publicPath: '/dist/',
        filename: 'lazybones-ui.common.js',
        chunkFilename: '[name].[id].js',

        // 以export default的方式输出该包
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias,
        modules: [ 'node_modules' ],
        extensions: [ '.js', '.vue', '.json' ]
    },
    externals: { vue },
    performance: { hints: false },
    optimization: { minimize: false },
    stats: { children: false },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { compilerOptions: { preserveWhitespace: false } }
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
                            resources: [
                                './packages/theme/eva-theme.styl',
                                './packages/theme/common-variable.styl'
                            ]
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
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
}
