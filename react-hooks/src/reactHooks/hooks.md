# Hooks

让函数组件具有类组件的能力。

引入 Hooks 的概念之后，函数组件就具备了状态管理、生命周期管理的能力，几乎可以实现原来 Class 组件具有的所有能力。

Hooks 的好处：1. 简化了业务逻辑的重用（Class 组件必须借助于高阶组件等复杂的设计模式实现，高阶组件会产生冗余的组件节点，让调试变得困难。）；2. 有助于关注点分离

## 一、State-Hooks

State 中永远不要保存可以通过计算得到的值。

State-Hooks 有 2 种 hooks；

1. useState()

   ```js
   用法示例：
   [count, setCount] = useState(0);
   ```

   setCount() 有 2 种用法，一种是直接传入一个值`setCount(2)`，另一种是传入一个回调函数`setCount((c) => c+1)` 这块的 c 就是 setCount 执行时 count 最新的值

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

   useReducer 是最基础的 state hooks，useState 是在 useReducer 上封装的简化版，和 Redux 中 reducer 的概念用法类似。useReducer() 适用于 state 是 object 的用法。useState() 适用于 state 是普通类型的场景，它是比较是浅比较，对于 Object 的类型，改变他的属性值，引用地址没变，不会引起组件的渲染。

## 二、Effect-Hooks

Effect-Hooks 也有 2 种。

1. useEffect();

   useEffect 是**每次组件 render 完成之后才判断依赖并执行**。

   ```js
   用法示例：
   useEffect(callback, [dependencies]);
   useEffect 在组件更新完成之后才执行。
   ```

2. useLayoutEffect();

   不常用。与 useEffect()的区别在于，useLayoutEffect() 比 useEffect() 先执行。因为 useLayoutEffect 是在 dom 节点更新之前执行，useEffect 是在 dom 节点更新之后执行。除非特定需求，否则都是用 useEffect()。

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

使用 useRef 保存的数据一般是和 UI 渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染，这也是 useRef 区别于 useState 的地方。

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
```

## 五、useContent

## 六、自定义 Hooks

## Hooks 的使用规则

1. 只能在函数组件的顶级作用域使用；也就是说，所有 Hook 必须要都被执行到，不能存在于任何判断语句中，并且要按顺序执行。
2. 只能在函数组件或者其他 Hooks 中使用。
