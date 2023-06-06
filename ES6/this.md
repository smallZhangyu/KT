# JavaScript 中的 this

## 什么是 this

当一个函数被调用时，会创建一个活动记录（也叫执行上下文）。这个记录包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this 就是这个记录中的一个属性，在函数执行的过程中会用到。

this 是在函数被调用时绑定的，它指向什么完全取决于函数在哪里被调用。因此需要考虑函数调用时的执行上下文，执行上下文取决于函数调用时的各种条件。

> **this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。所以 this 既不指向函数自身，也不指向函数的词法作用域。**
> 但是在箭头函数里，因为箭头函数里没有自身的 this，所以 this 是通过词法作用域查找继承于外层对象的 this。

## 为什么要使用 this？

随着使用模式越来越复杂，**显示传递**上下文对象会让代码变得越来越混乱，而使用 this 则不会这样。**this 可以隐式传递**一个对象引用，因此可以将 API 设计的更加简洁并且易于复用。

```js
// 不使用this，需要显示的传递上下文对象
function identify(content) {
  return content.name.toUpperCase();
}

function speak(content) {
  console.log('Hello, My name is ', identify(content));
}

var zhangsan = {
  name: 'zhangSan',
};

var lisi = {
  name: 'liSi',
};

speak(zhangsan); // Hello, My name is ZHANGSAN
identify(lisi); // LISI
```

```js
// 使用this的话，隐式传递上下文对象，简化API设计，更加易用
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  console.log('Hello, My name is ', identify.call(this));
}

var zhangsan = {
  name: 'zhangSan',
};

var lisi = {
  name: 'liSi',
};

speak.call(zhangsan); // Hello, My name is ZHANGSAN
identify.call(lisi); // LISI
```

## 函数调用执行时，this 的几种绑定规则

1. 默认绑定

   默认绑定是指一个**函数的调用不带任何修饰**，在非严格模式下，会把 this 绑定到全局对象，在严格模式下，则会把 this 绑定到 undefined 上，代码执行返回 _Uncaught TypeError: Cannot read properties of undefined (reading 'b')_ 的报错。

   > 注意：严格模式与否是指**函数体**是否在严格模式，而不是函数的调用位置。所以严格模式下的调用不会影响默认绑定。

   ```js
   function gg() {
     console.log(this.b);
   }
   var b = 123;

   (function () {
     'use strict';
     gg(); // 这种严格模式下的调用，不会影响默认绑定，结果是 123
   })();
   ```

2. 隐式绑定

   隐式绑定是指函数调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。

   ```js
   function aLogger() {
     console.log(this.a);
   }

   var obj = {
     a: 3,
     logger: aLogger, // 无论函数aLogger是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象
   };

   var a = 2;

   obj.logger(); // 3
   ```

   > 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。比如下面代码

   ```js
   function foo() {
     console.log(this.a);
   }
   var obj1 = {
     a: 1,
     foo: foo,
   };
   var obj2 = {
     a: 2,
     obj1: obj1,
   };

   obj2.obj1.foo(); // 结果为 1，只有属性引用链的最后一层在调用位置中起作用
   ```

   但是隐式绑定也有它的问题 —— **被隐式绑定的函数会丢失绑定对象，从而应用默认绑定的规则。**

   场景一：当我们把对象里的方法赋值给一个全局变量时，这种绑定就消失了。比如下面的例子中，我们给 objLogger 赋值 obj.logger，结果 this 引用的就是全局中 a 的值。

   ```js
   function logger() {
     console.log(this.a);
   }

   var obj = { a: 3, logger: logger };

   var a = 2;

   var objLogger = obj.logger;
   objLogger(); // 2
   ```

   场景二：被调用函数作为参数传入，执行回调函数时。(不论是自己声明的函数，还是 js 内置的函数(比如 setTimeout 等)，都是这样)

   ```js
   function foo() {
     console.log(this.a);
   }

   function doFoo(fn) {
     fn();
   }

   var obj = {
     a: 'obj',
     foo: foo,
   };

   var a = 'global';

   doFoo(obj.foo); // global

   setTimeout(obj.foo, 2000); // global
   ```

