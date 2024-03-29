// webpack是node写出来的，要用node写法
let path = require('path')  // 内置模块，直接引用
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')  // 提取css到单独的文件中
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    optimization: {  // 优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()  //使用该配置，js打包不会被压缩，所以要配合UglifyJsPlugin
        ]
    },
    mode: 'production', // 模式，默认两种，production和development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js',  // 打包后的文件名
        path: path.resolve(__dirname, 'dist')  // __dirname（可以不加）代表当前目录下, 路径必须是一个绝对路径
    },
    plugins: [  // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: { // 模块
        // loader
        rules: [ 
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {  // 用babel-loader  es6-》es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {'legacy': true}],
                            ['@babel/plugin-proposal-class-properties', {'loose': true}]
                        ]
                    }
                }
            },
            {
                // 处理css
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                // 处理less   sass -> node-sass sass-loader
                // stylus -> stylus-loader
                test: /\.less$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',  // @import 解析路径
                    'postcss-loader',  // 使用autoprefixer自动添加浏览器前缀
                    'less-loader' // 把less -> css
                ]
            }
        ]
        
    }
}