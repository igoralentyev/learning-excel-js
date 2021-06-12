/* eslint-disable brace-style */
/* eslint-disable arrow-parens */
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const getLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]

    if (isDev)
    {
        loaders.push('eslint-loader');
    }

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.join(__dirname, 'dist'),
    },
    // resolve: {
    //     extensions: ['.js'],
    //     alias: {
    //         '@': path.resolve(__dirname, 'src'),
    //         '@core': path.resolve(__dirname, 'src/core'),
    //     }
    // },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,
        open: true,
        inline: true,
        watchOptions: {
            ignored: /node_modules/
        },
        contentBase: __dirname,
        watchContentBase: true,
        writeToDisk: true,
    },
    target: 'web',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist') 
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,   
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: getLoaders()
            }
        ]
    },
}
