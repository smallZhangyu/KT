import * as http from './http.js';

export default {
  install(app, options) {
    console.log('myPlugin info : ' + options.info);

    // 自定义全局变量
    app.config.globalProperties.$http = http;
    // 自定义全局指令
    app.directive('auth', (ele, binding) => {
      const auth = ['edit', 'delete'];
      if (!auth.includes(binding.value)) {
        ele.style.display = 'none';
      }
    });

    app.component('say-hello', {
      template: `<div>{{helloMsg}}</div>`,
      data() {
        return {
          helloMsg: 'Hello myPlugin',
        };
      },
    });
  },
};
