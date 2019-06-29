import webpackMerge from 'webpack-merge';
import base from './base.config.js';
var webpack = require('webpack');

export default webpackMerge(base, {
    devServer: {
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        port: 8090,
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
})
