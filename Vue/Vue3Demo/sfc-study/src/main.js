import { createApp } from 'vue';
// import App from './App.vue';
import App from './App.vue';
// import * as http from './components/http.js';
import myPlugin from './components/myPlugin';
import router from './router/index';
import store from './store/index';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
// 注册element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 使用插件
app.use(myPlugin, { info: 'myPlugin config info ' });
app.use(ElementPlus);

// // 自定义全局变量
// app.config.globalProperties.$http = http;
// // 自定义全局指令
// app.directive('auth', (ele, binding) => {
//   const auth = ['edit', 'delete'];
//   if (!auth.includes(binding.value)) {
//     ele.style.display = 'none';
//   }
// });

app.use(router).use(store).mount('#app');
