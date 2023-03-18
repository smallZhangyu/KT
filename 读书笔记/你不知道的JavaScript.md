# 你不知道的 JavaScript

## 词法作用域和动态作用域

1. JavaScript 是基于词法作用域的，不是动态作用域。
2. 词法作用域关注函数在何处声明，而动态作用域关注的函数是在何处调用（类似 this）。

   ```js
   // 在词法作用域下，foo()执行输出的结果是2，因为它是从声明时所处的全局作用域下查找的。
   function foo() {
     console.log(a); // 2
   }
   function bar() {
     var a = 3;
     foo();
   }
   var a = 2;
   bar();
   ```

## 函数作用域

1. 函数声明和函数表达式之间最重要的区别是他们的名称标识符将会绑定在何处。函数声明绑定在所在的作用域中，函数表达式绑定在自身函数中。
2. 在立即执行函数中，`(function foo(){..})`作为函数表达式，意味着 foo 只能在自身函数（..所代表的位置）中被访问，外部作用域不行。foo 变量名被隐藏在自身中意味着不会非必要地污染外部作用域。
3. 函数需要引用自身的例子： 1. 递归；2. 在事件触发后事件监听器需要解除自身。
4. 始终给函数表达式命名是一个最佳实践。

   ```js
   /**
    * 此处回调函数加了setTimeoutFun命名
    * 在执行报错时会提示Uncaught ReferenceError: val1 is not defined at setTimeoutFun (<anonymous>:2:17)，更好的定位报错出现setTimeoutFun中。
    * 如果使用匿名函数的话，提示信息为Uncaught ReferenceError: val11 is not defined at <anonymous>:2:17
    */
   setTimeout(function setTimeoutFun() {
     console.log(val);
   }, 0);
   ```

## 块作用域

1. with：用 with 从对象中创建出的作用域仅在 with 声明中而非外部作用域中有效。
2. try/catch：ES3 之后，catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。
3. let：let 关键字可以将变量绑定到所在的任意作用域中（通常是{..}内部）。let 为其声明的变量**隐式**地劫持了所在的块作用域。**使用 let 进行声明变量不会在块作用域中进行提升。**

   > 只要声明是有效的，在声明中的任意位置都可以使用{..}括号来为 let 创建一个用于绑定的块。

4. const：const 同样可以用来创建块作用域变量，但其值是固定的常量，不可修改。

## 提升

1. 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。

   ```js
   // 下面这个声明语句，在JavaScript中实际包含2个声明：var a;(定义声明是在编译阶段进行的)和 a=2;(赋值声明在代码执行阶段进行的)
   var a = 2;
   ```

   > 只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。

2. 函数声明会被提升，但是函数表达式却不会被提升。即使是具名的函数表达式，名称标识符 foo 在赋值前也无法在所在作用域中使用。

   ```js
    foo(); // 报错类型为：TypeError
    bar(); // 报错类型为：ReferenceError
    var foo = function bar(){
      ...
    };

    // 上面会被提升为下面的形式
    var foo;
    foo(); // 报错类型为：TypeError
    bar(); // 报错类型为：ReferenceError
    foo = function() {
      var bar = ...self...
      ...
    }
   ```

3. 函数声明和变量声明都会被提升。但函数会被首先提升，然后才是变量。有同名的函数和变量，变量名会被忽略掉。后面出现同名函数声明还是可以覆盖前面的。

   > 声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。

## 作用域闭包

1. 在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包。
2. 在 for 循环中，延迟函数的回调会在循环结束时才执行。
3. IIFE 会通过声明并立即执行一个函数来创建作用域。
4. 在 for 循环中，如果每次迭代都需要一个块作用域，可以通过以下 2 个方式处理：1. for 循环中变量 i 用 let 来声明；2. 使用 IIFE 来创建，i 作为参数传递进去。
5. 模块模式需要具备两个必要条件：

   1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）；
   2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

   > 一个具有函数属性的对象本身并不是真正的模块。一个从函数调用所返回的，只有数据属性而没有闭包函数的对象也并不是真正的模块。

## this

> 为什么要用 this？
> 随着使用模式越来越复杂，显示传递上下文会让代码变得越来越混乱，使用 this 则不会这样。this 提供了一种更优雅的方式来隐式“传递”一个对象的引用，可以将 API 设计得更加简洁并且易于复用。

1. this 既不指向函数自身，也不指向函数的词法作用域。
2. 使用 this 不可能在**词法作用域**中查到什么，每当你想要把 this 和词法作用域的查找混合使用时，一定要提醒自己。
3. this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、调用的方式、传入的参数等信息。**this 就是这个记录的一个属性，会在函数执行过程中用到。**
4. `foo.call(foo, i);` 使用 call(..)可以确保 this 指向函数对象本身.

   ```js
   var obj = {
     id: 'hello',
     fn: function () {
       setTimeout(function () {
         console.log(this.id); // world
       }, 100);
     },
   };
   var id = 'world';
   obj.fn();

   // 使用self = this
   var obj = {
     id: 'hello',
     fn: function () {
       var self = this;
       setTimeout(function () {
         console.log(self.id); // hello
       }, 100);
     },
   };
   var id = 'world';
   obj.fn();

   // 使用箭头函数
   var obj = {
     id: 'hello',
     fn: function () {
       setTimeout(() => {
         console.log(this.id); // hello
       }, 100);
     },
   };
   var id = 'world';
   obj.fn();

   // 使用bind方法
   var obj = {
     id: 'hello',
     fn: function () {
       setTimeout(
         function () {
           console.log(this.id); // hello
         }.bind(this),
         100
       );
     },
   };
   var id = 'world';
   obj.fn();
   ```
