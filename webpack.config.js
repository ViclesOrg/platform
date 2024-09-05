const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './logic/entrypoint.js',
    mode: 'development',
    output: {
        filename: 'logic/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        historyApiFallback: true, // Serve index.html for all routes
        port: 8080,
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: 'defaults' }]],
                        plugins: [
                            ['@babel/plugin-syntax-import-attributes'],
                        ],
                        cacheDirectory: false,
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
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[contenthash][ext]',
                }
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Vicles',
            filename: 'index.html', // Ensure this is output to 'dist'
            template: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'front/[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],

    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },

    // performance: {
    //     hints: 'warning',
    //     maxEntrypointSize: 512000,
    //     maxAssetSize: 512000,
    // },
};