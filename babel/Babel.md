# Babel

## Babel 概念

Babel 是一个 JavaScript 的编译器。

Babel 的前身是 6to5 这个库，从字面意思就可以看出，它的主要功能是将 ES6 转成 ES5。最初的时候，转换 AST 的引擎是 frok acorn 的。在 2015 年的时候，将 6to5 这个库改名为 Babel，解析引擎改名为 Babylon。再后来，Babylon 移入到了 @babel/parser。

Babel 的实现基于主要编译原理，深入 AST 来生成目标代码，同时，babel 也需要工程化的协作，比如要和 webpack 相互配合。

Babel 的主要功能有：

1. 语法转换：高级语言特性的降级
2. polyfill：打补丁
3. 源码转换：我们可以将 jsx、vue 代码转换为浏览器可识别的 JS 代码。

![babel monorepo](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abe081d25fca46aa9ffe82d3af40cd10~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## Babel 环境搭建和基本配置

基本的依赖库：`@babel/core、@babel/cli、@babel/preset-env`

其他的一些常用库

1. `@babel/plugin-transform-runtime`，
2. `@babel/polyfill`，是 core-js 和 regenerator 这两个库的集合，会污染全局变量；v7.4 版本之后已被弃用，推荐直接使用 core-js 和 regenerator。
3. `@babel/runtime`，不会污染全局环境，在执行时会帮你重命名。开发第三方库时使用。
4. ``，
5. ``，

`.babelrc` 里的配置，需要设置 presets 和 plugins 两部分。

```json
// preset 是plugin的一个集合
{
  "presets": [["@babel/preset-env"]],
  "plugins": []
}
```

执行命令`npx babel index.js`
