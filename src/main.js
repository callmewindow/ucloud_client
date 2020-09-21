import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Router from 'vue-router';

Vue.config.productionTip = true

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

// 捕获路由异常
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {window.console.log(err.toString());window.location.reload();});
}


Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
