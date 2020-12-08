const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

const config = require('./config')

module.exports = function(env, argv) {
    const base = baseConfig(env, argv)
    return merge(base, {
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NormalModuleReplacementPlugin(/AddKeyword\/dist\/(.*)/, function (resource) {
                resource.request = resource.request.replace(/AddKeyword\/dist/, '../src/components')
            })
        ],
        devServer: {
            contentBase: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../site')],
            hot: true,
            publicPath: '/',
            disableHostCheck: true,
            open: true,
            openPage: 'home',
            overlay: true,
            port: config.dev.port,
            historyApiFallback:{
                index:'/index.html'
            }
        },
        watchOptions: {
            ignored: /node_modules/
        }
    })
}