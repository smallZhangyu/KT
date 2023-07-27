# Vue2

## Vue2 指令

以`v-`开头的都是指令

1. `v-bind:title="message"` 绑定元素的属性 title, 可以缩写为`:title="message"`;
2. `v-if="seen"` 元素是否显示 seen;
3. `v-else` 元素是否显示 else，必须在`v-if`或者`v-else-if`后面;
4. `v-else-if="seen"` 元素是否显示，必须在`v-else-if`后面;
5. `v-show="show"` 元素按条件显示，始终会出现在 dom 里，是通过 css 的 display 来控制的；
6. `v-for="todo in todos"` 绑定数组的数据 todos 来循环渲染一个列表;
7. `v-on:click="reverseMessage"` 元素绑定一个 click 事件, 可以缩写为`@click="reverseMessage"`;
8. `v-model="message"` 实现双向绑定;
9. `v-once` 执行一次插值，数据变更后，不会刷新 ui;
10. `v-html="rawHtml"` 会被以 html 来动态渲染数据，而不是文本。会引起 XSS 攻击，只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。
11. `v-text="'Hello'"` 显示文本，会覆盖子元素中的内容，文本必须用引号包裹。
12. `v-pre` 显示
13. `v-cloak`

> 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。
>
> 不推荐同时使用 `v-if` 和 `v-for`。当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。**在 Vue3 中`v-if`比`v-for`优先级更高**。

## Vue 对象里的参数

[Vue2 官方参数 api](https://v2.cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)

```js
var app = new Vue({
  el: '#app', // 挂载的节点
  data: {
    // 相关的数据
    message: 'Hello Vue',
    todos: [{ text: 'aaa' }, { text: 'bbb' }],
  },
  // computed 是计算属性，用于动态计算的一些属性，只有依赖变化时，才会执行函数计算，有缓存的功效，性能优化，默认只有 getter 功能，也可以增加 setter 功能
  computed: {
    // computed 属性默认是只读的，原理是Object.defineProperty(o,propertyKey, Attr)，强行修改会报警告
    reversedMessage: function () {
      return this.message.splice('').reverse().join('');
    },
    // 带有setter的写法，这种情况下可以修改computed属性 this.reversedMessage = 'Hi vue.'
    reversedMessage: {
      set(value) {
        this.message = value;
      },
      get() {
        return this.message.splice('').reverse().join('');
      },
    },
  },
  // watch 是侦听属性，用于当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
  watch: {},
  // methods 用来定义一些函数、方法，不会缓存
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    },
  },
});
```

### 计算属性 computed 和侦听器属性 watch 的区别和原理

computed 适合：多个值去影响一个值的应用；  
watch 适合：一个值去影响多个值的应用。

watch 支持异步的程序，而 computed 不支持异步的程序。

## Vue 组件通讯的方式

1. props 和 $emit（父子组件之间通讯）
2. 自定义事件，使用 event-emitter 库（兄弟组件）
3. $attrs，props和emits的一个候补，没有出现在它俩的都会在this.$attrs 里存在；在 create 生命周期里操作
4. $parent，通过它获取父组件；
5. $refs，通过它获取子组件，这是Vue3中的属性，在Vue2中为$child；在 mount 生命周期里获取；
6. provide/inject，这两个是 Vue 的属性，（多层级组件的通讯）
7. Vuex （mutation 原子操作，必须同步代码；action 可包含多个 mutation，可包含异步代码）

## Vue 的生命周期

1. beforeCreate， 创建一个空白的 Vue 实例，data method 尚未初始化，不可使用；
2. created， Vue 实例初始化完成，完成响应式绑定，data method 都已经初始化完成，可调用；尚未开始渲染模板；
3. beforeMount， 编译模板，调用 render 生成 vdom，还没开始渲染 DOM；
4. mounted， 完成 DOM 渲染，组件创建完成，开始由“创建阶段”进入“运行阶段”；
5. beforeUpdate， data 发生变化之后，准备更新 DOM；
6. updated， data 发生变化，且 DOM 更新完成。不要在 updated 中修改 data，可能会导致死循环；
7. beforeUnmount，组件进入销毁阶段（尚未销毁，可正常是使用），可移除、解绑一些全局事件、自定义事件；
8. unmounted，组件被销毁了，所有子组件也都被销毁了。
