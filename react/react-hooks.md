# Hooks

让函数组件具有类组件的能力。

引入 Hooks 的概念之后，函数组件就具备了状态管理、生命周期管理的能力，几乎可以实现原来 Class 组件具有的所有能力。

Hooks 的好处：  
1、简化了业务逻辑的重用（Class 组件必须借助于高阶组件等复杂的设计模式实现，高阶组件会产生冗余的组件节点，让调试变得困难。）；  
2、有助于关注点分离

## 一、State-Hooks

**State 中永远不要保存可以通过计算得到的值。**

State-Hooks 有 2 种 hooks；

1. useState()

   ```js
   // 用法示例：
   [count, setCount] = useState(0);
   ```

   setCount() 有 2 种用法，一种是直接传入一个值`setCount(2)`，另一种是传入一个回调函数`setCount((c) => c+1)` 这块的 c 就是 setCount 执行时 count 最新的值。

   ```js
   const initCount = () => {
     console.log('initCount');
     return 2 * 2 * 2;
   };
   // 下边的写法initCount每次count值变化都会执行initCount函数
   const [count, setCount] = useState(initCount());

   // useState(回调函数) 可以惰性加载initCount函数，只让initCount函数调用一次
   const [count, setCount] = useState(() => {
     return initCount();
   });
   ```

   useState 可以写多个声明，但是同名的不会合并，会覆盖。

   多个 setState()的改变是批处理的异步的操作，如果要改变批处理的操作，可以通过`ReactDom.flushSync(() => setCount(count + 1));`来执行 setState()；

2. useReducer()

   ```js
   用法示例：
   
   function countReducer(state, action) {
    switch(action.type){
        case 'add':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            return state;
    }
   }
   
   const [count, dispatchCount] = useReducer(countReducer, 0);
   
    dispatchCount({type: 'add'});
   ```

   useReducer 是最基础的 state hooks，useState 是在 useReducer 上封装的简化版，  
   和 Redux 中 reducer 的概念用法类似。useReducer() 适用于 state 是 object 的用法。  
   useState() 适用于 state 是普通类型的场景，它是比较是浅比较，  
   对于 Object 的类型，改变他的属性值，引用地址没变，不会引起组件的渲染。

useReducer 的适用场景： 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。

## 二、Effect-Hooks

Effect-Hooks 也有 2 种。

1. useEffect(callback, [dependencies]); **异步执行**

   useEffect 是**每次组件 render 完成之后才判断依赖并执行**。

   ```js
   用法示例：
   useEffect(callback, [dependencies]);
   useEffect 在组件更新render完成之后才执行。
   dependencies 一般是一个常量数组，而不是一个变量。
   React会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。
   如果每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。
   ```

2. useLayoutEffect(); **同步执行**

   不常用。与 useEffect()的区别在于，useLayoutEffect() 比 useEffect() 先执行。  
   因为 useLayoutEffect 是在 dom 节点更新后，渲染到页面之前执行，useEffect 是在 dom 节点更新渲染到页面之后执行。  
   除非特定需求，否则都是用 useEffect()。

> 大部分情况下采用 useEffect()，性能更好。 但当 useEffect 里面需要操作处理 DOM，并且会改变页面的样式，就需要用 useLayoutEffect，否则会出现闪屏现象。

```js
// 这个例子里用useEffect就会有闪屏的现象，用useLayoutEffect就可以避免
const [msg, setMsg] = useState('Hello');
// useEffect(()=>{
//    let i = 0;
//    while(i < 1000000000){
//       i++;
//    }
//    setMsg('React');
// }, []);

useLayoutEffect(() => {
  let i = 0;
  while (i < 1000000000) {
    i++;
  }
  setMsg('React');
}, []);

return <div>{msg}</div>;
```

## 三、useCallback 与 useMemo

useCallback 与 useMemo 要想达到减少渲染的效果，子组件必须使用 memo() 这个高阶组件包裹。

1. useCallback() 缓存回调函数

   ```js
   const clickHandle = useCallback(fn, [dependencies]);
   ```

   useCallback 本质上是 useMemo 对函数的简化版，等价于如下：

   ```js
   const clickHandle = useMemo(() => {
     // 返回一个函数作为缓存结果
     return fn;
   }, [dependencies]);
   ```

   > 是否需要 useCallback，和函数的复杂度没有必然关系，而是和回调函数绑定到哪个组件有关。 这是为了避免因组件属性变化而导致不必要的重复渲染。 对于原生的 DOM 节点，是不用担心重新渲染的，不写 useCallback，影响也不大。

