import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import router from './router'
import axios from 'axios'


Vue.use(iView);//使用iview提供地样式库
Vue.prototype.axios= axios;//使用axios处理ajax请求
Vue.config.productionTip = false;


new Vue({
  el:'#app',
  router,
  render: h => h(App)
}).$mount('#app');