3. 显示绑定

   使用的是 call 或者 apply。通过这种方式，我们可以强行使 this 等于 obj。

   JavaScript 提供的绝大多数函数和我们自己创建的所有函数都可以使用 call 和 apply 方法。它们的第一个参数是一个对象，是给 this 准备的，接着在调用函数时将其绑定到 this。

   ```js
   function logger() {
     console.log(this.a);
   }

   var obj = {
     a: 3,
   };

   logger.call(obj); // 3
   ```

   这种显式绑定也不能完全解决问题，它也会产生一些副作用，比如在通过 wrapper 包装的 new String，new Boolean 或 new Number 的时候，这种绑定就会消失。

4. 硬绑定（显示绑定的变种）

   硬绑定的典型应用场景就是创建一个包裹函数，负责接受参数并返回值：

   ```js
   function foo(something) {
     console.log(this.a, something);
     return this.a + something;
   }

   var obj = {
     a: 2,
   };
   var bar = function () {
     return foo.apply(obj, arguments);
   };

   var b = bar(3); // 2 3
   console.log(b); // 5
   ```

   硬绑定是一种很常见的模式，所以 ES5 开始支持 Function.prototype.bind 方法来绑定，通过这种方式，无论后续我们怎么调用 hardBinding 函数，logger 都会把 obj 当做 this 来获取它的 a 属性的值。

   ```js
   function logger() {
     console.log(this.a);
   }
   var obj = { a: 3 };
   var a = 2;
   var hardBinding = logger.bind(obj);
   setTimeout(hardBinding, 1000); // 3
   hardBinding.call(window); // 3，因为硬绑定之后的不能再修改它的this
   ```

   > 硬绑定之后的不能再修改函数的 this。
   > bind()会返回一个硬编码的新函数，它会把指定的参数设置为 this 的上下文并调用原始函数。

5. new 绑定

   使用 new 创建一个新的实例的时候，this 就指向这个新的对象。

   ```js
   function logger(a) {
     this.a = a;
     console.log(this.a);
   }

   var loggerA = new logger(2); // 2
   ```

   > JS 中的 new 的机制实际和面向类的语言完全不同。
   > 在 JS 中，构造函数只是一些使用 new 操作符时会被调用的普通函数。它们不属于某个类，也不会实例化一个类。

   > 使用 new 来调用函数（或者说发生构造函数调用时），会自动执行以下操作。

   1. 创建一个全新的对象；
   2. 这个新对象会被执行[[Prototype]]连接；
   3. 这个新对象会绑定到函数调用的 this；
   4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

> 用 new 的好处是可以帮助我们忽略 hard binding，同时可以预设函数的实参。用 bind 的好处是任何 this 之后的实参，都可以当做是默认的实参。这样就可以用来创建柯理式中的部分应用。

```js
function fullFunc(x, y, z) {
  return x + y + z;
}

const partialFunc = fullFunc.bind(this, 1, 2);
partialFunc(9); // 12
```

## 几种绑定规则的优先级

判断函数 this 指向什么，首先应该找到函数的调用位置，然后判断应当应用哪条规则。同时命中多条规则时，它们的优先级从高到低如下：

1. new 绑定，this 绑定的是新创建的对象；
2. 显示绑定，fn.call(obj)、fn.apply(obj)、fn.bind(obj)，this 绑定的是指定的对象 obj；
3. 隐式绑定，this 绑定的是上下文对象；
4. 默认绑定，严格模式下，this 绑定到 undefined，非严格模式下，this 绑定到全局对象。

## 几种绑定的例外情况

