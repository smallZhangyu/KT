# Typescript 语法

[TOC]

## 基础语法

### 基础数据类型

分为七类：string，number，boolean，null，undefined，symbol，bigint

```ts
// 字符串
const q: string = 'string';

// 数字
const w: number = 1;

// 布尔值
const e: boolean = true;

// null
const r: null = null;

// undefined
const t: undefined = undefined;

// symbol
let s: symbol = new Symbol();

// bigint
let b: bigint = 1n;
```

### 对象类型

分为三类：[], {}, function(){}

#### [] 类型

```ts
// 写法一：类型[]
let a: number[] = [1, 2, 3];
let a: (number | string)[] = [1, 2, 3, 'hello'];

// 写法二(泛型写法)：Array<类型>
let a: Array<number> = [1, 2, 3];
let a: Array<number | string> = [1, 2, 3, 'hello'];

// 类型+[]的表示
type IArr1 = number[];

// 泛型表示
type IArr2 = Array<string | number | Record<string, number>>;
// Record<string, number> -> {[x:string]: number}

// 元组表示
type IArr3 = [number, number, string, string];

// 接口表示
interface IArr4 {
  [key: number]: any;
}

const arr1: IArr1 = [1, 2, 3, 4, 5, 6];
const arr2: IArr2 = [1, 2, '3', '4', { a: 1 }];
const arr3: IArr3 = [1, 2, '3', '4'];
const arr4: IArr4 = ['string', () => null, {}, []];
```

#### 元组

元组和数组的区别就是元组下元素的个数和类型在声明时候就已经一一确定了，不能修改。

```ts
let a: [number, string, boolean] = [12, 'hell', true];
```

#### {} 类型

```ts
// 写法一：interface，大写的I用来进行表明这是一个接口
interface IByte {
  // 使用readonly表明这个属性是只读的，-readonly表示取消readonly
  readonly jobId: number;
  name: string;
  sex: 'man' | 'woman';
  age: number;
  // 使用?表明这个属性是可选的，-?表示取消可选
  hobby?: string;
  // 索引签名： 约束所有对象属性都必须是该属性的子类型
  [key: string]: any;
}

// 写法二：type 类型别名
type Byte = {
  username: string;
  age?: number;
  [index: string]: any;
};
```

#### 函数类型

TS 中实参的个数和形参的个数必须相同。

```ts
// 方式一：
interface IMult {
  (x: number, y: number): number;
}
const mult: IMult = (x, y) => x * y;

// 方式二：
function add(x: number, y: number): number {
  return x + y;
}
// 方式三：不推荐
const mult: (x: number, y: number) => number = (x, y) => x * y;

// 方式四：可调用注解，可针对函数重载进行类型注解的
type A = {
  (): void;
};
```

函数重载，对于动态参数的函数，可以使用下边的方式定义多个。

```ts
function foo(n1: number):any
function foo(n1: number, n2: number):any
function foo(n1: number, n2: number, n3: number):any

function foo(n1, n2?, n3?, n4?){
  ...
}
type A = {
    (n1:number): any;
    (n1:number, n2: number): any;
    (n1:number, n2: number, n3: number): any;
}
// 此处A需要使用可调用注解的方式进行注解
const a:A = foo;
```

### TS 的新增类型

分为五类：any，never，void，unknown，enum

```ts
// never，是永不存在值的类型
function throwError(message: string): never {
  throw new Error(message);
}

// 任意类型any，是所有类型的子类型，不会进行检测
type IAnyType = any;

// unknown，是any的一种安全类型，默认会进行检测，推荐使用
let a:unknown = 'hello';
a = 123;
a.map(item=> {..}) // 此处 a是unknown类型，使用map()会进行检测提示，如果是any类型则不会
(a as []).map(() => {}) // 通过as进行类型断言，这样就可以通过编译了

// 空类型void，表示无赋值
type IEmptyFunction = () => void;

// 枚举类型enum： 支持枚举值到枚举名的正反向映射
// enum里的数据是只读的，const enum 会在编译时只保留实际使用的enum值
enum EnumExample {
  add = '+',
  mult = '*',
}
EnumExample['add'] === '+';
EnumExample['+'] === 'add';

// 泛型
type INumArr = Array<number>;
```

### TS 泛型

泛型是指在定义函数、接口或者类时，不预先指定具体的类型，而在运行的时候再传入指定类型的一种特性。

```ts
// 推荐写法
type IGetRepeatArr = <T>(target: T) => T[];
// 不推荐的写法
type IGetRepeatArr = (target: any) => any[];

// 泛型接口 & 多泛型
interface IX<T, U> {
  key: T;
  val: U;
}
type IA<T|U> = T|U;

// 泛型默认值
type IB<T = string> = T;
let a: IB = 'hello';
let b: IB<number> = 789;
let c: IB<boolean> = true;

// 泛型类，！表示告诉TS该属性不为空
class IMan<T> {
  instance!: T;
}
let f = new IMan<string>();
f.instance = 'hello';
class Baz extends IMan<string>{}
let f2 = new Baz();

// 泛型别名
type ITypeArr<T> = Array<T>;

// 泛型约束<T extends string>：限制泛型必须符合字符串
type IGetRepeatStringArr = <T extends string>(target: T) => T[]; // 限制T必须为string类型

//  泛型参数默认类型<T = number>
type IGetRepeatArr<T = number> = (target: T) => T[];
```

泛型工具类型-基础操作符

1. typeof，获取类型
2. keyof，获取所有键值
3. in，遍历枚举类型
4. T[K]，索引访问
5. extends，泛型约束

### 字符串/数字字面量类型，keyof 关键字

