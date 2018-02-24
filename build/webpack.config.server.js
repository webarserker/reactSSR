const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

var reslove = (__path) => path.resolve(__dirname, __path)

module.exports = webpackMerge(baseConfig, {
    target: 'node',
    entry : {
        app: reslove('../client/server-entry.js')
    },
    externals: Object.keys(require('../package.json').dependencies),
    output: {
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2'
    }
})
