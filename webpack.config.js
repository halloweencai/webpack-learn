// webpack是node写出来的，要用node写法
let path = require('path')  // 内置模块，直接引用
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')  // 提取css到单独的文件中
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    // devServer: {
    //     port: 3000,  // 端口号配置
    //     compress: true, // 开启gzip压缩
    //     // webpack5好像一定要配置
    //     static: {
    //         directory: path.join(__dirname, './dist')
    //     }
    // },
    optimization: {  // 优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()
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
            filename: 'index.html',
            // minify: {
            //     // 去掉属性双引号
            //     removeAttributeQuotes: true,
            //     // 折叠空格，变成一行
            //     collapseWhitespace: true
            // },
            // 加上hash戳
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: { // 模块
        // loader
        rules: [ // 规则 css-loader接续@import这种语法的
            // style-loader 它是把css 插入到head标签中
            // loader的特点， 希望单一
            // loader的用法，字符串只用一个loader
            // 多个loader需要[]
            // loader的顺序，默认是从右向左执行，从下到上执行
            // loader还可以写成对象方式，多写点配置
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