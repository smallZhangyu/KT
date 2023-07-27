# 使用 Vue 的注意事项

## Vue2 文档中遇到的点

1. 由于 HTML 是大小写不敏感的，所以`v-on:myEvent`将会变成`v-on:myevent`，从而导致`myEvent`不可能被监听到。因此，推荐**始终使用 kebab-case(短线连接的命名方式)的事件名**。
2. `v-slot` 只能添加在 `<template>` 上，有一种例外情况，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot 直接用在组件上：

   ```vue
   <current-user v-slot:default="slotProps">
     {{ slotProps.user.firstName }}
   </current-user>
   ```

3. $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——应该避免在模板或计算属性中访问 $refs。
4. 用`methods`选项向组件实例添加方法，Vue 自动为 methods 绑定 this，以便于它始终指向组件实例。方法的传参调用`<div v-on:click="handleClick(123)"`，加不加()的形式都可以，是因为 Vue 帮我们处理好了如何进行事件传参处理，提供了内部的`$event` 语法来获取 event 对象。在 React 需要使用`() => handleClick(123)`或者`handleClick.bind(this, 123)`的方式处理。
