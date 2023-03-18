# npm learning

## npm run xxx 的执行流程

npm run 是 `npm run-script` 命令的简写。当我们运行 `npm run xxx` 时，基本步骤如下：

1. 从 package.json 文件中读取 scripts 对象里面的全部配置；
2. 以传给 npm run 的第一个参数作为键，比如 xxx，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
3. 在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash，windows 环境下略有不同。

npm 在执行指定 script 之前会把 node_modules/.bin 加到环境变量 $PATH 的前面，这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，换句话说，你不需要在 npm script 中加上可执行文件的完整路径，比如 `./node_modules/.bin/eslint **.js`。

node_modules/.bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本。

node_modules/.bin 目录下的文件表示软连接，那这个 bin 目录下的那些软连接文件是哪里来的呢？它存在项目最外层的 package-lock.json 文件中（实际存在于库的源代码中的 package.json 里面，用于在安装时创建软链指向 bin 中的地址）。在 npm install 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把 node_modules/.bin 加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。

在 node_modules/.bin 中 有三个 vue-cli-service 文件。它们分别表示在不同环境下的运行命令。

```text
# unix 系默认的可执行文件，必须输入完整文件名
vue-cli-service

# windows cmd 中默认的可执行文件，当我们不添加后缀名时，自动根据 pathext 查找文件
vue-cli-service.cmd

# Windows PowerShell 中可执行文件，可以跨平台
vue-cli-service.ps1
```

## npm 常用命令

1. 查看当前版本号 `npm -v`, 而执行 `npm version` 会输出 node 相关的版本信息。

   ```json
   {
     "npm": "8.19.2",
     "node": "16.15.1",
     "v8": "9.4.146.24-node.21",
     "uv": "1.43.0",
     "zlib": "1.2.11",
     "brotli": "1.0.9",
     "ares": "1.18.1",
     "modules": "93",
     "nghttp2": "1.47.0",
     "napi": "8",
     "llhttp": "6.0.4",
     "openssl": "1.1.1o+quic",
     "cldr": "40.0",
     "icu": "70.1",
     "tz": "2021a3",
     "unicode": "14.0",
     "ngtcp2": "0.1.0-DEV",
     "nghttp3": "0.1.0-DEV"
   }
   ```

2. 快速初始化生成 package.json：`npm init -y`

   ```json
   {
     "name": "eslint",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC"
   }
   ```

   初始化 package.json 时的字段默认值是可以自己配置的，以用下面的命令去修改默认配置：

   ```text
   npm config set init.author.email "xxx@xx.com"
   npm config set init.author.name "xxx"
   npm config set init.author.url "http://github.com/xxx"
   npm config set init.license "MIT"
   npm config set init.version "0.1.0"
   ```

## 相关文章

1. [【掘金】三面面试官：运行 npm run xxx 的时候发生了什么？](https://juejin.cn/post/7078924628525056007)
