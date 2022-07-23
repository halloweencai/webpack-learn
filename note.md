## 初始化一下
- 1、yarn init -y

## webpack安装
- 2、yarn add webpack webpack-cli -D

## webpack可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包（支持我们js的模块化）

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js

## 运行打包
- npx webpack

## 指定配置文件
- npx webpack --config webpack.config.my.js
- 可以在package里面脚本增加脚本
- 如果脚本命令中只有“webpack”，yarn build的时候可以使用yarn build -- --config webpack.config.my.js

大致流程：
把解析的所有的模块变成一个对象，通过入口文件加载对应的文件，通过递归找出依赖关系，并且运行