1. 把 null 或者 undefined 作为 this 的绑定对象传入 call、apply、bind 方法时，这些值在调用时会被忽略，实际应用的是默认绑定规则。

   传入 null，忽略 this 的场景：

   ```js
   function foo(a, b) {
     console.log(`a: ${a}, b: ${b}`);
   }
   // 场景1. 使用apply()来展开一个数组，并把这些展开值作为参数传入一个函数。
   foo.apply(null, [1, 2]); // a: 1, b: 2, 相当于ES6中的...展开符，foo(...[1, 2])

   // 场景2. 使用bind()进行柯里化，预置一些参数
   var bar = foo.bind(null, 3);
   bar(4); // a: 3, b: 4
   ```

   总是使用 null 来忽略 this 会产生一些副作用，因为会应用默认绑定规则，把 this 绑定到全局变量，在一些第三方库的使用上会受到影响。更安全的一种方式是设置一个空对象（_Object.create(null)，比{}更空的对象_）作为 this。

   ```js
   function foo(a, b) {
     console.log(`a: ${a}, b: ${b}`);
   }

   var OO = Object.create(null); // Object.create(null) 并不会创建Object.prototype 这个委托，所以它比{}更空。

   // 场景1. 使用apply()来展开一个数组，并把这些展开值作为参数传入一个函数。
   foo.apply(OO, [1, 2]); // a: 1, b: 2, 相当于ES6中的...展开符，foo(...[1, 2])

   // 场景2. 使用bind()进行柯里化，预置一些参数
   var bar = foo.bind(OO, 3);
   bar(4); // a: 3, b: 4
   ```

2. 间接引用，常在赋值场景时发生，实际应用的是默认绑定规则。

   ```js
   function foo() {
     console.log(this.a);
   }
   var a = 2;
   var o = { a: 3, foo: foo };
   var p = { a: 4 };

   o.foo(); // 3
   (p.foo = o.foo)(); // 2, 此处的调用位置是foo()，this 绑定到全局变量
   ```

3. 软绑定

   软绑定是指给默认绑定指定一个全局对象和 undefined 以外的值，实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改 this 能力的一种操作。

   ```js
   if (!Function.prototype.softBind) {
     Function.prototype.softBind = function (obj) {
       var fn = this;
       // 捕获所有 curried 参数
       var curried = [].slice.call(arguments, 1);
       var bound = function () {
         return fn.apply(
           !this || this === (window || global) ? obj : this,
           curried.concat.apply(curried, arguments)
         );
       };

       bound.prototype = Object.create(fn.prototype);

       return bound;
     };
   }

   function foo() {
     console.log('name: ' + this.name);
   }
   var obj = { name: 'obj' };
   var obj2 = { name: 'obj2' };
   var obj3 = { name: 'obj3' };

   var fooOBJ = foo.softBind(obj);
   fooOBJ(); // name: obj，软绑定

   obj2.foo = foo.softBind(obj);
   obj2.foo(); // name: obj2, 隐式绑定

   fooOBJ.call(obj3); // name: obj3, 显示绑定

   setTimeout(obj2.foo, 10); // name: obj, 软绑定
   ```

## 注意事项

1. 通常为了代码的可读性和可维护性，在同一个函数中，应该一以贯之，要么尽量使用词法域，干脆不要有 this；或者要用 this，就通过 bind 等来绑定，而不是通过箭头函数或者 self = this 这样的“奇技淫巧”来做绑定。
2. 箭头函数不使用 this 的 4 种标准规则，而是根据外层（函数或者全局）作用域来决定 this 继承于哪个作用域。具体来说就是，箭头函数会继承外层函数调用的 this 绑定（无论 this 绑定到什么）。同时箭头函数的绑定无法修改。

   ```js
   function foo() {
     return (a) => {
       // this 继承自foo()的调用
       console.log(this.a);
     };
   }
   var obj1 = { a: 1 };
   var obj2 = { a: 2 };
   var bar = foo.call(obj1);

   bar.call(obj2); // 1,不是 2，因为箭头函数的 this 绑定继承自 foo.call(obj1), 且不能修改
   ```
