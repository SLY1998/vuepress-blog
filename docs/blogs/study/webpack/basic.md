---
title: 【webpack】基础知识
date: 2022-07-25
sidebar: true
categories:
 - 学习
tags:
 - webpack
---

## 一、概念

本质上，webpack是一个现代javaScript应用程序的静态模块打包器（module bundler）。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

四个核心概念

- 入口（entry）
- 输出（output）
- loader
- 插件（plugins）

### 入口

**入口起点**(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。

可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src。

### 出口

**output** 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。

### loader

**loader** 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。

在更高层面，在 webpack 的配置中 loader 有两个目标：

1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。

### 插件

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。

插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。

### 模式

通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化

```js
module.exports = {
  mode: 'production'
};
```

## 二、入口起点（entry points）

如何去配置 entry 属性

### 单个入口（简写）语法

```js
// 用法：entry: string|Array<string>
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;

// 完整写法
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

### 对象语法

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

```js
// 用法：entry: {[entryChunkName: string]: string|Array<string>}
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

### 常见场景

**（1）分离 应用程序（app）和 第三方库（vendor）入口**

这种方式比较常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中。

```js
// 用法：entry: {[entryChunkName: string]: string|Array<string>}
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

**（2）多页面应用程序**

在多页应用中，（译注：每当页面跳转时）服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。

```js
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

## 三、输出（output）

配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置。

### 用法（usage）

在 webpack 中配置 output 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

- filename 用于输出文件的文件名。
- 目标输出目录 path 的绝对路径。

```js
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

### 多个入口起点

如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符(substitutions)来确保每个文件具有唯一的名称。

```js
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

## 四、模式（mode）

### 用法

只在配置中提供 mode 选项：

```js
module.exports = {
  mode: 'production'
};
```

或者从CLI参数中传递

```js
webpack --mode=production
```

## 五、loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。oader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。

### 示例

用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript

1. 安装相对应的 loader：
```js
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

2. 指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：
```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

### 使用loader

3种使用方式：

- 配置（推荐）：在 webpack.config.js 文件中指定 loader。
- 内联：在每个 import 语句中显式指定 loader。
- CLI：在 shell 命令中指定它们。

**配置**

module.rules 允许你在 webpack 配置中指定多个 loader。

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
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
```

**内联**

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

**CIL**

这会对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader。

```js
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

### loader特性

- loader 支持链式传递。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

## 六、插件（plugins）

插件目的在于解决 loader 无法实现的其他事。

### 用法

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。

使用方式：

**（1）配置**

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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

**（2）Node API（不推荐）**
