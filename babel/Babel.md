# Babel

Babel 是一个 JavaScript 的编译器。

Babel 的前身是 6to5 这个库，从字面意思就可以看出，它的主要功能是将 ES6 转成 ES5。最初的时候，转换 AST 的引擎是 frok acorn 的。在 2015 年的时候，将 6to5 这个库改名为 Babel，解析引擎改名为 Babylon。再后来，Babylon 移入到了 @babel/parser。

Babel 的实现基于主要编译原理，深入 AST 来生成目标代码，同时，babel 也需要工程化的协作，比如要和 webpack 相互配合。

Babel 的主要功能有：

1. 语法转换：高级语言特性的降级
2. polyfill：打补丁
3. 源码转换：我们可以将 jsx、vue 代码转换为浏览器可识别的 JS 代码。

![babel monorepo](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abe081d25fca46aa9ffe82d3af40cd10~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
