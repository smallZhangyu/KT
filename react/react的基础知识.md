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

1. ref 在组件上使用的话，`ref.current`指向的是组件的实例，可以获取实例的一些 state 等；
2. ref 在组件上的转发，是通过一个 props 将 ref 传递给子组件，在子组件通过 ref 属性绑定到 props 里的 ref 属性。

```js
// ref 在类组件上里的声明
// 1. 通过React.createRef()，更推荐使用
myRef = React.createRef();

<div ref={this.myRef}></div>;

// 2. 通过callbackRef()声明
callbackRef = (element) => {
  console.log(element); // element指向div，组件初始化的时候就触发了
  this.myRef = element;
};

<div ref={this.callbackRef}></div>;
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
5. 对象的形式操纵样式模块，安装`npm i classnames`

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
