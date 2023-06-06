# webpack 考查点

## 一、前端代码为何要进行构建和打包？

1. 体积更小（Tree-shaking，压缩，合并），更快加载；
2. 编译高级语言或语法（TS，ES6+，模块化，scss，less 等）；
3. 兼容性和错误检查（Polyfill，postcss，eslint 等）；
4. 统一、高效的开发环境；
5. 统一的构建流程和产出标准；
6. 集成公司构建规范（提测、上线等）；

## 二、module、chunk、bundle 分别是什么意思，有何区别？

module - 各个源码文件，webpack 中一切皆模块；  
chunk - 多模块合并成的，如 entry、import()、splitChunk  
bundle - 最终的输出文件

## 三、loader 和 plugin 的区别？

loader 模块转化器，如 less-> css  
plugin 扩展插件，`new HtmlWebpackHtml()`

## 四、webpack 如何实现懒加载？

使用 import()，结合 Vue React 异步组件，Vue-router、React-router 异步加载路由。

## 五、webpack 常见性能优化

优化打包构建速度 —— 开发体验和效率

1. 优化 babel-loader；

   ```js
   {
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], // ?cacheDirectory 开启缓存
    include: path.resolve(__dirname, 'src'), // 明确范围
    // exclude: path.resolve(__dirname, 'node_modules') // 排除范围，include和exclude 二者选一个即可
   }
   ```

2. IgnorePlugin
3. noParse
4. happyPack 多进程打包
5. ParallelUglifyPlugin 多进程压缩 JS
6. 自动刷新，整个网页全部刷新，速度较慢，状态会丢失
7. 热更新，新代码生效，网页不刷新，状态不丢失
8. DllPlugin 动态链接库插件，webpack 已内置 DllPlugin。

> IgnorePlugin 和 noParse 区别：  
> IgnorePlugin 直接不引入，代码中没有  
> noParse 引入，但不打包

优化产出代码 —— 产品性能

1. 小图片 base64 编码，减少请求发送；
2. bundle 加 hash 值，让浏览器使用缓存；
3. 大文件等使用懒加载；
4. 提取公共代码；
5. IngorePlugin，对第三方的插件忽略无用的资源减少打包体积；
6. 使用 CDN 加速，webpack 里对打包的资源配置 CDN 地址，从而使 html 页面从 CDN 加载静态资源；
7. 使用 production 模式；该模式下会自动压缩代码，Vue React 等会自动删掉调试代码，启动 Tree-Shaking（只有 ES6 Module 才能让 Tree-Shaking 生效，commojs 不行）；
8. 使用 Scope Hosting；代码体积越大，效果约明显。开启后生成的代码体积更小，创建函数作用域更少，代码可读性更好。

   ```js
   const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

   module.exports = {
     resolve: {
       mainFields: ['jsnext:main', 'browser', 'main'],
     },
     plugins: [new ModuleConcatenationPlugin()],
   };
   ```

> ES6 Module 是静态引入，编译时引入；Commonjs 是动态引入，执行时引入；只有 ES6 Module 才能静态分析，实现 Tree-Shaking。

## 六、 babel-runtime 和 babel-ployfill 的区别

babel-polyfill 会污染全局  
babel-runtime 不会污染全局  
产出第三方 lib 要用 babel-runtime

## 七、babel 和 webpack 的区别

babel - JS 新语法的编译工具，不关系模块化  
webpack - 打包构建工具，是多个 loader、plugin 的集合

## 为何 Proxy 不能被 Polyfill？

Class 可以用 function 模拟，Promise 可以用 callback 来模拟，  
但 Proxy 的功能不能用 Object.defineProperty 模拟，目前没有方法去模拟 Proxy。
