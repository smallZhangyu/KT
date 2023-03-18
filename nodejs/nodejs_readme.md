# NodeJs learning

## Nodejs 的简介与浏览器的差异

Nodejs 是基于 Chrome V8 引擎开发的 JavaScript**运行时环境**，它的底层就是 Chrome 浏览器的 JavaScript 引擎。但是它不是浏览器，因此不具有浏览器的 DOM api，比如

1. Window 对象；
2. Location 对象；
3. Document 对象；
4. HTMLElement 对象；
5. Cookie 对象等等

它也有自己独有的 API，这些 API 让我们能够使用 JavaScript 操作计算机，开发 web 服务器。

1. 全局的 global 对象；
2. 当前进程信息的 Process 对象
3. 操作文件的 fs 模块；
4. 创建 Web 服务的 http 模块等。

同时 Nodejs 和浏览器也存在一些共有的对象，比如 JavaScript 的内置对象，它们是 V8 引擎提供的。常见的有：

1. 基本的常量：undefined、null、NaN、Infinity；
2. 内置对象 Boolean、Number、String、Object、Symbol、Function、Array、Regexp、Set、Map、Promise、Proxy；
3. 全局函数 eval、encodeURIComponent、decodeURIComponent 等

还有一些方法不属于引擎内置 API，但二者也都可以实现，比如 setTimeout、setInterval 方法，Console 对象等。

## NodeJs 的三个使用场景

1. 编写运行在操作系统中的命令行程序；
2. 编写 HTTP 服务端程序；
3. 作为前端工程化工具的使用。

## 常用的 Nodejs 内置模块有

1. File System 模块：操作系统的目录和文件的模块，提供文件和目录的读、写、创建、删除、权限设置等等；
2. Net 模块：提供网络套接字 socket，用来创建 TCP 连接，TCP 连接可以用来访问后台数据库和其他持久化服务；
3. HTTP 模块：提供创建 HTTP 连接的能力，可以用来创建 Web 服务；
4. URL 模块：用来处理客户端请求的 URL 信息的辅助模块，可以解析 URL 字符串；
5. Path 模块：用来处理文件路径信息的辅助模块，可以解析文件路径的字符串；
6. Process 模块：用来获取进程信息；
7. Buffer 模块：用来处理二进制数据；
8. Console 控制台模块：用来输出信息到控制台；
9. Crypto 加密解密模块：用来处理需要用户授权的服务；
10. Events 模块：用来监听和派发用户事件。

> 更多模块信息[查看 nodejs 文档](https://nodejs.org/dist/latest-v18.x/docs/api/)

## Nodejs 支持的规范

Nodejs 默认使用的是 CommonJS 规范定义 .js 文件的模块。Node.js 从**v13.2.0**之后也引入了规范的 ES Modules 机制，同时兼容早期的 CommonJS，用 ES Modules 规范定义 .mjs 文件的模块。

直接用 .js 文件执行 ES Modules 规范会报错。如果要用 ES Modules 定义 .js 文件的模块，可以在 Node.js 的配置文件 package.json 中设置参数 type: module。

CommonJS 采用 `module.exports/require` 而 ES Modules 则采用 `export/import`。

ES Modules 的导入导出规则如下：

```js
// 导出
const a = '123';
const b = 'abc';
const func = () => {...};

export default func; // 一个文件只能有一个default模块导出

export {a, b};

// 导出使用别名
export {
    a as a1,
    b as b1
}

export const c = 'werewr';

// 下面这种导出方式是错误的，必须是上面 2 种方式
export {
    d: 'ddd'
}
```

```js
// 导入重命名

// export default 的重命名，可以直接写新的命名
import func2 from 'other.mjs';

// export 的重命名，使用 as 关键字命名
import { a as a1, b as b1, c as c1 } from 'other.mjs';

// export default, export 整个作为一个对象去重命名
import * as other from 'other.mjs';

console.log(other.a);
console.log(other.b);
console.log(other.c);
console.log(other.default); // export default 的 func 使用这种方式去调用，因为 func 在对象other 对应的属性名是 default
```
