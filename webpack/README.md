# webpack learning

## 插件的功能

## loader 的功能

1. 样式的处理
   style-loader：将 css 以 style 的形式输出的 header 里
   css-loader: 将 import 的 css 文件读取
   postcss-loader: css 浏览器兼容的工具
   less-loader: less 编译的处理

   ```js
    {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
    },
    {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader']
    }
   ```

## 注意点

1. loader 的执行顺序是：从后往前执行
