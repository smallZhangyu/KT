// 用于 react，typescript项目开启相关的校验
module.exports = {
  // root 设置为true，eslint 查找到该配置就不再向上查找其他的eslint配置了
  root: true,
  // env 指定环境提供的预定义的全局变量，可用的环境有参考：https://zh-hans.eslint.org/docs/latest/user-guide/configuring/language-options
  env: {
    browser: true,
    node: true,
    es2021: true, // 添加所有 ECMAScript 2021 的全局变量，并自动将解析器选项 ecmaVersion 设置为 12
  },
  // globals 用于指定全局变量，也可以用字符串'off'设置某个全局变量禁止使用
  globals: {
    val1: 'writable',
    val2: 'readonly',
    Promise: 'off', // 在一个环境中，可以使用大多数 ES2015 全局变量，但不可以使用 Promise，那么你就可以使用这个配置
  },
  /**
   * extends 用于继承另一个配置文件的所有特征（包括规则、插件和语言选项）并修改所有选项。
   * 可以省略配置名称中的 eslint-config- 前缀。如 airbnb 会被解析为 eslint-config-airbnb。
   */
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  // overrides 用于覆盖/禁用一组文件的规则
  overrides: [
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  /**
   * parser 指定解析器，默认使用espree作为解析器。
   * 这些解析器与eslint兼容，
   * 1. esprima，
   * 2. @babel/eslint-parser（使 Babel 解析器与 ESLint 兼容的的包装器），
   * 3. @typescript-eslint/parser（一个将 TypeScript 转换为与 ESTree 兼容的形式的解析器，因此它可以在 ESLint 中使用）
   */
  parser: 'esprima',
  /**
   * parserOptions 指定解析器选项，默认情况下，ESLint 希望使用 ECMAScript 5 语法。
   * 设置解析器选项有助于 ESLint 确定解析错误是什么。
   * 所有的语言选项默认为 false。
   */
  parserOptions: {
    // ecmaVersion 设置为 3、5（默认）、6、7、8、9、10、11、12 或 13，以指定你要使用的 ECMAScript 语法的版本。你也可以设置为 2015（6）、2016（7）、2017（8）、2018（9）、2019（10）、2020（11）、2021（12）或 2022（13）来使用基于年份的命名。你也可以设置 lastest 来使用受支持的最新版本。
    ecmaVersion: 'latest',
    // sourceType 设置为 "script"（默认值）或 "module"（如果代码是 ECMAScript 模块）
    sourceType: 'module',
    // ecmaFeatures 表示你想使用哪些额外的语言特性的对象
    ecmaFeatures: {
      globalReturn: true, // 允许全局范围内的 return 语句
      impliedStrict: true, // 启用全局严格模式（如果 ecmaVersion 是 5 或更高版本）
      jsx: true, // 启用 JSX
    },
  },
  /**
   * plugins 是由插件名称组成的列表。
   * 可以省略插件名称中的 eslint-plugin- 前缀。
   */
  plugins: ['react', 'a-plugin'],
  /**
   * 插件可以提供处理器。
   * processor 可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对 JavaScript 代码进行提示，或者处理器可以在预处理中转换 JavaScript 代码以达到某些目的。
   * 要为特定类型文件指定处理器，可以一起使用 overrides 键和 processor 键。例如，下面使用处理器 a-plugin/markdown 来处理 *.md 文件。
   * {
   * "plugins": ["a-plugin"],
   * "overrides": [
   *     {
   *         "files": ["*.md"],
   *         "processor": "a-plugin/markdown"
   *     }
   *   ]
   * }
   */
  processor: 'a-plugin/a-processor',
  // rules 属性可以做以下任何事情来扩展（或覆盖）规则集：
  rules: {
    semi: ['error', 'always'],
  },
  // noInlineConfig 用于禁用所有内联配置注释
  noInlineConfig: true,
  // reportUnusedDisableDirectives 用于报告未使用的 eslint-disable 注释
  reportUnusedDisableDirectives: true,
  // 使用 ignorePatterns 来告诉 ESLint 忽略特定的文件和目录。在 .eslintignore 中定义的模式优先于配置文件的 ignorePatterns 属性。
  ignorePatterns: ['temp.js', '**/vendor/*.js'],
};
