const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const base = require('./webpack.base.config');
const isProduction = process.env.NODE_ENV === 'production';
//const isProduction = true;
const srcPath = path.resolve(process.cwd(), 'src');

module.exports = merge(base, {
    entry: {
        app: path.join(srcPath, 'client-entry.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'public'),
        publicPath: '/public',
        filename: isProduction ? '[name].[hash].js' : '[name].js',
        sourceMapFilename: isProduction ? '[name].[hash].js.map' : '[name].js.map',
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer]
                        }
                    },
                    'sass-loader',
                ],
            },
        ]
    },

    plugins: (isProduction ?
        [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, '../index.html')
            }),
        ] : [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                hmr: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    )
});
