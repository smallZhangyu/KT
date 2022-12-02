# eslint learning

## 项目添加 eslint 的流程

### 方式一

1. 添加 eslint 到 devDependencies，`npm install -D eslint`;
2. scripts 里添加一条自动生成.eslintrc.js 的脚本`"eslint-init": "eslint --init",`，执行`npm run eslint-init`，开始交互式选择支持的 eslint 方式;（这块使用的是 npm script 的方式生成.eslintrc.js，如果在 cmd 里直接执行`eslint --init`，需要全局安装 eslint；如果只在项目里安装了 eslint，需要执行`./node*modules/.bin/eslint --init`，**windows 下 cmd 模式执行该语句会报错，.不是一个全局命令，不过在 powershell 模式下可以执行，或者通过 git bash 也是可以执行的**）
3. 使用`eslint src/*` 去校验，加参数`--fix` 自动去修复。

### 方式二

1. 使用`npm init @eslint/config`命令直接安装并配置 ESLint（相当于方式一中的 1，2 步）
2. 使用`eslint src/*` 去校验，加参数`--fix` 自动去修复。

## 如果在同一目录下存在多个配置文件，ESLint 将按照以下优先顺序以此使用其一

1. .eslintrc.js
2. .eslintrc.cjs
3. .eslintrc.yaml
4. .eslintrc.yml
5. .eslintrc.json
6. package.json - 在 package.json 文件中创建 eslintConfig 属性并在那里定义你的配置。

> ESLint 会自动要检查文件的目录中寻找它们，并在其直系父目录中寻找，直到文件系统的根目录（/）、当前用户的主目录（~/）或指定 root: true(配置中的 root 参数) 时停止。

## 完整的配置层次，从高到低的优先级，如下所示

1. 内联配置：

   ```text
   /* eslint-disable */ 和 /* eslint-enable */
   /* global */
   /* eslint */
   /* eslint-env */
   ```

2. 命令行选项（或 CLIEngine 等价物）：

   ```text
   --global
   --rule
   --env
   -c, --config
   ```

3. 项目级配置：

   ```text
   .eslintrc.*或 package.json 文件与 linted 文件在同一目录下
   继续搜索祖先目录中的 .eslintrc.* 和 package.json 文件，直到包括根目录，或者找到"root": true 的配置。
   ```

## 使用配置注释

1. 当前文件禁用 eslint

   ```js
   /* eslint-disable */

   alert('foo');
   ```

2. 当前行禁用 eslint

   ```js
   alert('foo'); // eslint-disable-line
   ```

3. 下一行禁用 eslint

   ```js
   /* eslint-disable-next-line */
   alert('foo');
   ```

4. 配置注释可以包括说明，以解释为什么注释是必要的。**描述必须在配置之后，并且需要用两个或多个连续的 - 字符与配置分开**

   ```js
   // eslint-disable-next-line no-console -- Here's a description about why this configuration is necessary.
   console.log('hello');

   /* eslint-disable-next-line no-console --
    * Here's a very long description about why this configuration is necessary
    * along with some additional information
    **/
   console.log('hello');
   ```

> [更多使用方法可参考官网文档](https://zh-hans.eslint.org/docs/latest/user-guide/configuring/rules)

## 使用配置文件的方式禁用 eslint

要在配置文件中禁用一组文件的规则，请使用 overrides 键和 files 键。比如：

```json
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

## 忽略特定的文件和目录

1. 方式一：新增一个`.eslintignore`文件类配置；
2. 方式二：在 eslint 配置中通过 ignorePatterns 属性来设置；

> 在 .eslintignore 中定义的模式优先于配置文件的 ignorePatterns 属性。

## 相关链接

1. [eslint 官网文档](https://zh-hans.eslint.org/docs/latest/user-guide/getting-started)
