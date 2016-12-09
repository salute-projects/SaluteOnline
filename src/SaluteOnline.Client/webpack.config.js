var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
                loader: "ts"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpg|gif|ico|)$/,
                loader: "file?name=assets/[name]-[hash:6].[ext]",
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'file'
            },
            // Load css files which are required in vendor.ts
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/'
            ]
        ),
        new ExtractTextPlugin("css/[name]-[hash:8].bundle.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),

        new HtmlWebpackPlugin({
            template: "./saluteOnlineApp/index.html",
            inject: "body"
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: "minimal"
    }
};