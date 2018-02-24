const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

var reslove = (__path) => path.resolve(__dirname, __path)

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
    entry : {
        app: reslove('../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: reslove('../client/template.html'),
            inject: true
        }),
        new htmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + reslove('../client/server.template.ejs'),
            filename: 'server.ejs'
        })
    ]
})

if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        // stats: "errors-only",
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
