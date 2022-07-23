// webpack是node写出来的，要用node写法
let path = require('path')  // 内置模块，直接引用
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer: {
        port: 3000,
        compress: true, // 压缩
        // webpack5好像一定要配置
        static: {
            directory: path.join(__dirname, './dist')
        }
    },
    mode: 'production', // 模式，默认两种，production和development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js',  // 打包后的文件名
        path: path.resolve(__dirname, 'dist')  // __dirname代表当前目录下, 路径必须是一个绝对路径
    },
    plugins: [  // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                // 去掉双引号
                removeAttributeQuotes: true,
                // 去掉空格
                collapseWhitespace: true
            },
            // 加上hash戳
            hash: true
        })
    ]
}