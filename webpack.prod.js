const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './public/logic/entrypoint.js',
    mode: 'production',
    output: {
        filename: 'logic/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "fs": false,
            "process": require.resolve("process/browser"),
        },
    },
    devtool: false, // Disable source maps for production
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: 'defaults' }]],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'front/[name].[contenthash][ext]',
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[contenthash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Vicles',
            filename: 'index.html',
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' },
                {from:'public/site.webmanifest', to: 'site.webmanifest'}
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'front/[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser', // Polyfill for process
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
