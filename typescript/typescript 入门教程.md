# TypeScript 入门教程

[TOC]

## TypeScript 的特点

静态类型  
可读性增强：基于语法解析 TSDoc，ide 增强；  
可维护性增强：在编译阶段暴露大部分错误；

JS 的超集，包含于兼容所有 JS 特性，支持共存，支持渐进式引入与升级

TS 默认是全局环境，只要文件使用模块化操作，那么就会变成局部环境。

## typescript 的常用命令

1. 全局安装`npm i -g typescript`;
2. 手动编译`tsc xxx.ts -w`， -w 表示开启监听模式，文件变化保存后自动编译；
3. 项目进行 ts 初始化`tsc --init`，会生成 `tsconfig.json` 文件。

## typescript 的术语

1. **类型注解**，是指手动指定某个变量的类型，如 `let a:string = 'hello'`;
2. **类型推断**，是指不手动指定变量的类型，让 ts 根据值自己推断，如 `let a = 'hello'`，变量 a 会给推断为是一个字符串类型；
3. **联合类型**，类型之间进行或的操作，如 `let a:string|number = 'hi'`;
4. **交叉类型**，类型之间进行与的操作，通常用于对象类型，如

   ```ts
   type A = {
     username: string;
   };
   type B = {
     age: number;
   };
   let a: A & B = { username: 'xiaoMing', age: 8 };
   ```

5. **类型断言**，用于当 Typescript 推断出来的类型并不满足你的需求，此时需要手动指定一个类型，使用 as 指定，如 `(a as []).map(() => {}))`；
6. **非空断言**，用于告诉 ts 该变量是有值的，编译通过，使用 ! 标注，`let a:string|undefined = undefined; a!.length`

## 声明文件 xxx.d.ts

### 声明文件的作用

当在 ts 文件中引入一个第三方的 js 模块，如果没有声明文件，ts 文件中导入 js 模块就报 ts 编译错误。用于 js 模块文件在 ts 文件中导入使用。

```ts
// index.d.ts
export declare function foo(n: number): void;
```

该声明文件可以自动生成，只要在`tsconfig.json`里配置`"declaration": true`，即可在 ts 代码编译的时候自动生成。

### @types 和 DefinitelyTyped 仓库

`DefinitelyTyped`是一个高质量的 TypeScript 类型定义仓库。  
通过`@types`方式来安装常见的第三方 JS 库的声明适配模块。  
比如 jQuery 库本身就没有 d.ts 声明文件，可以安装`@types/jquery`就可以在 ts 文件中使用 jQuery 了。

### lib.xxx.d.ts 和 global.d.ts

lib.xxx.d.ts 是安装 typescript 时，ts 内置的声明文件；存放路径`E:\Program Files (x86)\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib`;
![TS内置声明文件库](./assets/typescript%20内置声明文件.png)

global.d.ts 是用来我们扩展 lib.xxx.d.ts 时的全局声明文件。

## 教程资料

1. [TS 开源教程及应用 Awesome Typescript](https://github.com/dzharii/awesome-typescript#tools);
2. [Typescript playground](https://www.typescriptlang.org/play);
3. [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped);
4. []();
