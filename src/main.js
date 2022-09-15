import Vue, { h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入axios
// import axios from 'axios'
// axios.defaults.baseURL="http://localhost:3000/"
// Vue.prototype.axios=axios

// 引入httpApis
import httpApis from './http/index';
Vue.prototype.$http=httpApis

// 设置JSCode安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "9a51ae088f151eb192f30334472d7114",
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
