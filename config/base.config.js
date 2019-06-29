var path = require('path');
var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');  //分离css单独打包插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        pc: ['babel-polyfill', '../src/pc.js'],//入口文件,字符串或数组或者是对象所表示的含义不一样
    },
    // output参数是个对象，用于定义构建后的文件的输出。
    output: {
        path: path.resolve(__dirname, '../dist'),//定义用来存放打包后文件的输出目录
        publicPath: '/dist/',//指定资源文件引用的目录
        filename: 'js/[name].js',
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
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextWebpackPlugin.extract({use: ['css-loader', 'sass-loader'], fallback: 'style-loader',})
            },
        ]
    },
    //引入第三方插件
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            template: '../index.html',
            filename: 'index.html',
            title: 'Ccui',
            inject: false,  //所有静态资源css和JavaScript都不会自动注入到模板文件中，此处我们手动在html中添加
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
    ],
    resolve: {
        //创建 import 或 require 的别名
        alias: {
            //'vue$': 'vue/dist/vue.esm.js',
            'vue': 'vue/dist/vue.js',
            'src': path.resolve(__dirname, '../src/pc'),
            'assets': path.resolve(__dirname, '../src/pc/assets'),
            'mimgs': path.resolve(__dirname, '../src/mobile/assets/imgs'),
        }
    }
}