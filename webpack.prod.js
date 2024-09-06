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
        publicPath: '/', // Ensures assets are served from the root
        clean: true, // Clean the output directory before emit
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
                    filename: 'front/[name].[contenthash][ext]', // Output path for fonts
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[contenthash][ext]', // Output path for images
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
                { from: 'public/assets', to: 'assets' }, // Adjusted path for production
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'front/[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true, // Minify the output
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(), // Minify CSS
        ],
        splitChunks: {
            chunks: 'all', // Split vendor and app code
        },
        runtimeChunk: 'single', // Create a single runtime bundle
    },
    performance: {
        hints: 'warning', // Display performance hints
        maxEntrypointSize: 512000, // Maximum entry point size
        maxAssetSize: 512000, // Maximum asset size
    },
};