```ts
// 允许指定字符串/数字必须的固定值
type IDomTag = 'html' | 'body' | 'div' | 'span';
type IOddNumber = 1 | 3 | 5 | 7 | 9;

interface A {
  name: string;
  age: number;
}
// keyof A -> 'name'|'age'
let a: keyof A = 'name'; // 此时a的值只能是name或者age

let obj = {
  name: 'jeff',
  age: 32,
};
type aaa = typeof obj; // aaa -> {name:string, age:number}
type sss = keyof typeof obj; // sss -> 'name'|'age'
```

### 类

写法和 JS 差不多，增加了一些定义：  
增加了 public、private、protected 修饰符；  
抽象类：只能被继承，不能被实例化；作为基类，抽象方法必须被子类实现；
interface 约束类，使用 implements 关键字。

```ts
interface IA<T> {
  username: T;
  age: number;
  showName(n: T): T;
}
class CFoo implements IA<string> {
  username: string = 'xiao';
  age: number = 32;
  showName(n: string): string {
    return n;
  }
}
class CBoo extends CFoo {}
let bbb = new CBoo();
```

### 类型收窄(类型保护)

```ts
// 1. 通过 typeof / instanceof 语法
function foo(param: string | number) {
  if (typeof param === 'string') {
    param.toUpperCase();
  }
}

class Foo {
  name = 'xiaoxiao';
}
class Bar {
  age = 20;
}

function ss(n: Foo | Bar) {
  if (n instanceof Foo) {
    n.name;
  }
}

// 2. 通过 in 语法
type Fish = {
  swim: () => {};
};
type Bird = {
  fly: () => {};
};
function test(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }
  return animal.fly();
}
// 3. 自定义的判断方法，可以通过 is 语法断言返回值
function isFish(animal: Fish | Bird): animal is Fish {
  if ((animal as Fish).swim !== undefined) {
    return true;
  }
  return false;
}
function test2(animal: Fish | Bird) {
  if (isFish(animal)) {
    return animal.swim(); // 如果isFish()不加:animal is Fish，此处就编译不过
  }
  return animal.fly();
}
```

## 高级类型

### 联合/交叉类型

联合类型：A | B; 表示一个值可以是 A|B 类型之一
交叉类型：A & B; 多种类型叠加到一起成为一种类型，它包含了所需的所有类型的公有特性。

```ts
type IBook = Array<
  {
    author: string;
  } & (
    | {
        type: 'history';
        range: string;
      }
    | {
        type: 'story';
        theme: string;
      }
  )
>;
let book: IBook = [{ author: 'jeff', type: 'history', range: 'range0' }];
```

### 映射类型(用于做循环操作的场景)

可以将已知类型的每个属性都变为可选的或者只读的。

> 映射类型只能通过类型别名 type 实现。

```ts
type A = {
  name: string;
  age: number;
};
type B<T> = {
  readonly [P in keyof T]: T[P];
};
type C = B<A>;
```

### 条件类型和 infer 关键字（用于做条件判断的场景）

条件类型使用 extends 进行判断，infer 关键字表示内部的推断

```ts
// type B = string;
type B = string extends string | number ? string : number;

type AA<T> = T extends Array<infer U> ? U : T;
type AB = AA<Array<number>>  // AB -> string
type AC = AA<string> // AC -> number

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function
```

### 类型别名 type、接口 interface 的区别

type 和 interface 都可以给类型起个别名。

相同点：  
都可以定义对象或函数；

差异点：

1. interface 是 TS 用来定义对象，type 是用来定义别名方便使用；
2. type 可以定义基本类型，interface 不行；

   ```ts
   type A = string;
   let a: A = 'hello';
   ```

3. interface 可以合并重复声明，type 不可以定义同名的声明；

   ```ts
   interface A {
     username: string;
   }
   interface A {
     age: number;
   }
   // a 此时必须username、age 2个属性同时存在
   let a: A = {
     username: 'jeff',
     age: 32,
   };
   ```

4. interface 具备继承能力，使用 extends， type 不支持

   ```ts
   interface A {
     name: string;
   }
   interface B extends A {
     age: number;
   }
   let stu: B = {
     name: 'jeff',
     age: 32,
   };
   ```

5. type 具备映射类型，interface 不支持

   ```ts
   type B = {
     [P in 'username' | 'age']: string;
   };
   // 等价于如下
   type B = {
     username: string;
     age: string;
   };
   ```

## 内置的工具类型

```ts
// 内置工具类型
type A = {
  name: string;
  age: number;
  gender: string;
};
// Readonly 将A所有的属性变为只读返回
type B = Readonly<A>;

// Partial 将A所有的属性变为可选返回
type C = Partial<A>;

// Pick 将A中挑选指定的name、age属性变返回
type D = Pick<A, 'name' | 'age'>;

// Record 将A中所有的属性变为string类型
type E = Record<keyof A, 'string'>;

// Required 将C中所有的属性变为必填返回
type F = Required<C>;

// Omit 从A中排除指定的属性后将剩余的属性返回
type G = Omit<A, 'name' | 'age'>;

// Exclude<T, U> 从T中排除U中包含的属性，T不在U中的类型
type H = Exclude<string | number | boolean, string | boolean>; // type H = number;

// Extract<T, U> 获取T, U中共同的类型
type I = Extract<string | number | boolean, string | boolean>; // type I = string | boolean;

// NonNullable<T> 返回 T 中不为null，undefined的类型
type J = NonNullable<string | null | boolean | undefined>; // type J = string | boolean;

// Parameters<T> 将函数参数转为一个元组类型
type Foo = (n: number, m: string) => void;
type K = Parameters<Foo>; // type K = [n: number, m: string]

// ReturnType<T> 获取函数返回值的类型
type L = ReturnType<Foo>; // type L =void
```
