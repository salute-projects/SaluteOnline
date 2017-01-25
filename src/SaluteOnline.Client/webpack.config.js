var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "polyfills": "./saluteOnlineApp/polyfills.ts",
        "vendor": "./saluteOnlineApp/vendor.ts",
        "app": "./saluteOnlineApp/app/main.ts"
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    output: {
        path: "./wwwroot",
        filename: "js/[name].bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                  'awesome-typescript-loader',
                  'angular-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpe?g|gif|ico|)$/,
                loader: "file-loader",
                options: {
                    name: './images/[name].[ext]'
                }
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'file'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/'
            ]
        ),
        new ExtractTextPlugin("css/[name]-[hash:8].bundle.css"),
        new Webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),
        new Webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: "./saluteOnlineApp/index.html",
            inject: "body"
        }),
        new CopyWebpackPlugin([{
            from: 'saluteOnlineApp/app/image',
            to: 'content'
        }])
    ],
    devServer: {
        historyApiFallback: true,
        stats: "minimal"
    }
};