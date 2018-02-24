var path = require('path')

module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ['babel-loader', 'eslint-loader'], exclude: path.join(__dirname, '../node_modules')}
        ]
    }
}
