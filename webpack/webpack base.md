# webpack 基础知识

## webpack 的介绍及作用

webpack 就是一个编译打包的工具。  
功能有：

1. 多份资源文件打包成一个 bundle；
2. 支持 Babel、Eslint、TS、CoffeScript、Less、Sass；
3. 支持模块化处理 css、图片等资源文件；
4. 支持 HMR(Hot Module Replacement 模块热替换) + 开发服务器；
5. 支持持续监听、持续构建；
6. 支持代码分离；
7. 支持 Tree-shaking；
8. 支持 Sourcemap；

## 基础用法

1. 项目安装依赖，`npm i -D webpack webpack-cli`;
2. 编辑配置文件 `webpack.config.js`；
3. 运行命令 `npx webpack`;

## webpack 的简化版核心流程

1. 入口处理：从 `entry` 配置找到入口文件开始，启动编译流程；
2. 依赖解析：从 `entry` 配置找到入口的文件开始，根据 require 或者 import 等语句找到依赖资源；
3. 资源解析：根据 `module` 配置，调用资源转移器，将 png、css 等非标准 JS 资源转为 JS 内容；
4. 资源合并打包：将转译后的资源内容合并打包为可直接在浏览器运行的 JS 文件。

> 会递归调用 2、3 步骤，直到所有资源处理完毕。

## webpack 配置分为流程类和工具类 2 种类型

### 流程类的配置

1. 输入相关的：`entry`、`context`；
2. 模块解析相关的：`resolve`、`externals`；
3. 模块转译相关的：`module`；
4. 后处理相关的：`optimization`、`mode`、`target`；
5. 输出相关的：`output`；

### 工具类的配置

1. 开发效率类：watch、devtool、devServer；
2. 性能优化类：cache、performance；
3. 日志类：stats、infrastructureLogging；
4. 其他：amd、bail 等；

使用频率上来说：

1. `entry/output`
2. `module/plugins`, module 用于 loader 的配置
3. `mode`
4. `watch/devtool/devServer`

## Webpack 流程类的接入其他依赖的配置

1. 接入 css，`style-loader, css-loader`;

   ```js
   module.exports = {
     module: {
       rules: [
         // 处理css
         {
           test: /\.css/i,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   };
   ```

2. 接入 babel，`@babel/core, @babel/preset-env, babel-loader`;如果要处理 JSX，引入`@babel/preset-react`; 如果要处理 typescript，引入`@babel/preset-typescript`;

   ```js
   module.exports = {
     module: {
       rules: [
         // babel 处理es6+
         {
           test: /\.js$/,
           use: [
             {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env'],
               },
             },
           ],
         },
       ],
     },
   };
   ```

3. 生成 HTML，使用插件`html-webpack-plugin`;

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     plugins: [new HtmlWebpackPlugin()],
   };
   ```

4. 接入 less，`style-loader, css-loader, less-loader`;

   ```js
   module.exports = {
     module: {
       rules: [
         // 处理less
         {
           test: /\.less/i,
           use: ['style-loader', 'css-loader', 'less-loader'],
         },
       ],
     },
   };
   ```

5. 接入 vue，`vue-loader`;

   ```js
   module.exports = {
     module: {
       rules: [
         // vue
         {
           test: /\.vue$/i,
           use: ['vue-loader'],
         },
       ],
     },
   };
   ```

6. 接入 css，``;

   ```js
   module.exports = {
     module: {
       rules: [
         // 处理css
         {
           test: /\.css/i,
           use: ['style-loader', 'css-loader'],
         },
         // babel 处理es6+
         {
           test: /\.js$/,
           use: [
             {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env'],
               },
             },
           ],
         },
       ],
     },
   };
   ```

## webpack 工具类的一些配置

1. HMR 模块热替换；依赖库`webpack-dev-server`，执行命令`npx webpack serve`，执行命令多了一个**serve**；

   ```js
   module.exports = {
     devServer: {
       hot: true,
       // open 设为true，会自动打开浏览器运行html
       open: true,
     },
   };
   ```

2. Tree-Shaking，在构建时会删除一些未被用到的代码（包括这些场景：1、代码没有被用到/其他模块引用；2、其他模块有引用但实际没有用到；3、代码只读不写）；

   ```js
   module.exports = {
     mode: 'production',
     optimization: {
       usedExports: true,
     },
   };
   ```

3. 缓存；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

4. Sourcemap；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

5. 性能监控；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

6. 日志；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

7. 代码压缩；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

8. 分包；

   ```js
   module.exports = {
     devtool: {},
   };
   ```

## webpack 新手需要掌握的技能点

![webpack 新手需要掌握的知识点](./assetImg/webpack%20新手需要掌握的知识点.png)

## webpack 的配置拆分与合并

公共的配置放到 `webpack.common.js`，dev 环境的配置放到`webpack.dev.js` 里，production 的放到`webapck.prod.js`里，然后通过使用`webpack-merge`去处理合并。

```js
// webpack.dev.js
const { smart } = require('webpack-merge');
const webpackCommonConf = require('webapck.common.js');

module.exports = smart(webpackCommonConf, {
  mode: 'dev',
  ...
});
```

## 如何配置多入口？

需要从 `entry,output, new HtmlWebpackPlugin`三个方面去配置。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    // 有几个入口就写几个配置
    index: path.join(srcPath, 'index'),
    other: path.join(srcPath, 'other'),
  },
  output: {
    // name 表示动态的值，对应 entry 入口的key值
    filename: [name].[contenthash:8].js,
    path: distPath,
  },
  plugins: [
    new HtmlWebpackPlugin(
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['index']  // 只引用 index.js,
    ),
    new HtmlWebpackPlugin(
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['other']  // 只引用 other.js,
    ),
  ]
}

```

## 如何抽离压缩 css 文件？

这种通常在 production 环境 build 的时候才使用，css 的处理最后一个 loader 不使用 `style-loader`，  
而是使用 `MiniCssExtractPlugin.loader`。同时在 plugins 里配置抽离的文件名等参数以及 optimization 里配置压缩参数。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
  ],
  optimization: {
    // 压缩CSS
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
```

## 如何抽离公共代码和第三方库代码？

在`optimization`里配置`splitChunks`，然后在 `plugins.HtmlWebpackPlugin` 的 chunks 里配置当前 html 要引用的 js 文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.join(__dirname, 'src');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['vendor', 'common', 'index'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // 当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名字
          priority: 1, // 权限越高，优先抽离
          test: /node_modules/, // 第三方模块的目录
          minSize: 0, // 最小允许的文件大小，超过该大小就抽离
          minChunks: 1, // 最少复用过的几次，有1次就抽离
        },
        // 公共的模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 3,
          minChunks: 2,
        },
      },
    },
  },
};
```

## 如何实现异步加载 JS？

webpack 不需要额外做配置，默认支持，只是在 js 加载的时候需要用`import(js)`包裹。

```js
setTimeout(() => {
  // 类似于定义了一个 chunk
  import('xxx.js').then((res) => {
    console.log(res.default.xxx);
  });
}, 1500);
```

## 如何配置热更新？

## 如何优化构建速度？
