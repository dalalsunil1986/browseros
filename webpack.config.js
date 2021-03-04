// NodeJS modules
const path = require('path')

// Environment variables
const isDev = Number(process.env.DEVMODE) === 1
const isProd = !isDev
console.log(isDev ? 'DEVELOPMENT MODE' : 'PRODUCTION MODE')

// Formats
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Minification & optimization
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

// Additions
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

// Functions
const stylesLoader = (loader) => {
    let config = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: './',
            },
        },
        'css-loader'
    ]

    if (loader) {
        config.push(loader)
    }

    return config
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


const jsLoaders = preset => {
    return [{
        loader: 'babel-loader',
        options: babelOptions(preset)
    }]
}

// Main config
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        minimize: isProd,
        minimizer: isDev ? undefined : [
            `...`,
            new HtmlMinimizerPlugin({
                minimizerOptions: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'advanced',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ],
                }
            }),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        arguments: true,
                        booleans_as_integers: true,
                        passes: 3
                    },
                    mangle: {
                        eval: true,
                    },
                    ecma: 2018,
                    toplevel: true,
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    performance: {
        maxAssetSize: 1e6,
        maxEntrypointSize: 1e6
    },
    devServer: {
        port: 4200,
        overlay: true
    },
    devtool: isDev ? 'source-map' : undefined,
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            ignoreOrder: false
        }),
        new ESLintPlugin({
            extensions: ['ts']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [...jsLoaders(), 'ts-loader']
            },
            {
                test: /\.css$/,
                use: stylesLoader()
            },
            {
                test: /\.png$/,
                use: ['file-loader']
            }
        ]
    }
}