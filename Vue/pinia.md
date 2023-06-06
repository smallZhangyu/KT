# Pinia

## Pinia 的特点

1. 没有 mutations，所有的同步、异步操作都是在 actions 里完成的；
2. 写法更优雅，不需要 Vuex 那么多的文件；

## Pinia 的基础使用示例

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

app.use(router).use(createPinia());

app.mount('#app');
```

多模块之间不需要合并操作；

```js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
```

```vue
<script setup>
import { useCounterStore } from './stores/counter';
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const messageStore = useMessageStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { msg, upperMsg } = storeToRefs(messageStore);
const handleClick = () => {
  counterStore.increment();
  messageStore.changeMsg('hi jeff');
};
</script>

<template>
  <button @click="handleClick">Click change</button>
  <div>{{ count }} - {{ doubleCount }}</div>
  <div>{{ msg }} - {{ upperMsg }}</div>
</template>
```
