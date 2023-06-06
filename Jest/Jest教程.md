# Jest 教程

## Jest 简介

Jest 是 Fackbook 开源的一款优雅、简洁的 JavaScript 测试框架。Jest 支持 Babel、TypeScript、Node、React、Angular、Vue 等诸多框架！

## Jest 相关命令

1. `jest --init` 该命令执行 node_modules/.bin 目录下的 jest 命令，将 jest 的的默认配置生成在当前目录下，生成 `jest.config.js`；
2. `jest --coverage` 执行该命令会在窗口输出当前的 test 覆盖率报告，同时会在当前目录下生成 coverage 文件夹，可以在浏览器里显示报告页面；
3. `jest --watchAll` 监听所有的文件，任意文件保存之后所有文件执行 test；
4. `jest --watch` 监听文件的变化，只对修改的文件执行 test，需结合 git 工具使用；
5. Jest 的命令行工具不同参数对应的模式

   ```md
   a 对所有的文件执行测试 (--watch 时出现, p/o 模式下也出现)
   f 只对测试失败的文件执行测试
   o 只对修改的文件执行测试 (--watchAll 时出现)
   p 通过文件名来进行过滤测试
   t 通过 test name 来进行过滤测试
   q 退出监听模式
   Enter 对当前的测试直接再重新执行一次
   ```

## Jest 的相关的配置

