var path = require('path');
var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');  //分离css单独打包插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        pc: ['babel-polyfill', './src/main.ts'],//入口文件,字符串或数组或者是对象所表示的含义不一样
    },
    // output参数是个对象，用于定义构建后的文件的输出。
    output: {
        path: path.resolve(__dirname, './dist'),//定义用来存放打包后文件的输出目录
        filename: process.env.NODE_ENV != 'production' ? 'js/[name].js' : 'js/[name].[hash:8].js',
        // 线上发布对应的静态资源加载路径的前缀目录配置
        publicPath: process.env.__STATIC__,
    },
    module: {
        //rules 来指定规则，它是一个数组，里面是每一个对象，对不同的文件指定具体的规则。
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: process.env.__STATIC__,
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextWebpackPlugin.extract({use: ['css-loader', 'sass-loader'], fallback: 'style-loader',})
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {loader: 'file-loader', options: {name: 'fonts/[name].[hash:8].[ext]'}}//项目设置打包到dist下的fonts文件夹下
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
        ]
    },
    //引入第三方插件
    plugins: [
        // new CleanWebpackPlugin(['dist']),//清除上次打包的dist文件夹
        new ExtractTextWebpackPlugin(process.env.NODE_ENV != 'production' ? '[name].css' : '[name].[hash:8].css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            title: '氧歌',
            chunks: ['pc'],
            // inject:true,  //所有静态资源css和JavaScript都不会自动注入到模板文件中，此处我们手动在html中添加
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        //创建 import 或 require 的别名
        alias: {
            'vue': 'vue/dist/vue.js',
            'src': path.resolve(__dirname, './src'),
            'static': path.resolve(__dirname, './src/static'),
            'www': path.resolve(__dirname, './src/www'),
            'config': path.resolve(__dirname, './config'),
        }
    },
    devtool: '#eval-source-map',
    //webpack-dev-server配置
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        port: 8099,
    },
    performance: {
        hints: false
    },
}