2. useMemo 缓存的是计算的结果（避免重复计算，避免子组件的重复渲染）

   ```js
   const usersList = useMemo(() => {
     if (!users) {
       return null;
     }
   
     return users.data.filter((user) => {
       return user.firstName.includes(searchKey);
     });
   }, [users, searchKey]);
   ```

## 四、useRef 在多次渲染之间共享数据

使用 useRef 保存的数据一般是和 UI 渲染无关的，因此当 **ref 的值发生变化时，是不会触发组件的重新渲染**，这也是 useRef 区别于 useState 的地方。

`const countRef = useRef(null)`，通过 ref.current 来获取值。

useRef 还有一个重要功能，就是保存某个 DOM 节点的引用。

```js
// 使用useRef 自定义hook，实现Class组件construct的功能 - 组件渲染前只执行一次
import { useRef } from 'react';

function useSingleton(callback) {
  const ref = useRef(false);
  if (ref.current) return;

  callback();
  ref.current = true;
}

const MyComp = () => {
   useSingleton(
      () => {
         console.log('这段代码只执行一次，可以实现一些只执行一次的操作')；
      }
   );

   return (<div>My Component</div>);
}
```

useRef()对普通值进行记忆，类似于一个类的实例属性。函数组件中普通的变量在每次 render 的时候都会初始化，使用 useRef()声明的变量就有记忆，不会被初始化。

在类组件中当 ref 绑定到一个类形式的子组件上时，ref 指向的是子组件的实例，可以通过 props 传递给子组件实现 ref 的传递。 但是 ref 绑定到一个函数类型的子组件时，这个操作是不可以的，因为函数组件没有实例，需要将子组件用`React.forwardRef(ChildComp(props, ref))`包裹才可以。

```js
const Parent = () => {
  const myRef = React.useRef(null);

  const handleClick = () => {
    myRef.current.focus();
  };

  return (
    <div>
      <button onClick={handleClick}>Focus input</button>
      <ChildComp ref={myRef} />
    </div>
  );
};

// 注意React.forwardRef(funcComponent)包裹的函数组件有2个参数，第二个才是ref
const ChildComp = React.forwardRef((props, ref) => {
  return (
    <div>
      ChildComp
      <input type="text" ref={ref} />
    </div>
  );
});
```

## 五、useContext

Context 看上去就是一个全局的数据，为什么要设计这样一个复杂的机制，而不是直接用一个全局的变量去保存数据呢？ -- 为了能够进行数据的绑定，当这个 Context 的数据发生变化时，使用这个数据的组件能够自动刷新。

Context 的缺点：  
1、会让调试变得困难，因为很难跟踪某个 Context 的变化究竟是如何产生的；  
2、让组件的复用变得困难，因为一个组件如果使用了某个 Context，复用的时候，就必须确保被用到的地方一定有这个 Context 的 Provider 在其父组件的路径上。

```jsx
import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext('light');

const ChildComp = () => {
   const theme = useContext(ThemeContext);
   return (<></>);
}

export default const App = () => {
  const [theme, setTheme] = useState('light');
   return (
     <ThemeContext.Provider value={theme}>
        <ChildComp />
     </ThemeContext.Provider>
   );
}

```

## useTransition & useDeferredValue （React 18）

React18 新增了一个 `startTransition(cbFun)` 方法，用于将不紧急的任务延后执行。

`useTransition` 返回一个状态值表示过渡任务的等待状态 `pending`，以及一个启动该过渡任务的 `startTransition` 函数。

```js
const [searchWord, setSearchWord] = useState('');
const [query, setQuery] = useState(searchWord);
const [pending, startTransition] = useTransition();

const handleClick = (event) => {
  const inputValue = event.target.value;
  setSearchWord(inputValue);
  startTransition(() => {
    setQuery(inputValue);
  });
};

<>{pending ? 'Loading...' : <Comp />}</>;
```

`useDeferredValue` 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。

```js
const [searchWord, setSearchWord] = useState('');
const query = useDeferredValue(searchWord);
```

`useTransition` 和 `useDeferredValue` 实现的延迟效果是等价的。

## 自定义 Hooks

函数名使用 use 开头，在函数中使用内置 hooks 或者其他的自定义 hooks。

### 自定义 Hooks 的使用场景

一、解耦业务相关的逻辑；

二、封装通用的逻辑，如异步的 ajax 请求等，useAsync；

三、监听浏览器的状态，如窗口大小、滚动条位置、cookie、localStorage、URL 等；