[官方的配置说明文档地址](https://jestjs.io/zh-Hans/docs/configuration)

```js
export default {
  // roots：定义Jest 从哪些路径列表中搜索用于测试的文件
  roots: ['<rootDir>/src'],

  // clearMocks: 每次测试执行前自动清除mock数据等（Automatically clear mock calls, instances, contexts and results before every test）
  clearMocks: true,

  // collectCoverage: 用于设置当测试执行时是否开启测试覆盖信息的收集。注意：开启后测试速度会变慢。（Indicates whether the coverage information should be collected while executing the test）
  collectCoverage: true,

  // collectCoverageFrom: 指定从哪些文件统计测试覆盖率
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  // coverageDirectory: 指定测试覆盖率信息的存放目录（The directory where Jest should output its coverage files）
  coverageDirectory: 'coverage',

  setupFiles: ['react-app-polyfill/jsdom'],

  // setupFilesAfterEnv: 将指定的配置文件，在安装测试框架之后，执行测试代码本身之前运行，这样我们就不需要每个单测文件都单独导入一次 @testing-library/jest-dom 了。
  setupFilesAfterEnv: [
    '<rootDir>/jest-dom-setup.js',
    '<rootDir>/src/setupTests.ts',
  ],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  modulePaths: [],

  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  // 在每次test用例执行前自动重置 mock state（Automatically reset mock state before every test）
  resetMocks: true,
};
```

## Jest 结合使用的库

Jest 作为基础测试框架，还需要其他的辅助库来测试 Dom 和事件模拟场景。两个主流的辅助库有 Enzyme 和 React Testing Library。

Enzyme 允许访问组件的内部工作原理。我们可以读取和设置状态，并且可以模拟子项，以使测试运行得更快。所以 Enzyme 的单元测试是基于 component 的 props 展开的，是从代码逻辑的层面验证组件。

而 React Testing Library 采取完全不同的单测思路，它并不在意组件实现的细节，它的测试将基于组件能力本身，从用户视角去进行测试。

Enzyme 提供的能力让我们从组件逻辑细节来展开单测，对于需求频繁变动的场景，这是一种脆弱的单测，可能会需要开发人员频繁修改单元测试。而 React Testing Library 并不在意组件实现的细节，是从组件能力本身去展开测试，这样对于代码组件层面的重构和优化，只要最后功能相同，单测将都可以复用，更适合业务场景。

### Enzyme

1. `enzyme`：基础库。
2. `enzyme-adapter-react-xxx`：对 React 的适配器，需要安装对应 React 版本的适配器。目前官方最新的适配 react 16 版本，再高版本的由于官方没人开发维护了，为开发者个人开发的，稳定性不能保证；
3. `jest-enzyme`：用于 enzyme 对 Jest 的环境适配。

### React Testing Library

1. `@testing-library/jest-dom`：用于 dom、样式类型等元素的选取。
2. `@testing-library/react`：提供针对 React 的单测渲染能力。
3. `@testing-library/user-event`：用于单测场景下事件的模拟。
4. `@testing-library/react-hooks`: 用于 React hooks 的组件渲染。renderHook 并没有帮我们触发 rerender，所以对于会修改到 state 的方法，我们需要手动将它们用 `act` 包裹起来触发 rerender。

### 结合 TypeScript 使用需要依赖的包

1. `@types/jest`
2. `@jest/types`
3. `ts-node` 如果是使用 jest.config.ts 格式配置文件的话，需要额外添加这个包
4. `ts-jest` Babel 对 Typescrip 的支持是纯编译形式（无类型校验），因此 Jest 在运行测试时不会对它们进行类型检查。如果需要类型校验，可以改用 `ts-jest`，也可以单独运行 TypeScript 编译器 tsc （或作为构建过程的一部分）。

### 结合 Babel 使用需要依赖的包

1. `babel-jest`，babel-jest 在安装 jest 时会自动安装，如果项目中存在 babel 配置，它会自动转换文件。如果要避免这个行为，你可以显式的重置`transform`使改变配置项：

   ```js
   // jest.config.js
   module.exports = {
     transform: {},
   };
   ```

2. `@babel/core`
3. `@babel/preset-env`
4. `@babel/preset-react`
5. `@babel/preset-typescript`

### jest 自身的依赖包

1. `jest-environment-jsdom` 这个包在 jest 28 版本开始不会默认下载了，需要单独安装

### 其他依赖

1. `identity-obj-proxy` CSS 代理：Jest 本身不知道如何处理不同扩展的文件，我们可以通过配置代理的方式，告诉 Jest 将此对象模拟为导入的 CSS 模块。

   ```js
   // // jest.config.ts
   moduleNameMapper: {
    "\.(css|less)$": "identity-obj-proxy" // 有使用 sass 需求把正则换成 ^\.(css|less|sass|scss)$
   }
   ```

2. 额外的扩展名识别，因为 Jest 不使用 Webpack 等打包工具，不知道如何加载 js/jsx 之外的其他文件扩展名，可以加一个转换器

   ```js
   // jest.config.ts
    export default {
      transform: {
        "^.+\.(js|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\.svg$": "<rootDir>/svg-transform.js"
      }
    }

    //.svg-transform.js
    export default {
      process(){
        return {code: "module.exports = {};"}
      },
      getCacheKey(){
        return 'svgTransform'; // SVG 固定返回这个字符串
      }
    }
   ```

## jest 执行的流程

1. npm run jest
2. jest (jest 内部集成了 babel-jest 这个插件)
3. babel-jest 会检测是否安装有 babel-core
4. 读取 .babelrc 配置
5. 在运行测试之前，结合 babel，先把代码做一次转化
6. 运行转化过的测试用例代码

## 使用 CRA 创建一个 typescript 的 jest 测试项目

`npx create-react-app project_name --template typescript` 使用 CRA 创建的 jest 项目，已经集成了相关的 babel、typescript、react testing library 等包的设置，不需要再手动添加了。

## 测试技巧

1. 如果测试失败，第一件要检查的事就是，当仅运行这条测试时，它是否仍然失败。 临时用 `test.only()` 去代替 `test()` 去测试当前这条错误的用例。
2. 如果你有一个测试，当它作为一个更大的用例中的一部分时，经常运行失败，但是当你单独运行它时，并不会失败，所以最好考虑其他测试对这个测试的影响。 通常可以通过修改 `beforeEach` 来清除一些共享的状态来修复这种问题。 如果你不确定是否有共享的状态被修改，你也可以试着在 `beforeEach` 里打印 logs 数据来判断。

## 注意点

1. 如果 package.json 里是 type: module 的话，babel 的配置文件后缀格式应该改为 babel.config.cjs
