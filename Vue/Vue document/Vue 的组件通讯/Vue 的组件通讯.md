# Vue 的组件通讯

## props 和 $emit，适用于父子组件

父子组件间的数据传递，父组件通过 prop 传递给子组件，子组件通过 emit 接收父组件的自定义事件回调给父组件信息。

## 自定义事件，适用于兄弟或者不相邻的任意组件

Vue2 自定义事件直接可以通过 new Vue()即可返回一个 event。  
Vue3 自定义事件必须通过第三方 event 库(event-emitter)实现。

父组件在 mounted 中创建事件 `event.on('eventName', this.showMsg)`，记得在 beforeUnmount 中解绑自定义事件 `event.off('eventName', this.showMsg)`
子组件中触发事件 `event.emit('eventName', xxx)`

## $attrs

$attrs 是props和emits的候补，如果父组件给子组件传递了多个props和自定义事件，结果子组件在props和emits只接收了部分，未被接收的就出现在了attrs中，通过`this.$attrs`可获取。

在 Vue2 中使用`$attrs`接收多余的 props，`$listeners` 接收多余的自定义事件。  
在 Vue3 中移除了`$listeners`，全部使用`$attrs` 接收。

## $parent 和 $refs ($children)，适用于父子组件

`$children` 是 Vue2 中的方法，Vue3 中已废弃，使用`$refs`代替。

在子组件中直接通过`this.$parent.xxx`就可以获取父组件的数据和方法。

在父组件中直接通过`this.$refs.childRef.xxx`就可以获取子组件的数据和方法，`<ChildComp ref="childRef" />`。

## provide/inject，适用于多层级的组件

父组件中通过 provide 选项定义要传递的数据，如果是 data 中的数据，provide 需要写成函数的形式，且 data 中的数据需要通过 `computed(()=>this.xxx)`包裹。  
子孙组件通过 inject 选项获取 provide 定义的数据。

## Vuex / Pinia
