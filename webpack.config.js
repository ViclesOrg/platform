const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './public/logic/entrypoint.js',
    mode: 'development',
    output: {
        filename: 'logic/[name].[contenthash].js',
        path: path.resolve(__dirname, '/dist'),
        publicPath: '/', // Ensures that all assets are served from the root
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "fs": false, // fs is not available in the browser
            "process": require.resolve("process/browser"),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/public'), // Serve static files from 'public'
        },
        historyApiFallback: true, // Serve index.html for all 404 routes for SPA
        compress: true,
        port: 8080,
    },
    devtool: 'source-map', // Suitable for development; consider different options for production
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: 'defaults' }]],
                        cacheDirectory: true, // Enable caching for faster rebuilds
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
                    filename: 'front/[name].[contenthash][ext]', // Simplified output path
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[contenthash][ext]', // Simplified output path
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Vicles',
            filename: 'index.html',
            template: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/assets', to: 'dist/assets' }, // Adjusted path
                {from:'public/site.webmanifest', to: 'dist/site.webmanifest'}
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'front/[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser', // Inject process polyfill
        }),
    ],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false, // Disable performance hints; adjust if needed
    },
};
