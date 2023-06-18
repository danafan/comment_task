import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.isZzs = /^[+]{0,1}(\d+)$/;            //正整数

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
