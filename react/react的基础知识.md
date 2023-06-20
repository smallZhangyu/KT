# react 的基础知识

[TOC]

## react 相关的模块作用

1. `react.development.js / react 模块 / React.createElement('h1', {title:'hi'}, 'hello World');` ---> 用于生成虚拟 DOM；
2. `react-dom.development.js  react-dom/client 模块` ---> Diff 算法，处理真实 DOM

```js
let app = document.querySelector('#app');
let root = ReactDom.createRoot(app); // root根对象，react渲染的
// React.createElement() 创建虚拟DOM
let element = React.createElement('h2', { title: 'hi' }, 'Hello World.');
root.render(element);
```

## JSX

JSX = JavaScript + XML

特点：

1. 标签小写；
2. 单标签要闭合；
3. class 和 for 属性为保留字，用 className 和 htmlFor 去替换；
4. 多单词要为驼峰格式，data-\*不需要；
5. 唯一根节点；
6. {}模板语法，可以编写 js 表达式；
7. 注释格式 `{/* xxxx */}`;
8. 属性渲染 `<div className={classBox}></div>`;
9. 事件名也是驼峰写法 `<div onClick={handleClick}></div>`;
10. style 的值必须是一个对象 `<div style={{color: 'red'}}>style</div>`;
11. JSX 里可以继续嵌套 JSX;

## React 的方法

1. `React.createElement('div',{ className :'last' } ,'say goodbye')` 创建 element；
2. `React.Children.toArray(children)` 扁平化，规范化 children 数组；
3. `React.Children.forEach(flatChildren,(item)=>{...})`，
4. `React.isValidElement(item)` 验证是否是一个有效的元素，去除文本节点；
5. `React.cloneElement(reactElement,{} ,...newChildren )` cloneElement 创建新的容器元素，并返回一个新的 React.element 对象。
6. React-Dom 中提供了批量更新方法 `unstable_batchedUpdates(() => {...})`，可以去手动批量更新，比如处理 react 16 版本里 setTimeout 里 setState 的同步不合并的现象。
7. React-dom 提供了同步修改 state 的方法， `flushSyncReact(() => {...})` ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。flushSync 在同步条件下，会合并之前的 setState | useState，可以理解成，如果发现了 flushSync ，就会先执行更新，如果之前有未更新的 setState ｜ useState ，就会一起合并了。同一级别更新优先级关系是: flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。

## Immutable.js 的使用

```js
state = {
  msg: 'hello',
  count: 0,
  list: Immutable.fromJS([{ id: 1, text: 'aaa' }]),
};

// 修改list的值的话
let list = this.state.list.setIn([0, 'text'], 'bbb');

// 获取值的话get(key)
<ChildComp item={this.state.list.get(0)} />;

// ChildComp
function ChildComp(props) {
  return <p>{props.item.get('text')}</p>;
}
```

## ref 在 DOM 和组件上的使用

1. ref 在类组件上使用的话，`ref.current`指向的是类组件的实例，可以获取实例的一些 state 等；
2. ref 在组件上的转发，是通过一个 props 将 ref 传递给子组件，在子组件通过 ref 属性绑定到 props 里的 ref 属性。

```js
// ref属性获取DOM节点，不一定是非要使用 ref对象绑定。共有3种方式

// 1. 通过ref 对象，类组件 使用 React.createRef()，更推荐使用，函数组件中使用 React.useRef()；
myRef = React.createRef();

<div ref={this.myRef}></div>;

// 2. 通过callbackRef()声明
callbackRef = (element) => {
  console.log(element); // element指向div，组件初始化的时候就触发了
  this.myRef = element;
};

<div ref={this.callbackRef}></div>;

// 3. 通过字符串绑定，可通过this.refs来获取到
<div ref="divRef"></div>; // 可通过 this.refs.divRef 获取到
```

## CRA 脚手架下样式的处理方式

1. 全局样式，`import './index.css`;
2. 对 Sass 的支持，先安装 `npm i sass`，引入`import './index.scss`;
3. 模块化 CSS，xxx.module.css;

   ```js
   import style from './index.module.css';

   function Hello() {
     return <div className={style.box1}> Hello </div>;
   }
   ```

4. CSS-in-JS, 安装 `npm i styled-components`;
5. 以对象的形式操纵样式模块，安装`npm i classnames`

   ```js
   import classnames from 'classnames';
   function Comp() {
     // const myClass = 'box box2';
     const myClass = classnames({
       box: true,
       box2: true,
     });

     return <div className={myClass}></div>;
   }
   ```

## v17 之后的版本变化

1. v17 开始，@babel/plugin-syntax-jsx,在编译的过程中注入 \_jsxRuntime api，使得新版本 React 已经不需要引入 createElement

## 问答题

### 类组件中的 setState 和函数组件中的 useState 有什么异同？

**相同点：**  
首先从原理角度出发，setState 和 useState 更新视图，底层都调用了 scheduleUpdateOnFiber 方法，而且事件驱动情况下都有批量更新规则。

**不同点：**

1. 在不是 pureComponent 组件模式下， setState 不会浅比较两次 state 的值，只要调用 setState，在没有其他优化手段的前提下，就会执行更新。但是 useState 中的 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新组件。
2. setState 有专门监听 state 变化的回调函数 callback，可以获取最新 state；但是在函数组件中，只能通过 useEffect 来执行 state 变化引起的副作用。
3. setState 在底层处理逻辑上主要是和老 state 进行合并处理，而 useState 更倾向于重新赋值。
