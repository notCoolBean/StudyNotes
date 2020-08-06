# Loader 跟 Plugin 有什么区别

### 一、 Loader

> loader用于对模块的源代码进行转换。loader可以使你在import或'加载'模块是预处理文件。loader类似于其他构建工具中‘任务’，并提供了处理前端构建步骤的强大方法。loader可以将文件从不同的语言（typeScript）转化为javaScript，获将内联图像转化为data URL。loader甚至允许你直接在JavaScript模块中引入CSS文件；

##### loader的使用方式：

  1. 在webpack.config.js中配置指定文件使用对应的loader：
      ```js
        module: {
          ruler: [
            {
              test: /\.css$/,
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                }
              ]
            }
          ]
        }
        // 执行顺序从下往上，先执行css-loader再执行style-loader
      ```
  2. 内联（在使用import引入模块的时候指定使用的loader）：
      ```js
        import style from 'style-loader!css-loader?modules!./style.css'
      ```
  3. 通过CLI使用loader：
      ```js 
        webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
        // 针对jade使用jade-loader 针对css使用style跟css-loader
      ```
  ##### loader特性：

  - loader支持链式传递。能够对资源使用流水线（pipeline）。一组链式的loader将按照相反的顺序执行。loader链中的第一个loader返回值给下一个loader。在最后一个loader，返回webpack所预期的JavaScript。
  - loader可以是同步的，也可以是异步的；
  - loader运行在node中，并且能够执行任何可能的操作；
  - loader接收查询参数。用于对loader传递配置；
  - loader能够使用options对象进行配置；
  - 除了使用package.json常见的main属性，还可以将普通的npm模块导出为loader，做法是在package.json里定义一个loader字段；
  - 插件（plugin）可以为loader带来更多的特性；
  - loader能够产生额外的任意文件；
  loader 通过（loader）预处理函数，为JavaScript生态系统提供了更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如打包、压缩、语言翻译等；

### 二、Plugins

> 插件是webpack的支柱功能。webpack自身也是构建于在webpack配置中用到的相同的插件系统之上；插件的目的在于解决loader无法实现的其他事；

##### 剖析

webpack插件是一个具有apply属性的JavaScript对象。apply属性会被webpack compiler调用。并且compiler对象可在整个变异生命周期访问。
  ```js
    const pluginName = 'diyPlugin';

    class diyPlugin {
      apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
          console.log('webpack 构建过程开始！');
        })
      }
    }
  ```
compiler hook 的tap方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便他可以在所有hook中复用；

##### 用法

由于插件可以携带参数/选项，你必须在webpack配置中想plugin属性传入new实例，根据你的webpack用法，这里有多种方式使用插件。

##### 配置

webpack.config.js
  ```js
    const HtmlWebpackPlugin = require('html-webpack-pliugin'); // 通过npm 安装
    const webpack = require('webpack'); // 访问内置插件
    const path = require('path');

    const config = {
      entry: './path/to/my/entry/index.js',
      output: {
        filename: 'my-first-webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: '/\.(js|jsx)$',
            use: 'babel-loader'
          }
        ]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };

    module.exports = config;
  ```

##### Node API

some-node-script.js
```js
  const webpack = require('webapck'); // 访问webpack运行时（runtime）
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);

  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function (err, status) {
    // ...
  })
```

### Loader 跟 Plugins 的区别

> loader更倾向于文件转化（将ts转化为js，scss->css）过程，提供处理前端构建步骤的强大方法；plugin则是一个loader的扩展处理一下loader做不到的其他事，针对在webpack打包过程中，不会直接操作文件，是基于事件机制工作，会监听webpack打包过程中的某些节点做一些处理操作；



