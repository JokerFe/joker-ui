const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const getHtmlOptions = (isProduction, opts = {}) => {
    let env = isProduction ? 'prod' : 'dev';
    let htmlOptions = (config[env] && config[env].html) || {};
    return Object.assign(
        {},
        htmlOptions,
        {
            template: `${opts.folder}/index.html`,
            filename: 'index.html',
            title: config.title,
            inject: true,
            cache: true
        },
        opts
    );
};

module.exports = function(env, argv) {
    const isProduction = argv.mode === 'production';
    const buildFolder = argv.folder || 'packages';
    return {
        mode: isProduction ? 'production' : 'development',
        context: path.resolve(__dirname, '../'),
        entry: {
            index: `./${buildFolder}/index.js`
        },
        performance: {
            //代码性能提示 2M和 1M
            maxEntrypointSize: 2000000,
            maxAssetSize: 1000000
        },
        output: {
            path: path.resolve(__dirname, '../dist', config.base),
            publicPath: isProduction ? '' : '/',
            publicPath: './',
            filename: isProduction ? 'assets/js/[name].[contenthash:8].js' : 'assets/js/[name].[hash:8].js',
            chunkFilename: isProduction ? 'assets/js/[name].[contenthash:8].chunk.js' : 'assets/js/[name].[hash:8].chunk.js'
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    // include: [path.resolve(__dirname, '../src')],
                    exclude: /node_modules\/(?!jad-pc)/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        isProduction
                            ? {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: {
                                      publicPath: '../../'
                                  }
                              }
                            : 'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/imgs'
                    }
                },
                {
                    test: /\.(woff|eot|svg|ttf)(\?(\w|#)+)?$/,
                    loader: 'file-loader?limit=20480',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts'
                    }
                },
                {
                    test: /\.md$/,
                    use: [{loader: 'json-loader'}, {loader: 'meta-marked'}]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.json', '.css', '.scss'],
            alias: {
                '@': path.resolve(__dirname, '../packages'),
                vue$: path.resolve(__dirname, '../node_modules', 'vue/dist/vue.esm.js'),
                'jad-pc$': path.resolve(__dirname, '../node_modules', 'jad-pc/dist/jad.js')
            },
            symlinks: false
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new OptimizeCSSAssetsPlugin({
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            {
                                autoprefixer: false,
                                discardComments: {
                                    removeAll: true
                                },
                                zindex: false
                            }
                        ]
                    }
                })
            ],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            isProduction &&
                new cleanWebpackPlugin(['dist'], {
                    root: path.resolve(__dirname, '../'),
                    verbose: true,
                    dry: false
                }),
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: 'assets/css/[name]-[contenthash:8].css',
                    chunkFilename: 'assets/css/[name]-[contenthash:8].css'
                }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            isProduction &&
                new webpack.HashedModuleIdsPlugin({
                    hashFunction: 'sha256',
                    hashDigest: 'hex',
                    hashDigestLength: 8
                }),
            new vueLoaderPlugin(),
            new CaseSensitivePathsPlugin(),
            new webpack.DefinePlugin({
                $isPro: JSON.stringify(isProduction),
                $isSite: JSON.stringify(isProduction),
            }),
            argv.analyze && new BundleAnalyzerPlugin(),
            !argv.excludeHtml && new htmlWebpackPlugin(getHtmlOptions(isProduction, {folder: buildFolder}))
        ].filter(Boolean),
        stats: {
            children: false
        } //注释掉 mini-css-extract-plugin 报的提示错误
    };
};
