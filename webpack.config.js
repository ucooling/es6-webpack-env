var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var uglifyJsPlugin = require("webpack/lib/optimize/uglifyJsPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包

function getEntry(dir) {
    var fs = require('fs');
    var jsPath = path.resolve(dir, 'assets/js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(dir, 'assets/js', item);
        }
    });
    return files;
}
 
module.exports = {
    entry: getEntry(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: "js/[name].js",
    },
    // webpack-dev-server 配置目录
    devServer:{
        contentBase:'./'
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader!sass-loader'),
            },
            {
                test   : /\.woff/,
                loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
            },
            {
                test   : /\.ttf/,
                loader : 'file?prefix=font/'
            },
            {
                test   : /\.eot/,
                loader : 'file?prefix=font/'
            },
            {
                test   : /\.svg/,
                loader : 'file?prefix=font/'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', ''],
        alias: {
            nm: path.resolve(__dirname, "node_modules"),
            jquery: path.resolve(__dirname, "node_modules/jquery/dist/jquery.min.js"),
            components: path.resolve(__dirname, "components"),
            assets: path.resolve(__dirname, "assets")
        }
    },
    plugins: [
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']    //排除关键字
        }),

        new ExtractTextPlugin("style.css"),
    ]
};