const path = require('path'); // Node.js 核心模块，用于操作文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  // entry: './src/index.js',   // 对象语法，提高可扩展性。

  // 入口函数配置应用场景 1.常见场景分离 应用程序(app) 和 第三方库(vendor) 入口
  /**
   * 从表面上看，这告诉我们 webpack 从 app.js 和 vendors.js 开始创建依赖图(dependency graph)。这些依赖图是彼此完全分离、互相独立的（每个 bundle 中都有一个 webpack 引导(bootstrap)）。这种方式比较常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中
   * 此设置允许你使用 CommonsChunkPlugin 从「应用程序 bundle」中提取 vendor 引用(vendor reference) 到 vendor bundle，并把引用 vendor 的部分替换为 __webpack_require__() 调用。如果应用程序 bundle 中没有 vendor 代码，那么你可以在 webpack 中实现被称为长效缓存的通用模式
   */
  entry: {
    app: './src/index.js',
    vendors: './src/vendors.js'
  },
  // 入口函数配置应用场景 2.多页面应用程序
  /**
   * 需要 3 个独立分离的依赖图
   * 在多页应用中，（译注：每当页面跳转时）服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事: 使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益.
   */
  // entry: {
  //   pageOne: './src/pageOne/index.js',
  //   pageTwo: './src/pageTwo/index.js',
  //   pageThree: './src/pageThree/index.js'
  // },


  // 通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及想要 bundle 生成(emit)到哪里
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  /**
   * 如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符（[name]：入口名称；[id]：内部 chunk id；[hash]：每次构建过程中，唯一的 hash ...）来确保每个文件具有唯一的名称
   * output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
   */

  // npm i --save-dev css-loader
  // npm i --save-dev ts-loader
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ],
  },
};