四、拆分复杂组件。拆分逻辑的目的不一定是为了重用，也可以是仅仅为了业务逻辑的隔离。  
这种场景下，不一定要把 Hooks 放在独立的文件中，可以和函数组件放到一个文件中。

## Hooks 的使用规则

1. 只能在函数组件的顶级作用域使用；也就是说，所有 Hook 必须要都被执行到，不能存在于任何判断语句中，也不能出现在 return 之后，并且要按顺序执行。
2. 只能在函数组件或者其他 Hooks 中使用。
3. 在 useEffect 的回调函数中使用的变量，都必须在依赖项中声明。  
   如果在 useEffect 的回调函数中使用了未在依赖数组中声明的变量，可能会导致一些问题。比如闭包陷阱、无限循环（effect 使用了未在依赖项中声明的变量，且修改了该变量）

   ```js
   // 闭包陷阱
   function Example() {
     const [count, setCount] = useState(0);
     let intervalId;
     useEffect(() => {
       intervalId = setInterval(() => {
         console.log(count); // 始终输出 0，即使 count 改变
       }, 1000);
   
       return () => {
         clearInterval(intervalId);
       };
     }, []);
     return (
       <div>
         <button onClick={() => setCount(count + 1)}>Increment {count}</button>
       </div>
     );
   }
   
   // 死循环
   function Example() {
     const [count, setCount] = useState(0);
   
     useEffect(() => {
       setCount(count + 1);
     });
   
     return <div>{count}</div>;
   }
   ```

> 对于需要根据判断来动态显示的情况，可以使用容器模式。 外加一个容器，在这个容器里做判断，把条件判断的结果放到 2 个组件之中，确保真正 render UI 的组件收到的所有属性都是有值的。 这种情形适合大块的逻辑的隔离。对于一些细节的控制，可以把判断条件放到 hooks 中。

## Hooks 的注意点

1. 放弃类组件的开发思维——在什么生命周期里做什么操作，函数组件的思考方式应该是**当某个状态发生变化时，要做什么。**
2. 在遇到一个功能开发的需求时，首先想一下这个功能中的哪些逻辑可以抽出来成为独立的 Hooks？这样我们就尽可能地把业务逻辑拆分成独立的 Hooks，有助于实现代码的模块化和解耦。
3. hooks 仅能替代纯数据逻辑的 render props。如果有 UI 展示的逻辑需要重用，还是要借助于 render props 的逻辑。
4. 在处理 falsy 的值时，React 遇到 null, 空字符串或者 false 不会渲染任何内容。undefined 会导致出错，0 则直接渲染为 0.
5. useRef 是在一个组件的多次渲染之间共享数据，而不是全局状态。
6. useCallback 其实并没有避免重复创建函数，因为在 useCallback(() => {}, [deps]) 的形式中，每次运行都会创建一个函数。useCallback 只是可以决定是不是要使用新的函数。在依赖项不变的时候，就始终返回之前的，从而避免组件的重复渲染。
7. 如果不给 useCallback 提供依赖项定义，那么和不使用 useCallback 是一样的，所以必须提供。

## Hooks 是否可以完全代替 Class 组件？

答案是否定的，因为 Class 组件中还有一些比较少用的方法，比如 getSnapshotBeforeUpdate，  
componentDidCache，getDerivedStateFromError，Hooks 还没法实现这些功能。  
因此如果必须用到，组件仍然需要用 Class 组件去实现。

## react hooks 中复杂状态的处理

2 个基本原则：

1. 在保证 State 完整性的同时，也要保证状态最小化，不要滥用 State 去当变量使用，凡是能够通过计算所得的数据，就不要放在 state 里，应该使用 useMemo()对计算结果进行计算并缓存；

   一个典型的错误场景是对过滤后的数据进行展示，该数据使用 state 去存储，应该通过计算所得。

2. 避免中间状态，确保数据的来源唯一；

   场景：新闻页的过滤条件由 url 搜索参数和 input 输入搜索参数两部分决定，正确的处理方式是不使用 state 去存储过滤条件，直接从 URL 获取，input 的输入直接修改 URL 参数。

## 第三方的一些 hooks 封装库

1. [react-hooks 库整理合集](https://nikgraf.github.io/react-hooks)
2. [ahooks](https://ahooks.js.org/zh-CN/hooks/use-request/index)
3. [react-use](https://github.com/streamich/react-use)

## 优秀的一些库

1. react-loadable 用于 React 组件的按需加载
2. material UI
3. Ant Design
4. react-use
5. lodash
